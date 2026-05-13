'use client';

import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import {
  calculateIsobellEstimate,
  toNonNegativeNumber
} from '@/lib/calculator';
import { copy } from '@/lib/copy';
import {
  getDefaultSystem,
  getSystemById,
  isobellSystems,
  type IsobellSystemId,
  type Locale
} from '@/lib/prices';

export default function Calculator() {
  const [locale, setLocale] = useState<Locale>('es');
  const [squareMetresInput, setSquareMetresInput] = useState('');
  const [ivaInput, setIvaInput] = useState('21');
  const [transportInput, setTransportInput] = useState('0');
  const [selectedSystemId, setSelectedSystemId] = useState<IsobellSystemId>(
    getDefaultSystem().id
  );
  const [hasCalculated, setHasCalculated] = useState(false);

  const activeCopy = copy[locale];
  const selectedSystem = getSystemById(selectedSystemId);

  const squareMetres = toNonNegativeNumber(squareMetresInput);
  const ivaPercentage = toNonNegativeNumber(ivaInput);
  const transportCost = toNonNegativeNumber(transportInput);

  const result = useMemo(
    () =>
      calculateIsobellEstimate({
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
    setSelectedSystemId(value as IsobellSystemId);
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
    <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col justify-center">
      <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <header className="flex flex-col gap-5 border-b border-stone-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white p-2 shadow-sm">
              <Image
                src="/logo.png"
                alt="OIKOTHERM"
                width={120}
                height={120}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                OIKOTHERM · ISOBELL
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
                {activeCopy.title}
              </h1>
            </div>
          </div>

          <LanguageSelector activeLocale={locale} onChange={setLocale} />
        </header>

        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="text-base font-semibold leading-7 text-stone-800">
              {activeCopy.subtitle}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
              {activeCopy.intro}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="square-metres"
                  className="block text-sm font-semibold text-stone-900"
                >
                  {activeCopy.fields.squareMetres}
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
                  placeholder={activeCopy.placeholders.squareMetres}
                  className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
                />
              </div>

              <div>
                <label
                  htmlFor="isobell-system"
                  className="block text-sm font-semibold text-stone-900"
                >
                  {activeCopy.fields.system}
                </label>
                <select
                  id="isobell-system"
                  name="isobell-system"
                  value={selectedSystemId}
                  onChange={(event) => handleSystemChange(event.target.value)}
                  className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
                >
                  {isobellSystems.map((system) => (
                    <option key={system.id} value={system.id}>
                      {system.labels[locale]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="iva"
                    className="block text-sm font-semibold text-stone-900"
                  >
                    {activeCopy.fields.iva}
                  </label>
                  <input
                    id="iva"
                    name="iva"
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
                    htmlFor="transport"
                    className="block text-sm font-semibold text-stone-900"
                  >
                    {activeCopy.fields.transport}
                  </label>
                  <input
                    id="transport"
                    name="transport"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={transportInput}
                    onChange={(event) =>
                      handleTransportChange(event.target.value)
                    }
                    placeholder={activeCopy.placeholders.transport}
                    className="mt-2 block w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-stone-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-stone-950 px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-300"
              >
                {activeCopy.button}
              </button>
            </form>

            <div className="mt-7 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-600">
              <p>{activeCopy.notes.first}</p>
              <p className="mt-3">{activeCopy.notes.second}</p>
            </div>
          </div>

          <aside className="border-t border-stone-200 bg-stone-950 px-5 py-6 text-white sm:px-8 sm:py-8 lg:border-l lg:border-t-0">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-300">
                {activeCopy.fields.total}
              </p>

              <p className="mt-3 break-words text-4xl font-black tracking-tight sm:text-5xl">
                {currencyFormatter.format(result.total)}
              </p>

              {!hasSquareMetres && !hasCalculated ? (
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {activeCopy.helper.empty}
                </p>
              ) : null}
            </div>

            <dl className="mt-5 space-y-3">
              <ResultRow
                label={activeCopy.fields.professionalPricePerM2}
                value={`${currencyFormatter.format(
                  result.professionalPricePerM2
                )} / m²`}
              />

              <ResultRow
                label={activeCopy.fields.subtotal}
                value={currencyFormatter.format(result.subtotal)}
              />

              <ResultRow
                label={activeCopy.fields.ivaAmount}
                value={currencyFormatter.format(result.ivaAmount)}
              />

              <ResultRow
                label={activeCopy.fields.transportCost}
                value={currencyFormatter.format(result.transportCost)}
              />

              <ResultRow
                label={activeCopy.fields.rolls}
                value={numberFormatter.format(result.rolls)}
              />
            </dl>
          </aside>
        </div>
      </section>
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
