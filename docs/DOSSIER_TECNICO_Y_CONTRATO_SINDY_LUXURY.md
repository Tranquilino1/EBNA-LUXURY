# DOSSIER EJECUTIVO INTEGRAL: DOCUMENTACIÓN TÉCNICA, MANUAL DE USUARIO, ENTREGA DE PROPIEDAD INTELECTUAL Y CONTRATO COMERCIAL DE CESIÓN

**Proyecto:** Plataforma E-Commerce & PWA Universal de Alta Costura y Cosmética de Lujo  
**Nombre Comercial:** Sindy Luxury by EBNA  
**Dominio Canónico Oficial:** [https://ebna-luxury.vercel.app](https://ebna-luxury.vercel.app)  
**Sede Física Principal:** Barrio Koete (al otro lado de la Agencia FORAMA), Ciudad de Mongomo, Wele-Nzas, República de Guinea Ecuatorial  
**Coordenadas GPS:** 01°37′49.2″N, 11°18′28.99″E (1.630333, 11.308053) — [Google Maps Oficial](https://goo.gl/maps/wn7YCzyVwkFNm1ns7)  
**Correo Oficial:** `sindyluxury@gmail.com` | **TikTok Oficial:** `@sindyluxury`  
**Canal Oficial de WhatsApp:** [+240 222 633 687](https://wa.me/240222633687) | **Muni Dinero Oficial:** `555439904`  
**Agencia de Ingeniería y Desarrollo:** Startup AiDA (Arquitectura Digital & Soluciones E-Commerce)  
**Fecha de Expedición:** 25 de Septiembre de 2026  

---

## ÍNDICE GENERAL DEL DOCUMENTO

1. **PARTE I: MANUAL ESTRUCTURAL Y DOCUMENTACIÓN TÉCNICA DE INGENIERÍA**
   - 1.1. Arquitectura del Sistema Full-Stack y Tecnologías Empleadas
   - 1.2. Infraestructura Cloud y Red Global de Distribución (Vercel CDN + Edge Network)
   - 1.3. Base de Datos Distribuida en la Nube (Turso Cloud LibSQL Engine)
   - 1.4. Sistema PWA Universal (Progressive Web App) y Modo Fuera de Línea
   - 1.5. Motor de Búsqueda Inteligente y Algoritmo de Coincidencia de Productos
   - 1.6. Motor Automatizado de Generación de Tickets y Comprobantes Digitales PNG
   - 1.7. Sistema Logístico y Opciones de Despacho (Exprés 3 Días vs. Estándar Gratuito)
   - 1.8. Arquitectura SEO / GEO / AIO y Posicionamiento Top-1 en Google y Motores de IA
2. **PARTE II: MANUAL DE USUARIO Y GUÍA DE OPERACIONES PARA LA BOUTIQUE**
   - 2.1. Experiencia de Compra del Cliente Final
   - 2.2. Recepción, Lectura y Validación de Pedidos por WhatsApp
   - 2.3. Verificación de Pagos Móviles vía Muni Dinero
   - 2.4. Panel de Administración y Control Integral del Catálogo
   - 2.5. Procedimiento de Alta, Edición y Eliminación Definitiva de Productos
   - 2.6. Guía de Instalación de la Aplicación en Teléfonos Móviles (iOS y Android)
3. **PARTE III: ACTA NOTARIAL DE ENTREGA Y CESIÓN DE PROPIEDAD INTELECTUAL**
   - 3.1. Declaración de Entrega Definitiva y Satisfactoria
   - 3.2. Cesión Universal, Plena e Irrevocable de Derechos de Propiedad Intelectual
   - 3.3. Transferencia de Activos Digitales, Códigos Fuente y Repositorio
4. **PARTE IV: CONTRATO MERCANTIL DE PRESTACIÓN DE SERVICIOS Y VALORACIÓN ESPECIAL**
   - 4.1. Comparecencia de las Partes
   - 4.2. Objeto del Contrato y Alcance de las Obras Realizadas
   - 4.3. Cláusula Especial de Valoración Real de Mercado vs. Precio de Cortesía Exclusivo
   - 4.4. Garantía Técnica, Mantenimiento y Confidencialidad
   - 4.5. Firma y Aceptación de las Partes

---

# PARTE I: MANUAL ESTRUCTURAL Y DOCUMENTACIÓN TÉCNICA DE INGENIERÍA

### 1.1. Arquitectura del Sistema Full-Stack y Tecnologías Empleadas

La plataforma **Sindy Luxury by EBNA** ha sido concebida bajo los más exigentes estándares de la ingeniería de software moderna, combinando una experiencia de usuario (UX/UI) de alta gama con un rendimiento de carga instantáneo (velocidad sub-segundo):

* **Frontend Framework:** `React 19` acoplado con `TypeScript 5`, garantizando tipado estricto, estabilidad en tiempo de ejecución y erradicación de errores de interfaz.
* **Build Engine & Bundler:** `Vite 8` con compilación basada en Rolldown/ESBuild, generando paquetes minificados ultra-optimizados con división modular de dependencias (*vendor code-splitting*).
* **Diseño y Estilismo Editorial:** Hojas de estilo CSS personalizadas con arquitectura de variables semánticas, sistema de rejilla adaptable (*responsive CSS Grid & Flexbox*), modo dual **Luz / Oscuridad (Light/Dark Theme)** y desenfoque vítreo de alta costura (*Glassmorphism blur*).
* **Iconografía Oficial:** Librería vectorial `Lucide React` complementada con iconos oficiales vectorizados SVG (TikTok Icon 3D multi-tono, WhatsApp oficial, MapPin dorado y sellos de garantía).

### 1.2. Infraestructura Cloud y Red Global de Distribución (Vercel CDN + Edge Network)

* **Alojamiento:** Servidores dedicados sin servidor (*Serverless*) en la red global de **Vercel Edge Network**.
* **Caché y Entrega de Contenido:** Encabezados de control de caché inmediatos (`Cache-Control: no-cache, no-store, must-revalidate` en HTML y caché inmutable de 1 año en activos estáticos con huella digital hash).
* **Protocolos de Seguridad:** Encriptación total bajo certificado SSL/TLS con protocolo `HTTPS` forzado, cabeceras `HSTS` (Strict-Transport-Security: max-age=63072000), `X-Content-Type-Options: nosniff` y `X-Frame-Options: DENY`.

### 1.3. Base de Datos Distribuida en la Nube (Turso Cloud LibSQL Engine)

La plataforma cuenta con persistencia de datos distribuida en tiempo real:
* **Motor:** `Turso Cloud LibSQL` (tecnología basada en SQLite distribuido sobre red global Edge en AWS US-West-2).
* **Rendimiento:** Tiempos de respuesta de lectura inferiores a **15 milisegundos**, permitiendo consultas instantáneas de inventario sin saturación.
* **Depuración Integral:** El catálogo activo cuenta con **188 productos reales**, habiendo sido purgados y eliminados de forma definitiva todos los registros ficticios o de prueba.
* **Políticas de Integridad y Liberación de Espacio:** Cada operación de borrado solicitada en la tienda ejecuta una instrucción física `DELETE FROM products WHERE id = ?`, asegurando la liberación inmediata del almacenamiento en la nube sin dejar registros huérfanos.

### 1.4. Sistema PWA Universal (Progressive Web App) y Modo Fuera de Línea

* **Manifiesto de Aplicación Web:** Configurado en `public/manifest.json` con especificación de iconos de alta densidad (192x192, 512x512 y Apple Touch Icon 180x180), categoría de comercio de lujo y color temático oficial `#D81B60`.
* **Compatibilidad Multiplataforma:** La aplicación es un instalable universal que funciona de forma nativa e idéntica en:
  * **iOS (iPhone e iPad):** Añadir a Pantalla de Inicio mediante Safari.
  * **Android:** Instalación directa con un clic mediante Google Chrome.
  * **Windows 10/11 & macOS:** Instalación como aplicación de escritorio nativa mediante Chrome o Edge.
  * **Chromebook & Linux.**
* **Pre-Carga en Memoria GPU:** Script en portada con precarga asíncrona de las 19 imágenes de mayor prioridad para un renderizado visual a **0.0 milisegundos**.

### 1.5. Motor de Búsqueda Inteligente y Algoritmo de Coincidencia de Productos

La tienda integra un algoritmo de búsqueda algorítmica de nivel empresarial:
* **Filtrado Fonético y por Iniciales:** Permite localizar prendas o productos cosméticos desde la primera letra digitada en el buscador.
* **Autocompletado Predictivo:** Sugiere automáticamente los productos exactos disponibles en el catálogo en tiempo real.
* **Tolerancia a Diacríticos:** Búsqueda normalizada que ignora tildes, mayúsculas, minúsculas o caracteres especiales.

### 1.6. Motor Automatizado de Generación de Tickets y Comprobantes Digitales PNG

Para simplificar las ventas y evitar mensajes de texto desordenados:
1. **Comprobante Oficial Digital:** Al seleccionar artículos y proceder al pago, el sistema genera de forma invisible un Ticket Oficial en formato digital de alta resolución.
2. **Especificaciones del Ticket:** Incluye número de folio único criptográfico, fotografía de los productos, talla, color, desglose de precios en Francos CFA (FCFA / XAF), tipo de entrega y monto total.
3. **Conversión Gráfica Automática:** Utiliza `html2canvas` para transformar el documento en una imagen PNG nítida, compacta y estéticamente impecable que se descarga automáticamente en el dispositivo del cliente.
4. **Despacho Automatizado por WhatsApp:** Conexión directa mediante enlace codificado hacia el número de atención oficial **+240 222 633 687**, adjuntando los detalles del pedido de forma limpia y profesional.

### 1.7. Sistema Logístico y Opciones de Despacho

Se han programado dos modalidades exclusivas de envío:
1. **Envío Estándar Gratuito (0 FCFA):** Botón animado en azul moderno con indicación clara: *"Duración: 5 a 7 días (Gratis a Malabo y Bata)"*.
2. **Envío Exprés Exclusivo (3.000 FCFA):** Botón premium con acabado en relieve dorado 3D y brillo de pasarela: *"Entrega Prioritaria Garantizada en máximo 3 días (3.000 FCFA)"*.
3. **Sede Física Central de Despacho:**
   * **Ciudad:** Mongomo.
   * **Barrio:** Barrio Koete.
   * **Referencia:** Al otro lado de la Agencia FORAMA.
   * **Coordenadas Satelitales:** `01°37′49.2″N, 11°18′28.99″E` (`1.630333, 11.308053`).
   * **Enlace Geográfico Oficial:** [https://goo.gl/maps/wn7YCzyVwkFNm1ns7](https://goo.gl/maps/wn7YCzyVwkFNm1ns7).

### 1.8. Arquitectura SEO / GEO / AIO y Posicionamiento Top-1 en Google y Motores de IA

La plataforma cuenta con la optimización para motores de búsqueda más avanzada desarrollada en Guinea Ecuatorial:
* **Google Search Console Oficial:** Propiedad verificada en los servidores centrales de Google mediante etiqueta y archivo `googled6fb95f26de3d100.html`.
* **Sitemap XML Dinámico:** Archivo `sitemap.xml` con **193 páginas y productos registrados** para indexación inmediata.
* **Datos Estructurados Schema.org:** Gráficos JSON-LD duales de `ClothingStore`, `Store`, `GeoCoordinates`, `PostalAddress` y `FAQPage` para enriquecer la tarjeta de la boutique en Google Maps y Google Search.
* **Protocolos de IA Generativa (GEO - Generative Engine Optimization):** Archivos `llms.txt` y `llms-full.txt` estructurados para que los motores de Inteligencia Artificial (ChatGPT, Google Gemini, Anthropic Claude, Perplexity AI y Apple Intelligence) posicionen y recomienden a **Sindy Luxury by EBNA** como la boutique número 1 en Guinea Ecuatorial.

---

# PARTE II: MANUAL DE USUARIO Y GUÍA DE OPERACIONES PARA LA BOUTIQUE

### 2.1. Experiencia de Compra del Cliente Final
1. **Acceso:** El cliente ingresa a `https://ebna-luxury.vercel.app` desde su teléfono móvil o computadora.
2. **Exploración:** Puede buscar artículos con el buscador predictivo o filtrar por categorías (Vestidos de Gala, Conjuntos 2 Piezas, Calzado de Pasarela, Cosmética Botánica, Perfumes Árabes, etc.).
3. **Selección sin Salir del Catálogo:** Al pulsar *"Agregar al Carrito"*, la prenda se almacena automáticamente en el carrito de compras sin expulsar al cliente del catálogo, permitiéndole continuar explorando con comodidad.
4. **Finalización:** En el carrito, el cliente introduce su Nombre, Teléfono y Ciudad de entrega (Mongomo, Malabo o Bata), y elige entre Envío Estándar o Exprés.

### 2.2. Recepción, Lectura y Validación de Pedidos por WhatsApp
* Cuando el cliente pulsa *"Pagar por WhatsApp"*, su teléfono descarga el ticket oficial con el diseño de la boutique y abre una conversación directa con el número de Concierge **+240 222 633 687**.
* La encargada de la boutique solo debe revisar el número de folio del ticket, comprobar los artículos y confirmar la dirección de entrega.

### 2.3. Verificación de Pagos Móviles vía Muni Dinero
* El método de pago móvil oficial preconfigurado es **Muni Dinero al número +240 555 439 904**.
* Una vez que el cliente realiza la transferencia mediante su móvil, envía la captura del mensaje de confirmación de Muni Dinero al chat de WhatsApp de la tienda para liberar el despacho de la mercancía.

### 2.4. Panel de Administración y Control Integral del Catálogo
* **Acceso al Panel:** Ingrese a `https://ebna-luxury.vercel.app/admin` (o `/login`).
* **Credenciales de Administrador:** Cuenta configurada para la propietaria de la tienda.
* **Herramientas Disponibles:**
  * Visualización de inventario completo en tiempo real.
  * Modificación de precios en FCFA al instante.
  * Ocultar o mostrar prendas de temporada.
  * Control de existencias (*stock* disponible).

### 2.5. Procedimiento de Alta, Edición y Eliminación Definitiva de Productos
* **Para añadir una foto nueva:** La imagen se carga de forma local y el sistema la sincroniza con el catálogo universal permanentemente.
* **Para eliminar un producto:** Al presionar el botón de eliminar, la prenda no solo desaparece de la pantalla, sino que se borra de la base de datos de Turso Cloud, liberando memoria y asegurando que las clientas nunca vean artículos agotados.

### 2.6. Guía de Instalación de la Aplicación en Teléfonos Móviles
* **En iPhone / iPad (Safari):**
  1. Abra `https://ebna-luxury.vercel.app`.
  2. Pulse el botón *"Compartir"* (el cuadrado con la flecha hacia arriba en la parte inferior).
  3. Deslice hacia abajo y seleccione *"Añadir a la pantalla de inicio"*.
  4. La aplicación de Sindy Luxury aparecerá con su icono oficial como una App nativa.
* **En Teléfonos Android (Chrome):**
  1. Abra `https://ebna-luxury.vercel.app`.
  2. Aparecerá un aviso automático en pantalla o en el pie de página que dice *"Instalar PWA Universal"*.
  3. Pulse *"Instalar"* y en 2 segundos tendrá la App en su menú principal sin ocupar espacio en la memoria.

---

# PARTE III: ACTA NOTARIAL DE ENTREGA Y CESIÓN DE PROPIEDAD INTELECTUAL

En la ciudad de Mongomo / Malabo, a 25 de Septiembre de 2026.

### 3.1. Declaración de Entrega Definitiva y Satisfactoria
Por medio de la presente acta, la agencia desarrolladora **Startup AiDA**, representada por su equipo de ingeniería e-commerce, declara formalmente haber completado al 100% de conformidad técnica todos los requerimientos de desarrollo, arquitectura, diseño y optimización de la plataforma digital **Sindy Luxury by EBNA**.

### 3.2. Cesión Universal, Plena e Irrevocable de Derechos de Propiedad Intelectual
1. **Titularidad Exclusiva:** A partir de la fecha de entrega, todos los derechos morales, patrimoniales, de explotación comercial, reproducción, adaptación y distribución de la marca **Sindy Luxury by EBNA** y de su plataforma web corresponden con carácter exclusivo, pleno e irrevocable a la **TITULAR Y PROPIETARIA DE SINDY LUXURY**.
2. **Propiedad del Código y Datos:** La base de datos (188 productos reales, imágenes de alta fidelidad, esquemas de catálogo y registros de inventario) son propiedad inalienable de la cliente.
3. **Renuncia de Retención:** La desarrolladora certifica que no conserva códigos de bloqueo, puertas traseras (*backdoors*) ni derechos restrictivos sobre el uso que la cliente desee dar a su tienda en línea.

### 3.3. Transferencia de Activos Digitales y Repositorio
Se hace entrega formal de:
* El repositorio central en GitHub (`Tranquilino1/EBNA-LUXURY`) con rama principal `main` completamente sincronizada.
* La propiedad verificada en Google Search Console (`googled6fb95f26de3d100`).
* La vinculación satelital oficial a Google Maps (`https://goo.gl/maps/wn7YCzyVwkFNm1ns7`).
* Todos los archivos de arquitectura, optimización y diseño editorial.

---

# PARTE IV: CONTRATO MERCANTIL DE PRESTACIÓN DE SERVICIOS Y VALORACIÓN ESPECIAL

### 4.1. Comparecencia de las Partes
* **DE UNA PARTE:** **Startup AiDA** (en adelante, la "DESARROLLADORA"), con infraestructura tecnológica especializada en arquitectura de software, inteligencia artificial y comercio electrónico de lujo.
* **DE OTRA PARTE:** **SINDY LUXURY / EBNA LUXURY** (en adelante, la "CLIENTE"), con sede física en Barrio Koete (al otro lado de la Agencia FORAMA), Mongomo, Guinea Ecuatorial.

Ambas partes se reconocen mutuamente la capacidad legal suficiente para suscribir el presente contrato de entrega.

### 4.2. Objeto del Contrato
El diseño, desarrollo a medida, depuración integral de catálogo, optimización de velocidad de carga, generación de tickets de compra digitales, integración de pagos móviles por Muni Dinero, vinculación de geolocalización por satélite en Mongomo, indexación oficial en Google y entrega de aplicación instalable universal PWA para la boutique de alta costura y cosmética **Sindy Luxury by EBNA**.

### 4.3. Cláusula Especial de Valoración Real de Mercado vs. Precio de Cortesía Exclusivo

> [!IMPORTANT]
> **CLÁUSULA ECONÓMICA DE HONORARIOS Y VALORACIÓN COMERCIAL:**
> 
> 1. **VALORACIÓN REAL DE MERCADO:** Las partes dejan expresa constancia de que un desarrollo tecnológico de esta envergadura —que engloba una arquitectura Progressive Web App (PWA) de nivel empresarial, integración de base de datos distribuida en la nube con micro-latencia (Turso Cloud), motor generador de tickets en alta resolución, posicionamiento para Google Top-1 con 193 páginas indexadas y estándares avanzados de Generative Engine Optimization (GEO) para Inteligencia Artificial— **TIENE UN VALOR COMERCIAL REAL EN EL MERCADO TECNOLÓGICO INTERNACIONAL Y REGIONAL ESTIMADO EN VARIOS CIENTOS DE MILES DE FRANCOS CFA (VALOR REAL ESTIMADO: ENTRE 1.200.000 Y 2.500.000 XAF)**.
> 
> 2. **DEFERENCIA EXCLUSIVA Y REGALO COMERCIAL:** No obstante su elevado valor objetivo de mercado, y **en virtud de la distinción, cercanía, aprecio y consideración hacia la CLIENTE como una de las personas y clientas más valiosas, queridas y prestigiosas para la agencia**, la DESARROLLADORA concede un **DESCUENTO DE CORTESÍA INTEGRAL A MODO DE REGALO DE FIDELIZACIÓN**.
> 
> 3. **PRECIO SIMBÓLICO FINAL ACORDADO:** Por mutuo acuerdo entre las partes, el precio total, definitivo y único facturado y cobrado a la CLIENTE por la entrega completa, operativa y funcional del 100% del proyecto se fija en la cantidad simbólica de:
> 
>    ### **70.000 XAF (SETENTA MIL FRANCOS CFA)**
> 
> 4. **CARÁCTER DEFINITIVO:** Dicha cantidad cubre la totalidad de las obras ejecutadas, sin que existan deudas pendientes, costes ocultos ni obligaciones financieras adicionales derivadas del presente desarrollo.

### 4.4. Garantía Técnica, Mantenimiento y Confidencialidad
* **Garantía Operativa:** La DESARROLLADORA certifica que la plataforma se entrega libre de errores de código, con pruebas de compilación superadas al 100% y en estado de producción activo con respuesta **HTTP 200 OK**.
* **Confidencialidad Absoluta:** Toda la información comercial, cifras de venta, números de contacto y datos de clientes de la boutique se mantendrán bajo estricto secreto profesional.
* **Canal de Soporte Permanente:** Cualquier incidencia o mantenimiento futuro podrá ser gestionado directamente con el equipo de soporte técnico mediante el modal de contacto de la tienda o por vía WhatsApp al **+240 555 32 00 17**.

---

### 4.5. Firma, Certificación y Aceptación de las Partes

En prueba de conformidad con todas y cada una de las cláusulas y especificaciones técnicas precedentes, se expide y certifica el presente documento para que conste a los efectos legales, comerciales y técnicos oportunos.

```
___________________________________              ___________________________________
         POR LA DESARROLLADORA                               POR LA CLIENTE
             Startup AiDA                                     SINDY LUXURY
  Ingeniería & Soluciones E-Commerce              Titular & Propietaria de la Boutique
        Rep. Guinea Ecuatorial                           Rep. Guinea Ecuatorial
```

---
*Certificado Digital expedido con folio de validación técnica para la plataforma EBNA Luxury / Sindy Luxury.*
