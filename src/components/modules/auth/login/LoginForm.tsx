



"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/auth"
import { useRouter } from "next/navigation"
import { Leaf } from "lucide-react"

// Zod validation schema fix (z.string().email())
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

export function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Connecting to EcoSpark...")
    try {
      const res = await loginUser(data)
      
      if (res?.success) {
        toast.success(res.message || "Welcome back to EcoSpark!", { id: toastId })
        router.push("/")
        router.refresh()
      } else {
        // ভুল পাসওয়ার্ড বা ইমেইলের জন্য এরর টোস্ট
        toast.error(res?.message || "Login failed. Please try again.", { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login. Please try again.", { id: toastId })
    }
  }

  return (
    <Card className="w-full sm:max-w-md border-emerald-500/10 shadow-lg shadow-emerald-500/5 bg-card text-card-foreground">
      <CardHeader className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-emerald-600 dark:text-emerald-400">
          <Leaf className="size-5" />
          <span className="font-bold tracking-wider text-xs uppercase">EcoSpark Portal</span>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your clean energy dashboard
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form id="ecospark-login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            
            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email" className="text-sm font-medium">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="focus-visible:ring-emerald-500"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={fieldState.error ? [{ message: fieldState.error.message }] : undefined}
                      className="text-xs text-destructive mt-1"
                    />
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password" className="text-sm font-medium">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="focus-visible:ring-emerald-500"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={fieldState.error ? [{ message: fieldState.error.message }] : undefined}
                      className="text-xs text-destructive mt-1"
                    />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          type="submit" 
          form="ecospark-login-form"
          className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold shadow-sm"
        >
          Sign In
        </Button>
      </CardFooter>
    </Card>
  )
}