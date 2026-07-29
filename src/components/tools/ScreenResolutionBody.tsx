"use client";
import { useState, useEffect } from "react";
import { MonitorSmartphone, Maximize } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function ScreenResolutionBody() {
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [pixelRatio, setPixelRatio] = useState(1);
  const [colorDepth, setColorDepth] = useState(24);

  useEffect(() => {
    // Client-side only
    const updateSize = () => {
      setResolution({
        width: window.screen.width,
        height: window.screen.height
      });
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setPixelRatio(window.devicePixelRatio || 1);
      setColorDepth(window.screen.colorDepth || 24);
    };

    // Initial check
    updateSize();

    // Listen to resize
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-12 py-8">
          
          <div className="text-center space-y-4">
            <MonitorSmartphone className="w-16 h-16 mx-auto text-indigo-500 mb-6 opacity-80" />
            <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Your Screen Resolution Is</h2>
            
            <div className="text-7xl md:text-8xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">
              {resolution.width > 0 ? (
                <>
                  {resolution.width} <span className="text-indigo-500 font-light mx-2">×</span> {resolution.height}
                </>
              ) : (
                "Detecting..."
              )}
            </div>
            <p className="text-slate-500 font-medium pt-2">Physical Pixels: {resolution.width * pixelRatio} × {resolution.height * pixelRatio}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 w-full max-w-3xl">
            
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center">
              <Maximize className="w-6 h-6 mx-auto text-slate-400 mb-3" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Window Size</p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                {windowSize.width} <span className="text-slate-400 font-light">×</span> {windowSize.height}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center">
              <div className="w-6 h-6 mx-auto rounded bg-slate-300 dark:bg-slate-600 mb-3 flex items-center justify-center font-bold text-[10px] text-slate-600 dark:text-slate-900">@</div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Device Pixel Ratio</p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                {pixelRatio}x
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center">
              <div className="w-6 h-6 mx-auto rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 mb-3"></div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Color Depth</p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                {colorDepth}-bit
              </p>
            </div>

          </div>

          <div className="w-full max-w-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-6 text-center">
            <p className="text-sm text-indigo-700 dark:text-indigo-400">
              <strong>Tip:</strong> If your browser is zoomed in or out, your reported screen resolution and window size will change based on the zoom level. To see your true physical resolution, ensure your browser zoom is set to exactly 100%.
            </p>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
