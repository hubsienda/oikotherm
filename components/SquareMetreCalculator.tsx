'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  calculateSquareMetreEstimate,
  toNonNegativeNumber
} from '@/lib/calculator';
import {
  getDefaultSquareMetreSystem,
  getSquareMetreSystemById,
  squareMetreSystems,
  type Locale,
  type SquareMetreSystemId
} from '@/lib/prices';
import type { CalculatorCopy } from '@/lib/copy';

type SquareMetreCalculatorProps = {
  locale: Locale;
  copy: CalculatorCopy['squareMetres'];
};

export default function SquareMetreCalculator({
  locale,
  copy
}: SquareMetreCalculatorProps) {
  const [squareMetresInput, setSquareMetresInput] = useState('');
  const [ivaInput, setIvaInput] = useState('21');
  const [transportInput, setTransportInput] = useState('0');
  const [selectedSystemId, setSelectedSystemId] =
    useState<SquareMetreSystemId>(getDefaultSquareMetreSystem().id);
  const [hasCalculated, setHasCalculated] = useState(false);

  const selectedSystem = getSquareMetreSystemById(selectedSystemId);

  const squareMetres = toNonNegativeNumber(squareMetresInput);
  const ivaPercentage = toNonNegativeNumber(ivaInput);
  const transportCost = toNonNegativeNumber(transportInput);

  const result = useMemo(
    () =>
      calculateSquareMetreEstimate({
        squareMetres,
        pricePerM2: selectedSystem.pricePerM2,
        ivaPercentage,
        transportCost
      }),
    [squareMetres, selectedSystem.pricePerM2, ivaPercentage, transportCost]
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
      maximumFractionDigits: 2
    });
  }, [locale]);

  const hasSquareMetres = squareMetres > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasCalculated(true);
  }

  function handleSquareMetresChange(value: string) {
    setSquareMetresInput(value);
    setHasCalculated(false);
  }

  function handleSystemChange(value: string) {
    setSelectedSystemId(value as SquareMetreSystemId);
    setHasCalculated(false);
  }

  function handleIvaChange(value: string) {
    setIvaInput(value);
    setHasCalculated(false);
  }

  function handleTransportChange(value: string) {
    setTransportInput(value);
    setHasCalculated(false);
  }

  return (
    <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <h2 className="text-lg font-bold tracking-tight text-stone-950 sm:text-xl">
          {copy.title}
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-stone-800">
          {copy.subtitle}
        </p>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          {copy.intro}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="square-metres"
              className="block text-sm font-semibold text-stone-900"
            >
              {copy.fields.squareMetres}
            </label>
            <input
              id="square-metres"
              name="square-metres"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={squareMetresInput}
              onChange={(event) =>
                handleSquareMetresChange(event.target.value)
              }
              placeholder={copy.placeholders.squareMetres}
              className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
            />
          </div>

          <div>
            <label
              htmlFor="isobell-system"
              className="block text-sm font-semibold text-stone-900"
            >
              {copy.fields.system}
            </label>
            <select
              id="isobell-system"
              name="isobell-system"
              value={selectedSystemId}
              onChange={(event) => handleSystemChange(event.target.value)}
              className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
            >
              {squareMetreSystems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.labels[locale]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="square-iva"
                className="block text-sm font-semibold text-stone-900"
              >
                {copy.fields.iva}
              </label>
              <input
                id="square-iva"
                name="square-iva"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={ivaInput}
                onChange={(event) => handleIvaChange(event.target.value)}
                className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
              />
            </div>

            <div>
              <label
                htmlFor="square-transport"
                className="block text-sm font-semibold text-stone-900"
              >
                {copy.fields.transport}
              </label>
              <input
                id="square-transport"
                name="square-transport"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={transportInput}
                onChange={(event) => handleTransportChange(event.target.value)}
                placeholder={copy.placeholders.transport}
                className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-stone-950 px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-300"
          >
            {copy.button}
          </button>
        </form>

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

          {!hasSquareMetres && !hasCalculated ? (
            <p className="mt-3 text-sm leading-6 text-stone-300">
              {copy.helper.empty}
            </p>
          ) : null}
        </div>

        <dl className="mt-5 space-y-3">
          <ResultRow
            label={copy.fields.professionalPricePerM2}
            value={`${currencyFormatter.format(
              result.professionalPricePerM2
            )} / m²`}
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

          <ResultRow
            label={copy.fields.rolls}
            value={numberFormatter.format(result.rolls)}
          />
        </dl>
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
