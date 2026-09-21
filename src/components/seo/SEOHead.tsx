import React, { useEffect } from 'react';
import type { Product } from '../../types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  product?: Product;
  type?: 'website' | 'product' | 'article';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'EBNA Moda y Cosmética — Tienda de Lujo en Guinea Ecuatorial',
  description = 'Descubre la boutique de lujo EBNA en Guinea Ecuatorial (Malabo y Bata). Moda internacional Zara, perfumes exclusivos, vaselinas y cosmética de tratamiento.',
  canonicalUrl = window.location.href,
  ogImage = 'https://ebna-luxury.vercel.app/icons/icon-512x512.png',
  product,
  type = 'website'
}) => {
  useEffect(() => {
    // 1. Dynamic Page Title
    const fullTitle = title.includes('EBNA') ? title : `${title} | EBNA Luxury`;
    document.title = fullTitle;

    // 2. Helper to set/update meta tag
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attributeName}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Standard Meta Tags
    setMeta('description', description);
    setMeta('keywords', 'EBNA, SYNDY LUXURY, moda, cosmética, perfumería, Guinea Ecuatorial, Malabo, Bata, FCFA');
    setMeta('robots', 'index, follow');

    // 4. OpenGraph Tags
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', product ? 'og:product' : type, true);

    // 5. Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // 6. Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // 7. Schema.org JSON-LD Structured Data Injection
    const schemaId = 'ebna-schema-jsonld';
    let scriptElement = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = schemaId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    if (product) {
      // Product Schema.org
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': product.images && product.images.length > 0 ? product.images : [ogImage],
        'description': product.description,
        'sku': product.id,
        'offers': {
          '@type': 'Offer',
          'url': canonicalUrl,
          'priceCurrency': 'XAF',
          'price': product.price,
          'availability': product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'Organization',
            'name': 'EBNA Luxury'
          }
        }
      };
      scriptElement.textContent = JSON.stringify(productSchema);
    } else {
      // Store Schema.org
      const storeSchema = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        'name': 'EBNA Moda y Cosmética — SYNDY LUXURY',
        'url': 'https://ebna-luxury.vercel.app/',
        'logo': 'https://ebna-luxury.vercel.app/icons/icon-512x512.png',
        'description': description,
        'telephone': '+240 222 633 687',
        'currenciesAccepted': 'XAF',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'GQ',
          'addressLocality': 'Malabo'
        }
      };
      scriptElement.textContent = JSON.stringify(storeSchema);
    }
  }, [title, description, canonicalUrl, ogImage, product, type]);

  return null;
};
