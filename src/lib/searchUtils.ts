import type { Product } from '../types';

/**
 * Normalizes text for professional ecommerce search:
 * - Lowercase
 * - Removes accents / diacritics (á -> a, é -> e, etc.)
 * - Replaces ñ with n
 * - Trims excess whitespace
 */
export function normalizeSearch(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Professional ecommerce scoring algorithm:
 * - Checks initials first (words in title starting with query)
 * - Checks title containing query
 * - Checks category, subcategory and description
 * Returns 0 if no match, or a score >= 20 based on match relevance.
 */
export function getProductSearchScore(product: Product, rawQuery: string): number {
  const clean = normalizeSearch(rawQuery);
  if (!clean) return 1;

  const tokens = clean.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 1;

  const name = normalizeSearch(product.name);
  const nameWords = name.split(/\s+/).filter(Boolean);
  const category = normalizeSearch((product.category || '').replace(/_/g, ' '));
  const subcategory = normalizeSearch(product.subcategory || '');
  const brand = normalizeSearch(product.brand || '');
  const sku = normalizeSearch(product.sku || '');
  const desc = normalizeSearch(product.description || '');
  const colors = Array.isArray(product.colors) 
    ? product.colors.map(c => normalizeSearch(c)).filter(Boolean) 
    : [];

  let totalScore = 0;

  for (const token of tokens) {
    let tokenScore = 0;

    // 1. Initial match: Title begins with this token (Highest Priority)
    if (name.startsWith(token)) {
      tokenScore = Math.max(tokenScore, 100);
    }
    // 2. Initial match: Any word in the title starts with this token (e.g. "sirena", "drapeado", "soleil")
    else if (nameWords.some(w => w.startsWith(token))) {
      tokenScore = Math.max(tokenScore, 85);
    }
    // 3. Title contains the token
    else if (name.includes(token)) {
      tokenScore = Math.max(tokenScore, 70);
    }
    // 4. SKU or Brand starts with or contains token
    else if (sku.startsWith(token) || brand.startsWith(token)) {
      tokenScore = Math.max(tokenScore, 60);
    }
    // 5. Category or Subcategory starts with token
    else if (category.startsWith(token) || subcategory.startsWith(token)) {
      tokenScore = Math.max(tokenScore, 50);
    }
    // 6. Color matches
    else if (colors.some(c => c.startsWith(token) || c.includes(token))) {
      tokenScore = Math.max(tokenScore, 45);
    }
    // 7. Category or Subcategory contains token
    else if (category.includes(token) || subcategory.includes(token)) {
      tokenScore = Math.max(tokenScore, 35);
    }
    // 8. Description contains token
    else if (desc.includes(token)) {
      tokenScore = Math.max(tokenScore, 20);
    } 
    else {
      // Token did NOT match this product in any way: exclude!
      return 0;
    }

    totalScore += tokenScore;
  }

  return totalScore;
}

/**
 * Filter and sort products using professional initial-first relevance scoring
 */
export function filterProductsBySearch(products: Product[], query: string): Product[] {
  const clean = normalizeSearch(query);
  if (!clean) return products;

  const scored: { product: Product; score: number }[] = [];

  for (const p of products) {
    const score = getProductSearchScore(p, clean);
    if (score > 0) {
      scored.push({ product: p, score });
    }
  }

  // Sort by highest score first (exact initials come first)
  scored.sort((a, b) => b.score - a.score);

  return scored.map(item => item.product);
}
