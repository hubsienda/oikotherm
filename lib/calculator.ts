import { ISOBELL_ROLL_M2 } from '@/lib/prices';

export type CalculatorInput = {
  squareMetres: number;
  pricePerM2: number;
  ivaPercentage: number;
  transportCost: number;
};

export type CalculatorResult = {
  professionalPricePerM2: number;
  subtotal: number;
  ivaAmount: number;
  transportCost: number;
  total: number;
  rolls: number;
};

export function toNonNegativeNumber(value: string): number {
  const normalisedValue = value.trim().replace(',', '.');

  if (normalisedValue === '') {
    return 0;
  }

  const parsedValue = Number(normalisedValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return 0;
  }

  return parsedValue;
}

export function calculateIsobellEstimate(
  input: CalculatorInput
): CalculatorResult {
  const squareMetres = Math.max(0, input.squareMetres);
  const pricePerM2 = Math.max(0, input.pricePerM2);
  const ivaPercentage = Math.max(0, input.ivaPercentage);
  const transportCost = Math.max(0, input.transportCost);

  const subtotal = squareMetres * pricePerM2;
  const ivaAmount = subtotal * (ivaPercentage / 100);
  const total = subtotal + ivaAmount + transportCost;
  const rolls = squareMetres > 0 ? Math.ceil(squareMetres / ISOBELL_ROLL_M2) : 0;

  return {
    professionalPricePerM2: pricePerM2,
    subtotal,
    ivaAmount,
    transportCost,
    total,
    rolls
  };
}
