// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 👈 ১ মেগাবাইট থেকে বাড়িয়ে ১০ মেগাবাইট করা হলো
    },
  },
};

export default nextConfig;
