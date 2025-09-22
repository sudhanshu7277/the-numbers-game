import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "reports">("users");
  const [users, setUsers] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  useEffect(() => {
    (async () => {
      const u = await axios.get("/api/users", { headers });
      setUsers(u.data);
      const r = await axios.get("/api/reports", { headers });
      setReports(r.data);
    })();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h2 className="text-3xl font-extrabold mb-4">⚙️ Admin Dashboard</h2>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded-lg shadow font-semibold transition ${
            tab === "users"
              ? "bg-pastel3 text-gray-900"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setTab("reports")}
          className={`px-4 py-2 rounded-lg shadow font-semibold transition ${
            tab === "reports"
              ? "bg-pastel3 text-gray-900"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
          }`}
        >
          Reports
        </button>
      </div>

      {tab === "users" && (
        <div className="overflow-auto rounded-xl border shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-pastel4/40 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="odd:bg-white/60 even:bg-pastel1/40 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-pastel2/50 transition-colors"
                >
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email || "—"}</td>
                  <td className="p-3">{u.phone || "—"}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "reports" && (
        <div className="overflow-auto rounded-xl border shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-pastel4/40 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Life Path</th>
                <th className="p-3 text-left">Expression</th>
                <th className="p-3 text-left">Soul Urge</th>
                <th className="p-3 text-left">Summary</th>
                <th className="p-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr
                  key={r._id}
                  className="odd:bg-white/60 even:bg-pastel1/40 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-pastel2/50 transition-colors"
                >
                  <td className="p-3">{r.userId?.name || "—"}</td>
                  <td className="p-3 font-semibold">{r.numbers?.lifePath}</td>
                  <td className="p-3">{r.numbers?.expression}</td>
                  <td className="p-3">{r.numbers?.soulUrge}</td>
                  <td className="p-3">{r.summary?.slice(0, 100)}…</td>
                  <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// export default function AdminDashboard() {
//     const [tab, setTab] = useState<'users' | 'reports'>('users');
//     const [users, setUsers] = useState<any[]>([]);
//     const [reports, setReports] = useState<any[]>([]);
//     const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

//     useEffect(() => {
//         (async () => {
//             const u = await axios.get('/api/users', { headers });
//             setUsers(u.data);
//             const r = await axios.get('/api/reports', { headers });
//             setReports(r.data);
//         })();
//     }, []);


//     return (
//         <div className="container mx-auto p-6 max-w-7xl">
//             <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//             <div className="flex gap-3 mb-4">
//                 <button onClick={() => setTab('users')} className={`px-3 py-2 rounded border ${tab === 'users' ? 'bg-pastel3' : ''}`}>Users</button>
//                 <button onClick={() => setTab('reports')} className={`px-3 py-2 rounded border ${tab === 'reports' ? 'bg-pastel3' : ''}`}>Reports</button>
//             </div>
//             {tab === 'users' && (
//                 <div className="overflow-auto rounded-xl border">
//                     <table className="min-w-full text-sm">
//                         <thead className="bg-pastel4/40 dark:bg-black/20">
//                             <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Role</th><th className="p-3 text-left">Created</th></tr>
//                         </thead>
//                         <tbody>
//                             {users.map(u => (
//                                 <tr key={u._id} className="odd:bg-white/70 even:bg-white/50 dark:odd:bg-black/20 dark:even:bg-black/10">
//                                     <td className="p-3">{u.name}</td>
//                                     <td className="p-3">{u.email || '—'}</td>
//                                     <td className="p-3">{u.phone || '—'}</td>
//                                     <td className="p-3">{u.role}</td>
//                                     <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             {tab === 'reports' && (
//                 <div className="overflow-auto rounded-xl border">
//                     <table className="min-w-full text-sm">
//                         <thead className="bg-pastel4/40 dark:bg-black/20">
//                             <tr><th className="p-3 text-left">User</th><th className="p-3 text-left">Life Path</th><th className="p-3 text-left">Expression</th><th className="p-3 text-left">Soul Urge</th><th className="p-3 text-left">Summary</th><th className="p-3 text-left">Created</th></tr>
//                         </thead>
//                         <tbody>
//                             {reports.map(r => (
//                                 <tr key={r._id} className="odd:bg-white/70 even:bg-white/50 dark:odd:bg-black/20 dark:even:bg-black/10">
//                                     <td className="p-3">{r.userId?.name || '—'}</td>
//                                     <td className="p-3 font-semibold">{r.numbers?.lifePath}</td>
//                                     <td className="p-3">{r.numbers?.expression}</td>
//                                     <td className="p-3">{r.numbers?.soulUrge}</td>
//                                     <td className="p-3">{r.summary?.slice(0, 100)}…</td>
//                                     <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }