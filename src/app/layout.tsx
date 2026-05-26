import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Savory Haven | Fine Dining on Victoria Island",
  description:
    "A beacon of fine dining on Victoria Island's waterfront — celebrating West African cuisine with contemporary elegance since 2010.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1a0a00] font-[family-name:var(--font-dm-sans)] antialiased">
        <Header />
        <main className="pt-[70px]">{children}</main>
      </body>
    </html>
  );
}