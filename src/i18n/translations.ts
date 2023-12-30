import clIcon from '@iconify-icons/circle-flags/cl.js';
import deIcon from '@iconify-icons/circle-flags/de.js';
import frIcon from '@iconify-icons/circle-flags/fr.js';
import itIcon from '@iconify-icons/circle-flags/it.js';
import usIcon from '@iconify-icons/circle-flags/us.js';
import zhIcon from '@iconify-icons/circle-flags/zh.js';

import { deWithFallback } from './de.ts';
import { enWithFallback } from './en.ts';
import { es, type Translations } from './es.ts';
import { frWithFallback } from './fr.ts';
import { itWithFallback } from './it.ts';
import { zhWithFallback } from './zh.ts';

export const languages = {
  es: {
    label: 'Español (CL)',
    icon: clIcon,
    translateFrom: null,
  },
  en: {
    label: 'English (US)',
    icon: usIcon,
    translateFrom: 'es',
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
  it: {
    label: 'Italiano',
    icon: itIcon,
    translateFrom: 'es',
  },
  zh: {
    label: '简体中文',
    icon: zhIcon,
    translateFrom: 'en',
  },
} as const;

export type LanguageKey = keyof typeof languages;

const langData = {
  es,
  en: enWithFallback,
  de: deWithFallback,
  fr: frWithFallback,
  it: itWithFallback,
  zh: zhWithFallback,
} as const;

export function useTranslations(lang: string = 'es'): (key: keyof Translations) => string {
  return function t(key: keyof Translations): string {
    return langData[lang as LanguageKey][key] || es[key];
  };
}
