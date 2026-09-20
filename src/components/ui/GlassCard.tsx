import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'prominent';
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
}: GlassCardProps) {
  const baseClass = 'glass-card';
  const variantClasses = {
    default: '',
    subtle: 'glass-card-subtle',
    prominent: 'glass-bg-prominent',
  };

  const classes = [
    baseClass,
    variantClasses[variant],
    hover ? 'glass-card-hover' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
