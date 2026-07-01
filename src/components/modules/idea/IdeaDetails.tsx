
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { Briefcase, DollarSign, Calendar, Star } from "lucide-react";

// import { createBooking } from "@/services/booking";
// import { getOwnSubjects } from "@/services/subjects";
// import BookingModal, { BookingFormValues } from "./BookingModal";

// // 👤 Mentor or Tutor type
// interface Mentor {
//   id: string;
//   name: string;
//   experience?: number;
//   hourlyRate?: number;
//   bio?: string;
//   image?: string;
// }

// // 📚 Category or Service type
// interface Category {
//   id: string;
//   _id?: string; 
//   title: string;
//   price: number;
//   description: string;
//   tutorId: string;
//   mentor?: Mentor;
// }

// // 🔑 Logged in user type
// interface User {
//   id: string;
//   email: string;
//   name?: string;
//   role?: string;
// }

// // 📦 Final props interface
// interface CategoryDetailsProps {
//   category: Category; 
//   user: User | null;  
// }

// export default function CategoryDetails({ category, user }: CategoryDetailsProps) {
//   const router = useRouter();
//   const [subject, setSubject] = useState([]);
//   const [loadingSubjects, setLoadingSubjects] = useState(true);

//   // ১. সাবজেক্ট ফেচ করার হুক
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await getOwnSubjects();
//         if (res?.success && Array.isArray(res.data)) {
//           setSubject(res.data);
//         }
//       } catch (err) {
//         console.error("Subject Fetch Error:", err);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   // ২. সেফটি চেক (যদি ক্যাটাগরি ডেটা কোনো কারণে লোড না হয়)
//   if (!category) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p className="text-lg animate-pulse font-semibold">Loading category data...</p>
//       </div>
//     );
//   }

//   const { title, price, description, mentor, tutorId, id: categoryId } = category;

//   // ৩. বুকিং এবং কনফার্মেশন রিডাইরেক্ট হ্যান্ডলার
//   async function handleBooking(data: BookingFormValues) {
//     const payload = {
//       studentId: user?.id,
//       tutorId: tutorId,
//       categoryId: categoryId,
//       subjectId: data?.subjectId,
//       startDate: new Date(data.startDate).toISOString(),
//       endDate: new Date(data.endDate).toISOString(),
//       note: data.note || "",
//     };

//     try {
//       const res = await createBooking(payload);
//       if (res?.success) {
//         toast.success("Booking successful! Redirecting to confirmation...");
        
//         // আপনার একটিভ লজিক অনুযায়ী আইডি নিয়ে রিডাইরেক্ট করা হচ্ছে
//         const bookingId = res?.data?.id || res?.data?._id;
//         router.push(`/booking/confirm?bookingId=${bookingId}`);
//       } else {
//         toast.error(res?.message || "Booking failed.");
//       }
//     } catch (error: any) {
//       toast.error(error?.message || "Internal Server Error. Try again.");
//     }
//   }

//   return (
//     <div className="min-h-screen bg-muted/40">
//       <div className="container mx-auto px-4 py-12">
        
//         {/* 🌟 হেডার সেকশন */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-3">
//             <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-1 text-sm">
//               {title}
//             </Badge>
//             <span className="flex items-center gap-1 text-muted-foreground text-sm">
//               <Star size={16} className="fill-amber-400 text-amber-400" /> SkillBridge Certified
//             </span>
//           </div>
//           <h1 className="text-4xl font-bold tracking-tight text-slate-900">Master {title} with SkillBridge</h1>
//           <div className="flex items-center gap-2 text-2xl font-semibold text-primary">
//             <DollarSign size={22} />{price}
//             <span className="text-base text-muted-foreground font-normal"> per course</span>
//           </div>
//         </div>

//         <Separator className="my-10" />

//         {/* 📋 মেইন গ্রিড লেআউট */}
//         <div className="grid md:grid-cols-3 gap-10">
          
//           {/* 👈 বাম পাশের কন্টেন্ট এলাকা (২ কলাম) */}
//           <div className="md:col-span-2 space-y-8">
            
//             {/* সেকশন ১: About This Skill */}
//             <Card className="rounded-2xl shadow-sm border bg-background">
//               <CardContent className="p-8 space-y-4">
//                 <h2 className="text-2xl font-semibold text-gray-800">About This Skill</h2>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {description || "Enhance your career with our expert-led mentorship program."}
//                 </p>
//               </CardContent>
//             </Card>

//             {/* সেকশন ২: Meet Your Mentor */}
//             <Card className="rounded-2xl shadow-sm border bg-background">
//               <CardContent className="p-8 space-y-6">
//                 <h2 className="text-2xl font-semibold text-gray-800">Meet Your Mentor</h2>
//                 <div className="flex items-center gap-5">
//                   <Avatar className="h-20 w-20 border-2 border-primary/10">
//                     <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold">
//                       {mentor?.name?.charAt(0) || "M"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{mentor?.name || "Expert Mentor"}</h3>
//                     <p className="text-sm text-blue-600 font-medium">Verified Industry Expert</p>
//                   </div>
//                 </div>
                
//                 <Separator />

//                 <div className="grid grid-cols-2 gap-6 pt-2">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <div className="p-2 bg-muted rounded-lg"><Briefcase size={18} /></div>
//                     <div>
//                       <p className="text-xs text-muted-foreground uppercase">Experience</p>
//                       <p className="font-semibold">{mentor?.experience || 5}+ Years</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <div className="p-2 bg-muted rounded-lg"><DollarSign size={18} /></div>
//                     <div>
//                       <p className="text-xs text-muted-foreground uppercase">Hourly Rate</p>
//                       <p className="font-semibold">${mentor?.hourlyRate || 40}/hr</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* 👉 ডান পাশের স্টিকি বুকিং কার্ড (১ কলাম) */}
//           <div className="relative">
//             <Card className="sticky top-28 rounded-2xl shadow-xl border bg-background overflow-hidden">
//               <div className="h-2 bg-primary" />
//               <CardContent className="p-8 space-y-6">
//                 <div>
//                   <div className="text-sm text-muted-foreground mb-1">Total Course Fee</div>
//                   <div className="text-4xl font-extrabold text-primary">${price}</div>
//                 </div>
                
//                 <p className="text-sm text-muted-foreground leading-relaxed">
//                   Enroll today to get full access to the course and 1-on-1 mentorship.
//                 </p>

//                 {/* বুকিং মডাল বাটন */}
//                 <BookingModal subjects={subject} onSubmit={handleBooking} />

//                 <Button variant="outline" className="w-full py-6 rounded-xl font-semibold">
//                   Contact Mentor
//                 </Button>

//                 <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest pt-4">
//                   <div className="h-px w-8 bg-border" />
//                   Secure Checkout
//                   <div className="h-px w-8 bg-border" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ==========================================
// 💡 TYPES & INTERFACES (Removed 'any')
// ==========================================

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: "ADMIN" | "MEMBER" | string;
}

interface Category {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
  role?: string;
}

interface Idea {
  id?: string;
  _id?: string; // MongoDB ফলব্যাক বা প্রিজমা আইডি সেফটি
  title: string;
  description: string;
  problemStatement?: string;
  proposedSolution?: string;
  status?: "draft" | "published" | string;
  paymentStatus?: "FREE" | "PAID" | string;
  price?: number;
  images?: string[];
  createdAt: string | Date;
  category?: Category;
  author?: Author;
}

interface IdeaDetailsProps {
  idea: Idea; 
  user: UserProfile | null;
}

// ==========================================
// 🚀 MAIN COMPONENT
// ==========================================

export default function IdeaDetailsModule({ idea, user }: IdeaDetailsProps) {
  
  // সেফ আইডি এক্সট্রাকশন
  const ideaId = idea?.id || idea?._id;

  // ডেট ফরম্যাটিং সেফলি হ্যান্ডেল করা হয়েছে
  const formattedDate = idea?.createdAt 
    ? new Date(idea.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  return (
    // <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-6">
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      
      {/* 🔙 BACK BUTTON */}
      <Link 
        href="/dashboard" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-emerald-600 transition gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📑 LEFT - CONTENT AREA */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* IMAGE SECTION */}
          <div className="relative aspect-video w-full rounded-2xl bg-muted overflow-hidden border shadow-sm">
            {idea?.images && idea.images.length > 0 ? (
              <img
                src={idea.images[0]}
                alt={idea.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                No Preview Image Available
              </div>
            )}
            
            <div className="absolute left-3 top-3">
              <Badge className="bg-black/70 hover:bg-black/80 backdrop-blur-md text-white border-none py-1 px-2.5">
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                {idea?.category?.name || "Uncategorized"}
              </Badge>
            </div>
          </div>

          {/* TITLE & META */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {idea?.title || "Untitled Idea"}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-1 border-b pb-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-foreground">
                  {idea?.author?.name || "Anonymous"}
                </span>
                {idea?.author?.role === "MEMBER" && (
                  <span className="inline-flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* TEXTS OVERVIEW */}
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {idea?.description || "No description provided."}
              </p>
            </div>

            {idea?.problemStatement && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <h4 className="text-sm font-semibold text-amber-600 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> The Problem
                </h4>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {idea.problemStatement}
                </p>
              </div>
            )}

            {idea?.proposedSolution && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <h4 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Proposed Solution
                </h4>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {idea.proposedSolution}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 💳 RIGHT - SIDEBAR ACTION CARD */}
        <div className="space-y-6">
          <Card className="sticky top-24 rounded-2xl shadow-md border overflow-hidden bg-card">
            <CardContent className="p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Status</span>
                  <div className="flex items-center gap-1.5 text-sm font-medium capitalize text-foreground">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {idea?.status || "draft"}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Access</span>
                  <div className="text-xl font-bold text-emerald-600 flex items-center justify-end">
                    {idea?.paymentStatus === "FREE" || !idea?.price ? (
                      "Free Access"
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 -mr-0.5" />
                        {idea.price}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full documentation access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct contact with innovator</span>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              {ideaId && (
               <Link href={`/payment/${ideaId}`} className="block w-full">
                 <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-5 shadow-sm rounded-xl transition">
                Book Now / Get Access
                  </Button>
               </Link>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

