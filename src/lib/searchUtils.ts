import type { Product } from '../types';

/**
 * Normalizes text for universal fuzzy searching:
 * - Lowercase
 * - Removes diacritics/accents (á -> a, é -> e, etc.)
 * - Normalizes ñ -> n
 * - Replaces punctuation and special chars with space
 */
export function normalizeSearchText(text: string): string {
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
 * Calculates fast Levenshtein similarity distance between two words
 */
function isSimilarWord(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 2) return false;

  // Substring or prefix match
  if (a.startsWith(b) || b.startsWith(a) || a.includes(b) || b.includes(a)) {
    return true;
  }

  // Maximum allowed character differences: 1 for words 4-6 chars, 2 for longer
  const maxDiff = a.length >= 7 || b.length >= 7 ? 2 : 1;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + cost
      );
    }
    prev = curr;
  }

  return prev[b.length] <= maxDiff;
}

/**
 * Builds the searchable corpus for a product
 */
export function buildProductCorpus(product: Product): { corpusText: string; words: string[] } {
  const parts = [
    product.name,
    product.description || '',
    product.category || '',
    (product.category || '').replace(/_/g, ' '),
    product.subcategory || '',
    product.brand || '',
    product.sku || '',
    product.slug || '',
    Array.isArray(product.colors) ? product.colors.join(' ') : '',
    Array.isArray(product.sizes) ? product.sizes.join(' ') : '',
    product.details?.material || '',
    product.details?.volume || '',
  ];

  const corpusText = normalizeSearchText(parts.join(' '));
  const words = corpusText.split(/\s+/).filter(Boolean);
  return { corpusText, words };
}

/**
 * Evaluates whether a product matches a universal search query
 * Supports multi-token, prefix, accent-free, and fuzzy resemblance
 */
export function matchesUniversalSearch(product: Product, rawQuery: string): boolean {
  const cleanQuery = normalizeSearchText(rawQuery);
  if (!cleanQuery) return true;

  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 0) return true;

  const { corpusText, words } = buildProductCorpus(product);

  // Fast path: if the exact cleaned query is a substring of the corpus
  if (corpusText.includes(cleanQuery)) {
    return true;
  }

  // Every token in the query must match at least one word in the product
  return queryTokens.every(token => {
    // 1. Direct substring in the full corpus
    if (corpusText.includes(token)) return true;

    // 2. Token-level matching with fuzzy tolerance for typos and similar words
    return words.some(word => {
      // Direct word match or prefix match
      if (word.startsWith(token) || token.startsWith(word) || word.includes(token)) {
        return true;
      }
      // If both token and word are at least 4 letters, check fuzzy resemblance
      if (token.length >= 4 && word.length >= 3) {
        return isSimilarWord(word, token);
      }
      return false;
    });
  });
}
