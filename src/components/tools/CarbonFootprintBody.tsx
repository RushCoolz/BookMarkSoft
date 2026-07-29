"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Leaf, Car, Plane, Zap } from "lucide-react";

export function CarbonFootprintBody() {
  const [miles, setMiles] = useState("1000");
  const [mpg, setMpg] = useState("25");
  const [kwh, setKwh] = useState("500");
  const [flights, setFlights] = useState("2");

  const calcFootprint = () => {
    let m = parseFloat(miles) || 0;
    let eff = parseFloat(mpg) || 25;
    let k = parseFloat(kwh) || 0;
    let f = parseFloat(flights) || 0;

    // Approximations:
    // 1 Gallon of Gas = ~8.88 kg CO2
    const carKg = (m / eff) * 8.88;

    // US Average grid electricity = ~0.385 kg CO2 per kWh
    const elecKg = k * 0.385;

    // 1 average short/medium flight per passenger = ~250 kg CO2
    const flightKg = f * 250;

    const totalKg = carKg + elecKg + flightKg;
    const totalTons = totalKg / 1000;

    return { car: carKg, elec: elecKg, flight: flightKg, total: totalTons };
  };

  const res = calcFootprint();

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Leaf className="w-6 h-6 text-green-500" />
              Carbon Footprint Estimator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Estimate your monthly CO2 emissions from transport and energy.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Miles Driven (Monthly)</label>
                    <input type="number" value={miles} onChange={e => setMiles(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Car MPG</label>
                    <input type="number" value={mpg} onChange={e => setMpg(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Home Electricity (kWh / Month)</label>
                  <input type="number" value={kwh} onChange={e => setKwh(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Flights Taken (Monthly)</label>
                  <input type="number" value={flights} onChange={e => setFlights(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-sm text-slate-500 mb-1">Estimated Monthly Emissions</div>
              <div className="text-5xl font-black text-green-600 dark:text-green-500 mb-4">
                {res.total.toFixed(2)} <span className="text-xl text-slate-500 font-medium">Tons CO₂</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold text-slate-500 uppercase">
                <div>Car: {Math.round(res.car)} kg</div>
                <div>Home: {Math.round(res.elec)} kg</div>
                <div>Air: {Math.round(res.flight)} kg</div>
              </div>
            </div>
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
