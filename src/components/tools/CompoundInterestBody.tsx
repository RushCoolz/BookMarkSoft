"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function CompoundInterestBody() {
  const [initialInvestment, setInitialInvestment] = useState<string>("5000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("100");
  const [years, setYears] = useState<string>("10");
  const [interestRate, setInterestRate] = useState<string>("7");
  const [compoundFrequency, setCompoundFrequency] = useState<string>("12"); // 12 = monthly

  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const P = parseFloat(initialInvestment) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const t = parseFloat(years) || 0;
    const r = parseFloat(interestRate) / 100 || 0;
    const n = parseInt(compoundFrequency) || 12;

    if (t === 0) {
      setTotalBalance(P);
      setTotalContributions(P);
      setTotalInterest(0);
      return;
    }

    // A = P(1 + r/n)^(nt) + PMT * [ ((1 + r/n)^(nt) - 1) / (r/n) ]
    let A = 0;
    if (r === 0) {
      A = P + (PMT * 12 * t);
    } else {
      const compoundFactor = Math.pow(1 + r/n, n * t);
      const principalGrowth = P * compoundFactor;
      
      // We assume PMT is made at the END of each month. 
      // To match monthly contributions with varying compound frequencies accurately requires complex integration,
      // but standard approach (assuming PMT matches compound freq, or we just calculate it monthly and compound annually etc)
      // Here we will do the standard formula where PMT frequency matches compound frequency for simplicity.
      // If PMT is monthly (12) and compound is annually (1), we should adjust.
      // For a web tool, we'll assume PMT is made at the compound frequency interval.
      // So let's re-interpret PMT as "Contribution per compound period"
      const pmtAdjusted = (PMT * 12) / n;
      
      const futureValueSeries = pmtAdjusted * ((compoundFactor - 1) / (r/n));
      A = principalGrowth + futureValueSeries;
    }

    const totalContribs = P + (PMT * 12 * t);
    
    setTotalBalance(A);
    setTotalContributions(totalContribs);
    setTotalInterest(A - totalContribs);

  }, [initialInvestment, monthlyContribution, years, interestRate, compoundFrequency]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Initial Investment ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Monthly Contribution ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Years to Grow</label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Compound Frequency</label>
              <select value={compoundFrequency} onChange={(e) => setCompoundFrequency(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-emerald-500/50">
                <option value="1">Annually (1/yr)</option>
                <option value="2">Semi-Annually (2/yr)</option>
                <option value="4">Quarterly (4/yr)</option>
                <option value="12">Monthly (12/yr)</option>
                <option value="365">Daily (365/yr)</option>
              </select>
            </div>

          </div>

          {/* Results */}
          <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-8 flex flex-col justify-between">
            
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2">Total Future Balance</p>
              <div className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100">${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-emerald-200 dark:border-emerald-800/50 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Total Contributions</p>
                </div>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">${totalContributions.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Total Interest Earned</p>
                </div>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-500">${Math.max(0, totalInterest).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="mt-8 flex h-4 w-full rounded-full overflow-hidden">
              <div className="bg-slate-400 h-full" style={{ width: `${(totalContributions / totalBalance) * 100}%` }}></div>
              <div className="bg-emerald-500 h-full" style={{ width: `${(totalInterest / totalBalance) * 100}%` }}></div>
            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
