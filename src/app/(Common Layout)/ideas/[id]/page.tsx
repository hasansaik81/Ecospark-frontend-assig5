
// import IdeaDetailsPage from "@/components/modules/idea/IdeaDetails";
// import { getUser } from "@/services/auth";


// import { getIdeaById } from "@/services/idea";
// import IdeaDetailsModule from "../../../../components/modules/idea/IdeaDetails";


// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const user = await getUser();
//   const { id } = await params;
//   const { data } = await getIdeaById(id);

//   return (
//     <div>
//       <IdeaDetailsModule idea ={data} user={user} />
//     </div>
//   );
// }




// import { notFound } from "next/navigation";
// import { getUser } from "@/services/auth";
// import { getIdeaById } from "@/services/idea";
// import IdeaDetailsModule from "@/components/modules/idea/IdeaDetails";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function Page({ params }: PageProps) {
//   // ১. সেফলি params থেকে আইডি আনুন
//   const resolvedParams = await params;
//   const id = resolvedParams?.id;

//   if (!id) {
//     return notFound();
//   }
  
//   // ২. প্যারালাল বা নরমাল ডেটা ফেচিং
//   const user = await getUser();
//   const response = await getIdeaById(id);

//   // 🔍 ডিবাগিং: আপনার সার্ভার টার্মিনালে চেক করুন ডেটা আসছে কি না
//   console.log("Details Page DB Response:", response);

//   // ৩. যদি রেসপন্স সাকসেস না হয় বা ডাটা না থাকে তবে নট ফাউন্ড দেখাবে
//   if (!response || !response.success || !response.data) {
//     return notFound();
//   }

//   return (
//     <div className="bg-background min-h-screen">
//       <IdeaDetailsModule idea={response.data} user={user} />
//     </div>
//   );
// }


// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function Page({ params }: PageProps) {
//   const id = params.id;

//   if (!id) {
//     notFound();
//   }

//   const user = await getUser();
//   const response = await getIdeaById(id);

//   console.log("Details Page DB Response:", response);

//   if (!response || !response.success || !response.data) {
//     notFound();
//   }

//   return (
//     <div className="bg-background min-h-screen">
//       <IdeaDetailsModule idea={response.data} user={user} />
//     </div>
//   );
// }


// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   return <h1>ID: {id}</h1>;
// }




// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   try {
//     const user = await getUser();

//     const { id } = await params;

//     const response = await getIdeaById(id);

//     return (
//       <pre>{JSON.stringify(response, null, 2)}</pre>
//     );
//   } catch (error) {
//     console.error("PAGE ERROR:", error);

//     return <div>Error loading page</div>;
//   }
// }


// import { getIdeaById } from "@/services/idea";
// import { getUser } from "@/services/auth";
// import IdeaDetailsModule from "@/components/modules/idea/IdeaDetails";
// import { notFound } from "next/navigation";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const [user, response] = await Promise.all([
//     getUser().catch(() => null),
//     getIdeaById(id),
//   ]);

//   if (!response?.success || !response?.data) {
//     notFound();
//   }

//   return (
//     <IdeaDetailsModule
//       idea={response.data}
//       user={user}
//     />
//   );
// }



// // src/app/ideas/[id]/page.tsx
// import { getUser } from "@/services/auth";
// import { getIdeaById } from "@/services/idea";
// import IdeaDetailsModule from "@/components/modules/idea/IdeaDetails";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const user = await getUser();
//   const { id } = await params;
  
//   // সেফটি হ্যান্ডলিং: ডাটা ডেসট্রাকচারিং করার আগে রেসপন্স চেক করা
//   const response = await getIdeaById(id);
//   const ideaData = response?.data;

//   // ডাটাবেজে যদি এই আইডির কোনো ডাটা না থাকে
//   if (!ideaData) {
//     return (
//       <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
//         <h2 className="text-2xl font-bold text-destructive">Idea Not Found!</h2>
//         <p className="text-muted-foreground text-sm">
//           The idea with ID <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{id}</span> does not exist or has been removed.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <IdeaDetailsModule idea={ideaData} user={user} />
//     </div>
//   );
// }



import { getIdeaById } from "@/services/idea";
import { getUser } from "@/services/auth";
import IdeaDetailsModule from "@/components/modules/idea/IdeaDetails";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // কনকারেন্টলি ইউজার এবং আইডিয়া ডাটা ফেচ করা
  const [user, response] = await Promise.all([
    getUser().catch(() => null),
    getIdeaById(id),
  ]);

  const ideaData = response?.data ?? response?.idea ?? response;

  if (!ideaData) {
    notFound();
  }

  return (
    <IdeaDetailsModule
      idea={ideaData}
      user={user as any}
    />
  );
}