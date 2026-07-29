"use client";
import { useState, useEffect } from "react";
import { LayoutTemplate } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolOutput } from "../ui/tool/ToolOutput";

export function LoremIpsumBody() {
  const [text, setText] = useState("");
  const [paragraphs, setParagraphs] = useState(3);

  const generate = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    let result = [];
    for(let i = 0; i < paragraphs; i++) {
        result.push(lorem);
    }
    setText(result.join('\n\n'));
  };

  useEffect(() => {
    generate();
  }, [paragraphs]);

  return (
    <div className="flex flex-col gap-6 h-full min-h-[500px]">
      
      {/* Controls */}
      <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
        <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 shrink-0">
          <LayoutTemplate className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-slate-700 dark:text-slate-300 text-sm">Number of Paragraphs</label>
            <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md font-bold text-xs">{paragraphs}</span>
          </div>
          <input 
            type="range" 
            min="1" max="20" 
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-600 dark:accent-slate-400"
          />
        </div>
      </div>

      <ToolContainer split="none">
        <ToolMain>
          <ToolOutput label="Generated Text" value={text} />
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
