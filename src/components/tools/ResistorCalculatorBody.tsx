"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Calculator } from "lucide-react";

const COLORS = [
  { name: "Black", val: 0, mult: 1, color: "bg-black text-white" },
  { name: "Brown", val: 1, mult: 10, tol: 1, color: "bg-amber-800 text-white" },
  { name: "Red", val: 2, mult: 100, tol: 2, color: "bg-red-500 text-white" },
  { name: "Orange", val: 3, mult: 1000, color: "bg-orange-500 text-white" },
  { name: "Yellow", val: 4, mult: 10000, color: "bg-yellow-400 text-black" },
  { name: "Green", val: 5, mult: 100000, tol: 0.5, color: "bg-green-500 text-white" },
  { name: "Blue", val: 6, mult: 1000000, tol: 0.25, color: "bg-blue-500 text-white" },
  { name: "Violet", val: 7, mult: 10000000, tol: 0.1, color: "bg-purple-500 text-white" },
  { name: "Gray", val: 8, tol: 0.05, color: "bg-gray-500 text-white" },
  { name: "White", val: 9, color: "bg-white text-black border border-gray-300" },
  { name: "Gold", mult: 0.1, tol: 5, color: "bg-yellow-600 text-white" },
  { name: "Silver", mult: 0.01, tol: 10, color: "bg-gray-300 text-black" },
];

export function ResistorCalculatorBody() {
  const [band1, setBand1] = useState(1); // Brown
  const [band2, setBand2] = useState(0); // Black
  const [multiplier, setMultiplier] = useState(2); // Red (100)
  const [tolerance, setTolerance] = useState(10); // Gold

  const calculate = () => {
    const b1 = COLORS[band1].val;
    const b2 = COLORS[band2].val;
    const mult = COLORS[multiplier].mult;
    if (b1 === undefined || b2 === undefined || mult === undefined) return 0;
    return (b1 * 10 + b2) * mult;
  };

  const formatOhms = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(2) + " MΩ";
    if (val >= 1000) return (val / 1000).toFixed(2) + " kΩ";
    return val.toFixed(2) + " Ω";
  };

  const tolVal = COLORS[tolerance].tol;

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-500" />
              Resistor Color Code Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Calculate resistance for standard 4-band resistors.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            {/* Visual Resistor */}
            <div className="flex justify-center items-center py-8">
              <div className="w-16 h-2 bg-gray-400"></div>
              <div className="relative w-64 h-24 bg-[#E2C792] rounded-xl flex items-center justify-evenly border-2 border-amber-800/30 overflow-hidden shadow-inner">
                <div className={`w-6 h-full ${COLORS[band1].color}`}></div>
                <div className={`w-6 h-full ${COLORS[band2].color}`}></div>
                <div className={`w-6 h-full ${COLORS[multiplier].color}`}></div>
                <div className="w-8"></div>
                <div className={`w-6 h-full ${COLORS[tolerance].color}`}></div>
              </div>
              <div className="w-16 h-2 bg-gray-400"></div>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Band 1 (1st Digit)</label>
                <select value={band1} onChange={(e) => setBand1(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  {COLORS.filter(c => c.val !== undefined).map((c, i) => (
                    <option key={c.name} value={COLORS.indexOf(c)}>{c.name} ({c.val})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Band 2 (2nd Digit)</label>
                <select value={band2} onChange={(e) => setBand2(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  {COLORS.filter(c => c.val !== undefined).map((c, i) => (
                    <option key={c.name} value={COLORS.indexOf(c)}>{c.name} ({c.val})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Multiplier</label>
                <select value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  {COLORS.filter(c => c.mult !== undefined).map((c, i) => (
                    <option key={c.name} value={COLORS.indexOf(c)}>{c.name} (x{c.mult})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tolerance</label>
                <select value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  {COLORS.filter(c => c.tol !== undefined).map((c, i) => (
                    <option key={c.name} value={COLORS.indexOf(c)}>{c.name} (±{c.tol}%)</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-sm text-slate-500 mb-1">Resistance Value</div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {formatOhms(calculate())}
              </div>
              <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
                Tolerance: ±{tolVal}%
              </div>
            </div>
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
