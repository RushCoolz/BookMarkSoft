"use client";
import { useState } from "react";
import { Dices, RefreshCw } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function DiceRollerBody() {
  const [numDice, setNumDice] = useState<number>(2);
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const rollDice = () => {
    setIsRolling(true);
    
    // Simulate animation
    setTimeout(() => {
      const newDice = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
      const total = newDice.reduce((acc, val) => acc + val, 0);
      
      setDice(newDice);
      setHistory(prev => [total, ...prev].slice(0, 5));
      setIsRolling(false);
    }, 400);
  };

  const getDiceDots = (val: number) => {
    const dotMap: { [key: number]: number[] } = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    const dots = dotMap[val] || [];
    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-16 h-16 sm:w-24 sm:h-24 p-2 sm:p-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="flex items-center justify-center">
            {dots.includes(i) && <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-slate-800 dark:bg-slate-200 rounded-full"></div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full space-y-12 py-6">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-md mx-auto">
            <div className="w-full sm:flex-1 space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Number of Dice</label>
              <select 
                value={numDice} 
                onChange={(e) => setNumDice(parseInt(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              >
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Die' : 'Dice'}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-auto mt-auto">
              <ToolAction 
                onClick={rollDice} 
                icon={isRolling ? <RefreshCw className="animate-spin" /> : <Dices />}
                className="w-full sm:w-auto py-3 px-8 text-lg !rounded-xl !bg-rose-500 !hover:bg-rose-600"
                disabled={isRolling}
              >
                {isRolling ? "Rolling..." : "Roll!"}
              </ToolAction>
            </div>
          </div>

          {/* Dice Display */}
          <div className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-8 sm:p-12 min-h-[250px] shadow-inner flex flex-col items-center justify-center">
            
            <div className={`flex flex-wrap justify-center gap-4 sm:gap-8 transition-all duration-300 ${isRolling ? 'scale-90 blur-sm rotate-12 opacity-70' : 'scale-100 blur-none rotate-0 opacity-100'}`}>
              {dice.slice(0, numDice).map((val, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex items-center justify-center transform transition-transform hover:scale-105">
                  {getDiceDots(val)}
                </div>
              ))}
            </div>

            {!isRolling && (
              <div className="mt-12 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Sum</p>
                <div className="text-5xl font-black text-rose-500">
                  {dice.slice(0, numDice).reduce((a, b) => a + b, 0)}
                </div>
              </div>
            )}
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="w-full pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">Recent Rolls (Total)</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {history.map((total, i) => (
                  <div key={i} className={`w-12 h-12 flex items-center justify-center rounded-xl text-lg font-bold ${i === 0 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400 ring-2 ring-rose-500/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {total}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
