"use client";
import { useState, useEffect } from "react";
import { Edit3, Columns } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function LiveMarkdownBody() {
  const [markdown, setMarkdown] = useState("# Welcome to Live Markdown\n\nWrite your markdown on the left, and it will preview on the right instantly.\n\n## Features\n- **Bold** and *Italic*\n- [Links](https://example.com)\n- `Inline Code`\n\n```js\nconsole.log(\"Code blocks!\");\n```\n\n> Blockquotes are supported too.\n\n### Lists\n1. First item\n2. Second item\n\nEnjoy editing!");
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Very basic markdown parser for a static demo.
    // In production, we should use 'marked' or 'remark'.
    const parse = (md: string) => {
      let parsed = md;
      // Headers
      parsed = parsed.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      parsed = parsed.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      parsed = parsed.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      // Bold
      parsed = parsed.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
      // Italic
      parsed = parsed.replace(/\*(.*)\*/gim, '<em>$1</em>');
      // Links
      parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' class='text-blue-500 underline'>$1</a>");
      // Code blocks
      parsed = parsed.replace(/```(.*)\n([\s\S]*?)```/gim, "<pre class='bg-slate-100 dark:bg-slate-800 p-4 rounded-xl my-4 overflow-auto text-sm'><code>$2</code></pre>");
      // Inline code
      parsed = parsed.replace(/`(.*?)`/gim, "<code class='bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm'>$1</code>");
      // Blockquote
      parsed = parsed.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 dark:border-slate-600 pl-4 my-4 italic">$1</blockquote>');
      // Lists (naive)
      parsed = parsed.replace(/^\d+\.\s(.*$)/gim, '<li class="ml-4 list-decimal">$1</li>');
      parsed = parsed.replace(/^\-\s(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
      // Paragraphs
      parsed = parsed.replace(/^\s*(\n)?(.+)/gim, function(m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p class="mb-4">' + m + '</p>';
      });
      return parsed;
    };

    setHtml(parse(markdown));
  }, [markdown]);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-6xl mx-auto w-full space-y-6">
          
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Edit3 className="text-slate-500 w-6 h-6" />
            <h2 className="text-xl font-bold">Live Markdown Editor</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-0 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm h-[700px]">
            
            {/* Editor */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-b border-slate-200 dark:border-slate-700">
                Editor
              </div>
              <textarea 
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 custom-scrollbar"
                spellCheck={false}
              ></textarea>
            </div>

            {/* Preview */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-b border-slate-200 dark:border-slate-700">
                Preview
              </div>
              <div 
                className="flex-1 overflow-auto p-8 custom-scrollbar prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>
            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
