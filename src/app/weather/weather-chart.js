// "use client"; // Ensures this component runs only on the client

// import React from "react";
// import {
//   LineChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Line,
//   CartesianGrid,
// } from "recharts";
// import "@/app/globals.css";
// const WeatherChart = ({ weatherInfo, currentCity }) => {
//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-bold">Temperature Trend in {currentCity}</h2>
//       <LineChart
//         width={500}
//         height={300}
//         data={weatherInfo.temperatureData}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="time" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </div>
//   );
// };

// export default WeatherChart;


"use client"; // Ensures this component runs only on the client

import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  Stop,
} from "recharts";
import "@/app/globals.css";

const WeatherChart = ({ weatherInfo, currentCity }) => {
  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-bold text-center text-white mb-4">
        🌡 Temperature Trend in {currentCity}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={weatherInfo.temperatureData}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          {/* 🔥 Gradient Background */}
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* 🎯 Grid Styling */}
          <CartesianGrid strokeDasharray="4 4" stroke="#374151" />

          {/* 🏷 X-Axis */}
          <XAxis
            dataKey="time"
            tick={{ fill: "#e5e7eb", fontSize: 12 }}
            stroke="#9ca3af"
          />

          {/* 🌡 Y-Axis */}
          <YAxis
            tick={{ fill: "#e5e7eb", fontSize: 12 }}
            stroke="#9ca3af"
            domain={["auto", "auto"]}
          />

          {/* 📌 Tooltip Customization */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "6px",
              border: "none",
              color: "#f3f4f6",
            }}
          />

          {/* 📈 Temperature Line with Smooth Curve */}
          <Line
            type="monotone"
            dataKey="temp"
            stroke="url(#colorTemp)"
            strokeWidth={3}
            dot={{ fill: "#4f46e5", strokeWidth: 1, r: 5 }}
            activeDot={{ r: 7, stroke: "#4f46e5", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
