"use client";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function UrlEncodeToolBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError(null);
    } catch (err: any) {
      setError(mode === "encode" ? "Failed to encode" : "Malformed URI sequence");
      setOutput("");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-center mb-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-max">
          <button 
            onClick={() => { setMode("encode"); setInput(""); setOutput(""); setError(null); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "encode" ? 'bg-white dark:bg-slate-900 shadow-sm text-sky-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            URL Encode
          </button>
          <button 
            onClick={() => { setMode("decode"); setInput(""); setOutput(""); setError(null); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "decode" ? 'bg-white dark:bg-slate-900 shadow-sm text-sky-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            URL Decode
          </button>
        </div>
      </div>
      <ToolContainer split="half">
        <ToolMain>
          <ToolInput 
            label={mode === "encode" ? "Raw String (e.g. ?q=hello world)" : "Encoded URL"} 
            value={input} 
            onChange={setInput} 
            onClear={() => { setInput(""); setOutput(""); setError(null); }}
            placeholder={mode === "encode" ? "Enter string to URL encode..." : "Enter encoded URL..."}
          />
          <ToolAction 
            onClick={handleProcess}
            icon={<ArrowRightLeft />}
            className="mt-4 !bg-sky-500 !hover:bg-sky-600"
          >
            {mode === "encode" ? "Encode URL" : "Decode URL"}
          </ToolAction>
        </ToolMain>
        <ToolMain>
          <ToolOutput 
            label="Result" 
            value={output} 
            error={error}
          />
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
