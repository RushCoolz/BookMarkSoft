"use client";
import { useState } from "react";
import { Copy, Check, Undo2 } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";

export function CaseConverterBody() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const applyCase = (type: string) => {
    let result = text;
    if (!result.trim()) return;

    setHistory(prev => [...prev, text]);

    switch (type) {
      case "upper": 
        result = text.toUpperCase(); 
        break;
      case "lower": 
        result = text.toLowerCase(); 
        break;
      case "title": 
        result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); 
        break;
      case "camel": 
        result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''); 
        break;
      case "snake": 
        result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || text; 
        break;
      case "sentence":
        let unCamel = text.replace(/([a-z])([A-Z])/g, '$1 $2');
        let unSnake = unCamel.replace(/_/g, ' ');
        result = unSnake.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
    }
    setText(result);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setText(prev);
      setHistory(prevHistory => prevHistory.slice(0, -1));
    }
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ActionButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl font-medium transition-colors shadow-sm hover:border-emerald-500/50 hover:text-emerald-600"
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6 h-full min-h-[500px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <ActionButton label="UPPERCASE" onClick={() => applyCase("upper")} />
        <ActionButton label="lowercase" onClick={() => applyCase("lower")} />
        <ActionButton label="Title Case" onClick={() => applyCase("title")} />
        <ActionButton label="Sentence case." onClick={() => applyCase("sentence")} />
        <ActionButton label="camelCase" onClick={() => applyCase("camel")} />
        <ActionButton label="snake_case" onClick={() => applyCase("snake")} />
      </div>

      <ToolContainer split="none">
        <ToolMain>
          <ToolInput 
            label="Text Content" 
            value={text} 
            onChange={setText} 
            onClear={() => { setHistory(prev => [...prev, text]); setText(""); }}
            placeholder="Type or paste your text here..." 
            actions={
              <>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button 
                  onClick={handleUndo} 
                  disabled={history.length === 0}
                  className={`text-xs flex items-center gap-1 transition-colors ${history.length > 0 ? 'text-slate-500 dark:text-slate-400 hover:text-blue-600' : 'text-slate-300 dark:text-slate-600 pointer-events-none'}`}
                >
                  <Undo2 className="w-3 h-3" /> Undo
                </button>
              </>
            }
          />
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
