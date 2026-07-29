"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Cable } from "lucide-react";

// Standard AWG lookup table
const AWG_DATA = [
  { awg: "0000", dia: 11.684, area: 107.2, amps: 302 },
  { awg: "000", dia: 10.404, area: 85.0, amps: 239 },
  { awg: "00", dia: 9.266, area: 67.4, amps: 190 },
  { awg: "0", dia: 8.252, area: 53.5, amps: 150 },
  { awg: "1", dia: 7.348, area: 42.4, amps: 119 },
  { awg: "2", dia: 6.544, area: 33.6, amps: 94 },
  { awg: "3", dia: 5.827, area: 26.7, amps: 75 },
  { awg: "4", dia: 5.189, area: 21.2, amps: 60 },
  { awg: "5", dia: 4.621, area: 16.8, amps: 47 },
  { awg: "6", dia: 4.115, area: 13.3, amps: 37 },
  { awg: "7", dia: 3.665, area: 10.5, amps: 30 },
  { awg: "8", dia: 3.264, area: 8.37, amps: 24 },
  { awg: "9", dia: 2.906, area: 6.63, amps: 19 },
  { awg: "10", dia: 2.588, area: 5.26, amps: 15 },
  { awg: "11", dia: 2.305, area: 4.17, amps: 12 },
  { awg: "12", dia: 2.053, area: 3.31, amps: 9.3 },
  { awg: "13", dia: 1.828, area: 2.62, amps: 7.4 },
  { awg: "14", dia: 1.628, area: 2.08, amps: 5.9 },
  { awg: "16", dia: 1.291, area: 1.31, amps: 3.7 },
  { awg: "18", dia: 1.024, area: 0.823, amps: 2.3 },
  { awg: "20", dia: 0.812, area: 0.518, amps: 1.5 },
  { awg: "22", dia: 0.644, area: 0.326, amps: 0.92 },
  { awg: "24", dia: 0.511, area: 0.205, amps: 0.577 },
];

export function AwgConverterBody() {
  const [selectedAwg, setSelectedAwg] = useState("10");

  const data = AWG_DATA.find(d => d.awg === selectedAwg) || AWG_DATA[13];

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Cable className="w-6 h-6 text-slate-500" />
              AWG Wire Size Converter
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Convert American Wire Gauge to Metric and view max ampacity.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select AWG Size</label>
              <select 
                value={selectedAwg} 
                onChange={e => setSelectedAwg(e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                {AWG_DATA.map(d => (
                  <option key={d.awg} value={d.awg}>AWG {d.awg}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-sm text-slate-500 mb-1">Diameter</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.dia} <span className="text-sm font-normal">mm</span></div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-sm text-slate-500 mb-1">Cross Area</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.area} <span className="text-sm font-normal">mm²</span></div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-sm text-slate-500 mb-1">Max Ampacity*</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data.amps} <span className="text-sm font-normal">A</span></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              * Ampacity is approximate for copper wire in free air. Refer to NEC codes for actual wiring safety limits.
            </p>
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
