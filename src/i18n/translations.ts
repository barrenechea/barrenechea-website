import brIcon from '@iconify-icons/circle-flags/br';
import clIcon from '@iconify-icons/circle-flags/cl';
import deIcon from '@iconify-icons/circle-flags/de';
import frIcon from '@iconify-icons/circle-flags/fr';
import isIcon from '@iconify-icons/circle-flags/is';
import itIcon from '@iconify-icons/circle-flags/it';
import jpIcon from '@iconify-icons/circle-flags/jp';
import ruIcon from '@iconify-icons/circle-flags/ru';
import saIcon from '@iconify-icons/circle-flags/sa';
import usIcon from '@iconify-icons/circle-flags/us';
import zhIcon from '@iconify-icons/circle-flags/zh';

import { arWithFallback } from './ar.ts';
import { deWithFallback } from './de.ts';
import { enWithFallback } from './en.ts';
import { es, type Translations } from './es.ts';
import { frWithFallback } from './fr.ts';
import { isWithFallback } from './is.ts';
import { itWithFallback } from './it.ts';
import { jaWithFallback } from './ja.ts';
import { ptWithFallback } from './pt.ts';
import { ruWithFallback } from './ru.ts';
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
  pt: {
    label: 'Português (BR)',
    icon: brIcon,
    translateFrom: 'es',
  },
  de: {
    label: 'Deutsch',
    icon: deIcon,
    translateFrom: 'en',
  },
  ru: {
    label: 'Русский',
    icon: ruIcon,
    translateFrom: 'en',
  },
  zh: {
    label: '简体中文',
    icon: zhIcon,
    translateFrom: 'en',
  },
  ja: {
    label: '日本語',
    icon: jpIcon,
    translateFrom: 'en',
  },
  ar: {
    label: 'العربية',
    icon: saIcon,
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
  is: {
    label: 'Íslenska',
    icon: isIcon,
    translateFrom: 'en',
  },
} as const;

export type LanguageKey = keyof typeof languages;

const langData = {
  es,
  en: enWithFallback,
  pt: ptWithFallback,
  de: deWithFallback,
  ru: ruWithFallback,
  zh: zhWithFallback,
  ar: arWithFallback,
  fr: frWithFallback,
  it: itWithFallback,
  is: isWithFallback,
  ja: jaWithFallback,
} as const;

export function useTranslations(
  lang = 'es'
): (key: keyof Translations, params?: Record<string, string>) => string {
  return function t(key: keyof Translations, params?: Record<string, string>): string {
    let result = langData[lang as LanguageKey][key] ?? es[key];
    if (params) {
      for (const [paramKey, paramValue] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
      }
    }
    return result;
  };
}
