import React from 'react';

interface Icon3DProps {
  size?: number;
  className?: string;
}

/**
 * 3D Golden Diamond Prism (Todos / Catálogo Completo)
 */
export const Icon3DAll: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="allGoldGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.35" stopColor="#F59E0B" />
        <stop offset="0.75" stopColor="#D97706" />
        <stop offset="1" stopColor="#78350F" />
      </linearGradient>
      <linearGradient id="allFacetGrad" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFBEB" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#FCD34D" stopOpacity="0.4" />
        <stop offset="1" stopColor="#D97706" stopOpacity="0.8" />
      </linearGradient>
      <filter id="allGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#allGlow)">
      {/* 3D Diamond Base */}
      <polygon points="24,3 45,15 24,45 3,15" fill="url(#allGoldGrad)" stroke="#FEF3C7" strokeWidth="1" />
      {/* Diamond Facets */}
      <polygon points="24,3 15,15 33,15" fill="url(#allFacetGrad)" />
      <polygon points="3,15 15,15 24,45" fill="#B45309" fillOpacity="0.75" />
      <polygon points="45,15 33,15 24,45" fill="#D97706" fillOpacity="0.9" />
      <polygon points="15,15 33,15 24,45" fill="url(#allFacetGrad)" />
      {/* Sparkle Glint */}
      <circle cx="24" cy="15" r="2" fill="#FFFFFF" />
      <polygon points="24,8 25.5,13.5 31,15 25.5,16.5 24,22 22.5,16.5 17,15 22.5,13.5" fill="#FFFFFF" opacity="0.95" />
    </g>
  </svg>
);

/**
 * 3D Luxury Serum Dropper Flacon (Cosmética Facial)
 */
export const Icon3DFacial: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="facialBody" x1="12" y1="18" x2="36" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCE7F3" />
        <stop offset="0.3" stopColor="#F472B6" />
        <stop offset="0.7" stopColor="#DB2777" />
        <stop offset="1" stopColor="#831843" />
      </linearGradient>
      <linearGradient id="facialPipet" x1="20" y1="4" x2="28" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.6" stopColor="#D97706" />
        <stop offset="1" stopColor="#92400E" />
      </linearGradient>
      <filter id="facialGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#DB2777" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#facialGlow)">
      {/* Bottle Body */}
      <rect x="13" y="18" width="22" height="26" rx="7" fill="url(#facialBody)" stroke="#FDF2F8" strokeWidth="1" />
      {/* Glass Inner Reflection */}
      <rect x="15" y="20" width="8" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.4" />
      {/* Golden Cap Neck */}
      <rect x="18" y="13" width="12" height="6" rx="2" fill="url(#facialPipet)" stroke="#FEF3C7" strokeWidth="0.8" />
      {/* Pipet Rubber Bulb */}
      <ellipse cx="24" cy="9" rx="6" ry="6" fill="url(#facialPipet)" />
      <ellipse cx="22" cy="7" rx="2" ry="1.5" fill="#FFFFFF" fillOpacity="0.6" />
      {/* Serum Dew Drop */}
      <path d="M37 28 C37 28, 41 33, 41 35 C41 37.2 39.2 39 37 39 C34.8 39 33 37.2 33 35 C33 33, 37 28, 37 28 Z" fill="#F472B6" stroke="#FFFFFF" strokeWidth="0.8" />
      <circle cx="36" cy="34" r="1" fill="#FFFFFF" />
    </g>
  </svg>
);

/**
 * 3D Iridescent Foam Sphere (Higiene Corporal)
 */
export const Icon3DBody: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <radialGradient id="bodySphere" cx="30%" cy="30%" r="70%">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.25" stopColor="#BAE6FD" />
        <stop offset="0.65" stopColor="#38BDF8" />
        <stop offset="0.9" stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </radialGradient>
      <filter id="bodyGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#bodyGlow)">
      {/* Main 3D Bubble */}
      <circle cx="22" cy="24" r="16" fill="url(#bodySphere)" stroke="#E0F2FE" strokeWidth="1" />
      {/* Specular Glint */}
      <ellipse cx="16" cy="18" rx="6" ry="3.5" transform="rotate(-30 16 18)" fill="#FFFFFF" fillOpacity="0.85" />
      {/* Companion Mini Bubble 1 */}
      <circle cx="36" cy="15" r="7" fill="url(#bodySphere)" stroke="#E0F2FE" strokeWidth="0.8" />
      <ellipse cx="34" cy="13" rx="2" ry="1" fill="#FFFFFF" fillOpacity="0.8" />
      {/* Companion Mini Bubble 2 */}
      <circle cx="37" cy="33" r="5" fill="url(#bodySphere)" stroke="#E0F2FE" strokeWidth="0.8" />
      <circle cx="36" cy="32" r="1" fill="#FFFFFF" />
    </g>
  </svg>
);

/**
 * 3D Haute Couture Gala Gown (Moda Mujer)
 */
export const Icon3DFashion: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="fashionDress" x1="10" y1="6" x2="38" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="0.35" stopColor="#E11D48" />
        <stop offset="0.75" stopColor="#BE123C" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="fashionBelt" x1="16" y1="20" x2="32" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <filter id="fashionGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E11D48" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#fashionGlow)">
      {/* Top Bodice */}
      <path d="M18 7 L24 13 L30 7 L32 19 L16 19 Z" fill="url(#fashionDress)" stroke="#FFE4E6" strokeWidth="0.8" />
      {/* Gold Belt Waist */}
      <rect x="17" y="19" width="14" height="4" rx="2" fill="url(#fashionBelt)" stroke="#FEF3C7" strokeWidth="0.8" />
      <circle cx="24" cy="21" r="1.5" fill="#FFFFFF" />
      {/* Flowing Ballgown Skirt */}
      <path d="M17 23 C17 23, 14 36, 6 43 C18 45, 30 45, 42 43 C34 36, 31 23, 31 23 Z" fill="url(#fashionDress)" stroke="#FECDD3" strokeWidth="0.8" />
      {/* Skirt Drapes / Folds */}
      <path d="M24 23 Q24 35 24 44" stroke="#FFF1F2" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" />
      <path d="M20 23 Q18 35 15 43" stroke="#881337" strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M28 23 Q30 35 33 43" stroke="#881337" strokeWidth="1.2" strokeOpacity="0.4" />
    </g>
  </svg>
);

/**
 * 3D Quilted Luxury Handbag (Bolsos & Accesorios)
 */
export const Icon3DBags: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="bagLeather" x1="8" y1="18" x2="40" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5D0C5" />
        <stop offset="0.3" stopColor="#D97706" />
        <stop offset="0.75" stopColor="#92400E" />
        <stop offset="1" stopColor="#451A03" />
      </linearGradient>
      <linearGradient id="bagGold" x1="16" y1="6" x2="32" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <filter id="bagGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D97706" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#bagGlow)">
      {/* Metallic Arch Handle */}
      <path d="M18 18 C18 9, 30 9, 30 18" stroke="url(#bagGold)" strokeWidth="3" strokeLinecap="round" />
      {/* Bag Body */}
      <path d="M9 20 L39 20 L42 42 C42 43.5 40.5 44 39 44 L9 44 C7.5 44 6 43.5 6 42 Z" fill="url(#bagLeather)" stroke="#FEF3C7" strokeWidth="1" />
      {/* Quilted Diamond Lines */}
      <path d="M14 20 L34 44 M24 20 L40 38 M10 28 L24 44 M34 20 L14 44 M24 20 L8 38 M38 28 L24 44" stroke="#FEF3C7" strokeWidth="0.8" strokeOpacity="0.35" />
      {/* Flap Lock */}
      <rect x="20" y="28" width="8" height="6" rx="2" fill="url(#bagGold)" stroke="#FFFBEB" strokeWidth="0.8" />
      <circle cx="24" cy="31" r="1.2" fill="#78350F" />
    </g>
  </svg>
);

/**
 * 3D Crystal Stiletto High Heel (Calzado)
 */
export const Icon3DShoes: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="shoeGrad" x1="8" y1="12" x2="42" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.4" stopColor="#E11D48" />
        <stop offset="0.8" stopColor="#9F1239" />
        <stop offset="1" stopColor="#4C0519" />
      </linearGradient>
      <linearGradient id="shoeSole" x1="12" y1="26" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.6" stopColor="#D97706" />
        <stop offset="1" stopColor="#78350F" />
      </linearGradient>
      <filter id="shoeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E11D48" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#shoeGlow)">
      {/* Ultra-Slim Stiletto Heel */}
      <path d="M12 24 L10 43 L12.5 43 L15 24 Z" fill="url(#shoeSole)" stroke="#FEF3C7" strokeWidth="0.5" />
      {/* Heel Tip */}
      <rect x="9.5" y="42" width="3.5" height="2" rx="0.5" fill="#1E293B" />
      {/* Shoe Upper Arch */}
      <path d="M10 22 C14 20, 20 23, 26 31 C32 37, 40 37, 44 37 C42 35, 38 31, 33 27 C28 22, 22 17, 10 22 Z" fill="url(#shoeGrad)" stroke="#FFE4E6" strokeWidth="1" />
      {/* Golden Insole Profile */}
      <path d="M10 23 C16 21, 22 25, 27 32 C31 37, 37 38, 44 38 L43 39 C36 39, 30 38, 26 33 C21 26, 15 22, 10 24 Z" fill="url(#shoeSole)" />
      {/* Front Pointed Tip */}
      <circle cx="28" cy="27" r="2" fill="#FFFFFF" fillOpacity="0.9" />
    </g>
  </svg>
);

/**
 * 3D Crystal Perfume Flacon (Perfumería)
 */
export const Icon3DPerfume: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="perfumeGlass" x1="12" y1="16" x2="36" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5D0FE" />
        <stop offset="0.3" stopColor="#C084FC" />
        <stop offset="0.75" stopColor="#7E22CE" />
        <stop offset="1" stopColor="#3B0764" />
      </linearGradient>
      <linearGradient id="perfumeGold" x1="18" y1="4" x2="30" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#92400E" />
      </linearGradient>
      <filter id="perfumeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7E22CE" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#perfumeGlow)">
      {/* Octagonal Faceted Stopper */}
      <polygon points="24,4 30,8 30,14 24,17 18,14 18,8" fill="url(#perfumeGold)" stroke="#FEF3C7" strokeWidth="1" />
      <circle cx="24" cy="10" r="1.5" fill="#FFFFFF" />
      {/* Atomizer Neck Collar */}
      <rect x="20" y="17" width="8" height="4" rx="1.5" fill="url(#perfumeGold)" stroke="#FEF3C7" strokeWidth="0.8" />
      {/* Heavy Crystal Base Body */}
      <path d="M14 21 L34 21 L38 41 C38 43, 36 44, 34 44 L14 44 C12 44, 10 43, 10 41 Z" fill="url(#perfumeGlass)" stroke="#FAF5FF" strokeWidth="1.2" />
      {/* Facet Reflection */}
      <polygon points="17,24 23,24 21,41 15,41" fill="#FFFFFF" fillOpacity="0.35" />
      {/* Fragrance Essence Core */}
      <rect x="16" y="27" width="16" height="13" rx="3" fill="#E879F9" fillOpacity="0.4" />
      <ellipse cx="24" cy="33.5" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.5" />
    </g>
  </svg>
);

/**
 * 3D Royal Boutique Crown (Línea Infantil / Exclusivo)
 */
export const Icon3DKids: React.FC<Icon3DProps> = ({ size = 26, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`icon-3d-luxury ${className}`}
  >
    <defs>
      <linearGradient id="crownGold" x1="8" y1="12" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF3C7" />
        <stop offset="0.3" stopColor="#F59E0B" />
        <stop offset="0.7" stopColor="#D97706" />
        <stop offset="1" stopColor="#78350F" />
      </linearGradient>
      <filter id="crownGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#crownGlow)">
      {/* 3D Crown Peaks */}
      <path d="M8 38 L9 18 L18 28 L24 12 L30 28 L39 18 L40 38 Z" fill="url(#crownGold)" stroke="#FEF3C7" strokeWidth="1" />
      {/* Crown Rim Base */}
      <rect x="7" y="36" width="34" height="6" rx="3" fill="url(#crownGold)" stroke="#FEF3C7" strokeWidth="0.8" />
      {/* Pearls on Peaks */}
      <circle cx="9" cy="17" r="3" fill="#FFFFFF" stroke="#FEF3C7" strokeWidth="0.8" />
      <circle cx="24" cy="11" r="3.5" fill="#FFFFFF" stroke="#FEF3C7" strokeWidth="0.8" />
      <circle cx="39" cy="17" r="3" fill="#FFFFFF" stroke="#FEF3C7" strokeWidth="0.8" />
      {/* Jewels on Rim */}
      <circle cx="16" cy="39" r="1.8" fill="#F43F5E" />
      <circle cx="24" cy="39" r="2" fill="#38BDF8" />
      <circle cx="32" cy="39" r="1.8" fill="#10B981" />
    </g>
  </svg>
);
