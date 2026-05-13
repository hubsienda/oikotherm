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
    <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col">
      <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <header className="border-b border-stone-200 px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex items-center justify-between gap-4">
            <div className="relative h-12 w-56 sm:h-16 sm:w-80 lg:h-20 lg:w-[27rem]">
              <Image
                src="/logo.png"
                alt="OIKOTHERM"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 320px, 432px"
                className="object-contain object-left"
                priority
              />
            </div>

            <LanguageSelector
              activeLocale={locale}
              onChange={setLocale}
              ariaLabel={activeCopy.languageSelectorLabel}
            />
          </div>

          <div className="mx-auto mt-8 max-w-5xl text-center sm:mt-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-950 sm:text-3xl">
              {activeCopy.appTitle}
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-xl font-extrabold leading-snug tracking-tight text-stone-950 sm:text-2xl">
              {activeCopy.appSubtitle}
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
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
