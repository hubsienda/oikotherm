export type Locale = 'es' | 'en';

export type SquareMetreSystemId = 'spain-sinergy' | 'spain-comfort-lime';

export type SquareMetreSystem = {
  id: SquareMetreSystemId;
  labels: Record<Locale, string>;
  pricePerM2: number;
};

export type ProductId =
  | 'isobell'
  | 'sinergy'
  | 'klima'
  | 'stucco'
  | 'comfort-lime'
  | 'siprime'
  | 'skim'
  | 'sipaint'
  | 'pure-plus'
  | 'crystal'
  | 'binder';

export type Product = {
  id: ProductId;
  name: string;
  unit: string;
  packageQuantity: number;
  professionalPrice: number;
};

export const ISOBELL_ROLL_M2 = 7.125;

export const squareMetreSystems: SquareMetreSystem[] = [
  {
    id: 'spain-sinergy',
    labels: {
      es: 'Sistema España con SiNERGY',
      en: 'Spain system with SiNERGY'
    },
    pricePerM2: 48.35
  },
  {
    id: 'spain-comfort-lime',
    labels: {
      es: 'Sistema España con COMFORT LIME',
      en: 'Spain system with COMFORT LIME'
    },
    pricePerM2: 36.8
  }
];

export const products: Product[] = [
  {
    id: 'isobell',
    name: 'ISOBELL',
    unit: 'm²',
    packageQuantity: 7.125,
    professionalPrice: 196.92
  },
  {
    id: 'sinergy',
    name: 'SiNERGY',
    unit: 'kg',
    packageQuantity: 15,
    professionalPrice: 50.77
  },
  {
    id: 'klima',
    name: 'KLIMA',
    unit: 'kg',
    packageQuantity: 15,
    professionalPrice: 38.46
  },
  {
    id: 'stucco',
    name: 'STUCCO',
    unit: 'kg',
    packageQuantity: 15,
    professionalPrice: 40
  },
  {
    id: 'comfort-lime',
    name: 'COMFORT LIME',
    unit: 'kg',
    packageQuantity: 25,
    professionalPrice: 28.46
  },
  {
    id: 'siprime',
    name: 'SiPRIME',
    unit: 'L',
    packageQuantity: 4,
    professionalPrice: 20
  },
  {
    id: 'skim',
    name: 'SKIM',
    unit: 'kg',
    packageQuantity: 10,
    professionalPrice: 27.69
  },
  {
    id: 'sipaint',
    name: 'SiPAINT',
    unit: 'L',
    packageQuantity: 5,
    professionalPrice: 53.85
  },
  {
    id: 'pure-plus',
    name: 'PURE+',
    unit: 'L',
    packageQuantity: 6,
    professionalPrice: 52.31
  },
  {
    id: 'crystal',
    name: 'CRYSTAL',
    unit: 'L',
    packageQuantity: 6,
    professionalPrice: 61.54
  },
  {
    id: 'binder',
    name: 'BINDER',
    unit: 'L',
    packageQuantity: 6,
    professionalPrice: 30.77
  }
];

export function getDefaultSquareMetreSystem(): SquareMetreSystem {
  return squareMetreSystems[0];
}

export function getSquareMetreSystemById(
  systemId: SquareMetreSystemId
): SquareMetreSystem {
  return (
    squareMetreSystems.find((system) => system.id === systemId) ??
    getDefaultSquareMetreSystem()
  );
}

export function getProductById(productId: ProductId): Product | undefined {
  return products.find((product) => product.id === productId);
}
