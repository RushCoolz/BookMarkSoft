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
      variantClass = 'bg-blue-600 hover:bg-blue-700 text-white dark:text-slate-900';
      break;
    case 'secondary':
      variantClass = 'bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900';
      break;
    case 'danger':
      variantClass = 'bg-red-600 hover:bg-red-700 text-white dark:text-slate-900';
      break;
    case 'success':
      variantClass = 'bg-emerald-600 hover:bg-emerald-700 text-white dark:text-slate-900';
      break;
    case 'warning':
      variantClass = 'bg-orange-600 hover:bg-orange-700 text-white dark:text-slate-900';
      break;
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors ${variantClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:fill-current">{icon}</span>}
      {children}
    </button>
  );
}
