'use client';

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export const Hamburger = ({ isOpen, onClick }: HamburgerProps) => {
  return (
    <button 
      className="z-50 relative w-10 h-10 flex flex-col justify-center items-center"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
    </button>
  );
};