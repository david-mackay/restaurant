import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { RESTAURANT_NAME, DEFAULT_META_DESCRIPTION } from '@/config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: `${RESTAURANT_NAME} Restaurant & Bar`,
  description: DEFAULT_META_DESCRIPTION,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: RESTAURANT_NAME,
    description: DEFAULT_META_DESCRIPTION,
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: `${RESTAURANT_NAME} - Speakeasy & Tea Parlour`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: RESTAURANT_NAME,
    description: DEFAULT_META_DESCRIPTION,
    images: ['/og.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-serif bg-black text-white`}>
        <Header />
        {children}
        <SocialLinks />
      </body>
    </html>
  );
}