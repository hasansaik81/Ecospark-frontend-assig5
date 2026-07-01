// // import EcoSparkHero from "@/components/modules/home/Hero";
// // import { IdeaCard } from "@/components/modules/idea/IdeaCard";
// // import { getAllIdea } from "@/services/idea";



// import EcoSparkHero from "@/components/modules/home/Hero";
// import IdeaCard from "@/components/modules/idea/IdeaCard";
// import { getAllIdea } from "@/services/idea";

// // import { getAllIdea } from "@/services/idea";



// export default async function Home() {
//   const {data}=await getAllIdea()

//     console.log("API DATA:", data); // 👈 এখানে বসবে
//   return (
//      <div className="space-y-10">
//       <EcoSparkHero/>
//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
//         {data?.slice(0,4).map((i:any)=>(
//           <IdeaCard key={i.id} idea={i} />
//         ))
        
//         }
//      </div>
      
//      </div>
//   );
// }



// // export default async function Home() {
// //   const { data } = await getAllIdea();

// //   console.log("Ideas:", data);

// //   return (
// //     <div>
// //       <h1>Total Ideas: {data?.length}</h1>

// //       {data?.map((item:any) => (
// //         <div key={item.id}>
// //           {item.title}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }




// // import IdeaCard from "@/components/modules/idea/IdeaCard";
// // import { getAllIdea } from "@/services/idea";

// // export default async function Home() {
// //   const result = await getAllIdea();
// //   const ideas = result?.data || [];

// //   // first 4 featured cards
// //   const featuredIdeas = ideas.slice(0, 4);

// //   return (
// //     <div className="container mx-auto px-4 space-y-10">

// //       {/* HERO SECTION */}
// //       <section className="text-center py-10 bg-gray-50 rounded-xl">
// //         <h1 className="text-3xl font-bold mb-3">
// //           Powering Tomorrow with Clean Energy
// //         </h1>

// //         <p className="text-gray-600 max-w-2xl mx-auto">
// //           Switch to sustainable solar solutions and reduce your carbon footprint
// //           while saving on energy costs.
// //         </p>
// //       </section>

// //       {/* FEATURED 4 CARDS */}
// //       <section>
// //         <h2 className="text-xl font-bold mb-4">
// //           Featured Ideas
// //         </h2>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
// //           {featuredIdeas.map((idea: any) => (
// //             <IdeaCard key={idea.id} idea={idea} />
// //           ))}
// //         </div>
// //       </section>

// //       {/* ALL IDEAS */}
// //       <section>
// //         <h2 className="text-xl font-bold mb-4">
// //           All Ideas ({ideas.length})
// //         </h2>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //           {ideas.map((idea: any) => (
// //             <IdeaCard key={idea.id} idea={idea} />
// //           ))}
// //         </div>
// //       </section>

// //     </div>
// //   );
// // }


import EcoSparkHero from "@/components/modules/home/Hero";
import IdeaCard from "@/components/modules/idea/IdeaCard";

import { getAllIdea } from "@/services/idea";


export default async function Home() {
  const result = await getAllIdea();

  console.log("API DATA:", result);

  const data = result?.data || [];

  return (
    <div className="space-y-10">
      <EcoSparkHero />

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto"> */}

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {data.slice(0, 4).map((i: any) => (
          <IdeaCard
            key={i.id}
            idea={i}
          />
        ))}
      </div>
    </div>
  );
}




// import EcoSparkHero from "@/components/modules/home/Hero";
// import IdeaCard from "@/components/modules/idea/IdeaCard";
// import { getAllIdea } from "@/services/idea";

// export default async function Home() {
//   // ১. সেফলি ডাটাবেজ থেকে ডেটা নিয়ে আসা
//   const result = await getAllIdea();
  
//   // কনসোলে চেক করার জন্য (এটি আপনার VS Code টার্মিনালে দেখাবে)
//   console.log("EcoSpark API Data:", result);

//   // যদি রেসপন্সের ভেতর .data অ্যারে থাকে, তবে সেটা নিবে, নাহলে সরাসরি রেসপন্স বা খালি অ্যারে
//   const ideas = result?.data || (Array.isArray(result) ? result : []);

//   return (
//     // 🌟 এখানে আপনার হিরো এবং গ্রিড সেকশন সুন্দর স্পেসিং এ থাকবে
//     <div className="space-y-16 pb-24">
      
//       {/* হিরো সেকশন */}
//       <EcoSparkHero />

//       {/* 💡 আইডিয়া কার্ড সেকশন - ফুল ওয়াইড (1440px) লুকে সাজানো */}
//       <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight text-foreground">
//             Explore Eco Innovations ({ideas.length})
//           </h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             Discover community-driven ideas for a cleaner, sustainable future.
//           </p>
//         </div>

//         {/* কার্ডের মেইন গ্রিড লেআউট */}
//         {ideas.length === 0 ? (
//           <div className="text-center py-16 border rounded-2xl bg-muted/20 text-muted-foreground font-medium">
//             কোনো আইডিয়া কার্ড পাওয়া যায়নি। ডাটাবেজে ডেটা আছে কি না বা কুয়েরি ঠিক আছে কি না চেক করুন।
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {ideas.map((item: any) => (
//               <IdeaCard 
//                 key={item.id} // 🌟 Prisma এর জন্য i.id ব্যবহার করা হয়েছে
//                 idea={item} 
//               />
//             ))}
//           </div>
//         )}
//       </section>

//     </div>
//   );
// }