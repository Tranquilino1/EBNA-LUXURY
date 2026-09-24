'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client } from '../lib/r2';
import { env } from '../env';
import { verifyAdminSession, type Result } from '../db/dal';

const ALLOWED_MIME_TYPES = ['image/webp', 'image/jpeg', 'image/png'] as const;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface PresignedUrlResponse {
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

export async function getPresignedUploadUrl(
  fileName: string,
  contentType: string,
  fileSizeBytes: number
): Promise<Result<PresignedUrlResponse>> {
  // 1. Verificación obligatoria de rol administrador
  const adminCheck = await verifyAdminSession();
  if (!adminCheck.success) {
    return { success: false, error: adminCheck.error };
  }

  // 2. Validación de tipo MIME
  if (!ALLOWED_MIME_TYPES.includes(contentType as typeof ALLOWED_MIME_TYPES[number])) {
    return {
      success: false,
      error: `Formato no permitido (${contentType}). Solo se admiten: WebP, JPEG y PNG.`,
    };
  }

  // 3. Validación de tamaño máximo
  if (fileSizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      error: 'El archivo excede el tamaño máximo permitido de 10 MB.',
    };
  }

  try {
    const extension = fileName.split('.').pop()?.toLowerCase() || 'webp';
    const uniqueKey = `products/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME || 'ebna-luxury-bucket',
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: fileSizeBytes,
    });

    // 4. Generación de URL prefirmada con expiración corta (60 segundos)
    const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 60 });
    const publicUrlBase = env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-ebna.r2.dev';
    const publicUrl = `${publicUrlBase.replace(/\/$/, '')}/${uniqueKey}`;

    return {
      success: true,
      data: {
        uploadUrl,
        publicUrl,
        key: uniqueKey,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error al generar enlace prefirmado R2.',
    };
  }
}
