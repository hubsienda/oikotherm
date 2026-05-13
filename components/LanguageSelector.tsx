'use client';

import type { Locale } from '@/lib/prices';

type LanguageSelectorProps = {
  activeLocale: Locale;
  onChange: (locale: Locale) => void;
  ariaLabel: string;
};

export default function LanguageSelector({
  activeLocale,
  onChange,
  ariaLabel
}: LanguageSelectorProps) {
  return (
    <div
      className="inline-flex shrink-0 rounded-full border border-stone-300 bg-white p-1 shadow-sm"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange('es')}
        aria-pressed={activeLocale === 'es'}
        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
          activeLocale === 'es'
            ? 'bg-stone-950 text-white'
            : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
        }`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={activeLocale === 'en'}
        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
          activeLocale === 'en'
            ? 'bg-stone-950 text-white'
            : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
        }`}
      >
        EN
      </button>
    </div>
  );
}
