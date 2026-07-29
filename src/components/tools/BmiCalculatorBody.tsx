"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Activity } from "lucide-react";

export function BmiCalculatorBody() {
  const [system, setSystem] = useState<"metric" | "imperial">("metric");
  
  // Metric
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");
  
  // Imperial
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [lbs, setLbs] = useState("");

  const [age, setAge] = useState("25");
  const [gender, setGender] = useState<"male" | "female">("male");

  const calculate = () => {
    let w = 0; // weight in kg
    let h = 0; // height in cm
    
    if (system === "metric") {
      w = parseFloat(kg);
      h = parseFloat(cm);
    } else {
      w = parseFloat(lbs) * 0.453592;
      h = (parseFloat(feet || "0") * 30.48) + (parseFloat(inches || "0") * 2.54);
    }

    let a = parseFloat(age);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return { bmi: 0, bmr: 0, category: "" };

    const bmi = w / ((h / 100) * (h / 100));
    
    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * (isNaN(a) ? 25 : a));
    if (gender === "male") bmr += 5;
    else bmr -= 161;

    let cat = "Normal";
    let color = "text-green-500";
    if (bmi < 18.5) { cat = "Underweight"; color = "text-blue-500"; }
    else if (bmi >= 25 && bmi < 30) { cat = "Overweight"; color = "text-yellow-500"; }
    else if (bmi >= 30) { cat = "Obese"; color = "text-red-500"; }

    return { bmi, bmr, category: cat, color };
  };

  const res = calculate();

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Activity className="w-6 h-6 text-pink-500" />
              Advanced BMI & BMR Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Calculate your Body Mass Index and daily resting calorie needs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-center gap-4 mb-6">
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <input type="radio" checked={system === "metric"} onChange={() => setSystem("metric")} /> Metric
              </label>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <input type="radio" checked={system === "imperial"} onChange={() => setSystem("imperial")} /> Imperial
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {system === "metric" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
                    <input type="number" value={cm} onChange={e => setCm(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
                    <input type="number" value={kg} onChange={e => setKg(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Height (ft)</label>
                      <input type="number" value={feet} onChange={e => setFeet(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">(in)</label>
                      <input type="number" value={inches} onChange={e => setInches(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Weight (lbs)</label>
                    <input type="number" value={lbs} onChange={e => setLbs(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Age</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gender</label>
                <select value={gender} onChange={e => setGender(e.target.value as any)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {res.bmi > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-sm text-slate-500 mb-1">Your BMI</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{res.bmi.toFixed(1)}</div>
                  <div className={`font-bold ${res.color}`}>{res.category}</div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-center">
                  <div className="text-sm text-slate-500 mb-1">BMR (Basal Metabolic Rate)</div>
                  <div className="text-3xl font-bold text-pink-500 mb-1">{Math.round(res.bmr)} kcal</div>
                  <div className="text-xs text-slate-400">Calories burned at rest daily</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
