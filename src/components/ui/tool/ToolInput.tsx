import React from 'react';
import { Trash2 } from 'lucide-react';

export interface ToolInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isTextArea?: boolean;
  className?: string;
  type?: 'text' | 'password' | 'number' | 'email';
  actions?: React.ReactNode;
}

export function ToolInput({
  label,
  value,
  onChange,
  onClear,
  placeholder,
  isTextArea = true,
  className = '',
  type = 'text',
  actions,
}: ToolInputProps) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  const baseInputClass = "w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm bg-slate-50 dark:bg-slate-800/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:bg-slate-900 outline-none transition-all";

  return (
    <div className={`flex flex-col flex-1 h-full min-h-[200px] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <div className="flex gap-4 items-center">
          {actions}
          <button 
            onClick={handleClear} 
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            title="Clear Input"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>
      
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseInputClass} flex-1 resize-none custom-scrollbar`}
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseInputClass}
        />
      )}
    </div>
  );
}
