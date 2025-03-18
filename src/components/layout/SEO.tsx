import { SEOProps } from '@/types';

export const generateMetadata = ({ 
  title = 'Speakeasy Restaurant & Bar',
  description = 'A sophisticated dining experience with craft cocktails and delicious food.',
  keywords = 'restaurant, speakeasy, cocktails, dining, food',
  ogImage = '/images/og-image.jpg',
}: SEOProps) => {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
};