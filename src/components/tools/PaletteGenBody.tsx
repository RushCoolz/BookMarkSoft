"use client";
import { useState, useEffect } from "react";
import { Paintbrush, Shuffle, Copy, Check } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function PaletteGenBody() {
  const [colors, setColors] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  };

  useEffect(() => {
    generatePalette();
  }, []);

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color.toUpperCase());
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-5xl mx-auto w-full space-y-8 py-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
              <Paintbrush className="text-rose-500 w-8 h-8" /> Color Palette Generator
            </h2>
            <ToolAction 
              onClick={generatePalette}
              icon={<Shuffle className="w-5 h-5" />}
              className="!bg-rose-500 hover:!bg-rose-600 px-6 py-3 text-lg"
            >
              Generate New
            </ToolAction>
          </div>

          <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">
            {colors.map((color, idx) => (
              <div 
                key={idx}
                className="flex-1 h-full group relative transition-all duration-300 hover:flex-[1.5] cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => copyColor(color, idx)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-xl shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm tracking-widest">{color.toUpperCase()}</span>
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-slate-500 text-sm font-medium">
            <p>Click on any color to copy its HEX code to your clipboard.</p>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
