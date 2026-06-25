// src/components/sections/previews/ProjectsPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';

interface ProjectItemProps {
  title: string;
  description: string;
  details: string[];
  tags: string[];
}

function ProjectItem({ title, description, details, tags }: ProjectItemProps) {
  return (
    <div className="bg-[var(--card-background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-md hover:border-[var(--accent)] transition-all duration-300">
      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm mb-3">
        {description}
      </p>
      <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] text-sm">
        {details.map((item, idx) => (
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

export default function ProjectsPreview() {
  const { t } = useTranslation('projects');

  // Récupérer le tableau de projets depuis les traductions
  const projects = t('items', { returnObjects: true }) as ProjectItemProps[];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">
        {t('title')}
      </h2>
      <div className="space-y-6">
        {projects.map((project, idx) => (
          <ProjectItem key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}