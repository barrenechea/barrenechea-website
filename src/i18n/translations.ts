import clIcon from '@iconify-icons/circle-flags/cl.js';
import deIcon from '@iconify-icons/circle-flags/de.js';
import frIcon from '@iconify-icons/circle-flags/fr.js';
import usIcon from '@iconify-icons/circle-flags/us.js';

import { deWithFallback } from './de.ts';
import { enWithFallback } from './en.ts';
import { es, type Translations } from './es.ts';
import { frWithFallback } from './fr.ts';

export const languages = {
  en: {
    label: 'English (US)',
    icon: usIcon,
    translateFrom: 'es',
  },
  es: {
    label: 'Español (CL)',
    icon: clIcon,
    translateFrom: null,
  },
  de: {
    label: 'Deutsch',
    icon: deIcon,
    translateFrom: 'en',
  },
  fr: {
    label: 'Français',
    icon: frIcon,
    translateFrom: 'es',
  },
} as const;

export type LanguageKey = keyof typeof languages;

const langData = {
  en: enWithFallback,
  es,
  de: deWithFallback,
  fr: frWithFallback,
} as const;

export function useTranslations(lang: string = 'es'): (key: keyof Translations) => string {
  return function t(key: keyof Translations): string {
    return langData[lang as LanguageKey][key] || es[key];
  };
}
