import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Blockwise",
    template: "%s | Blockwise",
  },
  description:
    "Blockwise helps beginners learn crypto with structured lessons, quizzes, dashboard progress, and an AI tutor, starting with a live Bitcoin track.",
  applicationName: "Blockwise",
  keywords: [
    "Blockwise",
    "crypto course",
    "learn crypto",
    "crypto lessons",
    "crypto quizzes",
    "crypto education",
    "Bitcoin course",
    "learn Bitcoin",
    "Bitcoin lessons",
    "Bitcoin quizzes",
    "AI tutor",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Blockwise",
    description:
      "Structured crypto learning with lessons, quizzes, dashboard progress, and an AI tutor, starting with Bitcoin.",
    url: absoluteUrl("/"),
    siteName: "Blockwise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blockwise",
    description:
      "Structured crypto learning with lessons, quizzes, dashboard progress, and an AI tutor, starting with Bitcoin.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${googleSans.className} min-h-full bg-black text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
