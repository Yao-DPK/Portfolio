// src/components/sections/previews/TechnologiesPreview.tsx
'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  category: string;
  badge: string;
}

interface TechnologyCategory {
  id: string;
  icon: string;
  label: string;
}

export default function TechnologiesPreview() {
  const { t } = useTranslation('technologies');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // ✅ Définition des technologies avec leurs badges
  const technologies: Technology[] = [
    // Frontend
    { id: 'react', name: 'React', category: 'frontend', badge: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
    { id: 'nextjs', name: 'Next.js', category: 'frontend', badge: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white' },
    { id: 'angular', name: 'Angular', category: 'frontend', badge: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', badge: 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white' },
    { id: 'framer', name: 'Framer Motion', category: 'frontend', badge: 'https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white' },
    // Backend
    { id: 'nodejs', name: 'Node.js', category: 'backend', badge: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white' },
    { id: 'nestjs', name: 'NestJS', category: 'backend', badge: 'https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white' },
    { id: 'express', name: 'Express.js', category: 'backend', badge: 'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB' },
    { id: 'fastapi', name: 'FastAPI', category: 'backend', badge: 'https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white' },
    { id: 'spring', name: 'Spring Boot', category: 'backend', badge: 'https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white' },
    // Database
    { id: 'postgresql', name: 'PostgreSQL', category: 'database', badge: 'https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white' },
    { id: 'mysql', name: 'MySQL', category: 'database', badge: 'https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white' },
    // DevOps & Tools
    { id: 'docker', name: 'Docker', category: 'devops', badge: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white' },
    { id: 'github', name: 'GitHub Actions', category: 'devops', badge: 'https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white' },
    { id: 'linux', name: 'Linux', category: 'devops', badge: 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black' },
    { id: 'websockets', name: 'WebSockets', category: 'devops', badge: 'https://img.shields.io/badge/WebSockets-0052CC?style=for-the-badge&logo=socket.io&logoColor=white' },
    { id: 'postman', name: 'Postman', category: 'devops', badge: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' },
    // Mobile
    { id: 'flutter', name: 'Flutter', category: 'mobile', badge: 'https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white' },
    { id: 'reactnative', name: 'React Native', category: 'mobile', badge: 'https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
  ];

  // Catégories avec icônes
  const categories: TechnologyCategory[] = [
    { id: 'frontend', icon: '🎨', label: 'Frontend' },
    { id: 'backend', icon: '⚙️', label: 'Backend' },
    { id: 'database', icon: '🗄️', label: 'Database' },
    { id: 'devops', icon: '🔧', label: 'DevOps & Tools' },
    { id: 'mobile', icon: '📱', label: 'Mobile' },
  ];

  // ✅ Filtrer les technologies par catégorie
  const filteredTechnologies = activeCategory
    ? technologies.filter((tech) => tech.category === activeCategory)
    : technologies;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* En-tête */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2 font-mono">
          {t('title')}
        </h2>
        </div>
        
        <p className="text-[var(--text-secondary)] font-mono text-sm opacity-70">
          {t('description')}
        </p>
      </div>

      {/* Filtres (catégories) */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 ${
            activeCategory === null
              ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
              : 'bg-transparent text-[var(--text-secondary)] border-[var(--card-border)] hover:border-[var(--accent)]'
          }`}
        >
          {t('all')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-transparent text-[var(--text-secondary)] border-[var(--card-border)] hover:border-[var(--accent)]'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Compteur */}
      <div className="text-sm text-[var(--text-secondary)] font-mono opacity-60 mb-4">
        {t('categories_count', {count: filteredTechnologies.length})}
        {/* {filteredTechnologies.length} technologie{filteredTechnologies.length > 1 ? 's' : ''} affichée{filteredTechnologies.length > 1 ? 's' : ''} */}
        {activeCategory && (
          <span className="opacity-40"> · {categories.find(c => c.id === activeCategory)?.label}</span>
        )}
      </div>

      {/* Grille des badges */}
      <div className="flex flex-wrap gap-3">
        {filteredTechnologies.map((tech) => (
          <img
            key={tech.id}
            src={tech.badge}
            alt={tech.name}
            className="h-7 md:h-8 transition-all duration-200 hover:scale-105 hover:brightness-110"
            loading="lazy"
          />
        ))}
      </div>

      {/* Aucun résultat */}
      {filteredTechnologies.length === 0 && (
        <p className="text-[var(--text-secondary)] font-mono text-sm opacity-50">
          Aucune technologie trouvée dans cette catégorie.
        </p>
      )}
    </section>
  );
}