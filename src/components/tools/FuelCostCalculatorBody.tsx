"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Map, Fuel } from "lucide-react";

export function FuelCostCalculatorBody() {
  const [distance, setDistance] = useState("100");
  const [mpg, setMpg] = useState("25");
  const [price, setPrice] = useState("3.50");
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial"); // imperial: miles, mpg, $/gal. metric: km, L/100km, $/L

  const calc = () => {
    let d = parseFloat(distance);
    let m = parseFloat(mpg);
    let p = parseFloat(price);
    if (isNaN(d) || isNaN(m) || isNaN(p) || m === 0) return 0;

    if (unit === "imperial") {
      // cost = (distance / mpg) * price
      return (d / m) * p;
    } else {
      // cost = (distance / 100) * L/100km * price
      return (d / 100) * m * p;
    }
  };

  const fuelNeeded = () => {
    let d = parseFloat(distance);
    let m = parseFloat(mpg);
    if (isNaN(d) || isNaN(m) || m === 0) return 0;

    if (unit === "imperial") return d / m; // gallons
    return (d / 100) * m; // liters
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Fuel className="w-6 h-6 text-green-500" />
              Trip Fuel Cost Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Calculate exactly how much fuel and money your road trip will cost.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === "imperial" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                >
                  Imperial (Miles, MPG, Gal)
                </button>
                <button
                  onClick={() => setUnit("metric")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === "metric" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                >
                  Metric (KM, L/100km, Liter)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Trip Distance ({unit === "imperial" ? "Miles" : "KM"})
                </label>
                <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Efficiency ({unit === "imperial" ? "MPG" : "L/100km"})
                </label>
                <input type="number" value={mpg} onChange={e => setMpg(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Fuel Price ({unit === "imperial" ? "$/Gallon" : "$/Liter"})
                </label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800/30 text-center">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Total Trip Cost</div>
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-4">
                ${calc().toFixed(2)}
              </div>
              <div className="flex justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
                <div>
                  <Map className="w-4 h-4 inline mr-1" />
                  {distance || 0} {unit === "imperial" ? "miles" : "km"}
                </div>
                <div>
                  <Fuel className="w-4 h-4 inline mr-1" />
                  {fuelNeeded().toFixed(2)} {unit === "imperial" ? "gallons" : "liters"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
