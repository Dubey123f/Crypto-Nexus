"use client"; // Ensure this runs on the client side

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Weather from '@/components/weather'
import NewsApp from '@/components/news'

import CryptoTracker from '@/components/crypto';

export default function MainPage() {
  const [activePage, setActivePage] = useState("weather");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar setActivePage={setActivePage} />
      
      {/* Render Components Dynamically */}
      <div className="p-6">
        {activePage === "weather" && <Weather />}
        {activePage === "crypto" && <CryptoTracker />}
        {activePage === "news" && <NewsApp/>}
      </div>
    </div>
  );
}
