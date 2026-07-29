"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Send, TerminalSquare, AlertCircle } from "lucide-react";

export function ApiTesterBody() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [method, setMethod] = useState("GET");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [error, setError] = useState("");

  const sendRequest = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResponse(null);
    setStatus(null);
    
    const startTime = performance.now();

    try {
      const res = await fetch(url, { method });
      setStatus(res.status);
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (err: any) {
      setError(err.message || "Network Error or CORS policy blocked the request.");
    } finally {
      setTime(Math.round(performance.now() - startTime));
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Developer Tools</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                REST API Tester
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full items-center justify-center text-orange-500">
              <TerminalSquare className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full sm:w-32 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-800 dark:text-slate-200"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input 
                type="text"
                placeholder="https://api.example.com/data"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
                className="w-full sm:flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <button 
                onClick={sendRequest}
                disabled={loading || !url}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                Send
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            {(response !== null || loading) && (
              <div className="mt-8 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">Response</h3>
                  {status && (
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <span className={status >= 200 && status < 300 ? "text-emerald-500" : "text-red-500"}>Status: {status}</span>
                      <span className="text-slate-500">Time: {time}ms</span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[#1e1e1e] min-h-[300px] max-h-[500px] overflow-auto">
                  {loading ? (
                    <div className="h-full flex items-center justify-center text-slate-500 font-mono text-sm">Waiting for response...</div>
                  ) : (
                    <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">
                      {response}
                    </pre>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
