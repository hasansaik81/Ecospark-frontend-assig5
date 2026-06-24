"use server";



// export const getAllIdea = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/`,
      
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
          
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


"use server";

import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/ideas`;

// 🔑 কমন হেল্পার ফাংশন: কুকি থেকে টোকেন তুলে হেডার্স রেডি করার জন্য
const getAuthHeaders = async (isFormData = false) => {
  const store = await cookies();
  const token = store.get("token")?.value;

  const headers: Record<string, string> = {
    Authorization: token || "",
  };

  // FormData পাঠালে ব্রাউজার নিজে বাউন্ডারি সেট করে, তাই Content-Type দেওয়া যাবে না
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

// ==========================================
// ১. পাবলিক রুটস (Public Routes) - No Auth/Cookie Needed
// ==========================================

// সব আইডিয়া গেট করা (GET /ideas/public)
export const getAllIdea= async () => {
  try {
    const res = await fetch(`${BASE_URL}/public`, { cache: "no-store" });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// আইডিয়ার আইডি দিয়ে ডিটেইলস দেখা (GET /ideas/:id)
export const getIdeaById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ==========================================
// ২. মেম্বার রুটস (Member Routes) - Requires Cookie Token
// ==========================================

// নতুন আইডিয়া ক্রিয়েট করা (POST /ideas) - ফাইল আপলোডসহ Form Data
export const createIdea = async (formData: FormData) => {
  try {
    const headers = await getAuthHeaders(true); // true মানে এটা FormData
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers,
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// নিজের সাবমিট করা আইডিয়াগুলো দেখা (GET /ideas/my)
export const getMyIdeas = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/my`, { 
      method: "GET",
      headers, 
      cache: "no-store" 
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// আইডিয়া আপডেট করা (PATCH /ideas/:id)
export const updateIdea = async (id: string, updatedData: any) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// আইডিয়া ফাইনাল সাবমিট করা (PATCH /ideas/:id/submit)
export const submitIdeaToAdmin = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${id}/submit`, {
      method: "PATCH",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// মেম্বার কর্তৃক আইডিয়া ডিলিট করা (DELETE /ideas/:id)
export const deleteIdeaByMember = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ==========================================
// ৩. অ্যাডমিন রুটস (Admin Routes) - Requires Admin Cookie Token
// ==========================================

// অ্যাডমিনের সব আইডিয়া দেখার রুট (GET /ideas/admin/ideas)
export const getAllIdeasAdmin = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/admin/ideas`, { 
      method: "GET",
      headers, 
      cache: "no-store" 
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// আইডিয়া অ্যাপ্রুভ করা (PATCH /ideas/admin/ideas/:id/approve)
export const approveIdea = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/admin/ideas/${id}/approve`, {
      method: "PATCH",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// আইডিয়া রিজেক্ট করা (PATCH /ideas/admin/ideas/:id/reject)
export const rejectIdea = async (id: string, reason: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/admin/ideas/${id}/reject`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ reason }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// অ্যাডমিন কর্তৃক আইডিয়া ডিলিট করা (DELETE /ideas/admin/ideas/:id)
export const deleteIdeaByAdmin = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/admin/ideas/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};