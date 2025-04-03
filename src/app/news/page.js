"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
// const API_KEY = 'pub_774500387d93bb51a06f574991cbfb888a265';
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; 
export default function NewsApp() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("us");

  const countries = [
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "in", name: "India" },
  ];

  useEffect(() => {
    fetchNews();
  }, [selectedCountry]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=mental%20health&language=en&country=${selectedCountry}`
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      if (data.status === "success") {
        setArticles(data.results || []);
      } else {
        throw new Error("No news found for the selected country.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 text-white">
        <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mental Health News</h1>

        {error && (
          <div className="bg-red-900/50 p-4 rounded-lg mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-400" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold">
            {loading ? "Loading news..." : `Latest News (${articles.length} articles)`}
          </h2>

          {/* ✅ Fixed Select Dropdown */}
          <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value)}>
            <SelectTrigger className="w-[200px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select country">
                {countries.find((c) => c.code === selectedCountry)?.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            <p className="text-gray-400">Fetching latest news...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Card key={article.article_id} className="bg-gray-800 border-gray-700">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{article.description || "No content available"}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-gray-400 text-sm">
                      <Clock className="w-4 h-4 inline-block" />{" "}
                      {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        Read More <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-gray-400 text-center w-full">No articles found for this country.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
