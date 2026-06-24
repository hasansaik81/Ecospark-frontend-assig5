"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔑 কমন হেল্পার: কুকি থেকে টোকেন তুলে হেডার্স রেডি করার জন্য
const getAuthHeaders = async () => {
  const store = await cookies();
  const token = store.get("token")?.value;
  return {
    "Content-Type": "application/json",
    Authorization: token || "",
  };
};

// =============================================================================
// 🗂️ CATEGORY SERVICES (ক্যাটাগরি রুটস)
// =============================================================================

/**
 * ১. সব ক্যাটাগরি দেখা (GET /categories - Public)
 */
export const getAllCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ২. আইডি দিয়ে নির্দিষ্ট ক্যাটাগরি দেখা (GET /categories/:id - Public)
 */
export const getCategoryById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, { cache: "no-store" });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৩. নতুন ক্যাটাগরি তৈরি করা (POST /categories - Admin Only)
 */
export const createCategory = async (data: { name: string; slug?: string }) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৪. ক্যাটাগরি আপডেট করা (PATCH /categories/:id - Admin Only)
 */
export const updateCategory = async (id: string, data: any) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/categories/${id}`, {
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
 * ৫. ক্যাটাগরি ডিলিট করা (DELETE /categories/:id - Admin Only)
 */
export const deleteCategory = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


// =============================================================================
// 💬 COMMENT SERVICES (কমেন্ট রুটস)
// =============================================================================

/**
 * ৬. কোনো আইডিয়ার সব কমেন্ট দেখা (GET /comments/:ideaId)
 * @param ideaId - আপনার এক্সপ্রেসের রাউট অনুযায়ী এখানে আইডি হচ্ছে ideaId
 */
export const getCommentsByIdea = async (ideaId: string) => {
  try {
    const res = await fetch(`${API_URL}/comments/${ideaId}`, { cache: "no-store" });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৭. নতুন কমেন্ট পোস্ট করা (POST /comments/:ideaId - Member Only)
 */
export const createComment = async (ideaId: string, commentText: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/comments/${ideaId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ comment: commentText }), // আপনার জড ভ্যালিডেশন স্কিমা অনুযায়ী ফিল্ড নাম পরিবর্তন করতে পারেন
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ৮. কমেন্ট ডিলিট করা (DELETE /comments/:commentId - Auth Required)
 */
export const deleteComment = async (commentId: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


// =============================================================================
// 🔺 VOTE SERVICES (ভোট রুটস)
// =============================================================================

/**
 * ৯. আইডিয়াতে ভোট দেওয়া (POST /votes/:ideaId/vote - Member Only)
 */
export const castVote = async (ideaId: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/votes/${ideaId}/vote`, {
      method: "POST",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/**
 * ১০. ভোট রিমুভ করা (DELETE /votes/:ideaId/vote - Member Only)
 */
export const removeVote = async (ideaId: string) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/votes/${ideaId}/vote`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};