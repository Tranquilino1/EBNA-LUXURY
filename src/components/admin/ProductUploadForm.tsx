'use client';

import React, { useState } from 'react';
import { getPresignedUploadUrl } from '../../actions/storage';
import { createProductSecure } from '../../db/dal';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ProductUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Campos del Producto
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('1');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Debe seleccionar una imagen para el producto.');
      return;
    }

    const priceNumber = parseInt(price, 10);
    const stockNumber = parseInt(stock, 10);

    if (isNaN(priceNumber) || priceNumber <= 0) {
      setErrorMessage('El precio debe ser un número entero válido en FCFA.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setUploadProgress(10);

    try {
      // Paso 1: Obtener URL prefirmada PUT de Vercel (Payload ligero)
      const presignedRes = await getPresignedUploadUrl(file.name, file.type, file.size);
      if (!presignedRes.success) {
        throw new Error(presignedRes.error);
      }

      setUploadProgress(40);
      const { uploadUrl, publicUrl } = presignedRes.data;

      // Paso 2: Subida DIRECTA desde el navegador hacia Cloudflare R2
      const uploadRequest = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadRequest.ok) {
        throw new Error(`Fallo en la transferencia a Cloudflare R2: Status ${uploadRequest.status}`);
      }

      setUploadProgress(80);

      // Paso 3: Persistir metadatos en Turso (LibSQL)
      const dbRes = await createProductSecure({
        slug: slug.trim().toLowerCase(),
        title: title.trim(),
        description: description.trim(),
        price: priceNumber,
        currency: 'XAF',
        stock: isNaN(stockNumber) ? 0 : stockNumber,
        status: 'published',
        mainImageUrl: publicUrl,
        galleryImages: [],
        isFeatured: false,
      });

      if (!dbRes.success) {
        throw new Error(dbRes.error);
      }

      setUploadProgress(100);
      setSuccessMessage(`Producto "${title}" guardado e indexado con éxito.`);
      
      // Limpieza de formulario
      setFile(null);
      setPreview(null);
      setTitle('');
      setSlug('');
      setPrice('');
      setDescription('');
      setStock('1');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error no controlado durante la subida.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Alta de Producto de Lujo (R2 Direct Upload)</h2>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 text-sm border border-red-200">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3 text-sm border border-green-200">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Título del Producto</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            }}
            placeholder="Ej. Vestido Gala Seda Imperial"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Slug URL Único</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
            placeholder="vestido-gala-seda-imperial"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Precio (FCFA - Entero)</label>
          <input
            type="number"
            required
            min="100"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25000"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Stock Disponible</label>
          <input
            type="number"
            required
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Descripción</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalles sobre tejido, confección, diseñador y tallaje..."
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* Selector de Imagen y Previsualización */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
          Imagen Principal (S3 / Cloudflare R2)
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg cursor-pointer transition">
            <Upload size={16} />
            <span>Seleccionar Imagen</span>
            <input type="file" accept="image/webp,image/jpeg,image/png" onChange={handleFileChange} className="hidden" />
          </label>
          {file && <span className="text-xs text-gray-600 font-mono">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>}
        </div>

        {preview && (
          <div className="mt-3 w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
            <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Barra de Progreso */}
      {isSubmitting && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Subiendo directamente a Cloudflare R2...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-black h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-black text-white font-bold rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2 transition"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Procesando...</span>
          </>
        ) : (
          <span>Publicar Producto</span>
        )}
      </button>
    </form>
  );
}
