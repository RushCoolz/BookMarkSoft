import React from 'react';
import { Scissors } from 'lucide-react';

export function CssClipPathBody() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-500 dark:text-slate-400">
      <div className="mb-6 text-pink-500 opacity-50 scale-150"><Scissors className="w-12 h-12" /></div>
      <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">CSS Clip Path Maker</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center">We will build this component next.</p>
    </div>
  );
}
