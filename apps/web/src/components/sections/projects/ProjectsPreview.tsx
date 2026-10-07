'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItemProps, ProjectType } from './types';
import { ProjectCard } from './ProjectCard';
import { ProjectPopup } from './ProjectPopup';

const FILTERS: { id: ProjectType | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Tous', icon: '📁' },
  { id: 'SaaS', label: 'SaaS', icon: '💻' },
  { id: 'Mobile', label: 'Mobile', icon: '📱' },
  { id: 'IA', label: 'IA', icon: '🤖' },
  { id: 'Fullstack', label: 'Fullstack', icon: '⚙️' },
  { id: 'API', label: 'API', icon: '🔌' },
];

export default function ProjectsPreview() {
  const { t } = useTranslation('projects');
  const [selectedProject, setSelectedProject] = useState<ProjectItemProps | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectType | 'all'>('all');

  const projects = t('items', { returnObjects: true }) as ProjectItemProps[];

  // Filtrer les projets
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [projects, activeFilter]);

  // Compteurs
  const totalCount = projects.length;
  const filteredCount = filteredProjects.length;
  const productionCount = projects.filter((p) =>
    ['En production', 'In production'].includes(p.status)
  ).length;
  const devCount = projects.filter((p) =>
    ['En développement', 'In development'].includes(p.status)
  ).length;

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
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
            📁 {t('title') || 'Projets'}
          </h2>
          <span className="text-sm text-[var(--text-secondary)] opacity-40 font-mono">
            ({totalCount} projet{totalCount > 1 ? 's' : ''})
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-mono opacity-60 pl-1 max-w-2xl">
          {t('subtitle') || 'Des projets concrets, livrés en production ou en cours de développement.'}
        </p>
      </motion.div>

      {/* Filtres */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm font-mono rounded-full border transition-all duration-200 flex items-center gap-2 ${
              activeFilter === filter.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20'
                : 'bg-transparent text-[var(--text-secondary)] border-[var(--card-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
            }`}
          >
            <span>{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Statistiques */}
      <div className="text-sm text-[var(--text-secondary)] font-mono opacity-60 mb-4 flex items-center justify-between">
        <span>
          {filteredCount} projet{filteredCount > 1 ? 's' : ''} affiché
          {activeFilter !== 'all' && ` · ${FILTERS.find(f => f.id === activeFilter)?.label}`}
        </span>
        <span className="text-xs opacity-40">
          🟢 {productionCount} en production · 🟡 {devCount} en développement
        </span>
      </div>

      {/* Grille */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: ProjectItemProps, index: number) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard
                project={project}
                onOpen={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Message si aucun projet */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--text-secondary)] font-mono text-sm opacity-50">
            Aucun projet dans cette catégorie.
          </p>
        </div>
      )}

      {/* Pied de page */}
      <motion.div
        className="mt-8 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span>
          {totalCount} projets · {productionCount} en production · {devCount} en développement
        </span>
        <span>{new Date().getFullYear()}</span>
      </motion.div>

      {/* Popup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPopup
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}