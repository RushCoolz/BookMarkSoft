"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Camera, RefreshCw, Download } from "lucide-react";

export function AnimalPictureBody() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState<"dog" | "cat">("dog");
  const [error, setError] = useState("");

  const fetchPicture = async (type: "dog" | "cat") => {
    setLoading(true);
    setError("");
    try {
      if (type === "dog") {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        if (data.status !== "success") throw new Error();
        setImageUrl(data.message);
      } else {
        const res = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await res.json();
        setImageUrl(data[0].url);
      }
    } catch (err: any) {
      setError("Failed to fetch image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPicture(animal);
  }, [animal]);

  const downloadImage = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cute-${animal}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-6">
          
          <div className="bg-lime-50 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-1">Random Fun</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Animal Picture Fetcher
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-lime-100 dark:bg-lime-900/50 rounded-full items-center justify-center text-lime-600">
              <Camera className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl relative flex flex-col items-center">
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['dog', 'cat'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setAnimal(t as "dog" | "cat")}
                    className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${animal === t ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium mb-6 w-full text-center">
                {error}
              </div>
            )}

            <div className="relative w-full max-w-lg aspect-square bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
              {loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-lime-500 animate-spin" />
                </div>
              )}
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={`Random ${animal}`} 
                  className="w-full h-full object-contain" 
                  loading="lazy" 
                  onLoad={() => setLoading(false)}
                />
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button 
                onClick={() => fetchPicture(animal)}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-lime-500 hover:bg-lime-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Next {animal}
              </button>
              <button 
                onClick={downloadImage}
                disabled={!imageUrl || loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
