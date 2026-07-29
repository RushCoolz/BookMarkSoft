"use client";
import { useState, useEffect } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function UnixTimestampBody() {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState(currentEpoch.toString());
  
  const [humanDate, setHumanDate] = useState("");
  const [humanTime, setHumanTime] = useState("");
  const [relative, setRelative] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const e = parseInt(epochInput);
    if (isNaN(e)) {
      setHumanDate("Invalid Timestamp");
      setHumanTime("");
      setRelative("");
      return;
    }

    // Multiply by 1000 to get milliseconds if they input seconds
    // Or if it's already in ms, it will be huge. A basic heuristic:
    const ms = e > 1000000000000 ? e : e * 1000;
    const date = new Date(ms);

    if (date.toString() === "Invalid Date") {
      setHumanDate("Invalid Date");
      setHumanTime("");
      setRelative("");
      return;
    }

    setHumanDate(date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    setHumanTime(date.toLocaleTimeString(undefined, { timeZoneName: 'short' }));

    // Relative
    const now = Date.now();
    const diff = ms - now;
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.round(diff / (1000 * 60 * 60));
    const diffMins = Math.round(diff / (1000 * 60));

    if (Math.abs(diffDays) > 0) setRelative(rtf.format(diffDays, 'day'));
    else if (Math.abs(diffHours) > 0) setRelative(rtf.format(diffHours, 'hour'));
    else setRelative(rtf.format(diffMins, 'minute'));

  }, [epochInput]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8 text-center py-6">
          
          <div className="bg-slate-900 dark:bg-black border border-slate-800 rounded-3xl p-8 shadow-xl text-center">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Current Unix Timestamp</h3>
            <p className="text-5xl font-black font-mono text-emerald-400 tracking-wider">
              {currentEpoch}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              <input 
                type="text" 
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                className="w-full md:w-64 text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                placeholder="Enter timestamp"
              />
              <button 
                onClick={() => setEpochInput(currentEpoch.toString())}
                className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Reset to Now
              </button>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-2">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">{humanDate}</h4>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-mono">{humanTime}</p>
              {relative && <p className="text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full inline-block mt-2">{relative}</p>}
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
