"use client";
import { useState } from "react";
import { Code2, ArrowRightLeft, Copy, Check } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function HtmlEntitiesBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const processText = () => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        // Native browser trick to encode entities safely
        const div = document.createElement("div");
        div.innerText = input;
        setOutput(div.innerHTML);
      } else {
        // Decode
        const doc = new DOMParser().parseFromString(input, "text/html");
        setOutput(doc.documentElement.textContent || "");
      }
      setCopied(false);
    } catch (e) {
      setOutput("Error processing text.");
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-max mx-auto mb-4 border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => { setMode("encode"); setOutput(""); }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "encode" ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-800 dark:text-slate-200' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Encode to Entities
            </button>
            <button 
              onClick={() => { setMode("decode"); setOutput(""); }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "decode" ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-800 dark:text-slate-200' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Decode Entities
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 h-[500px]">
            <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300">
                Input Text {mode === "decode" && "(with &entities;)"}
              </div>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "<div>Hello World & Friends</div>" : "&lt;div&gt;Hello World &amp; Friends&lt;/div&gt;"}
                className="flex-1 w-full p-4 bg-transparent resize-none outline-none font-mono text-sm text-slate-800 dark:text-slate-200 custom-scrollbar"
              ></textarea>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <ToolAction 
                onClick={processText}
                icon={<ArrowRightLeft className="w-5 h-5" />}
                className="p-4 rounded-xl !bg-slate-800 !hover:bg-slate-700 dark:!bg-slate-700 dark:!hover:bg-slate-600 shadow-lg"
              >
                Process
              </ToolAction>
            </div>

            <div className="flex-1 flex flex-col bg-slate-900 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner">
              <div className="bg-slate-800 dark:bg-slate-900 p-3 border-b border-slate-700 dark:border-slate-800 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-300">Output {mode === "encode" && "(Entities)"}</span>
                <button 
                  onClick={copyToClipboard}
                  disabled={!output}
                  className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${copied ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea 
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="flex-1 w-full p-4 bg-transparent resize-none outline-none font-mono text-sm text-slate-300 custom-scrollbar"
              ></textarea>
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
