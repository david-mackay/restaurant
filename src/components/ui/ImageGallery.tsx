'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types';

interface ImmersiveGalleryProps {
  images: GalleryImage[];
  categories?: string[];
}

export const ImmersiveGallery = ({ images, categories = [] }: ImmersiveGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const transitionDuration = 400; // ms

  const filteredImages = activeCategory
    ? images.filter((image) => image.category === activeCategory)
    : images;

  const allCategories = categories.length 
    ? categories 
    : [...new Set(images.map((image) => image.category))];

  // Handle image transitions
  const changeImage = useCallback((newIndex: number) => {
    if (newIndex === mainImageIndex) return;
    
    setIsFading(true);
    setTimeout(() => {
      setMainImageIndex(newIndex);
      setTimeout(() => {
        setIsFading(false);
      }, 50); // Small delay to ensure DOM updates before starting fade-in
    }, transitionDuration);
  }, [mainImageIndex, transitionDuration]);

  const goToNextImage = useCallback(() => {
    if (isFading || filteredImages.length <= 1) return;
    const newIndex = (mainImageIndex + 1) % filteredImages.length;
    changeImage(newIndex);
  }, [isFading, filteredImages.length, mainImageIndex, changeImage]);

  const goToPreviousImage = useCallback(() => {
    if (isFading || filteredImages.length <= 1) return;
    const newIndex = (mainImageIndex - 1 + filteredImages.length) % filteredImages.length;
    changeImage(newIndex);
  }, [isFading, filteredImages.length, mainImageIndex, changeImage]);

  // Handle scroll to active thumbnail
  useEffect(() => {
    if (!thumbnailRef.current) return;
    const activeThumb = thumbnailRef.current.querySelector('[data-active="true"]');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [mainImageIndex]);

  // Reset image index when category changes
  useEffect(() => {
    setMainImageIndex(0);
  }, [activeCategory]);

  // Handle fullscreen mode
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Auto-advance images (optional)
  useEffect(() => {
    if (filteredImages.length <= 1) return;
    
    const interval = setInterval(() => {
      goToNextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [filteredImages, goToNextImage]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="w-full">
      <div><br/></div>
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3 px-4">
        <button 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !activeCategory 
              ? 'bg-amber-600 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => {
            setActiveCategory(null);
          }}
        >
          All
        </button>
        {allCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
              activeCategory === category 
                ? 'bg-amber-600 text-white shadow-lg' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => {
              setActiveCategory(category);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredImages.length > 0 && (
        <>
          {/* Main Image Display */}
          <div className="relative overflow-hidden rounded-lg bg-black w-full mb-4 max-w-6xl mx-auto" style={{ height: '70vh' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={filteredImages[mainImageIndex].src}
                alt={filteredImages[mainImageIndex].alt || "Gallery image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1536px"
                className={`object-cover object-center transition-opacity duration-${transitionDuration} ${isFading ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
            </div>

            {/* Immersive Gallery Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white">
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all text-white"
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    {isFullscreen ? (
                      <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                    ) : (
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  disabled={isFading}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <button
                  onClick={goToNextImage}
                  disabled={isFading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {filteredImages.length > 1 && (
            <div 
              className="w-full max-w-6xl mx-auto overflow-x-auto pb-4 hide-scrollbar"
              ref={thumbnailRef}
            >
              <div className="flex gap-2 px-4">
                {filteredImages.map((image, idx) => (
                  <button
                    key={image.src}
                    onClick={() => !isFading && changeImage(idx)}
                    className={`relative shrink-0 rounded-md overflow-hidden transition-all ${
                      idx === mainImageIndex 
                        ? 'ring-4 ring-amber-500 scale-105 z-10' 
                        : 'ring-0 brightness-75 hover:brightness-100'
                    } ${isFading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ height: '80px', width: '120px' }}
                    data-active={idx === mainImageIndex}
                    disabled={isFading}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || ""}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Fullscreen Mode */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white"
            aria-label="Close fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          
          <div className="w-full h-full relative">
            <Image
              src={filteredImages[mainImageIndex].src}
              alt={filteredImages[mainImageIndex].alt || "Gallery image"}
              fill
              sizes="100vw"
              className={`object-contain transition-opacity duration-${transitionDuration} ${isFading ? 'opacity-0' : 'opacity-100'}`}
              priority
            />
          </div>
          
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                disabled={isFading}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              <button
                onClick={goToNextImage}
                disabled={isFading}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </>
          )}
          
          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white text-sm">
            {mainImageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      {/* Custom CSS for hiding scrollbars but maintaining functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};