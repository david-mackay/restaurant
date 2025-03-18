import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  return (
    <main className={`min-h-screen pt-24 px-4 pb-16 max-w-7xl mx-auto ${className}`}>
      {children}
    </main>
  );
};