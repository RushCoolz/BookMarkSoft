"use client";
import { useState } from "react";
import { Database, Copy, Check, RefreshCw, Download } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function FakeDataGenBody() {
  const [numRecords, setNumRecords] = useState<number>(5);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Fake data arrays
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
  const domains = ["example.com", "test.org", "demo.net", "sample.co", "mock.io", "fake.xyz"];
  const streets = ["Main St", "Oak Ave", "Pine Ln", "Maple Dr", "Cedar Blvd", "Elm St", "Washington Ave", "Lake Rd", "Hill St", "Park Pl"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

  const generateData = () => {
    const data = [];
    
    for (let i = 0; i < numRecords; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const street = streets[Math.floor(Math.random() * streets.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      
      // UUID v4 format generator
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

      // Phone (555) 123-4567
      const phone = `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;

      data.push({
        id: uuid,
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}@${domain}`,
        phone: phone,
        address: `${Math.floor(Math.random() * 9999 + 1)} ${street}, ${city}`,
        isActive: Math.random() > 0.2, // 80% chance true
        balance: parseFloat((Math.random() * 10000).toFixed(2)),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
      });
    }

    setOutput(JSON.stringify(data, null, 2));
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mock_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="w-full sm:w-64 space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Number of Records (Max 1000)</label>
              <input 
                type="number" 
                value={numRecords} 
                onChange={(e) => setNumRecords(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            
            <div className="flex w-full sm:w-auto gap-2">
              <ToolAction 
                onClick={generateData} 
                icon={<RefreshCw />}
                className="flex-1 sm:flex-none py-3"
              >
                Generate Data
              </ToolAction>
            </div>
          </div>

          <div className="flex flex-col h-full min-h-[500px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" /> JSON Output
              </h3>
              
              <div className="flex gap-2">
                <button 
                  onClick={downloadJson}
                  disabled={!output}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                <button 
                  onClick={copyToClipboard}
                  disabled={!output}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${copied ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            
            <div className="relative flex-1 bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-inner">
              <textarea
                value={output}
                readOnly
                placeholder="Click 'Generate Data' to create mock JSON records..."
                className="w-full h-[600px] p-6 font-mono text-sm text-sky-400 bg-transparent outline-none resize-none custom-scrollbar"
              ></textarea>
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
