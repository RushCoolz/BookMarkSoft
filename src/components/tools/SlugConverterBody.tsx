import React, { useState } from 'react';
import { Copy, Check, RefreshCcw } from 'lucide-react';

export function SlugConverterBody() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-') // Swap spaces and underscores for hyphens
      .replace(/^-+|-+$/g, ''); // Remove trailing hyphens
  };

  const slug = convertToSlug(input);

  const copyToClipboard = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-2">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Enter Text</label>
           <button onClick={() => setInput('')} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 transition-colors">
             <RefreshCcw className="w-3 h-3" /> Clear
           </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a blog post title, product name, or any text here..."
          className="w-full h-32 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors resize-none text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-center">
        <div className="h-12 w-px bg-slate-200 dark:bg-slate-800"></div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-emerald-900/30 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Generated Slug
          </h3>
          <button 
            onClick={copyToClipboard}
            disabled={!slug}
            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[80px] flex items-center break-all">
          {slug ? (
            <p className="font-mono text-emerald-400 text-lg">{slug}</p>
          ) : (
            <p className="text-slate-600 font-mono text-sm italic">your-url-friendly-slug-will-appear-here</p>
          )}
        </div>
      </div>

    </div>
  );
}
