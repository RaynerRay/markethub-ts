
import Dashboard from "@/components/Dashboard/Dashboard";
import React from "react";

export default async function page() {
//   const session = await getServerSession(authOptions);
//   const user = session?.user;
//   const role = user?.role;
//   if (role === "DOCTOR") {
//     return (
//       <>
//         <DoctorDashboard session={session} />
//       </>
//     );
//   }
//   if (role === "USER") {
//     return (
//       <>
//         <PatientDashboard session={session} />
//       </>
//     );
//   }
  return (
    <div>
      <Dashboard />
    </div>
  );
}
