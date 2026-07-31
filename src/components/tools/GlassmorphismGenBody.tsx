import React, { useState } from 'react';
import { Copy, Check, Layers } from 'lucide-react';

export function GlassmorphismGenBody() {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.15);
  const [outline, setOutline] = useState(0.25);
  const [color, setColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };

  const rgbColor = hexToRgb(color);

  const cssCode = `/* Glassmorphism card effect */
background: rgba(${rgbColor}, ${opacity});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(${rgbColor}, ${outline});
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Blur Value: {blur}px</label>
          </div>
          <input 
            type="range" min="0" max="40" 
            value={blur} 
            onChange={(e) => setBlur(Number(e.target.value))} 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Transparency: {Math.round(opacity * 100)}%</label>
          </div>
          <input 
            type="range" min="0" max="1" step="0.01" 
            value={opacity} 
            onChange={(e) => setOpacity(Number(e.target.value))} 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Outline/Border: {Math.round(outline * 100)}%</label>
          </div>
          <input 
            type="range" min="0" max="1" step="0.01" 
            value={outline} 
            onChange={(e) => setOutline(Number(e.target.value))} 
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" 
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Glass Color (Hex)</label>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="w-12 h-12 rounded cursor-pointer border-0 p-0" 
            />
            <span className="text-slate-600 dark:text-slate-400 uppercase font-mono">{color}</span>
          </div>
        </div>

        {/* CSS Code Output */}
        <div className="mt-8 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CSS Code</span>
              <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors" title="Copy code">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="text-sm text-cyan-300 font-mono overflow-x-auto whitespace-pre-wrap">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative w-full h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden flex items-center justify-center" 
           style={{ 
             background: 'linear-gradient(135deg, #1e1e2f 0%, #0d0d16 100%)'
           }}>
        
        {/* Background decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>

        {/* The Glass Card */}
        <div 
          className="relative z-10 w-72 h-72 rounded-2xl p-6 flex flex-col items-center justify-center text-white transition-all duration-200"
          style={{
            background: `rgba(${rgbColor}, ${opacity})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: `1px solid rgba(${rgbColor}, ${outline})`,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 mb-4 flex items-center justify-center border border-white/30 shadow-inner">
            <Layers className="w-8 h-8 text-white drop-shadow-md" />
          </div>
          <h3 className="text-xl font-bold mb-2 tracking-wide drop-shadow-md">Glass Card</h3>
          <p className="text-sm text-center text-white/90 leading-relaxed">
            Beautiful frosted glass effect for modern user interfaces.
          </p>
        </div>
      </div>
    </div>
  );
}
