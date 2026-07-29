"use client";
import { useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { Play } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolAction } from "../ui/tool/ToolAction";

export function XmlToJsonBody() {
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
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "_",
      });
      const result = parser.parse(input);
      
      if (Object.keys(result).length === 0) {
        throw new Error("Invalid XML document");
      }
      
      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to parse XML");
      setOutput("");
    }
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="XML Data Input" 
          value={input} 
          onChange={setInput} 
          onClear={() => { setInput(""); setOutput(""); setError(null); }} 
          placeholder="<user id='1'>\n  <name>John</name>\n</user>" 
        />
        <ToolAction 
          onClick={convert} 
          icon={<Play />} 
          className="mt-4 !bg-orange-600 !hover:bg-orange-700"
        >
          Convert to JSON
        </ToolAction>
      </ToolMain>
      <ToolMain>
        <ToolOutput 
          label="JSON Output" 
          value={output} 
          error={error} 
          placeholder={'{\n  "user": {\n    "_id": "1",\n    "name": "John"\n  }\n}'} 
        />
      </ToolMain>
    </ToolContainer>
  );
}
