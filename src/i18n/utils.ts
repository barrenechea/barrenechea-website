import { defaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang! in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui): ((key?: keyof (typeof ui)[typeof defaultLang]) => string) {
  return function t(key?: keyof (typeof ui)[typeof defaultLang]) {
    if (!key) return "";
    return (ui[lang] as typeof ui[typeof defaultLang])[key] || ui[defaultLang][key] as string;
  };
}
