import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCcw, ImagePlus } from 'lucide-react';

export function ImageFilterStudioBody() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  
  // Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);
  const [blur, setBlur] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        resetFilters();
      };
      reader.readAsDataURL(file);
    }
  };

  const resetFilters = () => {
    setBrightness(100); setContrast(100); setSaturate(100);
    setGrayscale(0); setSepia(0); setInvert(0); setBlur(0); setHueRotate(0);
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
          ctx.drawImage(img, 0, 0);
        }
      };
    }
  }, [imageSrc, brightness, contrast, saturate, grayscale, sepia, invert, blur, hueRotate]);

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `filtered-image-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* Controls Sidebar */}
      <div className="lg:col-span-1 bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col gap-6">
        <h3 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
          <ImagePlus className="w-5 h-5 text-sky-400" /> Filters
        </h3>

        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
          {[
            { label: 'Brightness', val: brightness, set: setBrightness, min: 0, max: 200, unit: '%' },
            { label: 'Contrast', val: contrast, set: setContrast, min: 0, max: 200, unit: '%' },
            { label: 'Saturation', val: saturate, set: setSaturate, min: 0, max: 200, unit: '%' },
            { label: 'Grayscale', val: grayscale, set: setGrayscale, min: 0, max: 100, unit: '%' },
            { label: 'Sepia', val: sepia, set: setSepia, min: 0, max: 100, unit: '%' },
            { label: 'Invert', val: invert, set: setInvert, min: 0, max: 100, unit: '%' },
            { label: 'Blur', val: blur, set: setBlur, min: 0, max: 20, unit: 'px' },
            { label: 'Hue', val: hueRotate, set: setHueRotate, min: 0, max: 360, unit: '°' },
          ].map((f, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{f.label}</span>
                <span className="text-sky-400">{f.val}{f.unit}</span>
              </div>
              <input type="range" min={f.min} max={f.max} value={f.val} onChange={(e) => f.set(Number(e.target.value))} className="w-full accent-sky-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
            </div>
          ))}
        </div>

        <button onClick={resetFilters} className="mt-auto flex justify-center items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <RefreshCcw className="w-4 h-4" /> Reset All
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col shadow-sm">
        
        {!imageSrc ? (
          <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950/50 min-h-[400px]">
            <Upload className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">Upload an image to start editing</p>
            <label className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl cursor-pointer transition-colors shadow-lg shadow-sky-500/20">
              Select Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        ) : (
          <div className="flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <label className="text-sm px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer transition-colors">
                 Change Image
                 <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
               </label>
               
               <button onClick={downloadImage} className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg flex items-center gap-2 transition-colors shadow-md">
                 <Download className="w-4 h-4" /> Download Result
               </button>
            </div>
            
            <div className="flex-grow bg-slate-200 dark:bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center relative pattern-checkerboard">
              <canvas ref={canvasRef} className="max-w-full max-h-[600px] object-contain shadow-2xl" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
