import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Online Calculator - Simple & Easy Math Calculations",
  description: "Free online calculator for basic math operations. Perform addition, subtraction, multiplication, and division quickly and easily with our simple calculator tool.",
  keywords: "calculator, online calculator, free calculator, math calculator, basic calculator, addition, subtraction, multiplication, division",
  authors: [{ name: "Calculator App" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Free Online Calculator - Simple & Easy Math Calculations",
    description: "Free online calculator for basic math operations. Perform calculations quickly and easily.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yourdomain.com" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
