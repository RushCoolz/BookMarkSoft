"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { js as beautifyJs } from "js-beautify";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function JsFormatterBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatCode = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const formatted = beautifyJs(input, { 
        indent_size: 2, 
        preserve_newlines: true,
        max_preserve_newlines: 2
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to format JS/TS code");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Raw JS/TS" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }}
          placeholder="Paste raw JavaScript or TypeScript code here..." 
        />
        <ToolAction 
          onClick={formatCode} 
          icon={<Play />}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900"
        >
          Format Code
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Formatted Output" 
          value={output} 
          error={error}
          placeholder="Formatted JS/TS code will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
