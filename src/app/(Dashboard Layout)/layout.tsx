// "use client";

// import * as React from "react";
// import {
//   LayoutDashboard,
//   Leaf,
//   Users,
//   Calendar,
//   BarChart3,
//   Settings,
//   FileText,
//   BadgeDollarSign,
// } from "lucide-react";

// import { NavMain } from "@/components/nav-main";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { NavMain } from "./nav-main";

// type UserRole = "ADMIN" | "USER" | "SERVICE_PROVIDER";

// interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
//   userRole: UserRole;
// }

// const NAV_CONFIG = {
//   ADMIN: [
//     {
//       title: "Admin Dashboard",
//       url: "/dashboard/admin",
//       icon: LayoutDashboard,
//       isActive: true,
//       items: [
//         {
//           title: "Overview",
//           url: "/dashboard/admin",
//         },
//         {
//           title: "Manage Services",
//           url: "/dashboard/admin/services",
//         },
//         {
//           title: "Manage Users",
//           url: "/dashboard/admin/users",
//         },
//         {
//           title: "Bookings",
//           url: "/dashboard/admin/bookings",
//         },
//         {
//           title: "Analytics",
//           url: "/dashboard/admin/analytics",
//         },
//       ],
//     },
//     {
//       title: "Sustainability",
//       url: "#",
//       icon: Leaf,
//       items: [
//         {
//           title: "Eco Projects",
//           url: "/dashboard/admin/projects",
//         },
//         {
//           title: "Carbon Reports",
//           url: "/dashboard/admin/reports",
//         },
//       ],
//     },
//   ],

//   USER: [
//     {
//       title: "My Dashboard",
//       url: "/dashboard/user",
//       icon: LayoutDashboard,
//       isActive: true,
//       items: [
//         {
//           title: "Profile",
//           url: "/dashboard/user/profile",
//         },
//         {
//           title: "My Bookings",
//           url: "/dashboard/user/bookings",
//         },
//         {
//           title: "Saved Services",
//           url: "/dashboard/user/saved-services",
//         },
//       ],
//     },
//     {
//       title: "Green Activities",
//       url: "#",
//       icon: Leaf,
//       items: [
//         {
//           title: "Eco Challenges",
//           url: "/dashboard/user/challenges",
//         },
//         {
//           title: "My Contributions",
//           url: "/dashboard/user/contributions",
//         },
//       ],
//     },
//   ],

//   SERVICE_PROVIDER: [
//     {
//       title: "Provider Dashboard",
//       url: "/dashboard/provider",
//       icon: LayoutDashboard,
//       isActive: true,
//       items: [
//         {
//           title: "My Services",
//           url: "/dashboard/provider/services",
//         },
//         {
//           title: "Booking Requests",
//           url: "/dashboard/provider/bookings",
//         },
//         {
//           title: "Earnings",
//           url: "/dashboard/provider/earnings",
//         },
//       ],
//     },
//     {
//       title: "Reports",
//       url: "#",
//       icon: FileText,
//       items: [
//         {
//           title: "Performance",
//           url: "/dashboard/provider/performance",
//         },
//         {
//           title: "Monthly Reports",
//           url: "/dashboard/provider/reports",
//         },
//       ],
//     },
//   ],
// };

// export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
//   const navItems = NAV_CONFIG[userRole];

//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <div className="flex items-center gap-2 px-2 py-3">
//           <Leaf className="h-6 w-6 text-green-600" />
//           <span className="font-bold text-lg">EcoSpark</span>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <NavMain items={navItems} />
//       </SidebarContent>

//       <SidebarFooter>
//         <div className="px-4 py-2 text-xs text-muted-foreground">
//           EcoSpark v1.0
//         </div>
//       </SidebarFooter>

//       <SidebarRail />
//     </Sidebar>
//   );
// }



// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// // import { AppSidebar } from "@/components/app-sidebar";

// // রোল টাইপ ডিফাইন করা হলো
// type UserRole = "ADMIN" | "MEMBER";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // এখানে Type Assertion (as UserRole) ব্যবহার করা হয়েছে যাতে টাইপ মিসম্যাচ না হয়
//   const mockUserRole = "ADMIN" as UserRole; 

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full bg-slate-50/50 dark:bg-zinc-950">
        
//         {/* এখানে mockUserRole ব্যবহার করা হয়েছে */}
//         <AppSidebar userRole={mockUserRole} />
        
//         <div className="flex-1 flex flex-col min-w-0">
          
//           {/* টপ বার - এখানেও mockUserRole রিড করা হচ্ছে */}
//           <header className="flex h-14 items-center gap-4 border-b bg-background px-6 shrink-0">
//             <SidebarTrigger />
//             <div className="font-semibold text-sm text-muted-foreground">
//               EcoSpark Workspace ({mockUserRole === "ADMIN" ? "Admin Portal" : "Member Hub"})
//             </div>
//           </header>
          
//           {/* ডান পাশের এরিয়া */}
//           <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-y-auto">
            
//             <main className="lg:col-span-2 flex flex-col gap-4">
//               {children}
//             </main>
            
//             {/* কন্ডিশনাল চেকিংয়েও mockUserRole ব্যবহার করা হয়েছে */}
//             <aside className="hidden lg:flex flex-col gap-4 border-l pl-6">
              
//               {/* ADMIN SIDE PANEL */}
//               {mockUserRole === "ADMIN" && (
//                 <>
//                   <div className="rounded-xl border bg-card p-4 shadow-sm">
//                     <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
//                       ⚠️ Quick Actions (Admin)
//                     </h3>
//                     <p className="text-xs text-muted-foreground mb-3">
//                       পেন্ডিং আইডিয়াগুলো দ্রুত মডারেট করুন।
//                     </p>
//                     <div className="space-y-2">
//                       <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-xs rounded border border-amber-200 dark:border-amber-900/50">
//                         <strong>৩টি নতুন আইডিয়া</strong> রিভিউয়ের অপেক্ষায় আছে।
//                       </div>
//                     </div>
//                   </div>

//                   <div className="rounded-xl border bg-card p-4 shadow-sm">
//                     <h3 className="font-semibold text-sm mb-2">📊 System Status</h3>
//                     <div className="text-xs space-y-2 text-muted-foreground">
//                       <div className="flex justify-between border-b pb-1">
//                         <span>Total Users:</span> <span className="font-bold text-foreground">১,২৪০ জন</span>
//                       </div>
//                       <div className="flex justify-between border-b pb-1">
//                         <span>Approved Ideas:</span> <span className="font-bold text-foreground">৪৫২ টি</span>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* MEMBER SIDE PANEL */}
//               {mockUserRole === "MEMBER" && (
//                 <>
//                   <div className="rounded-xl border bg-card p-4 shadow-sm">
//                     <h3 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
//                       🌱 My Eco-Impact
//                     </h3>
//                     <p className="text-xs text-muted-foreground mb-3">
//                       আপনার পরিবেশগত অবদানের সংক্ষিপ্ত রূপ।
//                     </p>
//                     <div className="space-y-2">
//                       <div className="p-2 bg-green-50 dark:bg-green-950/20 text-xs rounded border border-green-200 dark:border-green-900/50">
//                         🎉 অভিনন্দন! আপনার আইডিয়ায় <strong>১৫টি নতুন vote</strong> পড়েছে।
//                       </div>
//                     </div>
//                   </div>

//                   <div className="rounded-xl border bg-card p-4 shadow-sm">
//                     <h3 className="font-semibold text-sm mb-2">💡 Tips for Better Ideas</h3>
//                     <p className="text-xs text-muted-foreground leading-relaxed">
//                       আপনার আইডিয়াটি সাবমিট করার আগে সেটির বাস্তবায়ন যোগ্যতা সুন্দরভাবে ফুটিয়ে তুলুন।
//                     </p>
//                   </div>
//                 </>
//               )}

//             </aside>

//           </div>
//         </div>
        
//       </div>
//     </SidebarProvider>
//   );
// }



import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* ১. বামপাশের সাইডবার (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div className="p-5">
          <h1 className="text-xl font-bold tracking-wider text-indigo-400 uppercase">
            Idea Platform
          </h1>
          
          {/* নেভিগেশন লিঙ্কসমূহ */}
          <nav className="mt-8 space-y-2">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white"
            >
              📊 Overview
            </Link>
            <Link 
              href="/dashboard/admin/users" 
              className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white"
            >
              👥 Manage Users
            </Link>
            <Link 
              href="/dashboard/member/ideas" 
              className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium text-sm text-gray-300 hover:text-white"
            >
              💡 My Ideas
            </Link>
          </nav>
        </div>

        {/* সাইডবারের নিচের অংশ (যেমন: প্রোফাইল বা লগআউট) */}
        <div className="p-5 border-t border-slate-800">
          <button className="w-full text-left text-sm text-rose-400 hover:text-rose-300 font-medium">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ২. ডানপাশের মেইন কনটেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* টপ বার / হেডার (Navbar) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-sm font-semibold text-gray-700">Welcome Back!</h2>
          <div className="flex items-center space-x-4">
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-semibold">
              Admin
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-300" /> {/* ইউজার প্রোফাইল ইমেজ */}
          </div>
        </header>

        {/* ডাইনামিক পেইজ কনটেন্ট (এখানেই page.tsx এর ফাইলগুলো রেন্ডার হবে) */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}