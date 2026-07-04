




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
//   problemStatement: string;
//   proposedSolution: string;
//   image?: string;
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

//   const imageUrlWatch = watch("image");

//   const onSubmitIdea = async (data: IdeaFormInput) => {
//     setIsSubmitting(true);
//     setMessage(null);

//     try {
//       const payload = {
//         title: data.title.trim(),
//         description: data.description.trim(),
//         categoryId: data.category,
//         problemStatement: data.problemStatement?.trim() || "",
//         proposedSolution: data.proposedSolution?.trim() || "",
//         image: data.image?.trim() || "",
//         paymentStatus: "FREE",
//         price: "0",
//       };

//       const response = await createIdea(payload);

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
//     <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow">
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
//           <label className="text-sm font-medium text-gray-700">Idea Title <span className="text-red-500">*</span></label>
//           <input {...register("title", { required: "Title is required" })} type="text" placeholder="Enter title..." className="flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white" />
//           {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
//         </div>

//         {/* Category (Fixed Dropdown) */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
//           {/* 🎯 cursor-pointer এবং text-gray-950 নিশ্চিত করা হয়েছে যাতে ড্রপডাউনটি ক্লিকের রেসপন্স পায় ও টেক্সট স্পষ্ট থাকে */}
//           <select 
//             {...register("category", { required: "Category is required" })} 
//             className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 cursor-pointer shadow-sm"
//           >
//             <option value="" className="text-gray-400">Select Category</option>
//             {categories && categories.length > 0 ? (
//               categories.map((cat) => (
//                 <option 
//                   key={cat._id || cat.id} 
//                   value={cat._id || cat.id}
//                   className="text-gray-900 bg-white py-2"
//                 >
//                   {cat.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled className="text-gray-400">No categories available</option>
//             )}
//           </select>
//           {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
//         </div>

//         {/* Image URL */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-gray-700">Image URL (Optional)</label>
//           <div className="flex items-center gap-3">
//             <div className="relative flex-1">
//               <input {...register("image")} type="url" placeholder="https://example.com/image.jpg" className="flex h-9 w-full rounded-md border border-gray-300 pl-9 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white" />
//               <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//             </div>
//             {imageUrlWatch && imageUrlWatch.startsWith("http") && (
//               <img src={imageUrlWatch} alt="Preview" className="w-10 h-10 object-cover rounded border border-gray-200" />
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-gray-700">Idea Description <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("description", { required: "Description is required" })}
//             rows={3}
//             placeholder="Describe your idea in a few words"
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
//           />
//           {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
//         </div>

//         {/* Problem Statement */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-gray-700">Problem Statement <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("problemStatement", {
//               required: "Problem statement is required",
//               minLength: { value: 10, message: "Problem statement must be at least 10 characters" },
//             })}
//             rows={3}
//             placeholder="What problem does your idea address?"
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
//           />
//           {errors.problemStatement && <p className="text-xs text-red-500">{errors.problemStatement.message}</p>}
//         </div>

//         {/* Proposed Solution */}
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-gray-700">Proposed Solution <span className="text-red-500">*</span></label>
//           <textarea
//             {...register("proposedSolution", {
//               required: "Proposed solution is required",
//               minLength: { value: 10, message: "Proposed solution must be at least 10 characters" },
//             })}
//             rows={3}
//             placeholder="How will your idea solve the problem?"
//             className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
//           />
//           {errors.proposedSolution && <p className="text-xs text-red-500">{errors.proposedSolution.message}</p>}
//         </div>

//         <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white h-10 px-4 w-full rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
//           {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Idea"}
//         </button>
//       </form>
//     </div>
//   );
// }




"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Lightbulb, Loader2, Link2 } from "lucide-react";
import { createIdea } from "@/services/idea";

const ideaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  problemStatement: z.string().min(10, "Problem statement must be at least 10 characters"),
  proposedSolution: z.string().min(10, "Proposed solution must be at least 10 characters"),
  image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type IdeaFormInput = z.infer<typeof ideaSchema>;

interface CategoryItem {
  _id: string;
  id?: string;
  name: string;
}

export interface CreateIdeaFormProps {
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
    formState: { errors },
  } = useForm<IdeaFormInput>({
    resolver: zodResolver(ideaSchema),
  });

  const onSubmitIdea = async (data: IdeaFormInput) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        title: data.title.trim(),
        description: data.description.trim(),
        categoryId: data.categoryId,
        problemStatement: data.problemStatement.trim(),
        proposedSolution: data.proposedSolution.trim(),
        image: data.image?.trim() || "",
        paymentStatus: "FREE",
        price: 0,
      };

      const response = await createIdea(payload);

      if (response?.success) {
        setMessage({ type: "success", text: "Idea successfully submitted!" });
        onIdeaCreated(response.data);
        reset();
        router.refresh();
      } else {
        setMessage({ type: "error", text: response?.message || "Failed to save the idea." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Something went wrong, please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-green-600" /> Share Your Green Idea
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmitIdea)} className="p-6 space-y-4">
        {message && (
          <div className={`p-3 rounded text-sm ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            {message.text}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">Idea Title *</label>
          <input {...register("title")} className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1" />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category *</label>
          <select {...register("categoryId")} className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">Description *</label>
          <textarea {...register("description")} rows={3} className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1" />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>

        {/* Problem Statement */}
        <div>
          <label className="text-sm font-medium text-gray-700">Problem Statement *</label>
          <textarea {...register("problemStatement")} rows={3} className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1" />
          {errors.problemStatement && <p className="text-xs text-red-500">{errors.problemStatement.message}</p>}
        </div>

        {/* Proposed Solution */}
        <div>
          <label className="text-sm font-medium text-gray-700">Proposed Solution *</label>
          <textarea {...register("proposedSolution")} rows={3} className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1" />
          {errors.proposedSolution && <p className="text-xs text-red-500">{errors.proposedSolution.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="text-sm font-medium text-gray-700">Image URL</label>
          <input {...register("image")} className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1" />
          {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white p-2 rounded-md font-medium hover:bg-green-700">
          {isSubmitting ? <Loader2 className="animate-spin inline" /> : "Submit Idea"}
        </button>
      </form>
    </div>
  );
}