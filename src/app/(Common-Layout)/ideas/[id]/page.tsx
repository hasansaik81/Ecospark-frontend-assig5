


import { getIdeaById } from "@/services/idea";
import { getUser } from "@/services/auth";
import IdeaDetailsModule from "@/components/modules/idea/IdeaDetails";
import { notFound } from "next/navigation";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const [user, response] = await Promise.all([
//     getUser().catch(() => null),
//     getIdeaById(id),
//   ]);

//   const ideaData = response?.data ?? response?.idea ?? response;

//   if (!ideaData) {
//     notFound();
//   }

//   return (
//     <IdeaDetailsModule
//       idea={ideaData}
//       user={user as any}
//     />
//   );
// }





import { UserProfile } from "@/types/user"; 

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [user, response] = await Promise.all([
    getUser().catch(() => null),
    getIdeaById(id),
  ]);

  // API response shape: { success, statusCode, message, data }
  // prefer response.data if present, otherwise use response directly
  const ideaData = response?.data ?? response;

  if (!ideaData) {
    notFound();
  }

  return (
    <IdeaDetailsModule
      idea={ideaData}
    
      user={user as UserProfile | null} 
    />
  );
}