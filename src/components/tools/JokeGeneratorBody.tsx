"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "./SharedComponents";
import { Smile, RefreshCw, Copy, Check, Info } from "lucide-react";

export function JokeGeneratorBody() {
  const [joke, setJoke] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("Any");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const res = await fetch(`https://v2.jokeapi.dev/joke/${type}?safe-mode`);
      const data = await res.json();
      if (data.error) throw new Error(data.message);
      setJoke(data);
    } catch (err: any) {
      setError("Failed to fetch joke. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [type]);

  const copyToClipboard = () => {
    if (!joke) return;
    const text = joke.type === 'single' ? joke.joke : `${joke.setup}\n\n${joke.delivery}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">Humor</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Random Joke Gen
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full items-center justify-center text-amber-500">
              <Smile className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-12 rounded-3xl relative">
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['Any', 'Programming', 'Misc', 'Pun'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${type === t ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium mb-6">
                {error}
              </div>
            )}

            <div className="min-h-[150px] flex flex-col justify-center text-center">
              {loading && !joke ? (
                <div className="flex justify-center"><RefreshCw className="w-8 h-8 text-amber-500 animate-spin" /></div>
              ) : joke ? (
                <div className="space-y-6">
                  {joke.type === 'single' ? (
                    <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                      {joke.joke}
                    </p>
                  ) : (
                    <>
                      <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                        {joke.setup}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight">
                        {joke.delivery}
                      </p>
                    </>
                  )}
                  
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Info className="w-4 h-4"/> Category: {joke.category}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={fetchJoke}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Make me laugh
              </button>
              <button 
                onClick={copyToClipboard}
                disabled={!joke}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy Joke"}
              </button>
            </div>
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
