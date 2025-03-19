'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Hamburger } from '../ui/Hamburger';
import { NavigationMenu } from '../ui/NavigationMenu';
import { RESTAURANT_NAME } from '@/config';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // When menu is open, always show header and disable scroll
    if (isMenuOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
      return;
    } else {
      document.body.style.overflow = '';
    }

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Only start hiding after scrolling past header height
      if (currentScrollPos > 80) {
        setHasScrolled(true);
        
        // Determine scroll direction
        const isScrollingDown = prevScrollPos < currentScrollPos;
        
        // Update visibility based on scroll direction
        setVisible(!isScrollingDown || currentScrollPos < 80);
      } else {
        // When scrolled to top, always show header
        setVisible(true);
        setHasScrolled(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  return (
    <header 
      className={`w-full z-30 transition-all duration-300 ${
        hasScrolled 
          ? `fixed ${visible ? 'top-0' : 'top-[-80px]'} bg-black/95 shadow-md` 
          : 'relative bg-transparent'
      }`}
    >
      <div className="h-[80px] px-4 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-white text-xl font-serif z-50">
          {RESTAURANT_NAME}
        </Link>
        <div className="z-50">
          <Hamburger isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </div>
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};