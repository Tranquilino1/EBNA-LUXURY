<div align="center">

  # 💎 EBNA LUXURY
  ### Plataforma E-Commerce de Alta Gama • Boutique Oficial
  
  [![Live Demo](https://img.shields.io/badge/Production-Live%20Demo-E05A88?style=for-the-badge&logo=vercel)](https://ebna-luxury.vercel.app)
  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
  [![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

  **[Ver Sitio en Vivo](https://ebna-luxury.vercel.app)** • **[Canal Oficial WhatsApp](https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q)**

</div>

---

## 🌟 Resumen del Proyecto

**EBNA Luxury** es una plataforma e-commerce de ultra-lujo desarrollada exclusivamente para la marca **SINDY LUXURY** por la agencia **AIDA**. 

Diseñada bajo estándares internacionales de ingeniería frontend y arquitectura de alto rendimiento, la aplicación ofrece una experiencia de compra fluida, elegante y dinámica con catálogo completo de 142 productos reales, carrito de compras consolidado a WhatsApp, seguimiento de usuarios conectados en tiempo real mediante WebSockets, panel de administración con control de inventario y optimización PWA para carga instantánea.

---

## 🚀 Características Principales

- 👗 **Catálogo Real de 142 Productos Organizados en 10 Categorías**:
  - *Vestidos & Robes, Calzado & Sneakers, Perfumes & Fragancias, Moda (Zara/Shein), Cosmética & Cremas, Jabones Artesanales, Vaselinas & Lip Care, Pomadas & Scrubs, Accesorios & Bonnets, Niños & Bebés*.
- ⚡ **Velocidad Carga Hiper-Rápida (<1.1s)**:
  - Configuración PWA con Workbox Service Worker, caché *CacheFirst* de activos e imágenes optimizadas en WebP/JFIF.
- 🟢 **Contador de Presencia en Tiempo Real**:
  - Conexión WebSocket mediante Supabase Realtime Channels (`online-traffic`) que muestra la cantidad de clientes activos simultáneamente.
- ⏰ **Rotador Dinámico Hero Cada 30 Minutos**:
  - El banner principal de la página de inicio rota automáticamente cada 30 minutos ilustrando los productos agregados más recientemente.
- 🛍️ **Carrito de Compras Múltiple por WhatsApp**:
  - Drawer lateral interactivo con cálculo preciso de subtotales en Francos CFA (FCFA), gestión de cantidades, selección de colores/tallas y checkout consolidado por WhatsApp.
- 🔐 **Panel de Administración Completo (CRUD)**:
  - Autenticación protegida, alternancia de visibilidad (`OCULTO` / `PÚBLICO`), actualización de estado de stock (`EN STOCK` / `AGOTADO`), eliminación permanente y alerta de cambios no guardados (*Guardar y Salir*).
- ✨ **Motor de Partículas 3D Interactivo**:
  - Lienzo HTML5 Canvas 3D acelerado por GPU que reacciona con destellos de color según las interacciones del usuario (Púrpura/Rosa en navegación, Verde Esmeralda al añadir al carrito, Rojo Rubí en alertas).
- 🎯 **SEO Avanzado & Datos Estructurados JSON-LD**:
  - Inserción de metadatos `Schema.org/Product` y etiquetas OpenGraph optimizadas para compartir en redes sociales.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **React 19** | Biblioteca de interfaz de usuario de última generación. |
| **TypeScript 5** | Tipado estático estricto para máxima fiabilidad. |
| **Vite 8** | Entorno de desarrollo y empaquetado ultra-rápido. |
| **Supabase Cloud** | Base de datos PostgreSQL y motor de presencia WebSockets. |
| **Workbox PWA** | Caching progresivo e instalación PWA sin conexión. |
| **Lucide Icons** | Iconografía limpia y estilizada de alta definición. |
| **Vercel Edge** | Infraestructura de despliegue global CDN. |

---

## 📁 Estructura del Repositorio

```
EBNA-LUXURY/
├── IMG PRODUCTOS/          # Imágenes originales fuente del catálogo (142 ítems)
├── docs/                   # Documentación técnica y especificaciones del contrato
├── public/                 # Archivos estáticos, manifest PWA, catálogo optimizado
│   ├── icons/              # Logos e iconos vectoriales de la marca
│   ├── products/           # 142 imágenes de producto optimizadas
│   └── sw.js               # Service Worker PWA generado por Workbox
├── scripts/                # Scripts Node.js de procesamiento de catálogo e imágenes
│   └── process_all_img_productos.js
├── src/
│   ├── components/         # Componentes React modularizados
│   │   ├── admin/          # Formulario de producto, modal de salida, roles
│   │   ├── cart/           # Drawer de carrito de compras y botones de interacción
│   │   ├── catalog/        # Tarjetas de productos, filtros de categoría y WhatsApp
│   │   ├── effects/        # Fondo de partículas 3D interactivo
│   │   ├── layout/         # Navbar, Footer y Layout principal
│   │   ├── seo/            # Componente de metadatos y esquemas JSON-LD
│   │   └── ui/             # Modal reutilizable, cargadores de pantalla y alertas
│   ├── contexts/           # Proveedores AuthContext, CartContext y TrafficContext
│   ├── hooks/              # Custom hooks (useProducts, useAdminProducts)
│   ├── lib/                # Configuración Supabase, catálogo in-memory y utils
│   ├── pages/              # Páginas de la aplicación (Home, Catalog, Product, Admin)
│   ├── types/              # Definición de interfaces TypeScript
│   ├── App.tsx             # Enrutamiento principal con React Router v7
│   └── main.tsx            # Punto de entrada de la aplicación
├── .env.example            # Plantilla de variables de entorno
├── index.html              # HTML5 inicial con precarga de fuentes y metadatos
├── package.json            # Dependencias del proyecto y scripts
├── tsconfig.json           # Configuración de compilación TypeScript
├── vercel.json             # Reglas de reescritura SPA para Vercel
└── vite.config.ts          # Configuración de Vite y plugin VitePWA
```

---

## 💻 Instalación y Configuración Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Tranquilino1/EBNA-LUXURY.git
cd EBNA-LUXURY
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto copiando la plantilla `.env.example`:
```bash
cp .env.example .env
```

Ingresa tus credenciales de Supabase:
```env
VITE_SUPABASE_URL=https://epifjpbwbnphlhhfhigm.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 4. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
Accede a `http://localhost:5173` en tu navegador.

---

## 🛠️ Compilación y Producción

Para generar el paquete optimizado de producción:
```bash
npm run build
```

Para previsualizar el bundle de producción localmente:
```bash
npm run preview
```

---

## 🔐 Credenciales del Sistema

- **Sitio de Producción en Vivo**: [https://ebna-luxury.vercel.app](https://ebna-luxury.vercel.app)
- **Usuario Administrador**: `admin@ebna.gq`
- **Canal de WhatsApp Oficial**: [Canal EBNA Luxury](https://whatsapp.com/channel/0029VbCGaZxGpLHLcSBIdi2Q)

---

## 📄 Créditos y Licencia

- **Cliente Oficial**: **SINDY LUXURY**
- **Desarrollado Por**: **Agencia AIDA** (*Desarrollo Web & UI Senior*)
- **Licencia**: Todos los derechos reservados © 2026 **EBNA Luxury / SINDY LUXURY**.
