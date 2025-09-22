import React, { useState } from "react";
import PastelSpinner from "./PastelSpinner";

export default function AuthForm() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Form submitted:", form);
      // TODO: call backend API
      await new Promise((res) => setTimeout(res, 2000)); // mock delay
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel2 via-pastel3 to-pastel4 p-6">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          🔮 Create Your Numerology Profile
        </h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pastel4 outline-none shadow-sm"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pastel4 outline-none shadow-sm"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pastel4 outline-none shadow-sm"
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pastel4 outline-none shadow-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pastel4 outline-none shadow-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-pastel4 text-gray-900 font-bold py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Create Profile
          </button>
        </form>
      </div>

      {loading && <PastelSpinner message="✨ Creating your profile…" />}
    </div>
  );
}









// import React, { useState } from 'react';
// import axios from 'axios';


// export default function AuthForm() {
//     const [form, setForm] = useState({ email: '', phone: '', name: '', dob: '', gender: '' });
//     const [otpSent, setOtpSent] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [msg, setMsg] = useState('');

//     const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//     const sendOtp = async () => {
//         try { await axios.post('/api/auth/request-otp', { identifier: form.email || form.phone }); setOtpSent(true); setMsg('OTP sent'); }
//         catch (e: any) { setMsg(e.response?.data?.error || 'Failed'); }
//     };
//     const verify = async () => {
//         try {
//             const { data } = await axios.post('/api/auth/verify-otp', { identifier: form.email || form.phone, code: otp, ...form });
//             localStorage.setItem('token', data.token); window.location.href = '/dashboard';
//         } catch (e: any) { setMsg(e.response?.data?.error || 'Failed'); }
//     };


//     return (
//         <div className="w-full max-w-md bg-white/70 dark:bg-white/10 backdrop-blur p-6 rounded-2xl shadow-xl">
//             <h1 className="text-2xl font-bold mb-4">Login / Sign Up</h1>
//             <div className="grid gap-3">
//                 <input name="name" placeholder="Full Name" onChange={set} className="border rounded p-2" />
//                 <input name="dob" type="date" onChange={set} className="border rounded p-2" />
//                 <select name="gender" onChange={set} className="border rounded p-2">
//                     <option value="">Select Gender</option>
//                     <option value="female">Female</option>
//                     <option value="male">Male</option>
//                     <option value="nonbinary">Non-binary</option>
//                     <option value="prefer_not">Prefer not</option>
//                 </select>
//                 <input name="email" type="email" placeholder="Email" onChange={set} className="border rounded p-2" />
//                 <input name="phone" placeholder="Phone" onChange={set} className="border rounded p-2" />
//                 {!otpSent ? (
//                     <button onClick={sendOtp} className="bg-pastel4 py-2 rounded font-semibold">Send OTP</button>
//                 ) : (
//                     <div className="flex gap-2">
//                         <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="flex-1 border rounded p-2" />
//                         <button onClick={verify} className="bg-pastel3 py-2 px-4 rounded font-semibold">Verify</button>
//                     </div>
//                 )}
//                 {msg && <div className="text-sm opacity-80">{msg}</div>}
//             </div>
//         </div>
//     );
// }