// // import EcoSparkHero from "@/components/modules/home/Hero";
// // import { IdeaCard } from "@/components/modules/idea/IdeaCard";
// // import { getAllIdea } from "@/services/idea";

import EcoSparkHero from "@/components/modules/home/Hero";
import IdeaCard from "@/components/modules/idea/IdeaCard";
import { getAllIdea } from "@/services/idea";

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


export default async function Home() {
  const result = await getAllIdea();

  console.log("API DATA:", result);

  const data = result?.data || [];

  return (
    <div className="space-y-10">
      <EcoSparkHero />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {data.slice(0, 4).map((i: any) => (
          <IdeaCard
            key={i._id}
            idea={i}
          />
        ))}
      </div>
    </div>
  );
}