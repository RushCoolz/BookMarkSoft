"use client";
import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function UuidGeneratorBody() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateUuids = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (uppercase) uuid = uuid.toUpperCase();
      if (noHyphens) uuid = uuid.replace(/-/g, "");
      newUuids.push(uuid);
    }
    setUuids(newUuids);
  };

  useEffect(() => {
    generateUuids();
  }, [count, uppercase, noHyphens]);

  const copyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] w-full max-w-3xl mx-auto">
      <ToolContainer split="none">
        <ToolMain>
          <div className="space-y-8 flex-1">
            {/* Output Display */}
            <div className="relative">
              <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 font-mono text-lg font-medium text-slate-800 dark:text-slate-200 shadow-inner h-[280px] overflow-y-auto custom-scrollbar">
                {uuids.map((uuid, i) => (
                  <div key={i} className="py-1 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 px-2 rounded cursor-copy transition-colors" onClick={() => {
                    navigator.clipboard.writeText(uuid);
                  }}>
                    {uuid}
                  </div>
                ))}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={generateUuids}
                  className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={copyAll}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors ${copied ? 'bg-green-500 text-white dark:text-slate-900 border-green-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border'}`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied All" : "Copy All"}
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-medium text-slate-700 dark:text-slate-300">Number of UUIDs to Generate</label>
                  <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-md font-bold">{count}</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="100" 
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Uppercase letters</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Remove hyphens</span>
                </label>
              </div>
            </div>
          </div>
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
