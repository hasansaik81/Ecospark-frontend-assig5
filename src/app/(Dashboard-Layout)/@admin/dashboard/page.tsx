// import React from 'react'

// const page = () => {
//   return (
//     <div>This is Admin Dashboard </div>
//   )
// }

// export default page



// src/app/(dashboard)/@admin/page.tsx
import React from "react";
// import AdminDashboardClient from "@/components/dashboard/AdminDashboardClient";
import { getDashboardStatsData } from "@/services/dashboard";
import { getAllIdeasAdmin } from "@/services/idea"; // 👈 আইডিয়া সার্ভিস ইম্পোর্ট
import AdminDashboardClient from "@/components/modules/adminDashboard/adminDashboard";


export default async function AdminDashboardPage() {
  // 🚀 Promise.all ব্যবহার করে প্যারালালি দুটি ডাটা একসাথে ফেচ করছি
  const [statsResponse, ideasResponse] = await Promise.all([
    getDashboardStatsData(),
    getAllIdeasAdmin() // 👈 ডাটাবেজের সব আইডিয়া নিয়ে আসবে
  ]);

  const initialStats = statsResponse?.success ? statsResponse.data : null;
  const initialIdeas = ideasResponse?.success ? ideasResponse.data : [];

  return (
    <div>
      {/* ক্লায়েন্ট কম্পোনেন্টে দুটি ডাটায় প্রপ্স হিসেবে পাঠিয়ে দেওয়া হলো */}
      <AdminDashboardClient 
        initialStats={initialStats} 
        initialIdeas={initialIdeas} 
      />
    </div>
  );
}