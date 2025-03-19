'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hamburger } from '../ui/Hamburger';
import { NavigationMenu } from '../ui/NavigationMenu';
import { RESTAURANT_NAME } from '@/config';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 p-4">
      <div className="flex justify-between items-center">
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