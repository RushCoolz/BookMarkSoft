"use client";
import { useState, useEffect } from "react";
import { Battery, Zap, Clock } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function BatteryCalcBody() {
  const [capacity, setCapacity] = useState("3000"); // mAh
  const [consumption, setConsumption] = useState("250"); // mA

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const c = parseFloat(capacity) || 0;
    const a = parseFloat(consumption) || 0;

    if (c === 0 || a === 0) {
      setHours(0);
      setMinutes(0);
      return;
    }

    // Battery Life = Capacity / Consumption
    // Typical efficiency is about 70-80% due to loss, heat, etc. We'll use an ideal vs real calculation.
    // For this basic tool, we will show ideal calculation but mention real-world varies.
    const totalHours = c / a;
    
    setHours(Math.floor(totalHours));
    setMinutes(Math.round((totalHours - Math.floor(totalHours)) * 60));
  }, [capacity, consumption]);

  const totalTimeInHours = parseFloat((hours + (minutes / 60)).toFixed(2));
  
  // Real world estimate (~70% efficiency)
  const realHours = Math.floor(totalTimeInHours * 0.7);
  const realMinutes = Math.round(((totalTimeInHours * 0.7) - Math.floor(totalTimeInHours * 0.7)) * 60);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8 py-6">
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 text-green-500 rounded-2xl flex items-center justify-center mb-4">
              <Battery className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Battery Life Estimator</h2>
            <p className="text-slate-500 dark:text-slate-400">Calculate how long your battery will last based on capacity and device draw.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Inputs */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-3xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Battery Capacity (mAh)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Battery className="w-5 h-5" />
                  </span>
                  <input 
                    type="number" 
                    value={capacity} 
                    onChange={(e) => setCapacity(e.target.value)} 
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Device Consumption (mA)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Zap className="w-5 h-5" />
                  </span>
                  <input 
                    type="number" 
                    value={consumption} 
                    onChange={(e) => setConsumption(e.target.value)} 
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              
              <div className="bg-white dark:bg-slate-900 border border-green-200 dark:border-green-800/50 p-6 rounded-3xl shadow-sm relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-green-500" />
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">Theoretical Life (Ideal)</h3>
                </div>
                <div className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  {hours}<span className="text-xl text-slate-500 font-medium ml-1 mr-3">h</span>
                  {minutes}<span className="text-xl text-slate-500 font-medium ml-1">m</span>
                </div>
                <p className="text-sm text-slate-500">Assumes 100% efficiency.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-3xl h-full flex flex-col justify-center">
                <h3 className="font-bold text-slate-600 dark:text-slate-400 mb-2">Real World Estimate (~70%)</h3>
                <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                  {realHours}h {realMinutes}m
                </div>
                <p className="text-xs text-slate-500 mt-2">Accounts for heat loss, internal resistance, and voltage drop.</p>
              </div>

            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
