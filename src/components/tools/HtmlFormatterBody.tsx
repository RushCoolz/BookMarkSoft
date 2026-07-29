"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { html as beautifyHtml } from "js-beautify";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function HtmlFormatterBody() {
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
      const formatted = beautifyHtml(input, { 
        indent_size: 2, 
        preserve_newlines: true,
        max_preserve_newlines: 2
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to format HTML");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Raw HTML" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }}
          placeholder="Paste raw HTML here..." 
        />
        <ToolAction 
          onClick={formatCode} 
          icon={<Play />}
          className="mt-4 bg-orange-600 hover:bg-orange-700"
        >
          Format HTML
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Formatted Output" 
          value={output} 
          error={error}
          placeholder="Formatted HTML will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
