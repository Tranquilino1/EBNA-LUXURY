'use server';

import { createServerClient } from '../lib/supabase/server';
import { db } from '../db';
import { profiles } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { Result } from '../db/dal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function registerAction(formData: FormData): Promise<Result<{ userId: string }>> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;

  if (!email || !password || !fullName) {
    return { success: false, error: 'Todos los campos obligatorios deben completarse.' };
  }

  const supabase = await createServerClient();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { success: false, error: authError?.message || 'Error al crear la cuenta en Supabase Auth.' };
  }

  try {
    const now = Date.now();
    // Inserción idempotente en Turso LibSQL
    await db.insert(profiles).values({
      id: authData.user.id,
      email,
      fullName,
      phone: phone || null,
      role: 'customer',
      createdAt: now,
      updatedAt: now,
    }).onConflictDoUpdate({
      target: profiles.id,
      set: {
        fullName,
        phone: phone || null,
        updatedAt: now,
      },
    });

    return { success: true, data: { userId: authData.user.id } };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Error al registrar el perfil en Turso.' };
  }
}

export async function loginAction(formData: FormData): Promise<Result<{ redirectUrl: string }>> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email y contraseña requeridos.' };
  }

  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { success: false, error: 'Credenciales inválidas o cuenta no confirmada.' };
  }

  // Comprobar rol para redirección
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, data.user.id),
  });

  const redirectUrl = profile?.role === 'admin' ? '/admin' : '/catalogo';
  revalidatePath('/', 'layout');
  return { success: true, data: { redirectUrl } };
}

export async function logoutAction(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
