"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ArrowRightLeft, RefreshCw, DollarSign } from "lucide-react";

export function CurrencyConverterBody() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchRates = async (currency: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`);
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      setRates(data[currency.toLowerCase()]);
      setLastUpdated(data.date);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(base);
  }, [base]);

  const swap = () => {
    setBase(target);
    setTarget(base);
  };

  const calculateResult = () => {
    if (base === target) return amount;
    return (amount * (rates[target] || 0)).toFixed(2);
  };

  const availableCurrencies = Array.from(new Set([base, ...Object.keys(rates)])).sort();

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Live Exchange Rates</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Currency Converter
              </p>
              {lastUpdated && <p className="text-sm font-medium text-slate-500 mt-2">Rates updated: {lastUpdated}</p>}
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full items-center justify-center text-emerald-500">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Amount</label>
                <input 
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">From</label>
                  <select 
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    {availableCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <button 
                  onClick={swap}
                  className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <ArrowRightLeft className="w-6 h-6" />
                </button>

                <div className="w-full">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">To</label>
                  <select 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    {availableCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="text-center space-y-2">
                <p className="text-slate-500 dark:text-slate-400 font-medium">{amount} {base} =</p>
                <p className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-tight">
                  {calculateResult()} <span className="text-2xl text-slate-400">{target}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
