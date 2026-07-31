import React, { useState } from 'react';
import { Copy, Check, Image as ImageIcon } from 'lucide-react';

export function EmailSignatureGenBody() {
  const [name, setName] = useState('John Doe');
  const [title, setTitle] = useState('Software Engineer');
  const [company, setCompany] = useState('Acme Corp');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('john@example.com');
  const [website, setWebsite] = useState('www.example.com');
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  
  const [copiedHtml, setCopiedHtml] = useState(false);

  const signatureHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.5;">
  <tr>
    <td style="padding-right: 15px; border-right: 2px solid #3b82f6;">
      <img src="${photo}" alt="${name}" width="80" height="80" style="border-radius: 50%; display: block;" />
    </td>
    <td style="padding-left: 15px;">
      <div style="font-size: 18px; font-weight: bold; color: #111827;">${name}</div>
      <div style="font-size: 14px; color: #4b5563; margin-bottom: 5px;">${title} <span style="color: #9ca3af;">|</span> ${company}</div>
      <div style="font-size: 13px; color: #6b7280;">
        <span style="color: #3b82f6; font-weight: bold;">E:</span> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a><br />
        <span style="color: #3b82f6; font-weight: bold;">P:</span> <a href="tel:${phone.replace(/[^\d+]/g, '')}" style="color: #6b7280; text-decoration: none;">${phone}</a><br />
        <span style="color: #3b82f6; font-weight: bold;">W:</span> <a href="https://${website.replace(/^https?:\/\//, '')}" style="color: #6b7280; text-decoration: none;">${website}</a>
      </div>
    </td>
  </tr>
</table>
  `.trim();

  const copyHtmlCode = () => {
    navigator.clipboard.writeText(signatureHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Job Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Company Name</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Website</label>
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Photo URL</label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Visual Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: signatureHtml }} />
        </div>

        <div className="relative group flex-grow flex flex-col">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800 flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">HTML Source Code</span>
              <button onClick={copyHtmlCode} className="text-slate-400 hover:text-white transition-colors">
                {copiedHtml ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="text-xs text-purple-300 font-mono overflow-auto whitespace-pre-wrap flex-grow h-48">
              <code>{signatureHtml}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
