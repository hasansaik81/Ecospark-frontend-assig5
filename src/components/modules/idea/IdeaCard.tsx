





// "use client";

// import {
//   Calendar,
//   User,
//   Tag,
//   ArrowRight,
//   ShieldCheck,
//   Clock,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// interface IdeaCardProps {
//   idea: any;
// }

// export function IdeaCard({ idea }: IdeaCardProps) {
//   const formattedDate = new Date(
//     idea.createdAt
//   ).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <Card className="overflow-hidden">
//       {/* Image */}
//       <div className="relative aspect-video bg-gray-100">
//         {idea?.images?.length > 0 ? (
//           <img
//             src={idea.images[0]}
//             alt={idea.title}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             No Image
//           </div>
//         )}

//         <div className="absolute left-2 top-2">
//           <Badge>
//             <Tag className="w-3 h-3 mr-1" />
//             {idea?.category?.name || "Category"}
//           </Badge>
//         </div>

//         <div className="absolute right-2 top-2">
//           <Badge variant="secondary">
//             <Clock className="w-3 h-3 mr-1" />
//             {idea?.status}
//           </Badge>
//         </div>
//       </div>

//       {/* Header */}
//       <CardHeader>
//         <div className="flex justify-between text-xs text-muted-foreground">
//           <div className="flex items-center gap-1">
//             <User className="w-3 h-3" />

//             {idea?.author?.name}

//             {idea?.author?.role === "MEMBER" && (
//               <ShieldCheck className="w-3 h-3 text-green-500" />
//             )}
//           </div>

//           <div className="flex items-center gap-1">
//             <Calendar className="w-3 h-3" />
//             {formattedDate}
//           </div>
//         </div>

//         <CardTitle>{idea?.title}</CardTitle>
//       </CardHeader>

//       {/* Content */}
//       <CardContent>
//         <CardDescription>
//           <strong>Problem:</strong>{" "}
//           {idea?.problemStatement}
//         </CardDescription>

//         <CardDescription className="mt-2">
//           <strong>Solution:</strong>{" "}
//           {idea?.proposedSolution}
//         </CardDescription>
//       </CardContent>

//       {/* Footer */}
//       <CardFooter className="flex justify-between">
//         <div>
//           {idea?.paymentStatus === "FREE"
//             ? "Free Access"
//             : `$${idea?.price}`}
//         </div>

//         <Button size="sm">
//           View Details
//           <ArrowRight className="w-4 h-4 ml-1" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }



// "use client";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { DollarSign } from "lucide-react";
// import Link from "next/link";

// interface CategoryCardProps {
//   category: any;
// }

// export default function CategoryCard({ category }: CategoryCardProps) {
//   if (!category) return null;

//   const { categoryType, price, description, tutor, id } = category;

//   return (
//     <Card className="w-full max-w-md rounded-2xl shadow-md border group relative overflow-hidden">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <Badge variant="secondary">{categoryType}</Badge>

//         <div className="flex items-center text-lg font-bold text-primary">
//           <DollarSign size={16} />
//           <span className="ml-1">{price}</span>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {description}
//         </p>

//         <div className="flex items-center gap-3">
//           <Avatar>
//             <AvatarFallback>
//               {tutor?.user?.name?.charAt(0) ?? "T"}
//             </AvatarFallback>
//           </Avatar>

//           <div>
//             <p className="text-sm font-medium">
//               {tutor?.user?.name ?? "Unknown Tutor"}
//             </p>
//             <p className="text-xs text-muted-foreground italic truncate">
//               {tutor?.bio ?? ""}
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
//           <Button className="w-full sm:w-1/2">Book Now</Button>

//           <Link href={`/categories/${id}`} className="w-full sm:w-1/2">
//             <Button
//               variant="outline"
//               className="w-full bg-black text-white hover:bg-slate-800"
//             >
//               View Details
//             </Button>
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// interface IdeaCardProps {
//   idea: any;
// }

// export default function IdeaCard({ idea }: IdeaCardProps) {
//   if (!idea) return null;

//   return (
//     <Card className="rounded-xl border shadow-md overflow-hidden">

//       {/* IMAGE */}
//       <div className="h-40 bg-gray-100">
//         {idea?.images?.length ? (
//           <img
//             src={idea.images[0]}
//             alt={idea?.title}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-gray-500">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* CONTENT */}
//       <CardContent className="p-4 space-y-3">

//         <h3 className="font-semibold text-lg">
//           {idea?.title}
//         </h3>

//         <p className="text-sm text-gray-600 line-clamp-2">
//           {idea?.description}
//         </p>

//         <div className="flex justify-between items-center">
//           <Badge>
//             {idea?.category?.name ?? "Uncategorized"}
//           </Badge>

//           <span className="text-xs text-gray-500">
//             {idea?.status ?? "draft"}
//           </span>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex gap-2 pt-2">

//           {/* VIEW DETAILS */}
//           <Link href={`/ideas/${idea.id}`} className="w-1/2">
//             <Button variant="outline" className="w-full">
//               View Details
//             </Button>
//           </Link>

//           {/* BOOK NOW (PAYMENT FLOW) */}
//           <Link href={`/booking/${idea.id}`} className="w-1/2">
//             <Button className="w-full bg-green-600 hover:bg-green-700">
//               Book Now
//             </Button>
//           </Link>

//         </div>
//       </CardContent>
//     </Card>
//   );
// }




// src/components/modules/idea/IdeaCard.tsx
// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// interface IdeaCardProps {
//   idea: any;
// }

// export default function IdeaCard({ idea }: IdeaCardProps) {
//   if (!idea) return null;

//   // ডাটাবেজ রেসপন্স ভেদে আইডি 'id' অথবা '_id' হতে পারে, সেটির সেফটি হ্যান্ডলিং
//   const ideaId = idea?.id || idea?._id;

//   return (
//     <Card className="rounded-xl border shadow-md overflow-hidden bg-card">

//       {/* IMAGE */}
//       <div className="h-40 bg-gray-100 dark:bg-gray-800 relative">
//         {idea?.images?.length ? (
//           <img
//             src={idea.images[0]}
//             alt={idea?.title}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-gray-500 text-sm">
//             No Image Provided
//           </div>
//         )}
//       </div>

//       {/* CONTENT */}
//       <CardContent className="p-4 space-y-3">

//         <h3 className="font-semibold text-lg text-foreground line-clamp-1">
//           {idea?.title}
//         </h3>

//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {idea?.description}
//         </p>

//         <div className="flex justify-between items-center pt-1">
//           <Badge variant="secondary">
//             {idea?.category?.name ?? "Uncategorized"}
//           </Badge>

//           <span className="text-xs text-muted-foreground capitalize">
//             {idea?.status ?? "draft"}
//           </span>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex gap-2 pt-2">

//           {/* 🎯 VIEW DETAILS */}
//           <Link href={`/ideas/${ideaId}`} className="w-1/2">
//             <Button variant="outline" className="w-full text-sm">
//               View Details
//             </Button>
//           </Link>

//           {/* 🎯 BOOK NOW (Stripe Payment Flow) */}
//           <Link href={`/payment/${ideaId}`} className="w-1/2">
//             <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
//               Book Now
//             </Button>
//           </Link>

//         </div>
//       </CardContent>
//     </Card>
//   );
// }




// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// interface IdeaCardProps {
//   idea: any;
// }

// export default function IdeaCard({ idea }: IdeaCardProps) {
//   if (!idea) return null;

//   // ডাটাবেজ রেসপন্স ভেদে আইডি 'id' অথবা '_id' হতে পারে, সেটির সেফটি হ্যান্ডলিং
//   const ideaId = idea?.id || idea?._id;

//   return (
//     <Card className="rounded-xl border shadow-md overflow-hidden bg-card">

//       {/* IMAGE */}
//       <div className="h-40 bg-gray-100 dark:bg-gray-800 relative">
//         {idea?.images?.length ? (
//           <img
//             src={idea.images[0]}
//             alt={idea?.title}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-gray-500 text-sm">
//             No Image Provided
//           </div>
//         )}
//       </div>

//       {/* CONTENT */}
//       <CardContent className="p-4 space-y-3">

//         <h3 className="font-semibold text-lg text-foreground line-clamp-1">
//           {idea?.title}
//         </h3>

//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {idea?.description}
//         </p>

//         <div className="flex justify-between items-center pt-1">
//           <Badge variant="secondary">
//             {idea?.category?.name ?? "Uncategorized"}
//           </Badge>

//           <span className="text-xs text-muted-foreground capitalize">
//             {idea?.status ?? "draft"}
//           </span>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex gap-2 pt-2">

//           {/* 🎯 VIEW DETAILS (আইডিয়া ডিটেইলস পেজে নিয়ে যাবে) */}
//           <Link href={`/ideas/${ideaId}`} className="w-1/2">
//             <Button variant="outline" className="w-full text-sm">
//               View Details
//             </Button>
//           </Link>

//           {/* 🎯 BOOK NOW (সরাসরি স্ট্রাইপ পেমেন্ট পেজে নিয়ে যাবে) */}
//           <Link href={`/payment/${ideaId}`} className="w-1/2">
//             <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
//               Book Now
//             </Button>
//           </Link>

//         </div>
//       </CardContent>
//     </Card>
//   );
// }





"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// 💡 ল্যান্ডিং পেজের টাইপস্ক্রিপ্ট এরর এবং আইডি এরর একসাথে দূর করার জন্য ইন্টারফেস 
interface IdeaCardProps {
  item?: any; // LandingPage থেকে আসা 'item' সাপোর্ট করবে
  idea?: any; // যদি অন্য কোথাও 'idea' নামে পাস করা হয় তাও সাপোর্ট করবে
}

export default function IdeaCard({ item, idea }: IdeaCardProps) {
  // 🎯 ল্যান্ডিং পেজের 'item' অথবা ডিরেক্ট 'idea' দুটিকেই রিসিভ করার আলটিমেট সলিউশন
  const currentIdea = item || idea;

  if (!currentIdea) return null;

  // 🆔 ডাটাবেজ আইডি 'id' অথবা '_id' দুটোর জন্যই সেফ হ্যান্ডলিং
  const ideaId = currentIdea?.id || currentIdea?._id;

  return (
    <Card className="rounded-xl border shadow-md overflow-hidden bg-card flex flex-col justify-between min-h-[360px]">
      
      {/* 🖼️ IMAGE SECTION */}
      <div className="h-40 bg-gray-100 dark:bg-gray-800 relative w-full">
        {currentIdea?.images?.length ? (
          <img
            src={currentIdea.images[0]}
            alt={currentIdea?.title || "Eco Idea"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500 text-sm">
            No Image Provided
          </div>
        )}
      </div>

      {/* 📝 CONTENT SECTION */}
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {currentIdea?.title || "Untitled Idea"}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {currentIdea?.description || "No description provided for this idea."}
          </p>

          <div className="flex justify-between items-center pt-1">
            <Badge variant="secondary" className="whitespace-nowrap">
              {currentIdea?.category?.name ?? "Uncategorized"}
            </Badge>

            <span className="text-xs text-muted-foreground capitalize bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">
              {currentIdea?.status ?? "draft"}
            </span>
          </div>
        </div>

        {/* 🎯 BUTTONS (ডিজাইন একদম আগের মতো হুবহু ২ ভাগ করা) */}
        <div className="flex gap-2 pt-2 mt-auto">
          {/* 🔍 VIEW DETAILS BUTTON */}
          {ideaId ? (
            <Link href={`/ideas/${ideaId}`} className="w-1/2">
              <Button variant="outline" className="w-full text-sm cursor-pointer">
                View Details
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="w-1/2 text-sm cursor-pointer" disabled>
              View Details
            </Button>
          )}

          {/* 💳 BOOK NOW BUTTON */}
          {ideaId ? (
            <Link href={`/payment/${ideaId}`} className="w-1/2">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm cursor-pointer shadow-sm transition-colors">
                Book Now
              </Button>
            </Link>
          ) : (
            <Button className="w-1/2 bg-green-600 hover:bg-green-700 text-white text-sm cursor-pointer shadow-sm transition-colors" disabled>
              Book Now
            </Button>
          )}
        </div>

      </CardContent>
    </Card>
  );
}