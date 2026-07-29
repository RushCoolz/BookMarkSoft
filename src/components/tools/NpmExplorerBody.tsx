"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "./SharedComponents";
import { Search, Package, Download, Terminal } from "lucide-react";

export function NpmExplorerBody() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pkg, setPkg] = useState<any | null>(null);

  const searchNpm = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setPkg(null);

    try {
      const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(query.trim())}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Package not found");
        throw new Error("Failed to fetch package data");
      }
      const data = await res.json();
      setPkg(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">Developer Tools</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                NPM Package Explorer
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full items-center justify-center text-red-500">
              <Package className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Enter exact package name (e.g. react, lodash)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchNpm()}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
              <button 
                onClick={searchNpm}
                disabled={loading || !query}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {pkg && (
              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">{pkg.name}</h1>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700">v{pkg['dist-tags']?.latest}</span>
                  </div>
                  <p className="text-lg text-slate-500 dark:text-slate-400">{pkg.description}</p>
                </div>

                <div className="bg-slate-800 dark:bg-black rounded-xl p-4 flex items-center justify-between border border-slate-700">
                  <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm sm:text-base">
                    <Terminal className="w-4 h-4" />
                    npm install {pkg.name}
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(`npm install ${pkg.name}`)}
                    className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">License</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{pkg.license || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Author</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{pkg.author?.name || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 lg:col-span-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Homepage</p>
                    <a href={pkg.homepage} target="_blank" rel="noreferrer" className="font-medium text-blue-500 hover:underline truncate block">{pkg.homepage || 'N/A'}</a>
                  </div>
                </div>

                {pkg.keywords && pkg.keywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.keywords.map((kw: string) => (
                        <span key={kw} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
