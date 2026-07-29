"use client";
import { useState, useEffect } from "react";
import { FileSearch } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function RegexTesterBody() {
  const [regexStr, setRegexStr] = useState("([A-Z])\\w+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Hello World, welcome to Regular Expressions!");
  
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!regexStr) {
      setMatches([]);
      setError("");
      return;
    }

    try {
      const re = new RegExp(regexStr, flags);
      const str = testString;
      let m;
      const found = [];
      
      // If global flag is set, use matchAll to get all occurrences
      if (flags.includes('g')) {
        const matchesIterator = str.matchAll(re);
        for (const match of Array.from(matchesIterator)) {
          found.push(match[0]);
        }
      } else {
        // If not global, just get the first match
        m = str.match(re);
        if (m) found.push(m[0]);
      }
      
      setMatches(found);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [regexStr, flags, testString]);

  // A basic highlighting function
  const highlightMatches = () => {
    if (!regexStr || error) return testString;
    
    try {
      const re = new RegExp(regexStr, flags);
      // Split the string by the regex, capturing the matched groups
      // Actually, standard split might drop tokens. Let's do a simple replace with HTML markers.
      // Note: In React, we use dangerouslySetInnerHTML for this specific safe-controlled highlighting.
      
      // We must escape HTML to avoid XSS
      const escapeHtml = (unsafe: string) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
      }

      let escapedText = escapeHtml(testString);
      
      if (matches.length > 0) {
        // We do a hacky replace by using the original regex
        // but we must be careful since the string is now HTML escaped.
        // A safer approach for a static tool is to iterate match indexes on the original string,
        // then build an array of React elements.
      }
      
      // Let's do the React element array approach instead of innerHTML
      const elements: React.ReactNode[] = [];
      let lastIndex = 0;
      
      if (flags.includes('g')) {
        const matchesIterator = testString.matchAll(re);
        for (const match of Array.from(matchesIterator)) {
          if (match.index === undefined) continue;
          
          // Push text before match
          elements.push(<span key={`text-${lastIndex}`}>{testString.slice(lastIndex, match.index)}</span>);
          
          // Push highlighted match
          elements.push(
            <span key={`match-${match.index}`} className="bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded px-0.5 border-b-2 border-emerald-500 font-bold">
              {match[0]}
            </span>
          );
          
          lastIndex = match.index + match[0].length;
        }
      } else {
        const match = testString.match(re);
        if (match && match.index !== undefined) {
          elements.push(<span key={`text-${lastIndex}`}>{testString.slice(lastIndex, match.index)}</span>);
          elements.push(
            <span key={`match-${match.index}`} className="bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded px-0.5 border-b-2 border-emerald-500 font-bold">
              {match[0]}
            </span>
          );
          lastIndex = match.index + match[0].length;
        }
      }
      
      // Push remaining text
      elements.push(<span key={`text-${lastIndex}`}>{testString.slice(lastIndex)}</span>);
      
      return elements;
      
    } catch (e) {
      return testString;
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100">
            <FileSearch className="text-emerald-500 w-6 h-6" />
            <h2 className="text-xl font-bold">Live Regex Tester</h2>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-2 pl-4 rounded-2xl flex flex-col md:flex-row items-center border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-black text-xl mr-2">/</span>
            <input 
              type="text" 
              value={regexStr}
              onChange={(e) => setRegexStr(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-lg text-emerald-600 dark:text-emerald-400 font-bold w-full py-2"
              placeholder="expression..."
              autoFocus
            />
            <span className="text-slate-400 font-black text-xl ml-2">/</span>
            <input 
              type="text" 
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="bg-transparent border-none outline-none font-mono text-lg text-slate-500 dark:text-slate-400 font-bold w-16 ml-1 py-2"
              placeholder="gmi"
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-xl font-mono text-sm border border-red-200 dark:border-red-800/50">
              Regex Error: {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Test String</label>
            <div className="relative border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-inner h-[250px]">
              
              {/* Highlight layer (underneath but visually matching) */}
              <div className="absolute inset-0 p-6 font-mono text-base leading-relaxed text-slate-400 pointer-events-none whitespace-pre-wrap break-all custom-scrollbar overflow-hidden">
                {highlightMatches()}
              </div>

              {/* Text input layer (transparent) */}
              <textarea 
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="absolute inset-0 w-full h-full p-6 font-mono text-base leading-relaxed bg-transparent text-transparent caret-slate-800 dark:caret-slate-200 outline-none resize-none whitespace-pre-wrap break-all custom-scrollbar z-10"
                spellCheck={false}
              ></textarea>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Match Results</label>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold">
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
              </span>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 min-h-[100px] flex flex-wrap gap-2">
              {matches.length > 0 ? (
                matches.map((m, i) => (
                  <span key={i} className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-sm px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    {m}
                  </span>
                ))
              ) : (
                <p className="text-slate-400 italic text-sm w-full text-center py-4">No matches found</p>
              )}
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
