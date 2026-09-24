import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '../../env';

export async function createServerClient() {
  const cookieStore = await cookies();

  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorado en Server Components puros
          }
        },
      },
    }
  );
}
