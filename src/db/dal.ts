import { eq, desc, and } from 'drizzle-orm';
import { db } from './index';
import { profiles, products } from './schema';
import { createServerClient } from '../lib/supabase/server';

// Patrón Canónico Result<T, E>
export type Result<T, E = string> = 
  | { success: true; data: T } 
  | { success: false; error: E };

// Helper interno para validación de sesión activa
export async function getAuthenticatedUser(): Promise<Result<{ id: string; email: string; role: 'admin' | 'customer' }>> {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return { success: false, error: 'Acceso denegado: Sesión no autenticada.' };
    }

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    });

    if (!profile) {
      return { success: false, error: 'Perfil de usuario no localizado en la base de datos.' };
    }

    return {
      success: true,
      data: {
        id: profile.id,
        email: profile.email,
        role: profile.role,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Fallo inesperado al validar credenciales.';
    return { success: false, error: message };
  }
}

// Helper interno para operaciones de nivel administrador
export async function verifyAdminSession(): Promise<Result<{ id: string; email: string }>> {
  const authResult = await getAuthenticatedUser();
  if (!authResult.success) {
    return authResult;
  }

  if (authResult.data.role !== 'admin') {
    return { success: false, error: 'Violación de seguridad: Se requieren permisos de Administrador.' };
  }

  return {
    success: true,
    data: {
      id: authResult.data.id,
      email: authResult.data.email,
    },
  };
}

// ----------------- CONSULTAS PÚBLICAS / CATÁLOGO -----------------

export async function getPublishedProducts(): Promise<Result<Array<typeof products.$inferSelect>>> {
  try {
    const items = await db.query.products.findMany({
      where: eq(products.status, 'published'),
      orderBy: [desc(products.createdAt)],
    });
    return { success: true, data: items };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Error al consultar catálogo.' };
  }
}

export async function getProductBySlug(slug: string): Promise<Result<typeof products.$inferSelect>> {
  try {
    const item = await db.query.products.findFirst({
      where: and(eq(products.slug, slug), eq(products.status, 'published')),
    });

    if (!item) {
      return { success: false, error: 'Producto no encontrado.' };
    }

    return { success: true, data: item };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Error al obtener producto.' };
  }
}

// ----------------- OPERACIONES PROTEGIDAS (ADMIN) -----------------

export interface CreateProductInput {
  slug: string;
  title: string;
  description: string;
  price: number; // Entero
  currency?: string;
  stock: number;
  status: 'draft' | 'published';
  categoryId?: string;
  mainImageUrl: string;
  galleryImages?: string[];
  isFeatured?: boolean;
}

export async function createProductSecure(input: CreateProductInput): Promise<Result<typeof products.$inferSelect>> {
  const adminCheck = await verifyAdminSession();
  if (!adminCheck.success) {
    return { success: false, error: adminCheck.error };
  }

  try {
    const id = `prod_${crypto.randomUUID()}`;
    const now = Date.now();

    const newProduct = {
      id,
      slug: input.slug,
      title: input.title,
      description: input.description,
      price: Math.round(input.price),
      currency: input.currency || 'XAF',
      stock: input.stock,
      status: input.status,
      categoryId: input.categoryId || null,
      mainImageUrl: input.mainImageUrl,
      galleryImages: JSON.stringify(input.galleryImages || []),
      isFeatured: input.isFeatured ? 1 : 0,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(products).values(newProduct);
    return { success: true, data: newProduct };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Error al persistir producto en Turso.' };
  }
}
