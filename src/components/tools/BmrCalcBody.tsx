"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function BmrCalcBody() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("30");
  
  // Metric
  const [weightKg, setWeightKg] = useState<string>("70");
  const [heightCm, setHeightCm] = useState<string>("170");
  
  // Imperial
  const [weightLbs, setWeightLbs] = useState<string>("150");
  const [heightIn, setHeightIn] = useState<string>("67");

  const [activity, setActivity] = useState<string>("1.2"); // Sedentary by default
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);

  const calculateBmr = () => {
    let weight = 0;
    let height = 0;
    const a = parseFloat(age) || 0;

    if (unit === "metric") {
      weight = parseFloat(weightKg) || 0;
      height = parseFloat(heightCm) || 0;
    } else {
      weight = (parseFloat(weightLbs) || 0) * 0.453592;
      height = (parseFloat(heightIn) || 0) * 2.54;
    }

    if (!weight || !height || !a) {
      setBmr(0);
      setTdee(0);
      return;
    }

    // Mifflin-St Jeor Equation
    let calculatedBmr = (10 * weight) + (6.25 * height) - (5 * a);
    if (gender === "male") {
      calculatedBmr += 5;
    } else {
      calculatedBmr -= 161;
    }

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedBmr * parseFloat(activity)));
  };

  useEffect(() => {
    calculateBmr();
  }, [unit, gender, age, weightKg, heightCm, weightLbs, heightIn, activity]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
              <button onClick={() => setUnit("metric")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "metric" ? 'bg-white dark:bg-slate-900 shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Metric</button>
              <button onClick={() => setUnit("imperial")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "imperial" ? 'bg-white dark:bg-slate-900 shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Imperial</button>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
              <button onClick={() => setGender("male")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === "male" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Male</button>
              <button onClick={() => setGender("female")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === "female" ? 'bg-white dark:bg-slate-900 shadow-sm text-pink-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Female</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-orange-500/50" />
              </div>
              
              {unit === "metric" ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (kg)</label>
                    <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-orange-500/50" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Height (cm)</label>
                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-orange-500/50" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (lbs)</label>
                    <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-orange-500/50" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Total Height (inches)</label>
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-orange-500/50" />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Activity Level</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-orange-500/50">
                <option value="1.2">Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Super Active (very hard exercise/physical job)</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-3xl p-8 flex flex-col justify-center text-center">
            <div className="mb-8">
              <p className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider text-sm mb-2">Basal Metabolic Rate</p>
              <div className="text-5xl font-black text-slate-800 dark:text-slate-100">{bmr} <span className="text-xl text-slate-500">kcal/day</span></div>
              <p className="text-sm text-slate-500 mt-2">Calories burned at rest</p>
            </div>
            
            <div className="h-px w-full bg-orange-200 dark:bg-orange-900/50 mb-8"></div>
            
            <div>
              <p className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider text-sm mb-2">Total Daily Energy Expenditure</p>
              <div className="text-5xl font-black text-slate-800 dark:text-slate-100">{tdee} <span className="text-xl text-slate-500">kcal/day</span></div>
              <p className="text-sm text-slate-500 mt-2">Calories to maintain current weight</p>
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
