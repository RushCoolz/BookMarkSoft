"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { List, Search, CarFront } from "lucide-react";

export function CarModelLookupBody() {
  const [make, setMake] = useState("");
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchModels = async () => {
    if (!make) {
      setError("Please enter a car make (e.g., Honda)");
      return;
    }
    setLoading(true);
    setError("");
    setModels([]);

    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      
      if (!json.Results || json.Results.length === 0) {
        setError("No models found for this make.");
      } else {
        setModels(json.Results);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <CarFront className="w-6 h-6 text-emerald-500" />
              Car Model Lookup
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Find all vehicle models manufactured by a specific brand.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={make}
              onChange={e => setMake(e.target.value)}
              placeholder="e.g., Toyota, Ford, Tesla..."
              className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              onKeyDown={e => e.key === "Enter" && searchModels()}
            />
            <button
              onClick={searchModels}
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {models.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Models for {make.toUpperCase()}
                </span>
                <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-bold">
                  {models.length} found
                </span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {models.map((m, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600">
                      {m.Model_Name}
                    </span>
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
