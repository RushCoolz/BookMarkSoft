import React from 'react';

export function AdSenseMock() {
  return (
    <div className="flex-shrink-0 w-72 md:w-96 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm relative overflow-hidden">
      <div className="absolute top-2 right-3 text-[10px] font-bold text-white/50 uppercase tracking-wider">Ad</div>
      <div className="w-full h-4 bg-white/10 rounded animate-pulse mb-3"></div>
      <div className="w-3/4 h-4 bg-white/10 rounded animate-pulse mb-3"></div>
      <div className="flex items-center gap-3 w-full">
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
        <div className="flex-1 h-8 bg-blue-500/20 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
