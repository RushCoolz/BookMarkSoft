"use client";
import { useState, useEffect } from "react";
import { ArrowLeftRight, Weight, Ruler, Thermometer } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

const units = {
  length: {
    icon: <Ruler className="w-5 h-5" />,
    base: "m",
    rates: {
      "m": 1,
      "km": 1000,
      "cm": 0.01,
      "mm": 0.001,
      "inch": 0.0254,
      "ft": 0.3048,
      "yd": 0.9144,
      "mile": 1609.34
    }
  },
  weight: {
    icon: <Weight className="w-5 h-5" />,
    base: "kg",
    rates: {
      "kg": 1,
      "g": 0.001,
      "mg": 0.000001,
      "lb": 0.453592,
      "oz": 0.0283495
    }
  },
  temperature: {
    icon: <Thermometer className="w-5 h-5" />,
    base: "C",
    rates: {
      "C": "C",
      "F": "F",
      "K": "K"
    } // Custom logic for temp
  }
};

export function UnitConverterBody() {
  const [category, setCategory] = useState<"length" | "weight" | "temperature">("length");
  
  const [val1, setVal1] = useState("1");
  const [unit1, setUnit1] = useState("m");
  
  const [val2, setVal2] = useState("");
  const [unit2, setUnit2] = useState("ft");

  // Update default units when category changes
  useEffect(() => {
    if (category === "length") { setUnit1("m"); setUnit2("ft"); setVal1("1"); }
    if (category === "weight") { setUnit1("kg"); setUnit2("lb"); setVal1("1"); }
    if (category === "temperature") { setUnit1("C"); setUnit2("F"); setVal1("0"); }
  }, [category]);

  const calculate = (v: string, from: string, to: string, reverse: boolean) => {
    const num = parseFloat(v);
    if (isNaN(num)) {
      if (reverse) setVal1(""); else setVal2("");
      return;
    }

    if (category === "temperature") {
      let c = 0;
      // Convert to Celsius first
      if (from === "C") c = num;
      else if (from === "F") c = (num - 32) * 5/9;
      else if (from === "K") c = num - 273.15;

      // Convert from Celsius to Target
      let res = 0;
      if (to === "C") res = c;
      else if (to === "F") res = (c * 9/5) + 32;
      else if (to === "K") res = c + 273.15;

      const out = res.toFixed(4).replace(/\.?0+$/, "");
      if (reverse) setVal1(out); else setVal2(out);
      return;
    }

    // Length & Weight
    const fromRate = units[category].rates[from as keyof typeof units[typeof category]["rates"]] as number;
    const toRate = units[category].rates[to as keyof typeof units[typeof category]["rates"]] as number;

    const baseVal = num * fromRate;
    const finalVal = baseVal / toRate;
    
    // Format: avoid scientific notation for typical values, remove trailing zeros
    const out = parseFloat(finalVal.toPrecision(7)).toString();
    if (reverse) setVal1(out); else setVal2(out);
  };

  useEffect(() => {
    if (document.activeElement?.id !== 'input2') {
      calculate(val1, unit1, unit2, false);
    }
  }, [val1, unit1, unit2, category]);

  const handleVal2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal2(e.target.value);
    calculate(e.target.value, unit2, unit1, true);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8 text-center">
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-max mx-auto mb-8 border border-slate-200 dark:border-slate-700">
            {Object.keys(units).map((cat) => (
              <button 
                key={cat}
                onClick={() => setCategory(cat as any)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 capitalize ${category === cat ? 'bg-white dark:bg-slate-900 shadow-sm text-orange-500' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {units[cat as keyof typeof units].icon} {cat}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
            
            {/* Box 1 */}
            <div className="flex-1 w-full bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <select 
                value={unit1}
                onChange={(e) => setUnit1(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-500 outline-none text-center"
              >
                {Object.keys(units[category].rates).map(u => (
                  <option key={u} value={u}>{u.toUpperCase()}</option>
                ))}
              </select>
              <input 
                id="input1"
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full text-4xl font-black text-slate-800 dark:text-slate-100 text-center bg-transparent border-b-2 border-slate-100 dark:border-slate-700 pb-2 outline-none focus:border-orange-500 transition-colors"
                placeholder="0"
              />
            </div>

            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center shadow-sm shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>

            {/* Box 2 */}
            <div className="flex-1 w-full bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <select 
                value={unit2}
                onChange={(e) => setUnit2(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-500 outline-none text-center"
              >
                {Object.keys(units[category].rates).map(u => (
                  <option key={u} value={u}>{u.toUpperCase()}</option>
                ))}
              </select>
              <input 
                id="input2"
                type="number"
                value={val2}
                onChange={handleVal2Change}
                className="w-full text-4xl font-black text-slate-800 dark:text-slate-100 text-center bg-transparent border-b-2 border-slate-100 dark:border-slate-700 pb-2 outline-none focus:border-orange-500 transition-colors"
                placeholder="0"
              />
            </div>

          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
