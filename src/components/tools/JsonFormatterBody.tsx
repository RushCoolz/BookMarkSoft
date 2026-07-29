"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function JsonFormatterBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    const sanitizedInput = input
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"');

    try {
      const parsed = JSON.parse(sanitizedInput);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (strictErr: any) {
      try {
        const parsed = (new Function("return " + sanitizedInput))();
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error("Result is not a valid JSON object/array");
        }
        setOutput(JSON.stringify(parsed, null, 2));
        setError(null);
      } catch (relaxedErr: any) {
        setError(strictErr.message || "Invalid JSON format");
      }
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Input JSON" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }}
          placeholder="Paste your raw JSON here..." 
        />
        <ToolAction 
          onClick={formatJson} 
          icon={<Play />}
          className="mt-4"
        >
          Format & Beautify
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Formatted Result" 
          value={output} 
          error={error}
          placeholder="Formatted JSON will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
