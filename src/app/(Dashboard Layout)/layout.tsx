// // "use client";

// // import * as React from "react";
// // import {
// //   LayoutDashboard,
// //   Leaf,
// //   Users,
// //   Calendar,
// //   BarChart3,
// //   Settings,
// //   FileText,
// //   BadgeDollarSign,
// // } from "lucide-react";

// // import { NavMain } from "@/components/nav-main";
// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarFooter,
// //   SidebarHeader,
// //   SidebarRail,
// // } from "@/components/ui/sidebar";
// // import { NavMain } from "./nav-main";

// // type UserRole = "ADMIN" | "USER" | "SERVICE_PROVIDER";

// // interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
// //   userRole: UserRole;
// // }

// // const NAV_CONFIG = {
// //   ADMIN: [
// //     {
// //       title: "Admin Dashboard",
// //       url: "/dashboard/admin",
// //       icon: LayoutDashboard,
// //       isActive: true,
// //       items: [
// //         {
// //           title: "Overview",
// //           url: "/dashboard/admin",
// //         },
// //         {
// //           title: "Manage Services",
// //           url: "/dashboard/admin/services",
// //         },
// //         {
// //           title: "Manage Users",
// //           url: "/dashboard/admin/users",
// //         },
// //         {
// //           title: "Bookings",
// //           url: "/dashboard/admin/bookings",
// //         },
// //         {
// //           title: "Analytics",
// //           url: "/dashboard/admin/analytics",
// //         },
// //       ],
// //     },
// //     {
// //       title: "Sustainability",
// //       url: "#",
// //       icon: Leaf,
// //       items: [
// //         {
// //           title: "Eco Projects",
// //           url: "/dashboard/admin/projects",
// //         },
// //         {
// //           title: "Carbon Reports",
// //           url: "/dashboard/admin/reports",
// //         },
// //       ],
// //     },
// //   ],

// //   USER: [
// //     {
// //       title: "My Dashboard",
// //       url: "/dashboard/user",
// //       icon: LayoutDashboard,
// //       isActive: true,
// //       items: [
// //         {
// //           title: "Profile",
// //           url: "/dashboard/user/profile",
// //         },
// //         {
// //           title: "My Bookings",
// //           url: "/dashboard/user/bookings",
// //         },
// //         {
// //           title: "Saved Services",
// //           url: "/dashboard/user/saved-services",
// //         },
// //       ],
// //     },
// //     {
// //       title: "Green Activities",
// //       url: "#",
// //       icon: Leaf,
// //       items: [
// //         {
// //           title: "Eco Challenges",
// //           url: "/dashboard/user/challenges",
// //         },
// //         {
// //           title: "My Contributions",
// //           url: "/dashboard/user/contributions",
// //         },
// //       ],
// //     },
// //   ],

// //   SERVICE_PROVIDER: [
// //     {
// //       title: "Provider Dashboard",
// //       url: "/dashboard/provider",
// //       icon: LayoutDashboard,
// //       isActive: true,
// //       items: [
// //         {
// //           title: "My Services",
// //           url: "/dashboard/provider/services",
// //         },
// //         {
// //           title: "Booking Requests",
// //           url: "/dashboard/provider/bookings",
// //         },
// //         {
// //           title: "Earnings",
// //           url: "/dashboard/provider/earnings",
// //         },
// //       ],
// //     },
// //     {
// //       title: "Reports",
// //       url: "#",
// //       icon: FileText,
// //       items: [
// //         {
// //           title: "Performance",
// //           url: "/dashboard/provider/performance",
// //         },
// //         {
// //           title: "Monthly Reports",
// //           url: "/dashboard/provider/reports",
// //         },
// //       ],
// //     },
// //   ],
// // };

// // export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
// //   const navItems = NAV_CONFIG[userRole];

// //   return (
// //     <Sidebar collapsible="icon" {...props}>
// //       <SidebarHeader>
// //         <div className="flex items-center gap-2 px-2 py-3">
// //           <Leaf className="h-6 w-6 text-green-600" />
// //           <span className="font-bold text-lg">EcoSpark</span>
// //         </div>
// //       </SidebarHeader>

// //       <SidebarContent>
// //         <NavMain items={navItems} />
// //       </SidebarContent>

// //       <SidebarFooter>
// //         <div className="px-4 py-2 text-xs text-muted-foreground">
// //           EcoSpark v1.0
// //         </div>
// //       </SidebarFooter>

// //       <SidebarRail />
// //     </Sidebar>
// //   );
// // }



// // import { AppSidebar } from "@/components/ui/app-sidebar";
// // import { AppSidebar } from "@/components/ui/app-sidebar";
// // import { AppSidebar } from "@/components/ui/app-sidebar";
// // import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// // // import { AppSidebar } from "@/components/app-sidebar";

// // // রোল টাইপ ডিফাইন করা হলো
// // type UserRole = "ADMIN" | "MEMBER";

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   // এখানে Type Assertion (as UserRole) ব্যবহার করা হয়েছে যাতে টাইপ মিসম্যাচ না হয়
// //   const mockUserRole = "ADMIN" as UserRole; 

// //   return (
// //     <SidebarProvider>
// //       <div className="flex min-h-screen w-full bg-slate-50/50 dark:bg-zinc-950">
        
// //         {/* এখানে mockUserRole ব্যবহার করা হয়েছে */}
// //         <AppSidebar userRole={mockUserRole} />
        
// //         <div className="flex-1 flex flex-col min-w-0">
          
// //           {/* টপ বার - এখানেও mockUserRole রিড করা হচ্ছে */}
// //           <header className="flex h-14 items-center gap-4 border-b bg-background px-6 shrink-0">
// //             <SidebarTrigger />
// //             <div className="font-semibold text-sm text-muted-foreground">
// //               EcoSpark Workspace ({mockUserRole === "ADMIN" ? "Admin Portal" : "Member Hub"})
// //             </div>
// //           </header>
          
// //           {/* ডান পাশের এরিয়া */}
// //           <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-y-auto">
            
// //             <main className="lg:col-span-2 flex flex-col gap-4">
// //               {children}
// //             </main>
            
// //             {/* কন্ডিশনাল চেকিংয়েও mockUserRole ব্যবহার করা হয়েছে */}
// //             <aside className="hidden lg:flex flex-col gap-4 border-l pl-6">
              
// //               {/* ADMIN SIDE PANEL */}
// //               {mockUserRole === "ADMIN" && (
// //                 <>
// //                   <div className="rounded-xl border bg-card p-4 shadow-sm">
// //                     <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
// //                       ⚠️ Quick Actions (Admin)
// //                     </h3>
// //                     <p className="text-xs text-muted-foreground mb-3">
// //                       পেন্ডিং আইডিয়াগুলো দ্রুত মডারেট করুন।
// //                     </p>
// //                     <div className="space-y-2">
// //                       <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-xs rounded border border-amber-200 dark:border-amber-900/50">
// //                         <strong>৩টি নতুন আইডিয়া</strong> রিভিউয়ের অপেক্ষায় আছে।
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="rounded-xl border bg-card p-4 shadow-sm">
// //                     <h3 className="font-semibold text-sm mb-2">📊 System Status</h3>
// //                     <div className="text-xs space-y-2 text-muted-foreground">
// //                       <div className="flex justify-between border-b pb-1">
// //                         <span>Total Users:</span> <span className="font-bold text-foreground">১,২৪০ জন</span>
// //                       </div>
// //                       <div className="flex justify-between border-b pb-1">
// //                         <span>Approved Ideas:</span> <span className="font-bold text-foreground">৪৫২ টি</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}

// //               {/* MEMBER SIDE PANEL */}
// //               {mockUserRole === "MEMBER" && (
// //                 <>
// //                   <div className="rounded-xl border bg-card p-4 shadow-sm">
// //                     <h3 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
// //                       🌱 My Eco-Impact
// //                     </h3>
// //                     <p className="text-xs text-muted-foreground mb-3">
// //                       আপনার পরিবেশগত অবদানের সংক্ষিপ্ত রূপ।
// //                     </p>
// //                     <div className="space-y-2">
// //                       <div className="p-2 bg-green-50 dark:bg-green-950/20 text-xs rounded border border-green-200 dark:border-green-900/50">
// //                         🎉 অভিনন্দন! আপনার আইডিয়ায় <strong>১৫টি নতুন vote</strong> পড়েছে।
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="rounded-xl border bg-card p-4 shadow-sm">
// //                     <h3 className="font-semibold text-sm mb-2">💡 Tips for Better Ideas</h3>
// //                     <p className="text-xs text-muted-foreground leading-relaxed">
// //                       আপনার আইডিয়াটি সাবমিট করার আগে সেটির বাস্তবায়ন যোগ্যতা সুন্দরভাবে ফুটিয়ে তুলুন।
// //                     </p>
// //                   </div>
// //                 </>
// //               )}

// //             </aside>

// //           </div>
// //         </div>
        
// //       </div>
// //     </SidebarProvider>
// //   );
// // }



// // import React from "react";
// // import Link from "next/link";

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="flex h-screen bg-gray-100 overflow-hidden">
      
// //       {/* ১. বামপাশের সাইডবার (Sidebar) */}
// //       <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
// //         <div className="p-5">
// //           <h1 className="text-xl font-bold tracking-wider text-indigo-400 uppercase">
// //             Idea Platform
// //           </h1>
          
// //           {/* নেভিগেশন লিঙ্কসমূহ */}
// //           <nav className="mt-8 space-y-2">
// //             <Link 
// //               href="/dashboard" 
// //               className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white"
// //             >
// //               📊 Overview
// //             </Link>
// //             <Link 
// //               href="/dashboard/admin/users" 
// //               className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white"
// //             >
// //               👥 Manage Users
// //             </Link>
// //             <Link 
// //               href="/dashboard/member/ideas" 
// //               className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white"
// //             >
// //               💡 My Ideas
// //             </Link>
// //           </nav>
// //         </div>

// //         {/* সাইডবারের নিচের অংশ (যেমন: প্রোফাইল বা লগআউট) */}
// //         <div className="p-5 border-t border-slate-800">
// //           <button className="w-full text-left text-sm text-rose-400 hover:text-rose-300 font-medium">
// //             🚪 Logout
// //           </button>
// //         </div>
// //       </aside>

// //       {/* ২. ডানপাশের মেইন কনটেন্ট এরিয়া */}
// //       <div className="flex-1 flex flex-col overflow-y-auto">
        
// //         {/* টপ বার / হেডার (Navbar) */}
// //         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
// //           <h2 className="text-sm font-semibold text-gray-700">Welcome Back!</h2>
// //           <div className="flex items-center space-x-4">
// //             <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-semibold">
// //               Admin
// //             </span>
// //             <div className="w-8 h-8 rounded-full bg-slate-300" /> {/* ইউজার প্রোফাইল ইমেজ */}
// //           </div>
// //         </header>

// //         {/* ডাইনামিক পেইজ কনটেন্ট (এখানেই page.tsx এর ফাইলগুলো রেন্ডার হবে) */}
// //         <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
// //           {children}
// //         </main>
// //       </div>

// //     </div>
// //   );
// // }




// // import React from "react";
// // import Link from "next/link";
// // import { cookies } from "next/headers";
// // import { getProfile } from "@/services/user"; // আপনার তৈরি করা ইউজার সার্ভিস

// // interface DashboardLayoutProps {
// //   children: React.ReactNode;
// //   admin: React.ReactNode;   // @admin ফোল্ডার
// //   member: React.ReactNode;  // @member ফোল্ডার
// // }

// // export default async function DashboardLayout({
// //   children,
// //   admin,
// //   member,
// // }: DashboardLayoutProps) {
  
// //   // 🔑 ১. সার্ভার সাইডেই ইউজারের প্রোফাইল বা রোল ডাটা গেট করা
// //   const profileRes = await getProfile();
  
// //   // যদি প্রোফাইল ডাটা সাকসেসফুলি আসে তবে তার রোল নিবে, নাহলে ডিফল্ট "MEMBER"
// //   const userRole: "ADMIN" | "MEMBER" = profileRes?.success ? profileRes.data.role : "MEMBER"; 

// //   return (
// //     <div className="flex h-screen bg-gray-100 overflow-hidden">
      
// //       {/* ১. বামপাশের সাইডবার (Sidebar) */}
// //       <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
// //         <div className="p-5">
// //           <h1 className="text-xl font-bold tracking-wider text-indigo-400 uppercase">
// //             Idea Platform
// //           </h1>
          
// //           <nav className="mt-8 space-y-2">
// //             <Link href="/dashboard" className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white">
// //               📊 Overview
// //             </Link>
            
// //             {/* রোলের ওপর ভিত্তি করে সাইডবার মেনু ডাইনামিকালি চেঞ্জ হবে */}
// //             {userRole === "ADMIN" && (
// //               <Link href="/dashboard/admin/users" className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white">
// //                 👥 Manage Users
// //               </Link>
// //             )}
// //             {userRole === "MEMBER" && (
// //               <Link href="/dashboard/member/ideas" className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white">
// //                 💡 My Ideas
// //               </Link>
// //             )}
// //           </nav>
// //         </div>

// //         <div className="p-5 border-t border-slate-800">
// //           <button className="w-full text-left text-sm text-rose-400 hover:text-rose-300 font-medium">
// //             🚪 Logout
// //           </button>
// //         </div>
// //       </aside>

// //       {/* ২. ডানপাশের মেইন কনটেন্ট এরিয়া */}
// //       <div className="flex-1 flex flex-col overflow-y-auto">
        
// //         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
// //           <h2 className="text-sm font-semibold text-gray-700">
// //             Welcome Back, {profileRes?.data?.name || "User"}!
// //           </h2>
// //           <div className="flex items-center space-x-4">
// //             <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-semibold uppercase">
// //               {userRole}
// //             </span>
// //             {/* ডাইনামিক প্রোফাইল ইমেজ থাকলে সেটা দেখাবে */}
// //             {profileRes?.data?.profileImage ? (
// //               <img src={profileRes.data.profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
// //             ) : (
// //               <div className="w-8 h-8 rounded-full bg-slate-300" />
// //             )}
// //           </div>
// //         </header>

// //         {/* 🧩 মেইন কনটেন্ট এরিয়া - কন্ডিশনাল রেন্ডার */}
// //         <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
// //           {/* সার্ভার থেকে আসা রোল অনুযায়ী সঠিক স্লট কম্পোনেন্ট রেন্ডার হবে */}
// //           {userRole === "ADMIN" ? admin : member}
          
// //           {/* সাব-রাউটের কনটেন্টের জন্য children */}
// //           {children}
// //         </main>
// //       </div>

// //     </div>
// //   );
// // }





// // src/app/(dashboard)/layout.tsx
// import { AppSidebar } from "@/components/ui/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { TooltipProvider } from "@/components/ui/tooltip"; // 🌟 ১. টুলটিপ প্রোভাইডার ইম্পোর্ট করা হলো
// import { getUser } from "@/services/auth"; 

// export default async function DashboardLayout({
//   admin,
//   member, 
// }: {
//   admin: React.ReactNode;
//   member: React.ReactNode; 
// }) {
//   // 🔑 ইউজারের ডাটা ও রোল রিড হচ্ছে
//   const user = await getUser(); 

//   return (
//     // 🌟 ২. পুরো সাইডবার স্ট্রাকচারকে TooltipProvider দিয়ে র‍্যাপ করা হলো
//     <TooltipProvider>
//       <SidebarProvider>
//         {/* সাইডবারে রোল পাস করা হলো */}
//         <AppSidebar userRole={user?.role as any} /> 
        
//         <SidebarInset>
//           <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
//             <div className="flex items-center gap-2 px-4">
//               <SidebarTrigger className="-ml-1" />
//               <Separator orientation="vertical" className="mr-2 h-4" />
//               <Breadcrumb>
//                 <BreadcrumbList>
//                   <BreadcrumbItem className="hidden md:block">
//                     <BreadcrumbLink href="#">EcoSpark Platform</BreadcrumbLink>
//                   </BreadcrumbItem>
//                   <BreadcrumbSeparator className="hidden md:block" />
//                   <BreadcrumbItem>
//                     <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
//                   </BreadcrumbItem>
//                 </BreadcrumbList>
//               </Breadcrumb>
//             </div>
//           </header>

//           {/* 🔄 রোল অনুযায়ী সঠিক ড্যাশবোর্ড স্ক্রিন রেন্ডার হবে */}
//           <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//             <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
//               {user?.role === "ADMIN" && admin}
//               {user?.role === "MEMBER" && member} 
//             </div>
//           </div>
//         </SidebarInset>
//       </SidebarProvider>
//     </TooltipProvider>
//   );
// }






// import { AppSidebar } from "@/components/ui/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { getUser } from "@/services/auth";

// interface DashboardLayoutProps {
//   admin: React.ReactNode;
//   member: React.ReactNode;
// }

// export default async function DashboardLayout({
//   admin,
//   member,
// }: DashboardLayoutProps) {
//   // 🔑 সার্ভার সাইড থেকে ইউজারের সেশন ও রোল রিল করা হচ্ছে
//   const user = await getUser();

//   // 🎯 টাইপ কনফ্লিক্ট এড়াতে এবং সাইডবারের NAV_CONFIG এর সাথে মেলাতে ফলব্যাক করা হলো
//   // আপনার সাইডবারে যদি "USER" থাকে তবে "MEMBER" কে "USER" এ কনভার্ট করে দেওয়া নিরাপদ
//   const normalizedRole = user?.role === "MEMBER" ? "USER" : user?.role || "USER";

//   return (
//     <TooltipProvider>
//       <SidebarProvider>
//         {/* 🎯 সাইডবারে সেফলি রুল পাস করা হলো */}
//         <AppSidebar userRole={normalizedRole as any} />
        
//         <SidebarInset>
//           <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
//             <div className="flex items-center gap-2 px-4">
//               <SidebarTrigger className="-ml-1" />
//               <Separator orientation="vertical" className="mr-2 h-4" />
//               <Breadcrumb>
//                 <BreadcrumbList>
//                   <BreadcrumbItem className="hidden md:block">
//                     <BreadcrumbLink href="#">EcoSpark Platform</BreadcrumbLink>
//                   </BreadcrumbItem>
//                   <BreadcrumbSeparator className="hidden md:block" />
//                   <BreadcrumbItem>
//                     <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
//                   </BreadcrumbItem>
//                 </BreadcrumbList>
//               </Breadcrumb>
//             </div>
//           </header>

//           {/* 🔄 রোল অনুযায়ী সঠিক প্যারালাল স্লট স্ক্রিন রেন্ডার হবে */}
//           <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//             <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
//               {user?.role === "ADMIN" && admin}
//               {(user?.role === "MEMBER" || user?.role === "USER") && member}
//             </div>
//           </div>
//         </SidebarInset>
//       </SidebarProvider>
//     </TooltipProvider>
//   );
// }




import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getUser } from "@/services/auth";

// 🎯 Step 1: children সহ প্রোপস টাইপ ডিফাইন করা হলো
interface DashboardLayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
  member: React.ReactNode;
}

// 🎯 Step 2: children প্রোপটি ডিস্ট্রাকচার করা হলো
export default async function DashboardLayout({
  children,
  admin,
  member,
}: DashboardLayoutProps) {
  
  // ইউজারের সেশন ও রোল রিড করা হচ্ছে
  const user = await getUser();

  // সাইডবার কনফিগারেশনের সাথে রোল ম্যাচিং
  const normalizedRole = user?.role === "ADMIN" ? "ADMIN" : "MEMBER";
  const isAdmin = normalizedRole === "ADMIN";
  const isMember = normalizedRole === "MEMBER";

  return (
    <TooltipProvider>
      <SidebarProvider>
        {/* সাইডবার */}
        <AppSidebar userRole={normalizedRole} />
        
        <SidebarInset>
          {/* হেডার / টপ বার */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">EcoSpark Platform</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* 🔄 Step 3: কন্টেন্ট এরিয়া যেখানে প্যারালাল স্লট এবং নরমাল children দুইটাই হ্যান্ডেল হবে */}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
              
              {/* ১. রোল অনুযায়ী প্যারালাল ড্যাশবোর্ড স্লট রেন্ডার হবে */}
              {isAdmin && admin}
              {isMember && member}
              
              {/* ২. 🎯 নরমাল চাইল্ড রাউট (যেমন: /payment/[id]) রেন্ডার করার জন্য children */}
              {children}

            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}