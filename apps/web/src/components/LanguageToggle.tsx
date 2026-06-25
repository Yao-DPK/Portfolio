// src/components/LanguageToggle.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
// ✅ Nouveau chemin
import { locales, localeNames, localeFlags, type Locale } from '@/utils/i18n/config';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] as Locale) || 'fr';

  const switchLanguage = (locale: Locale) => {
    if (locale === currentLocale) return;
    const newPath = `/${locale}${pathname?.replace(/^\/[^\/]+/, '') || ''}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`
            px-2 py-1 rounded-full text-xs font-medium transition-all duration-200
            ${
              currentLocale === locale
                ? 'bg-[var(--accent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
          aria-label={`Switch to ${localeNames[locale]}`}
        >
          <span className="flex items-center gap-1">
            <span>{localeFlags[locale]}</span>
            <span className="hidden sm:inline">{locale.toUpperCase()}</span>
          </span>
        </button>
      ))}
    </div>
  );
}