
// // import { Navbar } from '@/components/shared/Navbar'
// import Footer from '@/components/footer/Footer'
// import Navbar from '@/components/shared/Navbar'
// import React from 'react'

// const CommonLayout = ({children}:{children:React.ReactNode}) => {
//   return (
//     <div>
//     <Navbar/>
//     <div  className="container mx-auto px-4" > {children} </div>
//        <Footer/>
//     </div>
//   )
// }

// export default CommonLayout



import Footer from '@/components/footer/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // 🌟 ফিক্স ১: পুরো লেআউটকে একটি ফ্লেক্স বক্স বানানি হলো যাতে ফুটার সবসময় নিচে থাকে 
    // এবং কোনো এলিমেন্ট একে অপরকে ওভারল্যাপ (ঢেকে ফেলতে) না পারে।
    <div className="flex flex-col min-h-screen relative">
      
      {/* নেভবার সবার উপরে থাকবে */}
      <Navbar />
      
      {/* 🌟 ফিক্স ২: main ট্যাগ ব্যবহার করে z-0 এবং flex-grow দেওয়া হয়েছে। 
          এতে নেভবারের z-[9999] এর নিচে এই কন্টেন্টগুলো থাকবে এবং ক্লিক ব্লক হবে না। */}
      <main className="flex-grow container mx-auto px-4 relative z-0">
        {children}
      </main>
      
      {/* ফুটার লেআউটের একদম নিচে ফিক্সড থাকবে */}
      <Footer />
    </div>
  )
}

export default CommonLayout