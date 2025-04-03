

// "use client"; // Ensures this file runs only on the client

// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import { FaSun, FaCloud, FaWind, FaSearch } from "react-icons/fa"; // ✅ Import weather icons
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import "@/app/globals.css";

// // Dynamically import Recharts component to prevent SSR mismatches
// const WeatherChart = dynamic(() => import("./weather-chart"), { ssr: false });

// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [weatherInfo, setWeatherInfo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 🔥 Fetch weather data from OpenWeather API
//   const fetchWeather = async (cityName) => {
//     if (!cityName) return;
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fd6a4c73e637a65aa4b05c8b43c65f3d&units=metric`
//       );
//       const data = await response.json();

//       if (data.cod !== 200) {
//         alert("City not found! Please enter a valid city.");
//         setLoading(false);
//         return;
//       }

//       setWeatherInfo({
//         temperature: data.main.temp,
//         humidity: data.main.humidity,
//         windSpeed: data.wind.speed,
//         weatherType: data.weather[0].main,
//         temperatureData: [
//           { time: "Now", temp: data.main.temp },
//           { time: "1h", temp: data.main.temp + 1 },
//           { time: "2h", temp: data.main.temp - 2 },
//         ],
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       setLoading(false);
//     }
//   };

//   // ⏳ Auto-fetch weather for default city on first load
//   useEffect(() => {
//     fetchWeather("New York");
//   }, []);

//   // 🔄 Handle Search
//   const handleSearch = () => {
//     if (city.trim() !== "") {
//       fetchWeather(city);
//     }
//   };

//   // 🎨 Get Weather Icon Based on Type
//   const getWeatherIcon = (weatherType) => {
//     switch (weatherType) {
//       case "Clear":
//         return <FaSun className="text-yellow-400 text-4xl" />;
//       case "Clouds":
//         return <FaCloud className="text-gray-400 text-4xl" />;
//       case "Wind":
//         return <FaWind className="text-blue-400 text-4xl" />;
//       default:
//         return <FaCloud className="text-gray-400 text-4xl" />;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-6">🌍 Weather Forecast</h1>

//       {/* 🔍 Search Bar */}
//       <div className="flex space-x-2 w-full max-w-md mb-6">
//         <Input
//           type="text"
//           placeholder="Enter city name (e.g., London)"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
//         />
//         <Button
//           onClick={handleSearch}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg"
//         >
//           <FaSearch />
//         </Button>
//       </div>

//       {/* 📊 Weather Information */}
//       {loading ? (
//         <p className="text-lg text-gray-400">Loading weather data...</p>
//       ) : weatherInfo ? (
//         <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg text-center">
//           {/* 🔥 Weather Icon */}
//           <div className="flex justify-center mb-4">
//             {getWeatherIcon(weatherInfo.weatherType)}
//           </div>

//           <h2 className="text-2xl font-semibold">{city}</h2>
//           <p className="text-lg text-gray-300">
//             <strong>{weatherInfo.weatherType}</strong>
//           </p>

//           <div className="mt-4 space-y-2">
//             <p>
//               🌡 <strong>Temperature:</strong> {weatherInfo.temperature}°C
//             </p>
//             <p>
//               💧 <strong>Humidity:</strong> {weatherInfo.humidity}%
//             </p>
//             <p>
//               🌬 <strong>Wind Speed:</strong> {weatherInfo.windSpeed} km/h
//             </p>
//           </div>

//           {/* 📊 Weather Chart Component */}
//           <div className="mt-6">
//             <WeatherChart weatherInfo={weatherInfo} currentCity={city} />
//           </div>
//         </div>
//       ) : (
//         <p className="text-lg text-gray-400">No data available.</p>
//       )}
//     </div>
//   );
// };

// export default Weather;


// "use client"; // Ensures this file runs only on the client

// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { WiDaySunny, WiCloud, WiStrongWind } from "react-icons/wi"; // Weather Icons
// import "@/app/globals.css";

// // Dynamically import WeatherChart to prevent SSR mismatches
// const WeatherChart = dynamic(() => import("./weather-chart"), { ssr: false });

// const predefinedCities = ["New York", "London", "Tokyo"];

// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [weatherInfo, setWeatherInfo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [autoWeather, setAutoWeather] = useState([]); // Stores auto-fetched weather data for 3 cities

//   const API_KEY = "fd6a4c73e637a65aa4b05c8b43c65f3d";

//   // Function to fetch weather data
//   const fetchWeather = async (cityName) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//       );
//       const data = await response.json();

//       if (data.main) {
//         return {
//           city: cityName,
//           temperature: data.main.temp,
//           humidity: data.main.humidity,
//           windSpeed: data.wind.speed,
//           condition: data.weather[0].main, // Sunny, Cloudy, etc.
//           temperatureData: [
//             { time: "Now", temp: data.main.temp },
//             { time: "1h", temp: data.main.temp + 1 },
//             { time: "2h", temp: data.main.temp - 2 },
//           ],
//         };
//       }
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-fetch weather for predefined cities
//   useEffect(() => {
//     const fetchAutoWeather = async () => {
//       const weatherData = await Promise.all(predefinedCities.map(fetchWeather));
//       setAutoWeather(weatherData);
//     };

//     fetchAutoWeather();
//   }, []);

//   // Handle Search
//   const handleSearch = async () => {
//     if (city) {
//       const data = await fetchWeather(city);
//       setWeatherInfo(data);
//     }
//   };

//   // Function to get Weather Icons
//   const getWeatherIcon = (condition) => {
//     switch (condition) {
//       case "Clear":
//         return <WiDaySunny className="text-yellow-400 text-4xl" />;
//       case "Clouds":
//         return <WiCloud className="text-gray-400 text-4xl" />;
//       case "Wind":
//         return <WiStrongWind className="text-blue-400 text-4xl" />;
//       default:
//         return <WiCloud className="text-gray-400 text-4xl" />;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">🌍 Weather Forecast</h1>

//       {/* 🔍 Search Box */}
//       <div className="flex items-center gap-2 mb-6">
//         <Input
//           type="text"
//           placeholder="Search city..."
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="p-3 rounded-md bg-gray-700 text-white border-none w-full"
//         />
//         <Button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
//           Search
//         </Button>
//       </div>

//       {/* 🌆 Automatic Weather Reports */}
//       <h2 className="text-2xl font-semibold mb-4">📌 Weather in Major Cities</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {autoWeather.map((cityWeather, index) => (
//           <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
//             <h3 className="text-xl font-bold">{cityWeather.city}</h3>
//             {getWeatherIcon(cityWeather.condition)}
//             <p className="text-lg">🌡 {cityWeather.temperature}°C</p>
//             <p className="text-sm">💨 Wind: {cityWeather.windSpeed} km/h</p>
//             <p className="text-sm">💧 Humidity: {cityWeather.humidity}%</p>
//           </div>
//         ))}
//       </div>

//       {/* 📊 Weather Details with Chart */}
//       {weatherInfo && (
//         <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-center">Weather in {weatherInfo.city}</h2>
//           <div className="flex items-center justify-center">
//             {getWeatherIcon(weatherInfo.condition)}
//           </div>
//           <p className="text-lg text-center mt-2">🌡 {weatherInfo.temperature}°C</p>
//           <p className="text-sm text-center">💨 Wind Speed: {weatherInfo.windSpeed} km/h</p>
//           <p className="text-sm text-center">💧 Humidity: {weatherInfo.humidity}%</p>

//           {/* Weather Chart Component */}
//           <WeatherChart weatherInfo={weatherInfo} currentCity={weatherInfo.city} />
//         </div>
//       )}

//       {loading && <p className="text-center mt-4">Loading weather data...</p>}
//     </div>
//   );
// };

// export default Weather;
