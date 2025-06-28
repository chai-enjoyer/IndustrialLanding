import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-out border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-offset-0 active:scale-95 shadow-sm hover:shadow-md';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500/25 shadow-blue-500/25',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500/25 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'bg-white/10 backdrop-blur-sm text-blue-600 border-2 border-blue-600/20 hover:bg-blue-600 hover:text-white focus:ring-blue-500/25 dark:text-blue-400 dark:border-blue-400/20 dark:hover:bg-blue-600',
  };

  const sizeClasses = {
    small: 'px-4 py-2.5 text-sm font-semibold',
    medium: 'px-6 py-3 text-base font-semibold',
    large: 'px-8 py-4 text-lg font-semibold',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed transform-none hover:shadow-sm' : 'cursor-pointer';

  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ].join(' ');

  return (
    <button
      type={type}
      className={finalClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
