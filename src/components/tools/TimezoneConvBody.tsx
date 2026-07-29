"use client";
import { useState, useEffect } from "react";
import { Globe, Plus, X } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

const defaultZones = [
  { name: "UTC", zone: "UTC" },
  { name: "New York", zone: "America/New_York" },
  { name: "London", zone: "Europe/London" },
  { name: "Paris", zone: "Europe/Paris" },
  { name: "Dubai", zone: "Asia/Dubai" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
  { name: "Sydney", zone: "Australia/Sydney" },
  { name: "Los Angeles", zone: "America/Los_Angeles" },
];

export function TimezoneConvBody() {
  const [time, setTime] = useState(new Date());
  const [userZones, setUserZones] = useState(defaultZones);
  
  const [availableZones, setAvailableZones] = useState<string[]>([]);
  const [selectedNewZone, setSelectedNewZone] = useState("");

  useEffect(() => {
    try {
      if (Intl && (Intl as any).supportedValuesOf) {
        setAvailableZones((Intl as any).supportedValuesOf('timeZone'));
      }
    } catch (e) {
      console.warn("supportedValuesOf not available");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addZone = () => {
    if (!selectedNewZone) return;
    
    // Prevent duplicates
    if (userZones.some(z => z.zone === selectedNewZone)) {
      setSelectedNewZone("");
      return;
    }

    const name = selectedNewZone.split('/').pop()?.replace(/_/g, ' ') || selectedNewZone;
    setUserZones([...userZones, { name, zone: selectedNewZone }]);
    setSelectedNewZone("");
  };

  const removeZone = (index: number) => {
    setUserZones(userZones.filter((_, i) => i !== index));
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-8">
          
          <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-1">Your Local Time</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100 font-mono">
                {time.toLocaleTimeString()}
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full items-center justify-center text-sky-500">
              <Globe className="w-8 h-8" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <select 
              value={selectedNewZone}
              onChange={(e) => setSelectedNewZone(e.target.value)}
              className="w-full sm:flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <option value="">-- Add a new timezone --</option>
              {availableZones.map(z => (
                <option key={z} value={z}>{z.replace(/_/g, ' ')}</option>
              ))}
            </select>
            <button 
              onClick={addZone}
              disabled={!selectedNewZone}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userZones.map((z, idx) => (
              <div key={z.zone} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm relative group">
                <button 
                  onClick={() => removeZone(idx)}
                  className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-2 truncate pr-6" title={z.name}>{z.name}</p>
                <p className="text-2xl font-black text-sky-600 dark:text-sky-400 font-mono tracking-tight">
                  {time.toLocaleTimeString("en-US", { timeZone: z.zone, hour12: false })}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {time.toLocaleDateString("en-US", { timeZone: z.zone })}
                </p>
              </div>
            ))}
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
