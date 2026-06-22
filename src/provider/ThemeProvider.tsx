// "use client";

// import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export function ThemeProvider({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;


// src/provider/ThemeProvider.tsx
"use client"; // 👈 নিশ্চিত করুন এই ক্লায়েন্ট ডিরেক্টিভটি ফাইলের একদম প্রথমে আছে

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // এর ভেতরে আলাদা কোনো কাস্টম <script> বা জাভাস্ক্রিপ্ট ইনজেকশন রাখবেন না
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
// }
