import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealElementProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right';
  delay?: number;
  className?: string;
  threshold?: number;
}

export const RevealElement: React.FC<RevealElementProps> = ({
  children,
  animation = 'slide-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}) => {
  const { ref, isRevealed } = useScrollReveal({ threshold });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isRevealed) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-up':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slide-left':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'slide-right':
          return `${baseClasses} opacity-0 translate-x-8`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
    }
  };

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${getAnimationClasses()} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};
