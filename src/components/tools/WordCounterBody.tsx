"use client";
import { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";

export function WordCounterBody() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({ words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readTime: 0 });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    const readTime = Math.ceil(words / 200); // 200 words per minute average

    setStats({ words, chars, charsNoSpaces, sentences, paragraphs, readTime });
  }, [text]);

  const StatCard = ({ label, value }: { label: string, value: number | string }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
      <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">{value}</span>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 h-full min-h-[500px]">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.chars} />
        <StatCard label="No Spaces" value={stats.charsNoSpaces} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Read Time" value={stats.readTime === 0 ? "0m" : `${stats.readTime}m`} />
      </div>

      <ToolContainer split="none">
        <ToolMain>
          <ToolInput 
            label="Your Text" 
            value={text} 
            onChange={setText} 
            onClear={() => setText("")}
            placeholder="Start typing or paste your document here..." 
          />
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
