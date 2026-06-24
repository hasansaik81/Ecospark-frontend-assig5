"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Leaf,
  Users,
  Calendar,
  BarChart3,
  Settings,
  FileText,
  BadgeDollarSign,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

type UserRole = "ADMIN" | "USER" | "SERVICE_PROVIDER";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: UserRole;
}

const NAV_CONFIG = {
  ADMIN: [
    {
      title: "Admin Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/admin",
        },
        {
          title: "Manage Services",
          url: "/dashboard/admin/services",
        },
        {
          title: "Manage Users",
          url: "/dashboard/admin/users",
        },
        {
          title: "Bookings",
          url: "/dashboard/admin/bookings",
        },
        {
          title: "Analytics",
          url: "/dashboard/admin/analytics",
        },
      ],
    },
    {
      title: "Sustainability",
      url: "#",
      icon: Leaf,
      items: [
        {
          title: "Eco Projects",
          url: "/dashboard/admin/projects",
        },
        {
          title: "Carbon Reports",
          url: "/dashboard/admin/reports",
        },
      ],
    },
  ],

  USER: [
    {
      title: "My Dashboard",
      url: "/dashboard/user",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/dashboard/user/profile",
        },
        {
          title: "My Bookings",
          url: "/dashboard/user/bookings",
        },
        {
          title: "Saved Services",
          url: "/dashboard/user/saved-services",
        },
      ],
    },
    {
      title: "Green Activities",
      url: "#",
      icon: Leaf,
      items: [
        {
          title: "Eco Challenges",
          url: "/dashboard/user/challenges",
        },
        {
          title: "My Contributions",
          url: "/dashboard/user/contributions",
        },
      ],
    },
  ],

  SERVICE_PROVIDER: [
    {
      title: "Provider Dashboard",
      url: "/dashboard/provider",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "My Services",
          url: "/dashboard/provider/services",
        },
        {
          title: "Booking Requests",
          url: "/dashboard/provider/bookings",
        },
        {
          title: "Earnings",
          url: "/dashboard/provider/earnings",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Performance",
          url: "/dashboard/provider/performance",
        },
        {
          title: "Monthly Reports",
          url: "/dashboard/provider/reports",
        },
      ],
    },
  ],
};

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const navItems = NAV_CONFIG[userRole];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="font-bold text-lg">EcoSpark</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          EcoSpark v1.0
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}