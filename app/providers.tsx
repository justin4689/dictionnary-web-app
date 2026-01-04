"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { LangCode } from "@/lib/lang";
import { interpolate, translations, type TranslationKey } from "@/lib/i18n";

const LanguageContext = React.createContext<{
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
} | null>(null);

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<LangCode>("fr");

  const t = React.useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      const table = translations[lang] ?? translations.en;
      const template = table[key] ?? translations.en[key] ?? key;
      return interpolate(template, params);
    },
    [lang]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        {children}
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within Providers");
  }
  return ctx;
}
