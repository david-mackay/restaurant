import { PageWrapper } from '@/components/layout/PageWrapper';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { GalleryImage } from '@/types';

export default function Gallery() {
  // Placeholder data
  const images: GalleryImage[] = [
    {
      id: 1,
      src: '/images/gallery/restaurant-1.jpg',
      alt: 'Restaurant interior with dim lighting and elegant tables',
      width: 800,
      height: 600,
      category: 'interior',
    },
    {
      id: 2,
      src: '/images/gallery/cocktail-1.jpg',
      alt: 'Craft cocktail with garnish',
      width: 800,
      height: 800,
      category: 'drinks',
    },
    {
      id: 3,
      src: '/images/gallery/food-1.jpg',
      alt: 'Plated gourmet dish',
      width: 800,
      height: 600,
      category: 'food',
    },
    {
      id: 4,
      src: '/images/gallery/bar-1.jpg',
      alt: 'Bar area with bottles display',
      width: 800,
      height: 600,
      category: 'interior',
    },
    {
      id: 5,
      src: '/images/gallery/cocktail-2.jpg',
      alt: 'Mixologist preparing a cocktail',
      width: 800,
      height: 800,
      category: 'drinks',
    },
    {
      id: 6,
      src: '/images/gallery/food-2.jpg',
      alt: 'Dessert plate with artistic presentation',
      width: 800,
      height: 600,
      category: 'food',
    },
  ];

  // For the placeholder, we'll use colored rectangles
  // In a real implementation, you would use actual image files
  
  const categories = ['interior', 'food', 'drinks', 'events'];

  return (
    <PageWrapper>
      <h1 className="section-title">Gallery</h1>
      <p className="mb-8 text-gray-300">
        Explore our space, food, and drinks through our gallery. Get a glimpse of the Speakeasy experience.
      </p>
      
      <ImageGallery images={images} categories={categories} />
      
      <div className="mt-8 text-center">
        <button className="text-white border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors">
          Load More
        </button>
      </div>
    </PageWrapper>
  );
}