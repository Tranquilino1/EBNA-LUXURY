import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteCustomizationSettings } from '../types';

export const isDateInChristmasSeason = (): boolean => {
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 11 = Dec
  const day = now.getDate();

  // Dec 1 to Dec 31
  if (month === 11 && day >= 1) return true;
  // Jan 1 to Jan 6 (Reyes Magos)
  if (month === 0 && day <= 6) return true;

  return false;
};

const DEFAULT_SETTINGS: SiteCustomizationSettings = {
  christmasMode: 'auto',
  christmasSnow: true,
  christmasHats: true,
  christmasBanner: true,
  christmasLights: true,
  christmasFlowers: true,
  christmasBaubles: true,
  christmasFireworks: true,
  animationType: 'slide-up',
  animationSpeed: 0.5,
  staggerDelay: 0.04,
  hoverScale: 1.04,
  enableSpecularSweep: true,
  cardStyle: 'glass-luxe',
  animationPreset: 'pasarela-couture',
};

const STORAGE_KEY = 'ebna_site_customization_v1';

interface CustomizationContextType {
  settings: SiteCustomizationSettings;
  isChristmasActive: boolean;
  updateSettings: (newSettings: Partial<SiteCustomizationSettings>) => void;
  resetToDefaults: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteCustomizationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Error reading customization settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Calculate whether Christmas holiday theme is active
  const isChristmasActive = React.useMemo(() => {
    if (settings.christmasMode === 'enabled') return true;
    if (settings.christmasMode === 'disabled') return false;
    return isDateInChristmasSeason();
  }, [settings.christmasMode]);

  // Update CSS Variables and attributes on documentElement for real-time CSS binding
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--anim-duration', `${settings.animationSpeed}s`);
    root.style.setProperty('--anim-stagger-step', `${settings.staggerDelay}s`);
    root.style.setProperty('--card-hover-scale', `${settings.hoverScale}`);
    root.setAttribute('data-anim-type', settings.animationType);
    root.setAttribute('data-card-style', settings.cardStyle);
    root.setAttribute('data-christmas', isChristmasActive ? 'true' : 'false');
  }, [settings, isChristmasActive]);

  const updateSettings = (newSettings: Partial<SiteCustomizationSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {}
  };

  return (
    <CustomizationContext.Provider
      value={{
        settings,
        isChristmasActive,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = (): CustomizationContextType => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
