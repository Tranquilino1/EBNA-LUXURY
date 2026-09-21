import type { Product } from '../types';

const ORDER_STORAGE_KEY = 'ebna_product_orders_map';
const VIEW_STORAGE_KEY = 'ebna_product_views_map';

// Helper to get local order counts map from localStorage
function getLocalOrderMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Helper to get local view counts map from localStorage
function getLocalViewMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(VIEW_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Deterministic baseline order generator based on product ID to give initial catalog realistic sales counts.
 */
export function getBaselineOrders(product: Product): number {
  const numericId = parseInt(product.id.replace(/\D/g, ''), 10) || 1;
  // Pseudorandom baseline orders between 12 and 180
  const seed = (numericId * 37 + product.name.length * 13) % 168;
  return 12 + seed;
}

/**
 * Returns total orders count for a product (Baseline + user orders)
 */
export function getProductOrdersCount(product: Product): number {
  const localMap = getLocalOrderMap();
  const addedOrders = localMap[product.id] || localMap[product.slug] || 0;
  const dbOrders = product.order_count || product.sales_count || 0;
  return Math.max(dbOrders, getBaselineOrders(product)) + addedOrders;
}

/**
 * Returns total views count for a product
 */
export function getProductViewsCount(product: Product): number {
  const localMap = getLocalViewMap();
  const addedViews = localMap[product.id] || localMap[product.slug] || 0;
  const dbViews = product.views_count || 0;
  return Math.max(dbViews, Math.floor(getBaselineOrders(product) * 3.5)) + addedViews;
}

/**
 * Calculates priority score for sorting featured collections.
 * PriorityScore = (Orders * 20) + (Views * 1) + (Featured ? 100 : 0) + StockBonus
 */
export function calculatePriorityScore(product: Product): number {
  const orders = getProductOrdersCount(product);
  const views = getProductViewsCount(product);
  const featuredBonus = product.is_featured ? 100 : 0;
  const stockBonus = product.in_stock ? 30 : 0;

  return (orders * 20) + (views * 1) + featuredBonus + stockBonus;
}

/**
 * Sorts products array by priority (Most sold / ordered products first)
 */
export function getSortedByPopularity(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const scoreA = calculatePriorityScore(a);
    const scoreB = calculatePriorityScore(b);
    return scoreB - scoreA;
  });
}

/**
 * Increments order count for a product when a user initiates a purchase (WhatsApp / Muni Dinero)
 */
export function recordProductOrder(productId: string): void {
  try {
    const localMap = getLocalOrderMap();
    localMap[productId] = (localMap[productId] || 0) + 1;
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(localMap));
    window.dispatchEvent(new Event('ebna_product_ordered'));
  } catch (e) {
    console.warn('Error recording product order:', e);
  }
}

/**
 * Increments view count for a product when opened/inspected
 */
export function recordProductView(productId: string): void {
  try {
    const localMap = getLocalViewMap();
    localMap[productId] = (localMap[productId] || 0) + 1;
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(localMap));
  } catch (e) {
    console.warn('Error recording product view:', e);
  }
}
