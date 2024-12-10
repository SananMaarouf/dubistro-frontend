import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { EB_Garamond } from 'next/font/google';

export const metadata: Metadata = {
  title: "Le Duo Du Bistro",
  description: "Levende Fransk musikk til alle anledninger",
};

const garamond = EB_Garamond({
  display: "swap",
  subsets: ["latin"],
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garamond.className} bg-[#E9EEEC]`}      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
