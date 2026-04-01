import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google"; // Або JetBrains_Mono
import "./globals.css"
import { eUkraine, eUkraineHead } from "./fonts";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Amusements | yurii.av",
  description: "Portfolio of my games and tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${eUkraine.variable} ${eUkraineHead.variable} dark`}>
      <body className={`${inter.className} bg-[#0a0a0a] antialiased`}>
        {children}
      </body>
    </html>
  );
}