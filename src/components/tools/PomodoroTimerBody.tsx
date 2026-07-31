import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';

export function PomodoroTimerBody() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  const totalTime = mode === 'work' ? WORK_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play a sound when done (if browser allows)
      try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
        audio.play().catch(e => console.log('Audio play prevented by browser'));
      } catch (e) {}
      
      setIsActive(false);
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(BREAK_TIME);
      } else {
        setMode('work');
        setTimeLeft(WORK_TIME);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SVG Circle Math
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col items-center relative overflow-hidden">
        {/* Ambient glow based on mode */}
        <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full mix-blend-screen filter blur-[100px] opacity-30 ${mode === 'work' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-12 bg-slate-950 p-1 rounded-full relative z-10">
          <button 
            onClick={() => switchMode('work')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'work' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Focus Work
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'break' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Short Break
          </button>
        </div>

        {/* Circular Timer UI */}
        <div className="relative flex items-center justify-center w-72 h-72 mb-12 z-10">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle 
              cx="144" cy="144" r={radius} 
              className="stroke-slate-800" strokeWidth="8" fill="none" 
            />
            {/* Progress Track */}
            <circle 
              cx="144" cy="144" r={radius} 
              className={`transition-all duration-1000 ease-linear ${mode === 'work' ? 'stroke-rose-500' : 'stroke-emerald-500'}`} 
              strokeWidth="8" fill="none" strokeLinecap="round"
              style={{ strokeDasharray: circumference, strokeDashoffset }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-6xl font-bold font-mono text-white tracking-tighter">
              {formatTime(timeLeft)}
            </span>
            <span className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs mt-2">
              {mode === 'work' ? 'Remaining' : 'Relax'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 z-10">
          <button 
            onClick={resetTimer}
            className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-xl hover:scale-105 active:scale-95 ${mode === 'work' ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/30' : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30'}`}
          >
            {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
          </button>

          <button className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors opacity-50 cursor-not-allowed" title="Settings coming soon">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
