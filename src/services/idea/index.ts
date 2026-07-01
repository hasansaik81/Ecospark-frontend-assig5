// "use server";



// // export const getAllIdea = async () => {
// //   try {
// //     const res = await fetch(
// //       `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/`,
      
// //       {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
          
// //         },
// //         next: {
// //           revalidate: 3600,
// //         },
// //       },
// //     );
// //     const result = await res.json();

// //     return result;
// //   } catch (error: any) {
// //     return Error(error);
// //   }
// // };


// "use server";

// import { cookies } from "next/headers";

// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/ideas`;

// // 🔑 কমন হেল্পার ফাংশন: কুকি থেকে টোকেন তুলে হেডার্স রেডি করার জন্য
// const getAuthHeaders = async (isFormData = false) => {
//   const store = await cookies();
//   const token = store.get("token")?.value;

//   const headers: Record<string, string> = {
//     Authorization: token || "",
//   };

//   // FormData পাঠালে ব্রাউজার নিজে বাউন্ডারি সেট করে, তাই Content-Type দেওয়া যাবে না
//   if (!isFormData) {
//     headers["Content-Type"] = "application/json";
//   }

//   return headers;
// };

// // ==========================================
// // ১. পাবলিক রুটস (Public Routes) - No Auth/Cookie Needed
// // ==========================================

// // সব আইডিয়া গেট করা (GET /ideas/public)
// export const getAllIdea= async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/public`, { cache: "no-store" });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // আইডিয়ার আইডি দিয়ে ডিটেইলস দেখা (GET /ideas/:id)
// // export const getIdeaById = async (id: string) => {
// //   try {
// //     const res = await fetch(`${BASE_URL}/${id}`,
// //        { cache: "no-store" });
// //     return await res.json();
// //   } catch (error: any) {
// //     return { success: false, message: error.message };
// //   }
// // };



// export const getIdeaById = async (id: string) => {
//   try {
//     const res = await fetch(`${BASE_URL}/${id}`, {
//       cache: "no-store",
//     });

//     const result = await res.json();

//     console.log("SERVICE RESULT:", result);

//     return result;
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };



// // নিজের সাবমিট করা আইডিয়াগুলো দেখা (GET /ideas/my)
// export const getMyIdeas = async () => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/my`, { 
//       method: "GET",
//       headers, 
//       cache: "no-store" 
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // আইডিয়া আপডেট করা (PATCH /ideas/:id)
// export const updateIdea = async (id: string, updatedData: any) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/${id}`, {
//       method: "PATCH",
//       headers,
//       body: JSON.stringify(updatedData),
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // আইডিয়া ফাইনাল সাবমিট করা (PATCH /ideas/:id/submit)
// export const submitIdeaToAdmin = async (id: string) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/${id}/submit`, {
//       method: "PATCH",
//       headers,
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // মেম্বার কর্তৃক আইডিয়া ডিলিট করা (DELETE /ideas/:id)
// export const deleteIdeaByMember = async (id: string) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/${id}`, {
//       method: "DELETE",
//       headers,
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // ==========================================
// // ৩. অ্যাডমিন রুটস (Admin Routes) - Requires Admin Cookie Token
// // ==========================================

// // অ্যাডমিনের সব আইডিয়া দেখার রুট (GET /ideas/admin/ideas)
// export const getAllIdeasAdmin = async () => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/admin/ideas`, { 
//       method: "GET",
//       headers, 
//       cache: "no-store" 
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // আইডিয়া অ্যাপ্রুভ করা (PATCH /ideas/admin/ideas/:id/approve)
// export const approveIdea = async (id: string) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/admin/ideas/${id}/approve`, {
//       method: "PATCH",
//       headers,
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // আইডিয়া রিজেক্ট করা (PATCH /ideas/admin/ideas/:id/reject)
// export const rejectIdea = async (id: string, reason: string) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/admin/ideas/${id}/reject`, {
//       method: "PATCH",
//       headers,
//       body: JSON.stringify({ reason }),
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// // অ্যাডমিন কর্তৃক আইডিয়া ডিলিট করা (DELETE /ideas/admin/ideas/:id)
// export const deleteIdeaByAdmin = async (id: string) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/admin/ideas/${id}`, {
//       method: "DELETE",
//       headers,
//     });
//     return await res.json();
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };


// export const createIdea = async (formData: FormData) => {
//   try {
//     const store = await cookies();
//     const token = store.get("token")?.value;

//     // 🚀 ফিক্সড: "Content-Type" বাদ দেওয়া হয়েছে এবং body-তে সরাসরি formData পাস করা হয়েছে
//     const res = await fetch(`${BASE_URL}/ideas`, { 
//       method: "POST",
//       headers: {
//         Authorization: token || "", // শুধুমাত্র টোকেন থাকবে, Content-Type ব্রাউজার অটো সেট করবে
//       },
//       body: formData, // 👈 এখানে সরাসরি formData ভ্যারিয়েবলটি বসানো হলো
//     });

//     if (!res.ok) {
//       throw new Error("Failed to create idea");
//     }

//     return await res.json();
//   } catch (error) {
//     if (error instanceof Error) return { success: false, message: error.message };
//     return { success: false, message: "An unknown error occurred" };
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
export const getAllIdea = async () => {
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
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
      cache: "no-store",
      headers,
    });

    const result = await res.json().catch(() => null);
    console.log("SERVICE RESULT:", result);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
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

// ==========================================
// ✅ ক্রিয়েট আইডিয়া (FIXED)
// ==========================================
// ==========================================
// ✅ ক্রিয়েটアイデア (FIXED URL)
// ==========================================




// ==========================================
// ✅ ক্রিয়েট আইডিয়া (COMPLETE & FIXED)
// ==========================================
export const createIdea = async (payload: FormData | Record<string, unknown>) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const headers: Record<string, string> = {
      Authorization: token || "",
    };

    let body: BodyInit | undefined;

    if (payload instanceof FormData) {
      body = payload;
    } else {
      const jsonPayload = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined && value !== null)
      );
      body = JSON.stringify(jsonPayload);
      headers["Content-Type"] = "application/json";
    }

    console.log("📤 Creating idea with request body:");
    console.log(body);

    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers,
      body,
    });

    const result = await res.json();
    console.log("📥 Server response:", result);

    if (!res.ok) {
      throw new Error(result.message || "Failed to create idea");
    }

    return result;
  } catch (error) {
    console.error("❌ Create idea error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};