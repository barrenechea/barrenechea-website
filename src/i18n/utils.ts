import { AppConfig } from "~/config";

import { ui } from "./ui";

const { defaultLang } = AppConfig;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang! in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang?: string): ((key: keyof (typeof ui)[typeof defaultLang]) => string) {
  if (!lang) lang = defaultLang;
  return function t(key?: keyof (typeof ui)[typeof defaultLang]) {
    if (!key) return "";
    return (ui[lang as typeof defaultLang] as typeof ui[typeof defaultLang])[key] || ui[defaultLang][key] as string;
  };
}
