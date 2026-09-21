import React, { useState } from 'react';
import { Search, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ImageOption {
  id: string;
  url: string;
  title: string;
  source: 'Pinterest HD' | 'Unsplash Pro' | 'Catálogo';
}

const HD_PRESET_GALLERY: ImageOption[] = [
  // VASELINAS
  { id: 'p1', url: '/products/user-product-1.jpg', title: 'Vaseline Petroleum Jelly Pure Original 250ml', source: 'Pinterest HD' },
  { id: 'p2', url: '/products/user-product-3.jpg', title: 'Vaseline Cocoa Butter Rich Jelly 250ml', source: 'Pinterest HD' },
  { id: 'p3', url: '/products/user-product-2.jpg', title: 'Vaseline Aloe Fresh Soothing Jelly', source: 'Pinterest HD' },
  { id: 'p4', url: '/products/user-product-4.jpg', title: 'Vaseline Lip Therapy Rosy Lips 20g', source: 'Pinterest HD' },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', title: 'Vaseline Intensive Care Lotion 400ml', source: 'Unsplash Pro' },

  // JABONES
  { id: 'p6', url: '/products/user-product-5.jpg', title: 'Dudu-Osun Jabón Negro Africano 150g', source: 'Pinterest HD' },
  { id: 'p7', url: '/products/user-product-7.jpg', title: 'Kojie San Jabón Aclarante Ácido Kójico 135g', source: 'Pinterest HD' },
  { id: 'p8', url: '/products/user-product-8.jpg', title: 'N°1 Effaceur Turmeric Soap Scrub 200g', source: 'Pinterest HD' },
  { id: 'p9', url: '/products/user-product-6.jpg', title: 'Fair & White Gold Satin Exfoliating Soap 200g', source: 'Pinterest HD' },
  { id: 'p10', url: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=800&q=80', title: 'Jabón Artesanal de Karité Puro 200g', source: 'Unsplash Pro' },

  // COSMETICA
  { id: 'p11', url: '/products/user-product-9.jpg', title: 'Instituto Español Urea Loción 500ml', source: 'Pinterest HD' },
  { id: 'p12', url: '/products/user-product-10.jpg', title: 'Instituto Español Champú Pieles Atópicas 300ml', source: 'Pinterest HD' },
  { id: 'p13', url: '/products/user-product-11.jpg', title: 'Makari De Suisse Extreme Loción 500ml', source: 'Pinterest HD' },
  { id: 'p14', url: '/products/user-product-12.jpg', title: 'Caro White Beauty Cream 300ml', source: 'Pinterest HD' },
  { id: 'p15', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', title: 'CeraVe Facial Lotion SPF 30', source: 'Unsplash Pro' },

  // NIÑOS & POMADAS
  { id: 'p16', url: '/products/user-product-13.jpg', title: "Johnson's Baby Bedtime Lotion Lavender 500ml", source: 'Pinterest HD' },
  { id: 'p17', url: '/products/user-product-14.jpg', title: 'Mustela Baby Gentle Cleansing Gel 500ml', source: 'Pinterest HD' },
  { id: 'p18', url: '/products/user-product-15.jpg', title: 'Vicks VapoRub Ointment Relief 100g', source: 'Pinterest HD' },
  { id: 'p19', url: '/products/user-product-16.jpg', title: 'Tiger Balm Red Extra Strength 30g', source: 'Pinterest HD' },

  // MODA & PERFUMES & ACCESORIOS
  { id: 'p20', url: '/products/user-product-17.jpg', title: 'Vestido Satinado Noche Zara Luxe Edition', source: 'Pinterest HD' },
  { id: 'p21', url: '/products/user-product-19.jpg', title: 'Chándal Nike Tech Fleece Conjunto Completo', source: 'Pinterest HD' },
  { id: 'p22', url: '/products/user-product-18.jpg', title: 'Chanel N° 5 Eau de Parfum 100ml', source: 'Pinterest HD' },
  { id: 'p23', url: '/products/user-product-20.jpg', title: 'Dior Sauvage Elixir 60ml', source: 'Pinterest HD' },
  { id: 'p24', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', title: 'Bolso Gucci GG Marmont Matelassé', source: 'Unsplash Pro' },
  { id: 'p25', url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', title: 'Tacones Louboutin Red Sole 120mm', source: 'Unsplash Pro' },
];

interface PinterestImagePickerProps {
  selectedUrl: string;
  onSelectUrl: (url: string) => void;
}

export const PinterestImagePicker: React.FC<PinterestImagePickerProps> = ({ selectedUrl, onSelectUrl }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = HD_PRESET_GALLERY.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pinterest-image-picker" style={{ border: '1px solid var(--color-glass-border)', borderRadius: '16px', padding: '1rem', background: 'var(--color-bg-secondary)', marginTop: '0.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
          <ImageIcon size={18} color="#E05A88" />
          <span>Buscador & Galería Pinterest HD Directa</span>
        </div>
        <span style={{ fontSize: '0.75rem', background: 'rgba(224, 90, 136, 0.12)', color: 'var(--color-primary-dark)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 700 }}>
          {filteredImages.length} Imágenes HD
        </span>
      </div>

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Buscar imagen por producto (ej: Vaseline, Zara, Nike, Jabón)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.55rem 0.8rem 0.55rem 2.2rem',
            borderRadius: '10px',
            border: '1px solid var(--color-glass-border)',
            background: 'white',
            fontSize: '0.85rem'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.6rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '0.2rem' }}>
        {filteredImages.map((img) => {
          const isSelected = selectedUrl === img.url;
          return (
            <div
              key={img.id}
              onClick={() => onSelectUrl(img.url)}
              style={{
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isSelected ? '2px solid #E05A88' : '1px solid var(--color-glass-border)',
                background: 'white',
                boxShadow: isSelected ? '0 0 10px rgba(224, 90, 136, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <img
                src={img.url}
                alt={img.title}
                style={{ width: '100%', height: '80px', objectFit: 'cover' }}
              />
              {isSelected && (
                <div style={{ position: 'absolute', top: '4px', right: '4px', background: '#E05A88', color: 'white', borderRadius: '50%', padding: '2px' }}>
                  <CheckCircle2 size={14} />
                </div>
              )}
              <div style={{ padding: '0.3rem', fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 600, color: '#334155' }} title={img.title}>
                {img.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
