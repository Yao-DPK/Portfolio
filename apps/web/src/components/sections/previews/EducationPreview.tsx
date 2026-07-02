// src/components/sections/previews/EducationPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';

interface EducationItemProps {
  period: string;
  title: string;
  subtitle: string;
  school: string;
  location: string;
  description: string;
  skills: string[];
  projects: string[];
}

function EducationItem({ period, title, subtitle, school, location, description, skills, projects }: EducationItemProps) {
  return (
    <div className="relative flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Point sur la timeline */}
      <div className="hidden md:flex md:flex-col md:items-end md:w-1/3">
        <div className="flex items-center gap-3 w-full justify-end">
          <span className="text-sm font-mono text-[var(--text-secondary)] whitespace-nowrap">
            {period}
          </span>
          <div className="relative flex-shrink-0">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/40"></div>
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-[var(--accent)] animate-ping opacity-75"></div>
          </div>
        </div>
      </div>

      {/* Carte de contenu */}
      <div className="flex-1 bg-[var(--card-background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-md hover:border-[var(--accent)]/50 transition-all duration-300">
        {/* Version mobile de la période */}
        <div className="flex md:hidden items-center gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/40"></div>
          </div>
          <span className="text-sm font-mono text-[var(--text-secondary)]">
            {period}
          </span>
        </div>

        {/* Titre et sous-titre */}
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm font-medium text-[var(--accent)] mb-1">
            {subtitle}
          </p>
        )}
        <p className="text-base font-medium text-[var(--foreground)]">
          {school}
        </p>
        <p className="text-sm text-[var(--text-secondary)] mb-3">
          📍 {location}
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          {description}
        </p>

        {/* Compétences */}
        {skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Compétences développées
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs rounded-full border border-[var(--card-border)] transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projets académiques */}
        {projects.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Projets académiques clés
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[var(--text-secondary)]">
              {projects.map((project) => (
                <li key={project}>{project}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EducationPreview() {
  const { t } = useTranslation('education');

  const items = t('items', { returnObjects: true }) as EducationItemProps[];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16" id="education">
      {/* En-tête */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          {t('title')}
        </h2>
        <p className="text-[var(--text-secondary)]">
          {t('description')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Ligne verticale */}
        <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-[var(--card-border)] -translate-x-1/2"></div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <EducationItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}