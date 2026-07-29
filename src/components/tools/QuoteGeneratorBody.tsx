"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Quote, RefreshCw, Copy, Check } from "lucide-react";

export function QuoteGeneratorBody() {
  const [quote, setQuote] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error("Failed to fetch quote");
      const data = await res.json();
      setQuote(data);
    } catch (err: any) {
      setError("Failed to fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyToClipboard = () => {
    if (!quote) return;
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">Inspiration</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Random Quote Gen
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full items-center justify-center text-purple-500">
              <Quote className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl relative">
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium mb-6">
                {error}
              </div>
            )}

            <div className="min-h-[200px] flex flex-col items-center justify-center text-center relative">
              <Quote className="absolute -top-4 -left-4 sm:top-0 sm:left-0 w-16 h-16 text-slate-100 dark:text-slate-800 rotate-180 -z-0" />
              
              {loading && !quote ? (
                <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
              ) : quote ? (
                <div className="relative z-10 w-full">
                  <p className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 leading-tight mb-8">
                    "{quote.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-purple-500"></div>
                    <p className="text-lg font-bold text-slate-500 dark:text-slate-400">
                      {quote.author}
                    </p>
                    <div className="h-px w-12 bg-purple-500"></div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={fetchQuote}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                New Quote
              </button>
              <button 
                onClick={copyToClipboard}
                disabled={!quote}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
