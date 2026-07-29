"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { CalendarDays, Calendar } from "lucide-react";

export function HolidaysFinderBody() {
  const [countryCode, setCountryCode] = useState("US");
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [holidays, setHolidays] = useState<any[]>([]);

  const fetchHolidays = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
      if (!res.ok) throw new Error("Could not find holidays for this country/year");
      const data = await res.json();
      setHolidays(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch holidays");
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, [countryCode, year]);

  const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - 5 + i);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-widest mb-1">Global Data</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Public Holidays Finder
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/50 rounded-full items-center justify-center text-fuchsia-500">
              <Calendar className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="w-full">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Country Code (e.g. US, GB, LK)</label>
                <input 
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                  maxLength={2}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 uppercase"
                />
              </div>
              <div className="w-full sm:w-48 shrink-0">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Year</label>
                <select 
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {loading ? (
              <div className="py-12 flex justify-center">
                <div className="w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {holidays.map((h, i) => {
                  const date = new Date(h.date);
                  const isPast = date < new Date();
                  return (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${isPast ? 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 opacity-60' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'}`}>
                      <div className="w-16 shrink-0 text-center flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-700 pr-4">
                        <span className="text-xs font-bold text-fuchsia-500 uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-2xl font-black text-slate-800 dark:text-white">{date.getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{h.name}</p>
                        <p className="text-sm text-slate-500">{h.localName}</p>
                      </div>
                      <div className="hidden sm:block text-right text-sm font-medium text-slate-400">
                        {date.toLocaleDateString(undefined, { weekday: 'long' })}
                      </div>
                    </div>
                  );
                })}
                {holidays.length === 0 && !error && (
                  <div className="text-center py-8 text-slate-500">
                    No holidays found.
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
