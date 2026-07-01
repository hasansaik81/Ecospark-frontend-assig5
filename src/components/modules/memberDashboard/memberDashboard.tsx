// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Lightbulb, Loader2, Clock, Vote } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
// }

// interface IdeaItem extends IdeaFormInput {
//   id: string;
//   author: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
// }

// // ক্যাটাগরি অবজেক্টের ইন্টারফেস টাইপ
// interface CategoryItem {
//   _id: string; // ব্যাকএন্ড অনুযায়ী আইডি string
//   name: string;
//   slug?: string;
// }

// // স্ট্যাটস টাইপ
// interface MemberStats {
//   totalIdeas: number;
//   totalVotes: number;
// }

// // 🔑 ১. ইন্টারফেসে আপনার প্রয়োজনীয় সব প্রপ্স টাইপ ডিফাইন করা হলো
// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: CategoryItem[]; // 👈 নতুন ব্যাকএন্ড ক্যাটাগরি লিস্ট
// }

// export default function MemberDashboardClient({ 
//   initialStats, 
//   initialIdeas, 
//   categories 
// }: MemberDashboardClientProps) {
  
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);
//   const [stats] = React.useState<MemberStats | null>(initialStats);
  
//   // 🔄 ২. ডামি ডেটা ফেলে দিয়ে সার্ভার থেকে আসা রিয়েল আইডিয়া লিস্ট সেট করা হলো
//   const [ideas, setIdeas] = React.useState<IdeaItem[]>(initialIdeas || []);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm<IdeaFormInput>();

//   const onSubmitIdea = async (data: IdeaFormInput) => {
//   setIsSubmitting(true);
//   setMessage(null);
  
//   try {
//     // 📦 ১. যেহেতু আপনার সার্ভিস FormData এক্সপেক্ট করে, তাই একটি FormData অবজেক্ট তৈরি করছি
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
    
//     // (ভবিষ্যতে যদি ইমেজ আপলোড যোগ করেন, তবে এখানে formData.append("image", file) দিতে পারবেন)

//     // 🔄 ২. আপনার আসল সার্ভিস ফাংশনে FormData-টি পাস করা হলো
//     const response = await createIdea(formData);
    
//     if (response && response.success) {
//       // ব্যাকএন্ড থেকে সেভ হওয়া আইডিয়া অবজেক্টটি নিয়ে আসা হলো
//       const savedIdea: IdeaItem = response.data; 
      
//       // লোকাল স্টেটে নতুন আইডিয়াটি সবার উপরে পুশ করা হলো
//       setIdeas([savedIdea, ...ideas]);
      
//       setMessage({ 
//         type: "success", 
//         text: "🎉 আইডিয়াটি সফলভাবে ডাটাবেজে সেভ হয়েছে এবং এডমিন রিভিউয়ের অপেক্ষায় আছে!" 
//       });
//       reset();
//     } else {
//       setMessage({ type: "error", text: response.message || "আইডিয়া সেভ করতে সমস্যা হয়েছে।" });
//     }
//   } catch (err) {
//     setMessage({ type: "error", text: "কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।" });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className="space-y-6">
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">My Total Ideas</span>
//               <p className="text-2xl font-bold mt-1 text-slate-800">{stats.totalIdeas || 0}</p>
//             </div>
//             <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Lightbulb className="h-5 w-5" /></div>
//           </div>
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">Votes Received</span>
//               <p className="text-2xl font-bold mt-1 text-sky-600">{stats.totalVotes || 0}</p>
//             </div>
//             <div className="p-3 bg-sky-50 rounded-lg text-sky-600"><Vote className="h-5 w-5" /></div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
//             <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
//               <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea</h3>
//             </div>
//             <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
//               {message && <div className={`p-3 rounded text-xs font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800"}`}>{message.text}</div>}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Idea Title</label>
//                 <input {...register("title", { required: "টাইটেল দেওয়া আবশ্যিক" })} type="text" placeholder="Enter title..." className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
//                 {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Category</label>
//                 <select {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })} className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none">
//                   <option value="">Select Category</option>
                  
//                   {/* 🔄 ৩. হার্ডকোডেড অপশন বাদ দিয়ে ডাটাবেজের ক্যাটাগরি লুপ করা হলো */}
//                   {categories && categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Idea Description</label>
//                 <textarea {...register("description", { required: "বিস্তারিত লিখুন" })} rows={4} placeholder="Write details..." className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
//                 {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//               </div>
//               <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white h-9 px-4 w-full rounded-md text-sm font-medium shadow hover:bg-green-700 transition">
//                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Idea"}
//               </button>
//             </form>
//           </div>

//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h3 className="font-semibold text-sm mb-3">📋 My Submitted Ideas & Status</h3>
//             <div className="space-y-2">
//               {ideas.length === 0 ? (
//                 <p className="text-xs text-gray-500 text-center py-2">আপনার কোনো সাবমিট করা আইডিয়া নেই।</p>
//               ) : (
//                 ideas.map(i => (
//                   <div key={i.id} className="flex justify-between items-center p-3 border rounded-lg text-sm bg-white">
//                     <div>
//                       <p className="font-semibold text-gray-800">{i.title}</p>
//                       <p className="text-xs text-gray-400 capitalize">Category: {i.category}</p>
//                     </div>
//                     <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 font-medium ${i.status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" : i.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
//                       {i.status === "PENDING" && <Clock className="h-3 w-3 animate-pulse" />} {i.status}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//             <h3 className="font-semibold text-sm text-green-600 mb-2">🌱 My Eco-Impact</h3>
//             <p className="text-xs text-gray-500">🎉 আপনার আইডিয়ায় সর্বমোট <strong>{stats?.totalVotes || 0} টি</strong> ভোট পড়েছে।</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Lightbulb, Loader2, Clock, Vote } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
// }

// interface IdeaItem extends IdeaFormInput {
//   id?: string;   // 🌟 প্রিজমা/মঙ্গোডিবি ব্যাকআপের জন্য অপশনাল করা হলো
//   _id?: string;  // 🌟 নতুন যোগ করা হলো ডাটাবেজ সেফটির জন্য
//   author: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
// }

// interface CategoryItem {
//   _id: string; 
//   id?: string; // 🌟 টাইপস্ক্রিপ্টকে বোঝানোর জন্য এটি অপশনাল হিসেবে যোগ করুন
//   name: string;
//   slug?: string;
// }

// interface MemberStats {
//   totalIdeas: number;
//   totalVotes: number;
// }

// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: CategoryItem[]; 
// }

// export default function MemberDashboardClient({ 
//   initialStats, 
//   initialIdeas, 
//   categories 
// }: MemberDashboardClientProps) {
  
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);
//   const [stats] = React.useState<MemberStats | null>(initialStats);
//   const [ideas, setIdeas] = React.useState<IdeaItem[]>(initialIdeas || []);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm<IdeaFormInput>();

//   const onSubmitIdea = async (data: IdeaFormInput) => {
//     setIsSubmitting(true);
//     setMessage(null);
    
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", data.description);
//       formData.append("category", data.category);
      
//       const response = await createIdea(formData);
      
//       if (response && response.success) {
//         const savedIdea: IdeaItem = response.data; 
        
//         setIdeas([savedIdea, ...ideas]);
        
//         setMessage({ 
//           type: "success", 
//           text: "🎉 আইডিয়াটি সফলভাবে ডাটাবেজে সেভ হয়েছে এবং এডমিন রিভিউয়ের অপেক্ষায় আছে!" 
//         });
//         reset();
//       } else {
//         setMessage({ type: "error", text: response.message || "আইডিয়া সেভ করতে সমস্যা হয়েছে।" });
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">My Total Ideas</span>
//               <p className="text-2xl font-bold mt-1 text-slate-800">{stats.totalIdeas || 0}</p>
//             </div>
//             <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Lightbulb className="h-5 w-5" /></div>
//           </div>
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">Votes Received</span>
//               <p className="text-2xl font-bold mt-1 text-sky-600">{stats.totalVotes || 0}</p>
//             </div>
//             <div className="p-3 bg-sky-50 rounded-lg text-sky-600"><Vote className="h-5 w-5" /></div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
//             <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
//               <h3 className="font-semibold text-lg flex items-center gap-2">
//                 <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
//               </h3>
//             </div>
//             <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
//               {message && (
//                 <div className={`p-3 rounded text-xs font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800"}`}>
//                   {message.text}
//                 </div>
//               )}
              
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Idea Title</label>
//                 <input {...register("title", { required: "টাইটেল দেওয়া আবশ্যিক" })} type="text" placeholder="Enter title..." className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-600" />
//                 {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Category</label>
//                 <select 
//     {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })} 
//     className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none"
//   >
//     {/* 🌟 এই প্রথম অপশনটিতে কোনো লুপ নেই, তাই এখানে key লাগবে না */}
//     <option value="">Select Category</option>
    
//     {/* 🌟 সেফ লুপ: টাইপ সেফটি বজায় রেখে ফলব্যাক হ্যান্ডেল করা হলো */}
// {categories && categories.map((cat, index) => {
//   const uniqueKey = cat._id || cat.id || `cat-option-${index}`;
//   const optionValue = cat._id || cat.id || "";
      
//       return (
//         <option key={uniqueKey} value={optionValue}>
//           {cat.name}
//         </option>
//       );
//     })}
//   </select>
//                 {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Idea Description</label>
//                 <textarea {...register("description", { required: "বিস্তারিত লিখুন" })} rows={4} placeholder="Write details..." className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
//                 {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//               </div>

//               <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white h-9 px-4 w-full rounded-md text-sm font-medium shadow hover:bg-green-700 transition">
//                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Idea"}
//               </button>
//             </form>
//           </div>

//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h3 className="font-semibold text-sm mb-3">📋 My Submitted Ideas & Status</h3>
//             <div className="space-y-2">
//               {ideas.length === 0 ? (
//                 <p className="text-xs text-gray-500 text-center py-2">আপনার কোনো সাবমিট করা আইডিয়া নেই।</p>
//               ) : (
//                 ideas.map((i, index) => (
//                   // 🌟 এখানে key প্রপ্স ফিক্স করা হলো যাতে undefined না হয়
//                   <div key={i._id || i.id || `idea-${index}`} className="flex justify-between items-center p-3 border rounded-lg text-sm bg-white">
//                     <div>
//                       <p className="font-semibold text-gray-800">{i.title}</p>
//                       <p className="text-xs text-gray-400 capitalize">Category: {i.category}</p>
//                     </div>
//                     <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 font-medium ${i.status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" : i.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
//                       {i.status === "PENDING" && <Clock className="h-3 w-3 animate-pulse" />} {i.status}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//             <h3 className="font-semibold text-sm text-green-600 mb-2">🌱 My Eco-Impact</h3>
//             <p className="text-xs text-gray-500">🎉 আপনার আইডিয়ায় সর্বমোট <strong>{stats?.totalVotes || 0} টি</strong> ভোট পড়েছে।</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ##################################################################################################




// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Lightbulb, Loader2, Clock, Vote, X } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
//   problemStatement?: string;
//   proposedSolution?: string;
//   image?: FileList;
// }

// interface IdeaItem extends IdeaFormInput {
//   id?: string;
//   _id?: string;
//   author: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   createdAt?: string;
//   images?: string[];
// }

// interface CategoryItem {
//   _id: string;
//   id?: string;
//   name: string;
//   slug?: string;
// }

// interface MemberStats {
//   totalIdeas: number;
//   totalVotes: number;
// }

// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: CategoryItem[];
// }

// export default function MemberDashboardClient({
//   initialStats,
//   initialIdeas,
//   categories,
// }: MemberDashboardClientProps) {
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);
//   const [stats] = React.useState<MemberStats | null>(initialStats);
//   const [ideas, setIdeas] = React.useState<IdeaItem[]>(initialIdeas || []);
//   const [imagePreview, setImagePreview] = React.useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm<IdeaFormInput>();

//   // ✅ ফর্ম রিসেট করার ফাংশন
//   const resetForm = () => {
//     reset();
//     setImagePreview(null);
//     setSelectedFile(null);
//     setMessage(null);
//   };

//   const onSubmitIdea = async (data: IdeaFormInput) => {
//     setIsSubmitting(true);
//     setMessage(null);

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", data.description);
//       formData.append("categoryId", data.category);
//       formData.append("problemStatement", data.problemStatement || "");
//       formData.append("proposedSolution", data.proposedSolution || "");
//       formData.append("paymentStatus", "FREE");
//       formData.append("price", "0");

//       // ✅ ইমেজ থাকলেই যোগ করুন
//       if (selectedFile) {
//         formData.append("image", selectedFile);
//       }

//       // 🔍 ডিবাগিং: FormData চেক করুন
//       console.log("📤 Submitting FormData:");
//       for (let [key, value] of formData.entries()) {
//         if (value instanceof File) {
//           console.log(`📎 ${key}: ${value.name} (${value.type}, ${value.size} bytes)`);
//         } else {
//           console.log(`📝 ${key}: ${value}`);
//         }
//       }

//       const response = await createIdea(formData);

//       console.log("📥 Server Response:", response);

//       if (response && response.success) {
//         const savedIdea: IdeaItem = response.data;
//         setIdeas([savedIdea, ...ideas]);
//         setMessage({
//           type: "success",
//           text: "🎉 আইডিয়াটি সফলভাবে সেভ হয়েছে!"
//         });
//         resetForm();
//       } else {
//         const errorMsg = response.message || "আইডিয়া সেভ করতে সমস্যা হয়েছে।";
//         setMessage({ type: "error", text: errorMsg });
//       }
//     } catch (err: any) {
//       console.error("❌ Submit error:", err);
//       const errorMsg = err.message || "কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।";
//       setMessage({ type: "error", text: errorMsg });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // ✅ ফাইল সাইজ চেক (5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setMessage({ type: "error", text: "Image size must be less than 5MB" });
//         e.target.value = "";
//         return;
//       }

//       // ✅ ফাইল টাইপ চেক
//       if (!file.type.startsWith("image/")) {
//         setMessage({ type: "error", text: "Only image files are allowed" });
//         e.target.value = "";
//         return;
//       }

//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//       setSelectedFile(null);
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setSelectedFile(null);
//     setValue("image", undefined);
//     // ফাইল ইনপুট রিসেট করুন
//     const fileInput = document.getElementById("image-input") as HTMLInputElement;
//     if (fileInput) fileInput.value = "";
//   };

//   // ✅ Status Badge রং নির্ধারণ
//   const getStatusBadge = (status: string) => {
//     const statusConfig = {
//       APPROVED: {
//         bg: "bg-green-50",
//         text: "text-green-700",
//         border: "border-green-200",
//         icon: null,
//       },
//       REJECTED: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//         icon: null,
//       },
//       PENDING: {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//         icon: <Clock className="h-3 w-3 animate-pulse" />,
//       },
//     };

//     const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
//     return (
//       <span
//         className={`text-xs px-2 py-1 rounded flex items-center gap-1 font-medium ${config.bg} ${config.text} ${config.border}`}
//       >
//         {config.icon} {status}
//       </span>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">
//                 My Total Ideas
//               </span>
//               <p className="text-2xl font-bold mt-1 text-slate-800">
//                 {stats.totalIdeas || 0}
//               </p>
//             </div>
//             <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
//               <Lightbulb className="h-5 w-5" />
//             </div>
//           </div>
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">
//                 Votes Received
//               </span>
//               <p className="text-2xl font-bold mt-1 text-sky-600">
//                 {stats.totalVotes || 0}
//               </p>
//             </div>
//             <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
//               <Vote className="h-5 w-5" />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           {/* Form */}
//           <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
//               <h3 className="font-semibold text-lg flex items-center gap-2">
//                 <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green
//                 Idea
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Submit your eco-friendly idea and make a difference! 🌱
//               </p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
//               {/* Message */}
//               {message && (
//                 <div
//                   className={`p-3 rounded text-sm font-medium ${
//                     message.type === "success"
//                       ? "bg-green-50 text-green-800 border border-green-200"
//                       : "bg-red-50 text-red-800 border border-red-200"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               )}

//               {/* Title */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Idea Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("title", { required: "টাইটেল দেওয়া আবশ্যিক" })}
//                   type="text"
//                   placeholder="Enter title..."
//                   className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                 />
//                 {errors.title && (
//                   <p className="text-xs text-red-500">{errors.title.message}</p>
//                 )}
//               </div>

//               {/* Category */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })}
//                   className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                 >
//                   <option value="">Select Category</option>
//                   {categories?.map((cat, index) => {
//                     const uniqueKey = cat._id || cat.id || `cat-${index}`;
//                     return (
//                       <option key={uniqueKey} value={cat._id || cat.id}>
//                         {cat.name}
//                       </option>
//                     );
//                   })}
//                 </select>
//                 {errors.category && (
//                   <p className="text-xs text-red-500">{errors.category.message}</p>
//                 )}
//               </div>

//               {/* Image Field (Optional) */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Upload Image (Optional)</label>
//                 <div className="flex items-center gap-3">
//                   <input
//                     id="image-input"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
//                   />
//                   {imagePreview && (
//                     <div className="relative flex-shrink-0 group">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="w-12 h-12 object-cover rounded-lg border-2 border-green-200"
//                       />
//                       <button
//                         type="button"
//                         onClick={removeImage}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition shadow-md opacity-0 group-hover:opacity-100"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-400">
//                   JPG, PNG, GIF, WEBP (Max 5MB)
//                 </p>
//               </div>

//               {/* Description */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Idea Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   {...register("description", { required: "বিস্তারিত লিখুন" })}
//                   rows={4}
//                   placeholder="Write details..."
//                   className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                 />
//                 {errors.description && (
//                   <p className="text-xs text-red-500">{errors.description.message}</p>
//                 )}
//               </div>

//               {/* Problem Statement (Optional) */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Problem Statement (Optional)
//                 </label>
//                 <textarea
//                   {...register("problemStatement")}
//                   rows={2}
//                   placeholder="What problem does your idea solve?"
//                   className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                 />
//               </div>

//               {/* Proposed Solution (Optional) */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">
//                   Proposed Solution (Optional)
//                 </label>
//                 <textarea
//                   {...register("proposedSolution")}
//                   rows={2}
//                   placeholder="How does your idea solve the problem?"
//                   className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-green-600 text-white h-10 px-4 w-full rounded-md text-sm font-medium shadow hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Lightbulb className="h-4 w-4" />
//                     Submit Idea
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* My Submitted Ideas */}
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-sm">📋 My Submitted Ideas</h3>
//               <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
//                 Total: {ideas.length}
//               </span>
//             </div>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
//               {ideas.length === 0 ? (
//                 <div className="text-center py-8">
//                   <Lightbulb className="h-8 w-8 text-gray-300 mx-auto mb-2" />
//                   <p className="text-sm text-gray-500">
//                     আপনার কোনো সাবমিট করা আইডিয়া নেই।
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     উপরের ফর্ম ব্যবহার করে প্রথম আইডিয়া সাবমিট করুন! 🚀
//                   </p>
//                 </div>
//               ) : (
//                 ideas.map((idea, index) => (
//                   <div
//                     key={idea._id || idea.id || `idea-${index}`}
//                     className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg text-sm bg-white hover:bg-gray-50 transition gap-2"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-800 truncate">
//                         {idea.title}
//                       </p>
//                       <div className="flex items-center gap-2 mt-1 flex-wrap">
//                         <p className="text-xs text-gray-400 capitalize">
//                           📂 {typeof idea.category === 'object' && idea.category ? (idea.category as any).name : idea.category}
//                         </p>
//                         {idea.createdAt && (
//                           <p className="text-xs text-gray-400">
//                             📅 {new Date(idea.createdAt).toLocaleDateString()}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     {getStatusBadge(idea.status)}
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="space-y-6">
//           <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
//             <h3 className="font-semibold text-sm text-green-600 mb-2">
//               🌱 My Eco-Impact
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
//                 <span className="text-xs text-gray-600">Total Votes</span>
//                 <span className="text-lg font-bold text-green-600">
//                   {stats?.totalVotes || 0}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
//                 <span className="text-xs text-gray-600">Total Ideas</span>
//                 <span className="text-lg font-bold text-indigo-600">
//                   {stats?.totalIdeas || 0}
//                 </span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-400 mt-3 text-center">
//               🎉 Keep sharing your green ideas!
//             </p>
//           </div>

//           {/* Tips Card */}
//           <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//             <h3 className="font-semibold text-sm text-amber-600 mb-2">
//               💡 Pro Tips
//             </h3>
//             <ul className="text-xs text-gray-500 space-y-2">
//               <li className="flex items-start gap-2">
//                 <span className="text-green-500">✓</span>
//                 Be specific about your idea
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-green-500">✓</span>
//                 Add images to make it more attractive
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-green-500">✓</span>
//                 Explain the environmental impact
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import * as React from "react";
// import { Lightbulb, Clock, Vote } from "lucide-react";
// import CreateIdeaForm from "../idea/IdeaCreateForm";
// // import CreateIdeaForm from "./CreateIdeaForm"; // 🎯 নতুন ফর্ম কম্পোনেন্টটি ইমপোর্ট করুন

// // ... (Interface গুলো আগের মতোই থাকবে)
// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
//   problemStatement?: string;
//   proposedSolution?: string;
//   image?: FileList;
// }
// interface IdeaItem extends IdeaFormInput {
//   id?: string;
//   _id?: string;
//   author: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   createdAt?: string;
//   images?: string[];
// }
// interface CategoryItem { _id: string; id?: string; name: string; slug?: string; }
// interface MemberStats { totalIdeas: number; totalVotes: number; }
// interface MemberDashboardClientProps { initialStats: MemberStats | null; initialIdeas: IdeaItem[]; categories: CategoryItem[]; }

// export default function MemberDashboardClient({
//   initialStats,
//   initialIdeas,
//   categories,
// }: MemberDashboardClientProps) {
//   const [stats] = React.useState<MemberStats | null>(initialStats);
//   const [ideas, setIdeas] = React.useState<IdeaItem[]>(initialIdeas || []);

//   // 🎯 নতুন আইডিয়া তৈরি হলে মেইন লিস্টের স্টেটে পুশ করার জন্য হ্যান্ডলার
//   const handleIdeaCreated = (newIdea: IdeaItem) => {
//     setIdeas([newIdea, ...ideas]);
//   };

//   const getStatusBadge = (status: string) => {
//     const statusConfig = {
//       APPROVED: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: null },
//       REJECTED: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: null },
//       PENDING: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: <Clock className="h-3 w-3 animate-pulse" /> },
//     };
//     const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
//     return (
//       <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 font-medium ${config.bg} ${config.text} ${config.border}`}>
//         {config.icon} {status}
//       </span>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">My Total Ideas</span>
//               <p className="text-2xl font-bold mt-1 text-slate-800">{stats.totalIdeas || 0}</p>
//             </div>
//             <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Lightbulb className="h-5 w-5" /></div>
//           </div>
//           <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">Votes Received</span>
//               <p className="text-2xl font-bold mt-1 text-sky-600">{stats.totalVotes || 0}</p>
//             </div>
//             <div className="p-3 bg-sky-50 rounded-lg text-sky-600"><Vote className="h-5 w-5" /></div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* 🎯 ম্যাজিক: ওল্ড ফর্মের ৩০০০ লাইনের কোড বাদ দিয়ে এক লাইনে নতুন ফ্লেক্সিবল কম্পোনেন্ট */}
//           <CreateIdeaForm categories={categories} onIdeaCreated={handleIdeaCreated} />

//           {/* My Submitted Ideas List */}
//           <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-sm">📋 My Submitted Ideas</h3>
//               <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Total: {ideas.length}</span>
//             </div>
//             <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
//               {ideas.length === 0 ? (
//                 <div className="text-center py-8">
//                   <Lightbulb className="h-8 w-8 text-gray-300 mx-auto mb-2" />
//                   <p className="text-sm text-gray-500">আপনার কোনো সাবমিট করা আইডিয়া নেই।</p>
//                 </div>
//               ) : (
//                 ideas.map((idea, index) => (
//                   <div key={idea._id || idea.id || `idea-${index}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg text-sm bg-white hover:bg-gray-50 transition gap-2">
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-800 truncate">{idea.title}</p>
//                       <div className="flex items-center gap-2 mt-1 flex-wrap">
//                         <p className="text-xs text-gray-400 capitalize">
//                           📂 {typeof idea.category === 'object' && idea.category ? (idea.category as any).name : idea.category}
//                         </p>
//                         {idea.createdAt && <p className="text-xs text-gray-400">📅 {new Date(idea.createdAt).toLocaleDateString()}</p>}
//                       </div>
//                     </div>
//                     {getStatusBadge(idea.status)}
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar (Tips & Impacts) */}
//         <div className="space-y-6">
//           <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//             <h3 className="font-semibold text-sm text-green-600 mb-2">🌱 My Eco-Impact</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
//                 <span className="text-xs text-gray-600">Total Votes</span>
//                 <span className="text-lg font-bold text-green-600">{stats?.totalVotes || 0}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Lightbulb, Loader2, Clock, Vote, X, PlusCircle, History, ChevronLeft, ChevronRight } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
//   problemStatement?: string;
//   proposedSolution?: string;
//   image?: FileList;
// }

// interface IdeaItem extends IdeaFormInput {
//   id?: string;
//   _id?: string;
//   author: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   createdAt?: string;
//   images?: string[];
//   votesCount?: number; // ভোট সংখ্যার জন্য
// }

// interface CategoryItem {
//   _id: string;
//   id?: string;
//   name: string;
//   slug?: string;
// }

// interface MemberStats {
//   totalIdeas: number;
//   totalVotes: number;
// }

// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: CategoryItem[];
// }

// export default function MemberDashboardClient({
//   initialStats,
//   initialIdeas,
//   categories,
// }: MemberDashboardClientProps) {
//   // 🔄 একটিভ ট্যাব স্টেট (ডিফল্টভাবে 'create' থাকবে)
//   const [activeTab, setActiveTab] = React.useState<"create" | "history">("create");
  
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);
//   const [stats] = React.useState<MemberStats | null>(initialStats);
//   const [ideas, setIdeas] = React.useState<IdeaItem[]>(initialIdeas || []);
//   const [imagePreview, setImagePreview] = React.useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

//   // 📄 পেজিনেটর স্টেট (0000 layout.jpg এর চাহিদা অনুযায়ী)
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const itemsPerPage = 5; // প্রতি পেজে কয়টি করে রো দেখাবে

//   const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IdeaFormInput>();

//   const resetForm = () => {
//     reset();
//     setImagePreview(null);
//     setSelectedFile(null);
//     setMessage(null);
//   };

//   const onSubmitIdea = async (data: IdeaFormInput) => {
//     setIsSubmitting(true);
//     setMessage(null);

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", data.description);
//       formData.append("categoryId", data.category);
//       formData.append("problemStatement", data.problemStatement || "");
//       formData.append("proposedSolution", data.proposedSolution || "");
//       formData.append("paymentStatus", "FREE");
//       formData.append("price", "0");

//       if (selectedFile) {
//         formData.append("image", selectedFile);
//       }

//       const response = await createIdea(formData);

//       if (response && response.success) {
//         const savedIdea: IdeaItem = response.data;
//         setIdeas([savedIdea, ...ideas]);
//         setMessage({ type: "success", text: "🎉 আইডিয়াটি সফলভাবে সেভ হয়েছে!" });
//         resetForm();
//         // সফলভাবে সাবমিট হলে অটোমেটিক হিস্ট্রি ট্যাবে নিয়ে যাওয়ার জন্য নিচের লাইনটি আনকমেন্ট করতে পারেন
//         // setActiveTab("history");
//       } else {
//         setMessage({ type: "error", text: response.message || "আইডিয়া সেভ করতে সমস্যা হয়েছে।" });
//       }
//     } catch (err: any) {
//       setMessage({ type: "error", text: err.message || "কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setMessage({ type: "error", text: "Image size must be less than 5MB" });
//         return;
//       }
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setSelectedFile(null);
//     setValue("image", undefined);
//   };

//   // 🔢 পেজিনেশন ক্যালকুলেশন
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentIdeas = ideas.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(ideas.length / itemsPerPage);

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-4">
//       {/* 📊 Stats Cards */}
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//           <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">My Total Ideas</span>
//               <p className="text-2xl font-bold mt-1 text-slate-800">{stats.totalIdeas || 0}</p>
//             </div>
//             <div className="p-3 bg-green-50 rounded-lg text-green-600"><Lightbulb className="h-5 w-5" /></div>
//           </div>
//           <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between">
//             <div>
//               <span className="text-xs text-gray-400 font-medium uppercase">Votes Received</span>
//               <p className="text-2xl font-bold mt-1 text-sky-600">{stats.totalVotes || 0}</p>
//             </div>
//             <div className="p-3 bg-sky-50 rounded-lg text-sky-600"><Vote className="h-5 w-5" /></div>
//           </div>
//         </div>
//       )}

//       {/* 🎯 তালি বাটন সিস্টেম / Navigation Tabs */}
//       <div className="flex border-b border-gray-200 gap-2">
//         <button
//           onClick={() => { setActiveTab("create"); setMessage(null); }}
//           className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
//             activeTab === "create"
//               ? "border-green-600 text-green-600 bg-green-50/30"
//               : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
//           }`}
//         >
//           <PlusCircle className="h-4 w-4" />
//           Create Idea
//         </button>
//         <button
//           onClick={() => setActiveTab("history")}
//           className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
//             activeTab === "history"
//               ? "border-green-600 text-green-600 bg-green-50/30"
//               : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
//           }`}
//         >
//           <History className="h-4 w-4" />
//           Idea History
//         </button>
//       </div>

//       {/* 💻 কন্টেন্ট সেকশন টগল */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
//         {/* 📝 ট্যাব ১: Create Idea Form */}
//         {activeTab === "create" && (
//           <div>
//             <div className="p-6 border-b border-gray-100 bg-gray-50/50">
//               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
//               </h3>
//               <p className="text-xs text-gray-500 mt-1">সবুজ পৃথিবী গড়তে আপনার মূল্যবান আইডিয়াটি ড্রপ করুন।</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4 max-w-3xl">
//               {message && (
//                 <div className={`p-3 rounded text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
//                   {message.text}
//                 </div>
//               )}

//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-gray-700">Idea Title <span className="text-red-500">*</span></label>
//                 <input {...register("title", { required: "টাইটেল দেওয়া আবশ্যক" })} type="text" placeholder="Enter idea title..." className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//                 {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></label>
//                 <select {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })} className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
//                   <option value="">Select Category</option>
//                   {categories?.map((cat, index) => (
//                     <option key={cat._id || cat.id || index} value={cat._id || cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-gray-700">Upload Image (Optional)</label>
//                 <div className="flex items-center gap-3">
//                   <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} className="flex h-10 w-full text-sm border rounded-md file:bg-gray-100 file:border-0 file:h-full file:px-4" />
//                   {imagePreview && (
//                     <div className="relative group">
//                       <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-md border" />
//                       <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X className="h-3 w-3" /></button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-gray-700">Idea Description <span className="text-red-500">*</span></label>
//                 <textarea {...register("description", { required: "বিস্তারিত লিখুন" })} rows={4} placeholder="Describe your eco-friendly idea..." className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//                 {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//               </div>

//               <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white h-10 px-4 w-full sm:w-auto sm:min-w-[150px] rounded-md text-sm font-medium shadow hover:bg-green-700 transition flex items-center justify-center">
//                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Idea"}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* 📊 ট্যাব ২: Idea History (আপনার ড্রয়িং ইমেজ অনুযায়ী টেবিল ফরম্যাট) */}
//         {activeTab === "history" && (
//           <div>
//             <div className="p-6 border-b border-gray-100 bg-gray-50/50">
//               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 <History className="h-5 w-5 text-indigo-600" /> Idea History
//               </h3>
//               <p className="text-xs text-gray-500 mt-1">আপনার সাবমিট করা সব আইডিয়া এবং সেগুলোর বর্তমান অবস্থা এখানে দেখুন।</p>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold border-b border-gray-200">
//                     <th className="px-6 py-4">Title</th>
//                     <th className="px-6 py-4">Tag / Category</th>
//                     <th className="px-6 py-4">Votes</th>
//                     <th className="px-6 py-4 text-right">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
//                   {ideas.length === 0 ? (
//                     <tr>
//                       <td colSpan={4} className="text-center py-8 text-gray-400 font-medium">
//                         কোনো আইডিয়ার ইতিহাস পাওয়া যায়নি।
//                       </td>
//                     </tr>
//                   ) : (
//                     currentIdeas.map((idea, index) => (
//                       <tr key={idea._id || idea.id || index} className="hover:bg-slate-50/80 transition-colors">
//                         <td className="px-6 py-4 font-semibold text-gray-800">{idea.title}</td>
//                         <td className="px-6 py-4">
//                           <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
//                             {idea.category || "General"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 font-medium text-slate-600">{idea.votesCount || 0}</td>
//                         <td className="px-6 py-4 text-right">
//                           <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border ${
//                             idea.status === "APPROVED" 
//                               ? "bg-green-50 text-green-700 border-green-200" 
//                               : idea.status === "REJECTED" 
//                               ? "bg-red-50 text-red-700 border-red-200" 
//                               : "bg-amber-50 text-amber-700 border-amber-200"
//                           }`}>
//                             {idea.status === "PENDING" && <Clock className="h-3 w-3 animate-pulse" />}
//                             {idea.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* 📄 পেজিনেশন ফুটার (0000 layout.jpg এর নিখুঁত প্রতিফলন) */}
//             {ideas.length > 0 && (
//               <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
//                 <div>
//                   Showing <span className="font-semibold text-gray-700">{indexOfFirstItem + 1}</span> to{" "}
//                   <span className="font-semibold text-gray-700">{Math.min(indexOfLastItem, ideas.length)}</span> of{" "}
//                   <span className="font-semibold text-gray-700">{ideas.length}</span> results
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="font-medium text-gray-600">
//                     Page <span className="font-bold text-gray-800">{currentPage}</span> of {totalPages || 1}
//                   </span>
//                   <div className="flex items-center gap-1">
//                     <button
//                       onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="p-1.5 rounded-md border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition"
//                     >
//                       <ChevronLeft className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className="p-1.5 rounded-md border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition"
//                     >
//                       <ChevronRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client";

// import React, { useState } from "react";
// import { PlusCircle, History } from "lucide-react";

// // আপনার প্রজেক্টের পাথ অনুযায়ী ইমপোর্টগুলো ঠিক করে নিন
// import CreateIdeaForm from "../idea/IdeaCreateForm";
// import { IdeaTable } from "@/components/dasboard/IdeaTable";
// import { Pagination } from "@/components/dasboard/Pagination";

// // প্রয়োজনীয় ইন্টারফেসগুলো এখানে ডিফাইন করুন (অথবা অন্য ফাইল থেকে ইমপোর্ট করুন)
// interface IdeaItem {
//   _id?: string;
//   id?: string;
//   title: string;
//   description: string;
//   category: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   votesCount?: number;
// }

// interface MemberStats {
//   totalIdeas: number;
//   totalVotes: number;
// }

// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: any[];
// }

// export default function MemberDashboardClient({
//   initialStats,
//   initialIdeas,
//   categories,
// }: MemberDashboardClientProps) {
  
//   const [activeTab, setActiveTab] = useState<"create" | "history">("create");
//   const [ideas] = useState<IdeaItem[]>(initialIdeas || []);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const itemsPerPage = 5;

//   // 🔢 ক্যালকুলেশন
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentIdeas = ideas.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(ideas.length / itemsPerPage);

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-4">
      
//       {/* 🎯 Navigation Tabs */}
//       <div className="flex border-b border-gray-200 gap-2">
//         <button 
//           onClick={() => setActiveTab("create")} 
//           className={`flex items-center gap-2 px-5 py-3 border-b-2 ${activeTab === 'create' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
//         >
//           <PlusCircle className="h-4 w-4" /> Create Idea
//         </button>
//         <button 
//           onClick={() => setActiveTab("history")} 
//           className={`flex items-center gap-2 px-5 py-3 border-b-2 ${activeTab === 'history' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
//         >
//           <History className="h-4 w-4" /> Idea History
//         </button>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
//         {/* 📝 ট্যাব ১ */}
//         {activeTab === "create" && (
//            <CreateIdeaForm categories={categories} />
//         )}

//         {/* 📊 ট্যাব ২ */}
//         {activeTab === "history" && (
//           <div>
//             <div className="p-6 border-b border-gray-100 bg-gray-50/50">
//               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 <History className="h-5 w-5 text-indigo-600" /> Idea History
//               </h3>
//             </div>
            
//             {/* Table Component */}
//             <IdeaTable ideas={currentIdeas} />
            
//             {/* Pagination Component */}
//             {ideas.length > 0 && (
//               <Pagination 
//                 currentPage={currentPage} 
//                 totalPages={totalPages} 
//                 onPageChange={setCurrentPage}
//                 start={indexOfFirstItem + 1}
//                 end={Math.min(indexOfLastItem, ideas.length)}
//                 total={ideas.length}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useState } from "react";
// import { PlusCircle, History } from "lucide-react";
// import { IdeaTable } from "@/components/dasboard/IdeaTable";
// import { Pagination } from "@/components/dasboard/Pagination";

// // ইমপোর্ট নিশ্চিত করুন
// import CreateIdeaForm from "../idea/IdeaCreateForm";

// interface IdeaItem {
//   _id?: string;
//   id?: string;
//   title: string;
//   description: string;
//   category: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   votesCount?: number;
// }

// interface MemberStats {
//   totalIdeas: number;
//   totalVotes: number;
// }

// // ক্যাটাগরির জন্য সঠিক ইন্টারফেস তৈরি করুন
// interface Category {
//   _id: string;
//   name: string;
//   // যদি আপনার ডাটাবেসে অন্য কোনো ফিল্ড থাকে, তা এখানে যোগ করুন
// }

// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: any[];
// }

// export default function MemberDashboardClient({
//   initialStats,
//   initialIdeas,
//   categories,
// }: MemberDashboardClientProps) {
  
//   const [activeTab, setActiveTab] = useState<"create" | "history">("create");
//   const [ideas] = useState<IdeaItem[]>(initialIdeas || []);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const itemsPerPage = 5;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentIdeas = ideas.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(ideas.length / itemsPerPage);

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-4">
//       <div className="flex border-b border-gray-200 gap-2">
//         <button 
//           onClick={() => setActiveTab("create")} 
//           className={`px-5 py-3 border-b-2 ${activeTab === 'create' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
//         >
//           <PlusCircle className="inline h-4 w-4 mr-2" /> Create Idea
//         </button>
//         <button 
//           onClick={() => setActiveTab("history")} 
//           className={`px-5 py-3 border-b-2 ${activeTab === 'history' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
//         >
//           <History className="inline h-4 w-4 mr-2" /> Idea History
//         </button>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//         {activeTab === "create" ? (
//           <CreateIdeaForm categories={categories } />
//         ) : (
//           <div>
//             <IdeaTable ideas={currentIdeas} />
//             {ideas.length > 0 && (
//               <Pagination 
//                 currentPage={currentPage} 
//                 totalPages={totalPages} 
//                 onPageChange={setCurrentPage}
//                 start={indexOfFirstItem + 1}
//                 end={Math.min(indexOfLastItem, ideas.length)}
//                 total={ideas.length}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import { 
  PlusCircle, 
  History, 
  Lightbulb, 
  ThumbsUp, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";
// import { IdeaTable } from "@/components/dasboard/IdeaTable";
import { Pagination } from "@/components/dasboard/Pagination";
import CreateIdeaForm from "../idea/IdeaCreateForm";
import IdeaTable from "@/components/dasboard/IdeaTable";

interface IdeaItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  votesCount?: number;
}

interface MemberStats {
  totalIdeas: number;
  totalVotes: number;
  approvedIdeas?: number;
  pendingIdeas?: number;
}

interface Category {
  _id: string;
  name: string;
}

interface MemberDashboardClientProps {
  initialStats: MemberStats | null;
  initialIdeas: IdeaItem[];
  categories: any[];
}

// ✅ StatCard কম্পোনেন্টটি বাইরে ডিক্লেয়ার করুন (MemberDashboardClient এর বাইরে)
const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
  </div>
);

export default function MemberDashboardClient({
  initialStats,
  initialIdeas,
  categories,
}: MemberDashboardClientProps) {
  
  const [activeTab, setActiveTab] = useState<"create" | "history">("create");
  const [ideas, setIdeas] = useState<IdeaItem[]>(initialIdeas || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIdeas = ideas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ideas.length / itemsPerPage);

  // স্ট্যাটিস্টিক্স ক্যালকুলেশন
  const stats = {
    total: ideas.length,
    pending: ideas.filter(i => i.status === "PENDING").length,
    approved: ideas.filter(i => i.status === "APPROVED").length,
    rejected: ideas.filter(i => i.status === "REJECTED").length,
    totalVotes: ideas.reduce((sum, i) => sum + (i.votesCount || 0), 0),
  };

  const handleIdeaCreated = (newIdea: any) => {
    if (newIdea) {
      setIdeas(prev => [newIdea, ...prev]);
      setSuccessMessage("🎉 Your idea has been submitted successfully!");
      setTimeout(() => setSuccessMessage(null), 5000);
    }
    setActiveTab("history");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      
      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-green-600" />
            Member Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Share your green ideas and help make the world a better place! 🌱
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>Total Ideas: <strong className="text-gray-900">{stats.total}</strong></span>
        </div>
      </div>

      {/* সাকসেস মেসেজ */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* স্ট্যাটিস্টিক্স গ্রিড */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={Lightbulb} 
          label="Total Ideas" 
          value={stats.total} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Pending" 
          value={stats.pending} 
          color="bg-yellow-500" 
        />
        <StatCard 
          icon={CheckCircle} 
          label="Approved" 
          value={stats.approved} 
          color="bg-green-500" 
        />
        <StatCard 
          icon={ThumbsUp} 
          label="Total Votes" 
          value={stats.totalVotes} 
          color="bg-purple-500" 
        />
      </div>

      {/* ট্যাব নেভিগেশন */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 gap-2 bg-gray-50/50 rounded-t-xl p-1">
        <button 
          onClick={() => setActiveTab("create")} 
          className={`
            flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
            flex items-center justify-center gap-2
            ${activeTab === 'create' 
              ? 'bg-green-600 text-white shadow-md shadow-green-200' 
              : 'text-gray-600 hover:bg-gray-200/50'
            }
          `}
        >
          <PlusCircle className={`h-4 w-4 ${activeTab === 'create' ? 'text-white' : 'text-gray-500'}`} /> 
          Create Idea
        </button>
        <button 
          onClick={() => setActiveTab("history")} 
          className={`
            flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
            flex items-center justify-center gap-2
            ${activeTab === 'history' 
              ? 'bg-green-600 text-white shadow-md shadow-green-200' 
              : 'text-gray-600 hover:bg-gray-200/50'
            }
          `}
        >
          <History className={`h-4 w-4 ${activeTab === 'history' ? 'text-white' : 'text-gray-500'}`} /> 
          Idea History
          {ideas.length > 0 && (
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              {ideas.length}
            </span>
          )}
        </button>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {activeTab === "create" ? (
          <div className="p-4 md:p-6">
            <CreateIdeaForm 
              categories={categories} 
              onIdeaCreated={handleIdeaCreated}
            />
          </div>
        ) : (
          <div className="p-4 md:p-6">
            {ideas.length === 0 ? (
              <div className="text-center py-12">
                <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">No ideas yet</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Start by creating your first green idea! 🌱
                </p>
                <button 
                  onClick={() => setActiveTab("create")}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-1 mx-auto"
                >
                  Create an idea <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <IdeaTable ideas={currentIdeas} />
                {ideas.length > itemsPerPage && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={setCurrentPage}
                      start={indexOfFirstItem + 1}
                      end={Math.min(indexOfLastItem, ideas.length)}
                      total={ideas.length}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}