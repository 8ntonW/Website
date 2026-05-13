import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anton Weidemann — Motion Designer",
  description: "I create cinematic visual stories for brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
