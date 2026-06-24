"use client";

import * as React from "react";
import { Lightbulb, Users, Vote, DollarSign, CheckCircle, XCircle } from "lucide-react";

interface IdeaItem {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

// সার্ভার কম্পোনেন্ট থেকে ইনিশিয়াল stats ডাটা প্রপ্স হিসেবে আসবে
export default function AdminDashboardClient({ initialStats }: { initialStats: any }) {
  const [stats] = React.useState<any>(initialStats);
  
  const [ideas, setIdeas] = React.useState<IdeaItem[]>([
    { id: "1", title: "Solar Tree for Parks", description: "Installing solar panels shaped like trees.", category: "renewable", author: "Anik Rahman", status: "PENDING" },
    { id: "2", title: "Smart Waste Bin", description: "Bins that alert when 90% full.", category: "waste-management", author: "Sumi Akter", status: "APPROVED" },
  ]);

  const handleStatusChange = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, status: newStatus } : idea));
  };

  return (
    <div className="space-y-6">
      {/* 📊 stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div><span className="text-xs text-gray-400 font-medium uppercase">Total Users</span><p className="text-2xl font-bold text-slate-800">{stats.totalUsers || 0}</p></div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Users className="h-5 w-5" /></div>
          </div>
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div><span className="text-xs text-gray-400 font-medium uppercase">Total Ideas</span><p className="text-2xl font-bold text-green-600">{stats.totalIdeas || 0}</p></div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600"><Lightbulb className="h-5 w-5" /></div>
          </div>
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div><span className="text-xs text-gray-400 font-medium uppercase">Total Votes</span><p className="text-2xl font-bold text-sky-600">{stats.totalVotes || 0}</p></div>
            <div className="p-3 bg-sky-50 rounded-lg text-sky-600"><Vote className="h-5 w-5" /></div>
          </div>
          <div className="p-5 bg-white border rounded-xl shadow-sm flex items-center justify-between">
            <div><span className="text-xs text-gray-400 font-medium uppercase">Total Revenue</span><p className="text-2xl font-bold text-emerald-600">${stats.totalRevenue || 0}</p></div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><DollarSign className="h-5 w-5" /></div>
          </div>
        </div>
      )}

      {/* 🛠️ Idea Management List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">🛠️ Manage Incoming Ideas</h3>
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div key={idea.id} className="p-4 border rounded-xl bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded capitalize">{idea.category}</span>
                  <h4 className="font-bold text-base mt-1">{idea.title}</h4>
                  <p className="text-sm text-gray-600">{idea.description}</p>
                </div>
                <div className="flex gap-2 shrink-0 w-full md:w-auto">
                  {idea.status === "PENDING" ? (
                    <>
                      <button onClick={() => handleStatusChange(idea.id, "APPROVED")} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition">Approve</button>
                      <button onClick={() => handleStatusChange(idea.id, "REJECTED")} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition">Reject</button>
                    </>
                  ) : (
                    <span className={`text-xs font-medium flex items-center gap-1 ${idea.status === "APPROVED" ? "text-green-600" : "text-red-600"}`}>
                      {idea.status === "APPROVED" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />} {idea.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm h-fit">
          <h3 className="font-semibold text-sm text-blue-600 mb-2">📊 Review Metrics</h3>
          <p className="text-xs text-gray-500">আজকে পেন্ডিং আইডিয়া রয়েছে: <strong>{ideas.filter(i => i.status === "PENDING").length} টি</strong></p>
        </div>
      </div>
    </div>
  );
}