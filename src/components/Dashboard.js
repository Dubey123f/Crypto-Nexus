"use client"; 

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";  // Import dynamically
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from "recharts";

// Ensure the component only renders on the client
const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Prevents hydration mismatch

    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=fd6a4c73e637a65aa4b05c8b43c65f3d&units=metric`);
      const data = await response.json();
      if (data.main) {
        setWeatherData([
          { time: "Now", temp: data.main.temp },
          { time: "1h", temp: data.main.temp + 1 },
          { time: "2h", temp: data.main.temp - 2 },
        ]);
      }
    };

    const fetchCrypto = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`);
      const data = await response.json();
      setCryptoData([
        { name: "Bitcoin", value: data.bitcoin.usd },
        { name: "Ethereum", value: data.ethereum.usd },
      ]);
    };

    fetchWeather();
    fetchCrypto();
  }, []);

  const COLORS = ["#0088FE", "#00C49F"];

  if (!isClient) return null; // Prevents mismatched HTML error

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Real-Time Data Analysis</h1>

      {/* Line Chart for Weather */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Temperature Analysis</h2>
        <LineChart width={500} height={300} data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
        </LineChart>
      </div>

      {/* Pie Chart for Crypto */}
      <div className="bg-gray-900 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-2">Crypto Market Overview</h2>
        <PieChart width={400} height={300}>
          <Pie data={cryptoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
            {cryptoData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
