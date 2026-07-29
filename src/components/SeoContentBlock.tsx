import React from 'react';
import { ShieldCheck, Zap, Globe2 } from 'lucide-react';

interface SeoContentBlockProps {
  title: string;
  subtitle: string;
}

export function SeoContentBlock({ title, subtitle }: SeoContentBlockProps) {
  return (
    <article className="max-w-4xl mx-auto mt-16 px-4 pb-16 space-y-12">
      {/* What is section */}
      <section className="bg-white dark:bg-slate-900/30 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4 tracking-tight">
          What is the {title}?
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            The {title} is a powerful, free online utility designed to help you {subtitle.toLowerCase().replace(/\.$/, '')}. 
            Whether you are a developer, designer, or everyday user, our {title.toLowerCase()} provides an intuitive interface 
            to get the job done quickly and efficiently without the need to install complex software.
          </p>
        </div>
      </section>

      {/* Why use section */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight text-center mb-8">
          Why use BookmarkSoft's {title}?
        </h2>
        
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">100% Secure</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">All processing happens locally in your browser. Your data never leaves your device.</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Lightning Fast</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">No server roundtrips means instant results, no matter the file size.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Always Free</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Access our entire suite of premium tools completely free of charge, with no registration required.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 dark:bg-slate-900/20 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Is the {title} safe to use?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Absolutely. BookmarkSoft uses client-side processing for the {title}, meaning your data is processed directly on your device. We do not store or transmit your sensitive information to our servers.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Do I need to download any software?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No! The {title} works entirely in your web browser. There are no plugins, extensions, or software installations required.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Can I use this on my mobile phone?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Yes, BookmarkSoft is fully responsive. You can use the {title} seamlessly on your desktop, tablet, or mobile device.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
