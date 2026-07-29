import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BookmarkSoft',
  description: 'Our privacy policy detailing how we protect your data, handle local processing, and respect your privacy.',
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Last updated: {currentYear}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          At BookmarkSoft, your privacy is our highest priority. We have designed our platform architecture specifically to minimize the amount of data we collect and process. This Privacy Policy outlines how we handle information when you use our website.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">1. Local Processing Guarantee</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          The vast majority of tools on BookmarkSoft operate entirely <strong>client-side</strong>. This means that when you use tools like our JSON Formatter, Password Generator, or Image Resizer, the files and data you input are processed directly by your web browser. 
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Your files, texts, and sensitive data are never uploaded to our servers, nor are they saved in any database.</strong>
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">2. Analytics and Tracking</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          To understand how our website is used and to improve our tools, we use Google Tag Manager and standard web analytics. These services may collect anonymous, aggregated data about:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
          <li>Pages visited and tools used.</li>
          <li>Browser type, operating system, and device type.</li>
          <li>General geographic location (country/city level).</li>
          <li>Referring websites or search terms.</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
          This data is purely statistical and cannot be used to identify you personally.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">3. Cookies</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          We use cookies to improve your experience. These include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
          <li><strong>Essential Cookies:</strong> Used for site functionality (like remembering your Dark Mode preference).</li>
          <li><strong>Analytics Cookies:</strong> Used by Google Analytics to help us understand traffic patterns.</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
          You can disable cookies through your browser settings at any time without losing access to our core tools.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">4. Third-Party Links</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Our website may contain links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">5. Contact Us</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          If you have any questions about this Privacy Policy, please reach out to us via our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.
        </p>

      </div>
    </div>
  );
}
