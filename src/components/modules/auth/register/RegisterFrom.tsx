"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register } from "@/services/auth" // 🌟 আপনার তৈরি করা সেই register ফাংশনটি

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // সাধারণ ভ্যালিডেশন
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      // 🌟 আপনার API ফেচিং অ্যাকশনটি কল করা হলো
      const res = await register({ name, email, password })

      if (res?.success || res?.id) {
        // রেজিস্ট্রেশন সফল হলে লগইন পেজে পাঠিয়ে দেওয়া হবে
        router.push("/login")
        router.refresh()
      } else {
        setError(res?.message || "Registration failed. Try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-xl border border-emerald-500/10 shadow-lg">
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center text-emerald-600 dark:text-emerald-400">
          <Leaf className="size-8 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm font-semibold bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" required disabled={loading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="name@example.com" required disabled={loading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required disabled={loading} />
        </div>

        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  )
}