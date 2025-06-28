import React from 'react';
import { useEnhancedScrollReveal } from '@/hooks/useEnhancedScrollReveal';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'slide-down';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'slide-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const { ref, isRevealed } = useEnhancedScrollReveal({ 
    threshold, 
    delay, 
    triggerOnce 
  });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    if (!isRevealed) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'slide-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'slide-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
        case 'slide-left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'slide-right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'scale-up':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
