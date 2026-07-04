

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
            <Link href={`/info/${ideaId}`} className="w-1/2">
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