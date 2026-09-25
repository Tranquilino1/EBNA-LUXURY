import type { Product } from '../types';

/**
 * Normalizes text for professional ecommerce search:
 * - Lowercase
 * - Removes accents / diacritics (á -> a, é -> e, etc.)
 * - Replaces ñ with n, ü with u
 * - Removes non-alphanumeric noise
 * - Trims excess whitespace
 */
export function normalizeSearch(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Simple Spanish stemmer / singularizer for common e-commerce terms
 * e.g. "vestidos" -> "vestido", "cremas" -> "crema", "perfumes" -> "perfume"
 */
export function toStem(word: string): string {
  if (word.length <= 4) return word;
  if (word.endsWith('es') && !['tres', 'mes'].includes(word)) {
    return word.slice(0, -2);
  }
  if (word.endsWith('s') && !['gris', 'paris', 'ebna', 'plus'].includes(word)) {
    return word.slice(0, -1);
  }
  return word;
}

/**
 * Fast Levenshtein distance for typo-tolerant fuzzy matching (like Google's Did You Mean)
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (Math.abs(a.length - b.length) > 2) return 99; // Quick rejection

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * High-precision Google-grade scoring algorithm for EBNA Luxury
 * Prioritizes exact matches, title initials, category terms, and tolerates minor typos.
 */
export function getProductSearchScore(product: Product, rawQuery: string): number {
  const clean = normalizeSearch(rawQuery);
  if (!clean) return 1;

  const rawName = normalizeSearch(product.name);
  const rawDesc = normalizeSearch(product.description || '');
  const rawCat = normalizeSearch((product.category || '').replace(/_/g, ' '));
  const rawSub = normalizeSearch(product.subcategory || '');
  const rawBrand = normalizeSearch(product.brand || '');
  const rawSku = normalizeSearch(product.sku || '');
  const rawColors = Array.isArray(product.colors) 
    ? product.colors.map(c => normalizeSearch(c)).filter(Boolean) 
    : [];

  // 1. Exact full phrase match (Google #1 spot)
  if (rawName === clean) return 3000;
  if (rawName.startsWith(clean)) return 2200;
  if (rawName.includes(clean)) return 1600;

  const tokens = clean.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 1;

  const nameWords = rawName.split(/\s+/).filter(Boolean);
  let totalScore = 0;
  let allTokensMatched = true;

  for (const token of tokens) {
    const stemmedToken = toStem(token);
    let tokenScore = 0;

    // Check exact word or prefix in Name (Highest Weight)
    if (rawName.startsWith(token) || rawName.startsWith(stemmedToken)) {
      tokenScore = Math.max(tokenScore, 1000);
    } else {
      const wordPrefixMatch = nameWords.some(w => w.startsWith(token) || toStem(w).startsWith(stemmedToken));
      if (wordPrefixMatch) {
        tokenScore = Math.max(tokenScore, 800);
      } else if (rawName.includes(token) || (stemmedToken.length >= 4 && rawName.includes(stemmedToken))) {
        tokenScore = Math.max(tokenScore, 600);
      }
    }

    // Check SKU & Brand
    if (rawSku === token || rawSku.startsWith(token)) {
      tokenScore = Math.max(tokenScore, 750);
    } else if (rawBrand.includes(token)) {
      tokenScore = Math.max(tokenScore, 500);
    }

    // Check Category & Subcategory
    if (rawSub.startsWith(token) || rawCat.startsWith(token)) {
      tokenScore = Math.max(tokenScore, 450);
    } else if (rawSub.includes(token) || rawCat.includes(token)) {
      tokenScore = Math.max(tokenScore, 350);
    }

    // Check Colors
    if (rawColors.some(c => c.startsWith(token) || c.includes(token))) {
      tokenScore = Math.max(tokenScore, 300);
    }

    // Check Description
    if (rawDesc.includes(token)) {
      tokenScore = Math.max(tokenScore, 180);
    }

    // Fuzzy / Typo tolerance (like Google "Quizás quisiste decir...")
    if (tokenScore === 0 && token.length >= 4) {
      const hasFuzzyName = nameWords.some(w => {
        if (Math.abs(w.length - token.length) > 2) return false;
        const maxDist = token.length >= 7 ? 2 : 1;
        return levenshteinDistance(w, token) <= maxDist;
      });
      if (hasFuzzyName) {
        tokenScore = Math.max(tokenScore, 220);
      }
    }

    if (tokenScore === 0) {
      allTokensMatched = false;
      break;
    }

    totalScore += tokenScore;
  }

  return allTokensMatched ? totalScore : 0;
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

  // Sort by highest score first (exact match and initials always at the top)
  scored.sort((a, b) => b.score - a.score);

  return scored.map(item => item.product);
}

export interface SearchSuggestion {
  product: Product;
  score: number;
  matchedCategory: string;
}

/**
 * Generates instant Google-style autocomplete suggestions as the user types
 */
export function getSearchAutocomplete(products: Product[], query: string, limit = 5): SearchSuggestion[] {
  const clean = normalizeSearch(query);
  if (!clean || clean.length < 1) return [];

  const scored: SearchSuggestion[] = [];

  for (const p of products) {
    const score = getProductSearchScore(p, clean);
    if (score > 0) {
      scored.push({
        product: p,
        score,
        matchedCategory: (p.subcategory || p.category || 'Colección').replace(/_/g, ' ')
      });
    }
  }

  // Sort by highest relevance score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

/**
 * Helper to split text into matched and non-matched chunks for visual query highlighting
 */
export function highlightMatch(text: string, query: string): { text: string; isMatch: boolean }[] {
  if (!text || !query.trim()) {
    return [{ text: text || '', isMatch: false }];
  }

  const cleanQuery = normalizeSearch(query);
  const cleanText = normalizeSearch(text);

  if (!cleanQuery) return [{ text, isMatch: false }];

  // Find position in normalized string
  const index = cleanText.indexOf(cleanQuery);
  if (index === -1) {
    // Try first token
    const firstToken = cleanQuery.split(' ')[0];
    const tokenIndex = cleanText.indexOf(firstToken);
    if (tokenIndex !== -1 && firstToken.length >= 2) {
      const start = text.slice(0, tokenIndex);
      const match = text.slice(tokenIndex, tokenIndex + firstToken.length);
      const end = text.slice(tokenIndex + firstToken.length);
      return [
        { text: start, isMatch: false },
        { text: match, isMatch: true },
        { text: end, isMatch: false }
      ].filter(item => item.text.length > 0);
    }
    return [{ text, isMatch: false }];
  }

  const start = text.slice(0, index);
  const match = text.slice(index, index + query.trim().length);
  const end = text.slice(index + query.trim().length);

  return [
    { text: start, isMatch: false },
    { text: match, isMatch: true },
    { text: end, isMatch: false }
  ].filter(item => item.text.length > 0);
}
