import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BookmarkSoft',
  description: 'Terms and conditions for using BookmarkSoft web tools.',
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
          Terms & Conditions
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Last updated: {currentYear}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          Welcome to BookmarkSoft. By accessing or using our website and tools, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our service.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">1. Use of Service</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          BookmarkSoft provides a collection of free online tools for developers, designers, and general users. You agree to use these tools only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
          You may not use our service to generate, process, or distribute illegal content, malware, or spam.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">2. Intellectual Property</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          The website, its original content, features, and functionality (excluding user-inputted data) are owned by BookmarkSoft and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
          Any data, code, or images you process using our client-side tools remain your sole property. We claim no ownership over the content you process using our utilities.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">3. Disclaimer of Warranties</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Our service is provided on an "AS IS" and "AS AVAILABLE" basis. BookmarkSoft makes no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or availability of the tools.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
          While we strive for perfection, we do not guarantee that our formatting, conversion, or generation tools will always produce error-free results. <strong>Always verify output before using it in production environments.</strong>
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          In no event shall BookmarkSoft, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">5. Changes to Terms</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">6. Contact Us</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          If you have any questions about these Terms, please reach out via our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.
        </p>

      </div>
    </div>
  );
}
