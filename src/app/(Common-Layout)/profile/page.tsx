// import { getProfile } from "@/services/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail, UserCircle, Lightbulb, LightbulbOff, DollarSign, Wallet } from "lucide-react";
import { getProfile } from "@/services/profile";

// 💡 ১. ইনোভেটর/মেম্বারদের জন্য স্ট্যাটাস (যারা আইডিয়া শেয়ার করেন)
const InnovatorStats = ({ data }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <Card className="bg-amber-50/50 border-amber-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-amber-600 flex items-center gap-1">
          <Lightbulb className="w-4 h-4" /> Total Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{data?.ideasCount || "0"}</p>
      </CardContent>
    </Card>

    <Card className="bg-green-50/50 border-green-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-1">
          <DollarSign className="w-4 h-4" /> Funds Raised
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${data?.totalEarnings || "0"}</p>
      </CardContent>
    </Card>

    <Card className="bg-blue-50/50 border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-blue-600">Approved Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{data?.approvedIdeasCount || "0"}</p>
      </CardContent>
    </Card>
  </div>
);

// 💰 ২. ইনভেস্টর/ব্যালাক ব্যাকারদের জন্য স্ট্যাটাস (যারা আইডিয়া কেনেন বা ফান্ড দেন)
const InvestorStats = ({ data }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <Card className="bg-emerald-50/50 border-emerald-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-emerald-600 flex items-center gap-1">
          <Wallet className="w-4 h-4" /> Backed Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{data?.purchasedCount || "0"}</p>
      </CardContent>
    </Card>

    <Card className="bg-indigo-50/50 border-indigo-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-indigo-600">Total Investments</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${data?.totalSpent || "0"}</p>
      </CardContent>
    </Card>
  </div>
);

// 🚀 ৩. মূল প্রোফাইল পেজ কম্পোনেন্ট
const ProfilePage = async () => {
  const { data } = await getProfile();

  // ডাটা না থাকলে সেফটি চেক
  if (!data) return <div className="text-center py-20 text-gray-500">Loading Ecospark profile...</div>;

  // ইউজার মেম্বার/ইনোভেটর নাকি ইনভেস্টর তা চেক করার লজিক (আপনার ডাটাবেজ অনুযায়ী রোল চেঞ্জ করতে পারেন)
  const isInnovator = data.role === "USER" || data.role === "MEMBER"; 

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4">
      <Card className="overflow-hidden border-none shadow-xl bg-white">
        {/* Ecospark থিমের জন্য গ্রিন-ইন্ডিগো গ্রাডিয়েন্ট ব্যবহার করা হয়েছে */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700" />
        <div className="px-8 pb-8">
          <div className="relative -mt-16 flex flex-col md:flex-row items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={data?.image} alt={data.name} />
              <AvatarFallback className="text-3xl bg-slate-100">
                {data.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
                <Badge variant={isInnovator ? "default" : "secondary"} className="uppercase bg-teal-600 hover:bg-teal-700 text-white">
                  {data.role}
                </Badge>
              </div>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" /> {data.email}
              </p>
            </div>
            <Button className="mb-2 bg-emerald-600 hover:bg-emerald-700 text-white">Edit Profile</Button>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <UserCircle className="w-5 h-5 text-gray-400" /> Account Status
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-green-600 capitalize">{data.status || "Active"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Joined Ecospark:</span>
                  <span className="font-medium flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-500" /> Ecospark Dashboard Overview
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                "Hello! I am {data.name}, focused on {isInnovator ? "creating innovative and green eco-solutions to change the world" : "discovering and backing next-generation impactful ideas"}."
              </p>

              {/* রোল অনুযায়ী কন্ডিশনাল স্ট্যাটাস রেন্ডারিং */}
              {isInnovator ? <InnovatorStats data={data} /> : <InvestorStats data={data} />}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;