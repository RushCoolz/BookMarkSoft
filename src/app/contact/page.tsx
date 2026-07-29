"use client";
import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Message Sent!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Thank you for reaching out. We have received your message and will get back to you as soon as possible.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-6">
          Have a tool request, found a bug, or just want to say hi? You can fill out the form below or email us directly at <a href="mailto:support@bookmarksoft.uk" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">support@bookmarksoft.uk</a>.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-slate-200 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-slate-200 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Subject
              </label>
              <select 
                id="subject"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-slate-200 transition-all"
              >
                <option value="">Select a topic...</option>
                <option value="feature">Feature Request / New Tool Idea</option>
                <option value="bug">Report a Bug</option>
                <option value="partnership">Partnership / Business</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Message
              </label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                </div>
                <textarea 
                  id="message"
                  required
                  rows={5}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-slate-200 transition-all resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} 
                onSuccess={(token) => setTurnstileToken(token)}
                options={{
                  theme: 'auto',
                }}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
