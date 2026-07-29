"use client";
import { useRef, useState, useEffect } from "react";
import { PenTool, Trash2, Download, Check } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function SignatureGenBody() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penWidth, setPenWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
      }
    }
  }, [penColor, penWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = "signature.png";
    a.click();
  };

  const colors = [
    { label: "Black", value: "#000000" },
    { label: "Blue", value: "#2563eb" },
    { label: "Red", value: "#dc2626" },
  ];

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <PenTool className="text-purple-500" /> E-Signature Generator
            </h2>
            
            <div className="flex gap-4">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {colors.map(c => (
                  <button 
                    key={c.value}
                    onClick={() => setPenColor(c.value)}
                    className={`w-8 h-8 rounded-lg m-0.5 border-2 ${penColor === c.value ? 'border-purple-500 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-4 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={300}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-auto bg-slate-50 dark:bg-slate-950 rounded-2xl cursor-crosshair touch-none"
              style={{ maxHeight: "300px" }}
            />
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={clearCanvas}
              className="px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 text-slate-500 hover:text-red-500 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/20 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
            
            <ToolAction 
              onClick={downloadSignature}
              disabled={!hasDrawn}
              icon={<Download className="w-5 h-5" />}
              className="px-8 !bg-purple-500 hover:!bg-purple-600"
            >
              Download PNG
            </ToolAction>
          </div>
          
          <p className="text-center text-xs text-slate-500 mt-4">
            The image is saved as a transparent PNG. No data is sent to the server.
          </p>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
