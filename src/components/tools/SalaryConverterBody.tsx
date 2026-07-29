"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function SalaryConverterBody() {
  const [amount, setAmount] = useState<string>("50000");
  const [period, setPeriod] = useState<"hourly" | "daily" | "weekly" | "biweekly" | "monthly" | "yearly">("yearly");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("5");

  const [results, setResults] = useState({
    hourly: 0,
    daily: 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
    yearly: 0
  });

  useEffect(() => {
    const amt = parseFloat(amount) || 0;
    const hoursWk = parseFloat(hoursPerWeek) || 40;
    const daysWk = parseFloat(daysPerWeek) || 5;
    
    const weeksPerYear = 52;
    const monthsPerYear = 12;
    
    let annual = 0;
    
    switch (period) {
      case "hourly":
        annual = amt * hoursWk * weeksPerYear;
        break;
      case "daily":
        annual = amt * daysWk * weeksPerYear;
        break;
      case "weekly":
        annual = amt * weeksPerYear;
        break;
      case "biweekly":
        annual = amt * (weeksPerYear / 2);
        break;
      case "monthly":
        annual = amt * monthsPerYear;
        break;
      case "yearly":
        annual = amt;
        break;
    }

    setResults({
      hourly: annual / weeksPerYear / hoursWk,
      daily: annual / weeksPerYear / daysWk,
      weekly: annual / weeksPerYear,
      biweekly: annual / (weeksPerYear / 2),
      monthly: annual / monthsPerYear,
      yearly: annual
    });
  }, [amount, period, hoursPerWeek, daysPerWeek]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6 md:max-w-sm">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Salary Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Time Period</label>
              <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hours / Week</label>
                <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50 text-center" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Days / Week</label>
                <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50 text-center" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <p className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wider">Hourly</p>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">${results.hourly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <p className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wider">Daily</p>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">${results.daily.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <p className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wider">Weekly</p>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">${results.weekly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                <p className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wider">Bi-Weekly</p>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">${results.biweekly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 flex flex-col justify-center shadow-sm col-span-1 sm:col-span-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end">
                  <div>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-1 uppercase tracking-wider">Monthly</p>
                    <div className="text-3xl font-black text-slate-800 dark:text-slate-100">${results.monthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-1 uppercase tracking-wider">Yearly</p>
                    <div className="text-4xl font-black text-emerald-600 dark:text-emerald-500">${results.yearly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
