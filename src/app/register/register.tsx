// import { RegisterForm } from "@/components/register/register-form"

import { RegisterForm } from "@/components/modules/auth/register/RegisterFrom"


export const metadata = {
  title: "Register - EcoSpark",
  description: "Create a new EcoSpark account to get started.",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <RegisterForm />
    </div>
  )
}