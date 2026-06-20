// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function Navbar() {
//   const [open, setOpen] = useState(false)

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Products", href: "/products" },
//     { name: "Sustainability", href: "/sustainability" },
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-full bg-green-600" />
//           <span className="text-lg font-semibold">
//             Eco<span className="text-green-600">Spak</span>
//           </span>
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
//           {navLinks.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="hover:text-green-600 transition"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* CTA */}
//         <div className="hidden md:flex gap-2">
//           <Button variant="outline">Login</Button>
//           <Button className="bg-green-600 hover:bg-green-700">
//             Get Started
//           </Button>
//         </div>

//         {/* Mobile */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2"
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden border-t px-4 py-3 space-y-3">
//           {navLinks.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               onClick={() => setOpen(false)}
//               className="block text-sm text-muted-foreground hover:text-green-600"
//             >
//               {item.name}
//             </Link>
//           ))}

//           <div className="flex gap-2 pt-2">
//             <Button variant="outline" className="w-full">
//               Login
//             </Button>
//             <Button className="w-full bg-green-600 hover:bg-green-700">
//               Get Started
//             </Button>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }





// "use client";

// import { Menu, Leaf } from "lucide-react"; // Eco-friendly icon হিসেবে Leaf যুক্ত করা হয়েছে

// import { cn } from "@/lib/utils";

// import { Accordion } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";


// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface NavbarProps {
//   className?: string;
//   logo?: {
//     url: string;
//     title: string;
//   };
//   menu?: MenuItem[];
//   auth?: {
//     login: {
//       title: string;
//       url: string;
//     };
//     signup: {
//       title: string;
//       url: string;
//     };
//   };
// }

// const Navbar = ({
//   logo = {
//     url: "/",
//     title: "EcoSpark",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     { title: "Solutions", url: "/solutions" },
//     { title: "Products", url: "/products" },
//     { title: "About Us", url: "/about" },
//     { title: "Contact", url: "/contact" },
//   ],
//   auth = {
//     login: { title: "Sign In", url: "/login" },
//     signup: { title: "Join EcoSpark", url: "/register" },
//   },
//   className,
// }: NavbarProps) => {
//   return (
//     <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4", className)}>
//       <div className="container mx-auto px-4">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-8">
//             {/* Logo */}
//             <Link href={logo.url} className="flex items-center gap-2 group">
//               <div className="p-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
//                 <Leaf className="size-6" />
//               </div>
//               <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
//                 {logo.title}
//               </span>
//             </Link>
            
//             {/* Navigation Links */}
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList className="gap-1">
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center gap-3">
//             <ModeToggle />
//             <Button asChild variant="ghost" size="sm" className="hover:text-emerald-600">
//               <Link href={auth.login.url}>{auth.login.title}</Link>
//             </Button>
//             <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10">
//               <Link href={auth.signup.url}>{auth.signup.title}</Link>
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <Link href={logo.url} className="flex items-center gap-2">
//               <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600">
//                 <Leaf className="size-5" />
//               </div>
//               <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//                 {logo.title}
//               </span>
//             </Link>

//             <div className="flex items-center gap-2">
//               <ModeToggle />
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon" className="h-9 w-9">
//                     <Menu className="size-5" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
//                   <SheetHeader className="text-left">
//                     <SheetTitle>
//                       <Link href={logo.url} className="flex items-center gap-2">
//                         <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600">
//                           <Leaf className="size-5" />
//                         </div>
//                         <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//                           {logo.title}
//                         </span>
//                       </Link>
//                     </SheetTitle>
//                   </SheetHeader>
                  
//                   <div className="flex flex-col gap-6 py-6">
//                     <Accordion
//                       type="single"
//                       collapsible
//                       className="flex w-full flex-col gap-2"
//                     >
//                       {menu.map((item) => renderMobileMenuItem(item))}
//                     </Accordion>

//                     <hr className="border-border" />

//                     <div className="flex flex-col gap-3">
//                       <Button asChild variant="outline" className="w-full">
//                         <Link href={auth.login.url}>{auth.login.title}</Link>
//                       </Button>
//                       <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
//                         <Link href={auth.signup.url}>{auth.signup.title}</Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem) => {
//   return (
//     <NavigationMenuItem key={item.title}>
//       <NavigationMenuLink
//         asChild
//         className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-emerald-50/50 hover:text-emerald-600 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400"
//       >
//         <Link href={item.url}>{item.title}</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//   return (
//     <Link 
//       key={item.title} 
//       href={item.url} 
//       className="text-base font-medium py-2 px-3 rounded-md hover:bg-emerald-50/50 hover:text-emerald-600 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400 transition-colors"
//     >
//       {item.title}
//     </Link>
//   );
// };

// export { Navbar };




"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, LayoutDashboard, Leaf } from "lucide-react"; // Leaf আইকন যোগ করা হয়েছে
import { useEffect, useState } from "react";
// import { getUser, UserLogOut } from "@/services/auth";
// import { ModeToggle } from "../ModeToggle"; 

// Shadcn UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // ইকোস্পার্কের উপযোগী নেভিগেশন লিংকস
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    getCurrentUser();
  }, []);

  const handleLogout = () => {
    UserLogOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* EcoSpark Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
            EcoSpark
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors rounded-md px-3 py-1.5 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 ${
                pathname === link.href 
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
                  : "text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mode Toggle Button */}
          <ModeToggle />

          {/* User Profile or Login Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none cursor-pointer">
                <Avatar className="h-9 w-9 border border-emerald-500/20">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-500" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-emerald-500" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 flex items-center gap-2 focus:text-red-600">
                  <LogOut className="w-4 h-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          
          <ModeToggle />

          {user && (
             <Link href="/profile">
                <Avatar className="h-8 w-8 border border-emerald-500/20">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-600 text-xs font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
             </Link>
          )}
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-4 mt-6">
                {/* Mobile Menu Brand Logo */}
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    EcoSpark
                  </span>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-base font-medium py-1.5 px-2 rounded-md transition-colors ${
                      pathname === link.href 
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 font-semibold" 
                        : "text-muted-foreground hover:text-emerald-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="my-2 border-border" />
                
                {user ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setOpen(false)} 
                      className="text-base font-medium py-1.5 px-2 text-muted-foreground hover:text-emerald-600"
                    >
                      Dashboard
                    </Link>
                    <Button onClick={handleLogout} variant="destructive" className="w-full mt-4">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}