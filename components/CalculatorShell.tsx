'use client';

import Image from 'next/image';
import { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import OrderCalculator from '@/components/OrderCalculator';
import SquareMetreCalculator from '@/components/SquareMetreCalculator';
import { copy } from '@/lib/copy';
import type { Locale } from '@/lib/prices';

type Mode = 'order' | 'square-metres';

export default function CalculatorShell() {
  const [locale, setLocale] = useState<Locale>('es');
  const [mode, setMode] = useState<Mode>('order');

  const activeCopy = copy[locale];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col justify-center">
      <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <header className="border-b border-stone-200 px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-stone-200 bg-white p-3 shadow-sm sm:h-24 sm:w-24">
                <Image
                  src="/logo.png"
                  alt="OIKOTHERM"
                  width={180}
                  height={180}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  OIKOTHERM · ISOBELL
                </p>
                <h1 className="mt-1 text-xl font-bold tracking-tight text-stone-950 sm:text-2xl">
                  {activeCopy.appTitle}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                  {activeCopy.appSubtitle}
                </p>
              </div>
            </div>

            <LanguageSelector
              activeLocale={locale}
              onChange={setLocale}
              ariaLabel={activeCopy.languageSelectorLabel}
            />
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setMode('order')}
              aria-pressed={mode === 'order'}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                mode === 'order'
                  ? 'border-stone-950 bg-stone-950 text-white'
                  : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
              }`}
            >
              {activeCopy.modes.order}
            </button>

            <button
              type="button"
              onClick={() => setMode('square-metres')}
              aria-pressed={mode === 'square-metres'}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                mode === 'square-metres'
                  ? 'border-stone-950 bg-stone-950 text-white'
                  : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
              }`}
            >
              {activeCopy.modes.squareMetres}
            </button>
          </div>
        </header>

        {mode === 'order' ? (
          <OrderCalculator locale={locale} copy={activeCopy.order} />
        ) : (
          <SquareMetreCalculator
            locale={locale}
            copy={activeCopy.squareMetres}
          />
        )}
      </section>
    </div>
  );
}
