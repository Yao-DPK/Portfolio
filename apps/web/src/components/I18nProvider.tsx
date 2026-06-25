// src/components/I18nProvider.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Locale } from '@/utils/i18n/config';
import { resources, namespaces } from '@/utils/i18n';

// ✅ Instance i18n en dehors du composant pour persister
const i18nInstance = i18n.createInstance();

// Initialiser une seule fois
const initI18n = async () => {
  if (i18nInstance.isInitialized) {
    return i18nInstance;
  }

  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'fr',
      fallbackLng: 'fr',
      ns: namespaces,
      defaultNS: 'common',
      resources,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18nInstance;
};

const initPromise = initI18n();

export default function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const [ready, setReady] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    const init = async () => {
      await initPromise;
      
      if (i18nInstance.language !== locale) {
        await i18nInstance.changeLanguage(locale);
      }
      
      if (!isInitialized.current) {
        isInitialized.current = true;
        setReady(true);
      } else {
        setReady(true);
      }
    };
    
    init();
  }, [locale]);

  // ✅ Pendant le chargement, afficher un div transparent (pas de flash)
  if (!ready) {
    return <div className="min-h-screen bg-transparent"></div>;
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}