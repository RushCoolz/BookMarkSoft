import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookmarkSoft Dashboard",
  description: "Professional web tools platform",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
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
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Sidebar />
            <Topbar />
            <main className="xl:ml-64 min-h-screen px-4 pb-4 pt-20 xl:px-8 xl:pb-8 xl:pt-24">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
