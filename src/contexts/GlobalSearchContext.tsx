import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { FilterCategoryType } from '../types';

interface GlobalSearchContextType {
  isOpen: boolean;
  searchQuery: string;
  selectedCategory: FilterCategoryType;
  openSearch: (initialCategory?: FilterCategoryType, initialQuery?: string) => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: FilterCategoryType) => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(undefined);

export const GlobalSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryType>('TODOS');

  const openSearch = (initialCategory?: FilterCategoryType, initialQuery?: string) => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialQuery !== undefined) setSearchQuery(initialQuery);
    setIsOpen(true);
  };

  const closeSearch = () => {
    setIsOpen(false);
  };

  const toggleSearch = () => {
    setIsOpen(prev => !prev);
  };

  // Keyboard shortcut listener: Ctrl+K or Cmd+K or pressing '/' opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea or contenteditable element
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === '/' && !isInput && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when search modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <GlobalSearchContext.Provider
      value={{
        isOpen,
        searchQuery,
        selectedCategory,
        openSearch,
        closeSearch,
        toggleSearch,
        setSearchQuery,
        setSelectedCategory,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
};

export function useGlobalSearch(): GlobalSearchContextType {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error('useGlobalSearch must be used within a GlobalSearchProvider');
  }
  return context;
}
