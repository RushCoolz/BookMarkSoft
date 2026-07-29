"use client";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function Base64ToolBody() {
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
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
      setError(null);
    } catch (err: any) {
      setError(mode === "encode" ? "Failed to encode input" : "Invalid Base64 string");
      setOutput("");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-center mb-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-max">
          <button 
            onClick={() => { setMode("encode"); setInput(""); setOutput(""); setError(null); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "encode" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            Encode
          </button>
          <button 
            onClick={() => { setMode("decode"); setInput(""); setOutput(""); setError(null); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === "decode" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            Decode
          </button>
        </div>
      </div>
      <ToolContainer split="half">
        <ToolMain>
          <ToolInput 
            label={mode === "encode" ? "Raw Text Input" : "Base64 Input"} 
            value={input} 
            onChange={setInput} 
            onClear={() => { setInput(""); setOutput(""); setError(null); }}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string..."}
          />
          <ToolAction 
            onClick={handleProcess}
            icon={<ArrowRightLeft />}
            className="mt-4"
          >
            {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
          </ToolAction>
        </ToolMain>
        <ToolMain>
          <ToolOutput 
            label={mode === "encode" ? "Base64 Output" : "Raw Text Output"} 
            value={output} 
            error={error}
          />
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
