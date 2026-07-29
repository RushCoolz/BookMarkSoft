"use client";
import { useState, useRef, useEffect } from "react";
import { Upload, Copy, Check, Trash2, Crosshair, Pipette } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function ColorPickerBody() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState({ hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" });
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
  };

  const handleImageLoad = () => {
    if (!canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const img = imageRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas internal dimensions to match natural image size for accurate pixel picking
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    if (ctx) {
      ctx.drawImage(img, 0, 0);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate scale factor between displayed size and natural size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get actual pixel coordinates
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const r = pixelData[0];
      const g = pixelData[1];
      const b = pixelData[2];
      const a = pixelData[3] / 255;
      
      const rgb = `rgb(${r}, ${g}, ${b})`;
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
      
      setColor({ hex, rgb });
    }
  };

  const copyHex = () => {
    navigator.clipboard.writeText(color.hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  return (
    <ToolContainer split="none">
      <ToolMain className="gap-8">
      
      {/* Top Banner (Color Output) */}
      <div className="flex items-center gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm relative overflow-hidden">
        {/* Background Color Splash */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 blur-2xl transition-colors duration-500" style={{ backgroundColor: color.hex }}></div>
        
        <div 
          className="w-20 h-20 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700 transition-colors duration-200 z-10 flex items-center justify-center"
          style={{ backgroundColor: color.hex }}
        >
          <Pipette className="w-8 h-8 text-white dark:text-slate-900 drop-shadow-md mix-blend-difference" />
        </div>
        
        <div className="flex-1 z-10 flex flex-wrap gap-8 items-center">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">HEX Color</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-800 dark:text-slate-200 font-mono tracking-tight">{color.hex}</span>
              <button 
                onClick={copyHex}
                className={`p-1.5 rounded-md transition-colors ${copiedHex ? 'bg-green-100 text-green-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:text-slate-300 dark:text-slate-300'}`}
              >
                {copiedHex ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">RGB Color</p>
            <span className="text-xl font-bold text-slate-600 dark:text-slate-400 font-mono">{color.rgb}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-h-[400px]">
        {!imageSrc ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 cursor-pointer transition-all ${isDragging ? 'border-pink-500 bg-pink-50' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800'}`}
          >
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-pink-500 shadow-sm mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-lg">Upload an image to pick colors</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">Click or drag a file here</p>
          </div>
        ) : (
          <div className="relative flex-1 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-inner flex items-center justify-center p-4 overflow-hidden">
            {/* Hidden image used to source the canvas natural size */}
            <img 
              ref={imageRef} 
              src={imageSrc} 
              alt="Source" 
              className="hidden" 
              onLoad={handleImageLoad}
            />
            {/* Visible interactive canvas */}
            <div className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden">
              <canvas 
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="cursor-crosshair rounded shadow-2xl block"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              ></canvas>
            </div>
            
            {/* Top Toolbar */}
            <div className="absolute top-4 right-4 flex gap-2">
               <button 
                onClick={() => setImageSrc(null)}
                className="bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 backdrop-blur-md text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Clear Image
              </button>
            </div>
            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 pointer-events-none">
              <Crosshair className="w-4 h-4" /> Click anywhere on the image to pick a color
            </div>
          </div>
        )}
      </div>
      </ToolMain>
    </ToolContainer>
  );
}
