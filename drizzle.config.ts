import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'libsql://dummy-url.turso.io',
    authToken: process.env.TURSO_AUTH_TOKEN || 'dummy-token',
  },
  verbose: true,
  strict: true,
});
