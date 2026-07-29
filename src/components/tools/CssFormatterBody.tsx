"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { css as beautifyCss } from "js-beautify";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function CssFormatterBody() {
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
      const formatted = beautifyCss(input, { 
        indent_size: 2, 
        preserve_newlines: true
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to format CSS");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Raw CSS" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }}
          placeholder="Paste raw CSS here..." 
        />
        <ToolAction 
          onClick={formatCode} 
          icon={<Play />}
          className="mt-4 !bg-pink-500 !hover:bg-pink-600"
        >
          Format CSS
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Formatted Output" 
          value={output} 
          error={error}
          placeholder="Formatted CSS will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
