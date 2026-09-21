const fs = require('fs');
const path = require('path');

const clothingDir = path.join(__dirname, '../public/products/dataset_clothing/dataset_clothing_images-main');
const sheinCsvPath = path.join(__dirname, '../public/products/shein_dataset/Shein-dataset-samples-main/shein-products.csv');

// Category translation and naming map for local clothing dataset
const clothingCategories = {
  dress: {
    category: 'MODA',
    namePrefixes: ['Vestido de Noche Silk Elegance', 'Vestido Casual Chic Floral', 'Vestido Midi Bodycon Luxury', 'Vestido Satinado Night Glam', 'Vestido Plisado Haute Couture'],
    descriptions: [
      'Vestido exclusivo confeccionado en tela suave con acabado satinado. Ideal para eventos de noche, cenas elegantes y fiestas glamurosas.',
      'Diseño fresco y moderno con corte favorecedor que realza la silueta. Tejido de alta calidad transpirable y cómodo.'
    ],
    basePrices: [12500, 16000, 19500, 24000, 14500] // halved prices in FCFA
  },
  hat: {
    category: 'ACCESORIOS',
    namePrefixes: ['Sombrero Fedora Vintage Leather', 'Gorja Streetwear Urban Trend', 'Sombrero de Sol Wide Brim Sunhat', 'Gorro Tejido Cashmere Warm', 'Boina Francesa Chic Velvet'],
    descriptions: [
      'Accesorio sofisticado fabricado con materiales premium. Aporta un toque distinguido y elegante a cualquier outfit urbano o formal.',
      'Diseño ergonómico y ajuste perfecto. Protección solar y estilo atemporal para toda ocasión.'
    ],
    basePrices: [3500, 4500, 6000, 7500, 5000]
  },
  longsleeve: {
    category: 'MODA',
    namePrefixes: ['Camisa Manga Larga Silk Touch', 'Blusa Elegante Executive Fit', 'Suéter Fino Knitwear Autumn', 'Camiseta Manga Larga Premium Cotton', 'Top Ajustado Glamour Night'],
    descriptions: [
      'Prenda de manga larga con textura ultra suave y caída perfecta. Confeccionada con algodón de fibras largas y seda.',
      'Diseño sofisticado ideal tanto para la oficina como para salidas casuales con estilo único.'
    ],
    basePrices: [7500, 9500, 11000, 13500, 8500]
  },
  outwear: {
    category: 'MODA',
    namePrefixes: ['Chaqueta Blazer Executive Gold', 'Abrigo Largo Winter Velvet', 'Cazadora de Cuero Leather Jacket', 'Chaqueta Deportiva Tech Fleece', 'Chaqueta Denim Oversized Luxury'],
    descriptions: [
      'Abrigo de corte impecable con acabados de alta costura. Protección contra el frío sin perder elegancia ni sofisticación.',
      'Cazadora de estilo moderno y versátil. Detalles de costura reforzados y forro interior térmico premium.'
    ],
    basePrices: [18500, 22000, 26000, 29000, 16500]
  },
  pants: {
    category: 'MODA',
    namePrefixes: ['Pantalón Vestir Tailored Fit', 'Jeans Denim High Waist Stretch', 'Pantalón Cargo Street Style', 'Pantalón Palazzo Silk Wave', 'Jogger Fit Sport Chic'],
    descriptions: [
      'Pantalón confeccionado con tejidos stretch de primera calidad. Corte estructurado que ofrece máximo confort y elegancia.',
      'Jeans de tiro alto con lavado exclusivo y ajuste perfecto que resalta las curvas naturales.'
    ],
    basePrices: [9500, 12000, 14500, 16000, 11000]
  },
  shirt: {
    category: 'MODA',
    namePrefixes: ['Camisa Oxford Classic Cotton', 'Camisa Estampada Silk Pattern', 'Camisa Casual Linen Breeze', 'Blusa Formal Slim Silhouette', 'Camisa Satinada Party Glam'],
    descriptions: [
      'Camisa de vestir de corte perfecto y tela anti-arrugas. Confección premium con botones reforzados y acabado suave.',
      'Camisa fresca de lino y algodón orgánico. Estilo atemporal y confort duradero durante todo el día.'
    ],
    basePrices: [8000, 10500, 12500, 15000, 9000]
  },
  shoes: {
    category: 'MODA',
    namePrefixes: ['Stilettos Elegantes Glamour Heels', 'Zapatillas Urban Sneakers White', 'Mocasines Leather Classic', 'Sandalias de Tacón Gold Sparkle', 'Botines de Cuero Ankle Boots'],
    descriptions: [
      'Calzado exclusivo diseñado con plantilla acolchada para máxima comodidad sin renunciar al glamour y la elegancia.',
      'Zapatillas deportivas urbanas de alta calidad con suela amortiguada y acabados de lujo.'
    ],
    basePrices: [14500, 18000, 21500, 25000, 19000]
  },
  shorts: {
    category: 'MODA',
    namePrefixes: ['Shorts Denim Vintage Cutoff', 'Bermuda Elegante Linen Tailored', 'Shorts Deportivos Athletic Fit', 'Shorts de Cuero High Waist', 'Shorts Casual Summer Breeze'],
    descriptions: [
      'Shorts modernos confeccionados en mezclilla de primera calidad con detalles deshilachados estilo vintage.',
      'Bermuda de corte sartorial en lino transpirable. Combinación ideal para climas cálidos con estilo sofisticado.'
    ],
    basePrices: [5500, 7000, 8500, 9500, 6500]
  },
  skirt: {
    category: 'MODA',
    namePrefixes: ['Falda Midi Plisada Satin Silk', 'Falda Tubo Executive Pencil', 'Falda Corta Leather Glam', 'Falda Larga Boho Chic Floral', 'Falda Asimétrica Modern Fit'],
    descriptions: [
      'Falda de diseño fluido con caída espectacular y cintura elastizada de confort. Ideal para combinar con tops elegantes.',
      'Falda sartorial de tiro alto que define la figura con sofisticación profesional.'
    ],
    basePrices: [7500, 9000, 11500, 13000, 8500]
  },
  't-shirt': {
    category: 'MODA',
    namePrefixes: ['Camiseta Graphic Vintage Print', 'T-Shirt Oversized Streetwear', 'Camiseta Básica Pima Cotton', 'Top Deportivo Breathable Mesh', 'Camiseta Logo Luxury Gold'],
    descriptions: [
      'Camiseta confeccionada en 100% algodón Pima peruano ultra suave. Estampa duradera y corte moderno.',
      'Camiseta estilo oversized con caída relajada y costuras reforzadas para máxima durabilidad.'
    ],
    basePrices: [4500, 5500, 6500, 7500, 5000]
  }
};

// Process local clothing dataset
const products = [];
let idCounter = 300;

Object.keys(clothingCategories).forEach(folder => {
  const folderPath = path.join(clothingDir, folder);
  if (!fs.existsSync(folderPath)) return;
  const config = clothingCategories[folder];
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  // Take up to 15 best images per category to build a rich 150+ catalog
  const selectedFiles = files.slice(0, 15);
  selectedFiles.forEach((file, index) => {
    const id = `c3333333-3333-4333-8333-${(idCounter++).toString().padStart(12, '0')}`;
    const namePrefix = config.namePrefixes[index % config.namePrefixes.length];
    const name = `${namePrefix} #${index + 1}`;
    const desc = config.descriptions[index % config.descriptions.length];
    const price = config.basePrices[index % config.basePrices.length];
    const imgPath = `/products/dataset_clothing/dataset_clothing_images-main/${folder}/${file}`;

    products.push({
      id,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name,
      category: config.category,
      description: desc,
      price,
      images: [imgPath],
      in_stock: true,
      created_at: new Date(Date.now() - index * 60000).toISOString(),
      updated_at: new Date().toISOString()
    });
  });
});

console.log(`Generated ${products.length} products from local clothing dataset.`);
