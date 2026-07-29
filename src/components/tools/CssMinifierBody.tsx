"use client";
import { useState } from "react";
import { Shrink } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function CssMinifierBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const minifyCss = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      // Basic CSS minification algorithm
      const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse multiple whitespace to single space
        .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove spaces around syntax characters
        .replace(/;\s*}/g, '}') // Remove trailing semicolon inside blocks
        .trim();

      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to minify CSS");
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
          placeholder="Paste your raw, uncompressed CSS here..." 
        />
        <ToolAction 
          onClick={minifyCss} 
          icon={<Shrink />}
          className="mt-4 !bg-sky-500 !hover:bg-sky-600"
        >
          Minify CSS
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Minified Output" 
          value={output} 
          error={error}
          placeholder="Minified code will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
