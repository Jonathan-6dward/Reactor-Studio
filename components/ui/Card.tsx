import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-card border border-accent rounded-xl p-4 overflow-hidden
        ${hover ? 'hover:border-primary/50 transition-colors cursor-pointer hover:shadow-lg hover:shadow-primary/5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};