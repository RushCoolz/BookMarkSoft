"use client";
import { useState } from "react";
import { Clock, Info } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function RuleOf72Body() {
  const [rate, setRate] = useState("8");

  const rVal = parseFloat(rate);
  const years = !isNaN(rVal) && rVal > 0 ? 72 / rVal : 0;

  return (
    <ToolContainer split="none">
      <ToolMain className="gap-6">
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full">
          <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">Expected Annual Interest Rate</label>
          <div className="relative">
            <input 
              type="number" 
              value={rate} onChange={(e) => setRate(e.target.value)} 
              className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-2xl text-center focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none" 
              placeholder="8" 
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold text-2xl">%</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center justify-center shrink-0">
          <div className="text-4xl text-slate-300 dark:text-slate-600 font-light">=</div>
        </div>

        <div className="flex-1 w-full flex flex-col justify-center items-center relative z-10">
          <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Years to Double</label>
          <div className="w-full p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl flex items-center justify-center h-[70px]">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
              {years} <span className="text-xl font-bold text-amber-500/70 dark:text-amber-500/50">years</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 dark:bg-slate-950 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden shadow-inner">
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-white/10 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-black text-white dark:text-slate-900 mb-4">The Rule of 72</h2>
          <p className="text-slate-400 dark:text-slate-500 text-lg leading-relaxed">
            The Rule of 72 is a simple mental math shortcut used in finance to estimate the number of years required to double your investment at a given annual rate of return.
          </p>
          <div className="mt-8 bg-white dark:bg-slate-900/10 p-4 rounded-xl inline-block font-mono text-xl text-amber-400 border border-white/10">
            72 ÷ Rate = Years
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      </div>
      </ToolMain>
    </ToolContainer>
  );
}
