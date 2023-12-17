export const formatDate = (date: Date, lang: string = "en"): string => {
  return date.toLocaleDateString(lang, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
