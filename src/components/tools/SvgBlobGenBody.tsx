import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export function SvgBlobGenBody() {
  const [blob, setBlob] = useState('30% 70% 70% 30% / 30% 30% 70% 70%');
  const [copied, setCopied] = useState(false);
  
  const generateBlob = () => {
    const r = () => Math.floor(Math.random() * 50) + 25; // 25% to 75%
    const r1 = r();
    const r2 = r();
    const r3 = r();
    const r4 = r();
    // Organic blobs use opposing percentages that total 100% for a smooth curve
    setBlob(`${r1}% ${100-r1}% ${100-r2}% ${r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`);
  };

  useEffect(() => {
    generateBlob();
  }, []);

  const cssCode = `border-radius: ${blob};\nbackground: linear-gradient(135deg, #f43f5e 0%, #3b82f6 100%);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full h-[400px] bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-800">
        <div 
          className="w-64 h-64 bg-gradient-to-br from-rose-500 to-blue-500 shadow-xl transition-all duration-700 ease-in-out"
          style={{ borderRadius: blob }}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">CSS Organic Blob</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Generates fluid shapes using complex border-radius math.</p>
          </div>
          <button 
            onClick={generateBlob}
            className="flex items-center gap-2 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 dark:text-rose-400 rounded-lg transition-colors font-medium text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Randomize
          </button>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-blue-500 rounded-xl blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CSS Code</span>
              <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="text-sm text-rose-300 font-mono overflow-x-auto whitespace-pre-wrap">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
