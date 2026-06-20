"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        
        const result = await res.json();
        const storeCookie = await cookies();
        
        if (result.success) {
            // ⚠️ পরিবর্তন এখানে: আপনার ব্যাকএন্ড রেসপন্সে টোকেনের নাম যদি 'accessToken' হয়, তবে সেটা সেট করুন
            // উদাহরণস্বরূপ: result.data.accessToken অথবা সরাসরি result.accessToken
            const token = result?.data?.accessToken || result?.accessToken || result?.data?.token;
            
            if (token) {
                storeCookie.set("token", token, {
                    httpOnly: true, // 🔒 সিকিউরিটির জন্য যেন ব্রাউজারের জাভাস্ক্রিপ্ট টোকেন চুরি করতে না পারে
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                });
            }
        }
        return result;
    } catch (error) {
        console.log("Login Action Error:", error);
        return { success: false, message: "Something went wrong" };
    }
}

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;
  
  if (token) {
    const decodedData = jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
}


export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, { // বা আপনার ইউজার তৈরির রাউট
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...userData,
                role: "MEMBER" // ডিফল্ট মেম্বার রোল
            }),
        });
        
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("Register Action Error:", error);
        return { success: false, message: "Registration failed" };
    }
}

export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
}