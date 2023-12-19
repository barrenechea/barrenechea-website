import { ui } from "./ui";

export function useTranslations(
  lang?: string
): (key: keyof (typeof ui)["en"]) => string {
  return function t(key?: keyof (typeof ui)["en"]) {
    if (!key) return "";
    return (
      (ui[lang as "en"] as (typeof ui)["en"])[key] || (ui["en"][key] as string)
    );
  };
}
