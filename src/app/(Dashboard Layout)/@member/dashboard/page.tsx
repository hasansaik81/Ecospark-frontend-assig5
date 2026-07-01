// import React from 'react'

// const page = () => {
//   return (
//     <div>This is Member dashboard</div>
//   )
// }

// export default page


// src/app/(dashboard)/@member/page.tsx
import React from "react";
// import MemberDashboardClient from "@/components/dashboard/MemberDashboardClient";
import { getDashboardStatsData } from "@/services/dashboard";
import { getMyIdeas } from "@/services/idea"; // 👈 আইডিয়া সার্ভিস
import { getAllCategories } from "@/services/features"; // 👈 ক্যাটাগরি সার্ভিস
import MemberDashboardClient from "@/components/modules/memberDashboard/memberDashboard";





export default async function MemberDashboardPage() {
  // 🚀 ৩টি ডাটা একসাথে সার্ভার থেকে ব্যাকএন্ড এপিআই এর মাধ্যমে ফেচ হচ্ছে
  const [statsResponse, myIdeasResponse, categoriesResponse] = await Promise.all([
    getDashboardStatsData(),
    getMyIdeas(),         // 👈 মেম্বারের নিজের আইডিয়া
    getAllCategories()     // 👈 ফর্মের জন্য সব ক্যাটাগরি
  ]);

  const initialStats = statsResponse?.success ? statsResponse.data : null;
  const initialIdeas = myIdeasResponse?.success ? myIdeasResponse.data : [];
  const categories = categoriesResponse?.success ? categoriesResponse.data : [];

  return (
    <div>
      {/* ক্লায়েন্ট কম্পোনেন্টে সব ডাটা প্রপ্স হিসেবে পাস করা হলো */}
      <MemberDashboardClient
        initialStats={initialStats} 
        initialIdeas={initialIdeas} 
        categories={categories} 
      />
    </div>
  );
}