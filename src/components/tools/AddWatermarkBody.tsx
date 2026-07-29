"use client";
import { useState, useRef, useEffect } from "react";
import { Layers, Download, Image as ImageIcon } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function AddWatermarkBody() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("Confidential");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<"center" | "bottom-right" | "repeat">("center");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Apply watermark
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textBaseline = "middle";
      
      const textWidth = ctx.measureText(watermarkText).width;

      if (position === "center") {
        ctx.textAlign = "center";
        ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
      } else if (position === "bottom-right") {
        ctx.textAlign = "right";
        ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 30);
      } else if (position === "repeat") {
        ctx.textAlign = "center";
        // Rotate ctx for diagonal repeat
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        
        const spacing = fontSize * 3;
        for (let x = -canvas.width; x < canvas.width * 2; x += textWidth + spacing) {
          for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
            ctx.fillText(watermarkText, x, y);
          }
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      }

      ctx.globalAlpha = 1.0;
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
    img.src = imageSrc;
  }, [imageSrc, watermarkText, fontSize, opacity, color, position]);

  const downloadImage = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "watermarked.png";
    a.click();
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-5xl mx-auto w-full space-y-8">
          
          {!imageSrc ? (
            <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-16 text-center relative hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Layers className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Upload Image</h3>
              <p className="text-slate-500">Select an image to add a text watermark.</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              
              <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
                {previewUrl && <img src={previewUrl} alt="Watermark Preview" className="max-w-full max-h-[500px] object-contain rounded-xl shadow-lg" />}
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>

              <div className="w-full lg:w-96 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <ImageIcon className="w-5 h-5 text-indigo-500" /> Watermark Settings
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Text</label>
                    <input 
                      type="text" 
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Size</label>
                      <span className="text-xs font-bold text-indigo-500">{fontSize}px</span>
                    </div>
                    <input 
                      type="range" min="12" max="200" 
                      value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Opacity</label>
                      <span className="text-xs font-bold text-indigo-500">{Math.round(opacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="1" step="0.1" 
                      value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Color</label>
                      <input 
                        type="color" 
                        value={color} onChange={(e) => setColor(e.target.value)}
                        className="w-full h-12 rounded-xl cursor-pointer bg-slate-50 border border-slate-200 dark:border-slate-700 p-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Position</label>
                      <select 
                        value={position} onChange={(e: any) => setPosition(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      >
                        <option value="center">Center</option>
                        <option value="bottom-right">Corner</option>
                        <option value="repeat">Repeat</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <ToolAction 
                      onClick={downloadImage} 
                      icon={<Download className="w-5 h-5" />}
                      className="w-full !bg-indigo-500 hover:!bg-indigo-600"
                    >
                      Download Image
                    </ToolAction>
                    
                    <button 
                      onClick={() => setImageSrc(null)}
                      className="w-full py-3 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Start Over
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
