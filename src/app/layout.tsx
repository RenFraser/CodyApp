import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cody",
  description: "The coolest guy around.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-screen bg-gradient-to-b from-stone-800 to-stone-800 from-10% to-90%`} >{children}</body>
    </html>
  );
}
