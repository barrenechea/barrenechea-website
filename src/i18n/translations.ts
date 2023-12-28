import clIcon from '@iconify-icons/circle-flags/cl.js';
import deIcon from '@iconify-icons/circle-flags/de.js';
import usIcon from '@iconify-icons/circle-flags/us.js';

import { deWithFallback } from './de.ts';
import { enWithFallback } from './en.ts';
import { es, type Translations } from './es.ts';

export const languages = {
  en: {
    label: 'English (US)',
    icon: usIcon,
  },
  es: {
    label: 'Español (CL)',
    icon: clIcon,
  },
  de: {
    label: 'Deutsch',
    icon: deIcon,
  },
} as const;

export const langData = {
  en: enWithFallback,
  es,
  de: deWithFallback,
} as const;

type LanguageKeys = keyof typeof langData;

export function useTranslations(lang: string = 'es'): (key: keyof Translations) => string {
  return function t(key: keyof Translations): string {
    return langData[lang as LanguageKeys][key] || es[key];
  };
}
