import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import reportRoutes from "./routes/reports.js";
import User from "./models/User.js";

dotenv.config();
const app = express();

// --- CORS ---
const allowed = [
  "http://localhost:5173",
  process.env.APP_URL,
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) cb(null, true);
      else cb(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json());

// --- Healthcheck routes ---
app.get("/api", (req, res) => {
  res.json({ ok: true, message: "AI Numerology API is running 🚀" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
    mongoURI: process.env.MONGODB_URI ? "✅ Loaded" : "❌ Missing",
    dbName: mongoose.connection?.name || null,
    readyState: mongoose.connection?.readyState, // 1 = connected
  });
});

// 🚧 Debug only: list all users (no auth)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().limit(20); // fetch up to 20 docs
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// --- API routes ---
// auth route to be implemented with otp and magic link
app.use("/api/auth", authRoutes);
// api/users route giving data without login right now.
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// --- Start server & connect DB ---
const port = process.env.PORT || 8080;

connectDB(process.env.MONGODB_URI, process.env.DB_NAME).then(() => {
  console.log("✅ Connected to MongoDB:", mongoose.connection.name);
//   app.listen(port, () =>
//     console.log(`🚀 API running at http://localhost:${port}`)
//   );
});


if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 8080;
    app.listen(port, () =>
      console.log(`🚀 API running at http://localhost:${port}`)
    );
  }






// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./db.js";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import reportRoutes from "./routes/reports.js";

// dotenv.config();
// const app = express();

// const allowed = [
//   "http://localhost:5173",
//   process.env.APP_URL,
//   process.env.CORS_ORIGIN,
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin || allowed.includes(origin)) cb(null, true);
//       else cb(new Error("CORS blocked: " + origin));
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.get("/api", (req, res) => {
//   res.json({ ok: true, message: "AI Numerology API is running 🚀" });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     uptime: process.uptime(),
//     timestamp: new Date(),
//   });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/test", userRoutes);
// app.use("/api/reports", reportRoutes);

// const port = process.env.PORT || 8080;
// connectDB(process.env.MONGODB_URI).then(() =>
//   app.listen(port, () => console.log(`✅ API running at http://localhost:${port}`))
// );