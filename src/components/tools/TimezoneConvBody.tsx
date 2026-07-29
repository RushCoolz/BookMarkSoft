"use client";
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

const zones = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map(z => (
              <div key={z.name} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">{z.name}</p>
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
