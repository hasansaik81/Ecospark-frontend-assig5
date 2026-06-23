import { IdeaCard } from '@/components/modules/idea/IdeaCard'
import { getAllIdea } from '@/services/idea'
import React from 'react'

const page =async () => {
  const{data}=await getAllIdea()
  return (

    <section className='my-10-pb-24'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
     {
      data?.map((i:any)=>(
        <IdeaCard key={i.id}
        idea={i}/>
      ))
     }
    </div>
    </section>
   
  )
}

export default page