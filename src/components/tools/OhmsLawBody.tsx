"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Zap } from "lucide-react";

export function OhmsLawBody() {
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [p, setP] = useState("");

  const calculate = () => {
    let vol = parseFloat(v);
    let cur = parseFloat(i);
    let res = parseFloat(r);
    let pow = parseFloat(p);

    let count = 0;
    if (!isNaN(vol)) count++;
    if (!isNaN(cur)) count++;
    if (!isNaN(res)) count++;
    if (!isNaN(pow)) count++;

    if (count < 2) return; // Need exactly 2 knowns

    // Calculate based on the 2 knowns
    if (!isNaN(vol) && !isNaN(cur)) {
      setR((vol / cur).toFixed(4));
      setP((vol * cur).toFixed(4));
    } else if (!isNaN(vol) && !isNaN(res)) {
      setI((vol / res).toFixed(4));
      setP(((vol * vol) / res).toFixed(4));
    } else if (!isNaN(vol) && !isNaN(pow)) {
      setI((pow / vol).toFixed(4));
      setR(((vol * vol) / pow).toFixed(4));
    } else if (!isNaN(cur) && !isNaN(res)) {
      setV((cur * res).toFixed(4));
      setP((cur * cur * res).toFixed(4));
    } else if (!isNaN(cur) && !isNaN(pow)) {
      setV((pow / cur).toFixed(4));
      setR((pow / (cur * cur)).toFixed(4));
    } else if (!isNaN(res) && !isNaN(pow)) {
      setV(Math.sqrt(pow * res).toFixed(4));
      setI(Math.sqrt(pow / res).toFixed(4));
    }
  };

  const clearAll = () => {
    setV(""); setI(""); setR(""); setP("");
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Ohm's Law Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Enter exactly two values to calculate the other two.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Voltage (V) in Volts</label>
                <input type="number" value={v} onChange={e => setV(e.target.value)} placeholder="e.g. 12" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current (I) in Amps</label>
                <input type="number" value={i} onChange={e => setI(e.target.value)} placeholder="e.g. 2" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Resistance (R) in Ohms</label>
                <input type="number" value={r} onChange={e => setR(e.target.value)} placeholder="e.g. 6" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Power (P) in Watts</label>
                <input type="number" value={p} onChange={e => setP(e.target.value)} placeholder="e.g. 24" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={calculate} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Calculate
              </button>
              <button onClick={clearAll} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-medium transition-colors">
                Clear
              </button>
            </div>
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
