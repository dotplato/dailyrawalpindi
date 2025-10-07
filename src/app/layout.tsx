import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DailyRawalpindi | Latest Updates from Rawalpindi",
  description: "Daily Rawalpindi is an online news and headlines platform particularly focusing on the twin cities of Rawalpindi and Islamabad. Our primary focus is to deliver unbiased and factual news of the latest events and incidents that affect the lives of people in the region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full border-b border-black/[.08]">
        <Navbar />
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
