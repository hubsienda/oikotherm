'use client';

import { useMemo, useState } from 'react';
import { toNonNegativeInteger, toNonNegativeNumber } from '@/lib/calculator';
import {
  buildEmailUrl,
  buildOrderSummaryText,
  buildWhatsAppUrl,
  downloadTextFile
} from '@/lib/sharing';
import {
  calculateOrderEstimate,
  emptyProductQuantities,
  hasAnyProductQuantity,
  minimumOrderQuantities,
  type ProductQuantities
} from '@/lib/order';
import { products, type Locale, type ProductId } from '@/lib/prices';
import type { CalculatorCopy } from '@/lib/copy';

type OrderCalculatorProps = {
  locale: Locale;
  copy: CalculatorCopy['order'];
};

export default function OrderCalculator({ locale, copy }: OrderCalculatorProps) {
  const [quantities, setQuantities] = useState<ProductQuantities>(
    emptyProductQuantities
  );
  const [ivaInput, setIvaInput] = useState('21');
  const [transportInput, setTransportInput] = useState('0');

  const ivaPercentage = toNonNegativeNumber(ivaInput);
  const transportCost = toNonNegativeNumber(transportInput);

  const result = useMemo(
    () => calculateOrderEstimate(quantities, ivaPercentage, transportCost),
    [quantities, ivaPercentage, transportCost]
  );

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [locale]);

  const numberFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }, [locale]);

  const hasQuantities = hasAnyProductQuantity(quantities);

  const summaryText = buildOrderSummaryText({
    locale,
    result,
    ivaPercentage,
    formatCurrency: (value) => currencyFormatter.format(value),
    formatNumber: (value) => numberFormatter.format(value)
  });

  function updateQuantity(productId: ProductId, value: string) {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [productId]: toNonNegativeInteger(value)
    }));
  }

  function applyMinimumOrder() {
    setQuantities(minimumOrderQuantities);
  }

  function clearQuantities() {
    setQuantities(emptyProductQuantities);
  }

  function handleDownload() {
    downloadTextFile(copy.filename, summaryText);
  }

  return (
    <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold tracking-tight text-stone-950 sm:text-xl">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-stone-800">
            {copy.subtitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {copy.intro}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={applyMinimumOrder}
            className="rounded-2xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-300"
          >
            {copy.minimumOrder}
          </button>

          <button
            type="button"
            onClick={clearQuantities}
            className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm font-bold text-stone-800 transition hover:bg-stone-100 focus:outline-none focus:ring-4 focus:ring-stone-200"
          >
            {copy.clear}
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200">
          <div className="hidden grid-cols-[1.25fr_0.55fr_0.65fr_0.65fr_0.85fr_0.85fr] gap-3 bg-stone-100 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-stone-600 lg:grid">
            <div>{copy.fields.product}</div>
            <div>{copy.fields.unit}</div>
            <div>{copy.fields.packageQuantity}</div>
            <div>{copy.fields.quantity}</div>
            <div>{copy.fields.professionalPrice}</div>
            <div className="text-right">{copy.fields.lineTotal}</div>
          </div>

          <div className="divide-y divide-stone-200">
            {products.map((product) => {
              const quantity = quantities[product.id] ?? 0;
              const lineTotal = quantity * product.professionalPrice;

              return (
                <div
                  key={product.id}
                  className="grid gap-4 px-4 py-4 lg:grid-cols-[1.25fr_0.55fr_0.65fr_0.65fr_0.85fr_0.85fr] lg:items-center lg:gap-3"
                >
                  <div>
                    <p className="text-base font-bold text-stone-950">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-stone-500 lg:hidden">
                      {copy.fields.professionalPrice}:{' '}
                      {currencyFormatter.format(product.professionalPrice)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm lg:block">
                    <span className="font-semibold text-stone-500 lg:hidden">
                      {copy.fields.unit}
                    </span>
                    <span className="text-stone-800">{product.unit}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm lg:block">
                    <span className="font-semibold text-stone-500 lg:hidden">
                      {copy.fields.packageQuantity}
                    </span>
                    <span className="text-stone-800">
                      {numberFormatter.format(product.packageQuantity)}{' '}
                      {product.unit}
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor={`quantity-${product.id}`}
                      className="sr-only"
                    >
                      {copy.fields.quantity} {product.name}
                    </label>
                    <input
                      id={`quantity-${product.id}`}
                      name={`quantity-${product.id}`}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={quantity === 0 ? '' : String(quantity)}
                      onChange={(event) =>
                        updateQuantity(product.id, event.target.value)
                      }
                      className="block w-full rounded-2xl border border-stone-300 bg-white px-3 py-2.5 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
                    />
                  </div>

                  <div className="hidden text-sm font-semibold text-stone-800 lg:block">
                    {currencyFormatter.format(product.professionalPrice)}
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:block lg:text-right">
                    <span className="text-sm font-semibold text-stone-500 lg:hidden">
                      {copy.fields.lineTotal}
                    </span>
                    <span className="text-base font-bold text-stone-950">
                      {currencyFormatter.format(lineTotal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="order-iva"
              className="block text-sm font-semibold text-stone-900"
            >
              {copy.fields.iva}
            </label>
            <input
              id="order-iva"
              name="order-iva"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={ivaInput}
              onChange={(event) => setIvaInput(event.target.value)}
              className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
            />
          </div>

          <div>
            <label
              htmlFor="order-transport"
              className="block text-sm font-semibold text-stone-900"
            >
              {copy.fields.transport}
            </label>
            <input
              id="order-transport"
              name="order-transport"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={transportInput}
              onChange={(event) => setTransportInput(event.target.value)}
              className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-600">
          <p>{copy.notes.first}</p>
          <p className="mt-3">{copy.notes.second}</p>
        </div>
      </div>

      <aside className="border-t border-stone-200 bg-stone-950 px-5 py-6 text-white sm:px-7 lg:border-l lg:border-t-0">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-300">
            {copy.fields.total}
          </p>

          <p className="mt-3 break-words text-4xl font-black tracking-tight sm:text-5xl">
            {currencyFormatter.format(result.total)}
          </p>

          {!hasQuantities ? (
            <p className="mt-3 text-sm leading-6 text-stone-300">
              {copy.helper.empty}
            </p>
          ) : null}
        </div>

        <dl className="mt-5 space-y-3">
          <ResultRow
            label={copy.fields.approximateSquareMetres}
            value={`${numberFormatter.format(
              result.approximateSquareMetres
            )} m²`}
          />

          <ResultRow
            label={copy.fields.subtotal}
            value={currencyFormatter.format(result.subtotal)}
          />

          <ResultRow
            label={copy.fields.ivaAmount}
            value={currencyFormatter.format(result.ivaAmount)}
          />

          <ResultRow
            label={copy.fields.transportCost}
            value={currencyFormatter.format(result.transportCost)}
          />
        </dl>

        <div className="mt-5 grid gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!hasQuantities}
            className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-stone-950 transition hover:bg-stone-200 focus:outline-none focus:ring-4 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {copy.actions.download}
          </button>

          <a
            href={hasQuantities ? buildWhatsAppUrl(summaryText) : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!hasQuantities}
            className={`rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition ${
              hasQuantities
                ? 'hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20'
                : 'pointer-events-none opacity-45'
            }`}
          >
            {copy.actions.whatsapp}
          </a>

          <a
            href={
              hasQuantities
                ? buildEmailUrl(copy.emailSubject, summaryText)
                : undefined
            }
            aria-disabled={!hasQuantities}
            className={`rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-bold text-white transition ${
              hasQuantities
                ? 'hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20'
                : 'pointer-events-none opacity-45'
            }`}
          >
            {copy.actions.email}
          </a>
        </div>
      </aside>
    </div>
  );
}

type ResultRowProps = {
  label: string;
  value: string;
};

function ResultRow({ label, value }: ResultRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <dt className="text-sm leading-6 text-stone-300">{label}</dt>
      <dd className="text-right text-base font-bold leading-6 text-white">
        {value}
      </dd>
    </div>
  );
}
