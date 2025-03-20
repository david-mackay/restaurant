// File: src/app/gallery/page.tsx
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ImmersiveGallery } from '@/components/ui/ImageGallery';
import { getGalleryImages } from '@/utils/gallery';

export default function Gallery() {
  // Using server component to get data at build time
  const { images, categories } = getGalleryImages();
  
  return (
    <PageWrapper>
      <h1 className="section-title">Gallery</h1>
      <ImmersiveGallery images={images} categories={categories} />
    </PageWrapper>
  );
}