"use client";
import { useState } from "react";
import { SplitSquareHorizontal, RefreshCw } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function DiffCheckerBody() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState<{line: string, type: "added" | "removed" | "unchanged"}[]>([]);
  const [hasCompared, setHasCompared] = useState(false);

  const compareLines = () => {
    if (!text1 && !text2) return;
    
    // Very basic line-by-line comparison algorithm for a static tool
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: {line: string, type: "added" | "removed" | "unchanged"}[] = [];
    
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const l1 = lines1[i] !== undefined ? lines1[i] : null;
      const l2 = lines2[i] !== undefined ? lines2[i] : null;
      
      if (l1 === l2) {
        result.push({ line: l1!, type: "unchanged" });
      } else if (l1 !== null && l2 === null) {
        result.push({ line: l1, type: "removed" });
      } else if (l1 === null && l2 !== null) {
        result.push({ line: l2, type: "added" });
      } else {
        // They are different
        result.push({ line: l1!, type: "removed" });
        result.push({ line: l2!, type: "added" });
      }
    }
    
    setDiffResult(result);
    setHasCompared(true);
  };

  const reset = () => {
    setText1("");
    setText2("");
    setDiffResult([]);
    setHasCompared(false);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <SplitSquareHorizontal className="text-amber-500" /> Basic Diff Checker
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={reset}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Clear
              </button>
              <ToolAction 
                onClick={compareLines} 
                icon={<RefreshCw className="w-4 h-4" />}
                className="py-2 px-6 !rounded-xl !bg-amber-500 !hover:bg-amber-600 text-sm"
              >
                Find Differences
              </ToolAction>
            </div>
          </div>

          {!hasCompared ? (
            <div className="flex flex-col md:flex-row gap-4 h-[600px]">
              <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 font-bold text-sm text-slate-700 dark:text-slate-300 text-center border-b border-slate-200 dark:border-slate-700">Original Text</div>
                <textarea 
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-sm custom-scrollbar text-slate-800 dark:text-slate-200 whitespace-pre"
                  placeholder="Paste original code or text here..."
                  wrap="off"
                ></textarea>
              </div>
              <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 font-bold text-sm text-slate-700 dark:text-slate-300 text-center border-b border-slate-200 dark:border-slate-700">Modified Text</div>
                <textarea 
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-sm custom-scrollbar text-slate-800 dark:text-slate-200 whitespace-pre"
                  placeholder="Paste modified code or text here..."
                  wrap="off"
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-900 dark:bg-black rounded-2xl border border-slate-800 overflow-hidden shadow-inner h-[600px] flex flex-col">
              <div className="bg-slate-800 p-3 border-b border-slate-700 flex gap-4 text-xs font-mono">
                <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded">- Removed lines</span>
                <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+ Added lines</span>
              </div>
              <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                <pre className="font-mono text-sm leading-6">
                  {diffResult.map((res, i) => {
                    if (res.type === "added") {
                      return <div key={i} className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 border-l-2 border-emerald-500 break-all whitespace-pre-wrap"><span className="select-none text-emerald-500/50 mr-2">+</span>{res.line || " "}</div>;
                    }
                    if (res.type === "removed") {
                      return <div key={i} className="bg-red-500/10 text-red-400 px-2 py-0.5 border-l-2 border-red-500 break-all whitespace-pre-wrap"><span className="select-none text-red-500/50 mr-2">-</span>{res.line || " "}</div>;
                    }
                    return <div key={i} className="px-2 py-0.5 text-slate-400 break-all whitespace-pre-wrap"><span className="select-none opacity-30 mr-2"> </span>{res.line || " "}</div>;
                  })}
                </pre>
              </div>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
