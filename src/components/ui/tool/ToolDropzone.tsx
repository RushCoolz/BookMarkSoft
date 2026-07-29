import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

export interface ToolDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ToolDropzone({
  onFileSelect,
  accept = "*",
  label = "Drop File Here",
  icon = <Upload className="w-6 h-6" />,
  className = ''
}: ToolDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    onFileSelect(file);
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      onClick={() => fileInputRef.current?.click()}
      className={`flex-1 min-h-[250px] w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'} ${className}`}
    >
      <input 
        type="file" 
        accept={accept} 
        className="hidden" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files && handleFile(e.target.files[0])} 
      />
      <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-slate-700 dark:text-slate-300 text-center">{label}</h3>
    </div>
  );
}
