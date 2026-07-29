"use client";
import { useState } from "react";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";
import { ToolContainer, ToolSidebar, ToolMain } from "../ui/tool/ToolContainer";

export function RoiCalculatorBody() {
  const [initial, setInitial] = useState("");
  const [final, setFinal] = useState("");
  const [years, setYears] = useState("1");

  const iVal = parseFloat(initial);
  const fVal = parseFloat(final);
  const yVal = parseFloat(years);

  const profit = !isNaN(iVal) && !isNaN(fVal) ? fVal - iVal : 0;
  const roi = !isNaN(iVal) && !isNaN(fVal) && iVal > 0 ? (profit / iVal) * 100 : 0;
  
  // Annualized ROI = ((Final / Initial) ^ (1 / Years)) - 1
  let annualized = 0;
  if (!isNaN(iVal) && !isNaN(fVal) && !isNaN(yVal) && iVal > 0 && yVal > 0) {
    annualized = (Math.pow(fVal / iVal, 1 / yVal) - 1) * 100;
  }

  const isProfit = profit >= 0;

  return (
    <ToolContainer split="sidebar">
      
      {/* Inputs */}
      <ToolSidebar>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl flex flex-col gap-5">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            Investment Details
          </h3>
          
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Initial Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">$</span>
              <input 
                type="number" 
                value={initial} onChange={(e) => setInitial(e.target.value)} 
                className="w-full p-3 pl-8 border border-slate-200 dark:border-slate-700 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                placeholder="10000" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Final Return Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">$</span>
              <input 
                type="number" 
                value={final} onChange={(e) => setFinal(e.target.value)} 
                className="w-full p-3 pl-8 border border-slate-200 dark:border-slate-700 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                placeholder="12500" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
               <Calendar className="w-3 h-3" /> Time Invested (Years)
            </label>
            <input 
              type="number" 
              value={years} onChange={(e) => setYears(e.target.value)} 
              className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
              placeholder="1" 
              min="0.1" step="0.1"
            />
          </div>
        </div>
      </ToolSidebar>

      {/* Outputs */}
      <ToolMain className="gap-6">
        <div className={`flex-1 rounded-3xl border-2 p-8 flex flex-col justify-center transition-colors ${!initial || !final ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50' : isProfit ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
          <div className="text-center mb-8">
            <h2 className={`text-5xl font-black font-mono tracking-tight mb-2 ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
              {roi.toFixed(2)}%
            </h2>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Return on Investment</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-white/50 text-center">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Net Profit / Loss</p>
              <p className={`text-2xl font-bold font-mono ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
                {profit > 0 ? "+" : ""}${profit.toFixed(2)}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-white/50 text-center">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Annualized ROI</p>
              <p className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300">
                {annualized.toFixed(2)}% <span className="text-xs text-slate-400 dark:text-slate-500">/ yr</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 shadow-sm flex items-start gap-4">
          <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-white font-bold mb-1">Why Annualized ROI matters</h4>
            <p className="text-slate-400 text-sm">
              Total ROI tells you your overall profit, but Annualized ROI standardizes the return to a yearly rate. This allows you to accurately compare a 5-year investment against a 1-year investment (like comparing real estate to a 5% high-yield savings account).
            </p>
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
