// Restaurant information
export const RESTAURANT_NAME = process.env.NEXT_PUBLIC_RESTAURANT_NAME || "Ye's Apothecary";
export const RESTAURANT_TAGLINE = process.env.NEXT_PUBLIC_RESTAURANT_TAGLINE || '';
export const RESTAURANT_ADDRESS = process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS || '119 Orchard Street, New York, NY 10003';
export const RESTAURANT_PHONE = process.env.NEXT_PUBLIC_RESTAURANT_PHONE || '(929) 655-251';
export const RESTAURANT_EMAIL = process.env.NEXT_PUBLIC_RESTAURANT_EMAIL || 'missyeapothecary@gmail.com';

// Social media
export const SOCIAL_MEDIA = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yesapothecary',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/yesapothecary',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/yesapothecary',
};

// Business hours
export const BUSINESS_HOURS = {
  weekday: process.env.NEXT_PUBLIC_HOURS_WEEKDAY || 'Tuesday - Thursday: 5pm - 12am',
  weekend: process.env.NEXT_PUBLIC_HOURS_WEEKEND || 'Friday - Saturday: 5pm - 1am',
  sundayMonday: process.env.NEXT_PUBLIC_HOURS_SUNDAY_MONDAY || 'Sunday : 5pm - 12am',
};

// Media
export const VIDEO_BACKGROUND_URL = process.env.NEXT_PUBLIC_VIDEO_BACKGROUND_URL || '/yesloop.mp4';

// SEO
export const DEFAULT_META_DESCRIPTION = process.env.NEXT_PUBLIC_DEFAULT_META_DESCRIPTION || 'A sophisticated dining experience with craft cocktails and delicious food.';

// Note: Server-side only variables should be accessed in server components or API routes
export const getServerConfig = () => {
  return {
    reservationApiKey: process.env.RESERVATION_API_KEY,
    emailServiceApiKey: process.env.EMAIL_SERVICE_API_KEY,
    // Add other server-only variables here
  };
};