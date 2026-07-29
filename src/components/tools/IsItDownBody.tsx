"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Globe, Search, CheckCircle2, XCircle } from "lucide-react";

export function IsItDownBody() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"up" | "down" | "unknown" | null>(null);
  const [loading, setLoading] = useState(false);
  const [pingTime, setPingTime] = useState<number>(0);

  const checkStatus = () => {
    let cleanUrl = url.trim().toLowerCase();
    if (!cleanUrl) return;

    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    setLoading(true);
    setStatus(null);
    setPingTime(0);

    const startTime = Date.now();
    const img = new Image();

    // Use a unique query param to bypass cache
    const cacheBuster = `?cb=${Date.now()}`;
    
    // We try to load the favicon. If it loads or returns a 404 image, the server is responding (UP).
    // If it completely times out or fails at network level, it will trigger onerror but take longer.
    // However, some valid sites don't have favicons. 
    // To be safe, any response (onload or onerror that happens quickly) means the server is reachable.
    
    img.onload = () => {
      setPingTime(Date.now() - startTime);
      setStatus("up");
      setLoading(false);
    };

    img.onerror = () => {
      const timeTaken = Date.now() - startTime;
      if (timeTaken > 5000) {
        // If it took more than 5 seconds to fail, it's a timeout/down
        setStatus("down");
      } else {
        // If it failed quickly, the server actively rejected the connection or returned 404, meaning it IS online!
        setPingTime(timeTaken);
        setStatus("up");
      }
      setLoading(false);
    };

    // 10 second hard timeout
    setTimeout(() => {
      if (loading) {
        img.src = ""; // cancel image
        setStatus("down");
        setLoading(false);
      }
    }, 10000);

    const urlObj = new URL(cleanUrl);
    img.src = `${urlObj.origin}/favicon.ico${cacheBuster}`;
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              "Is It Down?" Website Tester
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Check if a website is reachable right now using an image-ping technique.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="e.g., google.com"
              className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              onKeyDown={e => e.key === "Enter" && checkStatus()}
            />
            <button
              onClick={checkStatus}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? "Pinging..." : "Check"}
            </button>
          </div>

          {status && (
            <div className={`p-8 rounded-2xl border text-center shadow-sm ${status === "up" ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"}`}>
              {status === "up" ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-black text-green-700 dark:text-green-400 mb-2">It's UP!</h3>
                  <p className="text-green-600 dark:text-green-500 font-medium">
                    The server is responding normally.
                  </p>
                  <div className="mt-4 inline-block px-3 py-1 bg-white dark:bg-green-900/50 rounded-lg text-sm text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
                    Response time: {pingTime}ms
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-black text-red-700 dark:text-red-400 mb-2">It's DOWN!</h3>
                  <p className="text-red-600 dark:text-red-500 font-medium">
                    The connection timed out. The server might be offline.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
