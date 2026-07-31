import React, { useState } from 'react';
import { Copy, Check, LayoutTemplate } from 'lucide-react';

export function BoxShadowGenBody() {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(-3);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.15);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
  };

  const cssValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity})`;
  const cssCode = `box-shadow: ${cssValue};\n-webkit-box-shadow: ${cssValue};\n-moz-box-shadow: ${cssValue};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Controls */}
        <div className="space-y-4">
          {[
            { label: 'Horizontal Offset', value: hOffset, setter: setHOffset, min: -50, max: 50 },
            { label: 'Vertical Offset', value: vOffset, setter: setVOffset, min: -50, max: 50 },
            { label: 'Blur Radius', value: blur, setter: setBlur, min: 0, max: 100 },
            { label: 'Spread Radius', value: spread, setter: setSpread, min: -50, max: 50 },
          ].map((control, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{control.label}: {control.value}px</label>
              </div>
              <input type="range" min={control.min} max={control.max} value={control.value} onChange={(e) => control.setter(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
            </div>
          ))}
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Opacity: {Math.round(opacity * 100)}%</label>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Shadow Color</label>
              <div className="flex items-center gap-4">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <span className="text-slate-600 dark:text-slate-400 uppercase font-mono">{color}</span>
              </div>
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer mt-5">
              <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Inset Shadow</span>
            </label>
          </div>
        </div>

        {/* Code Output */}
        <div className="relative group mt-6">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CSS Code</span>
              <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="text-sm text-indigo-300 font-mono overflow-x-auto whitespace-pre-wrap">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] lg:h-full min-h-[400px] rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 transition-colors">
        <div 
          className="w-48 h-48 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ boxShadow: cssValue }}
        >
          <LayoutTemplate className="w-12 h-12 text-slate-300 dark:text-slate-700" />
        </div>
      </div>
    </div>
  );
}
