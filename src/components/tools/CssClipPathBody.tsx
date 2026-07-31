import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const SHAPES = {
  Triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  Trapezoid: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
  Parallelogram: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
  Rhombus: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  Pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  Hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  Heptagon: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
  Octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  Star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  Cross: 'polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)',
  Message: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)',
};

export function CssClipPathBody() {
  const [activeShape, setActiveShape] = useState<keyof typeof SHAPES>('Hexagon');
  const [copied, setCopied] = useState(false);

  const clipPathValue = SHAPES[activeShape];
  const cssCode = `clip-path: ${clipPathValue};\n-webkit-clip-path: ${clipPathValue};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Object.keys(SHAPES).map((shape) => (
          <button
            key={shape}
            onClick={() => setActiveShape(shape as keyof typeof SHAPES)}
            className={`p-3 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 ${
              activeShape === shape 
                ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-500 text-pink-600 dark:text-pink-400 shadow-md scale-105' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-pink-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div 
              className="w-8 h-8 bg-current transition-all duration-500" 
              style={{ clipPath: SHAPES[shape as keyof typeof SHAPES], WebkitClipPath: SHAPES[shape as keyof typeof SHAPES] }}
            />
            <span className="text-xs font-medium tracking-wide">{shape}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800">
          {/* Grid background pattern */}
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Clipped Element */}
          <div 
            className="relative z-10 w-64 h-64 shadow-2xl transition-all duration-500 ease-in-out"
            style={{ clipPath: clipPathValue, WebkitClipPath: clipPathValue }}
          >
             <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500" />
          </div>
        </div>

        <div className="relative group h-full flex flex-col justify-center">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CSS Code</span>
              <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="text-sm text-pink-300 font-mono overflow-x-auto whitespace-pre-wrap">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
