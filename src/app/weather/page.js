
"use client"; // Ensures this file runs only on the client

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WiDaySunny, WiCloud, WiStrongWind } from "react-icons/wi"; // Weather Icons
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
// Dynamically import WeatherChart to prevent SSR mismatches
const WeatherChart = dynamic(() => import("./weather-chart"), { ssr: false });

const predefinedCities = ["New York", "London", "Tokyo"];

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoWeather, setAutoWeather] = useState([]); // Stores auto-fetched weather data for 3 cities

  // const API_KEY = "fd6a4c73e637a65aa4b05c8b43c65f3d";
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  // Function to fetch weather data
  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.main) {
        return {
          city: cityName,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          condition: data.weather[0].main, // Sunny, Cloudy, etc.
          temperatureData: [
            { time: "Now", temp: data.main.temp },
            { time: "1h", temp: data.main.temp + 1 },
            { time: "2h", temp: data.main.temp - 2 },
          ],
        };
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch weather for predefined cities
  useEffect(() => {
    const fetchAutoWeather = async () => {
      const weatherData = await Promise.all(predefinedCities.map(fetchWeather));
      setAutoWeather(weatherData);
    };

    fetchAutoWeather();
  }, []);

  // Handle Search
  const handleSearch = async () => {
    if (city) {
      const data = await fetchWeather(city);
      setWeatherInfo(data);
    }
  };

  // Function to get Weather Icons
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny className="text-yellow-400 text-4xl" />;
      case "Clouds":
        return <WiCloud className="text-gray-400 text-4xl" />;
      case "Wind":
        return <WiStrongWind className="text-blue-400 text-4xl" />;
      default:
        return <WiCloud className="text-gray-400 text-4xl" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
        <Navbar/>
      <h1 className="text-3xl font-bold mb-6 text-center bg-gray-800">🌍 Weather Forecast</h1>

      {/* 🔍 Search Box */}
      <div className="flex items-center gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-md bg-gray-700 text-white border-none w-full"
        />
        <Button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
          Search
        </Button>
      </div>

      {/* 🌆 Automatic Weather Reports */}
      <h2 className="text-2xl font-semibold mb-4">📌 Weather in Major Cities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {autoWeather.map((cityWeather, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-bold">{cityWeather.city}</h3>
            {getWeatherIcon(cityWeather.condition)}
            <p className="text-lg">🌡 {cityWeather.temperature}°C</p>
            <p className="text-sm">💨 Wind: {cityWeather.windSpeed} km/h</p>
            <p className="text-sm">💧 Humidity: {cityWeather.humidity}%</p>
          </div>
        ))}
      </div>

      {/* 📊 Weather Details with Chart */}
      {weatherInfo && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Weather in {weatherInfo.city}</h2>
          <div className="flex items-center justify-center">
            {getWeatherIcon(weatherInfo.condition)}
          </div>
          <p className="text-lg text-center mt-2">🌡 {weatherInfo.temperature}°C</p>
          <p className="text-sm text-center">💨 Wind Speed: {weatherInfo.windSpeed} km/h</p>
          <p className="text-sm text-center">💧 Humidity: {weatherInfo.humidity}%</p>

          {/* Weather Chart Component */}
          <WeatherChart weatherInfo={weatherInfo} currentCity={weatherInfo.city} />
        </div>
      )}

      {loading && <p className="text-center mt-4">Loading weather data...</p>}
    </div>
  );
};

export default Weather;
