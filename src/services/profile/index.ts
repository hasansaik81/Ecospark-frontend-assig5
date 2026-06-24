// "use server"

// import { cookies } from "next/headers";

// export const getProfile= async () => {
//   const store= await cookies();
//   const token = store.get("token")?.value;
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:token!,
//         },
//         next: {
//           revalidate: 3600,
//         },
//       },
//     );
//     const result = await res.json();

//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };



"use server"

import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;

// 🔑 কমন ফাংশন: কুকি থেকে টোকেন তুলে হেডার্স রেডি করার জন্য
const getAuthHeaders = async () => {
  const store = await cookies();
  const token = store.get("token")?.value;
  return {
    "Content-Type": "application/json",
    "Authorization": token || "",
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// 🟢 MEMBER & ADMIN SHARED ACTIONS (নিজের প্রোফাইল)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ১. নিজের প্রোফাইল ডাটা দেখা (GET /users/me)
 */
export const getProfile = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers,
      next: { revalidate: 3600 }, // ১ ঘণ্টা ক্যাশ থাকবে
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ২. নিজের প্রোফাইল আপডেট করা (PATCH /users/me)
 */
export const updateProfile = async (data: { name?: string; profileImage?: string }) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/me`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৩. পাসওয়ার্ড পরিবর্তন করা (PATCH /users/me/change-password)
 */
export const changePassword = async (data: any) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/me/change-password`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 🔴 ADMIN ONLY ACTIONS (শুধুমাত্র এডমিনদের জন্য)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ৪. সব ইউজারের লিস্ট দেখা (GET /users)
 */
export const getAllUsers = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers,
      cache: "no-store", // এডমিন প্যানেলের জন্য সবসময় রিয়েল-টাইম ডাটা দরকার
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৫. আইডি দিয়ে নির্দিষ্ট কোনো ইউজারের ডাটা দেখা (GET /users/:id)
 */
export const getUserById = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৬. ইউজারের স্ট্যাটাস একটিভ/ডিঅ্যাক্টিভ করা (PATCH /users/:id/status)
 */
export const updateUserStatus = async (id: string, status: "ACTIVE" | "BLOCKED") => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${id}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৭. ইউজারের রোল পরিবর্তন করা MEMBER ↔ ADMIN (PATCH /users/:id/role)
 */
export const updateUserRole = async (id: string, role: "MEMBER" | "ADMIN") => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${id}/role`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ role }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};