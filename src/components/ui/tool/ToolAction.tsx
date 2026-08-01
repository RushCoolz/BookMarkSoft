import React from 'react';

export interface ToolActionProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

export function ToolAction({
  children,
  onClick,
  icon,
  disabled = false,
  className = '',
  variant = 'primary'
}: ToolActionProps) {
  
  let variantClass = '';
  switch (variant) {
    case 'primary':
      variantClass = 'bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_15px_rgba(37,99,235,0.4)] border border-blue-400/20';
      break;
    case 'secondary':
      variantClass = 'bg-gradient-to-b from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-800 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 dark:text-white shadow-sm border border-slate-300/50 dark:border-slate-600/50';
      break;
    case 'danger':
      variantClass = 'bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-[0_2px_10px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_15px_rgba(220,38,38,0.4)] border border-red-400/20';
      break;
    case 'success':
      variantClass = 'bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-[0_2px_10px_rgba(5,150,105,0.3)] hover:shadow-[0_4px_15px_rgba(5,150,105,0.4)] border border-emerald-400/20';
      break;
    case 'warning':
      variantClass = 'bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-[0_2px_10px_rgba(234,88,12,0.3)] hover:shadow-[0_4px_15px_rgba(234,88,12,0.4)] border border-orange-400/20';
      break;
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${variantClass} ${disabled ? 'opacity-50 cursor-not-allowed saturate-0 hover:translate-y-0' : ''} ${className}`}
    >
      {icon && <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:fill-current drop-shadow-sm">{icon}</span>}
      <span className="drop-shadow-sm">{children}</span>
    </button>
  );
}
