export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    ideaId?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { ideaId } = await searchParams;

  if (!ideaId) {
    notFound();
  }

  // Verify payment server-side
  let message = "Your payment was processed successfully.";
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${BASE_URL}/payment/verify/${ideaId}`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const result = await res.json();
      message = result?.data?.message ?? message;
    }
  } catch {
    // Keep default message on error
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

        <h1 className="mt-4 text-2xl font-bold">Payment Successful</h1>

        <p className="mt-2 text-gray-600">{message}</p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}