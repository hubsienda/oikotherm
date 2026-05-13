import { ISOBELL_ROLL_M2, products, type ProductId } from '@/lib/prices';
import { roundMoney } from '@/lib/calculator';

export type ProductQuantities = Record<ProductId, number>;

export type OrderLine = {
  productId: ProductId;
  productName: string;
  unit: string;
  packageQuantity: number;
  quantity: number;
  professionalPrice: number;
  lineTotal: number;
};

export type OrderResult = {
  lines: OrderLine[];
  subtotal: number;
  ivaAmount: number;
  transportCost: number;
  total: number;
  approximateSquareMetres: number;
};

export const emptyProductQuantities: ProductQuantities = {
  isobell: 0,
  sinergy: 0,
  klima: 0,
  stucco: 0,
  'comfort-lime': 0,
  siprime: 0,
  skim: 0,
  sipaint: 0,
  'pure-plus': 0,
  crystal: 0,
  binder: 0
};

export const minimumOrderQuantities: ProductQuantities = {
  isobell: 15,
  sinergy: 48,
  klima: 0,
  stucco: 0,
  'comfort-lime': 0,
  siprime: 12,
  skim: 24,
  sipaint: 0,
  'pure-plus': 1,
  crystal: 2,
  binder: 2
};

export function calculateOrderEstimate(
  quantities: ProductQuantities,
  ivaPercentage: number,
  transportCost: number
): OrderResult {
  const safeIvaPercentage = Math.max(0, ivaPercentage);
  const safeTransportCost = roundMoney(Math.max(0, transportCost));

  const lines = products.map((product) => {
    const quantity = Math.max(0, Math.floor(quantities[product.id] ?? 0));
    const lineTotal = roundMoney(quantity * product.professionalPrice);

    return {
      productId: product.id,
      productName: product.name,
      unit: product.unit,
      packageQuantity: product.packageQuantity,
      quantity,
      professionalPrice: product.professionalPrice,
      lineTotal
    };
  });

  const subtotal = roundMoney(
    lines.reduce((sum, line) => sum + line.lineTotal, 0)
  );
  const ivaAmount = roundMoney(subtotal * (safeIvaPercentage / 100));
  const total = roundMoney(subtotal + ivaAmount + safeTransportCost);
  const isobellQuantity = quantities.isobell ?? 0;
  const approximateSquareMetres = roundMoney(isobellQuantity * ISOBELL_ROLL_M2);

  return {
    lines,
    subtotal,
    ivaAmount,
    transportCost: safeTransportCost,
    total,
    approximateSquareMetres
  };
}

export function hasAnyProductQuantity(quantities: ProductQuantities): boolean {
  return Object.values(quantities).some((quantity) => quantity > 0);
}
