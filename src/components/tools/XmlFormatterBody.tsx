"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import xmlFormat from "xml-formatter";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function XmlFormatterBody() {
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
      const formatted = xmlFormat(input, { 
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n'
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to format XML");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Raw XML" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }}
          placeholder="Paste raw XML here..." 
        />
        <ToolAction 
          onClick={formatCode} 
          icon={<Play />}
          className="mt-4 !bg-orange-500 !hover:bg-orange-600"
        >
          Format XML
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Formatted Output" 
          value={output} 
          error={error}
          placeholder="Formatted XML will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
