import type { Locale } from '@/lib/prices';

export type CalculatorCopy = {
  appTitle: string;
  appSubtitle: string;
  languageSelectorLabel: string;
  modes: {
    order: string;
    squareMetres: string;
  };
  order: {
    title: string;
    subtitle: string;
    intro: string;
    minimumOrder: string;
    clear: string;
    fields: {
      product: string;
      unit: string;
      packageQuantity: string;
      quantity: string;
      professionalPrice: string;
      lineTotal: string;
      iva: string;
      transport: string;
      approximateSquareMetres: string;
      subtotal: string;
      ivaAmount: string;
      transportCost: string;
      total: string;
    };
    actions: {
      download: string;
      whatsapp: string;
      email: string;
    };
    notes: {
      first: string;
      second: string;
    };
    helper: {
      empty: string;
    };
    filename: string;
    emailSubject: string;
  };
  squareMetres: {
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
};

export const copy: Record<Locale, CalculatorCopy> = {
  es: {
    appTitle: 'Productos ISOBELL',
    appSubtitle:
      'Herramienta profesional para preparar estimaciones de pedido y cálculos por m².',
    languageSelectorLabel: 'Selector de idioma',
    modes: {
      order: 'Pedido por productos',
      squareMetres: 'Cálculo por m²'
    },
    order: {
      title: 'Pedido por productos',
      subtitle:
        'Introduzca las cantidades de cada producto ISOBELL para calcular el total estimado.',
      intro:
        'La calculadora aplica el IVA correspondiente, añade el transporte indicado y genera un resumen del pedido.',
      minimumOrder: 'Usar pedido mínimo aprox. 106 m²',
      clear: 'Limpiar cantidades',
      fields: {
        product: 'Producto',
        unit: 'Unidad',
        packageQuantity: 'Contenido',
        quantity: 'Cantidad',
        professionalPrice: 'Precio profesional OIKOTHERM',
        lineTotal: 'Total línea',
        iva: 'IVA (%)',
        transport: 'Coste de transporte',
        approximateSquareMetres: 'm² ISOBELL aproximados',
        subtotal: 'Subtotal sin IVA',
        ivaAmount: 'IVA',
        transportCost: 'Transporte',
        total: 'Total estimado'
      },
      actions: {
        download: 'Descargar resumen',
        whatsapp: 'Enviar por WhatsApp',
        email: 'Enviar por email'
      },
      notes: {
        first:
          'Esta herramienta no es una tienda online. Es una calculadora orientativa para preparar presupuestos y estimaciones de pedido.',
        second:
          'Los precios indicados son precios profesionales OIKOTHERM para España. No incluyen IVA ni transporte. Los importes deben ser confirmados por OIKOTHERM antes de emitir una oferta definitiva.'
      },
      helper: {
        empty: 'Introduzca cantidades o use el pedido mínimo para ver el total.'
      },
      filename: 'resumen-pedido-isobell.txt',
      emailSubject: 'Resumen de pedido ISOBELL España'
    },
    squareMetres: {
      title: 'Cálculo por m²',
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
    }
  },
  en: {
    appTitle: 'ISOBELL Products',
    appSubtitle:
      'Professional tool for preparing order estimates and square-metre calculations.',
    languageSelectorLabel: 'Language selector',
    modes: {
      order: 'Product order',
      squareMetres: 'm² calculation'
    },
    order: {
      title: 'Product order',
      subtitle:
        'Enter the quantities for each ISOBELL product to calculate the estimated total.',
      intro:
        'The calculator applies the relevant VAT, adds the transport cost entered and generates an order summary.',
      minimumOrder: 'Use minimum order approx. 106 m²',
      clear: 'Clear quantities',
      fields: {
        product: 'Product',
        unit: 'Unit',
        packageQuantity: 'Content',
        quantity: 'Quantity',
        professionalPrice: 'OIKOTHERM professional price',
        lineTotal: 'Line total',
        iva: 'VAT (%)',
        transport: 'Transport cost',
        approximateSquareMetres: 'Approximate ISOBELL m²',
        subtotal: 'Subtotal excluding VAT',
        ivaAmount: 'VAT',
        transportCost: 'Transport',
        total: 'Estimated total'
      },
      actions: {
        download: 'Download summary',
        whatsapp: 'Send by WhatsApp',
        email: 'Send by email'
      },
      notes: {
        first:
          'This tool is not an online shop. It is an indicative calculator for preparing quotations and order estimates.',
        second:
          'The prices shown are OIKOTHERM professional prices for Spain. VAT and transport are not included. Amounts must be confirmed by OIKOTHERM before issuing a final offer.'
      },
      helper: {
        empty: 'Enter quantities or use the minimum order to see the total.'
      },
      filename: 'isobell-order-summary.txt',
      emailSubject: 'ISOBELL Spain order summary'
    },
    squareMetres: {
      title: 'm² calculation',
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
  }
};
