"use client";
import { useState, useRef } from "react";
import { ImagePlus, Download, Image as ImageIcon } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function WebpToPngJpgBody() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertAndDownload = () => {
    if (!imageSrc || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(`image/${format}`, 1.0);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${fileName || "converted"}.${format === 'jpeg' ? 'jpg' : 'png'}`;
      a.click();
    };
    img.src = imageSrc;
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-8">
          
          {!imageSrc ? (
            <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-16 text-center relative hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
              <input 
                type="file" 
                accept="image/webp" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-20 h-20 bg-sky-100 dark:bg-sky-900/30 text-sky-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ImagePlus className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Upload WebP Image</h3>
              <p className="text-slate-500">Drag & drop or click to convert a WebP to standard PNG or JPG.</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              
              <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                {/* Visual Preview */}
                <img src={imageSrc} alt="Preview" className="max-w-full max-h-[400px] object-contain rounded-xl z-10 relative" />
                {/* Hidden canvas for processing */}
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>

              <div className="w-full md:w-80 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-sky-500" /> Export Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Format</label>
                      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                        <button 
                          onClick={() => setFormat("png")} 
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${format === "png" ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        >
                          PNG
                        </button>
                        <button 
                          onClick={() => setFormat("jpeg")} 
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${format === "jpeg" ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        >
                          JPG
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <ToolAction 
                      onClick={convertAndDownload} 
                      icon={<Download className="w-5 h-5" />}
                      className="w-full !bg-sky-500 hover:!bg-sky-600"
                    >
                      Download {format.toUpperCase()}
                    </ToolAction>
                    
                    <button 
                      onClick={() => setImageSrc(null)}
                      className="w-full py-3 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Convert Another
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
