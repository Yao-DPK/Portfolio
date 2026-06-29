// components/projects/ProjectBadge.tsx

export function ProjectBadge({ status, visibility }: { status: string; visibility: string }) {
  const statusMap: Record<string, { label: string; color: string }> = {
    'En production': { label: 'PRODUCTION', color: 'text-emerald-400 border-emerald-500/40' },
    'In production': { label: 'PRODUCTION', color: 'text-emerald-400 border-emerald-500/40' },
    'En développement': { label: 'DEV', color: 'text-amber-400 border-amber-500/40' },
    'In development': { label: 'DEV', color: 'text-amber-400 border-amber-500/40' },
    'Interne': { label: 'INTERNE', color: 'text-slate-400 border-slate-500/40' },
    'Archivé': { label: 'ARCHIVÉ', color: 'text-gray-400 border-gray-500/40' },
  };
  const statusBadge = statusMap[status] || statusMap['Interne'];
  const visColor = visibility === 'public' ? 'text-blue-400 border-blue-500/40' : 'text-slate-400 border-slate-500/40';
  const visLabel = visibility === 'public' ? 'PUBLIC' : 'PRIVÉ';

  return (
    <span className="font-mono text-[10px] tracking-wider">
      <span className={`px-1.5 py-0.5 border rounded ${statusBadge.color}`}>
        {statusBadge.label}
      </span>
      <span className="px-1 text-[var(--text-secondary)] opacity-30">/</span>
      <span className={`px-1.5 py-0.5 border rounded ${visColor}`}>
        {visLabel}
      </span>
    </span>
  );
}