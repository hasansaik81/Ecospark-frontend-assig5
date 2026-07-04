



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

              {/* ২. 🎯 ন*/}
              {children}

            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}




