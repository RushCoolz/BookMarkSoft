"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function MacroCalcBody() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("30");
  
  // Metric
  const [weightKg, setWeightKg] = useState<string>("70");
  const [heightCm, setHeightCm] = useState<string>("170");
  
  // Imperial
  const [weightLbs, setWeightLbs] = useState<string>("150");
  const [heightIn, setHeightIn] = useState<string>("67");

  const [activity, setActivity] = useState<string>("1.55"); // Moderately active
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");

  const [calories, setCalories] = useState<number>(0);
  const [macros, setMacros] = useState({ protein: 0, fat: 0, carbs: 0 });

  useEffect(() => {
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
      setCalories(0);
      setMacros({ protein: 0, fat: 0, carbs: 0 });
      return;
    }

    // Mifflin-St Jeor
    let bmr = (10 * weight) + (6.25 * height) - (5 * a);
    if (gender === "male") bmr += 5;
    else bmr -= 161;

    let tdee = bmr * parseFloat(activity);

    if (goal === "cut") tdee -= 500; // 500 calorie deficit
    if (goal === "bulk") tdee += 500; // 500 calorie surplus
    
    // Macros split (general recommendation)
    // Protein: 2.2g per kg of body weight (approx 1g per lb)
    // Fat: 25% of total calories
    // Carbs: Remaining calories
    
    const proteinGrams = Math.round(weight * 2.2); // 2.2g per kg
    const fatCalories = tdee * 0.25;
    const fatGrams = Math.round(fatCalories / 9);
    
    const remainingCalories = tdee - (proteinGrams * 4) - fatCalories;
    const carbGrams = Math.max(0, Math.round(remainingCalories / 4));

    setCalories(Math.round(tdee));
    setMacros({ protein: proteinGrams, fat: fatGrams, carbs: carbGrams });

  }, [unit, gender, age, weightKg, heightCm, weightLbs, heightIn, activity, goal]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
          
          {/* Inputs */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                <button onClick={() => setUnit("metric")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "metric" ? 'bg-white dark:bg-slate-900 shadow-sm text-green-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Metric</button>
                <button onClick={() => setUnit("imperial")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${unit === "imperial" ? 'bg-white dark:bg-slate-900 shadow-sm text-green-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Imperial</button>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                <button onClick={() => setGender("male")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === "male" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Male</button>
                <button onClick={() => setGender("female")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === "female" ? 'bg-white dark:bg-slate-900 shadow-sm text-pink-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Female</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-green-500/50" />
              </div>
              
              {unit === "metric" ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (kg)</label>
                    <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-green-500/50" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Height (cm)</label>
                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-green-500/50" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (lbs)</label>
                    <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-green-500/50" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Total Height (inches)</label>
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-green-500/50" />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Activity Level</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-green-500/50">
                <option value="1.2">Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Super Active (physical job)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Goal</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                <button onClick={() => setGoal("cut")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${goal === "cut" ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Cut (Lose)</button>
                <button onClick={() => setGoal("maintain")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${goal === "maintain" ? 'bg-green-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Maintain</button>
                <button onClick={() => setGoal("bulk")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${goal === "bulk" ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Bulk (Gain)</button>
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="flex-1 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-3xl p-8 flex flex-col justify-between">
            
            <div className="text-center">
              <p className="text-green-700 dark:text-green-400 font-bold uppercase tracking-wider text-sm mb-2">Daily Calorie Target</p>
              <div className="text-6xl font-black text-slate-800 dark:text-slate-100">{calories.toLocaleString()}</div>
              <p className="text-sm text-slate-500 mt-2">Calories per day</p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-green-200 dark:border-green-800/50">
              <p className="text-green-700 dark:text-green-400 font-bold uppercase tracking-wider text-sm mb-4 text-center">Recommended Macros</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-2xl text-center border border-blue-200 dark:border-blue-800/50">
                  <p className="text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">Protein</p>
                  <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{macros.protein}g</div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/40 p-4 rounded-2xl text-center border border-yellow-200 dark:border-yellow-800/50">
                  <p className="text-yellow-700 dark:text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1">Fats</p>
                  <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{macros.fat}g</div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/40 p-4 rounded-2xl text-center border border-orange-200 dark:border-orange-800/50">
                  <p className="text-orange-700 dark:text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">Carbs</p>
                  <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{macros.carbs}g</div>
                </div>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="mt-6 flex h-4 w-full rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${(macros.protein * 4 / calories) * 100}%` }}></div>
              <div className="bg-yellow-500 h-full" style={{ width: `${(macros.fat * 9 / calories) * 100}%` }}></div>
              <div className="bg-orange-500 h-full" style={{ width: `${(macros.carbs * 4 / calories) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 px-2 uppercase tracking-wider">
              <span>{(macros.protein * 4 / calories * 100).toFixed(0)}% P</span>
              <span>{(macros.fat * 9 / calories * 100).toFixed(0)}% F</span>
              <span>{(macros.carbs * 4 / calories * 100).toFixed(0)}% C</span>
            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
