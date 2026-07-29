import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CookieConsent } from "@/components/CookieConsent";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BookmarkSoft',
    default: 'BookmarkSoft - Free Developer & Utility Tools',
  },
  description: "A comprehensive suite of free, secure, browser-based developer tools, formatters, calculators, and generators.",
  keywords: ["developer tools", "JSON formatter", "XML formatter", "base64 decode", "calculators", "free online tools"],
  openGraph: {
    title: 'BookmarkSoft - Free Developer & Utility Tools',
    description: 'A comprehensive suite of free, secure, browser-based developer tools, formatters, calculators, and generators.',
    url: 'https://bookmarksoft.com',
    siteName: 'BookmarkSoft',
    locale: 'en_US',
    type: 'website',
  },
  verification: {
    google: "esa_sH6hOXnX3OmwTH3RuESPhwjUqWX-ipWYJhkx2ZY",
  },
  other: {
    "google-adsense-account": "ca-pub-4257357969102087"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <AnalyticsProvider gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Sidebar />
              <Topbar />
              <main className="xl:ml-64 min-h-screen px-4 pb-4 pt-20 xl:px-8 xl:pb-8 xl:pt-24 flex flex-col">
                <div className="max-w-7xl mx-auto flex-1 w-full">
                  {children}
                </div>
                <Footer />
              </main>
              <CookieConsent />
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
