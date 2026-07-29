"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function MortgageCalcBody() {
  const [homePrice, setHomePrice] = useState<string>("300000");
  const [downPayment, setDownPayment] = useState<string>("60000");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [propertyTax, setPropertyTax] = useState<string>("3600"); // Yearly
  const [homeInsurance, setHomeInsurance] = useState<string>("1200"); // Yearly

  const [monthlyPrincipalAndInterest, setMonthlyPrincipalAndInterest] = useState<number>(0);
  const [monthlyTax, setMonthlyTax] = useState<number>(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState<number>(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm) || 30;
    const yearlyTax = parseFloat(propertyTax) || 0;
    const yearlyInsurance = parseFloat(homeInsurance) || 0;

    const principal = price - down;
    
    let pni = 0;
    if (principal > 0 && rate > 0) {
      const r = (rate / 100) / 12;
      const n = years * 12;
      pni = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (principal > 0 && rate === 0) {
      pni = principal / (years * 12);
    }

    const tax = yearlyTax / 12;
    const insurance = yearlyInsurance / 12;

    setMonthlyPrincipalAndInterest(pni);
    setMonthlyTax(tax);
    setMonthlyInsurance(insurance);
    setTotalMonthlyPayment(pni + tax + insurance);

  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, homeInsurance]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Home Price ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Down Payment ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Term (Years)</label>
                <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50">
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Yearly Property Tax</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Yearly Home Ins.</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-3xl p-8 flex flex-col justify-between">
            
            <div>
              <p className="text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider text-sm mb-2">Total Monthly Payment</p>
              <div className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100">${totalMonthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-800/50 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Principal & Interest</p>
                </div>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">${monthlyPrincipalAndInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Property Tax</p>
                </div>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">${monthlyTax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Home Insurance</p>
                </div>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">${monthlyInsurance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="mt-8 flex h-4 w-full rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${(monthlyPrincipalAndInterest / totalMonthlyPayment) * 100}%` }}></div>
              <div className="bg-indigo-500 h-full" style={{ width: `${(monthlyTax / totalMonthlyPayment) * 100}%` }}></div>
              <div className="bg-sky-500 h-full" style={{ width: `${(monthlyInsurance / totalMonthlyPayment) * 100}%` }}></div>
            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
