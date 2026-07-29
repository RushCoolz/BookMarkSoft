"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Sun, Search, Sunrise, Sunset, Clock } from "lucide-react";

export function SunlightCalculatorBody() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchSunlight = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      // 1. Get Lat/Lng
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error("Failed to find city");
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) throw new Error("City not found");
      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Get Sunrise/Sunset data
      // Sunrise-Sunset API uses lat/lng and returns UTC times. 
      // formatted=0 returns ISO 8601 which is easy to parse to local time.
      const sunRes = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
      if (!sunRes.ok) throw new Error("Failed to fetch sunlight data");
      const sunData = await sunRes.json();
      
      setData({ name, country, results: sunData.results });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // calculate hours between sunrise and sunset
  const getDaylightHours = (sunriseStr: string, sunsetStr: string) => {
    const rise = new Date(sunriseStr);
    const set = new Date(sunsetStr);
    const diffMs = set.getTime() - rise.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    return diffHrs.toFixed(1);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Sun className="w-6 h-6 text-yellow-500" />
              Solar Panel Sunlight Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Find exact daylight hours, sunrise, and sunset times for your location.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter city (e.g., Phoenix, Berlin, Sydney)"
              className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              onKeyDown={e => e.key === "Enter" && searchSunlight()}
            />
            <button
              onClick={searchSunlight}
              disabled={loading}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? "Searching..." : "Calculate"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {data && data.results && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{data.name}, {data.country}</h3>
                <p className="text-sm text-slate-500">Today's Sunlight Data (Your Local Time)</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl border border-yellow-200 dark:border-yellow-700 text-center shadow-sm">
                <div className="flex justify-center items-center mb-2">
                  <Clock className="w-6 h-6 text-orange-500 mr-2" />
                </div>
                <div className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-widest mb-1">Total Daylight</div>
                <div className="text-5xl font-black text-slate-900 dark:text-white">
                  {getDaylightHours(data.results.sunrise, data.results.sunset)} <span className="text-xl font-medium text-slate-600 dark:text-slate-300">Hours</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center">
                  <Sunrise className="w-8 h-8 text-yellow-500 mb-2" />
                  <div className="text-sm text-slate-500 font-bold uppercase">Sunrise</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatTime(data.results.sunrise)}</div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center">
                  <Sunset className="w-8 h-8 text-orange-500 mb-2" />
                  <div className="text-sm text-slate-500 font-bold uppercase">Sunset</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatTime(data.results.sunset)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
