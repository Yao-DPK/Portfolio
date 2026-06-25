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
  return (
    <div className="bg-[var(--card-background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-md hover:border-[var(--accent)] transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
        <h3 className="text-xl font-semibold text-[var(--foreground)]">
          {title} · {company}
        </h3>
        <span className="text-sm text-[var(--text-secondary)] font-mono">
          {period}
        </span>
      </div>
      <p className="text-[var(--text-secondary)] text-sm italic mb-3">
        {description}
      </p>
      <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] text-sm">
        {achievements.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-medium rounded-full border border-[var(--card-border)] transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperiencePreview() {
  const { t } = useTranslation('experience');

  // Récupérer le tableau d'expériences depuis les traductions
  const experiences = t('items', { returnObjects: true }) as ExperienceItemProps[];
  console.log("experiences: ", experiences);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">
        {t('title')}
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <ExperienceItem key={idx} {...exp} />
        ))}
      </div>
    </section>
  );
}