"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Car, Search } from "lucide-react";

export function VinDecoderBody() {
  const [vin, setVin] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const decode = async () => {
    if (!vin || vin.length < 11) {
      setError("Please enter a valid VIN (at least 11 characters)");
      return;
    }
    setLoading(true);
    setError("");
    setData([]);

    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${encodeURIComponent(vin)}?format=json`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      
      // Filter out empty results
      const validResults = json.Results.filter((r: any) => r.Value && r.Value !== "null" && r.Value !== "Not Applicable");
      setData(validResults);
      if (validResults.length === 0) {
        setError("No data found for this VIN.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Important fields to pin at top
  const keyFields = ["Make", "Model", "Model Year", "Manufacturer Name", "Vehicle Type", "Plant Country"];
  const topData = data.filter(d => keyFields.includes(d.Variable));
  const otherData = data.filter(d => !keyFields.includes(d.Variable) && !d.Variable.includes("Error"));

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Car className="w-6 h-6 text-indigo-500" />
              VIN Decoder
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Decode any Vehicle Identification Number (US DOT API).
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={vin}
              onChange={e => setVin(e.target.value.toUpperCase())}
              placeholder="Enter VIN (17 chars)..."
              className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              onKeyDown={e => e.key === "Enter" && decode()}
            />
            <button
              onClick={decode}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? "Decoding..." : "Decode"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {data.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {topData.map((d, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-xs text-slate-500 mb-1">{d.Variable}</div>
                    <div className="font-bold text-slate-900 dark:text-white">{d.Value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">
                  Full Decoding Data
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {otherData.map((d, i) => (
                    <div key={i} className="flex px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <div className="w-1/2 text-sm text-slate-600 dark:text-slate-400 font-medium">{d.Variable}</div>
                      <div className="w-1/2 text-sm text-slate-900 dark:text-white break-words">{d.Value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
