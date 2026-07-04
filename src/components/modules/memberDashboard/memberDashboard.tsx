




// "use client";

// import React, { useState } from "react";
// import { 
//   PlusCircle, 
//   History, 
//   Lightbulb, 
//   ThumbsUp, 
//   TrendingUp,
//   Sparkles,
//   ArrowRight,
//   CheckCircle
// } from "lucide-react";
// // import { IdeaTable } from "@/components/dasboard/IdeaTable";
// import { Pagination } from "@/components/dasboard/Pagination";
// import CreateIdeaForm from "../idea/IdeaCreateForm";
// import IdeaTable from "@/components/dasboard/IdeaTable";

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
//   approvedIdeas?: number;
//   pendingIdeas?: number;
// }

// interface Category {
//   _id: string;
//   name: string;
// }

// interface MemberDashboardClientProps {
//   initialStats: MemberStats | null;
//   initialIdeas: IdeaItem[];
//   categories: any[];
// }

// // ✅ StatCard কম্পোনেন্টটি বাইরে ডিক্লেয়ার করুন (MemberDashboardClient এর বাইরে)
// const StatCard = ({ icon: Icon, label, value, color }: any) => (
//   <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm text-gray-500 font-medium">{label}</p>
//         <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//       </div>
//       <div className={`p-3 rounded-full ${color}`}>
//         <Icon className="h-5 w-5 text-white" />
//       </div>
//     </div>
//   </div>
// );

// export default function MemberDashboardClient({
//   initialStats,
//   initialIdeas,
//   categories,
// }: MemberDashboardClientProps) {
  
//   const [activeTab, setActiveTab] = useState<"create" | "history">("create");
//   const [ideas, setIdeas] = useState<IdeaItem[]>(initialIdeas || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
//   const itemsPerPage = 5;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentIdeas = ideas.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(ideas.length / itemsPerPage);

//   // স্ট্যাটিস্টিক্স ক্যালকুলেশন
//   const stats = {
//     total: ideas.length,
//     pending: ideas.filter(i => i.status === "PENDING").length,
//     approved: ideas.filter(i => i.status === "APPROVED").length,
//     rejected: ideas.filter(i => i.status === "REJECTED").length,
//     totalVotes: ideas.reduce((sum, i) => sum + (i.votesCount || 0), 0),
//   };

//   const handleIdeaCreated = (newIdea: any) => {
//     if (newIdea) {
//       setIdeas(prev => [newIdea, ...prev]);
//       setSuccessMessage("🎉 Your idea has been submitted successfully!");
//       setTimeout(() => setSuccessMessage(null), 5000);
//     }
//     setActiveTab("history");
//   };

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      
//       {/* হেডার সেকশন */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
//             <Sparkles className="h-7 w-7 text-green-600" />
//             Member Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Share your green ideas and help make the world a better place! 🌱
//           </p>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
//           <CheckCircle className="h-4 w-4 text-green-600" />
//           <span>Total Ideas: <strong className="text-gray-900">{stats.total}</strong></span>
//         </div>
//       </div>

//       {/* সাকসেস মেসেজ */}
//       {successMessage && (
//         <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
//           <CheckCircle className="h-5 w-5 text-green-600" />
//           <span className="font-medium">{successMessage}</span>
//         </div>
//       )}

//       {/* স্ট্যাটিস্টিক্স গ্রিড */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard 
//           icon={Lightbulb} 
//           label="Total Ideas" 
//           value={stats.total} 
//           color="bg-blue-500" 
//         />
//         <StatCard 
//           icon={TrendingUp} 
//           label="Pending" 
//           value={stats.pending} 
//           color="bg-yellow-500" 
//         />
//         <StatCard 
//           icon={CheckCircle} 
//           label="Approved" 
//           value={stats.approved} 
//           color="bg-green-500" 
//         />
//         <StatCard 
//           icon={ThumbsUp} 
//           label="Total Votes" 
//           value={stats.totalVotes} 
//           color="bg-purple-500" 
//         />
//       </div>

//       {/* ট্যাব নেভিগেশন */}
//       <div className="flex flex-col sm:flex-row border-b border-gray-200 gap-2 bg-gray-50/50 rounded-t-xl p-1">
//         <button 
//           onClick={() => setActiveTab("create")} 
//           className={`
//             flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
//             flex items-center justify-center gap-2
//             ${activeTab === 'create' 
//               ? 'bg-green-600 text-white shadow-md shadow-green-200' 
//               : 'text-gray-600 hover:bg-gray-200/50'
//             }
//           `}
//         >
//           <PlusCircle className={`h-4 w-4 ${activeTab === 'create' ? 'text-white' : 'text-gray-500'}`} /> 
//           Create Idea
//         </button>
//         <button 
//           onClick={() => setActiveTab("history")} 
//           className={`
//             flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
//             flex items-center justify-center gap-2
//             ${activeTab === 'history' 
//               ? 'bg-green-600 text-white shadow-md shadow-green-200' 
//               : 'text-gray-600 hover:bg-gray-200/50'
//             }
//           `}
//         >
//           <History className={`h-4 w-4 ${activeTab === 'history' ? 'text-white' : 'text-gray-500'}`} /> 
//           Idea History
//           {ideas.length > 0 && (
//             <span className={`
//               text-xs px-2 py-0.5 rounded-full
//               ${activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}
//             `}>
//               {ideas.length}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* কন্টেন্ট এরিয়া */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//         {activeTab === "create" ? (
//           <div className="p-4 md:p-6">
//             <CreateIdeaForm 
//               categories={categories} 
//               onIdeaCreated={handleIdeaCreated}
//             />
//           </div>
//         ) : (
//           <div className="p-4 md:p-6">
//             {ideas.length === 0 ? (
//               <div className="text-center py-12">
//                 <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-600">No ideas yet</h3>
//                 <p className="text-gray-400 text-sm mt-1">
//                   Start by creating your first green idea! 🌱
//                 </p>
//                 <button 
//                   onClick={() => setActiveTab("create")}
//                   className="mt-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-1 mx-auto"
//                 >
//                   Create an idea <ArrowRight className="h-4 w-4" />
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <IdeaTable ideas={currentIdeas} />
//                 {ideas.length > itemsPerPage && (
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <Pagination 
//                       currentPage={currentPage} 
//                       totalPages={totalPages} 
//                       onPageChange={setCurrentPage}
//                       start={indexOfFirstItem + 1}
//                       end={Math.min(indexOfLastItem, ideas.length)}
//                       total={ideas.length}
//                     />
//                   </div>
//                 )}
//               </>
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

interface MemberDashboardClientProps {
  initialStats: MemberStats | null;
  initialIdeas: IdeaItem[];
  categories: any[];
}

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
        <StatCard icon={Lightbulb} label="Total Ideas" value={stats.total} color="bg-blue-500" />
        <StatCard icon={TrendingUp} label="Pending" value={stats.pending} color="bg-yellow-500" />
        <StatCard icon={CheckCircle} label="Approved" value={stats.approved} color="bg-green-500" />
        <StatCard icon={ThumbsUp} label="Total Votes" value={stats.totalVotes} color="bg-purple-500" />
      </div>

      {/* ট্যাব নেভিগেশন */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 gap-2 bg-gray-50/50 rounded-t-xl p-1">
        <button 
          onClick={() => setActiveTab("create")} 
          className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'create' ? 'bg-green-600 text-white shadow-md shadow-green-200' : 'text-gray-600 hover:bg-gray-200/50'}`}
        >
          <PlusCircle className="h-4 w-4" /> Create Idea
        </button>
        <button 
          onClick={() => setActiveTab("history")} 
          className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-green-600 text-white shadow-md shadow-green-200' : 'text-gray-600 hover:bg-gray-200/50'}`}
        >
          <History className="h-4 w-4" /> Idea History
        </button>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {activeTab === "create" ? (
          <div className="p-4 md:p-6">
            <CreateIdeaForm categories={categories} onIdeaCreated={handleIdeaCreated} />
          </div>
        ) : (
          <div className="p-4 md:p-6">
            {ideas.length === 0 ? (
              <div className="text-center py-12">
                <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">No ideas yet</h3>
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