// src/components/sections/previews/TechnologiesPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';

interface TechnologyCategory {
  id: string;
  icon: string;
  items: string[];
}

export default function TechnologiesPreview() {
  const { t } = useTranslation('technologies');

  // Définition des catégories avec leurs icônes et technologies
  const categories: TechnologyCategory[] = [
    {
      id: 'frontend',
      icon: '🎨',
      items: ['react', 'nextjs', 'angular', 'tailwind'],
    },
    {
      id: 'backend',
      icon: '⚙️',
      items: ['nodejs', 'nestjs', 'express', 'fastapi'],
    },
    {
      id: 'database',
      icon: '🗄️',
      items: ['postgresql', 'mysql'],
    },
    {
      id: 'devops',
      icon: '🔧',
      items: ['docker', 'github', 'linux', 'websockets'],
    },
    {
      id: 'mobile',
      icon: '📱',
      items: ['flutter', 'reactnative'],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* En-tête de la section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          {t('title')}
        </h2>
        <p className="text-[var(--text-secondary)]">
          {t('description')}
        </p>
      </div>

      {/* Grille des catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-[var(--card-background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-md hover:border-[var(--accent)] transition-all duration-300"
          >
            {/* En-tête de la catégorie */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {t(`categories.${category.id}.name`)}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {t(`categories.${category.id}.description`)}
                </p>
              </div>
            </div>

            {/* Liste des technologies */}
            <div className="flex flex-wrap gap-2">
              {category.items.map((techKey) => (
                <span
                  key={techKey}
                  className="px-3 py-1 bg-[var(--badge-bg)] text-[var(--badge-text)] text-sm rounded-full border border-[var(--card-border)] transition-all duration-200 "
                >
                  {t(`items.${techKey}`)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}