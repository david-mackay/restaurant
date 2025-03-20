import { ReactNode } from 'react';
import { Header } from './Header';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  return (
    <main className={`min-h-screen overflow-hidden max-w-7xl mx-auto ${className}`}>
      <Header />
      {children}
    </main>
  );
};