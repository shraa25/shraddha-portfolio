import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ClientShell from "@/components/ClientShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://portfolio-three-sable-40.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Shraddha More | SYNAPSE — AI & Data Science Portfolio",
  description:
    "Portfolio of Shraddha More — Python Developer, AI & Data Science Engineer. Specialising in Django, Flask, Machine Learning, TensorFlow and cloud deployment.",
  keywords: [
    "Shraddha More","Python Developer","Django","Flask",
    "Machine Learning","AI","Data Science","Portfolio",
  ],
  authors: [{ name: "Shraddha More", url: BASE_URL }],
  creator: "Shraddha More",
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Shraddha More | SYNAPSE — AI & Data Science Portfolio",
    description:
      "Python Developer & AI Engineer building scalable intelligent systems.",
    url: BASE_URL,
    siteName: "Shraddha More Portfolio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shraddha More — SYNAPSE Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shraddha More | SYNAPSE Portfolio",
    description: "Python Developer & AI Engineer — Django, Flask, ML, TensorFlow.",
    creator: "@shraa25",
    images: [`${BASE_URL}/og-image.png`],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#04040a",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shraddha More",
  url: BASE_URL,
  jobTitle: "Python Developer & AI Engineer",
  alumniOf: "JVM Mehta Degree College",
  knowsAbout: ["Python", "Django", "Flask", "Machine Learning", "Data Science", "TensorFlow"],
  sameAs: [
    "https://github.com/shraa25",
    "https://www.linkedin.com/in/shraddha-more-2528",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-mono"
          style={{ background: "#7C3AED", color: "#fff" }}
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <SmoothScroll>
            <ClientShell>{children}</ClientShell>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
