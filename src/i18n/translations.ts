import { deWithFallback } from "./de.ts";
import { enWithFallback } from "./en.ts";
import { es, type Translations } from "./es.ts";

export const languages = {
  en: "English",
  es: "Español",
  de: "Deutsch",
} as const;

export const langData = {
  en: enWithFallback,
  es,
  de: deWithFallback,
} as const;

type LanguageKeys = keyof typeof langData;

export function useTranslations(
  lang: string = "es"
): (key: keyof Translations) => string {
  return function t(key: keyof Translations): string {
    return langData[lang as LanguageKeys][key] || es[key];
  };
}
