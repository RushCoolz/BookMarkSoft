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
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableZones, setAvailableZones] = useState<string[]>([]);
  const [selectedNewZone, setSelectedNewZone] = useState("");

  const filteredZones = availableZones.filter(z => z.toLowerCase().replace(/_/g, ' ').includes(searchQuery.toLowerCase()));

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
    
    if (userZones.some(z => z.zone === selectedNewZone)) {
      setSelectedNewZone("");
      setSearchQuery("");
      return;
    }

    const name = selectedNewZone.split('/').pop()?.replace(/_/g, ' ') || selectedNewZone;
    setUserZones([...userZones, { name, zone: selectedNewZone }]);
    setSelectedNewZone("");
    setSearchQuery("");
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

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl relative z-10">
            <div className="relative w-full sm:flex-1">
              <input 
                type="text"
                placeholder="Search timezone (e.g. New York)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedNewZone(""); // Clear selection if they start typing again
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg">
                  {filteredZones.length > 0 ? filteredZones.map(z => (
                    <button
                      key={z}
                      onClick={() => {
                        setSelectedNewZone(z);
                        setSearchQuery(z.replace(/_/g, ' '));
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-sky-50 dark:hover:bg-sky-900/30 text-slate-700 dark:text-slate-300 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                    >
                      {z.replace(/_/g, ' ')}
                    </button>
                  )) : (
                    <div className="px-4 py-3 text-slate-500">No timezones found.</div>
                  )}
                </div>
              )}
            </div>
            
            <button 
              onClick={addZone}
              disabled={!selectedNewZone}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
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
