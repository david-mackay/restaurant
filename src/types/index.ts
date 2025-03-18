// Menu Types
export interface MenuItem {
    ingredients?: string[];
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    featured?: boolean;
    dietary?: string[]; // 'vegan', 'gluten-free', etc.
  }
  
  // Drink Types (extends MenuItem with additional properties)
  export interface DrinkItem extends MenuItem {
    alcoholContent?: number; // percentage
  }
  
  // Gallery Types
  export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
    category: string;
  }
  
  // Testimonial Types
  export interface Testimonial {
    id: number;
    name: string;
    content: string;
    date: string;
    rating: number;
  }
  
  // Event Types
  export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    image?: string;
  }
  
  // Reservation Types
  export interface Reservation {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    specialRequests?: string;
  }
  
  // Contact Form Types
  export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
  
  // SEO Types
  export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
  }