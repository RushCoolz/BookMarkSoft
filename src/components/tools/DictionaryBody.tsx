"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Search, BookOpen, Volume2 } from "lucide-react";

export function DictionaryBody() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any | null>(null);

  const searchWord = async () => {
    if (!word.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Word not found in the dictionary.");
        throw new Error("Failed to fetch word definition.");
      }
      const json = await res.json();
      setData(json[0]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (!data?.phonetics) return;
    const audioObj = data.phonetics.find((p: any) => p.audio !== "");
    if (audioObj) {
      const audio = new Audio(audioObj.audio);
      audio.play();
    }
  };

  const hasAudio = data?.phonetics?.some((p: any) => p.audio !== "");

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1">Reference Tools</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Dictionary & Thesaurus
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-full items-center justify-center text-rose-500">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Search for a word (e.g. ubiquitous)..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchWord()}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
              <button 
                onClick={searchWord}
                disabled={loading || !word}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                Define
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {data && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100">{data.word}</h1>
                  <span className="text-xl text-rose-500 font-mono mt-2">{data.phonetic}</span>
                  {hasAudio && (
                    <button onClick={playAudio} className="mt-2 p-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-600 rounded-full transition-colors">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-8">
                  {data.meanings.map((meaning: any, i: number) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold italic text-slate-800 dark:text-slate-200">{meaning.partOfSpeech}</h3>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                      </div>
                      
                      <ul className="list-disc list-outside ml-6 space-y-4 text-slate-700 dark:text-slate-300">
                        {meaning.definitions.map((def: any, j: number) => (
                          <li key={j} className="pl-2">
                            <p>{def.definition}</p>
                            {def.example && (
                              <p className="text-slate-500 mt-1 italic">"{def.example}"</p>
                            )}
                          </li>
                        ))}
                      </ul>

                      {meaning.synonyms && meaning.synonyms.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="text-sm font-bold text-slate-500 mr-2 py-1">Synonyms:</span>
                          {meaning.synonyms.slice(0, 10).map((syn: string) => (
                            <button key={syn} onClick={() => { setWord(syn); setTimeout(searchWord, 50); }} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 text-sm font-medium rounded-full transition-colors">
                              {syn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
