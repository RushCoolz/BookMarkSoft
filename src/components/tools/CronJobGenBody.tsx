import React, { useState } from 'react';
import { Copy, Check, Clock } from 'lucide-react';

const PRESETS = [
  { label: 'Every minute', value: '* * * * *', desc: 'Runs every single minute' },
  { label: 'Every 5 minutes', value: '*/5 * * * *', desc: 'Runs at minute 0, 5, 10, 15, etc.' },
  { label: 'Every hour', value: '0 * * * *', desc: 'Runs at minute 0 of every hour' },
  { label: 'Every day at midnight', value: '0 0 * * *', desc: 'Runs at 00:00 every day' },
  { label: 'Every Monday at midnight', value: '0 0 * * 1', desc: 'Runs at 00:00 on Mondays' },
  { label: 'Every month on the 1st', value: '0 0 1 * *', desc: 'Runs at 00:00 on the 1st of every month' },
];

export function CronJobGenBody() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [copied, setCopied] = useState(false);

  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const applyPreset = (val: string) => {
    const parts = val.split(' ');
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Custom Builder</h3>
          
          <div className="grid grid-cols-5 gap-2 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <div>Minute</div>
            <div>Hour</div>
            <div>Day (Mo)</div>
            <div>Month</div>
            <div>Day (Wk)</div>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            <input type="text" value={minute} onChange={(e) => setMinute(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-3 text-center focus:ring-2 focus:ring-slate-500 outline-none font-mono" />
            <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-3 text-center focus:ring-2 focus:ring-slate-500 outline-none font-mono" />
            <input type="text" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-3 text-center focus:ring-2 focus:ring-slate-500 outline-none font-mono" />
            <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-3 text-center focus:ring-2 focus:ring-slate-500 outline-none font-mono" />
            <input type="text" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-3 text-center focus:ring-2 focus:ring-slate-500 outline-none font-mono" />
          </div>
          <div className="text-xs text-slate-500 pt-2">
            Use <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">*</code> for any, <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">*/5</code> for intervals, <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">1,2,3</code> for lists.
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Common Presets</h3>
          <div className="space-y-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset.value)}
                className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-medium text-sm text-slate-700 dark:text-slate-300">{preset.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{preset.desc}</div>
                </div>
                <div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                  {preset.value}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full gap-6">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group flex-grow flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-200"></div>
          
          <Clock className="w-16 h-16 text-slate-700 mb-6" />
          <h4 className="text-slate-400 font-medium uppercase tracking-widest text-xs mb-4">Cron Expression</h4>
          <div className="text-4xl md:text-5xl font-mono text-white font-bold tracking-widest bg-slate-950 px-6 py-4 rounded-xl border border-slate-800 w-full break-all">
            {cronString}
          </div>
          
          <button 
            onClick={copyToClipboard}
            className="mt-8 px-8 py-3 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
