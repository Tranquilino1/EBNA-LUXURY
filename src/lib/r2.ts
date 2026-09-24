import { S3Client } from '@aws-sdk/client-s3';
import { env } from '../env';

// Cliente S3 configurado exclusivamente para Cloudflare R2
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID || 'dummy-account'}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID || 'dummy-key',
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || 'dummy-secret',
  },
});
