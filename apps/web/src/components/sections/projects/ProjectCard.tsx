// components/projects/ProjectCard.tsx
'use client';

import { ProjectItemProps } from './types';
import { TerminalDot } from './TerminalDot';
import { ProjectBadge } from './ProjectBadge';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  project: ProjectItemProps;
  onOpen: () => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { id, title, description, tags, status, visibility, year, type } = project;
  const { t } = useTranslation('projects');
  const isPrivate = visibility !== 'public';
  const displayTags = tags.slice(0, 5);
  const remainingTags = tags.length - 5;

  return (
    <div
      className="group bg-[var(--card-background)] rounded-xl border border-[var(--card-border)] shadow-sm hover:shadow-lg hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden cursor-pointer"
      onClick={onOpen}
    >
      {/* En-tête */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card-border)]/20 border-b border-[var(--card-border)]">
        <TerminalDot color="bg-red-500/80" />
        <TerminalDot color="bg-amber-500/80" />
        <TerminalDot color="bg-emerald-500/80" />
        <span className="text-[10px] text-[var(--text-secondary)] opacity-50 ml-2 font-mono">
          {id}
        </span>
        <span className="ml-auto text-[10px] text-[var(--text-secondary)] opacity-30 font-mono">
          {isPrivate ? '🔒' : '🌐'}
        </span>
      </div>

      {/* Contenu */}
      <div className="px-4 py-4">
        <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-2">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <ProjectBadge status={status} visibility={visibility} />
          <span className="text-[10px] text-[var(--text-secondary)] opacity-30 font-mono">|</span>
          <span className="text-[10px] text-[var(--text-secondary)] opacity-50 font-mono">{year}</span>
          <span className="text-[10px] text-[var(--text-secondary)] opacity-30 font-mono">|</span>
          <span className="text-[10px] text-[var(--text-secondary)] opacity-50 font-mono">{type.toUpperCase()}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] text-[10px] font-mono rounded border border-[var(--card-border)]"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="px-2 py-0.5 text-[10px] text-[var(--text-secondary)] opacity-40 font-mono">
              +{remainingTags}
            </span>
          )}
        </div>

        <div className="pt-2 border-t border-[var(--card-border)]/50">
          <span className="text-sm font-medium text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
            {t('detail_button.text')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}