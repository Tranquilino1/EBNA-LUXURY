import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../types';
import { getSearchAutocomplete, highlightMatch } from '../../lib/searchUtils';
import { formatPrice } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
  showAutocompleteDropdown?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar cualquier prenda, vestido, gala, color, calzado o cosmética...',
  products = [],
  onSelectProduct,
  showAutocompleteDropdown = true
}: SearchBarProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compute live autocomplete suggestions (max 5 high-precision items)
  const suggestions = useMemo(() => {
    if (!showAutocompleteDropdown || !value || value.trim().length < 1 || !products || products.length === 0) {
      return [];
    }
    return getSearchAutocomplete(products, value, 5);
  }, [showAutocompleteDropdown, value, products]);

  // Open dropdown when typing
  useEffect(() => {
    if (showAutocompleteDropdown && value.trim().length >= 1 && suggestions.length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [showAutocompleteDropdown, value, suggestions.length]);

  // Click outside listener to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product: Product) => {
    setIsOpen(false);
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate(`/producto/${product.slug || product.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[selectedIndex].product);
      } else {
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="search-bar-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto 1.5rem auto',
        zIndex: isOpen ? 60 : 20,
      }}
    >
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: '60px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(253, 248, 250, 0.88) 100%)',
          backdropFilter: 'blur(25px) saturate(190%)',
          WebkitBackdropFilter: 'blur(25px) saturate(190%)',
          borderRadius: isOpen ? '24px 24px 0 0' : '40px',
          border: '1.5px solid rgba(216, 27, 96, 0.25)',
          borderBottom: isOpen ? '1px solid rgba(216, 27, 96, 0.15)' : '1.5px solid rgba(216, 27, 96, 0.25)',
          padding: '8px 18px 8px 22px',
          boxShadow: isOpen 
            ? '0 12px 35px rgba(216, 27, 96, 0.16)' 
            : '0 8px 25px rgba(216, 27, 96, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <Search size={22} color="#D81B60" style={{ flexShrink: 0, marginRight: '14px' }} />
        
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="search-input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (value.trim().length >= 1 && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.blur();
            }
            handleKeyDown(e);
          }}
          placeholder={placeholder}
          aria-label="Buscar productos en el catálogo"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1E293B',
            padding: '10px 0',
            fontFamily: 'inherit',
          }}
        />


        {value ? (
          <button 
            type="button"
            className="search-clear-btn" 
            onClick={() => {
              onChange('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Limpiar búsqueda"
            style={{
              background: 'rgba(216, 27, 96, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D81B60',
              cursor: 'pointer',
              marginLeft: '8px',
              flexShrink: 0,
              transition: 'transform 0.2s ease',
            }}
          >
            <X size={16} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(216,27,96,0.08)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 800, color: '#D81B60', flexShrink: 0 }}>
            <Sparkles size={13} /> EBNA Search
          </div>
        )}
      </div>

      {/* Luxury Google-Style Predictive Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          className="search-autocomplete-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            border: '1.5px solid rgba(216, 27, 96, 0.25)',
            borderTop: 'none',
            borderRadius: '0 0 24px 24px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(216, 27, 96, 0.08)',
            overflow: 'hidden',
            animation: 'fadeInSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 100,
          }}
        >
          {/* Header indicator */}
          <div style={{ padding: '8px 18px', background: 'rgba(216, 27, 96, 0.05)', borderBottom: '1px solid rgba(216, 27, 96, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#D81B60', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} /> Sugerencias de Localización Inmediata
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
              {suggestions.length} resultados exactos
            </span>
          </div>

          {/* List of Autocomplete Items */}
          <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
            {suggestions.map((item, idx) => {
              const p = item.product;
              const rawImg = p.images?.primary || (Array.isArray(p.images) ? p.images[0] : (p.images as any)?.[0]) || '/icons/ebna-logo-white.png';
              const cleanImg = typeof rawImg === 'string' ? (rawImg.startsWith('data:image/') ? rawImg : rawImg.replace(/\.jfif$/i, '.jpg')) : '/icons/ebna-logo-white.png';
              const priceNum = p.priceFCFA || p.price || 0;
              const isHighlighted = selectedIndex === idx;

              const chunks = highlightMatch(p.name, value);

              return (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 18px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                    background: isHighlighted ? 'rgba(216, 27, 96, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                    {/* Thumbnail */}
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#F8FAFC', border: '1px solid rgba(216, 27, 96, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img 
                        src={cleanImg} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/ebna-logo-white.png'; }}
                      />
                    </div>

                    {/* Text Details */}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {chunks.map((chunk, cIdx) => chunk.isMatch ? (
                          <mark key={cIdx} style={{ background: 'rgba(216, 27, 96, 0.18)', color: '#D81B60', fontWeight: 800, padding: '0 2px', borderRadius: '3px' }}>
                            {chunk.text}
                          </mark>
                        ) : (
                          <span key={cIdx}>{chunk.text}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', background: 'rgba(0, 0, 0, 0.04)', padding: '1px 6px', borderRadius: '6px' }}>
                          {item.matchedCategory}
                        </span>
                        {p.in_stock !== false && (
                          <span style={{ fontSize: '0.7rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                            <CheckCircle2 size={11} /> En Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#D81B60' }}>
                      {formatPrice(priceNum)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: isHighlighted ? '#D81B60' : '#94A3B8', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                      Ver detalle <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              padding: '10px 18px',
              background: 'linear-gradient(135deg, rgba(216, 27, 96, 0.08) 0%, rgba(216, 27, 96, 0.03) 100%)',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#D81B60',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderTop: '1px solid rgba(216, 27, 96, 0.1)'
            }}
          >
            <span>Ver todos los resultados filtrados en el catálogo</span>
            <ArrowRight size={13} />
          </div>
        </div>
      )}
    </div>
  );
}
