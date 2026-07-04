// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const createCheckoutSession = async (ideaId: string) => {
//   try {
//     const res = await fetch(`${BASE_URL}/payment/checkout/${ideaId}`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // 🎯 যদি এপিআই রেসপন্স সাকসেসফুল না হয় (যেমন ৪০০, ৪MD, ৫০০)
//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({}));
//       throw new Error(errorData?.message || `HTTP Error: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("🔴 Error in createCheckoutSession:", error);
//     return { success: false, message: "Failed to create checkout session" };
//   }
// };

// export const verifyPayment = async (ideaId: string) => {
//   try {
//     const res = await fetch(`${BASE_URL}/payment/verify/${ideaId}`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({}));
//       throw new Error(errorData?.message || `HTTP Error: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("🔴 Error in verifyPayment:", error);
//     return { success: false, message: "Payment verification failed" };
//   }
// };



"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const createCheckoutSession = async (ideaId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/payment/checkout/${ideaId}`, {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};