"use client";
import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Copy, Check, Eye, Code } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";

export function MarkdownToHtmlBody() {
  const [markdown, setMarkdown] = useState("# Welcome to Markdown\n\nWrite your **markdown** on the left side, and it will be instantly converted to HTML on the right side.\n\n## Features:\n- Lists\n- `inline code`\n- [Links](https://example.com)\n\n> This is a blockquote.");
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  useEffect(() => {
    const renderMarkdown = async () => {
      const rawHtml = await marked.parse(markdown);
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      setHtml(cleanHtml);
    };
    renderMarkdown();
  }, [markdown]);

  const copyToClipboard = () => {
    if (!html) return;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Markdown Editor" 
          value={markdown} 
          onChange={setMarkdown} 
          onClear={() => setMarkdown("")} 
          placeholder="Type your markdown here..." 
        />
      </ToolMain>

      <ToolMain>
        <div className="flex flex-col h-full min-h-[200px] flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">HTML Output</label>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setViewMode("preview")}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${viewMode === "preview" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                <Eye className="w-3 h-3" /> Preview
              </button>
              <button 
                onClick={() => setViewMode("code")}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${viewMode === "code" ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                <Code className="w-3 h-3" /> Source Code
              </button>
            </div>
          </div>
          
          <div className="relative flex-1 flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 transition-all">
            {viewMode === "code" ? (
              <textarea
                value={html}
                readOnly
                className="flex-1 w-full p-4 font-mono text-sm bg-slate-900 dark:bg-slate-950 text-sky-400 outline-none resize-none custom-scrollbar"
              ></textarea>
            ) : (
              <div 
                className="flex-1 w-full p-6 prose prose-slate dark:prose-invert max-w-none overflow-y-auto custom-scrollbar"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            )}
            
            {viewMode === "code" && (
              <button 
                onClick={copyToClipboard}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm ${copied ? 'bg-green-500 text-white dark:text-slate-900 hover:bg-green-600' : 'bg-slate-800 text-slate-300 dark:text-slate-600 hover:bg-slate-700 border border-slate-700'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
