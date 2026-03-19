import type { Metadata } from "next";
import { Cinzel, Special_Elite, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "700", "900"],
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADAM SMITH MINDSCAPE — DREAMSCAPERERS PROTOCOL",
  description: "Bước vào Tâm tưởng — Hành lang ký ức của Friedrich Adam Smith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${specialElite.variable} ${playfair.variable} ${montserrat.variable} antialiased bg-[#050505] text-[#e0e0e0] overflow-x-hidden w-full min-h-screen font-montserrat`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
