






"use client";

import { useState } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createCheckoutSession } from "@/services/payment";

interface Idea {
  id: string;
  title: string;
  description?: string;
  price?: number | null;
  paymentStatus?: "FREE" | "PAID";
  images?: string[];
}

interface Props {
  idea: Idea;
  ideaId: string;
}

export default function PaymentForm({ idea, ideaId }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await createCheckoutSession(ideaId);

      // ব্যাকএন্ড থেকে আসা রেসপন্স চেক করা
      if (res?.data?.url) {
        window.location.assign(res.data.url);
      } else {
        toast.error(res?.message || "Checkout URL not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-10">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="space-y-6 p-8">
          <div className="text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-emerald-600" />
            <h1 className="mt-3 text-2xl font-bold">Secure Payment</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete your payment securely with Stripe.
            </p>
          </div>

          <div className="rounded-xl border bg-muted/40 p-4 space-y-2">
            <h2 className="font-semibold text-lg">{idea.title}</h2>
            <p className="text-sm text-muted-foreground">{idea.description}</p>
            <div className="pt-2 text-xl font-bold text-emerald-600">
              {idea.paymentStatus === "PAID" ? `$${idea.price ?? 0}` : "Free"}
            </div>
          </div>

          {/* লজিক আপডেট: যদি FREE হয়, তবে বাটনটি ইনভিসিবল না রেখে একটি ডিজেবল বাটন বা মেসেজ দেখান */}
          {idea.paymentStatus === "PAID" ? (
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-emerald-600 py-6 text-base font-semibold hover:bg-emerald-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Pay Now
                </>
              )}
            </Button>
          ) : (
            <div className="rounded-lg bg-green-100 p-4 text-center text-green-700 font-medium">
              This idea is free. No payment is required.
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground">
            Payments are securely processed by Stripe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
