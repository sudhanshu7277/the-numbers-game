import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import nodemailer from "nodemailer";
import twilioPkg from "twilio";

import User from "../models/User.js";
import Report from "../models/Report.js";
import { genCode, hash, isExpired } from "../utils/otp.js";
import { computeAll, summarize } from "../utils/numerology.js";

const router = express.Router();

// --- Transporters ---
const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

const twilio =
  process.env.TWILIO_SID && process.env.TWILIO_AUTH
    ? twilioPkg(process.env.TWILIO_SID, process.env.TWILIO_AUTH)
    : null;

// --- JWT helper ---
const issueToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// --- OTP / Magic Link Request ---
router.post("/request-otp", async (req, res) => {
  try {
    const { identifier, magic } = req.body;
    if (!identifier) return res.status(400).json({ error: "Identifier required" });

    // find or create user
    let user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }, { identifiers: identifier }],
    });
    if (!user) {
      user = await User.create({
        name: "New User",
        dob: new Date("2000-01-01"),
        email: identifier.includes("@") ? identifier : undefined,
        phone: identifier.includes("@") ? undefined : identifier,
        identifiers: [identifier],
      });
    }

    // Email flow
    if (identifier.includes("@")) {
      if (!mailer) return res.status(500).json({ error: "Email not configured" });

      if (magic) {
        // Magic link
        const raw = crypto.randomBytes(32).toString("hex");
        user.magicTokenHash = hash(raw);
        user.magicExpires = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        const link = `${process.env.APP_URL || "http://localhost:5173"}/api/auth/magic?token=${raw}`;
        await mailer.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: identifier,
          subject: "Your Magic Sign-In Link",
          html: `<p>Click to sign in: <a href="${link}">${link}</a></p><p>Valid 15 minutes.</p>`,
        });

        return res.json({ ok: true, method: "magic" });
      }

      // OTP flow
      const code = genCode();
      user.otpCodeHash = hash(code);
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      user.otpAttempts = 0;
      await user.save();

      await mailer.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: identifier,
        subject: "Your Login Code",
        text: `Your code is ${code} (valid 10 minutes).`,
      });

      return res.json({ ok: true, method: "email-otp" });
    }

    // SMS flow
    if (!twilio) return res.status(500).json({ error: "SMS not configured" });

    const code = genCode();
    user.otpCodeHash = hash(code);
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otpAttempts = 0;
    await user.save();

    await twilio.messages.create({
      from: process.env.TWILIO_FROM,
      to: identifier,
      body: `Your AI Numerology code: ${code}`,
    });

    return res.json({ ok: true, method: "sms-otp" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OTP request failed" });
  }
});

// --- Verify OTP ---
router.post("/verify-otp", async (req, res) => {
  try {
    const { identifier, code, name, dob, gender, email, phone } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }, { identifiers: identifier }],
    });
    if (!user) return res.status(400).json({ error: "Invalid code" });

    if (isExpired(user.otpExpires)) return res.status(400).json({ error: "Expired code" });
    if (user.otpAttempts >= 5) return res.status(429).json({ error: "Too many attempts" });
    if (user.otpCodeHash !== hash(code)) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ error: "Invalid code" });
    }

    // Success: update user profile
    if (email && !validator.isEmail(email)) return res.status(400).json({ error: "Invalid email" });
    if (phone && !validator.isMobilePhone(phone, "any"))
      return res.status(400).json({ error: "Invalid phone" });

    user.name = name || user.name;
    if (dob) user.dob = new Date(dob);
    user.gender = gender || user.gender;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    user.identifiers = Array.from(new Set([...(user.identifiers || []), identifier]));
    user.otpCodeHash = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    // Ensure numerology report exists
    const hasReport = await Report.exists({ userId: user._id });
    if (!hasReport) {
      const nums = computeAll({ name: user.name, dob: user.dob });
      await Report.create({ userId: user._id, numbers: nums, summary: summarize(nums) });
    }

    res.json({ token: issueToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// --- Magic Link Verify ---
router.get("/magic", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send("Missing token");

    const user = await User.findOne({
      magicTokenHash: hash(token),
      magicExpires: { $gt: new Date() },
    });
    if (!user) return res.status(400).send("Invalid or expired link");

    user.magicTokenHash = undefined;
    user.magicExpires = undefined;
    await user.save();

    const jwtToken = issueToken(user);
    return res.redirect(
      `${process.env.APP_URL || "http://localhost:5173"}/dashboard?token=${jwtToken}`
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Magic link failed");
  }
});

export default router;
