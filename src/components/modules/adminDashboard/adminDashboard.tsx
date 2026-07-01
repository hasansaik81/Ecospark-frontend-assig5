// src/components/modules/adminDashboard/adminDashboard.tsx

"use client";

import * as React from "react";
import { Lightbulb, Users, Vote, DollarSign, CheckCircle, XCircle } from "lucide-react";

// 📌 ১. IdeaTable ইমপোর্ট - ডিফল্ট ইমপোর্ট (কোনো { } নেই)
import IdeaTable from "@/components/dasboard/IdeaTable";

// 📌 ২. Pagination ইমপোর্ট (যদি থাকে)
import { Pagination } from "@/components/dasboard/Pagination";

// 📌 ৩. CreateIdeaForm ইমপোর্ট (রিলেটিভ পাথে)
import CreateIdeaForm from "../idea/IdeaCreateForm";

// ============================================
// ইন্টারফেস ডিফাইন
// ============================================

interface DashboardStats {
  totalUsers: number;
  totalIdeas: number;
  totalVotes: number;
  totalRevenue: number;
}

interface IdeaItem {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface AdminDashboardProps {
  initialStats: DashboardStats | null;
  initialIdeas: IdeaItem[];
}

// ============================================
// মেইন কম্পোনেন্ট
// ============================================

export default function AdminDashboard({ 
  initialStats, 
  initialIdeas 
}: AdminDashboardProps) {
  
  const [stats] = React.useState<DashboardStats | null>(initialStats);
  const [ideas, setIdeas] = React.useState<IdeaItem[]>(initialIdeas || []);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(5);

  // পেজিনেশন ক্যালকুলেশন
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIdeas = ideas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ideas.length / itemsPerPage);

  const handleStatusChange = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, status: newStatus } : idea));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* 📊 Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase">Total Users</span>
              <p className="text-2xl font-bold text-slate-800">{stats.totalUsers || 0}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase">Total Ideas</span>
              <p className="text-2xl font-bold text-green-600">{stats.totalIdeas || 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Lightbulb className="h-5 w-5" />
            </div>
          </div>
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase">Total Votes</span>
              <p className="text-2xl font-bold text-sky-600">{stats.totalVotes || 0}</p>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
              <Vote className="h-5 w-5" />
            </div>
          </div>
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase">Total Revenue</span>
              <p className="text-2xl font-bold text-emerald-600">${stats.totalRevenue || 0}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>
      )}

      {/* 🛠️ Idea Management List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            🛠️ Manage Incoming Ideas
          </h3>
          <div className="space-y-4">
            {currentIdeas.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                কোনো আইডিয়া পাওয়া যায়নি।
              </p>
            ) : (
              currentIdeas.map((idea) => (
                <div 
                  key={idea.id} 
                  className="p-4 border rounded-xl bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded capitalize">
                      {idea.category}
                    </span>
                    <h4 className="font-bold text-base mt-1">{idea.title}</h4>
                    <p className="text-sm text-gray-600">{idea.description}</p>
                    <p className="text-xs text-gray-400 mt-1">By: {idea.author}</p>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full md:w-auto">
                    {idea.status === "PENDING" ? (
                      <>
                        <button 
                          onClick={() => handleStatusChange(idea.id, "APPROVED")} 
                          className="text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(idea.id, "REJECTED")} 
                          className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs font-medium flex items-center gap-1 ${
                        idea.status === "APPROVED" ? "text-green-600" : "text-red-600"
                      }`}>
                        {idea.status === "APPROVED" ? 
                          <CheckCircle className="h-4 w-4" /> : 
                          <XCircle className="h-4 w-4" />
                        } 
                        {idea.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 📄 Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* 📊 Review Metrics */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm h-fit">
          <h3 className="font-semibold text-sm text-blue-600 mb-2">
            📊 Review Metrics
          </h3>
          <p className="text-xs text-gray-500">
            আজকে পেন্ডিং আইডিয়া রয়েছে: <strong>
              {ideas.filter(i => i.status === "PENDING").length} টি
            </strong>
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Approved: <strong className="text-green-600">
                {ideas.filter(i => i.status === "APPROVED").length}
              </strong>
            </p>
            <p className="text-xs text-gray-500">
              Rejected: <strong className="text-red-600">
                {ideas.filter(i => i.status === "REJECTED").length}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}