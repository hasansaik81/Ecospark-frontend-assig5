// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const getAdminStats = async () => {
//   const res = await fetch(`${BASE_URL}/dashboard/admin/stats`, {
//     credentials: "include",
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch admin stats");
//   }

//   return res.json();
// };

// export const getAllUsers = async () => {
//   const res = await fetch(`${BASE_URL}/dashboard/admin/users`, {
//     credentials: "include",
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch users");
//   }

//   return res.json();
// };

// export const getAllIdeasAdmin = async () => {
//   const res = await fetch(`${BASE_URL}/dashboard/admin/ideas`, {
//     credentials: "include",
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch ideas");
//   }

//   return res.json();
// };

// export const getMemberStats = async () => {
//   const res = await fetch(`${BASE_URL}/dashboard/member/stats`, {
//     credentials: "include",
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch member stats");
//   }

//   return res.json();
// };

// export const getMyIdeas = async () => {
//   const res = await fetch(`${BASE_URL}/dashboard/member/ideas`, {
//     credentials: "include",
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch my ideas");
//   }

//   return res.json();
// };




"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * ড্যাশবোর্ডের ওভারভিউ কার্ডগুলোর স্ট্যাটস ডাটা গেট করার জন্য
 * GET /api/dashboard/stats (বা আপনার ব্যাকএন্ডের সঠিক রাউট ইউআরএল)
 */
export const getDashboardStatsData = async () => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    // আপনার ব্যাকএন্ডের ড্যাশবোর্ড স্ট্যাটস এপিআই এন্ডপয়েন্টটি এখানে বসান
    const res = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      cache: "no-store", // ডাটা যাতে সবসময় লাইভ বা ফ্রেশ থাকে
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    return await res.json();
  } catch (error: any) {
    
    return { success: false, message: error.message };
  }
};