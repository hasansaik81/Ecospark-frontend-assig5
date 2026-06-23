// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";
// import { ModeToggle } from "./ModeToggle";

// const navLinks = [
//   { name: "Home", href: "/" },
//   { name: "Products", href: "/products" },
//   { name: "Services", href: "/services" },
//   { name: "About", href: "/about" },
//   { name: "Contact", href: "/contact" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const { theme, setTheme } = useTheme();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold">
//           FitStore
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-sm font-medium transition-colors hover:text-primary ${
//                 pathname === link.href
//                   ? "text-primary"
//                   : "text-muted-foreground"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Right Side */}
//         <div className="flex items-center gap-2">
//           {/* Theme Toggle */}
//           <ModeToggle/>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() =>
//               setTheme(theme === "dark" ? "light" : "dark")
//             }
//           >
//             <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           </Button>

//           {/* User Menu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Avatar className="cursor-pointer">
//                 <AvatarImage src="/avatar.png" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>
//                 Profile
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 Dashboard
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* Mobile Menu */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right">
//               <nav className="mt-8 flex flex-col gap-4">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`text-base ${
//                       pathname === link.href
//                         ? "font-semibold text-primary"
//                         : "text-muted-foreground"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }






// "use client"

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu, User, LogOut, LayoutDashboard, Leaf } from "lucide-react"; // Leaf আইকন যোগ করা হয়েছে
// import { useEffect, useState } from "react";
// // import { getUser, UserLogOut } from "@/services/auth";
// // import  ModeToggle  from "../ModeToggle"; 

// // Shadcn UI Components
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ModeToggle } from "./ModeToggle";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   // ইকোস্পার্কের উপযোগী নেভিগেশন লিংকস
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Solutions", href: "/solutions" },
//     { name: "Products", href: "/products" },
//     { name: "About Us", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ];

//   useEffect(() => {
//     const getCurrentUser = async () => {
//       // const userData = await getUser();
//       // setUser(userData);
//     };
//     getCurrentUser();
//   }, []);

//   const handleLogout = () => {
//     // UserLogOut();
//     setUser(null);
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
//         {/* EcoSpark Logo */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="p-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
//             <Leaf className="w-6 h-6" />
//           </div>
//           <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
//             EcoSpark
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-sm font-medium transition-colors rounded-md px-3 py-1.5 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 ${
//                 pathname === link.href 
//                   ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
//                   : "text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Mode Toggle Button */}
//           <ModeToggle />

//           {/* User Profile or Login Button */}
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger className="outline-none cursor-pointer">
//                 <Avatar className="h-9 w-9 border border-emerald-500/20">
//                   <AvatarImage src={user?.image} alt={user?.name} />
//                   <AvatarFallback className="bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 font-bold">
//                     {user?.name?.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuLabel>
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{user?.name}</p>
//                     <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/profile" className="cursor-pointer flex items-center gap-2">
//                     <User className="w-4 h-4 text-emerald-500" /> Profile
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
//                     <LayoutDashboard className="w-4 h-4 text-emerald-500" /> Dashboard
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 flex items-center gap-2 focus:text-red-600">
//                   <LogOut className="w-4 h-4" /> Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <Link href="/login">
//               <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm">
//                 Login
//               </Button>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden flex items-center gap-3">
          
//           <ModeToggle />

//           {user && (
//              <Link href="/profile">
//                 <Avatar className="h-8 w-8 border border-emerald-500/20">
//                     <AvatarImage src={user?.image} />
//                     <AvatarFallback className="bg-emerald-100 text-emerald-600 text-xs font-bold">
//                       {user?.name?.charAt(0).toUpperCase()}
//                     </AvatarFallback>
//                 </Avatar>
//              </Link>
//           )}
          
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="h-9 w-9">
//                 <Menu className="w-5 h-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[280px]">
//               <div className="flex flex-col gap-4 mt-6">
//                 {/* Mobile Menu Brand Logo */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <Leaf className="w-5 h-5 text-emerald-600" />
//                   <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//                     EcoSpark
//                   </span>
//                 </div>

//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className={`text-base font-medium py-1.5 px-2 rounded-md transition-colors ${
//                       pathname === link.href 
//                         ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 font-semibold" 
//                         : "text-muted-foreground hover:text-emerald-600"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
                
//                 <hr className="my-2 border-border" />
                
//                 {user ? (
//                   <>
//                     <Link 
//                       href="/dashboard" 
//                       onClick={() => setOpen(false)} 
//                       className="text-base font-medium py-1.5 px-2 text-muted-foreground hover:text-emerald-600"
//                     >
//                       Dashboard
//                     </Link>
//                     <Button onClick={handleLogout} variant="destructive" className="w-full mt-4">
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <Link href="/login" onClick={() => setOpen(false)}>
//                     <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Login</Button>
//                   </Link>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }




// "use client";

// import { Menu } from "lucide-react";

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

// interface Navbar1Props {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//     className?: string;
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
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "Next Blog",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     {
//       title: "Blogs",
//       url: "/blogs",
//     },
//     {
//       title: "About",
//       url: "/about",
//     },
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//     },
//   ],
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Register", url: "/register" },
//   },
//   className,
// }: Navbar1Props) => {
//   return (
//     <section className={cn("py-4 ", className)}>
//       <div className="container mx-auto px-4">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-6">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//               <span className="text-lg font-semibold tracking-tighter">
//                 {logo.title}
//               </span>
//             </a>
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <ModeToggle />
//             <Button asChild variant="outline" size="sm">
//               <Link href={auth.login.url}>{auth.login.title}</Link>
//             </Button>
//             <Button asChild size="sm">
//               <Link href={auth.signup.url}>{auth.signup.title}</Link>
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//             </a>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <a href={logo.url} className="flex items-center gap-2">
//                       <img
//                         src={logo.src}
//                         className="max-h-8 dark:invert"
//                         alt={logo.alt}
//                       />
//                     </a>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <Accordion
//                     type="single"
//                     collapsible
//                     className="flex w-full flex-col gap-4"
//                   >
//                     {menu.map((item) => renderMobileMenuItem(item))}
//                   </Accordion>

//                   <div className="flex flex-col gap-3">
//                     <Button asChild variant="outline">
//                       <Link href={auth.login.url}>{auth.login.title}</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href={auth.signup.url}>{auth.signup.title}</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
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
//         className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//       >
//         <Link href={item.url}>{item.title}</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//   return (
//     <Link key={item.title} href={item.url} className="text-md font-semibold">
//       {item.title}
//     </Link>
//   );
// };

// export { Navbar };





// "use client"

// import * as React from "react"
// import Link from "next/link"
// // import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { Leaf, User, LayoutDashboard, LogOut, ChevronDown, Menu } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import router from "next/router"

// // আপনার প্রোজেক্টের কাস্টম টাইপ (প্রয়োজন অনুযায়ী পরিবর্তন করতে পারেন)
// interface UserType {
//   name: string
//   email: string
//   role: "admin" | "user"
// }

// interface NavbarProps {
//   // কাস্টম অথেন্টিকেশন থেকে পাওয়া ইউজার স্টেট (লগইন না থাকলে null)
//   user?: UserType | null
//   onLogout?: () => Promise<void> // কাস্টম লগআউট ফাংশন
// }

// export function Navbar({ user = null, onLogout }: NavbarProps) {
//   // const router = useRouter()

//   const handleCustomLogout = async () => {
//     const toastId = toast.loading("Logging out from EcoSpark...")
//     try {
//       if (onLogout) {
//         await onLogout()
//       } else {
//         // যদি প্রপ্স হিসেবে পাস না করা হয়, তবে এখানে সরাসরি আপনার কাস্টম লগআউট API কল করুন
//         await fetch("/api/auth/logout", { method: "POST" })
//       }
      
//       toast.success("Logged out successfully", { id: toastId })
//       router.push("/login")
//       router.refresh()
//     } catch (error: any) {
//       toast.error(error.message || "Failed to logout", { id: toastId })
//     }
//   }

//   // রোল অনুযায়ী ড্যাশবোর্ডের লিঙ্ক নির্ধারণ
//   const dashboardLink = user?.role === "admin" ? "/admin/dashboard" : "/dashboard"

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-emerald-500/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between px-4">
        
//         {/* Brand Logo */}
//         <Link href="/" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
//           <Leaf className="size-6 animate-pulse" />
//           <span className="font-bold tracking-wider text-lg uppercase">EcoSpark</span>
//         </Link>

//         {/* Navigation Links (Desktop) */}
//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
//           <Link href="/about" className="hover:text-emerald-500 transition-colors">About</Link>
//           <Link href="/projects" className="hover:text-emerald-500 transition-colors">Projects</Link>
//           <Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link>
//         </nav>

//         {/* Auth / Profile Section */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             /* Logged In State: Profile Dropdown */
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button 
//                   variant="ghost" 
//                   className="relative h-10 flex items-center gap-2 px-2 rounded-full border border-emerald-500/20 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 focus-visible:ring-emerald-500"
//                 >
//                   <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
//                     <User className="size-4" />
//                   </div>
//                   <span className="hidden sm:inline-block text-xs font-medium max-w-[80px] truncate">
//                     {user.name}
//                   </span>
//                   <ChevronDown className="size-3 text-muted-foreground" />
//                 </Button>
//               </DropdownMenuTrigger>
              
//               <DropdownMenuContent className="w-56 mt-1 border-emerald-500/10 shadow-lg" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-semibold leading-none">{user.name}</p>
//                     <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
//                     <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 mt-1">
//                       {user.role}
//                     </span>
//                   </div>
//                 </DropdownMenuLabel>
                
//                 <DropdownMenuSeparator className="bg-emerald-500/10" />
                
//                 {/* 1. Profile Menu */}
//                 <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer">
//                   <Link href="/profile" className="flex items-center gap-2 w-full">
//                     <User className="size-4 text-emerald-600 dark:text-emerald-400" />
//                     <span>Profile</span>
//                   </Link>
//                 </DropdownMenuItem>
                
//                 {/* 2. Dashboard Menu (Dynamic based on role) */}
//                 <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer">
//                   <Link href={dashboardLink} className="flex items-center gap-2 w-full">
//                     <LayoutDashboard className="size-4 text-emerald-600 dark:text-emerald-400" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </DropdownMenuItem>
                
//                 <DropdownMenuSeparator className="bg-emerald-500/10" />
                
//                 {/* 3. Logout Menu */}
//                 <DropdownMenuItem 
//                   onClick={handleCustomLogout}
//                   className="focus:bg-destructive/10 dark:focus:bg-destructive/20 text-destructive focus:text-destructive cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2 w-full">
//                     <LogOut className="size-4" />
//                     <span>Logout</span>
//                   </div>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             /* Logged Out State: Auth Buttons */
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" asChild className="hover:text-emerald-500 text-sm font-medium">
//                 <Link href="/login">Sign In</Link>
//               </Button>
//               <Button asChild className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-sm font-medium shadow-sm">
//                 <Link href="/register">Get Started</Link>
//               </Button>
//             </div>
//           )}
//         </div>

//       </div>
//     </header>
//   )
// }





// "use client"

// import * as React from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation" // Fix: next/router এর জায়গায় next/navigation হবে
// import { toast } from "sonner"
// import { Leaf, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ModeToggle } from "./ModeToggle" // ModeToggle ইম্পোর্ট করা হলো

// // আপনার প্রোজেক্টের কাস্টম টাইপ
// interface UserType {
//   name: string
//   email: string
//   role: "admin" | "user"
// }

// interface NavbarProps {
//   user?: UserType | null
//   onLogout?: () => Promise<void>
// }


// export function Navbar({ user = null, onLogout }: NavbarProps) {
//   const router = useRouter()

//   const handleCustomLogout = async () => {
//     const toastId = toast.loading("Logging out from EcoSpark...")
//     try {
//       if (onLogout) {
//         await onLogout()
//       } else {
//         await fetch("/api/auth/logout", { method: "POST" })
//       }
      
//       toast.success("Logged out successfully", { id: toastId })
//       router.push("/login")
//       router.refresh()
//     } catch (error: any) {
//       toast.error(error.message || "Failed to logout", { id: toastId })
//     }
//   }

//   const dashboardLink = user?.role === "admin" ? "/admin/dashboard" : "/dashboard"

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-emerald-500/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
//         {/* Brand Logo */}
//         <Link href="/" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
//           <Leaf className="size-6 animate-pulse" />
//           <span className="font-bold tracking-wider text-lg uppercase">EcoSpark</span>
//         </Link>

//         {/* Navigation Links (Desktop) */}
//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
//           <Link href="/about" className="hover:text-emerald-500 transition-colors">Home</Link>
//           <Link href="/about" className="hover:text-emerald-500 transition-colors">About</Link>
//           <Link href="/projects" className="hover:text-emerald-500 transition-colors">Projects</Link>
//           <Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link>
//         </nav>

//         {/* Right Section: ModeToggle + Auth/Profile */}
//         <div className="flex items-center gap-3">
          
//           {/* Theme Toggle Button */}
//           <ModeToggle />

//           {user ? (
//             /* Logged In State: Profile Dropdown */
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button 
//                   variant="ghost" 
//                   className="relative h-10 flex items-center gap-2 px-2 rounded-full border border-emerald-500/20 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 focus-visible:ring-emerald-500"
//                 >
//                   <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
//                     <User className="size-4" />
//                   </div>
//                   <span className="hidden sm:inline-block text-xs font-medium max-w-[80px] truncate">
//                     {user.name}
//                   </span>
//                   <ChevronDown className="size-3 text-muted-foreground" />
//                 </Button>
//               </DropdownMenuTrigger>
              
//               <DropdownMenuContent className="w-56 mt-1 border-emerald-500/10 shadow-lg" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-semibold leading-none">{user.name}</p>
//                     <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
//                     <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 mt-1">
//                       {user.role}
//                     </span>
//                   </div>
//                 </DropdownMenuLabel>
                
//                 <DropdownMenuSeparator className="bg-emerald-500/10" />
                
//                 {/* 1. Profile */}
//                 <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer">
//                   <Link href="/profile" className="flex items-center gap-2 w-full">
//                     <User className="size-4 text-emerald-600 dark:text-emerald-400" />
//                     <span>Profile</span>
//                   </Link>
//                 </DropdownMenuItem>
                
//                 {/* 2. Dashboard */}
//                 <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer">
//                   <Link href={dashboardLink} className="flex items-center gap-2 w-full">
//                     <LayoutDashboard className="size-4 text-emerald-600 dark:text-emerald-400" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </DropdownMenuItem>
                
//                 <DropdownMenuSeparator className="bg-emerald-500/10" />
                
//                 {/* 3. Logout */}
//                 <DropdownMenuItem 
//                   onClick={handleCustomLogout}
//                   className="focus:bg-destructive/10 dark:focus:bg-destructive/20 text-destructive focus:text-destructive cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2 w-full">
//                     <LogOut className="size-4" />
//                     <span>Logout</span>
//                   </div>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             /* Logged Out State: Auth Buttons */
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" asChild className="hover:text-emerald-500 text-sm font-medium">
//                 <Link href="/login">Sign In</Link>
//               </Button>
//               <Button asChild className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-sm font-medium shadow-sm">
//                 <Link href="/register">Get Started</Link>
//               </Button>
//             </div>
//           )}
//         </div>

//       </div>
//     </header>
//   )
// }






"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, User, LogOut, LayoutDashboard, Leaf, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ModeToggle } from "./ModeToggle" // ModeToggle ইন্টিগ্রেট করা হলো
import { getUser, UserLogOut } from "@/services/auth"

// Shadcn UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  // EcoSpark এর জন্য নেভিগেশন লিংকস
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    getCurrentUser()
  }, [])

  const handleLogout = () => {
    UserLogOut()
    setUser(null)
    setOpen(false)
    router.push("/login")
    router.refresh()
  }

  // ইউজারের রোল অনুযায়ী ড্যাশবোর্ড ইউআরএল (অ্যাডমিন হলে /admin/dashboard অন্যথায় /dashboard)
  const dashboardLink = user?.role === "admin" ? "/admin/dashboard" : "/dashboard"

  return (
    <nav className="w-full border-b border-emerald-500/10 bg-background/95 backdrop-blur sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Brand Logo (EcoSpark) */}
        <Link href="/" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Leaf className="size-6 animate-pulse" />
          <span className="font-bold tracking-wider text-lg uppercase">EcoSpark</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href 
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold" 
                  : "text-muted-foreground hover:text-emerald-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <ModeToggle />

          {/* User Profile or Auth Buttons (Desktop) */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full border border-emerald-500/10 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10 transition">
                <Avatar className="h-8 w-8 border border-emerald-500/20">
                  <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 font-bold uppercase text-xs">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium max-w-[80px] truncate hidden lg:inline-block">
                  {user?.name}
                </span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56 mt-1 border-emerald-500/10 shadow-lg">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
                    {user?.role && (
                      <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 mt-1">
                        {user.role}
                      </span>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-emerald-500/10" />
                
                <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-2 w-full">
                    <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Profile
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer">
                  <Link href={dashboardLink} className="flex items-center gap-2 w-full">
                    <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-emerald-500/10" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hover:text-emerald-500 text-sm font-medium">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          
          {user && (
            <Link href="/profile" className="outline-none">
              <Avatar className="h-8 w-8 border border-emerald-500/20">
                <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 font-bold uppercase text-xs">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-emerald-500/10">
                <Menu className="w-5 h-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] border-l border-emerald-500/10">
              <SheetHeader className="text-left pb-4 border-b border-emerald-500/10">
                <SheetTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Leaf className="size-5" />
                  <span className="font-bold tracking-wider uppercase text-base">EcoSpark</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-md font-medium transition-colors ${
                      pathname === link.href ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground hover:text-emerald-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="border-emerald-500/10 my-1" />
                
                {user ? (
                  <>
                    <Link 
                      href={dashboardLink} 
                      onClick={() => setOpen(false)} 
                      className={`text-md font-medium flex items-center gap-2 ${
                        pathname.startsWith("/dashboard") || pathname.startsWith("/admin/dashboard") 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : "text-muted-foreground hover:text-emerald-500"
                      }`}
                    >
                      <LayoutDashboard className="size-4" /> Dashboard
                    </Link>
                    <Button onClick={handleLogout} variant="destructive" className="w-full mt-4 flex items-center gap-2">
                      <LogOut className="size-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full border-emerald-500/20">Login</Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}