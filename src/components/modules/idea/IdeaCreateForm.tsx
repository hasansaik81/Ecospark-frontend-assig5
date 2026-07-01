// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { Lightbulb, Loader2, X } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
//   problemStatement?: string;
//   proposedSolution?: string;
//   image?: FileList;
// }

// interface CategoryItem {
//   _id: string;
//   id?: string;
//   name: string;
// }

// interface CreateIdeaFormProps {
//   categories: CategoryItem[];
//   onIdeaCreated: (newIdea: any) => void;
// }

// export default function CreateIdeaForm({ categories, onIdeaCreated }: CreateIdeaFormProps) {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);
//   const [imagePreview, setImagePreview] = React.useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm<IdeaFormInput>();

//   const resetForm = () => {
//     reset();
//     setImagePreview(null);
//     setSelectedFile(null);
//     setMessage(null);
//     const fileInput = document.getElementById("image-input") as HTMLInputElement;
//     if (fileInput) fileInput.value = "";
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
//         setMessage({ type: "success", text: "🎉 আইডিয়াটি সফলভাবে সেভ হয়েছে!" });
//         onIdeaCreated(response.data); // মেইন পেজের স্টেট আপডেট করার জন্য
//         resetForm();
//         router.refresh(); // ল্যান্ডিং পেজের ক্যাশ ক্লিয়ার করতে
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
//       if (!file.type.startsWith("image/")) {
//         setMessage({ type: "error", text: "Only image files are allowed" });
//         return;
//       }
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setSelectedFile(null);
//     setValue("image", undefined);
//     const fileInput = document.getElementById("image-input") as HTMLInputElement;
//     if (fileInput) fileInput.value = "";
//   };

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
//         <h3 className="font-semibold text-lg flex items-center gap-2">
//           <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
//         </h3>
//         <p className="text-sm text-gray-500">Submit your eco-friendly idea and make a difference! 🌱</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
//         {message && (
//           <div className={`p-3 rounded text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Title */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Idea Title <span className="text-red-500">*</span></label>
//           <input
//             {...register("title", { required: "টাইটেল দেওয়া আবশ্যিক" })}
//             type="text"
//             placeholder="Enter title..."
//             className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//         </div>

//         {/* Category */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
//           <select
//             {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })}
//             className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">Select Category</option>
//             {categories?.map((cat, index) => (
//               <option key={cat._id || cat.id || index} value={cat._id || cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//         </div>

//         {/* Image Upload */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Upload Image (Optional)</label>
//           <div className="flex items-center gap-3">
//             <input
//               id="image-input"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700"
//             />
//             {imagePreview && (
//               <div className="relative flex-shrink-0 group">
//                 <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border-2 border-green-200" />
//                 <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Idea Description <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("description", { required: "বিস্তারিত লিখুন" })}
//             rows={4}
//             placeholder="Write details..."
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//         </div>

//         {/* Problem & Solution (Optional) */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Problem Statement (Optional)</label>
//           <textarea {...register("problemStatement")} rows={2} placeholder="What problem does it solve?" className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium">Proposed Solution (Optional)</label>
//           <textarea {...register("proposedSolution")} rows={2} placeholder="How does it solve the problem?" className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-green-600 text-white h-10 px-4 w-full rounded-md text-sm font-medium shadow hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-70"
//         >
//           {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Lightbulb className="h-4 w-4" /> Submit Idea</>}
//         </button>
//       </form>
//     </div>
//   );
// }





// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { Lightbulb, Loader2, X } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
//   problemStatement?: string;
//   proposedSolution?: string;
//   image?: FileList;
// }

// interface CategoryItem {
//   _id: string;
//   id?: string;
//   name: string;
// }

// interface CreateIdeaFormProps {
//   categories: CategoryItem[];
//   onIdeaCreated: (newIdea: any) => void;
// }

// export default function CreateIdeaForm({ categories, onIdeaCreated }: CreateIdeaFormProps) {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);
//   const [imagePreview, setImagePreview] = React.useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm<IdeaFormInput>();

//   const resetForm = () => {
//     reset();
//     setImagePreview(null);
//     setSelectedFile(null);
//     setMessage(null);
//     const fileInput = document.getElementById("image-input") as HTMLInputElement;
//     if (fileInput) fileInput.value = "";
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

//       // ✅ ব্যাকএন্ডের মাল্টারের সাথে ম্যাচ করতে "image" কি-তে ফাইলটি পাঠানো হচ্ছে
//       if (selectedFile) {
//         formData.append("image", selectedFile);
//       }

//       const response = await createIdea(formData);

//       if (response && response.success) {
//         setMessage({ type: "success", text: "🎉アイデアটি সফলভাবে সেভ হয়েছে!" });
//         onIdeaCreated(response.data); // মেইন ড্যাশবোর্ড স্টেট আপডেট
//         resetForm();
//         router.refresh(); // ল্যান্ডিং পেজের ডাটা ইনস্ট্যান্ট আপডেট করার জন্য
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
//         e.target.value = "";
//         return;
//       }
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
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setSelectedFile(null);
//     setValue("image", undefined);
//     const fileInput = document.getElementById("image-input") as HTMLInputElement;
//     if (fileInput) fileInput.value = "";
//   };

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
//         <h3 className="font-semibold text-lg flex items-center gap-2">
//           <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
//         </h3>
//         <p className="text-sm text-gray-500">Submit your eco-friendly idea and make a difference! 🌱</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
//         {message && (
//           <div className={`p-3 rounded text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Title */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Idea Title <span className="text-red-500">*</span></label>
//           <input
//             {...register("title", { required: "টাইটেল দেওয়া আবশ্যিক" })}
//             type="text"
//             placeholder="Enter title..."
//             className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//         </div>

//         {/* Category */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
//           <select
//             {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })}
//             className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">Select Category</option>
//             {categories?.map((cat, index) => (
//               <option key={cat._id || cat.id || index} value={cat._id || cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//         </div>

//         {/* Image Upload */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Upload Image (Optional)</label>
//           <div className="flex items-center gap-3">
//             <input
//               id="image-input"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700"
//             />
//             {/* ✅ ফিক্সড প্রিভিউ কন্টেইনার এবং প্রপার লেআউট যার কারণে ক্রস সাইন ইমেজকে ভাঙবে না */}
//             {imagePreview && (
//               <div className="relative flex-shrink-0 w-12 h-12">
//                 <img 
//                   src={imagePreview} 
//                   alt="Preview" 
//                   className="w-full h-full object-cover rounded-lg border-2 border-green-200" 
//                 />
//                 <button 
//                   type="button" 
//                   onClick={removeImage} 
//                   className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-md transition-colors flex items-center justify-center z-10"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             )}
//           </div>
//           <p className="text-xs text-gray-400">JPG, PNG, GIF, WEBP (Max 5MB)</p>
//         </div>

//         {/* Description */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Idea Description <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("description", { required: "বিস্তারিত লিখুন" })}
//             rows={4}
//             placeholder="Write details..."
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//         </div>

//         {/* Problem & Solution (Optional) */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Problem Statement (Optional)</label>
//           <textarea {...register("problemStatement")} rows={2} placeholder="What problem does it solve?" className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium">Proposed Solution (Optional)</label>
//           <textarea {...register("proposedSolution")} rows={2} placeholder="How does it solve the problem?" className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-green-600 text-white h-10 px-4 w-full rounded-md text-sm font-medium shadow hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
//         >
//           {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Lightbulb className="h-4 w-4" /> Submit Idea</>}
//         </button>
//       </form>
//     </div>
//   );
// }




// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { Lightbulb, Loader2, Link2 } from "lucide-react";
// import { createIdea } from "@/services/idea";

// interface IdeaFormInput {
//   title: string;
//   description: string;
//   category: string;
//   problemStatement?: string;
//   proposedSolution?: string;
//   image?: string; // 🎯 ফাইলের বদলে এটি এখন স্ট্রিং (URL)
// }

// interface CategoryItem {
//   _id: string;
//   id?: string;
//   name: string;
// }

// interface CreateIdeaFormProps {
//   categories: CategoryItem[];
//   onIdeaCreated: (newIdea: any) => void;
// }

// export default function CreateIdeaForm({ categories, onIdeaCreated }: CreateIdeaFormProps) {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<IdeaFormInput>();

//   // 🔍 লাইভ ইমেজ প্রিভিউ দেখার জন্য URL টি ট্র্যাক করা হচ্ছে
//   const imageUrlWatch = watch("image");

// //   const onSubmitIdea = async (data: IdeaFormInput) => {
// //     setIsSubmitting(true);
// //     setMessage(null);

// //     try {
// //       // 🎯 সার্ভিস ফাইলের টাইপ (FormData) ঠিক রাখতে নতুন FormData তৈরি করছি
// //       const formData = new FormData();
      
// //       formData.append("title", data.title);
// //       formData.append("description", data.description);
// //       formData.append("categoryId", data.category);
// //       formData.append("problemStatement", data.problemStatement || "");
// //       formData.append("proposedSolution", data.proposedSolution || "");
// //       formData.append("image", data.image || ""); // এটি এখন টেক্সট URL হিসেবে যাবে
// //       formData.append("paymentStatus", "FREE");
// //       formData.append("price", "0");

// //       // ✅ এখন টাইপস্ক্রিপ্ট আর এরর দেবে না, কারণ এটি পিওর FormData অবজেক্ট
// //       const response = await createIdea(formData);

// //       if (response && response.success) {
// //         setMessage({ type: "success", text: "Idea successfully submitted!" });
// //         onIdeaCreated(response.data);
// //         reset();
// //         router.refresh();
// //       } else {
// //         setMessage({ type: "error", text: response.message || "Failed to save the idea." });
// //       }
// //     } catch (err: any) {
// //       setMessage({ type: "error", text: err.message || "Something went wrong, please try again." });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

//            const onSubmitIdea = async (data: IdeaFormInput) => {
//     setIsSubmitting(true);
//     setMessage(null);

//     try {
//       const description = data.description.trim();
//       const problemStatement = data.problemStatement?.trim() || "";
//       const proposedSolution = data.proposedSolution?.trim() || "";

//       const formData = new FormData();
//       formData.append("title", data.title.trim());
//       formData.append("description", description);
//       formData.append("categoryId", data.category);
//       formData.append("problemStatement", problemStatement);
//       formData.append("proposedSolution", proposedSolution);
//       formData.append("image", data.image || "");
//       formData.append("paymentStatus", "FREE");
//       formData.append("price", "0");

//       const response = await createIdea(formData);

//       if (response && response.success) {
//         setMessage({ type: "success", text: "Idea successfully submitted!" });
//         onIdeaCreated(response.data);
//         reset();
//         router.refresh();
//       } else {
//         setMessage({ type: "error", text: response.message || "Failed to save the idea." });
//       }
//     } catch (err: any) {
//       setMessage({ type: "error", text: err.message || "Something went wrong, please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
    
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
//         <h3 className="font-semibold text-lg flex items-center gap-2">
//           <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
//         </h3>
//         <p className="text-sm text-gray-500">Submit your eco-friendly idea using an image link! 🌱</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
//         {message && (
//           <div className={`p-3 rounded text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Title */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Idea Title <span className="text-red-500">*</span></label>
//           <input
//             {...register("title", { required: "Title is required" })}
//             type="text"
//             placeholder="Enter title..."
//             className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//         </div>

//         {/* Category */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
//           <select
//             {...register("category", { required: "Category is required" })}
//             className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">Select Category</option>
//             {categories?.map((cat, index) => (
//               <option key={cat._id || cat.id || index} value={cat._id || cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//         </div>

//         {/* 🎯 নতুন ইমেজ URL ইনপুট ফিল্ড (ফাইলের পরিবর্তে) */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Image URL (Optional)</label>
//           <div className="flex items-center gap-3">
//             <div className="relative flex-1">
//               <input
//                 {...register("image")}
//                 type="url"
//                 placeholder="https://example.com/image.jpg"
//                 className="flex h-9 w-full rounded-md border border-gray-300 pl-9 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//             </div>
            
//             {/* লাইভ প্রিভিউ: ইউজার ইউআরএল পেস্ট করলেই ইমেজ বক্স শো করবে */}
//             {imageUrlWatch && imageUrlWatch.startsWith("http") && (
//               <div className="relative flex-shrink-0 w-12 h-12">
//                 <img 
//                   src={imageUrlWatch} 
//                   alt="Live Preview" 
//                   className="w-full h-full object-cover rounded-lg border-2 border-green-200"
//                   onError={(e) => {
//                     (e.target as HTMLElement).style.display = 'none';
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <p className="text-xs text-gray-400">Provide a direct web link to your image.</p>
//         </div>

//         {/* Description */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Idea Description <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("description", {
//               required: "Description is required",
//               validate: (value) =>
//                 value.trim().length >= 10 || "Description must be at least 10 characters",
//             })}
//             rows={4}
//             placeholder="Write details..."
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//         </div>

//         {/* Problem & Solution */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Problem Statement <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("problemStatement", {
//               required: "Problem statement is required",
//               validate: (value) =>
//                 value.trim().length >= 10 || "Problem statement must be at least 10 characters",
//             })}
//             rows={2}
//             placeholder="What problem does it solve?"
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.problemStatement && <p className="text-xs text-red-500">{errors.problemStatement.message}</p>}
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium">Proposed Solution <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("proposedSolution", {
//               required: "Proposed solution is required",
//               validate: (value) =>
//                 value.trim().length >= 10 || "Proposed solution must be at least 10 characters",
//             })}
//             rows={2}
//             placeholder="How does it solve the problem?"
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           {errors.proposedSolution && <p className="text-xs text-red-500">{errors.proposedSolution.message}</p>}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-green-600 text-white h-10 px-4 w-full rounded-md text-sm font-medium shadow hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
//         >
//           {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Lightbulb className="h-4 w-4" /> Submit Idea</>}
//         </button>
//       </form>
//     </div>
//   );
// }







"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Lightbulb, Loader2, Link2 } from "lucide-react";
import { createIdea } from "@/services/idea";

interface IdeaFormInput {
  title: string;
  description: string;
  category: string;
  problemStatement: string;
  proposedSolution: string;
  image?: string;
}

interface CategoryItem {
  _id: string;
  id?: string;
  name: string;
}

interface CreateIdeaFormProps {
  categories: CategoryItem[];
  onIdeaCreated: (newIdea: any) => void;
}

export default function CreateIdeaForm({ categories, onIdeaCreated }: CreateIdeaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IdeaFormInput>();

  const imageUrlWatch = watch("image");

  const onSubmitIdea = async (data: IdeaFormInput) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        title: data.title.trim(),
        description: data.description.trim(),
        categoryId: data.category,
        problemStatement: data.problemStatement?.trim() || "",
        proposedSolution: data.proposedSolution?.trim() || "",
        image: data.image?.trim() || "",
        paymentStatus: "FREE",
        price: "0",
      };

      const response = await createIdea(payload);

      if (response && response.success) {
        setMessage({ type: "success", text: "Idea successfully submitted!" });
        onIdeaCreated(response.data);
        reset();
        router.refresh();
      } else {
        setMessage({ type: "error", text: response.message || "Failed to save the idea." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Something went wrong, please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
        </h3>
        <p className="text-sm text-gray-500">Submit your eco-friendly idea using an image link! 🌱</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
        {message && (
          <div className={`p-3 rounded text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Idea Title <span className="text-red-500">*</span></label>
          <input {...register("title", { required: "Title is required" })} type="text" placeholder="Enter title..." className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
          <select {...register("category", { required: "Category is required" })} className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>

        {/* Image URL */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Image URL (Optional)</label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input {...register("image")} type="url" placeholder="https://example.com/image.jpg" className="flex h-9 w-full rounded-md border border-gray-300 pl-9 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {imageUrlWatch && imageUrlWatch.startsWith("http") && (
              <img src={imageUrlWatch} alt="Preview" className="w-10 h-10 object-cover rounded border border-gray-200" />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Idea Description <span className="text-red-500">*</span></label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={3}
            placeholder="Describe your idea in a few words"
            className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>

        {/* Problem Statement */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Problem Statement <span className="text-red-500">*</span></label>
          <textarea
            {...register("problemStatement", {
              required: "Problem statement is required",
              minLength: { value: 10, message: "Problem statement must be at least 10 characters" },
            })}
            rows={3}
            placeholder="What problem does your idea address?"
            className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.problemStatement && <p className="text-xs text-red-500">{errors.problemStatement.message}</p>}
        </div>

        {/* Proposed Solution */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Proposed Solution <span className="text-red-500">*</span></label>
          <textarea
            {...register("proposedSolution", {
              required: "Proposed solution is required",
              minLength: { value: 10, message: "Proposed solution must be at least 10 characters" },
            })}
            rows={3}
            placeholder="How will your idea solve the problem?"
            className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.proposedSolution && <p className="text-xs text-red-500">{errors.proposedSolution.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white h-10 px-4 w-full rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2 transition-colors">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Idea"}
        </button>
      </form>
    </div>
  );
}