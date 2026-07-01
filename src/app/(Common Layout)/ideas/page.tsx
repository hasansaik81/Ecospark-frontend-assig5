// // import { IdeaCard } from '@/components/modules/idea/IdeaCard'
// import IdeaCard from '@/components/modules/idea/IdeaCard'
// import { getAllIdea } from '@/services/idea'


// const page =async () => {
//   const{data}=await getAllIdea()
//   return (

//     <section className='my-10-pb-24'>
//     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
//      {
//       data?.map((i:any)=>(
//         <IdeaCard key={i.id}
//         idea={i}/>
//       ))
//      }
//     </div>
//     </section>
   
//   )
// }


// import { IdeaCard } from '@/components/modules/idea/IdeaCard'
import IdeaCard from '@/components/modules/idea/IdeaCard'
import { getAllIdea } from '@/services/idea'

// এখানে 'export default' যোগ করা হয়েছে
export default async function Page() {
  const { data } = await getAllIdea()

  return (
    <section className='my-10 pb-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {
          data?.map((i: any) => (
            <IdeaCard key={i.id} idea={i} />
          ))
        }
      </div>
    </section>
  )
}




// import IdeaCard from "@/components/modules/idea/IdeaCard";
// import { getAllIdea } from "@/services/idea";
// // import IdeaCard from "@/components/modules/idea/IdeaCard";

// export default async function LandingPage() {
//   const res = await getAllIdea();
  
//   // 🎯 ব্যাকএন্ড রেসপন্স থেকে আসল অ্যারে তুলে আনা (ডিফল্ট খালি অ্যারে)
//   const allIdeas = res?.data || []; 
  
//   // ✂️ কুচি কুচি করে কেটে শুধুমাত্র প্রথম ৪টি আইডিয়া নেওয়া হলো
//   const landingIdeas = allIdeas.slice(0, 4);

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold mb-6">Featured Eco Ideas</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {landingIdeas.length > 0 ? (
//           landingIdeas.map((idea: any) => (
//             <IdeaCard key={idea.id} idea={idea} />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No Ideas Available Right Now!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



// import IdeaCard from "@/components/modules/idea/IdeaCard";
// import { getAllIdea } from "@/services/idea";

// export default async function LandingPage() {
//   const res = await getAllIdea();
  
//   // 🎯 ব্যাকএন্ড রেসপন্স থেকে আসল অ্যারে তুলে আনা (ডিফল্ট খালি অ্যারে)
//   const allIdeas = res?.data || []; 
  
//   // ✂️ শুধুমাত্র প্রথম ৪টি আইডিয়া নেওয়া হলো
//   const landingIdeas = allIdeas.slice(0, 4);

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold mb-6">Featured Eco Ideas</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {landingIdeas.length > 0 ? (
//           landingIdeas.map((idea: any) => (
//             /* ✅ সমাধান: 'idea={idea}' এর জায়গায় 'item={idea}' ব্যবহার করা হয়েছে।
//               আইডি জটলা এড়াতে key-তে safe fallback দেওয়া হয়েছে।
//             */
//             <IdeaCard key={idea?._id || idea?.id} item={idea} />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No Ideas Available Right Now!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }