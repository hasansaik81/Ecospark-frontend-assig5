



// "use client";

// import { createCheckoutSession } from "@/services/payment";

// interface Props {
//   ideaId: string;
// }

// export default function PaymentForm({ ideaId }: Props) {
//   const handleCheckout = async () => {
//     const res = await createCheckoutSession(ideaId);

//     if (res.success) {
//       window.location.href = res.data.url;
//     }
//   };

//   return (
//     <button
//       onClick={handleCheckout}
//       className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
//     >
//       book now
//     </button>
//   );
// }



// components/payment/PaymentForm.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";

interface PaymentFormProps {
  ideaId: string;
}

export default function PaymentForm({ ideaId }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // আপনার এক্সপ্রেস ব্যাকএন্ডের checkout এন্ডপয়েন্টে রিকোয়েস্ট পাঠানো
      const res = await fetch(`http://localhost:5000/api/v1/payment/checkout/${ideaId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      const result = await res.json();

      if (result?.success && result?.data?.url) {
        toast.success("Redirecting to Stripe...");
        window.location.href = result.data.url; // স্ট্রাইপ পেজে রিডাইরেক্ট
      } else {
        toast.error(result?.message || "Failed to initiate payment.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-card rounded-2xl border shadow-sm space-y-4">
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h4 className="text-sm font-semibold">Stripe Secure Payment</h4>
          <p className="text-xs text-muted-foreground">Safe & encrypted</p>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 shadow-sm transition disabled:bg-emerald-600/50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay with Stripe"
        )}
      </button>
    </div>
  );
}