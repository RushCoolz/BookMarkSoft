"use client";
import { useState, useEffect } from "react";
import { Copy, Check, MapPin, Network, Server, Globe } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function IpAddressBody() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://ipinfo.io/json");
        const result = await response.json();
        if (result.error) throw new Error("API Error");
        setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchIp();
  }, []);

  const copyToClipboard = () => {
    if (!data?.ip) return;
    navigator.clipboard.writeText(data.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-sky-500">
        <Network className="w-12 h-12 animate-pulse mb-4" />
        <p className="font-medium text-slate-600 dark:text-slate-400">Discovering your connection...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <p className="font-medium">Failed to fetch IP data. Please try disabling your adblocker or try again later.</p>
      </div>
    );
  }

  return (
    <ToolContainer split="none">
      <ToolMain className="max-w-2xl mx-auto flex flex-col gap-8 w-full">
      
      {/* Primary IP Display */}
      <div className="bg-sky-50 border-2 border-sky-100 rounded-2xl p-8 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Globe className="w-48 h-48 -mr-12 -mt-12" />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-2">Your Public IP Address</p>
          <h1 className="text-5xl font-black text-sky-900 tracking-tight font-mono mb-6">{data.ip}</h1>
          <button 
            onClick={copyToClipboard}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-sm transition-all ${copied ? 'bg-green-500 text-white dark:text-slate-900 hover:bg-green-600' : 'bg-white dark:bg-slate-900 text-sky-700 hover:bg-sky-100'}`}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? "Copied to Clipboard!" : "Copy IP Address"}
          </button>
        </div>
      </div>

      {/* Network Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Location</p>
            <p className="font-medium text-slate-800 dark:text-slate-200">{data.city}, {data.region}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{data.country}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Internet Provider</p>
            <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{data.org}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Timezone: {data.timezone}</p>
          </div>
        </div>
      </div>
      
      </ToolMain>
    </ToolContainer>
  );
}
