// export const dynamic = "force-dynamic";

// import { notFound } from "next/navigation";
// import { cookies } from "next/headers";
// import PaymentForm from "@/components/payment/PaymentForm";

// export default async function PaymentPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   let idea = null;

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/ideas/${encodeURIComponent(id)}`,
//       {
//         cache: "no-store",
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (res.ok) {
//       const result = await res.json();
//       idea = result?.data ?? result?.idea ?? null;
//     }
//   } catch (err) {
//     console.error("Failed to fetch idea:", err);
//   }

//   if (!idea) {
//     notFound();
//   }

//   return (
//     <main className="container mx-auto py-10">
//       <PaymentForm idea={idea} ideaId={id} />
//     </main>
//   );
// }


import { getIdeaById } from "@/services/idea";
import PaymentForm from "@/components/payment/PaymentForm";
import { notFound } from "next/navigation";



export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // সার্ভিস কল করুন
  const response = await getIdeaById(id);

  // যদি আইডিয়া না থাকে বা এরর হয়
  if (!response.success || !response.data) {
    notFound();
  }

  // আসল আইডিয়া ডেটা বের করে নিন
  const idea = response.data;

  console.log("Full Response:", response);
  console.log("Idea Data:", response.data);

  return <PaymentForm idea={idea} ideaId={id} />;
}