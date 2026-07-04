


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
  AlertCircle,
  Lock,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ==========================================
// 💡 TYPES & INTERFACES
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
  _id?: string;
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

  const ideaId = idea?.id || idea?._id;

  const formattedDate = idea?.createdAt
    ? new Date(idea.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "Date not available";

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">

      {/* 🔙 BACK BUTTON */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-emerald-600 transition gap-1 mb-6"
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
          <Card className="sticky top-24 rounded-2xl shadow-lg border overflow-hidden bg-card hover:shadow-xl transition-shadow duration-300">
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
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Lifetime updates & support</span>
                </div>
              </div>



              {/* {/* ✅ BOOK NOW BUTTON} */}





              {ideaId ? (
                <Button
                  asChild
                  type="button"
                  className="
      w-full
      h-14
      rounded-xl
      bg-emerald-600
      hover:bg-emerald-700
      text-white
      font-semibold
      shadow-md
      hover:shadow-lg
      transition-all
      duration-200
      cursor-pointer
      active:scale-[0.98]
    "
                >
                  <Link href={`/info/${ideaId}`}>
                    <Lock className="mr-2 h-4 w-4" />
                    Book Now / Get Access
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  disabled
                  className="
      w-full
      h-14
      rounded-xl
      bg-slate-300
      text-slate-600
      cursor-not-allowed
    "
                >
                  Access Unavailable
                </Button>
              )}



              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground border-t pt-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secure payment • 256-bit encrypted</span>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}