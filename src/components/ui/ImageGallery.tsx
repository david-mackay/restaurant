'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types';

interface ImageGalleryProps {
  images: GalleryImage[];
  categories?: string[];
}

export const ImageGallery = ({ images, categories = [] }: ImageGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory
    ? images.filter((image) => image.category === activeCategory)
    : images;

  const allCategories = categories.length 
    ? categories 
    : [...new Set(images.map((image) => image.category))];

  return (
    <div>
      <div className="mb-8 flex items-center justify-center overflow-x-auto pb-2 gap-4">
        <button 
          className={`transition-colors ${!activeCategory ? 'text-amber-300' : 'text-white hover:text-amber-300'}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {allCategories.map((category) => (
          <button
            key={category}
            className={`transition-colors capitalize ${
              activeCategory === category 
                ? 'text-amber-300' 
                : 'text-white hover:text-amber-300'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className="overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div
              className="w-full relative bg-gray-800 group-hover:scale-105 transition-transform duration-300"
              style={{
                aspectRatio: `${image.width / image.height}`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity duration-300">
                <p className="text-white text-lg p-4 text-center">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute -top-10 right-0 text-white hover:text-amber-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
            <div className="relative" style={{ aspectRatio: `${selectedImage.width / selectedImage.height}` }}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px" 
                className="object-contain"
                priority
              />
            </div>
            <p className="text-white mt-2">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};