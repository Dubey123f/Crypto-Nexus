
"use client";  // ✅ Fix Next.js hydration issue

import { useState, useEffect } from "react";
import { fetchCryptoPrices } from "@/utils/api"; // ✅ Correct path
import Navbar from "@/components/Navbar";
export default function CryptoPriceTracker() {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search term
  const [loading, setLoading] = useState(false); // ⏳ Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCryptoPrices();
      setCryptos(data);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 sec

    return () => clearInterval(interval);
  }, []);

  // 🔍 Search function
  const handleSearch = async () => {
    if (searchTerm.trim() === "") return; // Don't fetch if empty
    setLoading(true);
    const data = await fetchCryptoPrices(searchTerm.toLowerCase());
    setCryptos(data);
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Navbar/>
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto Price Tracker</h1>
        {/* 🔍 Search Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search Crypto (e.g., bitcoin)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-lg text-gray-400">Loading...</p>
        ) : (
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-700 text-gray-400">
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Price (USD)</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {cryptos.length > 0 ? (
                cryptos.map((crypto) => (
                  <tr key={crypto.id} className="border-b border-gray-700">
                    <td className="px-6 py-4">{crypto.name}</td>
                    <td className="px-6 py-4">{crypto.symbol}</td>
                    <td className="px-6 py-4">${crypto.current_price.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-400">
                    No data found. Try another cryptocurrency.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
