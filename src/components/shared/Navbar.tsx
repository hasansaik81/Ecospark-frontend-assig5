"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-600" />
          <span className="text-lg font-semibold">
            Eco<span className="text-green-600">Spak</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-green-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex gap-2">
          <Button variant="outline">Login</Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-3 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-green-600"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="w-full">
              Login
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}