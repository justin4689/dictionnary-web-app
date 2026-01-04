"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export type LangCode = "fr" | "en" | "es" | "de" | "it";

const LanguageContext = React.createContext<{
  lang: LangCode;
  setLang: (lang: LangCode) => void;
} | null>(null);

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<LangCode>("fr");

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ lang, setLang }}>
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
