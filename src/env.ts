import { z } from 'zod';

const envSchema = z.object({
  // Base de datos LibSQL (Turso)
  TURSO_DATABASE_URL: z.string().min(1, 'TURSO_DATABASE_URL es requerida').url('Debe ser una URL válida (libsql:// o https://)'),
  TURSO_AUTH_TOKEN: z.string().min(1, 'TURSO_AUTH_TOKEN es requerido'),

  // Autenticación Supabase (Solo Auth)
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_URL es requerida').url('Debe ser una URL válida'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY es requerida'),

  // Almacenamiento Cloudflare R2
  R2_ACCOUNT_ID: z.string().min(1, 'R2_ACCOUNT_ID es requerido'),
  R2_ACCESS_KEY_ID: z.string().min(1, 'R2_ACCESS_KEY_ID es requerido'),
  R2_SECRET_ACCESS_KEY: z.string().min(1, 'R2_SECRET_ACCESS_KEY es requerido'),
  R2_BUCKET_NAME: z.string().min(1, 'R2_BUCKET_NAME es requerido'),
  NEXT_PUBLIC_R2_PUBLIC_URL: z.string().min(1, 'NEXT_PUBLIC_R2_PUBLIC_URL es requerida').url('Debe ser una URL pública válida'),
});

const processEnv = {
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  NEXT_PUBLIC_R2_PUBLIC_URL: process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.warn('⚠️ Advertencia en inicialización de variables de entorno:');
  console.warn(JSON.stringify(parsed.error.format(), null, 2));
}

export const env = (parsed.success ? parsed.data : processEnv) as z.infer<typeof envSchema>;
