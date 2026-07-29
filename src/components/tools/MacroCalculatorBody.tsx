"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { PieChart } from "lucide-react";

export function MacroCalculatorBody() {
  const [calories, setCalories] = useState("2000");
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [diet, setDiet] = useState<"balanced" | "lowcarb" | "highprotein">("balanced");

  const calcMacros = () => {
    let cal = parseFloat(calories);
    if (isNaN(cal) || cal <= 0) return { p: 0, c: 0, f: 0 };

    // Adjust calories based on goal
    if (goal === "cut") cal *= 0.8;
    else if (goal === "bulk") cal *= 1.15;

    // Macro splits (Protein, Carb, Fat percentages)
    let pPct = 0.3;
    let cPct = 0.4;
    let fPct = 0.3;

    if (diet === "lowcarb") {
      pPct = 0.4;
      cPct = 0.2;
      fPct = 0.4;
    } else if (diet === "highprotein") {
      pPct = 0.4;
      cPct = 0.35;
      fPct = 0.25;
    }

    // 1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal
    const pGrams = (cal * pPct) / 4;
    const cGrams = (cal * cPct) / 4;
    const fGrams = (cal * fPct) / 9;

    return { cal, p: pGrams, c: cGrams, f: fGrams };
  };

  const macros = calcMacros();

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <PieChart className="w-6 h-6 text-orange-500" />
              Macro Nutrient Split Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Calculate your daily protein, carb, and fat targets based on your goals.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Base TDEE (Calories)</label>
                <input type="number" value={calories} onChange={e => setCalories(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Goal</label>
                <select value={goal} onChange={e => setGoal(e.target.value as any)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
                  <option value="cut">Fat Loss (-20%)</option>
                  <option value="maintain">Maintenance</option>
                  <option value="bulk">Muscle Gain (+15%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Diet Type</label>
                <select value={diet} onChange={e => setDiet(e.target.value as any)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
                  <option value="balanced">Balanced (30P/40C/30F)</option>
                  <option value="lowcarb">Low Carb (40P/20C/40F)</option>
                  <option value="highprotein">High Protein (40P/35C/25F)</option>
                </select>
              </div>
            </div>

            {macros.cal > 0 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="text-sm text-slate-500">Target Daily Intake</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">{Math.round(macros.cal)} <span className="text-xl font-medium text-slate-500">kcal</span></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/50 text-center">
                    <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">Protein</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{Math.round(macros.p)}g</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50 text-center">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">Carbs</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{Math.round(macros.c)}g</div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/50 text-center">
                    <div className="text-sm font-bold text-yellow-600 dark:text-yellow-400 mb-1">Fat</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{Math.round(macros.f)}g</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
