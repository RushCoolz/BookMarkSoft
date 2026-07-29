"use client";
import { useState } from "react";
import { Edit3, Copy, Check, Trash2 } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function LineBreakGenBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLineBreaks = () => {
    if (!input) {
      setOutput("");
      return;
    }
    
    // Replace standard newlines with an invisible zero-width space + newline
    // This tricks Instagram into maintaining the empty lines.
    const invisibleSpace = "‎"; // U+200E Left-To-Right Mark (commonly used for this trick)
    
    // Split by newlines, trim trailing whitespace per line, but keep empty lines.
    // Replace empty lines or lines with just spaces with the invisible space.
    const lines = input.split('\n');
    const formattedLines = lines.map(line => {
      const trimmed = line.trimRight();
      if (trimmed === "") {
        return invisibleSpace;
      }
      return trimmed;
    });

    const formatted = formattedLines.join('\n');
    setOutput(formatted);
    
    // Auto-copy to clipboard
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearInput = () => {
    setInput("");
    setOutput("");
    setCopied(false);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 h-[70vh] min-h-[500px]">
          
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
            
            <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-pink-500" /> Caption Editor
                </h3>
                <p className="text-xs text-slate-500 mt-1">Type your Instagram caption with standard return spaces below.</p>
              </div>
              <button 
                onClick={clearInput}
                className="text-slate-400 hover:text-red-500 p-2 transition-colors"
                title="Clear all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <textarea 
              value={input} 
              onChange={(e) => {
                setInput(e.target.value);
                setCopied(false);
              }}
              className="flex-1 w-full p-6 bg-transparent resize-none outline-none text-slate-800 dark:text-slate-200 text-lg leading-relaxed custom-scrollbar"
              placeholder="Write your perfect caption here...&#10;&#10;Add empty lines like this.&#10;&#10;They will be perfectly preserved when you paste to Instagram!"
            ></textarea>
            
          </div>

          <div className="flex justify-center">
            <ToolAction 
              onClick={generateLineBreaks} 
              icon={copied ? <Check /> : <Copy />}
              className={`w-full max-w-sm py-4 text-lg !rounded-xl transition-all ${copied ? '!bg-green-500 !hover:bg-green-600' : '!bg-pink-500 !hover:bg-pink-600'}`}
            >
              {copied ? "Copied & Ready to Paste!" : "Generate & Copy"}
            </ToolAction>
          </div>

          <div className="text-center text-sm text-slate-500">
            <p><strong>How it works:</strong> We inject an invisible space character into your empty lines. When you paste this into Instagram, it forces the app to render the empty lines exactly as you typed them!</p>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
