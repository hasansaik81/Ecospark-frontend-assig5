export const dynamic = "force-dynamic";

import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-md space-y-4">
        <XCircle className="mx-auto h-14 w-14 text-red-600" />

        <h1 className="text-2xl font-bold text-red-700">Payment Cancelled</h1>

        <p className="text-sm text-gray-600">
          Your payment was cancelled. You can try again whenever you&apos;re
          ready.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}