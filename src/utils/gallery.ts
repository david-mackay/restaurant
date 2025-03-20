// File: src/utils/gallery.ts
import fs from 'fs';
import path from 'path';
import { GalleryImage } from '@/types';

/**
 * Scans the public/images directory to generate image data
 */
export function getGalleryImages(): { images: GalleryImage[], categories: string[] } {
  const galleryDir = path.join(process.cwd(), 'public', 'images');
  const images: GalleryImage[] = [];
  const categories = new Set<string>();
  let id = 1;
  
  try {
    // Get all category directories
    const categoryDirs = fs.readdirSync(galleryDir)
      .filter(item => {
        const itemPath = path.join(galleryDir, item);
        return fs.statSync(itemPath).isDirectory();
      });
    
    // For each category, get all images
    for (const category of categoryDirs) {
      categories.add(category);
      const categoryPath = path.join(galleryDir, category);
      
      // Get all image files in this category
      const imageFiles = fs.readdirSync(categoryPath)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
      
      // Create image objects
      for (const file of imageFiles) {
        // For simplicity, using fixed dimensions based on category
        // In a real app, you might want to extract this from the image
        const width = 800;
        const height = category === 'drinks' ? 800 : 600;
        
        images.push({
          id: id++,
          src: `/images/${category}/${file}`,
          alt: `${category} image ${path.parse(file).name}`,
          width,
          height,
          category
        });
      }
    }
    
    return { 
      images, 
      categories: Array.from(categories) 
    };
  } catch (error) {
    console.error('Error scanning gallery:', error);
    return { images: [], categories: [] };
  }
}