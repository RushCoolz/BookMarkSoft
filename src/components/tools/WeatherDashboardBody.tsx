"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "./SharedComponents";
import { Search, Cloud, Droplets, Wind, MapPin } from "lucide-react";

export function WeatherDashboardBody() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      // 1. Geocoding
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }
      
      const location = geoData.results[0];

      // 2. Weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`);
      const data = await weatherRes.json();
      
      setWeatherData({
        location,
        current: data.current,
        units: data.current_units
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-1">Global Data</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Weather Dashboard
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-cyan-100 dark:bg-cyan-900/50 rounded-full items-center justify-center text-cyan-500">
              <Cloud className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Enter city name (e.g. London, Tokyo)..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <button 
                onClick={fetchWeather}
                disabled={loading || !city}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {weatherData && (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-6">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  <span className="font-medium">{weatherData.location.name}, {weatherData.location.country}</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Temperature</p>
                    <h3 className="text-5xl font-black text-slate-800 dark:text-white">
                      {weatherData.current.temperature_2m}<span className="text-2xl text-cyan-500">{weatherData.units.temperature_2m}</span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">Feels like {weatherData.current.apparent_temperature}{weatherData.units.apparent_temperature}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <Droplets className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Humidity</p>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                      {weatherData.current.relative_humidity_2m}<span className="text-xl text-slate-400">{weatherData.units.relative_humidity_2m}</span>
                    </h3>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <Wind className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Wind Speed</p>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                      {weatherData.current.wind_speed_10m}<span className="text-xl text-slate-400 ml-1">{weatherData.units.wind_speed_10m}</span>
                    </h3>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
