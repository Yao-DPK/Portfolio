// components/projects/ProjectsPreview.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectItemProps } from './types';
import { ProjectCard } from './ProjectCard';
import { ProjectPopup } from './ProjectPopup';

export default function ProjectsPreview() {
  const { t } = useTranslation('projects');
  const [selectedProject, setSelectedProject] = useState<ProjectItemProps | null>(null);
  const [showAll, setShowAll] = useState(false);
  const projects = t('items', { returnObjects: true }) as ProjectItemProps[];

  if (!projects || projects.length === 0) {
    return null;
  }

  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const hasMore = projects.length > 3;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-3xl font-bold text-[var(--foreground)] font-mono">
            {t('title')}
          </h2>
          <span className="text-sm text-[var(--text-secondary)] opacity-40 font-mono">
            ({projects.length} projet{projects.length > 1 ? 's' : ''})
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-mono opacity-60 pl-1">
          {t('subtitle') || 'quelques projets sur lesquels j\'ai travaillé'}
        </p>
      </div>

      {/* Liste des projets */}
      <div className="space-y-3">
        {visibleProjects.map((project: ProjectItemProps) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Bouton Voir plus / Voir moins */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] border border-[var(--card-border)] rounded-lg hover:border-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)]/5"
          >
            {showAll ? `${t('extend_button.retract_text')} ↑` : `${t('extend_button.extend_text')} →`}
          </button>
        </div>
      )}

      {/* Compteur */}
      <div className="mt-6 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono opacity-40">
        <span>{visibleProjects.length} / {projects.length} {t('section_footer.text')}</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      {/* Popup */}
      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}