import type { Locale } from '@/lib/prices';
import type { OrderResult } from '@/lib/order';

type BuildOrderSummaryInput = {
  locale: Locale;
  result: OrderResult;
  ivaPercentage: number;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number) => string;
};

export function buildOrderSummaryText({
  locale,
  result,
  ivaPercentage,
  formatCurrency,
  formatNumber
}: BuildOrderSummaryInput): string {
  const activeLines = result.lines.filter((line) => line.quantity > 0);

  if (locale === 'es') {
    const lines = [
      'Resumen de pedido ISOBELL España',
      '',
      ...activeLines.map(
        (line) =>
          `${line.productName}: ${line.quantity} × ${formatCurrency(
            line.professionalPrice
          )} = ${formatCurrency(line.lineTotal)}`
      ),
      '',
      `Metros cuadrados aproximados ISOBELL: ${formatNumber(
        result.approximateSquareMetres
      )} m²`,
      `Subtotal sin IVA: ${formatCurrency(result.subtotal)}`,
      `IVA (${formatNumber(ivaPercentage)}%): ${formatCurrency(
        result.ivaAmount
      )}`,
      `Transporte: ${formatCurrency(result.transportCost)}`,
      `Total estimado: ${formatCurrency(result.total)}`,
      '',
      'Los precios indicados son precios profesionales OIKOTHERM para España. No incluyen IVA ni transporte. Los importes deben ser confirmados por OIKOTHERM antes de emitir una oferta definitiva.'
    ];

    return lines.join('\n');
  }

  const lines = [
    'ISOBELL Spain order summary',
    '',
    ...activeLines.map(
      (line) =>
        `${line.productName}: ${line.quantity} × ${formatCurrency(
          line.professionalPrice
        )} = ${formatCurrency(line.lineTotal)}`
    ),
    '',
    `Approximate ISOBELL square metres: ${formatNumber(
      result.approximateSquareMetres
    )} m²`,
    `Subtotal excluding VAT: ${formatCurrency(result.subtotal)}`,
    `VAT (${formatNumber(ivaPercentage)}%): ${formatCurrency(
      result.ivaAmount
    )}`,
    `Transport: ${formatCurrency(result.transportCost)}`,
    `Estimated total: ${formatCurrency(result.total)}`,
    '',
    'The prices shown are OIKOTHERM professional prices for Spain. VAT and transport are not included. Amounts must be confirmed by OIKOTHERM before issuing a final offer.'
  ];

  return lines.join('\n');
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], {
    type: 'text/plain;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const temporaryLink = document.createElement('a');

  temporaryLink.href = url;
  temporaryLink.download = filename;
  temporaryLink.click();

  URL.revokeObjectURL(url);
}

export function buildWhatsAppUrl(content: string): string {
  return `https://wa.me/?text=${encodeURIComponent(content)}`;
}

export function buildEmailUrl(subject: string, content: string): string {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    content
  )}`;
}
