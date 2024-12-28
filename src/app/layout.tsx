import './globals.css';
import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import { Navbar, Footer } from '@/components';
import { EB_Garamond } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { FOOTER_QUERY } from '@/lib/queries';
import { FooterProps } from "@/lib/types";

export const metadata: Metadata = {
  title: 'Le Duo Du Bistro',
  description: 'Levende Fransk musikk til alle anledninger',
};

const garamond = EB_Garamond({
  display: 'swap',
  subsets: ['latin'],
  style: 'normal',
});

export default async function RootLayout({children}: {children: React.ReactNode;}) {
  
  // Fetch footer data
  const footerData: FooterProps = await client.fetch(FOOTER_QUERY);
  return (
    <html className="overscroll-none">
      <body className={`${garamond.className} bg-[#E9EEEC]`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer data={footerData} />
        </LanguageProvider>
      </body>
    </html>
  );
}