"use client";
import { useState } from "react";
import Papa from "papaparse";
import { Play } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function JsonToCsvBody() {
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
      const parseFunction = new Function("return " + input);
      const obj = parseFunction();
      
      const csv = Papa.unparse(obj, {
        quotes: false,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ",",
        header: true,
        newline: "\n",
      });
      setOutput(csv);
      setError(null);
    } catch (err: any) {
      setError("Invalid JSON format or array structure");
      setOutput("");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="JSON Array Input" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }} 
          placeholder={'[\n  { "name": "John", "age": 30 },\n  { "name": "Jane", "age": 25 }\n]'} 
        />
        <ToolAction 
          onClick={convert} 
          icon={<Play />} 
          className="mt-4 !bg-green-600 !hover:bg-green-700"
        >
          Convert to CSV
        </ToolAction>
      </ToolMain>
      <ToolMain>
        <ToolOutput 
          label="CSV Output" 
          value={output} 
          error={error} 
          placeholder="name,age\nJohn,30\nJane,25" 
        />
      </ToolMain>
    </ToolContainer>
  );
}
