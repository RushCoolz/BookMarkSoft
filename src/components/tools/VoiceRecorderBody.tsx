import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Download, AlertCircle } from 'lucide-react';

export function VoiceRecorderBody() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      setError(null);
      setAudioUrl(null);
      setDuration(0);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);

    } catch (err: any) {
      setError("Microphone access denied or not available. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      
      {error && (
        <div className="w-full p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center">
        
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 relative transition-all duration-500 ${isRecording ? 'bg-rose-500/10' : 'bg-slate-200 dark:bg-slate-800'}`}>
          {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-rose-500 opacity-20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-rose-500 opacity-40 animate-pulse"></div>
            </>
          )}
          <Mic className={`w-12 h-12 relative z-10 transition-colors ${isRecording ? 'text-rose-500' : 'text-slate-400'}`} />
        </div>

        <div className="text-4xl font-mono font-medium tracking-wider text-slate-800 dark:text-slate-200 mb-8">
          {formatTime(duration)}
        </div>

        <div className="flex justify-center gap-4 w-full">
          {!isRecording ? (
            <button 
              onClick={startRecording}
              className="px-8 py-4 w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-rose-500/20"
            >
              <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div> Start Recording
            </button>
          ) : (
            <button 
              onClick={stopRecording}
              className="px-8 py-4 w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all"
            >
              <Square className="w-5 h-5 fill-current" /> Stop
            </button>
          )}
        </div>

        {audioUrl && !isRecording && (
          <div className="w-full mt-8 p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
            <audio src={audioUrl} controls className="w-full mb-4" />
            <a 
              href={audioUrl} 
              download={`audio-record-${new Date().getTime()}.webm`}
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" /> Save Audio File
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
