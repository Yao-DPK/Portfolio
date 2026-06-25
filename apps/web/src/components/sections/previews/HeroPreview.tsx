// src/components/sections/previews/HeroPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';

export default function HeroPreview() {
  const { t } = useTranslation('hero');

  return (
    <section className="max-w-4xl mx-auto px-6 pt-32 pb-16">
      <div className="flex flex-col items-start text-left">
        {/* Badge "Ouvert aux opportunités" */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal-50 dark:bg-royal-900/30 text-royal-600 dark:text-royal-400 text-sm font-medium border border-royal-200 dark:border-royal-800 transition-colors duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-royal-500"></span>
            </span>
            {t('badge')}
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-2">
          {t('title')}
        </h1>

        {/* Sous-titre */}
        <h2 className="text-xl md:text-2xl font-normal text-[var(--text-secondary)] mb-6">
          {t('subtitle')}
        </h2>

        {/* Description */}
        <p className="max-w-2xl text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
          {t('description')}
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white hover:text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40"
          >
            {t('cta.projects')}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent)] font-medium rounded-xl transition-all duration-200"
          >
            {t('cta.contact')}
          </a>
          {/* <a
            href="/docs/cv_fr.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium rounded-xl transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700"
          >
            {t('cta.resume')}
          </a> */}
        </div>

        {/* Séparateur */}
        <div className="w-12 h-1 bg-[var(--accent)] rounded-full mt-8"></div>
      </div>
    </section>
  );
}