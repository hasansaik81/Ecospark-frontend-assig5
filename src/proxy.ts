// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ১. যে রাউটগুলো আমরা প্রটেক্ট করতে চাই
const PROTECTED_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // কুকি থেকে টোকেন এবং ইউজারের রোল রিড করা (আপনার auth/login সিস্টেম অনুযায়ী)
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("role")?.value; // ব্যাকএন্ড থেকে লগইনের সময় role কুকিতে সেভ করে রাখলে বেস্ট হয়

  // 🔒 কন্ডিশন ১: ইউজার লগইন ছাড়া ড্যাশবোর্ডে ঢোকার চেষ্টা করলে লগইনে রিডাইরেক্ট হবে
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // লগইন করার পর ইউজার যেন আগের পেইজেই ফেরত আসতে পারে, সেজন্য callback url রাখা হলো
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 🛡️ কন্ডিশন ২: রোল ভিত্তিক প্রটেকশন (Role-Based Access Control)
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      // এডমিন না হয়েও এডমিন প্যানেলে ঢুকতে চাইলে মেম্বার ড্যাশবোর্ডে রিডাইরেক্ট করবে
      return NextResponse.redirect(new URL("/dashboard/member", request.url));
    }

    if (pathname.startsWith("/dashboard/member") && userRole !== "MEMBER") {
      // মেম্বার না হয়ে মেম্বার প্যানেলে ঢুকতে চাইলে এডমিন ড্যাশবোর্ডে রিডাইরেক্ট করবে
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  // 🔑 কন্ডিশন ৩: ইউজার অলরেডি লগইন থাকা অবস্থায় আবার লগইন/রেজিস্টার পেইজে যেতে চাইলে ড্যাশবোর্ডে পাঠিয়ে দেবে
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token) {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard/member", request.url));
    }
  }

  return NextResponse.next();
}

// 🎯 কোন কোন পাথে এই মিডলওয়্যারটি রান করবে তা বলে দেওয়া হলো
export const config = {
  matcher: [
    "/dashboard/:path*", // ড্যাশবোর্ডের ভেতরের সব সাব-রাউট
    "/login",
    "/register"
  ],
};


// src/proxy.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const PROTECTED_ROUTES = ["/dashboard"];
// const AUTH_ROUTES = ["/login", "/register"];

// // ✅ Next.js 16 অনুযায়ী ফাংশনের নাম অবশ্যই 'proxy' হতে হবে
// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // ১. স্ট্যাটিক ফাইল এবং ইন্টারনাল রাউটগুলোকে স্কিপ করা
//   if (
//     pathname.startsWith("/_next") || 
//     pathname.startsWith("/api") || 
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   // কুকি থেকে টোকেন এবং ইউজারের রোল রিড করা
//   const token = request.cookies.get("token")?.value;
//   const userRole = request.cookies.get("role")?.value; 

//   // 🔒 কন্ডিশন ১: লগইন ছাড়া প্রটেক্টেড রাউটে ঢোকার চেষ্টা করলে
//   if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
//     if (!token) {
//       const loginUrl = new URL("/login", request.url);
//       loginUrl.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     // ইউজার যদি সরাসরি '/dashboard'-এ হিট করে
//     if (pathname === "/dashboard" || pathname === "/dashboard/") {
//       if (userRole === "ADMIN") {
//         return NextResponse.redirect(new URL("/dashboard/admin", request.url));
//       }
//       return NextResponse.redirect(new URL("/dashboard/member", request.url));
//     }

//     // রোল ভিত্তিক প্রটেকশন
//     if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
//       return NextResponse.redirect(new URL("/dashboard/member", request.url));
//     }

//     if (pathname.startsWith("/dashboard/member") && userRole !== "MEMBER") {
//       return NextResponse.redirect(new URL("/dashboard/admin", request.url));
//     }
//   }

//   // 🔑 কন্ডিশন ২: লগইন থাকা অবস্থায় লগইন/রেজিস্টার পেইজে যেতে চাইলে
//   if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
//     if (token) {
//       if (userRole === "ADMIN") {
//         return NextResponse.redirect(new URL("/dashboard/admin", request.url));
//       }
//       return NextResponse.redirect(new URL("/dashboard/member", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// // 🎯 Matcher কনফিগারেশন
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };