"use client";
import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function IcoGeneratorBody() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sizes] = useState([16, 32, 48, 64, 128, 256]);
  const [selectedSize, setSelectedSize] = useState(32);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadFavicon = () => {
    if (!imageSrc || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Clear and draw resized
      canvas.width = selectedSize;
      canvas.height = selectedSize;
      
      // Draw centered/cropped
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      
      ctx.drawImage(img, sx, sy, size, size, 0, 0, selectedSize, selectedSize);

      const dataUrl = canvas.toDataURL("image/x-icon"); // Browsers support x-icon export roughly via png data
      const a = document.createElement("a");
      a.href = dataUrl.replace("image/png", "image/octet-stream"); // Force download if needed
      a.download = `favicon-${selectedSize}x${selectedSize}.ico`;
      a.click();
    };
    img.src = imageSrc;
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8 text-center">
          
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-sm">
            <ImageIcon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Favicon ICO Generator</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Upload a square image to instantly convert it into a standard `.ico` file for your website.</p>

          {!imageSrc ? (
            <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 relative hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors mt-8 mx-auto max-w-xl">
              <input 
                type="file" 
                accept="image/png, image/jpeg" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="font-bold text-slate-700 dark:text-slate-300">Click or Drag & Drop Image</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm max-w-xl mx-auto mt-8 space-y-8">
              
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                <img src={imageSrc} alt="Source" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Select ICO Size</label>
                <div className="flex flex-wrap justify-center gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${selectedSize === size ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'}`}
                    >
                      {size}x{size}
                    </button>
                  ))}
                </div>
              </div>

              <ToolAction 
                onClick={downloadFavicon} 
                icon={<Download className="w-5 h-5" />}
                className="w-full !bg-amber-500 hover:!bg-amber-600 text-lg py-4"
              >
                Download .ICO
              </ToolAction>
              
              <button 
                onClick={() => setImageSrc(null)}
                className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Upload different image
              </button>
              
              {/* Hidden canvas for processing */}
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
