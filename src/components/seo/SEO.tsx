import React, { useEffect } from 'react';
import type { Product } from '../../types';

interface SEOProps {
  title?: string;
  description?: string;
  product?: Product | null;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  product,
  image = 'https://ebna-luxury.vercel.app/icons/icon-512x512.png',
  url = 'https://ebna-luxury.vercel.app/',
}) => {
  useEffect(() => {
    const defaultTitle = 'EBNA Moda y Cosmética — Tienda de Lujo y Belleza';
    const siteTitle = title ? `${title} | EBNA Luxury` : defaultTitle;
    document.title = siteTitle;

    const metaDescription = description || (
      product
        ? `${product.name} en EBNA Luxury. Categoría ${product.category}. Precio ${product.price.toLocaleString('es-ES')} FCFA. Envíos en Guinea Ecuatorial.`
        : 'EBNA Moda y Cosmética: Tu destino exclusivo en Guinea Ecuatorial para moda Zara, Nike, Adidas, perfumes de lujo, vaselinas, jabones artesanales y cosmética.'
    );

    // Update meta description tag
    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', metaDescription);
    }

    // Update OpenGraph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', siteTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);

    const ogImg = document.querySelector('meta[property="og:image"]');
    const primaryImg = product ? (product.images?.primary || (Array.isArray(product.images) ? product.images[0] : image)) : image;
    if (ogImg && primaryImg) {
      ogImg.setAttribute('content', primaryImg);
    }

    // Dynamic Product JSON-LD schema insertion
    let scriptTag = document.getElementById('jsonld-product-schema') as HTMLScriptElement | null;
    if (product) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'jsonld-product-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      const priceVal = product.priceFCFA || product.price || 0;
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: [primaryImg],
        description: product.description,
        sku: product.sku || product.id,
        brand: {
          '@type': 'Brand',
          name: product.brand || 'EBNA Luxury'
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'XAF',
          price: priceVal,
          availability: (product.inStock || product.in_stock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'EBNA Luxury',
          },
        },
      };

      scriptTag.textContent = JSON.stringify(productSchema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, product, image, url]);

  return null;
};
