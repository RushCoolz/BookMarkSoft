"use client";
import { useState, useEffect } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function DaysBetweenBody() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const [days, setDays] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [years, setYears] = useState<number | null>(null);

  useEffect(() => {
    // Set default to today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const f = (d: Date) => d.toISOString().split('T')[0];
    setDate1(f(today));
    setDate2(f(tomorrow));
  }, []);

  useEffect(() => {
    if (!date1 || !date2) {
      setDays(null);
      return;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setDays(null);
      return;
    }

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    setDays(diffDays);
    setWeeks(Math.floor(diffDays / 7));
    setMonths(Math.floor(diffDays / 30.44));
    setYears(Math.floor(diffDays / 365.25));

  }, [date1, date2]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8">
          
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl">
            <div className="w-full space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider pl-1">Start Date</label>
              <input 
                type="date" 
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <ArrowRight className="w-6 h-6 text-slate-300 mt-6 hidden md:block" />

            <div className="w-full space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider pl-1">End Date</label>
              <input 
                type="date" 
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {days !== null ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 p-6 rounded-2xl text-center shadow-sm">
                <p className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-1">{days}</p>
                <p className="text-xs font-bold text-purple-500/70 uppercase tracking-widest">Days</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center">
                <p className="text-4xl font-black text-slate-700 dark:text-slate-300 mb-1">{weeks}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weeks</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center">
                <p className="text-4xl font-black text-slate-700 dark:text-slate-300 mb-1">{months}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Months</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center">
                <p className="text-4xl font-black text-slate-700 dark:text-slate-300 mb-1">{years}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Years</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500 font-medium">Please select both dates to see the duration between them.</p>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
