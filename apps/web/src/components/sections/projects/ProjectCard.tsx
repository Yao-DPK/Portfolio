'use client';

import { ProjectItemProps } from './types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectCardProps {
  project: ProjectItemProps;
  onOpen: () => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const {
    id,
    title,
    description,
    image,
    links,
    type,
    year,
    frontendTags = [],
    backendTags = [],
  } = project;

  const [imageLoaded, setImageLoaded] = useState(false);

  // Tous les tags frontend + backend (pour la carte)
  const displayTags = [...frontendTags, ...backendTags].slice(0, 4);
  const remainingTags = [...frontendTags, ...backendTags].length - 4;

  const hasSource = links?.source;
  const hasDemo = links?.demo;
  const hasLive = links?.live;

  return (
    <motion.div
      className="group bg-[var(--card-background)] rounded-xl border border-[var(--card-border)] shadow-sm hover:shadow-xl hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden cursor-pointer"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Image de couverture */}
      <div className="relative w-full aspect-video bg-[var(--card-border)]/20 overflow-hidden">
        {image ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--card-border)]/10">
                <div className="w-8 h-8 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 bg-gradient-to-br from-[var(--card-border)]/20 to-transparent">
            📁
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Type et année */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-50 font-mono mb-2">
          <span>{type}</span>
          <span className="opacity-30">·</span>
          <span>{year}</span>
        </div>

        {/* Titre (non tronqué) */}
        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
          {title}
        </h3>

        {/* Description (2-3 lignes) */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-3">
          {description}
        </p>

        {/* Tags (frontend + backend uniquement) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-mono rounded-full border border-[var(--card-border)]"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="px-2.5 py-0.5 text-xs text-[var(--text-secondary)] opacity-40 font-mono">
              +{remainingTags}
            </span>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--card-border)]/50">
          {hasSource && (
            <a
              href={links?.source || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 text-xs font-medium bg-[var(--card-border)]/20 text-[var(--foreground)] rounded-lg hover:bg-[var(--card-border)]/40 transition-all duration-300 hover:scale-105 flex items-center gap-1.5"
            >
              💻 Code
            </a>
          )}
          {hasDemo && (
            <a
              href={links?.demo || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 text-xs font-medium bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-all duration-300 hover:scale-105 flex items-center gap-1.5 shadow-sm shadow-[var(--accent)]/20"
            >
              🖥️ Démo
            </a>
          )}
          {hasLive && (
            <a
              href={links?.live || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 text-xs font-medium bg-[var(--card-border)]/20 text-[var(--foreground)] rounded-lg hover:bg-[var(--card-border)]/40 transition-all duration-300 hover:scale-105 flex items-center gap-1.5"
            >
              🔗 Projet
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="ml-auto text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 hover:gap-2 duration-300"
          >
            Détails →
          </button>
        </div>
      </div>
    </motion.div>
  );
}