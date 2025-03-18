'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationMenu = ({ isOpen, onClose }: NavigationMenuProps) => {
  const pathname = usePathname();
  
  // Close menu when path changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Food', path: '/food' },
    { name: 'Drinks', path: '/drinks' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Gallery', path: '/gallery' },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <nav className="text-center">
        <ul className="space-y-8">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`text-3xl font-light uppercase tracking-wider hover:text-amber-300 transition-colors duration-300 ${pathname === item.path ? 'text-amber-300' : 'text-white'}`}
                onClick={onClose}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};