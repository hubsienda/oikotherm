import type { Locale } from '@/lib/prices';

export type CalculatorCopy = {
  title: string;
  subtitle: string;
  intro: string;
  fields: {
    squareMetres: string;
    system: string;
    iva: string;
    transport: string;
    professionalPricePerM2: string;
    subtotal: string;
    ivaAmount: string;
    transportCost: string;
    total: string;
    rolls: string;
  };
  button: string;
  notes: {
    first: string;
    second: string;
  };
  placeholders: {
    squareMetres: string;
    transport: string;
  };
  helper: {
    empty: string;
  };
};

export const copy: Record<Locale, CalculatorCopy> = {
  es: {
    title: 'Calculadora ISOBELL España',
    subtitle:
      'Herramienta de cálculo para comerciales, distribuidores e instaladores de OIKOTHERM.',
    intro:
      'Introduzca los metros cuadrados, seleccione el sistema ISOBELL y añada el coste de transporte. La calculadora aplicará el IVA correspondiente y mostrará el total estimado.',
    fields: {
      squareMetres: 'Metros cuadrados',
      system: 'Sistema ISOBELL',
      iva: 'IVA (%)',
      transport: 'Coste de transporte',
      professionalPricePerM2: 'Precio profesional por m²',
      subtotal: 'Subtotal sin IVA',
      ivaAmount: 'IVA',
      transportCost: 'Transporte',
      total: 'Total estimado',
      rolls: 'Rollos ISOBELL aproximados'
    },
    button: 'Calcular',
    notes: {
      first:
        'Esta herramienta no es una tienda online. Es una calculadora orientativa para preparar presupuestos y estimaciones de pedido.',
      second:
        'Los precios indicados son precios profesionales OIKOTHERM para España. No incluyen IVA ni transporte. Los importes deben ser confirmados por OIKOTHERM antes de emitir una oferta definitiva.'
    },
    placeholders: {
      squareMetres: 'Ej. 125',
      transport: '0'
    },
    helper: {
      empty: 'Introduzca los metros cuadrados para ver la estimación.'
    }
  },
  en: {
    title: 'ISOBELL Spain Calculator',
    subtitle:
      'Calculation tool for OIKOTHERM sales managers, distributors and installers.',
    intro:
      'Enter the square metres, select the ISOBELL system and add the transport cost. The calculator will apply the relevant Spanish VAT and show the estimated total.',
    fields: {
      squareMetres: 'Square metres',
      system: 'ISOBELL system',
      iva: 'VAT (%)',
      transport: 'Transport cost',
      professionalPricePerM2: 'Professional price per m²',
      subtotal: 'Subtotal excluding VAT',
      ivaAmount: 'VAT',
      transportCost: 'Transport',
      total: 'Estimated total',
      rolls: 'Approximate ISOBELL rolls'
    },
    button: 'Calculate',
    notes: {
      first:
        'This tool is not an online shop. It is an indicative calculator for preparing quotations and order estimates.',
      second:
        'The prices shown are OIKOTHERM professional prices for Spain. VAT and transport are not included. Amounts must be confirmed by OIKOTHERM before issuing a final offer.'
    },
    placeholders: {
      squareMetres: 'E.g. 125',
      transport: '0'
    },
    helper: {
      empty: 'Enter the square metres to see the estimate.'
    }
  }
};
