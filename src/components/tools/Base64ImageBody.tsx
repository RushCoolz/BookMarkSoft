"use client";
import { useState, useRef } from "react";
import { Upload, Copy, Check, Trash2, Image as ImageIcon } from "lucide-react";
import { ToolContainer } from "../ui/tool/ToolContainer";

export function Base64ImageBody() {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);

    // Read as Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setBase64(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const copyToClipboard = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setBase64("");
    setImageSrc(null);
  };

  return (
    <ToolContainer split="half">
      
      {/* Upload Zone */}
      <div className="flex flex-col h-full gap-2">
        <label className="font-medium text-slate-700 dark:text-slate-300">Image Input</label>
        
        {imageSrc ? (
          <div className="relative flex-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
            <img src={imageSrc} alt="Preview" className="max-w-full max-h-full object-contain drop-shadow-md rounded" />
            <button 
              onClick={reset}
              className="absolute top-4 right-4 bg-white dark:bg-slate-900/90 hover:bg-white dark:bg-slate-900 text-red-500 p-2 rounded-lg shadow-sm transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-8 cursor-pointer transition-all ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800'}`}
          >
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-purple-500 shadow-sm mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-lg">Click or drag image here</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">Supports JPG, PNG, WebP, GIF, and SVG</p>
          </div>
        )}
      </div>

      {/* Output Zone */}
      <div className="flex flex-col h-full gap-2">
        <div className="flex items-center justify-between">
          <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
            Base64 Output
            {base64 && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{(base64.length / 1024).toFixed(1)} KB</span>}
          </label>
        </div>
        
        <div className="relative flex-1">
          <textarea
            value={base64}
            readOnly
            placeholder="Base64 Data URL will appear here..."
            className="w-full h-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs bg-slate-900 dark:bg-slate-950 text-purple-300 outline-none resize-none transition-all break-all custom-scrollbar"
          ></textarea>
          
          <button 
            onClick={copyToClipboard}
            disabled={!base64}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm ${!base64 ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${copied ? 'bg-green-500 text-white dark:text-slate-900 hover:bg-green-600' : 'bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 text-white border border-white/20'}`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy string"}
          </button>
        </div>
      </div>
    </ToolContainer>
  );
}
