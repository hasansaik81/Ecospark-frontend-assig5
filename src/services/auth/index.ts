"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
// import { cookies } from "next/dist/server/request/cookies";
import { FieldValues } from "react-hook-form";
import { AppUser } from "@/types/auth";


// export const loginUser = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(userData),
//     });

//     const result = await res.json();

//     const storeCookie = await cookies();

//     if (result.success) {
//       storeCookie.set("token", result?.data?.token); // ❌ এটা ভুল
//     }

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };




export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    console.log("LOGIN RESPONSE:", result);

    const storeCookie = await cookies();

    if (result.success) {
      const token = result?.data?.accessToken;

      console.log("TOKEN:", token);

      if (token) {
        storeCookie.set("token", token);
      }
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};




// export const getUser=async()=>{
//   const storeCookie=await cookies();
//   const token=storeCookie.get("token")?.value;
  
//   let decodedData=null;
//   if(token){
//     decodedData= await jwtDecode(token);
//     return decodedData;
//   }else{
//     return null
//   }
// }


// export const getUser = async () => {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("token")?.value;

//   console.log("TOKEN =", token);

//   if (!token) {
//     return null;
//   }

//   const decoded = jwtDecode(token);

//   return decoded;
// };


// import { jwtDecode } from "jwt-decode";

export const getUser = async (): Promise<AppUser | null> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  console.log("TOKEN =", token);

  if (!token) return null;

  const decoded = jwtDecode<AppUser>(token);

  return decoded;
};


export const UserLogOut=async()=>{
  const storeCookie=await cookies();
  storeCookie.delete("token");
  
}


// services/auth.ts এর ভেতর যোগ করুন
export const register = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { // আপনার এপিআই রুট অনুযায়ী
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, message: "Registration failed" };
  }
};


