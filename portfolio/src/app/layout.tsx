import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shraddha More | Python Developer | AI & Data Science Portfolio",
  description: "Portfolio of Shraddha More showcasing Python, Django, Flask, Machine Learning, AI, Data Science and Full Stack Development projects.",
  keywords: ["Shraddha More", "Python Developer", "Django", "Flask", "Machine Learning", "AI", "Data Science"],
  authors: [{ name: "Shraddha More" }],
  openGraph: {
    title: "Shraddha More | Python Developer | AI & Data Science Portfolio",
    description: "Portfolio of Shraddha More showcasing Python, Django, Flask, Machine Learning, AI, Data Science and Full Stack Development projects.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
