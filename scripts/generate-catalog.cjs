const fs = require('fs');

const SINDY_54_PRODUCTS = [
  // 1. Vestidos de Gala (12 items)
  {
    id: "sindy-vest-01",
    sku: "SL-VEST-01",
    name: "Vestido Largo Drapeado Soleil Escultural",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Espectacular vestido largo de noche en satén de seda drapeado artesanalmente. Escote halter fluido y silueta escultural que realza el movimiento con elegancia regia.",
    images: {
      primary: "/products/sindy_luxury/vestido_amarillo_drapeado.jpg",
      gallery: ["/products/sindy_luxury/vestido_amarillo_drapeado.jpg"]
    },
    details: {
      size: ["XS", "M", "XL"],
      material: "Satén de Seda Pesado & Forro Elástico"
    },
    slug: "vestido-largo-drapeado-soleil-escultural-sindy-1",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Amarillo", "Marrón", "Rojo", "Rosa"],
    sizes: ["XS", "M", "XL"]
  },
  {
    id: "sindy-vest-02",
    sku: "SL-VEST-02",
    name: "Vestido Túnica Caftán Imperial Blanco con Mangas Capa",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Majestuoso caftán de gala con mangas capa fluidas y detalles dorados en el escote. Confección en gasa de seda ligera con caída escultural para eventos de alta sociedad.",
    images: {
      primary: "/products/sindy_luxury/vestido_tunica_caftan_blanco.jpg",
      gallery: ["/products/sindy_luxury/vestido_tunica_caftan_blanco.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Gasa de Seda Pura & Satén Crepé"
    },
    slug: "vestido-tunica-caftan-imperial-blanco-sindy-6",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco Puro"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-vest-03",
    sku: "SL-VEST-03",
    name: "Vestido Sirena Marrón Chocolate Asimétrico",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 25000,
    originalPriceFCFA: 28000,
    inStock: true,
    featured: true,
    description: "Vestido largo de noche corte sirena en punto crepé stretch color chocolate oscuro. Escote asimétrico de un solo hombro con fruncido lateral moldeador.",
    images: {
      primary: "/products/sindy_luxury/vestido_sirena_chocolate.jpg",
      gallery: ["/products/sindy_luxury/vestido_sirena_chocolate.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Punto Crepé Stretch & Spandex"
    },
    slug: "vestido-sirena-marron-chocolate-asimetrico-sindy-9",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Marrón Chocolate", "Rojo", "Negro"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-vest-04",
    sku: "SL-VEST-04",
    name: "Vestido Azul Noche Gala Satinado con Abertura",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 21000,
    originalPriceFCFA: 25000,
    inStock: true,
    featured: true,
    description: "Vestido de fiesta en satén azul noche de alta densidad con abertura lateral pronunciada. Tirantes joya entrecruzados en la espalda descubierta.",
    images: {
      primary: "/products/sindy_luxury/vestido_azul_noche_gala.jpg",
      gallery: ["/products/sindy_luxury/vestido_azul_noche_gala.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Satén de Seda Pesado & Spandex"
    },
    slug: "vestido-azul-noche-gala-satinado-abertura-sindy-10",
    price: 21000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Azul Noche"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-vest-05",
    sku: "SL-VEST-05",
    name: "Vestido Corto Fiesta Tul Violeta con Vuelo",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Noche & Cóctel",
    priceFCFA: 27000,
    originalPriceFCFA: 32000,
    inStock: true,
    featured: true,
    description: "Mini vestido de cóctel en capas superpuestas de tul violeta couture palabra de honor con corsé interior entallado y falda con volumen vaporoso.",
    images: {
      primary: "/products/sindy_luxury/vestido_violeta_tul_couture.jpg",
      gallery: ["/products/sindy_luxury/vestido_violeta_tul_couture.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Tul Ilusión Francés & Raso de Seda"
    },
    slug: "vestido-corto-fiesta-tul-violeta-vuelo-sindy-11",
    price: 27000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Violeta", "Rojo", "Rosa", "Azul", "Negro", "Marrón"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-vest-06",
    sku: "SL-VEST-06",
    name: "Vestido Tubo Midi Marfil Escultural",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 23000,
    originalPriceFCFA: 27000,
    inStock: true,
    featured: true,
    description: "Vestido tubo midi en tejido crepé premium color marfil. Cuello cisne refinado, costuras arquitectónicas que estilizan la figura y abertura posterior para caminar con gracia.",
    images: {
      primary: "/products/sindy_luxury/vestido_tubo_midi_marfil.jpg",
      gallery: ["/products/sindy_luxury/vestido_tubo_midi_marfil.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Crepé Sastre Premium & Forro Elástico"
    },
    slug: "vestido-tubo-midi-marfil-escultural-sindy-27",
    price: 23000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Marfil", "Nude", "Negro"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-vest-07",
    sku: "SL-VEST-07",
    name: "Vestido Corto Fiesta Fucsia Neón con Volantes",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Noche & Cóctel",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Vestido de pasarela en fucsia neón brillante con hombreras estructuradas y volantes dramáticos en cascada. Cinturón joya a juego y corte entallado de alta costura.",
    images: {
      primary: "/products/sindy_luxury/vestido_corto_fucsia_neon.jpg",
      gallery: ["/products/sindy_luxury/vestido_corto_fucsia_neon.jpg"]
    },
    details: {
      size: ["XS", "M"],
      material: "Tafetán de Seda & Organza Estructurada"
    },
    slug: "vestido-corto-fiesta-fucsia-neon-volantes-sindy-28",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Fucsia Neón", "Rojo", "Negro"],
    sizes: ["XS", "M"]
  },
  {
    id: "sindy-vest-08",
    sku: "SL-VEST-08",
    name: "Vestido Corto Cut-Out Blanco Halter",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Noche & Cóctel",
    priceFCFA: 22000,
    originalPriceFCFA: 26000,
    inStock: true,
    featured: true,
    description: "Minivestido halter blanco inmaculado con cortes cut-out laterales estratégicos que resaltan la cintura. Tejido de piqué estructurado con forro invisible.",
    images: {
      primary: "/products/sindy_luxury/vestido_corto_cutout_blanco.jpg",
      gallery: ["/products/sindy_luxury/vestido_corto_cutout_blanco.jpg"]
    },
    details: {
      size: ["XS", "M"],
      material: "Piqué Elástico & Doble Forro Satinado"
    },
    slug: "vestido-corto-cut-out-blanco-halter-sindy-29",
    price: 22000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco Puro"],
    sizes: ["XS", "M"]
  },
  {
    id: "sindy-vest-09",
    sku: "SL-VEST-09",
    name: "Vestido Celeste Volante Palabra de Honor",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 28000,
    originalPriceFCFA: 34000,
    inStock: true,
    featured: true,
    description: "Vestido de ensueño palabra de honor en gasa celeste pastel con falda voluminosa en volantes asimétricos estilo alta costura europea.",
    images: {
      primary: "/products/sindy_luxury/vestido_celeste_volante_honor.jpg",
      gallery: ["/products/sindy_luxury/vestido_celeste_volante_honor.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Gasa de Seda & Muselina Pastel"
    },
    slug: "vestido-celeste-volante-palabra-honor-sindy-30",
    price: 28000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Celeste Cielo"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-vest-10",
    sku: "SL-VEST-10",
    name: "Vestido Mini Fruncido Satinado Blanco Tirantes",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Noche & Cóctel",
    priceFCFA: 18000,
    originalPriceFCFA: 22000,
    inStock: true,
    featured: true,
    description: "Minivestido ajustado en satén elástico blanco con fruncido drapeado en todo el contorno y escote drapeado cowl. Perfecto para cócteles y salidas exclusivas.",
    images: {
      primary: "/products/sindy_luxury/vestido_mini_fruncido_blanco.jpg",
      gallery: ["/products/sindy_luxury/vestido_mini_fruncido_blanco.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Satén Elástico Líquido"
    },
    slug: "vestido-mini-fruncido-satinado-blanco-sindy-31",
    price: 18000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco", "Rosa", "Rojo"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-vest-11",
    sku: "SL-VEST-11",
    name: "Vestido Largo Bohemio Estampado Safari",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Gala",
    priceFCFA: 22000,
    originalPriceFCFA: 26000,
    inStock: true,
    featured: true,
    description: "Vestido largo bohemio con estampado safari en tonos tierra dorados. Mangas abullonadas, cinturón de cordón trenzado con borlas y abertura central fluida.",
    images: {
      primary: "/products/sindy_luxury/vestido_largo_safari_print.jpg",
      gallery: ["/products/sindy_luxury/vestido_largo_safari_print.jpg"]
    },
    details: {
      size: ["M", "L", "XL"],
      material: "Chiffon Seda Transpirable"
    },
    slug: "vestido-largo-bohemio-estampado-safari-sindy-32",
    price: 22000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Safari Print"],
    sizes: ["M", "L", "XL"]
  },
  {
    id: "sindy-vest-12",
    sku: "SL-VEST-12",
    name: "Vestido Mini Escote Halter Noche",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Vestidos de Noche & Cóctel",
    priceFCFA: 18000,
    originalPriceFCFA: 22000,
    inStock: true,
    featured: true,
    description: "Vestido mini satinado con escote halter alto y espalda descubierta profunda. Caída sedosa fluida ideal para veladas en terrazas y eventos VIP.",
    images: {
      primary: "/products/sindy_luxury/vestido_mini_halter_noche.jpg",
      gallery: ["/products/sindy_luxury/vestido_mini_halter_noche.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Satén de Seda Crepé"
    },
    slug: "vestido-mini-escote-halter-noche-sindy-33",
    price: 18000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa", "Beige", "Negro"],
    sizes: ["M", "XS"]
  },

  // 2. Monos & Jumpsuits (3 items)
  {
    id: "sindy-mono-01",
    sku: "SL-MONO-01",
    name: "Jumpsuit Silueta Felina Leopardo Kylie Luxe",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Monos & Jumpsuits",
    priceFCFA: 25000,
    originalPriceFCFA: 28000,
    inStock: true,
    featured: true,
    description: "Mono ceñido con estampado animal print leopardo estilo Kylie Jenner. Microfibra modeladora de compresión ligera, cuello perkins y cierre invisible.",
    images: {
      primary: "/products/sindy_luxury/jumpsuit_leopardo_luxe.jpg",
      gallery: ["/products/sindy_luxury/jumpsuit_leopardo_luxe.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Spandex & Microfibra Modeladora"
    },
    slug: "jumpsuit-silueta-felina-leopardo-kylie-luxe-sindy-2",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Leopardo Clásico"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-mono-02",
    sku: "SL-MONO-02",
    name: "Jumpsuit Felino Safari Tigre",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Monos & Jumpsuits",
    priceFCFA: 22000,
    originalPriceFCFA: 26000,
    inStock: true,
    featured: true,
    description: "Catsuit entallado de cuerpo entero en estampado de tigre safari. Cuello alto, manga larga y tejido stretch que estiliza y potencia las curvas.",
    images: {
      primary: "/products/sindy_luxury/jumpsuit_felino_safari_tigre.jpg",
      gallery: ["/products/sindy_luxury/jumpsuit_felino_safari_tigre.jpg"]
    },
    details: {
      size: ["M"],
      material: "Lycra Brillante & Elastano de Alta Densidad"
    },
    slug: "jumpsuit-felino-safari-tigre-sindy-34",
    price: 22000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Tigre Dorado"],
    sizes: ["M"]
  },
  {
    id: "sindy-mono-03",
    sku: "SL-MONO-03",
    name: "Jumpsuit Segunda Piel Modelador Manga Larga",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Monos & Jumpsuits",
    priceFCFA: 18000,
    originalPriceFCFA: 22000,
    inStock: true,
    featured: true,
    description: "Jumpsuit de corte seamless segunda piel en burdeos / carmesí de compresión moderada. Diseño versátil tanto para outfits athleisure de lujo como para noche con tacones.",
    images: {
      primary: "/products/sindy_luxury/jumpsuit_segunda_piel_modelador.jpg",
      gallery: ["/products/sindy_luxury/jumpsuit_segunda_piel_modelador.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Microfibra Seamless Térmica"
    },
    slug: "jumpsuit-segunda-piel-modelador-manga-larga-sindy-35",
    price: 18000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rojo", "Blanco", "Marrón"],
    sizes: ["M", "XS", "XL"]
  },

  // 3. Conjuntos 2 Piezas de Pasarela (11 items)
  {
    id: "sindy-set-01",
    sku: "SL-SET-01",
    name: "Conjunto Peplum Vichy Rosa & Shorts Couture",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Conjunto dos piezas exclusivo compuesto por top peplum estructurado con cuello cisne y shorts de talle alto a juego en estampado de cuadros vichy rosa pastel.",
    images: {
      primary: "/products/sindy_luxury/conjunto_vichy_rosa_peplum.jpg",
      gallery: ["/products/sindy_luxury/conjunto_vichy_rosa_peplum.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Algodón Jacquard & Punto Doble"
    },
    slug: "conjunto-peplum-vichy-rosa-shorts-couture-sindy-3",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Vichy"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-set-02",
    sku: "SL-SET-02",
    name: "Conjunto Palazzo Celeste Top Asimétrico",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 20000,
    originalPriceFCFA: 25000,
    inStock: true,
    featured: true,
    description: "Conjunto de top palabra de honor asimétrico con lazo lateral drapeado y pantalón palazzo fluido de tiro extra alto en suave tejido crepé celeste.",
    images: {
      primary: "/products/sindy_luxury/conjunto_palazzo_celeste.jpg",
      gallery: ["/products/sindy_luxury/conjunto_palazzo_celeste.jpg"]
    },
    details: {
      size: ["XS", "M"],
      material: "Crepé Georgette Liviano"
    },
    slug: "conjunto-palazzo-celeste-top-asimetrico-sindy-14",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Celeste", "Amarillo"],
    sizes: ["XS", "M"]
  },
  {
    id: "sindy-set-03",
    sku: "SL-SET-03",
    name: "Conjunto Capa Asimétrica Carmesí Luxe",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 20000,
    originalPriceFCFA: 24000,
    inStock: true,
    featured: true,
    description: "Conjunto vanguardista formado por blusa fluida con manga capa en un hombro y pantalón recto de pinzas a juego en rojo carmesí intenso.",
    images: {
      primary: "/products/sindy_luxury/conjunto_capa_rojo_carmesi.jpg",
      gallery: ["/products/sindy_luxury/conjunto_capa_rojo_carmesi.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Satén Crepé Mate & Seda Artificial"
    },
    slug: "conjunto-capa-asimetrica-carmesi-luxe-sindy-15",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rojo Carmesí", "Blanco", "Marrón", "Negro"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-set-04",
    sku: "SL-SET-04",
    name: "Conjunto Flúor Soleil Cárdigan + Falda Tubo",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Conjunto knitwear de punto fino elástico en amarillo flúor vibrante con micro-cárdigan abotonado al frente y falda midi tubo de tiro alto.",
    images: {
      primary: "/products/sindy_luxury/conjunto_fluor_soleil.jpg",
      gallery: ["/products/sindy_luxury/conjunto_fluor_soleil.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Punto Canalé Elástico Premium"
    },
    slug: "conjunto-fluor-soleil-cardigan-falda-tubo-sindy-8",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Amarillo Flúor", "Rosa", "Negro"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-set-05",
    sku: "SL-SET-05",
    name: "Conjunto Corset Morado Berenjena & Falda Midi",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 24000,
    originalPriceFCFA: 28000,
    inStock: true,
    featured: true,
    description: "Conjunto sofisticado compuesto por top corsetero estructurado con ballenas y falda midi lápiz en satén de seda morado berenjena.",
    images: {
      primary: "/products/sindy_luxury/conjunto_corset_falda_purple.jpg",
      gallery: ["/products/sindy_luxury/conjunto_corset_falda_purple.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Satén Nupcial Pesado"
    },
    slug: "conjunto-corset-morado-berenjena-falda-midi-sindy-16",
    price: 24000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Morado Berenjena"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-set-06",
    sku: "SL-SET-06",
    name: "Conjunto Top + Shorts Tigre Leopardo Rojo",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 23000,
    originalPriceFCFA: 27000,
    inStock: true,
    featured: true,
    description: "Conjunto safari urbano con top cropped de escote cuadrado y shorts sastre estructurados de tiro alto en estampado exótico rojo y negro.",
    images: {
      primary: "/products/sindy_luxury/conjunto_top_shorts_tigre_rojo.jpg",
      gallery: ["/products/sindy_luxury/conjunto_top_shorts_tigre_rojo.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Lino & Jacquard Safari"
    },
    slug: "conjunto-top-shorts-tigre-leopardo-rojo-sindy-36",
    price: 23000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rojo Tigre"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-set-07",
    sku: "SL-SET-07",
    name: "Conjunto Palazzo Pure White Satinado",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 20000,
    originalPriceFCFA: 25000,
    inStock: true,
    featured: true,
    description: "Elegante conjunto monocromático blanco puro con top drapeado sin mangas y pantalón palazzo de caída impecable en satén de seda.",
    images: {
      primary: "/products/sindy_luxury/conjunto_palazzo_pure_white.jpg",
      gallery: ["/products/sindy_luxury/conjunto_palazzo_pure_white.jpg"]
    },
    details: {
      size: ["M", "XL", "XS"],
      material: "Satén de Seda Blanco Nácar"
    },
    slug: "conjunto-palazzo-pure-white-satinado-sindy-22",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco Puro"],
    sizes: ["M", "XL", "XS"]
  },
  {
    id: "sindy-set-08",
    sku: "SL-SET-08",
    name: "Conjunto Top Crop + Falda Larga Fucsia Gala",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Conjunto dos piezas de gala con crop top minimalista ajustado y falda maxi con vuelo espectacular en tafetán fucsia brillante.",
    images: {
      primary: "/products/sindy_luxury/conjunto_crop_falda_fucsia.jpg",
      gallery: ["/products/sindy_luxury/conjunto_crop_falda_fucsia.jpg"]
    },
    details: {
      size: ["M", "XL", "XS"],
      material: "Tafetán Fucsia & Forro Raso"
    },
    slug: "conjunto-top-crop-falda-larga-fucsia-gala-sindy-37",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Fucsia Neón"],
    sizes: ["M", "XL", "XS"]
  },
  {
    id: "sindy-set-09",
    sku: "SL-SET-09",
    name: "Conjunto Pantalón Flare Rosa & Top Crop",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 20000,
    originalPriceFCFA: 24000,
    inStock: true,
    featured: true,
    description: "Conjunto casual chic en punto acanalado rosa empolvado con top cropped ceñido y pantalón campana flare de tiro alto.",
    images: {
      primary: "/products/sindy_luxury/conjunto_pantalon_flare_rosa.jpg",
      gallery: ["/products/sindy_luxury/conjunto_pantalon_flare_rosa.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Punto Acanalado Soft Touch"
    },
    slug: "conjunto-pantalon-flare-rosa-top-crop-sindy-38",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Pastel"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-set-10",
    sku: "SL-SET-10",
    name: "Conjunto Azul Marino Falda Plisada + Top",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Distinguido dos piezas de alta costura con top entallado y falda evasé con micro-plisados en crepe satén azul marino.",
    images: {
      primary: "/products/sindy_luxury/conjunto_azul_marino_plisada.jpg",
      gallery: ["/products/sindy_luxury/conjunto_azul_marino_plisada.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Crepé Plisado Azul Marino"
    },
    slug: "conjunto-azul-marino-falda-plisada-top-sindy-39",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Azul Marino"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-set-11",
    sku: "SL-SET-11",
    name: "Conjunto Casual Top + Shorts Básico",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Conjuntos 2 Piezas",
    priceFCFA: 8000,
    originalPriceFCFA: 10000,
    inStock: true,
    featured: true,
    description: "Conjunto básico veraniego de algodón elástico ultracómodo con crop top sin mangas y shorts elásticos ajustados.",
    images: {
      primary: "/products/sindy_luxury/conjunto_casual_top_shorts.jpg",
      gallery: ["/products/sindy_luxury/conjunto_casual_top_shorts.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Algodón Stretch Transpirable"
    },
    slug: "conjunto-casual-top-shorts-basico-sindy-40",
    price: 8000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Tigre", "Rojo", "Negro", "Rosa", "Marrón", "Azul", "Amarillo"],
    sizes: ["M", "XS"]
  },

  // 4. Tops, Corsets & Faldas (8 items)
  {
    id: "sindy-top-01",
    sku: "SL-TOP-01",
    name: "Top Corset Joya Strass & Perlas Blanco",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Tops & Corsets",
    priceFCFA: 15000,
    originalPriceFCFA: 18000,
    inStock: true,
    featured: true,
    description: "Corset joya bordado a mano con perlas naturales y cristales de strass centelleantes. Cierre posterior con lazos de satén regulables.",
    images: {
      primary: "/products/sindy_luxury/corset_strass_perlas_blanco.jpg",
      gallery: ["/products/sindy_luxury/corset_strass_perlas_blanco.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Malla Rígida, Strass Cristal & Perlas"
    },
    slug: "top-corset-joya-strass-perlas-blanco-sindy-5",
    price: 15000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco Perla", "Rojo", "Negro", "Gris"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-top-02",
    sku: "SL-TOP-02",
    name: "Top Escultural Off-Shoulder con Volante",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Tops & Corsets",
    priceFCFA: 10000,
    originalPriceFCFA: 12000,
    inStock: true,
    featured: true,
    description: "Top de hombros descubiertos con gran volante arquitectónico en el escote. Confeccionado en otomán elástico que estiliza el busto.",
    images: {
      primary: "/products/sindy_luxury/top_escultural_offshoulder.jpg",
      gallery: ["/products/sindy_luxury/top_escultural_offshoulder.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Otomán Elástico Estructurado"
    },
    slug: "top-escultural-off-shoulder-volante-sindy-17",
    price: 10000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rojo", "Marrón", "Negro", "Blanco", "Rosa"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-top-03",
    sku: "SL-TOP-03",
    name: "Top Halter Plisado Crema Peplum",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Tops & Corsets",
    priceFCFA: 12000,
    originalPriceFCFA: 15000,
    inStock: true,
    featured: true,
    description: "Blusa halter sin mangas con microplisados verticales que se abren en bajo peplum vaporoso. Color crema nacarado con cierre al cuello.",
    images: {
      primary: "/products/sindy_luxury/top_halter_plisado_crema.jpg",
      gallery: ["/products/sindy_luxury/top_halter_plisado_crema.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Chiffon Plisado Nácar"
    },
    slug: "top-halter-plisado-crema-peplum-sindy-41",
    price: 12000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Crema", "Negro", "Blanco"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-top-04",
    sku: "SL-TOP-04",
    name: "Top Palabra de Honor Minimalista",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Tops & Corsets",
    priceFCFA: 10000,
    originalPriceFCFA: 12000,
    inStock: true,
    featured: true,
    description: "Top palabra de honor estilo bandeau en tejido punto milano doble capa. Banda de silicona interior antideslizante para sujeción total.",
    images: {
      primary: "/products/sindy_luxury/top_palabra_honor_minimal.jpg",
      gallery: ["/products/sindy_luxury/top_palabra_honor_minimal.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Punto Milano & Spandex Antideslizante"
    },
    slug: "top-palabra-de-honor-minimalista-sindy-42",
    price: 10000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Gris", "Negro", "Blanco", "Rojo", "Marrón", "Amarillo", "Verde"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-top-05",
    sku: "SL-TOP-05",
    name: "Body Moldeador Segunda Piel Halter",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Tops & Corsets",
    priceFCFA: 10000,
    originalPriceFCFA: 14000,
    inStock: true,
    featured: true,
    description: "Body reductor y estilizador de cuello halter con cierre en la entrepierna. Tejido stretch transpirable de alta compresión.",
    images: {
      primary: "/products/sindy_luxury/body_moldeador_halter.jpg",
      gallery: ["/products/sindy_luxury/body_moldeador_halter.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Poliamida 85% & Elastano 15%"
    },
    slug: "body-moldeador-segunda-piel-halter-sindy-43",
    price: 10000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco", "Azul", "Marrón", "Negro"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-fald-01",
    sku: "SL-FALD-01",
    name: "Falda Plisada Larga Satén Blanco Puro",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Faldas",
    priceFCFA: 20000,
    originalPriceFCFA: 24000,
    inStock: true,
    featured: true,
    description: "Falda maxi plisada de corte evasé confeccionada en satén blanco reflectante. Cinturilla elástica oculta y caída aristocrática.",
    images: {
      primary: "/products/sindy_luxury/falda_plisada_saten_blanco.jpg",
      gallery: ["/products/sindy_luxury/falda_plisada_saten_blanco.jpg"]
    },
    details: {
      size: ["M", "XS", "XL"],
      material: "Satén de Seda Blanco Nácar Plisado"
    },
    slug: "falda-plisada-larga-saten-blanco-puro-sindy-44",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Blanco Puro"],
    sizes: ["M", "XS", "XL"]
  },
  {
    id: "sindy-fald-02",
    sku: "SL-FALD-02",
    name: "Falda Tul Rosa Gala con Vuelo",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Faldas",
    priceFCFA: 15000,
    originalPriceFCFA: 18000,
    inStock: true,
    featured: true,
    description: "Espectacular falda de cóctel en múltiples capas de tul ilusión rosa empolvado con forro suave y cintura entallada de satén.",
    images: {
      primary: "/products/sindy_luxury/falda_tul_rosa_gala.jpg",
      gallery: ["/products/sindy_luxury/falda_tul_rosa_gala.jpg"]
    },
    details: {
      size: ["XL", "M", "XS"],
      material: "Tul Ilusión & Satén Rosa"
    },
    slug: "falda-tul-rosa-gala-con-vuelo-sindy-45",
    price: 15000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Pastel"],
    sizes: ["XL", "M", "XS"]
  },
  {
    id: "sindy-fald-03",
    sku: "SL-FALD-03",
    name: "Minifalda Animal Print con Vuelo",
    brand: "Sindy Luxury Haute Couture",
    category: "MODA_MUJER",
    subcategory: "Faldas",
    priceFCFA: 15000,
    originalPriceFCFA: 18000,
    inStock: true,
    featured: true,
    description: "Minifalda evasé con vuelo coqueto en estampado leopardo de alta definición. Forro interior de pantalón corto incorporado para total confort.",
    images: {
      primary: "/products/sindy_luxury/minifalda_animal_print_safari.jpg",
      gallery: ["/products/sindy_luxury/minifalda_animal_print_safari.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Seda Twill Estampada"
    },
    slug: "minifalda-animal-print-con-vuelo-sindy-46",
    price: 15000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Leopardo Safari"],
    sizes: ["M", "XS"]
  },

  // 5. Calzado de Fiesta & Pasarela (8 items)
  {
    id: "sindy-calz-01",
    sku: "SL-CALZ-01",
    name: "Sandalias Tacón Joya Esmeralda con Strass",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Sandalias de Fiesta",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Sandalias de tacón de aguja de 10 cm con pulsera al tobillo y tiras sinuosas recubiertas de cristales strass en tono verde esmeralda deslumbrante.",
    images: {
      primary: "/products/sindy_luxury/sandalias_joya_esmeralda.jpg",
      gallery: ["/products/sindy_luxury/sandalias_joya_esmeralda.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Raso Esmeralda, Strass de Vidrio & Suela de Piel"
    },
    slug: "sandalias-tacon-joya-esmeralda-strass-sindy-4",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Verde Esmeralda"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-02",
    sku: "SL-CALZ-02",
    name: "Stilettos Degradé Charol Haute Elegance",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Zapatos de Salón",
    priceFCFA: 24000,
    originalPriceFCFA: 28000,
    inStock: true,
    featured: true,
    description: "Zapatos de salón stiletto con puntera afilada en charol de lujo con efecto degradado de negro a nude. Tacón lacado de 11 cm y plantilla acolchada.",
    images: {
      primary: "/products/sindy_luxury/stilettos_charol_degrade.jpg",
      gallery: ["/products/sindy_luxury/stilettos_charol_degrade.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Charol Degradado Premium & Forro Interior Cuero"
    },
    slug: "stilettos-degrade-charol-haute-elegance-sindy-7",
    price: 24000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Nude Degradé", "Chocolate", "Negro"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-03",
    sku: "SL-CALZ-03",
    name: "Stilettos Metalizados Mirror Silver & White",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Zapatos de Salón",
    priceFCFA: 23000,
    originalPriceFCFA: 27000,
    inStock: true,
    featured: true,
    description: "Stilettos de acabado plateado efecto espejo con interior en piel blanca nacarada. Tacón metálico de impacto para veladas y alfombras rojas.",
    images: {
      primary: "/products/sindy_luxury/stilettos_mirror_silver_white.jpg",
      gallery: ["/products/sindy_luxury/stilettos_mirror_silver_white.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Piel Metalizada Mirror Effect"
    },
    slug: "stilettos-metalizados-mirror-silver-white-sindy-47",
    price: 23000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Plateado Espejo", "Blanco Nácar"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-04",
    sku: "SL-CALZ-04",
    name: "Sandalias Tacón Plataforma Noir Velvet",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Sandalias de Fiesta",
    priceFCFA: 20000,
    originalPriceFCFA: 25000,
    inStock: true,
    featured: true,
    description: "Sandalias de plataforma delantera y tacón en bloque de 12 cm en terciopelo negro profundo. Máxima estabilidad, elegancia y confort toda la noche.",
    images: {
      primary: "/products/sindy_luxury/sandalias_plataforma_noir.jpg",
      gallery: ["/products/sindy_luxury/sandalias_plataforma_noir.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Terciopelo Negro & Plataforma de Piel"
    },
    slug: "sandalias-tacon-plataforma-noir-velvet-sindy-19",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Negro Noir"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-05",
    sku: "SL-CALZ-05",
    name: "Bailarinas Mary Jane Terciopelo con Hebilla Joya",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Bailarinas & Planos",
    priceFCFA: 18000,
    originalPriceFCFA: 22000,
    inStock: true,
    featured: true,
    description: "Bailarinas planas estilo Mary Jane en terciopelo de seda suave con correa al empeine adornada con una hebilla de perlas y cristales brillantes.",
    images: {
      primary: "/products/sindy_luxury/bailarinas_mary_jane_rosa.jpg",
      gallery: ["/products/sindy_luxury/bailarinas_mary_jane_rosa.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Terciopelo de Seda & Hebilla de Cristal"
    },
    slug: "bailarinas-mary-jane-terciopelo-hebilla-joya-sindy-18",
    price: 18000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rojo Carmesí", "Negro", "Beige"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-06",
    sku: "SL-CALZ-06",
    name: "Merceditas Charol Rosa Pastel con Correa",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Bailarinas & Planos",
    priceFCFA: 20000,
    originalPriceFCFA: 24000,
    inStock: true,
    featured: true,
    description: "Zapatos merceditas de tacón bajo ancho en charol brillante rosa pastel con tira al empeine y botón nacarado. Estilo chic parisino irresistible.",
    images: {
      primary: "/products/sindy_luxury/merceditas_charol_rosa_pastel.jpg",
      gallery: ["/products/sindy_luxury/merceditas_charol_rosa_pastel.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Charol Rosa Suave & Tacón Midi Cómodo"
    },
    slug: "merceditas-charol-rosa-pastel-correa-sindy-48",
    price: 20000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Pastel"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-07",
    sku: "SL-CALZ-07",
    name: "Sneakers Plataforma Rosa Glamour",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Zapatillas Urbanas",
    priceFCFA: 25000,
    originalPriceFCFA: 30000,
    inStock: true,
    featured: true,
    description: "Zapatillas de diseño con suela gruesa plataforma de 5 cm en piel rosa empolvado con inserciones metalizadas doradas y cordones de satén.",
    images: {
      primary: "/products/sindy_luxury/sneakers_plataforma_rosa_glam.jpg",
      gallery: ["/products/sindy_luxury/sneakers_plataforma_rosa_glam.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Piel Vacuna, Satén & Suela Eva Ultraligera"
    },
    slug: "sneakers-plataforma-rosa-glamour-sindy-49",
    price: 25000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Glam"],
    sizes: ["37", "38", "39", "40"]
  },
  {
    id: "sindy-calz-08",
    sku: "SL-CALZ-08",
    name: "Slippers Plataforma Borrego / Piel de Peluche",
    brand: "Sindy Luxury Shoes",
    category: "CALZADO",
    subcategory: "Bailarinas & Planos",
    priceFCFA: 23000,
    originalPriceFCFA: 27000,
    inStock: true,
    featured: true,
    description: "Zapatillas mules con plataforma acolchada recubiertas de suave pelo de borrego sintético color beige crema. Confort ultra mullido y estilo casual de lujo.",
    images: {
      primary: "/products/sindy_luxury/slippers_plataforma_borrego.jpg",
      gallery: ["/products/sindy_luxury/slippers_plataforma_borrego.jpg"]
    },
    details: {
      size: ["37", "38", "39", "40"],
      material: "Borrego Sherpa Ultrasuave & Suela Antideslizante"
    },
    slug: "slippers-plataforma-borrego-peluche-sindy-50",
    price: 23000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Nude", "Beige Crema"],
    sizes: ["37", "38", "39", "40"]
  },

  // 6. Bolsos & Accesorios de Lujo (8 items)
  {
    id: "sindy-acc-01",
    sku: "SL-ACC-01",
    name: "Bolso Acolchado Clutch Matelassé Noir & Gold",
    brand: "Sindy Luxury Accessories",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Bolsos de Mano",
    priceFCFA: 10000,
    originalPriceFCFA: 14000,
    inStock: true,
    featured: true,
    description: "Bolso bandolera de mano en suave piel vegana con patrón acolchado matelassé de rombos y cadena dorada convertible de hombro a mano.",
    images: {
      primary: "/products/sindy_luxury/bolso_clutch_matelasse.jpg",
      gallery: ["/products/sindy_luxury/bolso_clutch_matelasse.jpg"]
    },
    details: {
      size: ["Talla Única"],
      material: "Piel Sintética Grano Fino & Herrajes Bañados en Oro"
    },
    slug: "bolso-acolchado-clutch-matelasse-noir-gold-sindy-12",
    price: 10000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Negro Noir", "Blanco Nácar", "Rojo Escarlata"],
    sizes: ["Talla Única"]
  },
  {
    id: "sindy-acc-02",
    sku: "SL-ACC-02",
    name: "Bolso Baguette Tachuelas & Polka Dots",
    brand: "Sindy Luxury Accessories",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Bolsos de Hombro",
    priceFCFA: 10000,
    originalPriceFCFA: 14000,
    inStock: true,
    featured: true,
    description: "Bolso baguette de tendencia con aplicación de mini tachuelas metálicas doradas y asa ergonómica de hombro. Espacio optimizado para smartphone y cosméticos.",
    images: {
      primary: "/products/sindy_luxury/bolso_baguette_tachuelas.jpg",
      gallery: ["/products/sindy_luxury/bolso_baguette_tachuelas.jpg"]
    },
    details: {
      size: ["Talla Única"],
      material: "Ecopiel Lisa & Microtachuelas Cónicas"
    },
    slug: "bolso-baguette-tachuelas-polka-dots-sindy-13",
    price: 10000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Marrón Chocolate", "Rojo Cereza", "Rafia Natural"],
    sizes: ["Talla Única"]
  },
  {
    id: "sindy-acc-03",
    sku: "SL-ACC-03",
    name: "Gafas de Sol Cuadradas Oversize Carey & Crystal",
    brand: "Sindy Luxury Eyewear",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Gafas de Sol",
    priceFCFA: 2500,
    originalPriceFCFA: 4000,
    inStock: true,
    featured: true,
    description: "Gafas de sol de montura cuadrada extragrande en acetato de carey pulido con cristales degradados de protección UV400 completa.",
    images: {
      primary: "/products/sindy_luxury/gafas_sol_monturas_luxe.jpg",
      gallery: ["/products/sindy_luxury/gafas_sol_monturas_luxe.jpg"]
    },
    details: {
      size: ["Talla Única"],
      material: "Acetato Pulido & Lentes Policarbonato UV400"
    },
    slug: "gafas-sol-cuadradas-oversize-carey-crystal-sindy-20",
    price: 2500,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Carey Clásico", "Negro Azabache", "Transparente"],
    sizes: ["Talla Única"]
  },
  {
    id: "sindy-acc-04",
    sku: "SL-ACC-04",
    name: "Faja Reductora Body Silueta Perfecta",
    brand: "Sindy Luxury Shapewear",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Ropa Moldeadora",
    priceFCFA: 10000,
    originalPriceFCFA: 15000,
    inStock: true,
    featured: true,
    description: "Body faja moldeadora de alta compresión que redefine cintura, aplana abdomen y eleva glúteos de forma invisible bajo vestidos de gala.",
    images: {
      primary: "/products/sindy_luxury/faja_body_silueta_perfecta.jpg",
      gallery: ["/products/sindy_luxury/faja_body_silueta_perfecta.jpg"]
    },
    details: {
      size: ["M", "XS"],
      material: "Powernet de Compresión & Forro Antibacteriano"
    },
    slug: "faja-reductora-body-silueta-perfecta-sindy-21",
    price: 10000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rojo/Burdeos", "Negro"],
    sizes: ["M", "XS"]
  },
  {
    id: "sindy-acc-05",
    sku: "SL-ACC-05",
    name: "Medias Térmicas Translúcidas Efecto Piel",
    brand: "Sindy Luxury Accessories",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Accesorios Térmicos",
    priceFCFA: 12000,
    originalPriceFCFA: 16000,
    inStock: true,
    featured: true,
    description: "Medias con forro polar interior invisible que abrigan y moldean las piernas manteniendo un efecto translúcido sedoso impecable.",
    images: {
      primary: "/products/sindy_luxury/medias_termicas_translucidas.jpg",
      gallery: ["/products/sindy_luxury/medias_termicas_translucidas.jpg"]
    },
    details: {
      size: ["Talla Única"],
      material: "Nylon Elástico con Interior Polar Falso Translúcido"
    },
    slug: "medias-termicas-translucidas-efecto-piel-sindy-51",
    price: 12000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Efecto Piel Natural", "Negro Translúcido"],
    sizes: ["Talla Única"]
  },
  {
    id: "sindy-acc-06",
    sku: "SL-ACC-06",
    name: "Gorro de Satén Ajustable Anti-Frizz para Cabello Afro",
    brand: "Sindy Luxury Haircare",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Cuidado Capilar & Accesorios",
    priceFCFA: 3000,
    originalPriceFCFA: 5000,
    inStock: true,
    featured: true,
    description: "Gorro protector de satén de seda de doble capa con banda elástica ancha regulable. Mantiene la hidratación capilar, protege peinados, trenzas y rizos del encrespamiento nocturno.",
    images: {
      primary: "/products/sindy_luxury/gorro_saten_antifrizz_afro.jpg",
      gallery: ["/products/sindy_luxury/gorro_saten_antifrizz_afro.jpg"]
    },
    details: {
      size: ["Talla Única"],
      material: "Satén de Seda Pura Doble Capa"
    },
    slug: "gorro-saten-ajustable-antifrizz-cabello-afro-sindy-52",
    price: 3000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Negro", "Rosa Dorado", "Púrpura Imperial"],
    sizes: ["Talla Única"]
  },
  {
    id: "sindy-acc-07",
    sku: "SL-ACC-07",
    name: "Funda de Almohada de Satén de Seda Anti-Frizz",
    brand: "Sindy Luxury Living",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Cuidado Capilar & Hogar",
    priceFCFA: 5000,
    originalPriceFCFA: 7500,
    inStock: true,
    featured: true,
    description: "Funda de almohada confeccionada en satén de seda de alta densidad 100% hipoalergénico. Previene la rotura del cabello, retiene la humedad de la piel y evita arrugas faciales.",
    images: {
      primary: "/products/sindy_luxury/funda_almohada_saten_seda.jpg",
      gallery: ["/products/sindy_luxury/funda_almohada_saten_seda.jpg"]
    },
    details: {
      size: ["Estándar 50x75 cm"],
      material: "Satén de Seda 100% Hipoalergénico con Cierre Invisible"
    },
    slug: "funda-almohada-saten-seda-antifrizz-sindy-53",
    price: 5000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Rosa Pastel", "Blanco Perla", "Gris Plata", "Champán"],
    sizes: ["Estándar 50x75 cm"]
  },
  {
    id: "sindy-acc-08",
    sku: "SL-ACC-08",
    name: "Extensiones Trenzas de Cabello Premium",
    brand: "Sindy Luxury Haircare",
    category: "BOLSOS_ACCESORIOS",
    subcategory: "Posticería & Belleza",
    priceFCFA: 5000,
    originalPriceFCFA: 7000,
    inStock: true,
    featured: true,
    description: "Paquete de extensiones de fibra sintética de alta temperatura Kanekalon ultra sedosa. Textura perfecta para trenzas africanas, twists y peinados protectores duraderos.",
    images: {
      primary: "/products/sindy_luxury/extensiones_trenzas_cabello_premium.jpg",
      gallery: ["/products/sindy_luxury/extensiones_trenzas_cabello_premium.jpg"]
    },
    details: {
      size: ["Pack 100g"],
      material: "Fibra Kanekalon de Alta Calidad Termorresistente"
    },
    slug: "extensiones-trenzas-cabello-premium-sindy-54",
    price: 5000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Castaño", "Negro Natural"],
    sizes: ["Pack 100g"]
  },

  // 7. Cosmética Botánica & Tratamientos Auténticos (4 items)
  {
    id: "sindy-cosm-01",
    sku: "SL-COSM-01",
    name: "Scrub Cúrcuma Effaceur N°1 Anti-Taches 200g",
    brand: "N°1 Effaceur Paris",
    category: "COSMETICA_FACIAL",
    subcategory: "Exfoliantes & Mascarillas",
    priceFCFA: 4000,
    originalPriceFCFA: 5000,
    inStock: true,
    featured: true,
    description: "Potente exfoliante corporal y facial formulado con cúrcuma biológica purificada y microgránulos minerales. Unifica el tono, difumina manchas oscuras e hiperpigmentación.",
    images: {
      primary: "/products/sindy_luxury/scrub_curcuma_effaceur.jpg",
      gallery: ["/products/sindy_luxury/scrub_curcuma_effaceur.jpg"]
    },
    details: {
      volume: "Tarro 200g",
      material: "Cúrcuma Orgánica, Aceite de Argán & Vitamina E"
    },
    slug: "scrub-curcuma-effaceur-no1-anti-taches-sindy-24",
    price: 4000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Cúrcuma Golden Glow"],
    sizes: ["Tarro 200g"]
  },
  {
    id: "sindy-cosm-02",
    sku: "SL-COSM-02",
    name: "Crema Éclaircissante Terminator Soin Intensif 50ml",
    brand: "Terminator Dermacare",
    category: "COSMETICA_FACIAL",
    subcategory: "Cremas de Tratamiento",
    priceFCFA: 4000,
    originalPriceFCFA: 6000,
    inStock: true,
    featured: true,
    description: "Tratamiento intensivo anti-manchas rebeldes para codos, rodillas, manos y rostro. Acelera la renovación celular proporcionando luminosidad radiante y uniforme.",
    images: {
      primary: "/products/sindy_luxury/crema_terminator_eclaircissante.jpg",
      gallery: ["/products/sindy_luxury/crema_terminator_eclaircissante.jpg"]
    },
    details: {
      volume: "Frasco 50ml",
      material: "Complejo AHA/BHA, Niacinamida & Filtro UV"
    },
    slug: "crema-eclaircissante-terminator-soin-intensif-sindy-25",
    price: 4000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Fórmula Concentrada"],
    sizes: ["Frasco 50ml"]
  },
  {
    id: "sindy-cosm-03",
    sku: "SL-COSM-03",
    name: "Jabón Tónico Cúrcuma & Félicité Artisanal 150g",
    brand: "Félicité Herbal",
    category: "HIGIENE_CORPORAL",
    subcategory: "Jabones Botánicos",
    priceFCFA: 2000,
    originalPriceFCFA: 3000,
    inStock: true,
    featured: true,
    description: "Barra de jabón botánico artesanal enriquecida con aceite de cúrcuma virgen y manteca de karité. Limpieza profunda, desinflama poros y previene brotes de acné.",
    images: {
      primary: "/products/sindy_luxury/jabon_curcuma_felicite.jpg",
      gallery: ["/products/sindy_luxury/jabon_curcuma_felicite.jpg"]
    },
    details: {
      volume: "Barra 150g",
      material: "Aceite de Palma Sostenible, Cúrcuma & Karité Puro"
    },
    slug: "jabon-tonico-curcuma-felicite-artisanal-sindy-26",
    price: 2000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Extracto Cúrcuma Natural"],
    sizes: ["Barra 150g"]
  },
  {
    id: "sindy-cosm-04",
    sku: "SL-COSM-04",
    name: "Jabón Aclarante Kojic Acid & Papaya Collagen 100g",
    brand: "Kojic Papaya Luxe",
    category: "HIGIENE_CORPORAL",
    subcategory: "Jabones Botánicos",
    priceFCFA: 2000,
    originalPriceFCFA: 3500,
    inStock: true,
    featured: true,
    description: "Jabón facial y corporal concentrado en ácido kójico y enzimas de papaya con colágeno reafirmante. Reduce la producción excesiva de melanina y suaviza la piel áspera.",
    images: {
      primary: "/products/sindy_luxury/jabon_kojic_acid_papaya.jpg",
      gallery: ["/products/sindy_luxury/jabon_kojic_acid_papaya.jpg"]
    },
    details: {
      volume: "Barra 100g",
      material: "Ácido Kójico Puro, Extracto de Papaya & Colágeno Hidrolizado"
    },
    slug: "jabon-aclarante-kojic-acid-papaya-collagen-sindy-55",
    price: 2000,
    in_stock: true,
    is_hidden: false,
    is_featured: true,
    colors: ["Kójico & Papaya"],
    sizes: ["Barra 100g"]
  }
];

// Now load the existing demoData.ts to preserve the authentic other products (like Vaseline, Dudu-Osun, etc.)
// while filtering out ALL "Prenda Exclusiva" generic placeholders.
const oldContent = fs.readFileSync('src/lib/demoData.ts', 'utf8');

// Parse old INITIAL_PRODUCTS array
const arrayMatch = oldContent.match(/export const INITIAL_PRODUCTS: Product\[\] = (\[[\s\S]*?\n\];)/);
if (!arrayMatch) {
  console.error('Could not find INITIAL_PRODUCTS in demoData.ts');
  process.exit(1);
}

// We safely extract valid existing products
const rawArrayStr = arrayMatch[1].replace(/;\s*$/, '');
let existingProducts = [];
try {
  existingProducts = eval(rawArrayStr);
} catch (e) {
  console.error('Error evaluating existing products:', e.message);
  process.exit(1);
}

console.log('Original count:', existingProducts.length);

// Filter out old Sindy items (we will replace with the full 54) and any "Prenda Exclusiva"
const preservedCurated = existingProducts.filter(p => {
  if (p.id.startsWith('sindy-')) return false;
  if (p.name && p.name.includes('Prenda Exclusiva')) return false;
  return true;
});

console.log('Preserved authentic brand items:', preservedCurated.length);

// Clean up attributes of preserved items (e.g. cosmetics should not have sizes S/M/L)
preservedCurated.forEach(p => {
  const isCosmetic = ['COSMETICA_FACIAL', 'HIGIENE_CORPORAL', 'PERFUMERIA'].includes(p.category);
  const isFootwear = p.category === 'CALZADO';
  const isAccessory = p.category === 'BOLSOS_ACCESORIOS';

  if (isCosmetic) {
    if (!p.details) p.details = {};
    if (!p.details.volume) {
      // deduce volume from name
      const volMatch = p.name.match(/(\d+\s*(?:ml|g|oz))/i);
      p.details.volume = volMatch ? volMatch[1] : 'Envase Estándar';
    }
    p.sizes = [p.details.volume];
    p.details.size = [p.details.volume];
  } else if (isFootwear) {
    if (!p.sizes || p.sizes.includes('S') || p.sizes.includes('M')) {
      p.sizes = ['37', '38', '39', '40'];
    }
    if (p.details) p.details.size = p.sizes;
  } else if (isAccessory) {
    p.sizes = ['Talla Única'];
    if (p.details) p.details.size = ['Talla Única'];
  }
});

// Combine Sindy 54 + Curated Preserved
const finalCatalog = [...SINDY_54_PRODUCTS, ...preservedCurated];

// Ensure every single product has all required Product fields
finalCatalog.forEach(p => {
  if (!p.created_at) p.created_at = "2026-09-22T08:00:00.000Z";
  if (!p.updated_at) p.updated_at = "2026-09-22T08:00:00.000Z";
  if (p.price === undefined) p.price = p.priceFCFA || 0;
  if (p.in_stock === undefined) p.in_stock = p.inStock ?? true;
  if (p.is_hidden === undefined) p.is_hidden = false;
  if (p.is_featured === undefined) p.is_featured = p.featured ?? false;
  if (!p.sizes) p.sizes = p.details?.size || ["Talla Única"];
  if (!p.colors) p.colors = ["Original"];
});

console.log('Final Total Products in Catalog:', finalCatalog.length);

// Rebuild demoData.ts with pristine formatting
const header = oldContent.slice(0, oldContent.indexOf('export const INITIAL_PRODUCTS: Product[] ='));
const footerIndex = oldContent.indexOf('export const INITIAL_PROFILES: Profile[] =');
const footer = oldContent.slice(footerIndex);

const newContent = `${header}export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(finalCatalog, null, 2)};\n\n${footer}`;

fs.writeFileSync('src/lib/demoData.ts', newContent, 'utf8');
console.log('Successfully updated src/lib/demoData.ts!');
