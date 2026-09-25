import type { OrderReceiptData } from '../types';
import { formatPrice } from './utils';

const PRIMARY_PHONE = '240555633687';

/**
 * Builds the official WhatsApp URL for the order receipt (concise and announces the generated ticket)
 */
export function buildReceiptWhatsAppUrl(order: OrderReceiptData): string {
  const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://ebna-luxury.vercel.app';
  const receiptCardUrl = `${baseUrl}/recibo?id=${order.orderId}&ref=${order.orderNumber}`;

  const shippingLabel = order.shippingType === 'express'
    ? '⚡ Express 3 Días (+3.000 FCFA)'
    : '📦 Estándar 5 a 7 Días (Gratis)';

  const paymentLabel = order.paymentMethod === 'muni'
    ? 'Muni Dinero (555439904)'
    : 'WhatsApp / Contra Entrega';

  // Compact, professional message emphasizing the attached ticket image
  const message = `✨ *SOLICITUD DE PEDIDO — SINDY LUXURY BY EBNA* ✨
━━━━━━━━━━━━━━━━━━━━━━
🎫 *FOLIO:* #${order.orderNumber}
📅 *FECHA:* ${order.createdAt}
👤 *CLIENTE:* ${order.customerName}
📞 *TELÉFONO:* ${order.customerPhone || 'N/A'}
📍 *ENTREGA:* ${order.customerAddress} (${order.region === 'insular' ? 'Bioko/Malabo' : 'Continental/Bata'})
🚚 *MODALIDAD:* ${shippingLabel}
💳 *PAGO:* ${paymentLabel}
⭐ *TOTAL A PAGAR: ${formatPrice(order.total)}*
━━━━━━━━━━━━━━━━━━━━━━
📸 *Ticket Oficial generado y descargado en mi dispositivo (adjunto la imagen en este chat).*
🔗 *Ver Comprobante Digital:* ${receiptCardUrl}

¿Me confirman recepción del pedido para empaque y despacho?`;

  const targetPhone = PRIMARY_PHONE;
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Copies the structured receipt summary to clipboard
 */
export async function copyReceiptSummary(order: OrderReceiptData): Promise<boolean> {
  const summary = `🧾 COMPROBANTE DE PEDIDO SINDY LUXURY BY EBNA
Folio: #${order.orderNumber}
Fecha: ${order.createdAt}
Cliente: ${order.customerName}
Teléfono: ${order.customerPhone || 'N/A'}
Dirección: ${order.customerAddress} (${order.region === 'insular' ? 'Bioko/Malabo' : 'Continental/Bata'})
Modalidad de Envío: ${order.shippingType === 'express' ? 'Express 3 Días (+3.000 FCFA)' : 'Estándar Gratis (5-7 días)'}
Método de Pago: ${order.paymentMethod === 'muni' ? 'Muni Dinero (555439904)' : 'WhatsApp / Contra Entrega'}
Total a Pagar: ${formatPrice(order.total)}`;

  try {
    await navigator.clipboard.writeText(summary);
    return true;
  } catch (err) {
    console.error('Error copying to clipboard:', err);
    return false;
  }
}

/**
 * Helper to safely load an image for canvas drawing without tainting
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export interface GeneratedTicketResult {
  dataUrl: string;
  blob: Blob | null;
  filename: string;
  copiedToClipboard: boolean;
}

/**
 * Generates an elegant, compact standard-size ticket (2x DPI)
 * Silently downloads the PNG file and copies image to clipboard for easy WhatsApp pasting.
 */
export async function generateAndDownloadReceipt(
  order: OrderReceiptData,
  theme: 'haute-couture' | 'obsidian-gold' | 'editorial-vogue' = 'haute-couture'
): Promise<GeneratedTicketResult | null> {
  try {
    const width = 540;
    const headerHeight = 115;
    const customerHeight = 90;
    const itemsHeaderHeight = 35;
    const itemRowHeight = 62;
    const itemsTotalHeight = order.items.length * itemRowHeight;
    const totalsHeight = 110;
    const footerHeight = 60;
    const totalHeight = headerHeight + customerHeight + itemsHeaderHeight + itemsTotalHeight + totalsHeight + footerHeight;

    const canvas = document.createElement('canvas');
    const scale = 2; // Retina sharpness
    canvas.width = width * scale;
    canvas.height = totalHeight * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.scale(scale, scale);

    const isDark = theme === 'obsidian-gold';
    const isVogue = theme === 'editorial-vogue';

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, totalHeight);
    if (isDark) {
      bgGradient.addColorStop(0, '#0F172A');
      bgGradient.addColorStop(0.5, '#0B0F19');
      bgGradient.addColorStop(1, '#020617');
    } else if (isVogue) {
      bgGradient.addColorStop(0, '#FFFFFF');
      bgGradient.addColorStop(1, '#F8FAFC');
    } else {
      bgGradient.addColorStop(0, '#FFFFFF');
      bgGradient.addColorStop(0.35, '#FFF7F9');
      bgGradient.addColorStop(1, '#FCEBF1');
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, totalHeight);

    // Outer Border
    const borderBrand = isDark ? '#D4AF37' : '#D81B60';
    ctx.strokeStyle = borderBrand;
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, totalHeight - 20);

    // Inner fine border
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.25)' : 'rgba(216, 27, 96, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, totalHeight - 28);

    // Header Content
    let currentY = 38;

    // Brand Title
    ctx.textAlign = 'center';
    ctx.fillStyle = isDark ? '#F1E5C9' : '#1E1926';
    ctx.font = 'bold 22px "Playfair Display", Georgia, serif';
    ctx.fillText('SINDY LUXURY', width / 2, currentY);

    currentY += 18;
    ctx.font = '700 11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText('HAUTE COUTURE & BOUTIQUE VIP • GUINEA ECUATORIAL', width / 2, currentY);

    currentY += 16;
    // Sub-header Divider
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(216, 27, 96, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, currentY);
    ctx.lineTo(width / 2 + 120, currentY);
    ctx.stroke();

    currentY += 20;
    // Order Folio & Status Badge
    const badgeW = 340;
    const badgeX = (width - badgeW) / 2;
    ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.12)' : 'rgba(216, 27, 96, 0.08)';
    ctx.strokeStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(badgeX, currentY - 14, badgeW, 26, 13);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#FFD700' : '#C2185B';
    ctx.fillText(`FOLIO: #${order.orderNumber}  •  ${order.createdAt}`, width / 2, currentY + 3);

    // Customer Info Card (Compact 2-Column layout)
    currentY += 28;
    const boxX = 26;
    const boxW = width - 52;
    const cBoxH = 76;

    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF';
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.25)' : 'rgba(216, 27, 96, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, currentY, boxW, cBoxH, 10);
    ctx.fill();
    ctx.stroke();

    // Customer rows
    ctx.textAlign = 'left';
    ctx.font = 'bold 11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText('DATOS DE ENTREGA', boxX + 14, currentY + 18);

    ctx.font = '11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.fillText('Cliente:', boxX + 14, currentY + 36);
    ctx.fillText('Teléfono:', boxX + 14, currentY + 52);
    ctx.fillText('Dirección:', boxX + 14, currentY + 68);

    ctx.font = 'bold 11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
    ctx.fillText(order.customerName, boxX + 75, currentY + 36);
    ctx.fillText(order.customerPhone || 'Confirmado', boxX + 75, currentY + 52);

    const cleanAddr = order.customerAddress.length > 35 ? order.customerAddress.substring(0, 33) + '...' : order.customerAddress;
    ctx.fillText(cleanAddr, boxX + 75, currentY + 68);

    // Shipping Badge right-aligned in customer box
    const isExpress = order.shippingType === 'express';
    ctx.textAlign = 'right';
    ctx.font = 'bold 10px "Montserrat", sans-serif';
    ctx.fillStyle = isExpress ? '#D81B60' : '#16A34A';
    ctx.fillText(isExpress ? '⚡ ENVÍO EXPRESS (Máx. 3 Días)' : '📦 ENVÍO ESTÁNDAR (5-7 Días)', boxX + boxW - 14, currentY + 36);

    ctx.font = '10px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#CBD5E1' : '#64748B';
    ctx.fillText(order.region === 'insular' ? 'Malabo (Bioko)' : 'Bata (Continental)', boxX + boxW - 14, currentY + 52);

    // Items Header
    currentY += cBoxH + 18;
    ctx.textAlign = 'left';
    ctx.font = 'bold 11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText(`PRENDAS (${order.items.reduce((s, i) => s + i.quantity, 0)} unidades)`, boxX, currentY);

    ctx.textAlign = 'right';
    ctx.font = '600 10px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.fillText('SUBTOTAL', boxX + boxW, currentY);

    currentY += 8;
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(216, 27, 96, 0.2)';
    ctx.beginPath();
    ctx.moveTo(boxX, currentY);
    ctx.lineTo(boxX + boxW, currentY);
    ctx.stroke();

    currentY += 10;

    // Items list (Compact rows)
    for (const item of order.items) {
      const rowY = currentY;
      const thumbSize = 46;

      // Thumbnail frame
      ctx.fillStyle = isDark ? '#1E293B' : '#F1F5F9';
      ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.2)' : 'rgba(216, 27, 96, 0.15)';
      ctx.beginPath();
      ctx.roundRect(boxX, rowY, thumbSize, thumbSize, 6);
      ctx.fill();
      ctx.stroke();

      let imageDrawn = false;
      if (item.image) {
        try {
          const cleanImg = item.image.replace(/\.jfif$/i, '.jpg');
          const img = await loadImage(cleanImg);
          if (img) {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(boxX, rowY, thumbSize, thumbSize, 6);
            ctx.clip();
            ctx.drawImage(img, boxX, rowY, thumbSize, thumbSize);
            ctx.restore();
            imageDrawn = true;
          }
        } catch {}
      }

      if (!imageDrawn) {
        ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
        ctx.font = 'bold 12px serif';
        ctx.textAlign = 'center';
        ctx.fillText('SL', boxX + thumbSize / 2, rowY + thumbSize / 2 + 4);
      }

      // Item Name & Variant
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
      const maxNameLen = 32;
      const itemName = item.name.length > maxNameLen ? item.name.substring(0, maxNameLen - 2) + '...' : item.name;
      ctx.fillText(itemName, boxX + thumbSize + 10, rowY + 16);

      ctx.font = '600 10px "Montserrat", sans-serif';
      ctx.fillStyle = isDark ? '#ECC874' : '#C2185B';
      const variantStr = `Talla: ${item.selectedSize || 'Estándar'}${item.selectedColor && item.selectedColor !== 'Original' ? ` • Color: ${item.selectedColor}` : ''}`;
      ctx.fillText(variantStr, boxX + thumbSize + 10, rowY + 30);

      ctx.font = '10px "Montserrat", sans-serif';
      ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
      ctx.fillText(`Cant: ${item.quantity}  ×  ${formatPrice(item.price)}`, boxX + thumbSize + 10, rowY + 43);

      // Subtotal Right Aligned
      ctx.textAlign = 'right';
      ctx.font = 'bold 13px "Montserrat", sans-serif';
      ctx.fillStyle = isDark ? '#FFD700' : '#D81B60';
      ctx.fillText(formatPrice(item.price * item.quantity), boxX + boxW, rowY + 28);

      currentY += itemRowHeight;
    }

    // Totals Card
    currentY += 6;
    const totalsH = 88;
    ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.08)' : 'rgba(216, 27, 96, 0.05)';
    ctx.strokeStyle = isDark ? '#D4AF37' : 'rgba(216, 27, 96, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, currentY, boxW, totalsH, 10);
    ctx.fill();
    ctx.stroke();

    const tY = currentY + 22;
    ctx.textAlign = 'left';
    ctx.font = '11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
    ctx.fillText('Subtotal:', boxX + 16, tY);
    ctx.fillText('Modalidad de Envío:', boxX + 16, tY + 18);

    ctx.textAlign = 'right';
    ctx.font = 'bold 11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#F1F5F9' : '#1E293B';
    ctx.fillText(formatPrice(order.subtotal), boxX + boxW - 16, tY);

    const shipText = order.shippingCost > 0 ? `${formatPrice(order.shippingCost)} (Express)` : 'Gratis (Estándar)';
    ctx.fillText(shipText, boxX + boxW - 16, tY + 18);

    // Grand total line
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(216, 27, 96, 0.25)';
    ctx.beginPath();
    ctx.moveTo(boxX + 14, tY + 28);
    ctx.lineTo(boxX + boxW - 14, tY + 28);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.font = 'bold 14px "Playfair Display", Georgia, serif';
    ctx.fillStyle = isDark ? '#F1E5C9' : '#1E1926';
    ctx.fillText('TOTAL A PAGAR:', boxX + 16, tY + 50);

    ctx.textAlign = 'right';
    ctx.font = 'bold 17px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#FFD700' : '#D81B60';
    ctx.fillText(formatPrice(order.total), boxX + boxW - 16, tY + 50);

    // Compact Footer
    currentY += totalsH + 20;
    ctx.textAlign = 'center';
    ctx.font = '9px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#64748B' : '#94A3B8';
    ctx.fillText('SINDY LUXURY • BOUTIQUE OFICIAL • MALABO & BATA, GUINEA ECUATORIAL', width / 2, currentY);

    currentY += 14;
    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText(`*TICKET-EBNA-${order.orderNumber}-VALIDADO*`, width / 2, currentY);

    // Export DataURL & Blob
    const dataUrl = canvas.toDataURL('image/png');
    const filename = `Ticket-Pedido-EBNA-${order.orderNumber}.png`;

    // 1. Silent automatic download (non-disruptive)
    try {
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.warn('Silent download warning:', e);
    }

    // 2. Try copying image to clipboard so user can immediately Paste in WhatsApp
    let copiedToClipboard = false;
    let blob: Blob | null = null;
    try {
      blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (blob && typeof navigator !== 'undefined' && navigator.clipboard && (window as any).ClipboardItem) {
        await navigator.clipboard.write([
          new (window as any).ClipboardItem({ 'image/png': blob })
        ]);
        copiedToClipboard = true;
      }
    } catch (e) {
      // Clipboard write of image might require focus or permission on some browsers
    }

    return {
      dataUrl,
      blob,
      filename,
      copiedToClipboard
    };
  } catch (err) {
    console.error('Error generating compact receipt PNG:', err);
    return null;
  }
}

/**
 * Backwards compatibility helper
 */
export async function downloadReceiptAsPng(
  order: OrderReceiptData,
  theme: 'haute-couture' | 'obsidian-gold' | 'editorial-vogue' = 'haute-couture'
): Promise<boolean> {
  const res = await generateAndDownloadReceipt(order, theme);
  return res !== null;
}
