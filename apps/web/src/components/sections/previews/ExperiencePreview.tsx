// src/components/sections/previews/ExperiencePreview.tsx
'use client';

import { useTranslation } from 'react-i18next';

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
}

function ExperienceItem({ title, company, period, description, achievements, tags }: ExperienceItemProps) {
  // Extraire l'année depuis la période (ex: "Mar 2025 – Sep 2025" → "2025")
  const yearMatch = period.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : '';

  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Ligne verticale de la timeline */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-[var(--card-border)] group-last:hidden" />

      {/* Point de la timeline */}
      <div className="absolute left-0 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--card-background)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
      <div className="absolute left-0 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--card-background)] group-hover:bg-[var(--accent)] transition-colors duration-300 animate-pulse opacity-0 group-hover:opacity-100" style={{ animationDuration: '1.5s' }} />

      {/* Contenu */}
      <div className="bg-[var(--card-background)] rounded-xl border border-[var(--card-border)] shadow-sm hover:shadow-md hover:border-[var(--accent)] transition-all duration-300 p-5 md:p-6">
        {/* En-tête : Année + Entreprise + Période */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div className="flex flex-wrap items-center gap-3">
            {year && (
              <span className="text-sm font-bold text-[var(--accent)] font-mono bg-[var(--accent)]/10 px-2 py-0.5 rounded">
                {year}
              </span>
            )}
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {title}
            </h3>
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-mono opacity-60 flex-shrink-0">
            {period}
          </span>
        </div>

        {/* Entreprise */}
        <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          {company}
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3 font-sans border-l-2 border-[var(--accent)]/30 pl-3">
          {description}
        </p>

        {/* Réalisations */}
        <ul className="space-y-1 mb-3">
          {achievements.map((item, idx) => (
            <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2 font-sans">
              <span className="text-[var(--accent)] mt-0.5 text-xs">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--card-border)]/50">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] text-[10px] font-mono rounded border border-[var(--card-border)] transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePreview() {
  const { t } = useTranslation('experience');

  const experiences = t('items', { returnObjects: true }) as ExperienceItemProps[];

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* En-tête */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-3xl font-bold text-[var(--foreground)] font-mono">
            {t('title')}
          </h2>
          <span className="text-sm text-[var(--text-secondary)] opacity-40 font-mono">
            ({experiences.length} expérience{experiences.length > 1 ? 's' : ''})
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-mono opacity-60 pl-4">
          {t('subtitle') || 'parcours professionnel'}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {experiences.map((exp, idx) => (
          <ExperienceItem key={idx} {...exp} />
        ))}
      </div>

      {/* Pied de section */}
      <div className="mt-6 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono opacity-40">
        <span>{experiences.length} expérience{experiences.length > 1 ? 's' : ''}</span>
        <span>{t('section_footer.end')}</span>
      </div>
    </section>
  );
}