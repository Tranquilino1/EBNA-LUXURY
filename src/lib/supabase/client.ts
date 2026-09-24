import { createBrowserClient } from '@supabase/ssr';
import { env } from '../../env';

let clientInstance: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (clientInstance) return clientInstance;

  clientInstance = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return clientInstance;
}
