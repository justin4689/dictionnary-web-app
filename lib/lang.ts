export const langMap = {
  fr: "fr.wiktionary.org",
  en: "en.wiktionary.org",
  es: "es.wiktionary.org",
  de: "de.wiktionary.org",
  it: "it.wiktionary.org",
} as const;

export type LangCode = keyof typeof langMap;
