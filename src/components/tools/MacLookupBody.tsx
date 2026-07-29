"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Search, Server, MonitorSmartphone, Building2 } from "lucide-react";

interface MacResult {
  macPrefix: string;
  company: string;
  address: string;
  country: string;
}

export function MacLookupBody() {
  const [mac, setMac] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<MacResult | null>(null);

  const lookupMac = async () => {
    const cleanMac = mac.replace(/[^a-fA-F0-9]/g, '');
    if (cleanMac.length < 6) {
      setError("Please enter a valid MAC address or OUI prefix (at least 6 characters)");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`https://api.maclookup.app/v2/macs/${mac}`);
      if (!res.ok) throw new Error("Could not find vendor for this MAC address");
      const data = await res.json();
      
      if (!data.found) {
        throw new Error("Vendor not found in the public database.");
      }

      setResult({
        macPrefix: data.macPrefix,
        company: data.company,
        address: data.address,
        country: data.country,
      });
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError("Network Error: Your adblocker or browser blocked the request to maclookup.app.");
      } else {
        setError(err.message || "Failed to lookup MAC address");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto w-full space-y-6">
          
          <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Network Forensics</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                MAC Vendor Lookup
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-white dark:bg-slate-800 rounded-full items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
              <Server className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Enter MAC Address (e.g. 00:1A:2B:3C:4D:5E)"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookupMac()}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-slate-500/50 uppercase"
              />
              <button 
                onClick={lookupMac}
                disabled={loading || !mac}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                Lookup
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {result && (
              <div className="grid gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-2 text-slate-500 dark:text-slate-400">
                    <Building2 className="w-5 h-5" />
                    <span className="font-bold uppercase text-xs tracking-wider">Manufacturer</span>
                  </div>
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{result.company}</p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 dark:text-slate-400">
                      <MonitorSmartphone className="w-5 h-5" />
                      <span className="font-bold uppercase text-xs tracking-wider">Prefix (OUI)</span>
                    </div>
                    <p className="font-mono text-slate-800 dark:text-slate-200">{result.macPrefix}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 dark:text-slate-400">
                      <Globe className="w-5 h-5" />
                      <span className="font-bold uppercase text-xs tracking-wider">Location</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {result.address}<br/>
                      {result.country && <span className="text-slate-500 mt-1 block">{result.country}</span>}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}

// Quick component for Globe icon locally since we can't add it to imports cleanly with regex
function Globe(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" x2="22" y1="12" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
