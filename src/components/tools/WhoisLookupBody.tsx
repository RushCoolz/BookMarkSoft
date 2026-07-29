"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "./SharedComponents";
import { Search, Globe2, Fingerprint } from "lucide-react";

interface WhoisData {
  domain: string;
  registrar: string;
  registeredDate: string;
  expiresDate: string;
  nameservers: string[];
  status: string[];
}

export function WhoisLookupBody() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WhoisData | null>(null);

  const lookupWhois = async () => {
    let cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0].trim();
    if (!cleanDomain || !cleanDomain.includes('.')) {
      setError("Please enter a valid domain name (e.g. google.com)");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`https://networkcalc.com/api/dns/whois/${cleanDomain}`);
      const data = await res.json();
      
      if (data.status !== "OK" || !data.whois || !data.whois.registrar) {
        throw new Error("Could not fetch WHOIS data. The domain might not exist or the TLD is not supported.");
      }

      setResult({
        domain: data.whois.domain_name || cleanDomain,
        registrar: data.whois.registrar,
        registeredDate: data.whois.creation_date,
        expiresDate: data.whois.registry_expiry_date,
        nameservers: data.whois.name_servers || [],
        status: data.whois.domain_status || []
      });
    } catch (err: any) {
      setError(err.message || "Failed to lookup WHOIS details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-1">Domain Registration</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                WHOIS Lookup
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full items-center justify-center text-sky-500">
              <Globe2 className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Enter domain (e.g. google.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookupWhois()}
                className="w-full sm:flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button 
                onClick={lookupWhois}
                disabled={loading || !domain}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
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
              <div className="space-y-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-4 text-slate-500 dark:text-slate-400">
                    <Fingerprint className="w-5 h-5 text-sky-500" />
                    <span className="font-bold uppercase text-xs tracking-wider">Registration Details</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Domain</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200 uppercase">{result.domain}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Registrar</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{result.registrar}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Registered On</p>
                      <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(result.registeredDate).toLocaleDateString(undefined, { dateStyle: 'long'})}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Expires On</p>
                      <p className="font-medium text-slate-800 dark:text-slate-200">{new Date(result.expiresDate).toLocaleDateString(undefined, { dateStyle: 'long'})}</p>
                    </div>
                  </div>
                </div>
                
                {result.nameservers.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-medium text-slate-500 mb-2">Name Servers</p>
                    <div className="space-y-1">
                      {result.nameservers.map((ns, i) => (
                        <p key={i} className="font-mono text-sm text-slate-700 dark:text-slate-300">{ns}</p>
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
