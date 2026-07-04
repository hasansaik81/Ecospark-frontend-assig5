





"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, User, LogOut, LayoutDashboard, Leaf, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ModeToggle } from "./ModeToggle" 
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

interface CustomUserPayload {
  email?: string;
  name?: string;
  role?: string;
  image?: string;
  [key: string]: any;
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false) // 🎯 হাইড্রেশন ফিক্সড করার জন্য স্টেট
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Idea", href: "/ideas" },
    { name: "Contact", href: "/contact" },
  ]

  const fetchUser = async () => {
    try {
      const userData = (await getUser()) as CustomUserPayload
      if (userData) {
        setUser((prevUser: any) => 
          prevUser?.email === userData?.email ? prevUser : userData
        )
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      setUser(null)
    }
  }

  // 🎯 ক্লায়েন্ট সাইড মাউন্টিং হ্যান্ডলিং
  useEffect(() => {
    setMounted(true)
    fetchUser()
  }, [pathname])

  const handleLogout = async () => {
    await UserLogOut()
    setUser(null)
    setOpen(false)
    router.push("/login")
    router.refresh()
  }

  const dashboardLink = 
    user?.role?.toUpperCase() === "ADMIN" 
      ? "/admin/dashboard" 
      : "/dashboard"

  return (
    <nav className="w-full border-b border-emerald-500/10 bg-background/95 backdrop-blur sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
     
       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Leaf className="size-6 animate-pulse" />
          <span className="font-bold tracking-wider text-xl uppercase">EcoSpark</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-semibold transition-colors tracking-wide ${
                pathname === link.href 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-muted-foreground hover:text-emerald-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          <ModeToggle />

          {/* ডেক্সটপ অথেন্টিকড লেয়ার */}
          <div className="hidden md:flex items-center">
            {/* 🎯 ড্রপডাউন তখনই রেন্ডার হবে যখন ক্লায়েন্ট মাউন্ট শেষ হবে */}
            {mounted && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    type="button"
                    className="relative h-10 flex items-center gap-2 px-3 rounded-full border border-emerald-500/20 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 cursor-pointer focus:bg-transparent"
                  >
                    <Avatar className="h-7 w-7 border border-emerald-500/10 pointer-events-none">
                      <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 font-bold uppercase text-[10px]">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold max-w-[90px] truncate hidden lg:inline-block pointer-events-none">
                      {user?.name}
                    </span>
                    <ChevronDown className="size-3 text-muted-foreground pointer-events-none" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56 mt-2 border-emerald-500/10 shadow-lg z-[60]">
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
                  
                  <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer py-2">
                    <Link href="/profile" className="flex items-center gap-2 w-full">
                      <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="focus:bg-emerald-50 dark:focus:bg-emerald-950/30 cursor-pointer py-2">
                    <Link href={dashboardLink} className="flex items-center gap-2 w-full">
                      <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-emerald-500/10" />
                  
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive flex items-center gap-2 py-2">
                    <LogOut className="w-4 h-4" /> <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : mounted && !user ? (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hover:text-emerald-500 text-sm font-semibold cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold shadow-sm px-4 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              // মাউন্ট হওয়ার পূর্বের বাফার স্টেট (কনফ্লিক্ট এড়াতে)
              <div className="h-10 w-24 rounded-full bg-emerald-500/5 animate-pulse" />
            )}
          </div>

          {/* Mobile Menu Action Area */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && user && (
              <Link href="/profile" className="outline-none">
                <Avatar className="h-8 w-8 border border-emerald-500/20">
                  <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 font-bold uppercase text-xs">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-emerald-500/10 cursor-pointer">
                  <Menu className="w-5 h-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] border-l border-emerald-500/10 z-[60]">
                <SheetHeader className="text-left pb-4 border-b border-emerald-500/10">
                  <SheetTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Leaf className="size-5" />
                    <span className="font-bold tracking-wider uppercase text-lg">EcoSpark</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-5 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg font-semibold transition-colors ${
                        pathname === link.href ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground hover:text-emerald-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <hr className="border-emerald-500/10 my-1" />
                  
                  {mounted && user ? (
                    <>
                      <Link 
                        href={dashboardLink} 
                        onClick={() => setOpen(false)} 
                        className={`text-lg font-semibold flex items-center gap-2 ${
                          pathname.startsWith("/dashboard") || pathname.startsWith("/admin/dashboard") 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : "text-muted-foreground hover:text-emerald-500"
                        }`}
                      >
                        <LayoutDashboard className="size-5" /> Dashboard
                      </Link>
                      <Button onClick={handleLogout} variant="destructive" className="w-full mt-4 flex items-center gap-2 font-semibold cursor-pointer">
                        <LogOut className="size-4" /> Logout
                      </Button>
                    </>
                  ) : mounted && !user ? (
                    <div className="flex flex-col gap-3 mt-2">
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button variant="outline" className="w-full border-emerald-500/20 font-semibold cursor-pointer">Login</Button>
                      </Link>
                      <Link href="/register" onClick={() => setOpen(false)}>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer">Get Started</Button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  )
}