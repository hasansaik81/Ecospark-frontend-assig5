// // "use client";

// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// // // } from "@/components/ui/field";
// // // import { Input } from "@/components/ui/input";
// // // import { useForm } from "@tanstack/react-form";
// // // import { toast } from "sonner";
// // // import * as z from "zod";
// // // import { Leaf } from "lucide-react";
// // // import { useRouter } from "next/navigation";

// // const formSchema = z.object({
// //   password: z.string().min(8, "Minimum length is 8"),
// //   email: z.string().email("Invalid email address"),
// // });

// // export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
// //   const router = useRouter();

// //   const form = useForm({
// //     defaultValues: {
// //       email: "",
// //       password: "",
// //     },
// //     validators: {
// //       onSubmit: formSchema,
// //     },
// //     onSubmit: async ({ value }) => {
// //       const toastId = toast.loading("Logging into EcoSpark...");
// //       try {
// //         // আপনার কাস্টম লগইন API এন্ডপয়েন্ট
// //         const res = await fetch("/api/auth/login", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(value),
// //         });

// //         const result = await res.json();

// //         if (!res.ok) {
// //           toast.error(result.message || "Invalid credentials", { id: toastId });
// //           return;
// //         }

// //         toast.success("Welcome back to EcoSpark!", { id: toastId });
        
// //         // টোকেন বা সেশন সেট হওয়ার পর ড্যাশবোর্ডে রিডাইরেক্ট করুন
// //         router.push("/dashboard");
// //         router.refresh();
// //       } catch (err) {
// //         toast.error("Something went wrong, please try again.", { id: toastId });
// //       }
// //     },
// //   });

// //   return (
// //     <Card {...props} className="border-emerald-500/10 shadow-lg shadow-emerald-500/5 bg-card text-card-foreground">
// //       <CardHeader className="space-y-2 text-center md:text-left">
// //         <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-emerald-600 dark:text-emerald-400">
// //           <Leaf className="size-5" />
// //           <span className="font-bold tracking-wider text-xs uppercase">EcoSpark Portal</span>
// //         </div>
// //         <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
// //         <CardDescription>
// //           Enter your credentials to access your clean energy dashboard
// //         </CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <form
// //           id="login-form"
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             e.stopPropagation();
// //             form.handleSubmit();
// //           }}
// //         >
// //           <FieldGroup className="space-y-4">
// //             <form.Field
// //               name="email"
// //               children={(field) => {
// //                 const isInvalid =
// //                   field.state.meta.isTouched && !field.state.meta.isValid;
// //                 return (
// //                   <Field>
// //                     <FieldLabel htmlFor={field.name} className="text-sm font-medium">Email Address</FieldLabel>
// //                     <Input
// //                       type="email"
// //                       id={field.name}
// //                       name={field.name}
// //                       placeholder="name@example.com"
// //                       value={field.state.value}
// //                       onChange={(e) => field.handleChange(e.target.value)}
// //                       className="focus-visible:ring-emerald-500"
// //                     />
// //                     {isInvalid && (
// //                       <FieldError errors={field.state.meta.errors} className="text-xs text-destructive mt-1" />
// //                     )}
// //                   </Field>
// //                 );
// //               }}
// //             />
// //             <form.Field
// //               name="password"
// //               children={(field) => {
// //                 const isInvalid =
// //                   field.state.meta.isTouched && !field.state.meta.isValid;
// //                 return (
// //                   <Field>
// //                     <FieldLabel htmlFor={field.name} className="text-sm font-medium">Password</FieldLabel>
// //                     <Input
// //                       type="password"
// //                       id={field.name}
// //                       name={field.name}
// //                       placeholder="••••••••"
// //                       value={field.state.value}
// //                       onChange={(e) => field.handleChange(e.target.value)}
// //                       className="focus-visible:ring-emerald-500"
// //                     />
// //                     {isInvalid && (
// //                       <FieldError errors={field.state.meta.errors} className="text-xs text-destructive mt-1" />
// //                     )}
// //                   </Field>
// //                 );
// //               }}
// //             />
// //           </FieldGroup>
// //         </form>
// //       </CardContent>
// //       <CardFooter className="pt-2">
// //         <Button 
// //           form="login-form" 
// //           type="submit" 
// //           className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold shadow-sm"
// //         >
// //           Sign In
// //         </Button>
// //       </CardFooter>
// //     </Card>
// //   );
// // }






// "use client"

// import * as React from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, useForm } from "react-hook-form"
// import { toast } from "sonner"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// // } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { loginUser } from "@/services/auth"
// import { useRouter } from "next/navigation"
// import { Leaf } from "lucide-react"
// import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

// // Zod validation schema fix (z.string().email())
// const formSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   password: z.string().min(1, { message: "Password is required." }),
// })

// export function LoginForm() {
//   const router = useRouter()
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     const toastId = toast.loading("Connecting to EcoSpark...")
//     try {
//       const res = await loginUser(data);
      
//       if (res?.success) {
//         toast.success(res.message || "Welcome back to EcoSpark!", { id: toastId })
//         router.push("/")
//         router.refresh()
//       } else {
//         // ভুল পাসওয়ার্ড বা ইমেইলের জন্য এরর টোস্ট
//         toast.error(res?.message || "Login failed. Please try again.", { id: toastId })
//       }
//     } catch (error: any) {
//       toast.error(error.message || "An error occurred during login. Please try again.", { id: toastId })
//     }
//   }

//   return (
//     <Card className="w-full sm:max-w-md border-emerald-500/10 shadow-lg shadow-emerald-500/5 bg-card text-card-foreground">
//       <CardHeader className="space-y-2 text-center md:text-left">
//         <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-emerald-600 dark:text-emerald-400">
//           <Leaf className="size-5" />
//           <span className="font-bold tracking-wider text-xs uppercase">EcoSpark Portal</span>
//         </div>
//         <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
//         <CardDescription>
//           Enter your credentials to access your clean energy dashboard
//         </CardDescription>
//       </CardHeader>
      
//       <CardContent>
//         <form id="ecospark-login-form" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup className="space-y-4">
            
//             {/* Email Field */}
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="login-email" className="text-sm font-medium">
//                     Email Address
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="login-email"
//                     type="email"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="name@example.com"
//                     autoComplete="email"
//                     className="focus-visible:ring-emerald-500"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error?.message]} className="text-xs text-destructive mt-1" />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Password Field */}
//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="login-password" className="text-sm font-medium">
//                     Password
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="login-password"
//                     type="password"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="••••••••"
//                     autoComplete="current-password"
//                     className="focus-visible:ring-emerald-500"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error?.message]} className="text-xs text-destructive mt-1" />
//                   )}
//                 </Field>
//               )}
//             />

//           </FieldGroup>
//         </form>
//       </CardContent>
      
//       <CardFooter className="pt-2">
//         <Button 
//           type="submit" 
//           form="ecospark-login-form"
//           className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold shadow-sm"
//         >
//           Sign In
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }



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
import { Input } from "@/components/ui/input"
import { loginUser, registerUser } from "@/services/auth" // 👈 registerUser সার্ভিসটি নিয়ে আসা হলো
import { useRouter } from "next/navigation"
import { Leaf } from "lucide-react"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

// 🛠️ ডাইনামিক Zod ভ্যালিডেশন স্কিমা (লগইন এবং রেজিস্টার উভয়ের জন্য)
const formSchema = z.object({
  name: z.string().optional(), // রেজিস্ট্রেশনের জন্য লাগবে, লগইনে অপশনাল
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => {
  // এখানে কাস্টম রিফাইনমেন্ট করা যায় (যেমন: রেজিস্টার মুডে নাম বাধ্যতামূলক করা)
  return true;
});

export function AuthForm() { // 👈 নাম পরিবর্তন করে AuthForm রাখা হলো
  const router = useRouter()
  
  // 🔄 লগইন বনাম রেজিস্টার স্টেট সুইচার
  const [isRegister, setIsRegister] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 🧹 মুড চেঞ্জ করার সময় ফর্ম রিসেট করার ফাংশন
  const toggleMode = () => {
    setIsRegister((prev) => !prev)
    form.reset()
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const actionText = isRegister ? "Creating your account..." : "Connecting to EcoSpark..."
    const toastId = toast.loading(actionText)
    
    try {
      let res;
      
      if (isRegister) {
        // 📥 রেজিস্ট্রেশন রিকোয়েস্ট (আপনার ব্যাকএন্ডের ইউজার ক্রিয়েশন এন্ডপয়েন্ট)
        res = await registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        // 🔐 লগইন রিকোয়েস্ট
        res = await loginUser({
          email: data.email,
          password: data.password,
        });
      }
      
      if (res?.success) {
        const successMessage = isRegister 
          ? "Account created! Welcome to EcoSpark." 
          : res.message || "Welcome back to EcoSpark!"
        
        toast.success(successMessage, { id: toastId })
        
        if (isRegister) {
          // রেজিস্টার সাকসেস হলে সরাসরি লগইন মোডে নিয়ে যাওয়া অথবা ড্যাশবোর্ডে পাঠানো
          setIsRegister(false);
        } else {
          router.push("/")
          router.refresh()
        }
      } else {
        toast.error(res?.message || `${isRegister ? "Registration" : "Login"} failed.`, { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.", { id: toastId })
    }
  }

  return (
    <Card className="w-full sm:max-w-md border-emerald-500/10 shadow-lg shadow-emerald-500/5 bg-card text-card-foreground">
      <CardHeader className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-emerald-600 dark:text-emerald-400">
          <Leaf className="size-5" />
          <span className="font-bold tracking-wider text-xs uppercase">EcoSpark Portal</span>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription>
          {isRegister 
            ? "Join EcoSpark today and start tracking your clean energy ideas."
            : "Enter your credentials to access your clean energy dashboard"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form id="ecospark-auth-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            
            {/* 🆕 Name Field (শুধুমাত্র রেজিস্টার মুড অন থাকলে রেন্ডার হবে) */}
            {isRegister && (
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="auth-name" className="text-sm font-medium">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="auth-name"
                      type="text"
                      placeholder="John Doe"
                      className="focus-visible:ring-emerald-500"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error?.message]} className="text-xs text-destructive mt-1" />
                    )}
                  </Field>
                )}
              />
            )}

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="auth-email" className="text-sm font-medium">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="auth-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="focus-visible:ring-emerald-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} className="text-xs text-destructive mt-1" />
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
                  <FieldLabel htmlFor="auth-password" className="text-sm font-medium">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="auth-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    className="focus-visible:ring-emerald-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} className="text-xs text-destructive mt-1" />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 pt-2">
        <Button 
          type="submit" 
          form="ecospark-auth-form"
          className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold shadow-sm"
        >
          {isRegister ? "Sign Up" : "Sign In"}
        </Button>

        {/* 🔗 লজিক্যাল টগল বাটন: ইউজারকে এক মুড থেকে অন্য মুডে সুইচ করাবে */}
        <p className="text-sm text-center text-muted-foreground">
          {isRegister ? "Already have an account?" : "New to EcoSpark?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isRegister ? "Sign In here" : "Register here"}
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}