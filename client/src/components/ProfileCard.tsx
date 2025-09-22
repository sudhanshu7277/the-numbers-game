// import React from "react";

export default function ProfileCard({ user }: { user: any }) {
  return (
    <div className="bg-gradient-to-br from-pastel1 to-pastel2 dark:from-gray-700 dark:to-gray-900 p-6 rounded-2xl shadow-xl">
      <p className="text-sm opacity-70">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
      <h4 className="mt-2 text-xl font-bold">{user.name}</h4>
      <p className="text-sm">DOB: {new Date(user.dob).toLocaleDateString()}</p>
      <p className="text-sm">Email: {user.email || "—"}</p>
      <p className="text-sm">Phone: {user.phone || "—"}</p>
      <span className="mt-3 inline-block px-3 py-1 rounded-full bg-pastel4 text-gray-900 font-semibold text-xs shadow">
        {user.role}
      </span>
    </div>
  );
}







// import React from 'react';
// export default function ProfileCard({ user }: { user:any }){
// return (
// <div className="bg-white/70 dark:bg-white/10 p-6 rounded-2xl shadow">
// <div className="text-sm opacity-70">Member since {new Date(user.createdAt).toLocaleDateString()}</div>
// <div className="mt-1 font-semibold">{user.name}</div>
// <div className="text-sm">DOB: {new Date(user.dob).toLocaleDateString()}</div>
// <div className="text-sm">Email: {user.email||'—'}</div>
// <div className="text-sm">Phone: {user.phone||'—'}</div>
// <div className="text-sm">Role: {user.role}</div>
// </div>
// );
// }