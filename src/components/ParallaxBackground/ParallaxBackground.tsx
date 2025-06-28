import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  children, 
  className = '' 
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Декоративные элементы с параллакс эффектом */}
      <div 
        className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) scale(${1 + scrollY * 0.0001})`
        }}
      />
      <div 
        className="absolute top-1/3 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{
          transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.08}px) scale(${1 + scrollY * 0.0001})`
        }}
      />
      <div 
        className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{
          transform: `translate(${scrollY * 0.15}px, ${scrollY * -0.05}px) scale(${1 + scrollY * 0.0001})`
        }}
      />
      
      {/* Контент */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
