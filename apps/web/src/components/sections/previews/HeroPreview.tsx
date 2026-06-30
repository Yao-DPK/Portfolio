// src/components/sections/previews/HeroPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import GithubIcon from '@/components/icons/githubIcon';

export default function HeroPreview() {
  const { t } = useTranslation('hero');

  return (
    <section className="max-w-5xl mx-auto px-6 pt-32 pb-16">
      {/* Conteneur principal */}
      <div className="relative bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl shadow-lg shadow-[var(--card-border)]/10 transition-colors duration-300 overflow-hidden">
        
        {/* Effets de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent dark:from-[var(--accent)]/10 dark:via-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,var(--accent)/3%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_20%_50%,var(--accent)/6%,transparent_70%)] pointer-events-none" />

        {/* Contenu principal en grille */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 px-6 md:px-10 py-8 md:py-12 items-center">
          
          {/* Photo de profil */}
          <div className="flex flex-col justify-center  md:justify-start">
            <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-[var(--accent)]/30 shadow-xl shadow-[var(--accent)]/10 transition-all duration-300 group">
              <Image
                src="/images/profile/profile.jpg"
                alt="Yao Konan"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              />
              {/* Effet de lueur subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className='relative mb-2 mt-2 justify-center items-center '>
              <a
                href="mailto:yao.konan2709@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[var(--text-secondary)] hover:text-[var(--accent)]  m-1
                 items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-border)]/30 
                 hover:bg-[var(--accent)]/10 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-300"
              >
                <EmailIcon />
              
              </a>
              <a
                href="https://github.com/Yao-DPK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[var(--text-secondary)] hover:text-[var(--accent)]  m-1
                 items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-border)]/30 
                 hover:bg-[var(--accent)]/10 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-300"
              > 
                <GitHubIcon />
              </a>
              <a
                href="https://linkedin.com/in/yaokonan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-[var(--text-secondary)] hover:text-[var(--accent)]  m-1
                 items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-border)]/30 
                 hover:bg-[var(--accent)]/10 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-300"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Bloc texte */}
          <div className="flex flex-col items-start text-center md:text-left">
            
            {/* Nom avec étoiles */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[var(--accent)] opacity-40 text-xl">✦</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] font-mono tracking-tight">
                {t('title')}
              </h1>
              <span className="text-[var(--accent)] opacity-40 text-xl">✦</span>
            </div>

            {/* Rôle + localisation */}
            <p className="text-base md:text-lg text-[var(--text-secondary)] font-mono mb-4">
              {t('subtitle')}
            </p>

            {/* Description */}
            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl font-sans border-l-3 border-[var(--accent)] pl-4">
              {t('description')}
            </p>

            {/* Séparateur */}
            <div className="my-4 w-full h-px bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/40 to-[var(--accent)]/20" />

            {/* Liens avec icônes */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-border)]/30 hover:bg-[var(--accent)]/10 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-200"
              >
                <span className="text-base">🗂️</span>
                {t('cta.projects')}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-border)]/30 hover:bg-[var(--accent)]/10 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-200"
              >
                <span className="text-base">✉️</span>
                {t('cta.contact')}
              </a>
              <a
                href="/docs/CV_fr.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-border)]/30 hover:bg-[var(--accent)]/10 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-200"
              >
                <span className="text-base">📄</span>
                {t('cta.resume')}
              </a>
              
            </div>

            {/* Séparateur */}
            <div className="my-4 w-full h-px bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/40 to-[var(--accent)]/20" />

            {/* Badge "Ouvert aux opportunités" */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-[var(--foreground)] font-mono">
                {t('badge')}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}