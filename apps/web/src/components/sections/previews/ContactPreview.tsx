// src/components/sections/previews/ContactPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';

export default function ContactPreview() {
  const { t } = useTranslation('contact');

  // ✅ Icônes SVG
  const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const contactItems = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: 'yaokonan@email.com',
      href: 'mailto:yaokonan@email.com',
      action: '📧 Envoyer un email',
    },
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      value: 'github.com/yaokonan',
      href: 'https://github.com/yaokonan',
      action: '🐙 Voir le profil',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/yaokonan',
      href: 'https://linkedin.com/in/yaokonan',
      action: '🔗 Voir le profil',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16" id="contact">
      {/* En-tête */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-3xl font-bold text-[var(--foreground)] font-mono">
            {t('title')}
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-mono opacity-60 pl-4">
          {t('description')}
        </p>
      </div>

      {/* Carte de visite */}
      <div className="relative bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl shadow-lg shadow-[var(--card-border)]/10 transition-colors duration-300 overflow-hidden">
        {/* Effet de fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent dark:from-[var(--accent)]/10 dark:via-transparent pointer-events-none" />

        <div className="relative z-10 px-8 md:px-10 py-8 md:py-10">
          {/* En-tête */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[var(--accent)] opacity-40 text-xl">✦</span>
                <span className="text-2xl font-bold text-[var(--foreground)] font-mono">Yao Konan.</span>
                <span className="text-[var(--accent)] opacity-40 text-xl">✦</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] font-mono">
                Full Stack Developer · Côte d'Ivoire · Remote
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono rounded-full border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t('info.availability')}
            </span>
          </div>

          {/* 3 liens en cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 bg-[var(--card-border)]/10 rounded-xl border border-[var(--card-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-300 text-center"
              >
                <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-2">
                  {item.icon}
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-mono opacity-60">
                  {item.label}
                </p>
                <p className="text-sm text-[var(--foreground)] font-mono truncate max-w-full group-hover:text-[var(--accent)] transition-colors">
                  {item.value}
                </p>
                <span className="mt-2 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.action} →
                </span>
              </a>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--card-border)]/50">
            <a
              href="mailto:yaokonan@email.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-[var(--accent)]/25"
            >
              💬 {t('info.contactAction')}
            </a>
            <a
              href="/docs/cv_fr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--card-border)]/30 hover:bg-[var(--card-border)]/60 text-[var(--foreground)] text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
            >
              📄 {t('info.cvAction')}
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--card-border)]/30 hover:bg-[var(--card-border)]/60 text-[var(--foreground)] text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
            >
              💼 {t('info.projectsAction')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}