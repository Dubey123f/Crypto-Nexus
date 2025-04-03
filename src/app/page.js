// import React from 'react'
// import Weather from '@/components/weather'
// import NewsApp from '@/components/news'
// import "@/app/globals.css";
// import CryptoTracker from '@/components/crypto';
// import  Navbar from '@/components/Navbar';
// import Dashboard from '@/components/Dashboard';
// const Page = () => {
//   return (
//     <div>
//       < Navbar />
//       <Dashboard />
//       {/* <Weather />
//       <NewsApp />
//       <CryptoTracker /> */}
//     </div>
//   )
// }

// export default Page



"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

// Dynamically import Dashboard to avoid SSR hydration issues
const Dashboard = dynamic(() => import("@/components/Dashboard"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Dashboard />
    </div>
  );
}
