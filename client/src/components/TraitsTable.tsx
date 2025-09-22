// import React from "react";

export default function TraitsTable({ reports }: { reports: any[] }) {
  return (
    <div className="overflow-auto rounded-xl border shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-pastel4/40 dark:bg-gray-700">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Life Path</th>
            <th className="p-3 text-left">Expression</th>
            <th className="p-3 text-left">Soul Urge</th>
            <th className="p-3 text-left">Summary</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr
              key={r._id}
              className="odd:bg-white/60 even:bg-pastel1/40 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-pastel2/60 transition-colors"
            >
              <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="p-3 font-semibold">{r.numbers?.lifePath}</td>
              <td className="p-3">{r.numbers?.expression}</td>
              <td className="p-3">{r.numbers?.soulUrge}</td>
              <td className="p-3">{r.summary?.slice(0, 120)}…</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}








// import React from 'react';
// export default function TraitsTable({ reports }:{ reports:any[] }){
// return (
// <div className="overflow-auto rounded-xl border">
// <table className="min-w-full text-sm">
// <thead className="bg-pastel4/40 dark:bg-black/20">
// <tr>
// <th className="p-3 text-left">Date</th>
// <th className="p-3 text-left">Life Path</th>
// <th className="p-3 text-left">Expression</th>
// <th className="p-3 text-left">Soul Urge</th>
// <th className="p-3 text-left">Summary</th>
// </tr>
// </thead>
// <tbody>
// {reports.map((r)=> (
// <tr key={r._id} className="odd:bg-white/70 even:bg-white/50 dark:odd:bg-black/20 dark:even:bg-black/10">
// <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
// <td className="p-3 font-semibold">{r.numbers?.lifePath}</td>
// <td className="p-3">{r.numbers?.expression}</td>
// <td className="p-3">{r.numbers?.soulUrge}</td>
// <td className="p-3">{r.summary?.slice(0,120)}…</td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// );
// }