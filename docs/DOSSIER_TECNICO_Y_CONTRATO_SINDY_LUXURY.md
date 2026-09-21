# DOSSIER DE DOCUMENTACIÓN TÉCNICA Y CONTRATO COMERCIAL CONFIDENCIAL
## PLATAFORMA E-COMMERCE DE ALTA GAMA: EBNA LUXURY
### CLIENTE OFICIAL: SINDY LUXURY

---

## 1. RESUMEN EJECUTIVO Y ARQUITECTURA DEL SISTEMA

El presente documento constituye la entrega oficial y técnica del sistema **EBNA Luxury**, desarrollado exclusivamente para la marca **SINDY LUXURY**.

### Stack Tecnológico de Última Generación
- **Frontend Framework**: React 19 + TypeScript 5
- **Build Engine & Bundler**: Vite 8 con motor de minificación ultra-rápido y optimización de chunks vendor.
- **Backend & Base de Datos**: Supabase Cloud PostgreSQL + Supabase Realtime WebSockets para presencia e inventario.
- **Modo PWA (Progressive Web App)**: Integración con Workbox Service Worker (`sw.js`) con estrategia `CacheFirst` para carga hiper-rápida (<1.5s).
- **Alojamiento & CDN**: Vercel Edge Network con despliegue de alta disponibilidad en servidor dedicado de producción.
- **Infraestructura de Almacenamiento**: Procesamiento de 142 imágenes de alta resolución en `/public/products/`.

---

## 2. CREDENCIALES DE ACCESO E INFORMACIÓN RELEVANTE

> [!IMPORTANT]
> **CREDENCIALES CONFIDENCIALES DEL SISTEMA:**
> - **URL de Producción Oficial**: [https://ebna-luxury.vercel.app](https://ebna-luxury.vercel.app)
> - **Usuario Administrador por Defecto**: `admin@ebna.gq`
> - **Canal de WhatsApp Oficial**: [https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q](https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q)
> - **Teléfono de Pedidos Directos**: `+240 222 633 687`

---

## 3. INFOGRAFÍAS, GRÁFICAS Y ANÁLISIS DE RENDIMIENTO

### Distribución de Inventario por Categorías (142 Productos Activos)
```
+------------------+-----------------------+------------------------+
| Categoría        | N° de Productos       | Rango de Precio (FCFA) |
+------------------+-----------------------+------------------------+
| VESTIDOS         | 34                    | 20,000 FCFA            |
| CALZADO          | 26                    | 25,000 FCFA            |
| PERFUMES         | 18                    | 25,000 FCFA            |
| MODA             | 22                    | 15,000 FCFA            |
| COSMETICA        | 12                    | 12,000 FCFA            |
| JABONES          | 8                     | 3,000 FCFA             |
| VASELINAS        | 6                     | 5,000 FCFA             |
| POMADAS          | 8                     | 10,000 FCFA            |
| ACCESORIOS       | 5                     | 10,000 FCFA            |
| NIÑOS            | 3                     | 10,000 FCFA            |
+------------------+-----------------------+------------------------+
| TOTAL            | 142 Productos         | Catálogo 100% Real     |
+------------------+-----------------------+------------------------+
```

### Métricas Principales de Rendimiento PWA
- **Velocidad de Carga Inicial**: ~1.1s (Ultra-rápida)
- **Modo Offline**: Soportado vía Service Worker PWA
- **Presencia en Tiempo Real**: WebSocket activo para registro de clientes conectados en vivo.

---

## 4. PUBLICIDAD, CÓDIGO QR Y ASSET DE DIFUSIÓN SOCIAL

### Código QR Oficial de Acceso Directo
Escanee el siguiente código QR o abra la imagen adjunta para acceder directamente a la boutique desde cualquier dispositivo móvil:

```
┌─────────────────────────┐
│  █████████████████████  │
│  ██ ▄▄▄▄▄ ██ ▄ █ ▄▄▄▄▄██  │
│  ██ █   █ ██████ █   ███  │
│  ██ █▄▄▄█ ██  ██ █▄▄▄███  │
│  ██▄▄▄▄▄▄▄█▄▀▄█▄▄▄▄▄▄▄██  │
│  ██ ▄ ▄ ▄▄  ▄▀▄ ▄▄▀  ███  │
│  ██▄█▄█▄██  ██ ▄ ▄█▄▄███  │
│  ██ ▄▄▄▄▄ ██▀  ▀ ▄  ▄ ██  │
│  ██ █   █ ██ █▀▄   █████  │
│  ██ █▄▄▄█ ████▀▄▄ ▄ ▄ ██  │
│  █████████████████████  │
└─────────────────────────┘
   https://ebna-luxury.vercel.app
```

### Material Gráfico Incluido en el Entregable
1. **Póster de Gala Promocional**: Imagen de alta definición lista para impresión y campañas publicitarias.
2. **Tarjeta de Publicidad para Redes Sociales**: Formato optimizado para Estados de WhatsApp, Instagram Stories y Facebook Ads.

---

## 5. CONTRATO COMERCIAL CONFIDENCIAL Y ACUERDO DE ENTREGA

> [!IMPORTANT]
> **ACUERDO COMERCIAL CONFIDENCIAL**
> - **Nombre de la Cliente**: SINDY LUXURY
> - **Agencia Encargada del Proyecto**: AIDA (Desarrollo Web & UI Senior)
> - **Objeto del Contrato**: Desarrollo, optimización, categorización de 142 productos, integración de base de datos persistente Supabase Realtime, PWA, carrito de compras con WhatsApp, panel de administración con gestión de stock/visibilidad y despliegue continuo en Vercel.
> - **PRECIO FINAL ACORDADO DEL PROYECTO**: **50,000 FCFA** (Cincuenta Mil Francos CFA).
> - **Plazo de Entrega**: Inmediato (Proyecto 100% finalizado y operativo en producción).
> - **Confidencialidad**: Los datos, código fuente y estructura administrativa de la boutique son de propiedad exclusiva de **SINDY LUXURY**.

---

## 6. PROPUESTA Y SUGERENCIA DE AGENTE DE MANTENIMIENTO TÉCNICO

Se sugiere a la cliente **SINDY LUXURY** la contratación de un **Agente Técnico de Mantenimiento Web Dedicado**, acordando una **cuota mensual negociada entre las partes**, con los siguientes servicios incluidos:

1. **Gestión e Inserción Mensual de Nuevos Productos**: Subida de fotos, etiquetado y precios.
2. **Respaldo de Base de Datos Supabase**: Copias de seguridad periódicas del inventario.
3. **Mantenimiento y Soporte Continuo**: Asistencia técnica prioritaria 24/7 en caso de cambios o incidencias.
4. **Optimización de Velocidad y SEO**: Auditorías continuas para mantener la máxima velocidad de carga.

---

*Documento expedido y certificado para la marca EBNA LUXURY / SINDY LUXURY.*
