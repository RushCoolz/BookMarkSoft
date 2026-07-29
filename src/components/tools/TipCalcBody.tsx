"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function TipCalcBody() {
  const [bill, setBill] = useState<string>("50");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [people, setPeople] = useState<string>("1");

  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [tipPerPerson, setTipPerPerson] = useState<number>(0);
  const [totalPerPerson, setTotalPerPerson] = useState<number>(0);

  useEffect(() => {
    const b = parseFloat(bill) || 0;
    const p = parseInt(people) || 1;
    
    const tip = b * (tipPercentage / 100);
    const total = b + tip;
    
    setTipAmount(tip);
    setTotalAmount(total);
    setTipPerPerson(tip / p);
    setTotalPerPerson(total / p);
  }, [bill, tipPercentage, people]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bill Amount ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 text-2xl font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500/50" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tip Percentage</label>
                <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-3 py-1 rounded-md font-bold text-sm">{tipPercentage}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="50" step="1" 
                value={tipPercentage} 
                onChange={(e) => setTipPercentage(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500" 
              />
              <div className="flex gap-2">
                {[10, 15, 18, 20, 25].map(pct => (
                  <button 
                    key={pct}
                    onClick={() => setTipPercentage(pct)}
                    className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${tipPercentage === pct ? 'bg-sky-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Number of People</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setPeople(Math.max(1, parseInt(people) - 1).toString())}
                  className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                >-</button>
                <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} min="1" className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-center text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500/50" />
                <button 
                  onClick={() => setPeople((parseInt(people) + 1).toString())}
                  className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                >+</button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-3xl p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-slate-500 font-medium">Tip Amount</p>
                  {parseInt(people) > 1 && <p className="text-xs text-sky-600 font-bold uppercase tracking-wider">/ person</p>}
                </div>
                <div className="text-4xl font-bold text-sky-600">
                  ${(parseInt(people) > 1 ? tipPerPerson : tipAmount).toFixed(2)}
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-slate-500 font-medium">Total</p>
                  {parseInt(people) > 1 && <p className="text-xs text-sky-600 font-bold uppercase tracking-wider">/ person</p>}
                </div>
                <div className="text-5xl font-black text-slate-800 dark:text-slate-100">
                  ${(parseInt(people) > 1 ? totalPerPerson : totalAmount).toFixed(2)}
                </div>
              </div>
            </div>

            {parseInt(people) > 1 && (
              <div className="mt-8 pt-6 border-t border-sky-200 dark:border-sky-900/50 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-500">Total Tip</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300">${tipAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-500">Total Bill</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            )}

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
