"use client";
import { useState, useEffect } from "react";
import { Copy, RefreshCw, Check, ShieldCheck } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function PasswordGeneratorBody() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let chars = "";
    if (includeUppercase) chars += upper;
    if (includeLowercase) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      setPassword("Select options");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-[500px] w-full max-w-3xl mx-auto">
      <ToolContainer split="none">
        <ToolMain>
          <div className="space-y-8 flex-1">
            {/* Output Display */}
            <div className="relative pt-6">
              <div className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center font-mono text-3xl font-medium text-slate-800 dark:text-slate-200 tracking-wider break-all shadow-inner min-h-[100px] flex items-center justify-center">
                {password}
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200 shadow-sm z-10">
                <ShieldCheck className="w-3 h-3" /> Secure Password
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <ToolAction 
                onClick={generatePassword}
                icon={<RefreshCw />}
                variant="secondary"
              >
                Generate New
              </ToolAction>
              <ToolAction 
                onClick={copyToClipboard}
                icon={copied ? <Check /> : <Copy />}
                variant="primary"
                className={copied ? "!bg-green-500 hover:!bg-green-600" : ""}
              >
                {copied ? "Copied!" : "Copy Password"}
              </ToolAction>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full my-8"></div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-medium text-slate-700 dark:text-slate-300">Password Length</label>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-md font-bold">{length}</span>
                </div>
                <input 
                  type="range" 
                  min="8" max="64" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Lowercase (a-z)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Symbols (@#$)</span>
                </label>
              </div>
            </div>
          </div>
        </ToolMain>
      </ToolContainer>
    </div>
  );
}
