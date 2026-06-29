// components/projects/ProjectPopup.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ProjectItemProps, TAB_DEFS, TabId } from './types';
import { ProjectBadge } from './ProjectBadge';

interface ProjectPopupProps {
  project: ProjectItemProps;
  onClose: () => void;
}

export function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  const { t } = useTranslation('project-details');
  const [activeTab, setActiveTab] = useState<TabId>('objectives');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const details = t(project.id, { returnObjects: true }) as any;

  const fullProject = {
    ...project,
    descriptionLong: details?.descriptionLong || project.description,
    screenshots: details?.screenshots || project.screenshots || [],
    tabs: details?.tabs || project.tabs || { objectives: [], techStack: [], features: [], metrics: [] },
    links: details?.links || project.links || {},
    status: details?.status || project.status,
    visibility: details?.visibility || project.visibility,
    year: details?.year || project.year,
    type: details?.type || project.type,
  };

  const { id, title, descriptionLong, screenshots, tabs, links, status, visibility, year, type } = fullProject;

  const tabData = tabs?.[activeTab] || [];
  const displayItems = isExpanded ? tabData : tabData.slice(0, 3);
  const hasMore = tabData.length > 3;

  const hasScreenshots = screenshots && screenshots.length > 0;
  const hasDemo = links?.demo || links?.live;
  const hasSource = links?.source;

  const statusMap: Record<string, { label: string; color: string }> = {
    'En production': { label: 'PRODUCTION', color: 'text-emerald-400 border-emerald-500/40' },
    'In production': { label: 'PRODUCTION', color: 'text-emerald-400 border-emerald-500/40' },
    'En développement': { label: 'DEV', color: 'text-amber-400 border-amber-500/40' },
    'In development': { label: 'DEV', color: 'text-amber-400 border-amber-500/40' },
    'Interne': { label: 'INTERNE', color: 'text-slate-400 border-slate-500/40' },
    'Archivé': { label: 'ARCHIVÉ', color: 'text-gray-400 border-gray-500/40' },
    'Archived': { label: 'ARCHIVÉ', color: 'text-gray-400 border-gray-500/40' },
  };
  const statusBadge = statusMap[status] || { label: status?.toUpperCase() || 'UNKNOWN', color: 'text-slate-400 border-slate-500/40' };
  const visColor = visibility === 'public' ? 'text-blue-400 border-blue-500/40' : 'text-slate-400 border-slate-500/40';
  const visLabel = visibility === 'public' ? 'PUBLIC' : 'PRIVÉ';

  useEffect(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const nextImage = () => {
    if (screenshots) {
      setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  const prevImage = () => {
    if (screenshots) {
      setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={handleClose}
    >
      <div
        className="relative bg-[var(--card-background)] rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[var(--card-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card-border)]/20 border-b border-[var(--card-border)] sticky top-0 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-[var(--text-secondary)] opacity-50 ml-2 font-mono">
            {id}
          </span>
          <button
            onClick={handleClose}
            className="ml-auto text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* ✅ Carousel - uniquement si des screenshots existent */}
        {hasScreenshots && (
          <div className="px-4 pt-4 flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="relative aspect-[16/9] max-h-[220px] bg-[var(--card-border)]/30 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={screenshots[currentImageIndex]}
                  alt={`Screenshot ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-sm"
                    >
                      ◄
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-sm"
                    >
                      ►
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {screenshots.map((_: any, idx: any) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contenu */}
        <div className="px-5 py-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] mb-2">
            <span className={`px-1.5 py-0.5 border rounded ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
            <span className={`px-1.5 py-0.5 border rounded ${visColor}`}>
              {visLabel}
            </span>
            <span className="text-[var(--text-secondary)] opacity-30">|</span>
            <span className="text-[var(--text-secondary)] opacity-50">{year}</span>
            <span className="text-[var(--text-secondary)] opacity-30">|</span>
            <span className="text-[var(--text-secondary)] opacity-50">{type.toUpperCase()}</span>
          </div>

          {/* Titre */}
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-1">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            {descriptionLong || project.description}
          </p>

          {/* Tabs */}
          {tabs && (
            <div className="mt-3 border border-[var(--card-border)] rounded-lg overflow-hidden">
              <div className="flex flex-wrap border-b border-[var(--card-border)] bg-[var(--card-border)]/10">
                {TAB_DEFS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsExpanded(false); }}
                    className={`px-3 py-1 text-xs font-medium transition-all duration-300 border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5'
                        : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-3 min-h-[60px] bg-[var(--card-border)]/5">
                {displayItems.length > 0 ? (
                  <ul className="space-y-0.5">
                    {displayItems.map((item: string, idx: number) => (
                      <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-0.5 text-xs">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)] opacity-50 italic">
                    Aucune information disponible
                  </p>
                )}
                {hasMore && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-xs font-medium text-[var(--accent)] hover:underline transition-colors"
                  >
                    {isExpanded
                      ? `— Masquer ${tabData.length - 3} élément${tabData.length - 3 > 1 ? 's' : ''}`
                      : `+ ${tabData.length - 3} élément${tabData.length - 3 > 1 ? 's' : ''} →`}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CTAs */}
          {(hasDemo || hasSource) && (
            <div className="flex flex-wrap gap-3 pt-3 mt-3 border-t border-[var(--card-border)]">
              {hasDemo && (
                <a
                  href={links?.demo || links?.live || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                >
                  🔗 Voir la démo
                </a>
              )}
              {hasSource && (
                <a
                  href={links?.source || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-[var(--card-border)]/30 text-[var(--foreground)] text-sm font-medium rounded-lg hover:bg-[var(--card-border)]/60 transition-colors"
                >
                  💻 Code source
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-1.5 border-t border-[var(--card-border)] flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-mono opacity-40">
          <span>{id}</span>
          <span>{new Date().getFullYear()} • {type}</span>
        </div>
      </div>
    </div>
  );
}