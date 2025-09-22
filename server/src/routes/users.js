import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();
const auth = (req,res,next)=>{ const token=(req.headers.authorization||'').replace('Bearer ',''); try{ const p=jwt.verify(token, process.env.JWT_SECRET); req.userId=p.sub; req.role=p.role; }catch{} next(); };
router.get('/me', auth, async (req,res)=>{ if(!req.userId) return res.status(401).json({ error:'Unauthorized' }); const me = await User.findById(req.userId).lean(); res.json(me); });
router.get('/', auth, async (req,res)=>{ if(req.role!=='admin') return res.status(403).json({ error:'Forbidden' }); const users = await User.find().sort({ createdAt:-1 }).limit(200).lean(); res.json(users); });
export default router;