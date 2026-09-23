import type { OrderReceiptData } from '../types';
import { formatPrice } from './utils';

const PRIMARY_PHONE = '240222633687';
const MUNI_PHONE = '240555439904';

/**
 * Builds the official WhatsApp URL for the order receipt
 */
export function buildReceiptWhatsAppUrl(order: OrderReceiptData): string {
  const itemsText = order.items.map((item, idx) => {
    const itemSubtotal = item.price * item.quantity;
    const sizeInfo = item.selectedSize ? ` | ${item.selectedSize}` : '';
    const colorInfo = item.selectedColor && item.selectedColor !== 'Original' ? ` (${item.selectedColor})` : '';
    return `${idx + 1}. 👗 *${item.name}* [x${item.quantity}]${sizeInfo}${colorInfo}\n   💰 Subtotal: ${formatPrice(itemSubtotal)}`;
  }).join('\n\n');

  const regionLabel = order.region === 'insular' 
    ? '🏝️ Región Insular (Bioko / Malabo)' 
    : '🌍 Región Continental (Litoral / Bata y provincias)';

  const shippingLabel = order.shippingType === 'express'
    ? '⚡ Express 3 Días (+3.000 FCFA)'
    : '📦 Estándar 5 a 7 Días (Gratis)';

  const paymentLabel = order.paymentMethod === 'muni'
    ? '📲 MUNI DINERO (*423*2*1*555439904# / Giro al 555439904)'
    : '💬 WHATSAPP / EFECTIVO CONTRA ENTREGA';

  const message = `✨ *RECIBO DE PEDIDO OFICIAL — SINDY LUXURY BY EBNA* ✨
━━━━━━━━━━━━━━━━━━━━━━
🎫 *FOLIO:* #${order.orderNumber}
📅 *FECHA:* ${order.createdAt}
⏳ *ESTADO:* PENDIENTE DE RECEPCIÓN / VALIDACIÓN

👤 *DATOS DEL DESTINATARIO:*
• Nombre: *${order.customerName}*
• Teléfono: *${order.customerPhone || 'Pendiente'}*
• Dirección: *${order.customerAddress}*
• Región: *${regionLabel}*

🛍️ *PRENDAS SELECCIONADAS (${order.items.reduce((acc, i) => acc + i.quantity, 0)} unidades):*
${itemsText}

━━━━━━━━━━━━━━━━━━━━━━
💵 *DESGLOSE FINANCIERO:*
• Subtotal Prendas: ${formatPrice(order.subtotal)}
• Modalidad de Envío: ${shippingLabel}
• Tarifa de Envío: ${order.shippingCost > 0 ? formatPrice(order.shippingCost) : 'Gratis'}
• Método de Pago: ${paymentLabel}
⭐ *TOTAL A PAGAR: ${formatPrice(order.total)}*
━━━━━━━━━━━━━━━━━━━━━━
${order.paymentMethod === 'muni' ? '📌 *Instrucción Muni Dinero:* He solicitado el pedido con pago vía Muni Dinero al 555439904.' : '📌 Adjunto mi comprobante digital para programar la entrega.'}

¿Me confirman recepción del pedido para empaque y despacho?`;

  const targetPhone = order.paymentMethod === 'muni' ? MUNI_PHONE : PRIMARY_PHONE;
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
Modalidad de Envío: ${order.shippingType === 'express' ? 'Express 3 Días (+3.000 FCFA)' : 'Estándar Gratis'}
Método de Pago: ${order.paymentMethod === 'muni' ? 'Muni Dinero' : 'WhatsApp / Efectivo'}
Artículos: ${order.items.map(i => `${i.name} (x${i.quantity}) - ${formatPrice(i.price * i.quantity)}`).join(', ')}
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
 * Helper to safely load an image for canvas drawing
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Fallback: try loading without crossOrigin if local or same-origin
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = () => resolve(null);
      fallbackImg.src = src;
    };
    img.src = src;
  });
}

/**
 * Generates and downloads a high-resolution PNG image (2x DPI) of the receipt card
 */
export async function downloadReceiptAsPng(order: OrderReceiptData, theme: 'haute-couture' | 'obsidian-gold' | 'editorial-vogue' = 'haute-couture'): Promise<boolean> {
  try {
    const width = 800;
    // Calculate required height based on items count
    const headerHeight = 240;
    const customerHeight = 200;
    const itemsHeaderHeight = 60;
    const itemRowHeight = 90;
    const itemsTotalHeight = order.items.length * itemRowHeight;
    const totalsHeight = 210;
    const footerHeight = 120;
    const totalHeight = headerHeight + customerHeight + itemsHeaderHeight + itemsTotalHeight + totalsHeight + footerHeight;

    const canvas = document.createElement('canvas');
    const scale = 2; // High Retina resolution
    canvas.width = width * scale;
    canvas.height = totalHeight * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    ctx.scale(scale, scale);

    // Theme color palettes
    const isDark = theme === 'obsidian-gold';
    const isVogue = theme === 'editorial-vogue';

    const bgGradient = ctx.createLinearGradient(0, 0, width, totalHeight);
    if (isDark) {
      bgGradient.addColorStop(0, '#0F172A');
      bgGradient.addColorStop(0.5, '#0B0F19');
      bgGradient.addColorStop(1, '#020617');
    } else if (isVogue) {
      bgGradient.addColorStop(0, '#FFFFFF');
      bgGradient.addColorStop(1, '#FAFAFA');
    } else {
      // Haute Couture Champagne / Ivory
      bgGradient.addColorStop(0, '#FFFDF8');
      bgGradient.addColorStop(0.3, '#FAF5EB');
      bgGradient.addColorStop(1, '#F7EFE1');
    }

    // Fill background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, totalHeight);

    // Outer Luxury Border
    const borderGold = isDark ? '#D4AF37' : isVogue ? '#1E293B' : '#C5A880';
    ctx.strokeStyle = borderGold;
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, width - 32, totalHeight - 32);

    // Inner fine border
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 168, 128, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, width - 48, totalHeight - 48);

    // Header Pattern / Brand
    let currentY = 55;

    // Brand Title
    ctx.textAlign = 'center';
    ctx.fillStyle = isDark ? '#F1E5C9' : isVogue ? '#0F172A' : '#1E1926';
    ctx.font = 'bold 28px "Playfair Display", Georgia, serif';
    ctx.fillText('SINDY LUXURY', width / 2, currentY);

    currentY += 24;
    ctx.font = '600 13px "Cinzel", "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText('HAUTE COUTURE & BOUTIQUE VIP • GUINEA ECUATORIAL', width / 2, currentY);

    currentY += 28;
    // Gold Ribbon / Divider
    ctx.strokeStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, currentY);
    ctx.lineTo(width / 2 + 140, currentY);
    ctx.stroke();

    currentY += 24;
    ctx.font = 'bold 15px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#E2E8F0' : '#475569';
    ctx.fillText('COMPROBANTE OFICIAL DE PEDIDO PROVISIONAL', width / 2, currentY);

    currentY += 26;
    // Order ID & Status Badge Box
    const badgeWidth = 460;
    const badgeX = (width - badgeWidth) / 2;
    ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.15)' : 'rgba(216, 27, 96, 0.08)';
    ctx.strokeStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(badgeX, currentY - 18, badgeWidth, 36, 18);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 13px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#FFD700' : '#C2185B';
    ctx.fillText(`FOLIO: #${order.orderNumber}  •  ⏳ ${order.status}`, width / 2, currentY + 5);

    currentY += 38;
    ctx.font = '12px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.fillText(`Emitido el ${order.createdAt} (Malabo / Bata)`, width / 2, currentY);

    // Customer Dossier Box
    currentY += 28;
    const boxX = 45;
    const boxWidth = width - 90;
    const boxHeight = 175;

    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.85)';
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.25)' : 'rgba(216, 27, 96, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, currentY, boxWidth, boxHeight, 14);
    ctx.fill();
    ctx.stroke();

    // Box Header
    ctx.textAlign = 'left';
    ctx.font = 'bold 13px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText('DATOS DE ENTREGA Y DESTINATARIO', boxX + 20, currentY + 26);

    // Divider
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
    ctx.beginPath();
    ctx.moveTo(boxX + 20, currentY + 36);
    ctx.lineTo(boxX + boxWidth - 20, currentY + 36);
    ctx.stroke();

    // Customer details
    const textStartY = currentY + 60;
    const lineSpacing = 24;

    ctx.font = '13px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.fillText('Destinatario:', boxX + 20, textStartY);
    ctx.fillText('Teléfono / WhatsApp:', boxX + 20, textStartY + lineSpacing);
    ctx.fillText('Dirección de Entrega:', boxX + 20, textStartY + lineSpacing * 2);
    ctx.fillText('Región y Modalidad:', boxX + 20, textStartY + lineSpacing * 3);
    ctx.fillText('Método de Pago:', boxX + 20, textStartY + lineSpacing * 4);

    ctx.font = 'bold 13px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
    ctx.fillText(order.customerName, boxX + 180, textStartY);
    ctx.fillText(order.customerPhone || 'Pendiente de confirmación', boxX + 180, textStartY + lineSpacing);
    
    // Truncate address if too long
    const addressStr = order.customerAddress.length > 55 ? order.customerAddress.substring(0, 52) + '...' : order.customerAddress;
    ctx.fillText(addressStr, boxX + 180, textStartY + lineSpacing * 2);

    const regionStr = order.region === 'insular' ? 'Bioko (Malabo)' : 'Continental (Bata)';
    const shippingStr = order.shippingType === 'express' ? 'Express 3 Días (+3.000 FCFA)' : 'Normal Estándar (Gratis)';
    ctx.fillText(`${regionStr} • ${shippingStr}`, boxX + 180, textStartY + lineSpacing * 3);

    const paymentStr = order.paymentMethod === 'muni' ? 'Muni Dinero (+240 555 439 904)' : 'WhatsApp / Efectivo';
    ctx.fillText(paymentStr, boxX + 180, textStartY + lineSpacing * 4);

    // Items Section Header
    currentY += boxHeight + 25;
    ctx.font = 'bold 14px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
    ctx.fillText('PRENDAS Y ARTÍCULOS SELECCIONADOS', boxX + 5, currentY);

    ctx.textAlign = 'right';
    ctx.font = '12px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.fillText(`${order.items.reduce((sum, item) => sum + item.quantity, 0)} unidades en total`, boxX + boxWidth - 5, currentY);

    currentY += 12;
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(216, 27, 96, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(boxX, currentY);
    ctx.lineTo(boxX + boxWidth, currentY);
    ctx.stroke();

    currentY += 15;

    // Load thumbnails and draw items
    for (const item of order.items) {
      const itemRowY = currentY;
      const thumbSize = 64;

      // Draw item thumbnail container
      ctx.fillStyle = isDark ? '#1E293B' : '#F1F5F9';
      ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(boxX, itemRowY, thumbSize, thumbSize, 8);
      ctx.fill();
      ctx.stroke();

      // Try loading image
      if (item.image) {
        try {
          const img = await loadImage(item.image);
          if (img) {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(boxX, itemRowY, thumbSize, thumbSize, 8);
            ctx.clip();
            ctx.drawImage(img, boxX, itemRowY, thumbSize, thumbSize);
            ctx.restore();
          }
        } catch {
          // Keep placeholder if load fails
        }
      }

      // Quantity Badge floating on thumbnail
      ctx.fillStyle = isDark ? '#D4AF37' : '#D81B60';
      ctx.beginPath();
      ctx.roundRect(boxX + thumbSize - 22, itemRowY, 22, 18, 4);
      ctx.fill();

      ctx.textAlign = 'center';
      ctx.font = 'bold 10px "Montserrat", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`x${item.quantity}`, boxX + thumbSize - 11, itemRowY + 13);

      // Item Name & Details
      ctx.textAlign = 'left';
      ctx.font = 'bold 14px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isDark ? '#F8FAFC' : '#1E293B';
      const itemName = item.name.length > 42 ? item.name.substring(0, 40) + '...' : item.name;
      ctx.fillText(itemName, boxX + thumbSize + 15, itemRowY + 22);

      // Size / Color Pill
      ctx.font = '11px "Montserrat", sans-serif';
      ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
      const variantText = `Talla/Formato: ${item.selectedSize || 'Estándar'}${item.selectedColor && item.selectedColor !== 'Original' ? ` • Color: ${item.selectedColor}` : ''}`;
      ctx.fillText(variantText, boxX + thumbSize + 15, itemRowY + 42);

      // Unit Price
      ctx.font = '12px "Montserrat", sans-serif';
      ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
      ctx.fillText(`${formatPrice(item.price)} c/u`, boxX + thumbSize + 15, itemRowY + 60);

      // Item Subtotal (Right Aligned)
      ctx.textAlign = 'right';
      ctx.font = 'bold 15px "Montserrat", sans-serif';
      ctx.fillStyle = isDark ? '#FFD700' : '#D81B60';
      ctx.fillText(formatPrice(item.price * item.quantity), boxX + boxWidth, itemRowY + 40);

      // Row separator
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
      ctx.beginPath();
      ctx.moveTo(boxX, itemRowY + thumbSize + 14);
      ctx.lineTo(boxX + boxWidth, itemRowY + thumbSize + 14);
      ctx.stroke();

      currentY += itemRowHeight;
    }

    // Accounting / Totals Card
    currentY += 15;
    const totalsBoxHeight = 150;
    ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.08)' : 'rgba(216, 27, 96, 0.04)';
    ctx.strokeStyle = isDark ? '#D4AF37' : 'rgba(216, 27, 96, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, currentY, boxWidth, totalsBoxHeight, 14);
    ctx.fill();
    ctx.stroke();

    const tY = currentY + 30;
    ctx.textAlign = 'left';
    ctx.font = '13px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#CBD5E1' : '#475569';
    ctx.fillText('Subtotal Prendas:', boxX + 25, tY);
    ctx.fillText('Modalidad de Envío:', boxX + 25, tY + 28);

    ctx.textAlign = 'right';
    ctx.font = 'bold 14px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#F1F5F9' : '#1E293B';
    ctx.fillText(formatPrice(order.subtotal), boxX + boxWidth - 25, tY);
    ctx.fillText(order.shippingCost > 0 ? formatPrice(order.shippingCost) : 'Gratis (Promoción)', boxX + boxWidth - 25, tY + 28);

    // Grand total line
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(216, 27, 96, 0.3)';
    ctx.beginPath();
    ctx.moveTo(boxX + 20, tY + 45);
    ctx.lineTo(boxX + boxWidth - 20, tY + 45);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.font = 'bold 18px "Playfair Display", Georgia, serif';
    ctx.fillStyle = isDark ? '#F1E5C9' : '#1E1926';
    ctx.fillText('GRAN TOTAL A PAGAR:', boxX + 25, tY + 80);

    ctx.textAlign = 'right';
    ctx.font = 'bold 22px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#FFD700' : '#D81B60';
    ctx.fillText(formatPrice(order.total), boxX + boxWidth - 25, tY + 80);

    // Footer & Security Monogram Barcode
    currentY += totalsBoxHeight + 35;
    ctx.textAlign = 'center';
    ctx.font = '11px "Montserrat", sans-serif';
    ctx.fillStyle = isDark ? '#64748B' : '#94A3B8';
    ctx.fillText('SINDY LUXURY • AUTÉNTICO Y CERTIFICADO • MALABO & BATA, GUINEA ECUATORIAL', width / 2, currentY);

    currentY += 18;
    // Stylized Security Barcode Lines
    const barWidth = 320;
    const barX = (width - barWidth) / 2;
    ctx.fillStyle = isDark ? '#D4AF37' : '#475569';
    for (let i = 0; i < barWidth; i += 4) {
      const lineW = (i % 8 === 0 || i % 12 === 0) ? 2.5 : 1;
      ctx.fillRect(barX + i, currentY, lineW, 16);
    }

    currentY += 26;
    ctx.font = '9px "Montserrat", monospace';
    ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    ctx.fillText(`*EBNA-REC-${order.orderNumber}-SECURE-VERIFIED*`, width / 2, currentY);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Recibo-EBNA-${order.orderNumber}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Error generating receipt PNG:', error);
    return false;
  }
}
