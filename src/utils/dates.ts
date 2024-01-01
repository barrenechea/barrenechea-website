/**
 * Formats a date into a string representation.
 * @param date - The date to format.
 * @param lang - The language code for localization (default: "en").
 * @returns The formatted date string.
 */
export const formatDate = (date: Date, lang = 'en'): string => {
  return date.toLocaleDateString(lang, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
