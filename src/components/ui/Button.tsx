import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  className = '',
  fullWidth = false,
}: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-none font-medium tracking-wider uppercase transition-colors duration-300';
  
  const variantClasses = {
    primary: 'bg-amber-700 text-white hover:bg-amber-800',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    outline: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};