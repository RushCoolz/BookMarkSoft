"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function BacCalcBody() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<string>("160");
  const [drinks, setDrinks] = useState<string>("3");
  const [hours, setHours] = useState<string>("2");

  const [bac, setBac] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [color, setColor] = useState<string>("text-green-500");
  const [bg, setBg] = useState<string>("bg-green-50 dark:bg-green-900/20");
  const [border, setBorder] = useState<string>("border-green-200 dark:border-green-800/50");

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(drinks) || 0;
    const h = parseFloat(hours) || 0;

    if (w === 0) {
      setBac(0);
      setStatus("Sober");
      setColor("text-green-500");
      setBg("bg-green-50 dark:bg-green-900/20");
      setBorder("border-green-200 dark:border-green-800/50");
      return;
    }

    // Widmark Formula for BAC
    // BAC = [Alcohol consumed in grams / (Body weight in grams * r)] * 100 - (0.015 * hours)
    // 1 standard US drink = 14 grams of alcohol
    const alcoholGrams = d * 14;
    
    let weightGrams = 0;
    if (unit === "imperial") {
      weightGrams = w * 453.592;
    } else {
      weightGrams = w * 1000;
    }

    const r = gender === "male" ? 0.68 : 0.55;
    
    let calculatedBac = ((alcoholGrams / (weightGrams * r)) * 100) - (0.015 * h);
    if (calculatedBac < 0) calculatedBac = 0;

    setBac(parseFloat(calculatedBac.toFixed(3)));

    if (calculatedBac === 0) {
      setStatus("Sober");
      setColor("text-green-500");
      setBg("bg-green-50 dark:bg-green-900/20");
      setBorder("border-green-200 dark:border-green-800/50");
    } else if (calculatedBac > 0 && calculatedBac <= 0.03) {
      setStatus("Mild Impairment");
      setColor("text-yellow-600 dark:text-yellow-500");
      setBg("bg-yellow-50 dark:bg-yellow-900/20");
      setBorder("border-yellow-200 dark:border-yellow-800/50");
    } else if (calculatedBac > 0.03 && calculatedBac <= 0.07) {
      setStatus("Impaired");
      setColor("text-orange-500");
      setBg("bg-orange-50 dark:bg-orange-900/20");
      setBorder("border-orange-200 dark:border-orange-800/50");
    } else if (calculatedBac >= 0.08 && calculatedBac <= 0.20) {
      setStatus("Legally Intoxicated (Do Not Drive)");
      setColor("text-red-500");
      setBg("bg-red-50 dark:bg-red-900/20");
      setBorder("border-red-200 dark:border-red-800/50");
    } else {
      setStatus("Severe Intoxication (Danger)");
      setColor("text-purple-600");
      setBg("bg-purple-50 dark:bg-purple-900/20");
      setBorder("border-purple-200 dark:border-purple-800/50");
    }

  }, [unit, gender, weight, drinks, hours]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                <button onClick={() => setUnit("imperial")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "imperial" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Lbs</button>
                <button onClick={() => setUnit("metric")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "metric" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Kg</button>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                <button onClick={() => setGender("male")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === "male" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Male</button>
                <button onClick={() => setGender("female")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === "female" ? 'bg-white dark:bg-slate-900 shadow-sm text-pink-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Female</button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight ({unit === "imperial" ? "lbs" : "kg"})</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Number of Drinks</label>
                <span className="text-xs text-slate-400">1 Drink = 12oz beer / 5oz wine / 1.5oz liquor</span>
              </div>
              <input type="number" step="0.5" value={drinks} onChange={(e) => setDrinks(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Time since first drink (Hours)</label>
              <input type="number" step="0.5" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-blue-500/50" />
            </div>

          </div>

          {/* Results */}
          <div className={`flex-1 border rounded-3xl p-8 flex flex-col justify-center text-center transition-colors duration-300 ${bg} ${border}`}>
            
            <p className={`${color} font-bold uppercase tracking-wider text-sm mb-4`}>Estimated BAC</p>
            
            <div className="text-7xl md:text-8xl font-black text-slate-800 dark:text-slate-100 mb-2">
              {bac.toFixed(3)}
              <span className="text-3xl text-slate-500 ml-1">%</span>
            </div>
            
            <p className={`text-xl font-bold mt-4 ${color}`}>{status}</p>
            
            {bac >= 0.08 && (
              <p className="mt-4 text-sm font-bold text-red-500 uppercase tracking-wider">
                Do not drive or operate machinery!
              </p>
            )}
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-8 leading-relaxed max-w-sm mx-auto">
              * This is an estimate based on the Widmark formula. Actual BAC can vary wildly based on food consumed, metabolism, and genetics. Never rely on an online calculator to determine if it is safe to drive.
            </p>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
