import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
name: { type:String, required:true },
dob: { type: Date, required:true },
gender: String,
email: { type:String, index:true },
phone: { type:String, index:true },
isAdmin: { type:Boolean, default:false },
}, { timestamps:true });
export default mongoose.model('User', UserSchema);





// import mongoose from 'mongoose';
// const UserSchema = new mongoose.Schema({
// name: { type:String, required:true },
// dob: { type: Date, required:true },
// gender: String,
// email: { type:String, index:true },
// phone: { type:String, index:true },
// identifiers: { type:[String], index:true },
// role: { type:String, default:'user', index:true },
// otpCodeHash: String,
// otpExpires: Date,
// otpAttempts: { type:Number, default:0 },
// magicTokenHash: String,
// magicExpires: Date
// }, { timestamps:true });
// export default mongoose.model('User', UserSchema);