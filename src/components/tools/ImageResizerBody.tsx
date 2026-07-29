"use client";
import { useState, useRef } from "react";
import { Download, Trash2, ArrowRight, Lock, Unlock } from "lucide-react";
import { ToolContainer, ToolSidebar, ToolMain } from "../ui/tool/ToolContainer";
import { ToolDropzone } from "../ui/tool/ToolDropzone";
import { ToolAction } from "../ui/tool/ToolAction";

export function ImageResizerBody() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalDim, setOriginalDim] = useState({ w: 0, h: 0 });
  const [newDim, setNewDim] = useState({ w: 0, h: 0 });
  const [maintainAspect, setMaintainAspect] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const w = imageRef.current.naturalWidth;
      const h = imageRef.current.naturalHeight;
      setOriginalDim({ w, h });
      setNewDim({ w, h }); // Start with original size
    }
  };

  const handleWidthChange = (val: string) => {
    const w = parseInt(val) || 0;
    if (maintainAspect && originalDim.w > 0) {
      const h = Math.round(w * (originalDim.h / originalDim.w));
      setNewDim({ w, h });
    } else {
      setNewDim({ ...newDim, w });
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(val) || 0;
    if (maintainAspect && originalDim.h > 0) {
      const w = Math.round(h * (originalDim.w / originalDim.h));
      setNewDim({ w, h });
    } else {
      setNewDim({ ...newDim, h });
    }
  };

  const handleDownload = () => {
    if (!imageRef.current || newDim.w <= 0 || newDim.h <= 0) return;
    
    // Draw to hidden canvas to resize
    const canvas = document.createElement("canvas");
    canvas.width = newDim.w;
    canvas.height = newDim.h;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.drawImage(imageRef.current, 0, 0, newDim.w, newDim.h);
      
      // Get data URL and trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `resized_${newDim.w}x${newDim.h}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <ToolContainer split="sidebar">
      <ToolSidebar>
        {!imageSrc ? (
          <ToolDropzone onFileSelect={handleFile} accept="image/*" label="Drop Image" />
        ) : (
          <>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-700 dark:text-slate-300">Resize Options</h3>
                <button onClick={() => setImageSrc(null)} className="text-red-500 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Width (px)</label>
                  <input 
                    type="number" 
                    value={newDim.w || ""} 
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
                
                <div className="flex justify-center -my-2 relative z-10">
                  <button 
                    onClick={() => setMaintainAspect(!maintainAspect)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-sm transition-colors ${maintainAspect ? 'bg-blue-100 border-blue-200 text-blue-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'}`}
                    title="Toggle Aspect Ratio Lock"
                  >
                    {maintainAspect ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Height (px)</label>
                  <input 
                    type="number" 
                    value={newDim.h || ""} 
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <ToolAction onClick={handleDownload} icon={<Download />}>
              Download Image
            </ToolAction>
          </>
        )}
      </ToolSidebar>

      <ToolMain>
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col overflow-hidden">
          {imageSrc ? (
            <>
              {/* Info bar */}
              <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-3 flex justify-around text-sm font-medium">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span>Original:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{originalDim.w} x {originalDim.h}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                <div className="flex items-center gap-2 text-blue-600">
                  <span>New Size:</span>
                  <span className="font-mono">{newDim.w} x {newDim.h}</span>
                </div>
              </div>
              {/* Preview image visually scales to fit */}
              <div className="flex-1 p-6 flex items-center justify-center relative bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
                <img 
                  ref={imageRef}
                  src={imageSrc} 
                  alt="Preview" 
                  onLoad={handleImageLoad}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl" 
                  style={{ width: `${(newDim.w / originalDim.w) * 100}%` }} // Visual hint of scale change
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <p>Upload an image to see preview</p>
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
