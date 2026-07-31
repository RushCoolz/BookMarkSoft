import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, RefreshCcw, AlertCircle } from 'lucide-react';

export function WebcamSnapshotBody() {
  const [isActive, setIsActive] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      setPhotoUrl(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsActive(true);
    } catch (err: any) {
      setError("Camera access denied or not available. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsActive(false);
  };

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setPhotoUrl(dataUrl);
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      
      {error && (
        <div className="w-full p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="w-full bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-2xl relative">
        
        <div className="aspect-[4/3] sm:aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center relative mb-4">
          {!isActive && !photoUrl && (
             <div className="flex flex-col items-center text-slate-500">
               <Camera className="w-16 h-16 mb-4 opacity-50" />
               <p>Camera is off</p>
             </div>
          )}

          <video 
            ref={videoRef} 
            className={`w-full h-full object-cover transform scale-x-[-1] ${!isActive ? 'hidden' : ''}`}
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />

          {photoUrl && (
            <img src={photoUrl} alt="Snapshot" className="w-full h-full object-cover transform scale-x-[-1]" />
          )}
        </div>

        <div className="flex justify-center gap-4">
          {!isActive && !photoUrl && (
            <button 
              onClick={startCamera}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20"
            >
              <Camera className="w-5 h-5" /> Start Camera
            </button>
          )}

          {isActive && (
            <button 
              onClick={takeSnapshot}
              className="px-8 py-3 bg-white text-slate-900 hover:bg-slate-200 font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg"
            >
              <div className="w-5 h-5 rounded-full border-2 border-slate-900"></div> Take Photo
            </button>
          )}

          {photoUrl && (
            <>
              <button 
                onClick={startCamera}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
              >
                <RefreshCcw className="w-5 h-5" /> Retake
              </button>
              <a 
                href={photoUrl}
                download={`webcam-snapshot-${new Date().getTime()}.png`}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20"
              >
                <Download className="w-5 h-5" /> Download
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
