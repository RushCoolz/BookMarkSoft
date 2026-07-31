import React, { useState, useEffect } from 'react';
import { DatabaseZap, Upload, Search, Table } from 'lucide-react';

export function SqliteViewerBody() {
  const [db, setDb] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('SELECT name FROM sqlite_master WHERE type="table";');
  const [results, setResults] = useState<{columns: string[], values: any[][]}[]>([]);

  useEffect(() => {
    // Load sql.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => { if(document.body.contains(script)) document.body.removeChild(script); }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    
    try {
      const buffer = await file.arrayBuffer();
      const SQL = await (window as any).initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      });
      const database = new SQL.Database(new Uint8Array(buffer));
      setDb(database);
      
      // Auto run default query to list tables
      const res = database.exec('SELECT name FROM sqlite_master WHERE type="table";');
      setResults(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load database. Are you sure this is a valid SQLite file?');
    }
    setLoading(false);
  };

  const executeQuery = () => {
    if (!db) return;
    try {
      setError('');
      const res = db.exec(query);
      setResults(res);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {!db && (
        <div className="bg-slate-900 rounded-3xl p-12 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center">
           <DatabaseZap className="w-16 h-16 text-indigo-500 mb-6" />
           <h3 className="text-2xl font-bold text-white mb-2">SQLite Database Viewer</h3>
           <p className="text-slate-400 max-w-md mb-8">Select a local <code className="text-indigo-400">.sqlite</code> or <code className="text-indigo-400">.db</code> file. It is processed 100% in your browser using WASM. No data is uploaded.</p>
           
           <label className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2">
             <Upload className="w-5 h-5" /> {loading ? 'Loading WASM...' : 'Select Database File'}
             <input type="file" accept=".sqlite,.db,.sqlite3" className="hidden" onChange={handleFileUpload} disabled={loading} />
           </label>
           
           {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      )}

      {db && (
        <>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <DatabaseZap className="w-5 h-5 text-indigo-500" /> Query Editor
            </h4>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-4 font-mono text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-colors mb-4"
            />
            <div className="flex gap-4">
              <button 
                onClick={executeQuery}
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
              >
                <Search className="w-4 h-4" /> Run Query
              </button>
            </div>
            {error && <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">{error}</div>}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50">
              <Table className="w-5 h-5 text-indigo-500" />
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Results</h4>
            </div>
            <div className="p-0 overflow-x-auto max-h-[600px]">
              {results.length > 0 ? (
                results.map((result, idx) => (
                  <table key={idx} className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 sticky top-0">
                      <tr>
                        {result.columns.map((col, i) => (
                          <th key={i} className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 font-semibold">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.values.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          {row.map((val, j) => (
                            <td key={j} className="px-6 py-3">{val !== null ? String(val) : 'NULL'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">No results found or query did not return data.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
