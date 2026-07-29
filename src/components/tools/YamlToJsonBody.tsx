"use client";
import { useState } from "react";
import YAML from "yaml";
import { Play } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function YamlToJsonBody() {
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
      const result = YAML.parse(input);
      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid YAML syntax");
      setOutput("");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="YAML Config Input" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }} 
          placeholder="server:\n  port: 8080\n  env: production" 
        />
        <ToolAction 
          onClick={convert} 
          icon={<Play />} 
          className="mt-4 !bg-indigo-600 !hover:bg-indigo-700"
        >
          Convert to JSON
        </ToolAction>
      </ToolMain>
      <ToolMain>
        <ToolOutput 
          label="JSON Output" 
          value={output} 
          error={error} 
          placeholder={'{\n  "server": {\n    "port": 8080,\n    "env": "production"\n  }\n}'} 
        />
      </ToolMain>
    </ToolContainer>
  );
}
