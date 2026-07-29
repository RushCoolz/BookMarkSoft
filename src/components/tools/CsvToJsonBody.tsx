"use client";
import { useState } from "react";
import Papa from "papaparse";
import { Play } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function CsvToJsonBody() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const result = Papa.parse(input, { 
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      
      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }
      
      setOutput(JSON.stringify(result.data, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to parse CSV");
      setOutput("");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="CSV Data Input" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }} 
          placeholder="name,age,active\nJohn,30,true\nJane,25,false" 
        />
        <ToolAction 
          onClick={convert} 
          icon={<Play />} 
          className="mt-4"
        >
          Convert to JSON
        </ToolAction>
      </ToolMain>
      <ToolMain>
        <ToolOutput 
          label="JSON Output" 
          value={output} 
          error={error} 
          placeholder={'[\n  {\n    "name": "John",\n    "age": 30,\n    "active": true\n  }\n]'} 
        />
      </ToolMain>
    </ToolContainer>
  );
}
