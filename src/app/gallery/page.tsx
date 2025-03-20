// File: src/app/gallery/page.tsx
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ImmersiveGallery } from '@/components/ui/ImageGallery';
import { getGalleryImages } from '@/utils/gallery';

export default function Gallery() {
  // Using server component to get data at build time
  const { images, categories } = getGalleryImages();
  
  return (
    <PageWrapper>
      <ImmersiveGallery images={images} categories={categories} />
    </PageWrapper>
  );
}