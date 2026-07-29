"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "./SharedComponents";
import { Search, Network, ServerCrash } from "lucide-react";

export function DnsLookupBody() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<any[]>([]);

  const lookupDns = async () => {
    let cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0].trim();
    if (!cleanDomain) {
      setError("Please enter a valid domain name");
      return;
    }

    setLoading(true);
    setError("");
    setRecords([]);

    try {
      // Google DNS-over-HTTPS
      // record types: A=1, AAAA=28, CNAME=5, MX=15, TXT=16, NS=2
      const typeMap: Record<string, number> = {
        "A": 1, "AAAA": 28, "CNAME": 5, "MX": 15, "TXT": 16, "NS": 2
      };
      
      const res = await fetch(`https://dns.google.com/resolve?name=${cleanDomain}&type=${typeMap[recordType]}`);
      const data = await res.json();
      
      if (data.Status !== 0) {
        throw new Error(`DNS Resolution failed (Status Code: ${data.Status})`);
      }

      if (!data.Answer) {
        setRecords([]); // No records of this type
      } else {
        setRecords(data.Answer);
      }
    } catch (err: any) {
      setError(err.message || "Failed to lookup DNS records");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Domain Tools</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                DNS Lookup
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full items-center justify-center text-indigo-500">
              <Network className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Enter domain (e.g. google.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookupDns()}
                className="w-full sm:flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <select 
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="A">A</option>
                <option value="AAAA">AAAA</option>
                <option value="CNAME">CNAME</option>
                <option value="MX">MX</option>
                <option value="TXT">TXT</option>
                <option value="NS">NS</option>
              </select>
              <button 
                onClick={lookupDns}
                disabled={loading || !domain}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
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

            {!loading && records.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse bg-slate-50 dark:bg-slate-800/30">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="p-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Name</th>
                      <th className="p-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Type</th>
                      <th className="p-4 font-bold text-slate-500 text-sm uppercase tracking-wider">TTL</th>
                      <th className="p-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {records.map((rec, i) => (
                      <tr key={i} className="hover:bg-white dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 text-sm font-medium text-slate-800 dark:text-slate-200 break-all">{rec.name}</td>
                        <td className="p-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">{recordType}</td>
                        <td className="p-4 text-sm text-slate-500">{rec.TTL}s</td>
                        <td className="p-4 text-sm font-mono text-slate-800 dark:text-slate-200 break-all">{rec.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && !error && records.length === 0 && domain && (
               <div className="p-12 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center">
                 <ServerCrash className="w-12 h-12 mb-4 opacity-50" />
                 <p className="font-medium">No {recordType} records found for this domain.</p>
               </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
