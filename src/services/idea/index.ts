"use server";




import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/ideas`;

// 🔑 কমন হেল্পার ফাংশন: কুকি থেকে টোকেন তুলে হেডার্স রেডি করার জন্য
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






export const getAuthHeaders = async (isFormData = false) => {
  const store = await Promise.resolve(cookies());

  const token = store.get("token")?.value;

  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

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
    const res = await fetch(`${BASE_URL}/public`, { //cache: "no-store" ,
      next:{revalidate:0}
    },
      
    );
   
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// আইডিয়ার আইডি দিয়ে ডিটেইলস দেখা (GET /ideas/:id)
// export const getIdeaById = async (id: string) => {
//   try {
//     const headers = await getAuthHeaders();
//     const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
//       cache: "no-store",
//       headers,
//     });

//     const result = await res.json().catch(() => null);
//     console.log("SERVICE RESULT:", result);
//     return result;
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

// export const getIdeaById = async (id: string) => {
//   try {
//     const headers = await getAuthHeaders();

//     const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
//       cache: "no-store",
//       headers,
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return {
//         success: false,
//         statusCode: res.status,
//         message: data?.message || "Request failed",
//         data: null,
//       };
//     }

//     return {
//       success: true,
//       statusCode: res.status,
//       message: data?.message,
//       data: data.data,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       statusCode: 500,
//       message: error?.message || "Something went wrong",
//       data: null,
//     };
//   }
// };


// export const getIdeaById = async (id: string) => {
//   const headers = await getAuthHeaders();

//   const res = await fetch(`${BASE_URL}/${id}`, {
//     cache: "no-store",
//     headers,
//   });

//  const data = await res.json();

// console.log("Status:", res.status);
// console.log("Response:", data);

// if (!res.ok) {
//   throw new Error(data.message);
// }
// };




// const getIdeaById = async (
//   id: string,
//   currentUserId?: string,
//   currentUserRole?: string
// ) => {
//   const idea = await prisma.idea.findUnique({
//     where: { id },
//     include: {
//       category: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
//       author: {
//         select: {
//           id: true,
//           name: true,
//           email: true,
//         },
//       },
//       _count: {
//         select: {
//           votes: true,
//           comments: true,
//         },
//       },
//     },
//   });

//   if (!idea || idea.isDeleted) {
//     throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
//   }

//   const isOwner = currentUserId === idea.authorId;
//   const isAdmin = currentUserRole === "ADMIN";

//   // Owner/Admin সব দেখতে পারবে
//   if (isOwner || isAdmin) {
//     return {
//       ...idea,
//       hasPaid: true,
//     };
//   }

//   // Free idea
//   if (idea.paymentStatus === "FREE") {
//     return {
//       ...idea,
//       hasPaid: true,
//     };
//   }

//   // Guest user
//   if (!currentUserId) {
//     return {
//       ...idea,
//       hasPaid: false,
//     };
//   }

//   // Paid কিনেছে কিনা
//   const payment = await prisma.payment.findFirst({
//     where: {
//       ideaId: id,
//       userId: currentUserId,
//       status: PaymentStatus.SUCCESS,
//     },
//   });

//   return {
//     ...idea,
//     hasPaid: !!payment,
//   };
// };


// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/ideas";

// const getAuthHeaders = async () => {
//   const cookieStore = await cookies();

//   return {
//     Authorization: cookieStore.get("token")?.value || "",
//     "Content-Type": "application/json",
//   };
// };


export const getIdeaById = async (id: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",      // ✅ GET method
    cache: "no-store",
    headers,
  });

  const data = await res.json();

  return {
    success: res.ok,
    statusCode: res.status,
    message: data.message,
    data: data.data,
  };
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