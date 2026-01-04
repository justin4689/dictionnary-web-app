// lib/api.ts

export const langMap = {
  fr: "fr.wiktionary.org",
  en: "en.wiktionary.org",
  es: "es.wiktionary.org",
  de: "de.wiktionary.org",
  it: "it.wiktionary.org",
} as const;

export type LangCode = keyof typeof langMap;

export type WiktionaryApiResponse = {
  batchcomplete?: string;
  warnings?: unknown;
  query?: {
    pages?: Record<
      string,
      {
        pageid: number;
        ns: number;
        title: string;
        extract?: string;
        missing?: string;
      }
    >;
  };
};

export async function getWord(word: string, lang: LangCode): Promise<WiktionaryApiResponse> {
  const params = new URLSearchParams({
    word: word.trim(),
    lang,
  });
  const res = await fetch(`/api/word?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Wiktionary request failed (${res.status})`);
  }

  return (await res.json()) as WiktionaryApiResponse;
}

const speechLocaleByLang: Record<LangCode, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
  it: "it-IT",
};

function toSpeechLocale(lang: string): string {
  const key = lang as LangCode;
  return key in speechLocaleByLang ? speechLocaleByLang[key] : lang;
}

export function speak(word: string, lang: LangCode | string) {
  const locale = toSpeechLocale(lang);
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = locale;

  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    const lower = locale.toLowerCase();
    const base = locale.split("-")[0]?.toLowerCase();

    const match =
      voices.find((v) => v.lang?.toLowerCase() === lower) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith(`${base}-`)) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith(base || ""));

    if (match) {
      utterance.voice = match;
    }
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
