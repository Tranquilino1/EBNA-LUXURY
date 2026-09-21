import os
import re
import shutil
import json
import math

source_dir = r"c:\Users\RYESA\Documents\sindy luxury\IMG PRODUCTOS"
target_dir = r"c:\Users\RYESA\Documents\sindy luxury\public\products"

os.makedirs(target_dir, exist_ok=True)

files = os.listdir(source_dir)
print(f"Found {len(files)} files in IMG PRODUCTOS")

def round_price_clean(raw_price_fcfa):
    # Add 25% markup
    marked_up = raw_price_fcfa * 1.25
    # Round to clean 500 or 1000 FCFA approximation
    if marked_up > 10000:
        return math.ceil(marked_up / 1000.0) * 1000
    else:
        return math.ceil(marked_up / 500.0) * 500

products = []

categories_map = {
    "soap": "JABONES",
    "savon": "JABONES",
    "jabón": "JABONES",
    "jabon": "JABONES",
    "turmeric": "JABONES",
    "kojic": "JABONES",
    "palmolive": "JABONES",
    "galong": "JABONES",
    "asantee": "JABONES",
    "lotion": "COSMETICA",
    "loción": "COSMETICA",
    "locion": "COSMETICA",
    "cream": "COSMETICA",
    "crema": "COSMETICA",
    "serum": "COSMETICA",
    "sérum": "COSMETICA",
    "perfume": "COSMETICA",
    "parfum": "COSMETICA",
    "zara": "MODA",
    "dress": "MODA",
    "vestido": "MODA",
    "hoodie": "MODA",
    "sudadera": "MODA",
    "pant": "MODA",
    "pantalón": "MODA",
    "pants": "MODA",
    "short": "MODA",
    "shorts": "MODA",
    "tracksuit": "MODA",
    "chándal": "MODA",
    "skirt": "MODA",
    "falda": "MODA",
    "top": "MODA",
    "sneakers": "ACCESORIOS",
    "shoes": "ACCESORIOS",
    "zapatos": "ACCESORIOS",
    "zapatillas": "ACCESORIOS",
    "boots": "ACCESORIOS",
    "botas": "ACCESORIOS",
    "flats": "ACCESORIOS",
    "heels": "ACCESORIOS",
    "tacones": "ACCESORIOS",
    "crocs": "ACCESORIOS",
    "sandals": "ACCESORIOS",
    "sandalias": "ACCESORIOS",
    "bag": "ACCESORIOS",
    "bolso": "ACCESORIOS",
    "passport": "ACCESORIOS",
    "pasaporte": "ACCESORIOS",
    "bonnet": "ACCESORIOS",
    "touca": "ACCESORIOS",
    "glasses": "ACCESORIOS",
    "gafas": "ACCESORIOS",
    "lipstick": "COSMETICA",
    "labial": "COSMETICA",
    "lip": "COSMETICA",
    "scrub": "COSMETICA",
    "exfoliante": "COSMETICA",
    "vaseline": "VASELINAS",
    "vaselina": "VASELINAS",
    "avena": "COSMETICA",
    "topicrem": "COSMETICA",
}

default_colors_by_cat = {
    "MODA": ["Negro", "Blanco", "Rojo", "Azul Marino", "Verde Esmeralda", "Beige", "Gris Mate"],
    "ACCESORIOS": ["Negro", "Blanco", "Dorado", "Marrón", "Rosa Palo", "Plateado"],
    "JABONES": ["Naranja", "Amarillo Cúrcuma", "Blanco Crema", "Verde Natural"],
    "COSMETICA": ["Transparente", "Rosa", "Blanco Satinado", "Dorado Luxe"],
    "VASELINAS": ["Transparente", "Rosa Suave", "Azul Clásico", "Original"]
}

default_sizes_by_cat = {
    "MODA": ["S", "M", "L", "XL", "XXL"],
    "ACCESORIOS": ["37", "38", "39", "40", "41", "42"],
    "JABONES": ["100g", "150g", "200g", "Pack x3"],
    "COSMETICA": ["30ml", "50ml", "100ml", "200ml", "500ml"],
    "VASELINAS": ["50g", "100g", "250g", "Pack x4"]
}

for i, filename in enumerate(files, 1):
    src_path = os.path.join(source_dir, filename)
    if not os.path.isfile(src_path):
        continue

    # Clean target filename
    ext = os.path.splitext(filename)[1].lower()
    if not ext or ext not in ['.jpg', '.jpeg', '.png', '.webp', '.jfif']:
        ext = '.jpg'
    
    clean_target_name = f"catalog-prod-{i:03d}{ext}"
    dst_path = os.path.join(target_dir, clean_target_name)
    shutil.copy2(src_path, dst_path)

    raw_title = os.path.splitext(filename)[0]
    # Remove hash digits or URL tags
    clean_title = re.sub(r'^\d+\.', '', raw_title)
    clean_title = re.sub(r'^\d{10,}', '', clean_title)
    clean_title = clean_title.replace('_', ' ').replace('-', ' ').strip()
    
    if len(clean_title) < 5 or clean_title.isdigit():
        clean_title = f"Producto Exclusivo EBNA Luxury N°{i}"

    # Determine category
    category = "COSMETICA"
    title_lower = clean_title.lower()
    for kw, cat in categories_map.items():
        if kw in title_lower:
            category = cat
            break

    # Estimate Base Price in FCFA based on category
    if category == "MODA":
        base_price = 28000 if "dress" in title_lower or "suit" in title_lower or "vestido" in title_lower else 18000
    elif category == "ACCESORIOS":
        base_price = 22000 if "sneakers" in title_lower or "boots" in title_lower or "heels" in title_lower else 12000
    elif category == "VASELINAS":
        base_price = 3500
    elif category == "JABONES":
        base_price = 3000 if "pack" in title_lower or "12" in title_lower else 2200
    else:
        base_price = 8500 if "perfum" in title_lower or "lotion" in title_lower or "serum" in title_lower else 4500

    # Apply 25% markup & clean round up to nearest 500 or 1000 FCFA
    final_price = round_price_clean(base_price)

    # In stock state (approx 88% in stock, 12% out of stock for testing)
    in_stock = (i % 8 != 0)

    # Category colors & sizes
    colors = default_colors_by_cat.get(category, ["Blanco", "Negro", "Rosa", "Dorado"])
    sizes = default_sizes_by_cat.get(category, ["Standard"])

    # Slug
    slug_base = re.sub(r'[^a-z0-9]+', '-', clean_title.lower()).strip('-')
    if not slug_base:
        slug_base = f"producto-ebna-{i}"
    slug = f"{slug_base}-{i}"

    desc = f"{clean_title}. Producto original de alta calidad, seleccionado exclusivamente para el catálogo EBNA Luxury en Guinea Ecuatorial. Disponible en varios tonos y modelos con envío directo por WhatsApp."

    prod = {
        "id": f"prod-ebna-{i:03d}",
        "slug": slug,
        "name": clean_title[:80],
        "category": category,
        "description": desc,
        "price": final_price,
        "images": [f"/products/{clean_target_name}"],
        "in_stock": in_stock,
        "colors": colors[:5],
        "sizes": sizes[:5],
        "created_at": "2026-09-20T20:00:00Z",
        "updated_at": "2026-09-20T20:00:00Z"
    }
    products.append(prod)

print(f"Processed {len(products)} products.")

# Write json output
with open(r"c:\Users\RYESA\Documents\sindy luxury\scripts\processed_products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Saved processed_products.json successfully!")
