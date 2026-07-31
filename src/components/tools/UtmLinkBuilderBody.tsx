import React, { useState, useEffect } from 'react';
import { Copy, Check, Link as LinkIcon, RefreshCcw } from 'lucide-react';

export function UtmLinkBuilderBody() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url) {
      setGeneratedUrl('');
      return;
    }

    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      if (source) urlObj.searchParams.set('utm_source', source);
      if (medium) urlObj.searchParams.set('utm_medium', medium);
      if (campaign) urlObj.searchParams.set('utm_campaign', campaign);
      if (term) urlObj.searchParams.set('utm_term', term);
      if (content) urlObj.searchParams.set('utm_content', content);
      
      setGeneratedUrl(urlObj.toString());
    } catch (e) {
      setGeneratedUrl('Invalid URL');
    }
  }, [url, source, medium, campaign, term, content]);

  const copyToClipboard = () => {
    if (!generatedUrl || generatedUrl === 'Invalid URL') return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearForm = () => {
    setUrl('');
    setSource('');
    setMedium('');
    setCampaign('');
    setTerm('');
    setContent('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Website URL *</label>
          <input 
            type="text" 
            placeholder="https://example.com" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Campaign Source *</label>
            <input 
              type="text" 
              placeholder="google, newsletter" 
              value={source} 
              onChange={(e) => setSource(e.target.value)} 
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Campaign Medium</label>
            <input 
              type="text" 
              placeholder="cpc, banner, email" 
              value={medium} 
              onChange={(e) => setMedium(e.target.value)} 
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Campaign Name</label>
          <input 
            type="text" 
            placeholder="spring_sale, promo_2026" 
            value={campaign} 
            onChange={(e) => setCampaign(e.target.value)} 
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Campaign Term</label>
            <input 
              type="text" 
              placeholder="running+shoes" 
              value={term} 
              onChange={(e) => setTerm(e.target.value)} 
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Campaign Content</label>
            <input 
              type="text" 
              placeholder="logolink, textlink" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="pt-2">
           <button onClick={clearForm} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 transition-colors">
             <RefreshCcw className="w-4 h-4" /> Clear fields
           </button>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-grow bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Generated URL</h3>
              <p className="text-xs text-slate-500">Ready to copy and share</p>
            </div>
          </div>
          
          <div className="flex-grow flex flex-col justify-center">
            {generatedUrl ? (
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/50 break-all relative group">
                <p className={`font-mono text-sm ${generatedUrl === 'Invalid URL' ? 'text-red-400' : 'text-blue-300'}`}>
                  {generatedUrl}
                </p>
              </div>
            ) : (
              <div className="text-center text-slate-600 font-medium">
                Enter a URL and source to see the result.
              </div>
            )}
          </div>

          <button 
            onClick={copyToClipboard}
            disabled={!generatedUrl || generatedUrl === 'Invalid URL'}
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy URL'}
          </button>
        </div>
      </div>
    </div>
  );
}
