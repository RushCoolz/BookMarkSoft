"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function AutoLoanCalcBody() {
  const [vehiclePrice, setVehiclePrice] = useState<string>("35000");
  const [downPayment, setDownPayment] = useState<string>("5000");
  const [tradeInValue, setTradeInValue] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("5.5");
  const [loanTerm, setLoanTerm] = useState<string>("60");
  const [salesTaxRate, setSalesTaxRate] = useState<string>("7");

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPrincipal, setTotalPrincipal] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeInValue) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseInt(loanTerm) || 0;
    const taxRate = parseFloat(salesTaxRate) || 0;

    const salesTax = price * (taxRate / 100);
    const loanAmount = price + salesTax - down - trade;
    
    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      setTotalPrincipal(0);
      setTotalInterest(0);
      setTotalCost(price + salesTax);
      return;
    }

    if (rate === 0) {
      setMonthlyPayment(loanAmount / months);
      setTotalPrincipal(loanAmount);
      setTotalInterest(0);
      setTotalCost(price + salesTax);
      return;
    }

    const r = (rate / 100) / 12;
    const n = months;
    
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
    const monthly = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalInt = (monthly * n) - loanAmount;

    setMonthlyPayment(monthly);
    setTotalPrincipal(loanAmount);
    setTotalInterest(totalInt);
    setTotalCost(price + salesTax + totalInt);

  }, [vehiclePrice, downPayment, tradeInValue, interestRate, loanTerm, salesTaxRate]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Vehicle Price ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-purple-500/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Down Payment</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-purple-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Trade-In Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input type="number" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold focus:ring-2 focus:ring-purple-500/50" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-purple-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Term (Months)</label>
                <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-purple-500/50">
                  <option value="24">24 Months (2 Years)</option>
                  <option value="36">36 Months (3 Years)</option>
                  <option value="48">48 Months (4 Years)</option>
                  <option value="60">60 Months (5 Years)</option>
                  <option value="72">72 Months (6 Years)</option>
                  <option value="84">84 Months (7 Years)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sales Tax Rate (%)</label>
              <input type="number" step="0.1" value={salesTaxRate} onChange={(e) => setSalesTaxRate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-purple-500/50" />
            </div>

          </div>

          {/* Results */}
          <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-3xl p-8 flex flex-col justify-between">
            
            <div>
              <p className="text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider text-sm mb-2">Estimated Monthly Payment</p>
              <div className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100">${monthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <p className="text-sm text-slate-500 mt-2">For {loanTerm} months at {interestRate}% APR</p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-purple-200 dark:border-purple-800/50 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Total Principal Amount</p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">${totalPrincipal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Total Interest Paid</p>
                <p className="text-lg font-bold text-red-500 dark:text-red-400">${totalInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <p className="text-slate-700 dark:text-slate-300 font-bold">Total Cost of Vehicle</p>
                <p className="text-xl font-black text-slate-800 dark:text-slate-100">${totalCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <p className="text-xs text-center text-slate-400 pt-2">* Total Cost includes vehicle price, sales tax, and total interest paid.</p>
            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
