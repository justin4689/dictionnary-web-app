import type { LangCode } from "@/lib/lang";

type TranslationKey =
  | "search_placeholder"
  | "search_aria"
  | "loading"
  | "updating"
  | "no_results"
  | "footer_copyright"
  | "toggle_theme"
  | "theme_light"
  | "theme_dark"
  | "theme_system"
  | "lang_fr"
  | "lang_en"
  | "lang_es"
  | "lang_de"
  | "lang_it";

type Translations = Record<LangCode, Record<TranslationKey, string>>;

export const translations: Translations = {
  fr: {
    search_placeholder: "Rechercher un mot...",
    search_aria: "Rechercher",
    loading: "Chargement",
    updating: "Mise à jour…",
    no_results: "Aucun résultat.",
    footer_copyright: "© {{year}} WordBase. Tous droits réservés.",
    toggle_theme: "Changer le thème",
    theme_light: "Clair",
    theme_dark: "Sombre",
    theme_system: "Système",
    lang_fr: "Français",
    lang_en: "Anglais",
    lang_es: "Espagnol",
    lang_de: "Allemand",
    lang_it: "Italien",
  },
  en: {
    search_placeholder: "Search for a word...",
    search_aria: "Search",
    loading: "Loading",
    updating: "Updating…",
    no_results: "No results.",
    footer_copyright: "© {{year}} WordBase. All rights reserved.",
    toggle_theme: "Toggle theme",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_system: "System",
    lang_fr: "French",
    lang_en: "English",
    lang_es: "Spanish",
    lang_de: "German",
    lang_it: "Italian",
  },
  es: {
    search_placeholder: "Buscar una palabra...",
    search_aria: "Buscar",
    loading: "Cargando",
    updating: "Actualizando…",
    no_results: "Sin resultados.",
    footer_copyright: "© {{year}} WordBase. Todos los derechos reservados.",
    toggle_theme: "Cambiar tema",
    theme_light: "Claro",
    theme_dark: "Oscuro",
    theme_system: "Sistema",
    lang_fr: "Francés",
    lang_en: "Inglés",
    lang_es: "Español",
    lang_de: "Alemán",
    lang_it: "Italiano",
  },
  de: {
    search_placeholder: "Wort suchen...",
    search_aria: "Suchen",
    loading: "Lädt",
    updating: "Aktualisierung…",
    no_results: "Keine Ergebnisse.",
    footer_copyright: "© {{year}} WordBase. Alle Rechte vorbehalten.",
    toggle_theme: "Theme wechseln",
    theme_light: "Hell",
    theme_dark: "Dunkel",
    theme_system: "System",
    lang_fr: "Französisch",
    lang_en: "Englisch",
    lang_es: "Spanisch",
    lang_de: "Deutsch",
    lang_it: "Italienisch",
  },
  it: {
    search_placeholder: "Cerca una parola...",
    search_aria: "Cerca",
    loading: "Caricamento",
    updating: "Aggiornamento…",
    no_results: "Nessun risultato.",
    footer_copyright: "© {{year}} WordBase. Tutti i diritti riservati.",
    toggle_theme: "Cambia tema",
    theme_light: "Chiaro",
    theme_dark: "Scuro",
    theme_system: "Sistema",
    lang_fr: "Francese",
    lang_en: "Inglese",
    lang_es: "Spagnolo",
    lang_de: "Tedesco",
    lang_it: "Italiano",
  },
};

export function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const val = params[key];
    return val === undefined ? `{{${key}}}` : String(val);
  });
}

export type { TranslationKey, Translations };
