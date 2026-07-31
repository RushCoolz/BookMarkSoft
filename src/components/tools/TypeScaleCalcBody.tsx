import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const SCALES = {
  'Minor Second (1.067)': 1.067,
  'Major Second (1.125)': 1.125,
  'Minor Third (1.200)': 1.200,
  'Major Third (1.250)': 1.250,
  'Perfect Fourth (1.333)': 1.333,
  'Augmented Fourth (1.414)': 1.414,
  'Perfect Fifth (1.500)': 1.500,
  'Golden Ratio (1.618)': 1.618,
};

export function TypeScaleCalcBody() {
  const [baseSize, setBaseSize] = useState(16);
  const [scale, setScale] = useState(1.25);
  const [copied, setCopied] = useState(false);

  // Generate the scale levels
  const levels = [
    { name: 'h1', step: 5 },
    { name: 'h2', step: 4 },
    { name: 'h3', step: 3 },
    { name: 'h4', step: 2 },
    { name: 'h5', step: 1 },
    { name: 'p', step: 0 },
    { name: 'small', step: -1 },
  ];

  const generatedVars = levels.map((l) => {
    const size = baseSize * Math.pow(scale, l.step);
    return `--text-${l.name}: ${Number((size / 16).toFixed(3))}rem; /* ${Math.round(size)}px */`;
  }).join('\n');

  const cssCode = `:root {\n  --base-font-size: ${baseSize}px;\n  --type-scale: ${scale};\n\n${generatedVars.split('\n').map(l => '  ' + l).join('\n')}\n}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Base Font Size (px)</label>
          <input 
            type="number" 
            value={baseSize} 
            onChange={(e) => setBaseSize(Number(e.target.value))} 
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Typography Scale Ratio</label>
          <select 
            value={scale} 
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            {Object.entries(SCALES).map(([name, val]) => (
              <option key={name} value={val}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 overflow-hidden">
          {levels.map((l) => {
            const size = baseSize * Math.pow(scale, l.step);
            return (
              <div key={l.name} className="flex items-baseline gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="w-24 flex-shrink-0 text-slate-400 text-sm font-mono text-right">
                  {Math.round(size)}px<br/>{(size/16).toFixed(3)}rem
                </div>
                <div style={{ fontSize: `${size}px`, lineHeight: 1.2 }} className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {l.name === 'p' ? 'Body Text Example' : `Heading ${l.name.toUpperCase()}`}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900 rounded-xl p-6 border border-slate-800 h-full">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CSS Variables</span>
              <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="text-sm text-cyan-300 font-mono overflow-x-auto">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
