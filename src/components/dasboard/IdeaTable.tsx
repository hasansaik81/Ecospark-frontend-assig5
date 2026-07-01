// import { Clock } from "lucide-react";

// export const IdeaTable = ({ ideas }: { ideas: any[] }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full text-left border-collapse">
//       <thead>
//         <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold border-b border-gray-200">
//           <th className="px-6 py-4">Title</th>
//           <th className="px-6 py-4">Tag / Category</th>
//           <th className="px-6 py-4">Votes</th>
//           <th className="px-6 py-4 text-right">Status</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
//         {ideas.length === 0 ? (
//           <tr>
//             <td colSpan={4} className="text-center py-8 text-gray-400 font-medium">কোনো আইডিয়ার ইতিহাস পাওয়া যায়নি।</td>
//           </tr>
//         ) : (
//           ideas.map((idea, index) => (
//             <tr key={idea._id || idea.id || index} className="hover:bg-slate-50/80 transition-colors">
//               <td className="px-6 py-4 font-semibold text-gray-800">{idea.title}</td>
//               <td className="px-6 py-4">
//                 <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
//                   {idea.category || "General"}
//                 </span>
//               </td>
//               <td className="px-6 py-4 font-medium text-slate-600">{idea.votesCount || 0}</td>
//               <td className="px-6 py-4 text-right">
//                 <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md border ${
//                   idea.status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" : 
//                   idea.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" : 
//                   "bg-amber-50 text-amber-700 border-amber-200"
//                 }`}>
//                   {idea.status === "PENDING" && <Clock className="h-3 w-3 animate-pulse" />}
//                   {idea.status}
//                 </span>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// );


// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";


// import { BlogPost } from "@/types";

// import { Calendar, Eye, MessageSquare } from "lucide-react";

// export default function EcoSparkHistoryTable({ posts }: { posts: BlogPost[] }) {
//   return (
//     <div className="border rounded-xl shadow-sm bg-white overflow-hidden">
//       <Table>
//         <TableHeader className="bg-slate-50">
//           <TableRow>
//             <TableHead>Idea / Post Title</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Metrics</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {posts.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center py-10 text-slate-500 italic">
//                 No green ideas posted yet. Start your journey! 🌱
//               </TableCell>
//             </TableRow>
//           ) : (
//             posts.map((post) => (
//               <TableRow key={post.id} className="hover:bg-green-50/30 transition-colors">
//                 <TableCell>
//                   <div className="max-w-[300px]">
//                     <p className="font-semibold text-slate-800">{post.title}</p>
//                     <p className="text-xs text-slate-500 truncate">{post.content}</p>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex flex-wrap gap-1">
//                     {post.tags?.map((tag, index) => (
//                       <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-slate-600 flex items-center gap-1 text-sm">
//                   <Calendar className="w-3 h-3" />
//                   {new Date(post.createdAt || Date.now()).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex items-center justify-end gap-3 text-slate-600">
//                     <span className="flex items-center gap-1 text-sm"><Eye className="w-4 h-4 text-slate-400" /> {post.views}</span>
//                     <span className="flex items-center gap-1 text-sm"><MessageSquare className="w-4 h-4 text-slate-400" /> {post._count?.comments ?? 0}</span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }





// // EcoSparkHistoryTable.tsx
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Calendar, Eye, MessageSquare } from "lucide-react";

// // ✅ IdeaItem ইন্টারফেস
// interface IdeaItem {
//   _id?: string;
//   id?: string;
//   title: string;
//   description: string;
//   category: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   votesCount?: number;
//   createdAt?: string;
//   views?: number;
//   comments?: any[];
// }

// export default function IdeaTable({ ideas }: { ideas: IdeaItem[] }) {
//   return (
//     <div className="border rounded-xl shadow-sm bg-white overflow-hidden">
//       <Table>
//         <TableHeader className="bg-slate-50">
//           <TableRow>
//             <TableHead>Idea / Post Title</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Metrics</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {ideas.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center py-10 text-slate-500 italic">
//                 No green ideas posted yet. Start your journey! 🌱
//               </TableCell>
//             </TableRow>
//           ) : (
//             ideas.map((idea) => (
//               <TableRow key={idea._id || idea.id} className="hover:bg-green-50/30 transition-colors">
//                 <TableCell>
//                   <div className="max-w-[300px]">
//                     <p className="font-semibold text-slate-800">{idea.title}</p>
//                     <p className="text-xs text-slate-500 truncate">{idea.description}</p>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
//                     {idea.category}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-slate-600 flex items-center gap-1 text-sm">
//                   <Calendar className="w-3 h-3" />
//                   {/* ✅ শুধু createdAt থাকলেই দেখান */}
//                   {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString() : '—'}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex items-center justify-end gap-3 text-slate-600">
//                     <span className="flex items-center gap-1 text-sm">
//                       <Eye className="w-4 h-4 text-slate-400" /> 
//                       {idea.views || 0}
//                     </span>
//                     <span className="flex items-center gap-1 text-sm">
//                       <MessageSquare className="w-4 h-4 text-slate-400" /> 
//                       {idea.comments?.length || 0}
//                     </span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }




// src/components/dasboard/IdeaTable.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Eye, MessageSquare } from "lucide-react";

// ✅ IdeaItem ইন্টারফেস
export interface IdeaItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category: string | { id?: string; name?: string; description?: string; createdAt?: string; updatedAt?: string };
  status: "PENDING" | "APPROVED" | "REJECTED";
  votesCount?: number;
  createdAt?: string;
  views?: number;
  comments?: any[];
}

function getCategoryLabel(category: IdeaItem["category"]) {
  if (typeof category === "string") return category;

  if (category && typeof category === "object" && typeof category.name === "string") {
    return category.name;
  }

  return "General";
}

export default function IdeaTable({ ideas }: { ideas: IdeaItem[] }) {
  return (
    <div className="border rounded-xl shadow-sm bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Idea / Post Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Metrics</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-slate-500 italic">
                No green ideas posted yet. Start your journey! 🌱
              </TableCell>
            </TableRow>
          ) : (
            ideas.map((idea) => (
              <TableRow key={idea._id || idea.id} className="hover:bg-green-50/30 transition-colors">
                <TableCell>
                  <div className="max-w-[300px]">
                    <p className="font-semibold text-slate-800">{idea.title}</p>
                    <p className="text-xs text-slate-500 truncate">{idea.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                    {getCategoryLabel(idea.category)}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 flex items-center gap-1 text-sm">
                  <Calendar className="w-3 h-3" />
                  {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString() : '—'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3 text-slate-600">
                    <span className="flex items-center gap-1 text-sm">
                      <Eye className="w-4 h-4 text-slate-400" /> 
                      {idea.views || 0}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <MessageSquare className="w-4 h-4 text-slate-400" /> 
                      {idea.comments?.length || 0}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}