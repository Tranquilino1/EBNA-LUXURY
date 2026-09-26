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
  title = 'Sindy Luxury by EBNA | Alta Costura, Vestidos de Gala y Moda en Guinea Ecuatorial',
  description = 'Boutique exclusiva de alta costura con sede en Mongomo (Barrio Koete) y entregas express a Malabo y Bata. Vestidos de gala, calzado joya y alta cosmética en FCFA con atención VIP por WhatsApp.',
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://ebna-luxury.vercel.app/',
  ogImage = 'https://ebna-luxury.vercel.app/icons/icon-512x512.png',
  product,
  type = 'website'
}) => {
  useEffect(() => {
    // 1. Dynamic Page Title
    const fullTitle = title.includes('EBNA') || title.includes('Sindy Luxury') ? title : `${title} | Sindy Luxury by EBNA`;
    document.title = fullTitle;

    // 2. Helper to set/update meta tags safely
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

    // 3. Standard Meta Tags & Regional Target Keywords for Guinea Ecuatorial
    setMeta('description', description);
    setMeta('keywords', 'Sindy Luxury, EBNA Luxury, vestidos de gala Malabo, comprar vestidos de fiesta en Bata, tienda alta costura Mongomo, Barrio Koete Mongomo, calzado joya Guinea Ecuatorial, perfumes arabes originales Yara Lattafa Malabo, cremas y cosmetica natural Bata, vaseline cocoa radiant Malabo, fajas reductoras colombianas Malabo, boutique moda en FCFA, WhatsApp Sindy Luxury, sindyluxury@gmail.com, XAF, Guinea Ecuatorial');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('geo.region', 'GQ');
    setMeta('geo.placename', 'Mongomo, Malabo, Bata, Guinea Ecuatorial');
    setMeta('geo.position', '1.630333;11.308053');
    setMeta('ICBM', '1.630333, 11.308053');

    // 4. OpenGraph Tags (WhatsApp, Facebook, Instagram)
    const primaryImg = product ? (product.images?.primary || (Array.isArray(product.images) ? product.images[0] : ogImage)) : ogImage;

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', primaryImg, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', product ? 'og:product' : type, true);
    setMeta('og:site_name', 'Sindy Luxury by EBNA', true);
    setMeta('og:locale', 'es_GQ', true);

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
      const isAvailable = (product.inStock || product.in_stock);
      const productSlug = product.slug || product.id;

      // Product Schema with Offers, Returns, Shipping & Breadcrumbs
      const productSchemaGraph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            '@id': `https://ebna-luxury.vercel.app/producto/${productSlug}#product`,
            'name': product.name,
            'image': [primaryImg],
            'description': product.description || `Exclusivo ${product.name} disponible en Sindy Luxury by EBNA con entrega express en Guinea Ecuatorial.`,
            'sku': product.sku || product.id,
            'brand': {
              '@type': 'Brand',
              'name': product.brand || 'Sindy Luxury by EBNA'
            },
            'itemCondition': 'https://schema.org/NewCondition',
            'offers': {
              '@type': 'Offer',
              'url': canonicalUrl,
              'priceCurrency': 'XAF',
              'price': String(priceVal),
              'priceValidUntil': '2026-12-31',
              'itemCondition': 'https://schema.org/NewCondition',
              'availability': isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              'seller': {
                '@type': 'ClothingStore',
                'name': 'Sindy Luxury by EBNA',
                'url': 'https://ebna-luxury.vercel.app/'
              },
              'hasMerchantReturnPolicy': {
                '@type': 'MerchantReturnPolicy',
                'applicableCountry': 'GQ',
                'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
                'merchantReturnDays': 3,
                'returnMethod': 'https://schema.org/ReturnInStore',
                'returnFees': 'https://schema.org/FreeReturn'
              },
              'shippingDetails': {
                '@type': 'OfferShippingDetails',
                'shippingRate': {
                  '@type': 'MonetaryAmount',
                  'value': '3000',
                  'currency': 'XAF'
                },
                'shippingDestination': {
                  '@type': 'DefinedRegion',
                  'addressCountry': 'GQ'
                },
                'deliveryTime': {
                  '@type': 'ShippingDeliveryTime',
                  'handlingTime': {
                    '@type': 'QuantitativeValue',
                    'minValue': 0,
                    'maxValue': 1,
                    'unitCode': 'DAY'
                  },
                  'transitTime': {
                    '@type': 'QuantitativeValue',
                    'minValue': 1,
                    'maxValue': 3,
                    'unitCode': 'DAY'
                  }
                }
              }
            }
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Inicio',
                'item': 'https://ebna-luxury.vercel.app/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Catálogo Exclusivo',
                'item': 'https://ebna-luxury.vercel.app/catalogo'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': product.name,
                'item': canonicalUrl
              }
            ]
          }
        ]
      };
      scriptElement.textContent = JSON.stringify(productSchemaGraph);
    } else {
      // Store Multi-Sede (Mongomo HQ + Malabo Hub) + FAQPage + Breadcrumbs
      const storeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ClothingStore',
            '@id': 'https://ebna-luxury.vercel.app/#store-mongomo',
            'name': 'Sindy Luxury by EBNA — Sede Central Mongomo',
            'alternateName': ['EBNA Luxury Mongomo', 'Sindy Luxury Boutique'],
            'url': 'https://ebna-luxury.vercel.app/',
            'logo': 'https://ebna-luxury.vercel.app/icons/icon-512x512.png',
            'image': 'https://ebna-luxury.vercel.app/icons/icon-512x512.png',
            'description': description,
            'telephone': '+240 555 633 687',
            'email': 'sindyluxury@gmail.com',
            'sameAs': [
              'https://www.tiktok.com/@sindyluxury',
              'https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q'
            ],
            'currenciesAccepted': 'XAF',
            'priceRange': '1.000 FCFA - 65.000 FCFA',
            'paymentAccepted': 'Muni Dinero (+240 555 439 904), Efectivo contra entrega, Transferencia BANGE/CCEI',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Barrio Koete (al otro lado de la Agencia FORAMA)',
              'addressLocality': 'Mongomo',
              'addressRegion': 'Wele-Nzas',
              'addressCountry': 'GQ'
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 1.630333,
              'longitude': 11.308053
            },
            'hasMap': 'https://goo.gl/maps/wn7YCzyVwkFNm1ns7',
            'areaServed': [
              { '@type': 'City', 'name': 'Mongomo' },
              { '@type': 'City', 'name': 'Malabo' },
              { '@type': 'City', 'name': 'Bata' },
              { '@type': 'Country', 'name': 'Guinea Ecuatorial' }
            ]
          },
          {
            '@type': 'ClothingStore',
            '@id': 'https://ebna-luxury.vercel.app/#store-malabo',
            'name': 'Sindy Luxury by EBNA — Hub Logístico Malabo',
            'url': 'https://ebna-luxury.vercel.app/',
            'telephone': '+240 555 633 687',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Malabo',
              'addressRegion': 'Bioko Norte',
              'addressCountry': 'GQ'
            },
            'areaServed': {
              '@type': 'City',
              'name': 'Malabo'
            }
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://ebna-luxury.vercel.app/#faq',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': '¿Cómo funcionan los envíos a Malabo, Bata y Mongomo?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Ofrecemos Envío Exprés garantizado en 24 a 48 horas (o entrega directa en el mismo día en Malabo) por 3.000 FCFA, y Envío Estándar Gratuito en 5 a 7 días a toda Guinea Ecuatorial en embalaje precintado de lujo.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Qué métodos de pago en FCFA se aceptan?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Aceptamos pagos en Francos CFA (XAF) mediante Muni Dinero (+240 555 439 904), efectivo contra entrega en mano tras inspeccionar tu prenda, y transferencias bancarias locales (BANGE / CCEI Bank).'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Los vestidos, perfumes árabes y cosmética son 100% auténticos?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Garantizamos autenticidad total. Las fragancias árabes (Lattafa Yara) cuentan con precinto de importación y código de lote; la cosmética es botánica certificada y los vestidos se confeccionan con telas nobles y pedrería fina.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Cómo se realiza un pedido personalizado o asesoría de tallas por WhatsApp?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Al pulsar Pedir por WhatsApp, el sistema genera automáticamente un Ticket Oficial Digital con desglose en FCFA y folio único. Nuestro equipo VIP (+240 555 633 687) te asiste al instante con confirmación de medidas y entrega.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Cuál es la política de cambios de talla?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Dispones de 48 a 72 horas desde la recepción para solicitar cambio de talla manteniendo las etiquetas de lujo. Nuestro mensajero coordina la sustitución directa en Malabo y Bata.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Dónde está ubicada la sede física oficial de la tienda?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Nuestra boutique física oficial se encuentra en Mongomo, en Barrio Koete (frente a la Agencia FORAMA, GPS: 01°37′49.2″N, 11°18′28.99″E) con atención presencial y despacho a todo el país.'
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
