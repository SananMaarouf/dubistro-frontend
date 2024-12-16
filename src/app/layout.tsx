import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { EB_Garamond } from 'next/font/google';
import { client } from '@/sanity/client';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Le Duo Du Bistro',
  description: 'Levende Fransk musikk til alle anledninger',
};

const garamond = EB_Garamond({
  display: 'swap',
  subsets: ['latin'],
  style: 'normal',
});

interface FooterProps {
  instagramURL: string;
  cellNumber: {
    nb: string;
    fr: string;
  };
  email: {
    nb: string;
    fr: string;
  };
  address: {
    nb: string;
    fr: string;
  };
}

const FOOTER_QUERY = `*[_type == "Footer"][0]{
  instagramURL,
  cellNumber,
  email,
  address
}`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch footer data
  const footerData: FooterProps = await client.fetch(FOOTER_QUERY);

  return (
    <html lang="en" className="overscroll-none">
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