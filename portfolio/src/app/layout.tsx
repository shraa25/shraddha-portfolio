import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ClientShell from "@/components/ClientShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shraddha More | SYNAPSE — AI & Data Science Portfolio",
  description: "Portfolio of Shraddha More — Python Developer, AI & Data Science Engineer. Built with Next.js 15, React 19, Three.js.",
  keywords: ["Shraddha More", "Python Developer", "Django", "Flask", "Machine Learning", "AI", "Data Science"],
  authors: [{ name: "Shraddha More" }],
  openGraph: {
    title: "Shraddha More | SYNAPSE — AI & Data Science Portfolio",
    description: "Portfolio of Shraddha More — Python Developer, AI & Data Science Engineer.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <ClientShell>{children}</ClientShell>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
