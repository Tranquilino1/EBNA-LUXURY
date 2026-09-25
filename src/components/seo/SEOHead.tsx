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
  title = 'EBNA Luxury | Moda y Cosmética de Lujo en Guinea Ecuatorial',
  description = 'Descubre la boutique de lujo EBNA en Guinea Ecuatorial (Malabo y Bata). Moda internacional, perfumería exclusiva, calzado, vaselinas y cosmética en FCFA.',
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

    // 3. Standard Meta Tags & Regional Target Keywords
    setMeta('description', description);
    setMeta('keywords', 'Sindy Luxury, EBNA Luxury, comprar ropa de fiesta en malabo, tienda de ropa online guinea ecuatorial, vestidos de noche en malabo, perfumes arabes originales malabo, yara lattafa guinea ecuatorial, cremas y cosmetica bata, comprar vaseline cocoa radiant malabo, fajas reductoras malabo, calzado de gala guinea ecuatorial, ropa bebe bata, envios express malabo bata, FCFA, XAF');
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('geo.region', 'GQ');
    setMeta('geo.placename', 'Malabo, Guinea Ecuatorial');
    setMeta('geo.position', '3.7504;8.7371');
    setMeta('ICBM', '3.7504, 8.7371');

    // 4. OpenGraph Tags
    const primaryImg = product ? (product.images?.primary || (Array.isArray(product.images) ? product.images[0] : ogImage)) : ogImage;

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', primaryImg, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', product ? 'og:product' : type, true);
    setMeta('og:site_name', 'EBNA Luxury', true);

    // 5. Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', primaryImg);

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
      const priceVal = product.priceFCFA || product.price || 0;
      // Product Schema.org
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': [primaryImg],
        'description': product.description,
        'sku': product.sku || product.id,
        'brand': {
          '@type': 'Brand',
          'name': product.brand || 'EBNA Luxury'
        },
        'offers': {
          '@type': 'Offer',
          'url': canonicalUrl,
          'priceCurrency': 'XAF',
          'price': priceVal,
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': (product.inStock || product.in_stock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'Organization',
            'name': 'EBNA Luxury'
          }
        }
      };
      scriptElement.textContent = JSON.stringify(productSchema);
    } else {
      // Combined Graph: Store + LocalBusiness + FAQPage Schema.org
      const storeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Store',
            '@id': 'https://ebna-luxury.vercel.app/#store',
            'name': 'EBNA Luxury — Alta Costura, Cosmética & Perfumería',
            'alternateName': ['Sindy Luxury by EBNA', 'EBNA Luxury Guinea Ecuatorial'],
            'url': 'https://ebna-luxury.vercel.app/',
            'logo': 'https://ebna-luxury.vercel.app/icons/ebna-logo.png',
            'image': 'https://ebna-luxury.vercel.app/icons/ebna-app-icon.jpg',
            'description': description,
            'telephone': '+240 222 633 687',
            'currenciesAccepted': 'XAF',
            'priceRange': '1.000 FCFA - 65.000 FCFA',
            'paymentAccepted': 'Muni Dinero (+240 555 439 904), Efectivo contra entrega, WhatsApp',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Malabo II / Avenida de la Paz',
              'addressLocality': 'Malabo',
              'addressRegion': 'Bioko Norte',
              'addressCountry': 'GQ'
            },
            'areaServed': [
              { '@type': 'City', 'name': 'Malabo' },
              { '@type': 'City', 'name': 'Bata' },
              { '@type': 'Country', 'name': 'Guinea Ecuatorial' }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://ebna-luxury.vercel.app/#faq',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': '¿Dónde comprar ropa de fiesta, cosmética y perfumes árabes en Guinea Ecuatorial?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'En EBNA Luxury a través de https://ebna-luxury.vercel.app o por WhatsApp oficial (+240 222 633 687) con entrega a domicilio en Malabo y Bata.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Cuáles son los tiempos y costos de envío en EBNA Luxury?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Ofrecemos Envío Estándar Gratuito en 5 a 7 días y Envío Exprés garantizado en máximo 3 días por 3.000 FCFA.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Cómo se genera el ticket oficial de compra y el pedido por WhatsApp?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Al seleccionar tus prendas o productos y pulsar Pagar por WhatsApp, el sistema genera automáticamente un Ticket Oficial digital con folio único y desglose detallado en FCFA.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Los cosméticos y perfumes árabes son 100% originales?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Sí, el 100% de nuestros artículos cosméticos (Vaseline, Dove, Wokali) y fragancias árabes (Lattafa Yara) son auténticos e importados con sello de garantía.'
                }
              }
            ]
          }
        ]
      };
      scriptElement.textContent = JSON.stringify(storeSchema);
    }
  }, [title, description, canonicalUrl, ogImage, product, type]);

  return null;
};
