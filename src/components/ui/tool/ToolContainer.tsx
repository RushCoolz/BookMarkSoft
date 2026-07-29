import React from 'react';

export interface ToolContainerProps {
  children: React.ReactNode;
  split?: 'none' | 'half' | 'sidebar'; // none = single column, half = 50/50, sidebar = 1/3 2/3
  className?: string;
}

export function ToolContainer({ children, split = 'none', className = '' }: ToolContainerProps) {
  let gridClass = 'flex flex-col';
  if (split === 'half') {
    gridClass = 'grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[500px]';
  } else if (split === 'sidebar') {
    gridClass = 'flex flex-col md:flex-row gap-8 h-full min-h-[500px]';
  } else {
    gridClass = 'flex flex-col gap-6 h-full min-h-[500px]';
  }

  return (
    <div className={`${gridClass} ${className}`}>
      {children}
    </div>
  );
}

export function ToolSidebar({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full md:w-72 flex flex-col gap-6 shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export function ToolMain({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
