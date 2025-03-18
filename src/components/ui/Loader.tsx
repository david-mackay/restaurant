'use client';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'white' | 'amber';
  className?: string;
}

export const Loader = ({ size = 'medium', color = 'amber', className = '' }: LoaderProps) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const colorClasses = {
    white: 'border-white border-t-transparent',
    amber: 'border-amber-700 border-t-transparent',
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};