export type Locale = 'es' | 'en';

export type IsobellSystemId = 'spain-sinergy' | 'spain-comfort-lime';

export type IsobellSystem = {
  id: IsobellSystemId;
  labels: Record<Locale, string>;
  pricePerM2: number;
};

export const ISOBELL_ROLL_M2 = 7.125;

export const isobellSystems: IsobellSystem[] = [
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

export function getDefaultSystem(): IsobellSystem {
  return isobellSystems[0];
}

export function getSystemById(systemId: IsobellSystemId): IsobellSystem {
  return (
    isobellSystems.find((system) => system.id === systemId) ??
    getDefaultSystem()
  );
}
