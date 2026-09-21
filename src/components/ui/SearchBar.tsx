import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Buscar ropa, vestidos, perfumería, cosmética...' }: SearchBarProps) {
  return (
    <div 
      className="search-bar-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto 1.5rem auto',
      }}
    >
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(253, 248, 250, 0.78) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '40px',
          border: '1.5px solid rgba(216, 27, 96, 0.25)',
          padding: '6px 16px 6px 20px',
          boxShadow: '0 8px 25px rgba(216, 27, 96, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Search size={20} color="#D81B60" style={{ flexShrink: 0, marginRight: '12px' }} />
        
        <input
          type="text"
          className="search-input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
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
            onClick={() => onChange('')}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(216,27,96,0.08)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, color: '#D81B60', flexShrink: 0 }}>
            <Sparkles size={12} /> EBNA Search
          </div>
        )}
      </div>
    </div>
  );
}

