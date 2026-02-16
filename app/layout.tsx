import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "BEOC Digital Skills Portal",
  description: "Brooklyn Educational Opportunity Center - Digital Skills Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
