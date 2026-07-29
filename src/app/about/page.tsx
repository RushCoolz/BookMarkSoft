import { Metadata } from 'next';
import { Shield, Zap, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | BookmarkSoft',
  description: 'Learn about BookmarkSoft, our mission, and why we build free, secure, client-side web tools for developers and creators.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
          About Bookmark<span className="text-blue-600 dark:text-blue-500">Soft</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          We build professional, lightning-fast web tools designed to respect your privacy.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Our Mission</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          At BookmarkSoft, we believe that everyday utilities shouldn't require installing bloatware, creating accounts, or sacrificing your privacy. Our mission is to provide developers, designers, and everyday users with a comprehensive suite of high-quality tools that are accessible instantly from any browser.
        </p>

        <div className="grid md:grid-cols-3 gap-8 my-12">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 m-0">Privacy First</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Almost all of our tools process data locally in your browser. We don't save your files, text, or passwords.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 m-0">Lightning Fast</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">No waiting for servers to process your requests. Client-side execution means instant results.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 m-0">Always Free</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">We provide premium-tier tools completely free of charge, with no hidden paywalls or subscriptions.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-4">Who we are</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          BookmarkSoft is built and maintained by a passionate team of engineers who got tired of searching the web for simple utilities and landing on ad-infested, slow websites. We decided to build the platform we wanted to use ourselves: clean, professional, and reliable.
        </p>
      </div>
    </div>
  );
}
