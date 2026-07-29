"use client";
import { useState } from "react";
import { Copy, Check, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";

export function SortLinesBody() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const processText = (asc: boolean) => {
    if (!text.trim()) return;
    
    const lines = text.split('\n');
    
    // Sort alphabetically using localeCompare for accuracy
    lines.sort((a, b) => a.localeCompare(b));
    
    if (!asc) {
      lines.reverse();
    }
    
    setText(lines.join('\n'));
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 h-full min-h-[500px]">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900 p-4 rounded-xl">
        <div>
          <h3 className="font-bold text-cyan-800 dark:text-cyan-400 flex items-center gap-2">
            Sort Lines
          </h3>
          <p className="text-sm text-cyan-600 dark:text-cyan-500 mt-1">Paste a list below and quickly alphabetize it.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => processText(true)}
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400 font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <ArrowDownAZ className="w-4 h-4" /> A - Z
          </button>
          <button 
            onClick={() => processText(false)}
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400 font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <ArrowDownZA className="w-4 h-4" /> Z - A
          </button>
        </div>
      </div>

      <ToolContainer split="none">
        <ToolMain>
          <ToolInput 
            label="List Data" 
            value={text} 
            onChange={setText} 
            onClear={() => setText("")}
            placeholder="Banana\nApple\nCherry..." 
            actions={
              <button 
                onClick={copyToClipboard}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            }
          />
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
