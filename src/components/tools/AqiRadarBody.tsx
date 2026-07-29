"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Wind, Search } from "lucide-react";

export function AqiRadarBody() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchAqi = async () => {
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

      // 2. Get AQI
      const aqiRes = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5,ozone,nitrogen_dioxide`);
      if (!aqiRes.ok) throw new Error("Failed to fetch air quality data");
      const aqiData = await aqiRes.json();
      
      setData({ name, country, current: aqiData.current });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getAqiStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800" };
    if (aqi <= 100) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800" };
    if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800" };
    if (aqi <= 200) return { label: "Unhealthy", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800" };
    if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800" };
    return { label: "Hazardous", color: "text-rose-900 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/30", border: "border-rose-300 dark:border-rose-800" };
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Wind className="w-6 h-6 text-teal-500" />
              Live Air Quality (AQI) Radar
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Check real-time air pollution levels and PM2.5 for any city globally.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter city (e.g., Los Angeles, Delhi, Tokyo)"
              className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              onKeyDown={e => e.key === "Enter" && searchAqi()}
            />
            <button
              onClick={searchAqi}
              disabled={loading}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? "Searching..." : "Check"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {data && data.current && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{data.name}, {data.country}</h3>
                <p className="text-sm text-slate-500">Real-time Air Quality Data</p>
              </div>

              {(() => {
                const aqi = data.current.us_aqi;
                const status = getAqiStatus(aqi);
                return (
                  <div className={`p-8 rounded-2xl border text-center shadow-sm ${status.bg} ${status.border}`}>
                    <div className="text-sm font-bold uppercase tracking-wider mb-2 text-slate-600 dark:text-slate-300">US AQI Score</div>
                    <div className={`text-7xl font-black mb-2 ${status.color}`}>{aqi}</div>
                    <div className={`text-2xl font-bold ${status.color}`}>{status.label}</div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500 font-bold mb-1">PM2.5</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{data.current.pm2_5} <span className="text-xs font-normal">µg/m³</span></div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500 font-bold mb-1">PM10</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{data.current.pm10} <span className="text-xs font-normal">µg/m³</span></div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500 font-bold mb-1">Ozone (O3)</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{data.current.ozone} <span className="text-xs font-normal">µg/m³</span></div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500 font-bold mb-1">NO2</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{data.current.nitrogen_dioxide} <span className="text-xs font-normal">µg/m³</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
