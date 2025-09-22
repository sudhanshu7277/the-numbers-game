import mongoose from 'mongoose';
const ReportSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
numbers: { lifePath:Number, expression:Number, soulUrge:Number },
summary: String
}, { timestamps:true });
export default mongoose.model('Report', ReportSchema);