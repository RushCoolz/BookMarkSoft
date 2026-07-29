"use client";
import { useState, useRef } from "react";
import { Upload, Download, Trash2, FileCode2 } from "lucide-react";
import { ToolContainer, ToolMain, ToolSidebar } from "../ui/tool/ToolContainer";

export function SvgToPngBody() {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [resolutionScale, setResolutionScale] = useState(2); // 2x default for retina quality
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== "image/svg+xml") {
      alert("Please upload a valid .svg file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSvgContent(e.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!svgContent || !previewRef.current) return;
    
    // Find the svg element rendered in the preview DOM to get natural bounds
    const svgElement = previewRef.current.querySelector('svg');
    if (!svgElement) return;

    // Get native width/height or fallback to bounding box
    const viewBox = svgElement.viewBox.baseVal;
    let width = svgElement.width.baseVal.value || viewBox.width || svgElement.getBoundingClientRect().width || 500;
    let height = svgElement.height.baseVal.value || viewBox.height || svgElement.getBoundingClientRect().height || 500;

    // Apply multiplier for high-res output
    width *= resolutionScale;
    height *= resolutionScale;

    // Create a Blob from the SVG text
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    // Load into an image to draw to canvas
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const pngUrl = canvas.toDataURL("image/png");
        
        // Trigger download
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `converted_${width}x${height}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <ToolContainer split="sidebar">
      
      {/* Sidebar Controls */}
      <ToolSidebar>
        {!svgContent ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 min-h-[250px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800'}`}
          >
            <input type="file" accept=".svg, image/svg+xml" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-purple-600 shadow-sm mb-4">
              <FileCode2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-center">Drop SVG File</h3>
          </div>
        ) : (
          <>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-700 dark:text-slate-300">Export Settings</h3>
                <button onClick={() => setSvgContent("")} className="text-red-500 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Resolution Scale</label>
                <select 
                  value={resolutionScale}
                  onChange={(e) => setResolutionScale(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 outline-none cursor-pointer"
                >
                  <option value={1}>1x (Original Size)</option>
                  <option value={2}>2x (Retina - Recommended)</option>
                  <option value={4}>4x (Ultra HD)</option>
                  <option value={8}>8x (Massive Print)</option>
                </select>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Higher scales produce sharper PNGs.</p>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:text-slate-900 font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Export as PNG
            </button>
          </>
        )}
      </ToolSidebar>

      {/* Main Preview Area */}
      <ToolMain>
        <div className="flex-1 overflow-hidden relative shadow-inner bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
          {svgContent ? (
            <div className="flex-1 h-full p-6 flex items-center justify-center relative overflow-hidden">
               {/* We use dangerouslySetInnerHTML to render the SVG perfectly so the user can see it */}
               <div 
                 ref={previewRef}
                 className="max-w-full max-h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:w-auto [&>svg]:h-auto drop-shadow-2xl"
                 dangerouslySetInnerHTML={{ __html: svgContent }}
               />
               <div className="absolute bottom-4 left-4 text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">
                 Vector Preview Mode
               </div>
            </div>
          ) : (
            <div className="flex-1 h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
              <p>Upload an SVG vector file</p>
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
