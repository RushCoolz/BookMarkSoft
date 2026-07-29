"use client";
import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function BmiCalcBody() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  
  // Metric
  const [weightKg, setWeightKg] = useState<string>("70");
  const [heightCm, setHeightCm] = useState<string>("170");
  
  // Imperial
  const [weightLbs, setWeightLbs] = useState<string>("150");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("7");

  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [color, setColor] = useState<string>("text-slate-500");

  const calculateBmi = () => {
    let finalBmi = 0;
    
    if (unit === "metric") {
      const kg = parseFloat(weightKg);
      const m = parseFloat(heightCm) / 100;
      if (!kg || !m) return;
      finalBmi = kg / (m * m);
    } else {
      const lbs = parseFloat(weightLbs);
      const inches = (parseFloat(heightFt) * 12) + parseFloat(heightIn || "0");
      if (!lbs || !inches) return;
      finalBmi = 703 * (lbs / (inches * inches));
    }

    setBmi(parseFloat(finalBmi.toFixed(1)));

    if (finalBmi < 18.5) {
      setCategory("Underweight");
      setColor("text-blue-500");
    } else if (finalBmi >= 18.5 && finalBmi <= 24.9) {
      setCategory("Normal Weight");
      setColor("text-green-500");
    } else if (finalBmi >= 25 && finalBmi <= 29.9) {
      setCategory("Overweight");
      setColor("text-orange-500");
    } else {
      setCategory("Obese");
      setColor("text-red-500");
    }
  };

  useEffect(() => {
    calculateBmi();
  }, [unit, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-xl mx-auto w-full space-y-6">
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-max mx-auto mb-8">
            <button 
              onClick={() => setUnit("metric")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${unit === "metric" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Metric (kg/cm)
            </button>
            <button 
              onClick={() => setUnit("imperial")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${unit === "imperial" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Imperial (lbs/ft)
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {unit === "metric" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (kg)</label>
                  <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Height (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (lbs)</label>
                  <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div className="space-y-2 flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Height (ft)</label>
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Height (in)</label>
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <h4 className="text-slate-500 dark:text-slate-400 font-medium mb-2 uppercase tracking-wider text-sm">Your BMI Result</h4>
            <div className={`text-6xl font-black ${color} mb-2`}>
              {bmi || "0.0"}
            </div>
            <div className={`text-xl font-bold ${color}`}>
              {category || "-"}
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
