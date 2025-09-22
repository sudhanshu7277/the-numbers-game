import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import TraitsTable from "./TraitsTable";

export default function Dashboard() {
  const [me, setMe] = useState<any>(null);
  //const [reports, setReports] = useState<any[]>([]);

  // THIS BLOCK 
//   useEffect(() => {
//     (async () => {
//       const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
//       const meRes = await axios.get("/api/users/me", { headers });
//       setMe(meRes.data);
//       const rep = await axios.get("/api/reports/mine", { headers });
//       setReports(rep.data);
//     })();
//   }, []);

useEffect(() => {
    (async () => {
      const users = await axios.get("/api/users");
      console.log('users', users);
      setMe(users.data);
    })();
  }, []);

  if (!me) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h2 className="text-3xl font-extrabold mb-6">🌟 Welcome, {me.name}</h2>
      <div className="grid lg:grid-cols-3 gap-6">
    {me.map((item: any, index: number) => (
        <ProfileCard key={index} user={item} />
      ))}
        <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-semibold mb-3">Your Reports</h3>
          {/* <TraitsTable reports={reports} /> */}
        </div>
      </div>
    </div>
  );
}





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProfileCard from './ProfileCard';
// import TraitsTable from './TraitsTable';


// export default function Dashboard() {
//     const [me, setMe] = useState<any>(null);
//     const [reports, setReports] = useState<any[]>([]);
//     useEffect(() => {
//         (async () => {
//             const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
//             const meRes = await axios.get('/api/users/me', { headers });
//             setMe(meRes.data);
//             const rep = await axios.get('/api/reports/mine', { headers });
//             setReports(rep.data);
//         })();
//     }, []);
//     if (!me) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
//     return (
//         <div className="container mx-auto p-6 max-w-6xl">
//             <h2 className="text-2xl font-bold mb-4">Welcome, {me.name}</h2>
//             <div className="grid lg:grid-cols-3 gap-6">
//                 <ProfileCard user={me} />
//                 <div className="lg:col-span-2 bg-white/70 dark:bg-white/10 p-6 rounded-2xl shadow">
//                     <h3 className="text-xl font-semibold mb-3">Your Reports</h3>
//                     <TraitsTable reports={reports} />
//                 </div>
//             </div>
//         </div>
//     );
// }