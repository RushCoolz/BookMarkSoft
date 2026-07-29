"use client";
import { useState } from "react";
import { Percent, ArrowRight } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function PercentageCalculatorBody() {
  const [val1A, setVal1A] = useState("");
  const [val1B, setVal1B] = useState("");

  const [val2A, setVal2A] = useState("");
  const [val2B, setVal2B] = useState("");

  const [val3A, setVal3A] = useState("");
  const [val3B, setVal3B] = useState("");

  const calc1 = () => {
    if (!val1A || !val1B) return "-";
    return ((parseFloat(val1A) / 100) * parseFloat(val1B)).toFixed(2);
  };

  const calc2 = () => {
    if (!val2A || !val2B || parseFloat(val2B) === 0) return "-";
    return ((parseFloat(val2A) / parseFloat(val2B)) * 100).toFixed(2) + "%";
  };

  const calc3 = () => {
    if (!val3A || !val3B || parseFloat(val3A) === 0) return "-";
    const change = ((parseFloat(val3B) - parseFloat(val3A)) / Math.abs(parseFloat(val3A))) * 100;
    return (change > 0 ? "+" : "") + change.toFixed(2) + "%";
  };

  return (
    <ToolContainer split="none">
      <ToolMain className="gap-6">
      {/* Tool 1 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">What is</span>
          <input 
            type="number" 
            value={val1A} onChange={(e) => setVal1A(e.target.value)} 
            className="w-24 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
            placeholder="%" 
          />
          <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">% of</span>
          <input 
            type="number" 
            value={val1B} onChange={(e) => setVal1B(e.target.value)} 
            className="w-32 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
            placeholder="Value" 
          />
          <span className="font-bold text-slate-700 dark:text-slate-300">?</span>
        </div>
        <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-600 hidden md:block shrink-0" />
        <div className="w-full md:w-48 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-xl p-4 flex items-center justify-center shrink-0">
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">{calc1()}</span>
        </div>
      </div>

      {/* Tool 2 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input 
            type="number" 
            value={val2A} onChange={(e) => setVal2A(e.target.value)} 
            className="w-32 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" 
            placeholder="Value" 
          />
          <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">is what % of</span>
          <input 
            type="number" 
            value={val2B} onChange={(e) => setVal2B(e.target.value)} 
            className="w-32 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" 
            placeholder="Value" 
          />
          <span className="font-bold text-slate-700 dark:text-slate-300">?</span>
        </div>
        <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-600 hidden md:block shrink-0" />
        <div className="w-full md:w-48 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-xl p-4 flex items-center justify-center shrink-0">
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">{calc2()}</span>
        </div>
      </div>

      {/* Tool 3 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">% change from</span>
          <input 
            type="number" 
            value={val3A} onChange={(e) => setVal3A(e.target.value)} 
            className="w-32 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" 
            placeholder="Value 1" 
          />
          <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">to</span>
          <input 
            type="number" 
            value={val3B} onChange={(e) => setVal3B(e.target.value)} 
            className="w-32 p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-mono outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" 
            placeholder="Value 2" 
          />
        </div>
        <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-600 hidden md:block shrink-0" />
        <div className="w-full md:w-48 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-4 flex items-center justify-center shrink-0">
          <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">{calc3()}</span>
        </div>
      </div>
      </ToolMain>
    </ToolContainer>
  );
}
