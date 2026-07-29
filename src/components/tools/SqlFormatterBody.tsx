"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { format as formatSql } from "sql-formatter";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function SqlFormatterBody() {
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
      const formatted = formatSql(input, { 
        language: 'postgresql',
        keywordCase: 'upper',
        linesBetweenQueries: 2
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to format SQL");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Raw SQL Query" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }}
          placeholder="SELECT * FROM table WHERE condition = true" 
        />
        <ToolAction 
          onClick={formatCode} 
          icon={<Play />}
          className="mt-4"
        >
          Format SQL
        </ToolAction>
      </ToolMain>

      <ToolMain>
        <ToolOutput 
          label="Formatted Query" 
          value={output} 
          error={error}
          placeholder="Formatted SQL will appear here..." 
        />
      </ToolMain>
    </ToolContainer>
  );
}
