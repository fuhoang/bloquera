import type { Metadata } from "next";
import { Bungee } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  title: "SatoshiLearn",
  description: "Structured Bitcoin learning with lessons, quizzes, and an AI tutor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${bungee.variable}`}>
      <body className="min-h-full bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
