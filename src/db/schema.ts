import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// 1. Tabla de Perfiles vinculada a Supabase Auth
export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(), // UUID idéntico a auth.users.id
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  phone: text('phone'),
  role: text('role', { enum: ['admin', 'customer'] }).notNull().default('customer'),
  shippingAddress: text('shipping_address'),
  billingAddress: text('billing_address'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

// 2. Tabla de Categorías de Lujo
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  parentId: text('parent_id'),
  isActive: integer('is_active').notNull().default(1), // 1 = activo, 0 = inactivo
  createdAt: integer('created_at').notNull(),
}, (table) => ({
  slugIdx: index('categories_slug_idx').on(table.slug),
}));

// 3. Tabla de Productos
export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(), // Almacenado como entero (Unidad mínima / Céntimos)
  currency: text('currency').notNull().default('XAF'),
  stock: integer('stock').notNull().default(0),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
  mainImageUrl: text('main_image_url').notNull(), // Cloudflare R2
  galleryImages: text('gallery_images').notNull().default('[]'), // Array serializado JSON
  isFeatured: integer('is_featured').notNull().default(0), // 0 o 1
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
}, (table) => ({
  slugIdx: index('products_slug_idx').on(table.slug),
  statusIdx: index('products_status_idx').on(table.status),
  categoryIdx: index('products_category_idx').on(table.categoryId),
}));

// 4. Tabla de Órdenes
export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerId: text('customer_id').references(() => profiles.id, { onDelete: 'set null' }),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address').notNull(),
  totalAmount: integer('total_amount').notNull(),
  currency: text('currency').notNull().default('XAF'),
  status: text('status', { 
    enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'] 
  }).notNull().default('pending'),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status', { 
    enum: ['unpaid', 'paid', 'refunded'] 
  }).notNull().default('unpaid'),
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
}, (table) => ({
  orderNumberIdx: index('orders_number_idx').on(table.orderNumber),
  customerIdx: index('orders_customer_idx').on(table.customerId),
}));

// 5. Tabla de Artículos por Orden (Snapshot Inmutable)
export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull().references(() => products.id),
  productTitle: text('product_title').notNull(),
  unitPrice: integer('unit_price').notNull(),
  quantity: integer('quantity').notNull(),
  selectedSize: text('selected_size'),
  selectedColor: text('selected_color'),
  itemSubtotal: integer('item_subtotal').notNull(),
  createdAt: integer('created_at').notNull(),
}, (table) => ({
  orderIdx: index('order_items_order_idx').on(table.orderId),
}));

// Definición de Relaciones Drizzle
export const profilesRelations = relations(profiles, ({ many }) => ({
  orders: many(orders),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'category_hierarchy',
  }),
  subcategories: many(categories, {
    relationName: 'category_hierarchy',
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(profiles, {
    fields: [orders.customerId],
    references: [profiles.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
