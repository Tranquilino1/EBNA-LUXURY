import React from 'react';

interface TikTokIconProps {
  size?: number;
  className?: string;
  color?: string;
  variant?: 'monochrome' | 'color';
  style?: React.CSSProperties;
}

/**
 * Official vector TikTok icon with crisp vector path and optional multi-color 3D chromatic effect
 */
export const TikTokIcon: React.FC<TikTokIconProps> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor',
  variant = 'monochrome',
  style = {}
}) => {
  const pathD = "M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.31-4.643c.299-.002.596.042.88.13V9.405a6.346 6.346 0 0 0-1-.08A6.336 6.336 0 0 0 3 15.66a6.34 6.34 0 0 0 10.863 4.434v-7.001a8.16 8.16 0 0 0 4.774 1.524v-3.407a4.85 4.85 0 0 1-.048-4.524z";

  if (variant === 'color') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
          ...style,
        }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={pathD} fill="#25F4EE" transform="translate(-0.7, -0.5)" opacity="0.9" />
        <path d={pathD} fill="#FE2C55" transform="translate(0.7, 0.5)" opacity="0.9" />
        <path d={pathD} fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={pathD} />
    </svg>
  );
};
