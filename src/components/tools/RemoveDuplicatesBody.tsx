"use client";
import { useState } from "react";
import { Copy, Check, Scissors } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolAction } from "../ui/tool/ToolAction";

export function RemoveDuplicatesBody() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ original: number, removed: number } | null>(null);

  const processText = () => {
    if (!text.trim()) return;
    
    // Process line by line
    const lines = text.split('\n');
    const originalCount = lines.length;
    
    // Remove duplicates while preserving order
    const uniqueLines = [...new Set(lines)];
    const newCount = uniqueLines.length;
    
    setText(uniqueLines.join('\n'));
    setStats({
      original: originalCount,
      removed: originalCount - newCount
    });
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
      <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900 p-4 rounded-xl">
        <div>
          <h3 className="font-bold text-orange-800 dark:text-orange-400 flex items-center gap-2">
            <Scissors className="w-5 h-5" /> Remove Duplicate Lines
          </h3>
          <p className="text-sm text-orange-600 dark:text-orange-500 mt-1">Paste a list below and instantly strip out any exact duplicate lines.</p>
        </div>
        {stats && (
          <div className="text-right">
            <div className="text-2xl font-black text-orange-600">{stats.removed}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-500">Duplicates Removed</div>
          </div>
        )}
      </div>

      <ToolContainer split="none">
        <ToolMain>
          <ToolInput 
            label="List Data" 
            value={text} 
            onChange={setText} 
            onClear={() => { setText(""); setStats(null); }}
            placeholder="Line 1\nLine 2\nLine 1 (this will be removed)..." 
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
          <ToolAction 
            onClick={processText}
            icon={<Scissors />}
            className="mt-4 !bg-orange-500 !hover:bg-orange-600"
          >
            Execute Cleanup
          </ToolAction>
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
