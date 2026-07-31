import React, { useState, useEffect } from 'react';
import { Play, Square, AudioLines } from 'lucide-react';

export function TextToSpeechBody() {
  const [text, setText] = useState("Hello world! This is a native in-browser Neural TTS engine. It runs entirely on your device without sending any data to a server.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => { window.speechSynthesis.cancel(); }
  }, []);

  const handlePlay = () => {
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoice]) utterance.voice = voices[selectedVoice];
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      <div className="lg:col-span-2 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Text to Speak</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="w-full h-64 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-pink-500 outline-none transition-colors resize-none dark:text-slate-200"
            placeholder="Enter text here..."
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
           <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
             <AudioLines className="w-5 h-5 text-pink-400" />
           </div>
           <div>
             <h3 className="font-semibold text-slate-200">Voice Settings</h3>
             <p className="text-xs text-slate-500">Uses local OS voices</p>
           </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 block mb-2">Voice</label>
          <select 
            value={selectedVoice} 
            onChange={(e) => setSelectedVoice(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-pink-500"
          >
            {voices.length === 0 && <option>Loading voices...</option>}
            {voices.map((v, i) => (
              <option key={i} value={i}>{v.name} ({v.lang})</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300 font-medium">Pitch</span>
            <span className="text-pink-400">{pitch.toFixed(1)}</span>
          </div>
          <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full accent-pink-500" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300 font-medium">Speed (Rate)</span>
            <span className="text-pink-400">{rate.toFixed(1)}x</span>
          </div>
          <input type="range" min="0.1" max="3" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-pink-500" />
        </div>

        <div className="mt-auto pt-4 flex gap-3">
          <button 
            onClick={handlePlay}
            disabled={!text || voices.length === 0}
            className={`flex-1 py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50' : 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/20'}`}
          >
            {isPlaying ? 'Playing...' : <><Play className="w-5 h-5 fill-current" /> Speak</>}
          </button>
          
          {isPlaying && (
            <button 
              onClick={handleStop}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700"
            >
              <Square className="w-5 h-5 fill-current" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
