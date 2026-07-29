"use client";
import { useState } from "react";
import { Dices, RefreshCw } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function RandomNumberBody() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomNumber = () => {
    if (min >= max) {
      alert("Minimum value must be less than maximum value.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate a brief "rolling" animation
    setTimeout(() => {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      const random = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
      
      setResult(random);
      setHistory(prev => [random, ...prev].slice(0, 10)); // Keep last 10
      setIsGenerating(false);
    }, 300);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="flex flex-col items-center max-w-lg mx-auto w-full space-y-8 py-6">
          
          {/* Result Display */}
          <div className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center shadow-inner relative overflow-hidden">
            <div className={`text-7xl sm:text-9xl font-black text-blue-600 dark:text-blue-500 tracking-tighter transition-all duration-300 ${isGenerating ? 'scale-90 blur-sm opacity-50' : 'scale-100 blur-none opacity-100'}`}>
              {result !== null ? result : "-"}
            </div>
            {!result && !isGenerating && (
              <p className="absolute bottom-6 left-0 right-0 text-slate-400 dark:text-slate-500 font-medium text-sm">
                Click generate to start
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Minimum</label>
              <input 
                type="number" 
                value={min} 
                onChange={(e) => setMin(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Maximum</label>
              <input 
                type="number" 
                value={max} 
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center"
              />
            </div>
          </div>

          <ToolAction 
            onClick={generateRandomNumber} 
            icon={isGenerating ? <RefreshCw className="animate-spin" /> : <Dices />}
            className="w-full py-4 text-lg !rounded-xl"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Number"}
          </ToolAction>

          {/* History */}
          {history.length > 0 && (
            <div className="w-full pt-6">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Recent Numbers</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {history.map((num, i) => (
                  <div key={i} className={`px-3 py-1.5 rounded-lg text-sm font-bold ${i === 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 ring-2 ring-blue-500/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
