// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// // import { registerUser } from "@/services/auth";

// const formSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters."),
//     email: z.email("Please enter a valid email address."),
//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters."),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match.",
//     path: ["confirmPassword"],
//   });

// export function RegisterForm() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     try {
//       console.log("REGISTER DATA", data);

//       // const res = await registerUser(data);

//       // if (res?.success) {
//       //   toast.success(res.message);
//       //   router.push("/login");
//       // }

//       toast.success("Registration successful!");
//       router.push("/login");
//     } catch (error: any) {
//       toast.error(
//         error?.message || "An error occurred during registration."
//       );
//     }
//   }

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Create Account</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <form
//           id="register-form"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           <FieldGroup>
//             <Controller
//               name="name"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Name</FieldLabel>
//                   <Input
//                     {...field}
//                     placeholder="John Doe"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Email</FieldLabel>
//                   <Input
//                     {...field}
//                     type="email"
//                     placeholder="john@example.com"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Password</FieldLabel>
//                   <Input
//                     {...field}
//                     type="password"
//                     placeholder="******"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="confirmPassword"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Confirm Password</FieldLabel>
//                   <Input
//                     {...field}
//                     type="password"
//                     placeholder="******"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>

//       <CardFooter className="flex flex-col gap-4">
//         <Button
//           type="submit"
//           form="register-form"
//           className="w-full"
//         >
//           Register
//         </Button>

//         <p className="text-sm text-muted-foreground">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="font-medium text-primary hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email("Invalid email address"),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your EcoSpark account...");
      try {
        // আপনার কাস্টম রেজিস্ট্রেশন API এন্ডপয়েন্ট
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "Registration failed", { id: toastId });
          return;
        }

        toast.success("Account created successfully!", { id: toastId });
        
        // সফলভাবে তৈরি হলে লগইন পেজে বা ড্যাশবোর্ডে পাঠান
        router.push("/login");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props} className="border-emerald-500/10 shadow-lg shadow-emerald-500/5 bg-card text-card-foreground">
      <CardHeader className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-emerald-600 dark:text-emerald-400">
          <Leaf className="size-5" />
          <span className="font-bold tracking-wider text-xs uppercase">Join the Movement</span>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
        <CardDescription>
          Enter your details below to start your sustainable energy journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-medium">Full Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      placeholder="John Doe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="focus-visible:ring-emerald-500"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-xs text-destructive mt-1" />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-sm font-medium">Email Address</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      placeholder="name@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="focus-visible:ring-emerald-500"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-xs text-destructive mt-1" />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-sm font-medium">Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="focus-visible:ring-emerald-500"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-xs text-destructive mt-1" />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          form="register-form" 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold shadow-sm"
        >
          Register Account
        </Button>
      </CardFooter>
    </Card>
  );
}