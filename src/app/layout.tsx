import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SocialLinks } from '@/components/ui/SocialLinks';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Speakeasy Restaurant & Bar',
  description: 'A sophisticated dining experience with craft cocktails and delicious food.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white`}>
        <Header />
        {children}
        <SocialLinks />
      </body>
    </html>
  );
}