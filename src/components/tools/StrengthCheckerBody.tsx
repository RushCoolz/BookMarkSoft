"use client";
import { useState } from "react";
import { ShieldAlert, ShieldCheck, Clock, AlertTriangle } from "lucide-react";
const zxcvbn = require("zxcvbn");
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function StrengthCheckerBody() {
  const [password, setPassword] = useState("");
  const result = zxcvbn(password);

  const getScoreColor = () => {
    switch (result.score) {
      case 0:
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-green-500";
      default: return "bg-slate-200";
    }
  };

  const getScoreLabel = () => {
    if (!password) return "Enter a password";
    switch (result.score) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Strong";
      case 4: return "Very Strong";
      default: return "";
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain className="max-w-3xl mx-auto w-full">
        <label className="font-medium text-slate-700 dark:text-slate-300 mb-2">Password to Test</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password here..."
          className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 dark:bg-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
        />

        {password && (
          <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Strength: {getScoreLabel()}</span>
                <span className="font-bold text-slate-500 dark:text-slate-400">{result.score}/4</span>
              </div>
              <div className="flex gap-1 h-3">
                {[0, 1, 2, 3].map((index) => (
                  <div 
                    key={index} 
                    className={`flex-1 rounded-full transition-all duration-500 ${index < result.score || (index === 0 && result.score === 0 && password.length > 0) ? getScoreColor() : 'bg-slate-200'}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Time to Crack */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1">Time to Crack</p>
                <p className="text-2xl font-black text-amber-900 dark:text-amber-100">
                  {result.crack_times_display.offline_slow_hashing_1e4_per_second}
                </p>
              </div>
            </div>

            {/* Feedback & Warnings */}
            {(result.feedback.warning || result.feedback.suggestions.length > 0) && (
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                {result.feedback.warning && (
                  <div className="flex items-start gap-3 text-red-600">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="font-medium">{result.feedback.warning}</p>
                  </div>
                )}
                {result.feedback.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">Suggestions:</p>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
                      {result.feedback.suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </ToolMain>
    </ToolContainer>
  );
}
