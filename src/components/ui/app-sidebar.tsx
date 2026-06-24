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

// // import { NavMain } from "@/components/nav-main";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
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
//   // Fallback map jodi vul role pass hoy
//   const navItems = NAV_CONFIG[userRole] || NAV_CONFIG.USER;

//   return (
//     <Sidebar collapsible="icon" {...props}>
//       {/* Header section updated for shadcn's proper collapse support */}
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <div className="flex items-center gap-3 cursor-pointer">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 shrink-0">
//                   <Leaf className="h-5 w-5" />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
//                   <span className="truncate font-bold text-base text-foreground">
//                     EcoSpark
//                   </span>
//                   <span className="truncate text-xs text-muted-foreground">
//                     Sustainability Hub
//                   </span>
//                 </div>
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <NavMain items={navItems} />
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <div className="px-3 py-2 text-xs font-medium text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
//               EcoSpark v1.0
//             </div>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>

//       <SidebarRail />
//     </Sidebar>
//   );
// }





"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Leaf,
  Users,
  Lightbulb,
  BarChart3,
  Settings,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

// ব্যাকএন্ড অনুযায়ী রোল ২টি: ADMIN এবং MEMBER
type UserRole = "ADMIN" | "MEMBER";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: UserRole;
}

// ব্যাকএন্ড রাউটের সাথে মিল রেখে তৈরি করা নেভিগেশন কনফিগ
const NAV_CONFIG = {
  ADMIN: [
    {
      title: "Admin Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview Stats",
          url: "/dashboard/admin/stats",
        },
        {
          title: "Manage Users",
          url: "/dashboard/admin/users",
        },
        {
          title: "Manage Ideas",
          url: "/dashboard/admin/ideas",
        },
      ],
    },
    {
      title: "Analytics & Settings",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Platform Growth",
          url: "/dashboard/admin/analytics",
        },
        {
          title: "Settings",
          url: "/dashboard/admin/settings",
        },
      ],
    },
  ],

  MEMBER: [
    {
      title: "Member Dashboard",
      url: "/dashboard/member",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "My Stats",
          url: "/dashboard/member/stats",
        },
        {
          title: "My Eco Ideas",
          url: "/dashboard/member/ideas",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile Settings",
          url: "/dashboard/member/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  // জাস্ট ইন কেস ভুল রোল পাস হলে ডিফল্ট হিসেবে MEMBER ড্যাশবোর্ড দেখাবে
  const navItems = NAV_CONFIG[userRole] || NAV_CONFIG.MEMBER;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* EcoSpark Header Section */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 shrink-0">
                  <Leaf className="h-5 w-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-bold text-base text-foreground">
                    EcoSpark
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Sustainability Hub
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation (Admin / Member অনুযায়ী ফিল্টার হবে) */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
              EcoSpark v1.0
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}