"use client";
import { useState } from "react";
import { Tag, DollarSign, Percent } from "lucide-react";
import { ToolContainer, ToolSidebar, ToolMain } from "../ui/tool/ToolContainer";

export function MarginCalculatorBody() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");

  const cVal = parseFloat(cost);
  const rVal = parseFloat(revenue);

  const profit = !isNaN(cVal) && !isNaN(rVal) ? rVal - cVal : 0;
  const margin = !isNaN(cVal) && !isNaN(rVal) && rVal > 0 ? (profit / rVal) * 100 : 0;
  const markup = !isNaN(cVal) && !isNaN(rVal) && cVal > 0 ? (profit / cVal) * 100 : 0;

  return (
    <ToolContainer split="sidebar">
      
      {/* Inputs */}
      <ToolSidebar>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl flex flex-col gap-5">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-500" />
            Pricing Inputs
          </h3>
          
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Item Cost</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">$</span>
              <input 
                type="number" 
                value={cost} onChange={(e) => setCost(e.target.value)} 
                className="w-full p-3 pl-8 border border-slate-200 dark:border-slate-700 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                placeholder="50" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Sale Price (Revenue)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">$</span>
              <input 
                type="number" 
                value={revenue} onChange={(e) => setRevenue(e.target.value)} 
                className="w-full p-3 pl-8 border border-slate-200 dark:border-slate-700 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                placeholder="120" 
              />
            </div>
          </div>
        </div>
      </ToolSidebar>

      {/* Outputs */}
      <ToolMain className="gap-6">
        <div className="flex-1 rounded-3xl border-2 border-indigo-200 bg-indigo-50 dark:bg-indigo-500/10 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-black font-mono tracking-tight mb-2 text-indigo-600">
              {margin.toFixed(2)}%
            </h2>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Margin</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-white/50 text-center">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Gross Profit</p>
              <p className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300">
                ${profit.toFixed(2)}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-white/50 text-center">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Markup</p>
              <p className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300">
                {markup.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 shadow-sm">
          <h4 className="text-white dark:text-slate-900 font-bold mb-3">Margin vs Markup</h4>
          <div className="flex gap-4">
            <div className="flex-1 bg-white dark:bg-slate-900/5 p-4 rounded-xl">
              <p className="text-indigo-400 font-bold text-sm mb-1">Margin (Profit / Revenue)</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed">Percentage of the selling price that is profit. A margin can never exceed 100%.</p>
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900/5 p-4 rounded-xl">
              <p className="text-teal-400 font-bold text-sm mb-1">Markup (Profit / Cost)</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed">Percentage added to the cost to get the selling price. Can easily exceed 100%.</p>
            </div>
          </div>
        </div>
      </ToolMain>

    </ToolContainer>
  );
}
