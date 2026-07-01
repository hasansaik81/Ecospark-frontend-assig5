// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const createCheckoutSession = async (ideaId: string) => {
//   const res = await fetch(`${BASE_URL}/payments/checkout/${ideaId}`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.json();
// };

// export const verifyPayment = async (ideaId: string) => {
//   const res = await fetch(`${BASE_URL}/payments/verify/${ideaId}`, {
//     method: "GET",
//     credentials: "include",
//   });

//   return res.json();
// };




// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const createCheckoutSession = async (ideaId: string) => {
//   const res = await fetch(`${BASE_URL}/payments/checkout/${ideaId}`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create checkout session");
//   }

//   return res.json();
// };

// export const verifyPayment = async (ideaId: string) => {
//   const res = await fetch(`${BASE_URL}/payments/verify/${ideaId}`, {
//     credentials: "include",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to verify payment");
//   }

//   return res.json();
// };



const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCheckoutSession = async (ideaId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/payments/checkout/${ideaId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 🎯 যদি এপিআই রেসপন্স সাকসেসফুল না হয় (যেমন ৪০০, ৪MD, ৫০০)
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.message || `HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("🔴 Error in createCheckoutSession:", error);
    return { success: false, message: "Failed to create checkout session" };
  }
};

export const verifyPayment = async (ideaId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/payments/verify/${ideaId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.message || `HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("🔴 Error in verifyPayment:", error);
    return { success: false, message: "Payment verification failed" };
  }
};