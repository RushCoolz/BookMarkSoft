import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface ToolOutputProps {
  label: string;
  value: string;
  error?: string | null;
  placeholder?: string;
  className?: string;
  allowCopy?: boolean;
}

export function ToolOutput({
  label,
  value,
  error = null,
  placeholder = 'Output will appear here...',
  className = '',
  allowCopy = true
}: ToolOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col flex-1 h-full min-h-[200px] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="font-medium text-slate-700 dark:text-slate-300">{label}</label>
        {error && <span className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded font-medium">{error}</span>}
      </div>
      
      <div className="relative flex-1 flex flex-col">
        <textarea
          value={value}
          readOnly
          placeholder={placeholder}
          className={`flex-1 w-full p-4 border rounded-xl font-mono text-sm bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md text-blue-400 outline-none resize-none transition-all custom-scrollbar ${error ? 'border-red-500/50' : 'border-slate-700/50'}`}
        ></textarea>
        
        {allowCopy && (
          <button 
            onClick={copyToClipboard}
            disabled={!value}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm ${!value ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${copied ? 'bg-green-500 text-white dark:text-slate-900 hover:bg-green-600' : 'bg-slate-800 text-slate-300 dark:text-slate-600 hover:bg-slate-700 hover:text-white border border-slate-700'}`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
