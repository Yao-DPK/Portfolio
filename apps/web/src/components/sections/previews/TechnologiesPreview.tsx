'use client';

import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Technology {
  id: string;
  name: string;
  category: string;
  badge: string;
  isMain?: boolean;
}

interface TechnologyCategory {
  id: string;
  icon: string;
  label: string;
  description?: string;
}

export default function TechnologiesPreview() {
  const { t } = useTranslation('technologies');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // ✅ Toutes les technologies
  const technologies: Technology[] = [
    // Frontend
    { id: 'react', name: 'React', category: 'frontend', badge: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB', isMain: true },
    { id: 'nextjs', name: 'Next.js', category: 'frontend', badge: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white', isMain: true },
    { id: 'angular', name: 'Angular', category: 'frontend', badge: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', badge: 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white' },
    { id: 'framer', name: 'Framer Motion', category: 'frontend', badge: 'https://img.shields.io/badge/Framer-%23000000.svg?style=for-the-badge&logo=framer&logoColor=white' },

    // Backend
    { id: 'nodejs', name: 'Node.js', category: 'backend', badge: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white', isMain: true },
    { id: 'nestjs', name: 'NestJS', category: 'backend', badge: 'https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white', isMain: true },
    { id: 'fastapi', name: 'FastAPI', category: 'backend', badge: 'https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white' },
    { id: 'spring', name: 'Spring Boot', category: 'backend', badge: 'https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white' },
    { id: 'express', name: 'Express', category: 'backend', badge: 'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB' },

    // Database
    { id: 'postgresql', name: 'PostgreSQL', category: 'database', badge: 'https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white', isMain: true },
    { id: 'mongodb', name: 'MongoDB', category: 'database', badge: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white', isMain: true },
    { id: 'mysql', name: 'MySQL', category: 'database', badge: 'https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white' },

    // DevOps & Cloud
    { id: 'docker', name: 'Docker', category: 'devops', badge: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white', isMain: true },
    { id: 'kubernetes', name: 'Kubernetes', category: 'devops', badge: 'https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white', isMain: true },
    { id: 'terraform', name: 'Terraform', category: 'devops', badge: 'https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white', isMain: true },
    { id: 'aws', name: 'AWS', category: 'devops', badge: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white', isMain: true },
    { id: 'gcp', name: 'GCP', category: 'devops', badge: 'https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white', isMain: true },
    { id: 'azure', name: 'Azure', category: 'devops', badge: 'https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoft-azure&logoColor=white', isMain: true },
    { id: 'githubactions', name: 'GitHub Actions', category: 'devops', badge: 'https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white', isMain: true },
    { id: 'grafana', name: 'Grafana', category: 'devops', badge: 'https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white', isMain: true },
    { id: 'prometheus', name: 'Prometheus', category: 'devops', badge: 'https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white', isMain: true },
    { id: 'rabbitmq', name: 'RabbitMQ', category: 'devops', badge: 'https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white', isMain: true },
    { id: 'linux', name: 'Linux', category: 'devops', badge: 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black' },
    { id: 'postman', name: 'Postman', category: 'devops', badge: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' },
    { id: 'websockets', name: 'WebSockets', category: 'devops', badge: 'https://img.shields.io/badge/WebSockets-0052CC?style=for-the-badge&logo=socket.io&logoColor=white' },

    // Mobile
    { id: 'flutter', name: 'Flutter', category: 'mobile', badge: 'https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white' },
    { id: 'reactnative', name: 'React Native', category: 'mobile', badge: 'https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
  ];

  // ✅ Catégories
  const categories: TechnologyCategory[] = [
    { id: 'frontend', icon: '🎨', label: 'Frontend' },
    { id: 'backend', icon: '⚙️', label: 'Backend' },
    { id: 'database', icon: '🗄️', label: 'Database' },
    { id: 'devops', icon: '☁️', label: 'DevOps & Cloud' },
    { id: 'mobile', icon: '📱', label: 'Mobile' },
  ];

  // ✅ Filtrer les technologies
  const filteredTechnologies = useMemo(() => {
    if (!activeCategory) return technologies.filter((t) => t.isMain);
    return technologies.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  // ✅ Compter les technologies principales
  const mainTechCount = technologies.filter((t) => t.isMain).length;

  // ✅ Regrouper par catégorie pour l'affichage de la stack principale
  const mainTechByCategory = useMemo(() => {
    const grouped: Record<string, Technology[]> = {};
    technologies
      .filter((t) => t.isMain)
      .forEach((t) => {
        if (!grouped[t.category]) grouped[t.category] = [];
        grouped[t.category].push(t);
      });
    return grouped;
  }, []);

  const categoryLabels: Record<string, string> = {
    frontend: '🎨 Frontend',
    backend: '⚙️ Backend',
    database: '🗄️ Database',
    devops: '☁️ DevOps & Cloud',
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-3xl font-bold text-[var(--foreground)] font-mono">
            💻 {t('title') || 'Technologies'}
          </h2>
          <span className="text-sm text-[var(--text-secondary)] opacity-40 font-mono">
            ({technologies.length} tech{technologies.length > 1 ? 's' : ''})
          </span>
        </div>
        <p className="text-[var(--text-secondary)] font-mono text-sm opacity-70 max-w-2xl">
          {activeCategory
            ? `Technologies ${categories.find((c) => c.id === activeCategory)?.label}`
            : 'Ma stack principale, issue de mes projets récents. Cliquez sur une catégorie pour explorer les technologies complémentaires.'}
        </p>
      </motion.div>

      {/* Filtres */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 ${
            activeCategory === null
              ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20'
              : 'bg-transparent text-[var(--text-secondary)] border-[var(--card-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
          }`}
        >
          🔥 Stack Principale
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20'
                : 'bg-transparent text-[var(--text-secondary)] border-[var(--card-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Compteur */}
      <div className="text-sm text-[var(--text-secondary)] font-mono opacity-60 mb-4 flex items-center justify-between">
        <span>
          {filteredTechnologies.length} technologie{filteredTechnologies.length > 1 ? 's' : ''}
          {activeCategory && (
            <span className="opacity-40"> · {categories.find(c => c.id === activeCategory)?.label}</span>
          )}
          {!activeCategory && <span className="opacity-40"> · Stack Principale</span>}
        </span>
        <span className="text-xs opacity-40">
          {activeCategory ? 'Cliquez sur une catégorie pour explorer' : 'Principales technologies'}
        </span>
      </div>

      {/* Contenu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory || 'main'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {!activeCategory ? (
            // ✅ Stack Principale – Affichage par catégorie
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(mainTechByCategory).map(([category, techs]) => (
                <div key={category} className="bg-[var(--card-bg)]/30 rounded-xl p-5 border border-[var(--card-border)]">
                  <h3 className="text-sm font-mono text-[var(--text-secondary)] opacity-80 mb-3">
                    {categoryLabels[category] || category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <div key={tech.id} className="relative">
                        <img
                          src={tech.badge}
                          alt={tech.name}
                          className="h-7 md:h-8 transition-all duration-200 hover:scale-105 hover:brightness-110"
                          loading="lazy"
                        />
                        <span className="absolute -top-1 -right-1 text-[8px] font-mono bg-[var(--accent)] text-white px-1 rounded-full">
                          ★
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // ✅ Autres catégories – Affichage en ligne
            <div className="flex flex-wrap gap-3 p-5 bg-[var(--card-bg)]/30 rounded-xl border border-[var(--card-border)] min-h-[80px]">
              {filteredTechnologies.length > 0 ? (
                filteredTechnologies.map((tech) => (
                  <div key={tech.id} className="relative">
                    <img
                      src={tech.badge}
                      alt={tech.name}
                      className={`h-7 md:h-8 transition-all duration-200 hover:scale-105 hover:brightness-110 ${
                        tech.isMain ? 'ring-2 ring-[var(--accent)]/30 rounded-lg' : ''
                      }`}
                      loading="lazy"
                    />
                    {tech.isMain && (
                      <span className="absolute -top-1 -right-1 text-[8px] font-mono bg-[var(--accent)] text-white px-1 rounded-full">
                        ★
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[var(--text-secondary)] font-mono text-sm opacity-50">
                  Aucune technologie dans cette catégorie.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pied de section */}
      <motion.div
        className="mt-6 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span>
          {technologies.length} technologies au total
          {mainTechCount > 0 && ` · ${mainTechCount} principales`}
          {activeCategory && ` · ${categories.find(c => c.id === activeCategory)?.label}`}
        </span>
        <span>Mis à jour en {new Date().getFullYear()}</span>
      </motion.div>
    </section>
  );
}