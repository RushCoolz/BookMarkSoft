import { Terminal, Code2, Rocket, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ApiDocsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-white/20 dark:shadow-blue-500/10 border border-blue-200 dark:border-blue-800/50">
            <Terminal className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-6">
            Developer API
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            We are building a powerful REST API that will allow you to integrate all of BookmarkSoft's data processing, formatting, and generation tools directly into your own applications.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <Code2 className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">RESTful Endpoints</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">JSON-based endpoints for formatting, conversion, and data generation.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <Rocket className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">High Performance</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Global edge network routing for ultra-low latency API responses.</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-6 py-3 rounded-full font-medium border border-orange-200 dark:border-orange-800/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            Under Development — Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
