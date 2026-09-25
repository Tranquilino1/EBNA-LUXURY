/**
 * Image Optimizer & Compressor for Universal Permanent Uploads
 * Converts local files from PC/Mobile to lightweight, ultra-crisp permanent DataURLs and compressed files.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  file: File;
  originalSize: number;
  compressedSize: number;
}

/**
 * Compresses an image file from the user's PC using HTML5 Canvas
 * Downscales large camera photos (e.g. 5MB-15MB) to ~50KB-120KB without visible quality loss.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.84
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('El archivo seleccionado no es una imagen válida'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Error al leer el archivo de imagen'));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Error al decodificar la imagen'));

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if 2d context fails
          const rawDataUrl = reader.result as string;
          resolve({
            dataUrl: rawDataUrl,
            file,
            originalSize: file.size,
            compressedSize: file.size
          });
          return;
        }

        // Smooth high quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for optimal size/quality ratio, fallback to JPEG
        const mimeType = 'image/webp';
        let dataUrl = canvas.toDataURL(mimeType, quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                dataUrl,
                file,
                originalSize: file.size,
                compressedSize: file.size
              });
              return;
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
            const compressedFile = new File([blob], cleanFileName, {
              type: blob.type || 'image/webp',
              lastModified: Date.now()
            });

            resolve({
              dataUrl,
              file: compressedFile,
              originalSize: file.size,
              compressedSize: blob.size
            });
          },
          'image/webp',
          quality
        );
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
