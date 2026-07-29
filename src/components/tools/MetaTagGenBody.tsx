"use client";
import { useState, useEffect } from "react";
import { Tags, Copy, Check } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function MetaTagGenBody() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [allowRobots, setAllowRobots] = useState(true);
  const [language, setLanguage] = useState("en");
  
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let html = `<!-- Primary Meta Tags -->\n`;
    
    if (title) {
      html += `<title>${title}</title>\n`;
      html += `<meta name="title" content="${title}">\n`;
    }
    
    if (description) {
      html += `<meta name="description" content="${description}">\n`;
    }
    
    if (keywords) {
      html += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (author) {
      html += `<meta name="author" content="${author}">\n`;
    }
    
    html += `<meta name="robots" content="${allowRobots ? 'index, follow' : 'noindex, nofollow'}">\n`;
    html += `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n`;
    html += `<meta name="language" content="${language}">\n`;

    setOutput(html.trim());
  }, [title, description, keywords, author, allowRobots, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Tag Settings</h3>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="e.g. BookmarkSoft - Developer Tools"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                placeholder="e.g. A collection of free tools for developers..."
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Keywords (comma separated)</label>
              <input 
                type="text" 
                value={keywords} 
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="e.g. tools, developer, json, format"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Author</label>
                <input 
                  type="text" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={allowRobots} 
                  onChange={(e) => setAllowRobots(e.target.checked)} 
                  className="w-4 h-4 text-blue-600 dark:text-blue-500" 
                />
                <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Allow search engines to index (index, follow)</span>
              </label>
            </div>
          </div>

          {/* Output Section */}
          <div className="flex flex-col h-full min-h-[400px]">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Generated Tags</h3>
            
            <div className="relative flex-1 bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden group shadow-inner">
              <textarea
                value={output}
                readOnly
                className="w-full h-full p-6 font-mono text-sm text-sky-400 bg-transparent outline-none resize-none custom-scrollbar"
              ></textarea>
              <button 
                onClick={copyToClipboard}
                className={`absolute top-4 right-4 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm ${copied ? 'bg-green-500 text-white dark:text-slate-900 hover:bg-green-600' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Tags"}
              </button>
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
