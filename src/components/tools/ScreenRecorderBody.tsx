import React, { useState, useRef, useEffect } from 'react';
import { Video, StopCircle, Play, Download, AlertCircle } from 'lucide-react';

export function ScreenRecorderBody() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      setError(null);
      setRecordedUrl(null);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: true
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedUrl(URL.createObjectURL(blob));
        if (videoRef.current) videoRef.current.srcObject = null;
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      mediaRecorder.start(1000);
      setIsRecording(true);

      // Handle user clicking "Stop Sharing" on browser bar
      stream.getVideoTracks()[0].onended = () => {
        if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
      };

    } catch (err: any) {
      setError(err.message || "Could not start screen recording.");
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
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      
      {error && (
        <div className="w-full p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700 backdrop-blur-sm">
           <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></div>
           <span className="text-xs font-medium text-slate-200">{isRecording ? 'Recording...' : 'Standby'}</span>
        </div>

        <div className="aspect-video bg-black flex items-center justify-center relative">
          {!isRecording && !recordedUrl && (
            <div className="text-slate-600 flex flex-col items-center">
              <Video className="w-16 h-16 mb-4 opacity-50" />
              <p>Click start to select a screen to record</p>
            </div>
          )}
          
          <video 
            ref={videoRef} 
            className={`w-full h-full object-contain ${!isRecording ? 'hidden' : ''}`}
            muted
          />
          
          {recordedUrl && !isRecording && (
            <video 
              src={recordedUrl}
              className="w-full h-full object-contain"
              controls
            />
          )}
        </div>
        
        <div className="p-6 bg-slate-900 flex justify-center gap-4">
          {!isRecording ? (
            <button 
              onClick={startRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-500/20"
            >
              <Play className="w-5 h-5 fill-current" /> Start Recording
            </button>
          ) : (
            <button 
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700"
            >
              <StopCircle className="w-5 h-5" /> Stop Recording
            </button>
          )}

          {recordedUrl && !isRecording && (
            <a 
              href={recordedUrl} 
              download={`screen-record-${new Date().getTime()}.webm`}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-5 h-5" /> Save Video
            </a>
          )}
        </div>
      </div>
      
    </div>
  );
}
