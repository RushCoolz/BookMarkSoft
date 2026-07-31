import React, { useState } from 'react';
import { Search, Globe2 } from 'lucide-react';

export function SeoSerpPreviewBody() {
  const [title, setTitle] = useState('My Awesome Website | Best Tools Online');
  const [url, setUrl] = useState('https://www.example.com/tools/awesome');
  const [desc, setDesc] = useState('Discover the best online tools for developers and designers. Boost your productivity with our free, fast, and secure client-side utilities.');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Editor */}
      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">SEO Title</label>
              <span className={`text-xs ${title.length > 60 ? 'text-red-500' : 'text-slate-500'}`}>
                {title.length} / 60 chars
              </span>
            </div>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className={`w-full bg-white dark:bg-slate-950 border ${title.length > 60 ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'} rounded-lg px-4 py-2 outline-none transition-colors dark:text-white`}
            />
            {title.length > 60 && <p className="text-xs text-red-500 mt-1">Title is too long and may be truncated by Google.</p>}
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">URL / Permalink</label>
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Meta Description</label>
              <span className={`text-xs ${desc.length > 160 ? 'text-red-500' : 'text-slate-500'}`}>
                {desc.length} / 160 chars
              </span>
            </div>
            <textarea 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              className={`w-full h-24 resize-none bg-white dark:bg-slate-950 border ${desc.length > 160 ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'} rounded-lg px-4 py-2 outline-none transition-colors dark:text-white`}
            />
            {desc.length > 160 && <p className="text-xs text-red-500 mt-1">Description is too long and will be truncated.</p>}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" /> Google Desktop Preview
        </h3>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {/* Google Result Structure */}
          <div className="max-w-[600px] font-sans">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
                <Globe2 className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-[14px] text-[#202124] leading-tight flex items-center gap-1">
                  {url ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname : 'www.example.com'}
                  <span className="text-slate-400">⋮</span>
                </div>
                <div className="text-[12px] text-[#4d5156] leading-tight truncate max-w-[500px]">
                  {url}
                </div>
              </div>
            </div>
            
            <a href="#" className="text-[20px] text-[#1a0dab] hover:underline block leading-tight mb-1 truncate max-w-[600px]">
              {title || 'Please enter a title'}
            </a>
            
            <div className="text-[14px] text-[#4d5156] leading-[1.58] break-words line-clamp-2">
              {desc || 'Please enter a meta description for your webpage.'}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-12 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" /> Google Mobile Preview
        </h3>
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-[375px] mx-auto w-full">
           <div className="font-sans">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
                <Globe2 className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <div className="text-[12px] text-[#202124] leading-tight truncate max-w-[250px]">
                  {url ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname : 'www.example.com'}
                </div>
                <div className="text-[12px] text-[#5f6368] leading-tight truncate max-w-[250px]">
                  {url}
                </div>
              </div>
              <span className="text-slate-500 ml-auto mr-1">⋮</span>
            </div>
            
            <a href="#" className="text-[18px] text-[#1558d6] hover:underline block leading-tight mb-2">
              {title || 'Please enter a title'}
            </a>
            
            <div className="text-[14px] text-[#4d5156] leading-[1.58] break-words line-clamp-3">
              {desc || 'Please enter a meta description for your webpage.'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
