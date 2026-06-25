// src/utils/i18n/config.ts

// Langues supportées
export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr' as const;
export type Locale = (typeof locales)[number];

// Noms des langues (pour l'affichage)
export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

// Drapeaux associés
export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};

// ✅ Liste des namespaces (partagée avec index.ts)
export const namespaces = [
  'common',
  'hero',
  'technologies',
  'experience',
  'projects',
  'footer',
] as const;

export type Namespace = (typeof namespaces)[number];