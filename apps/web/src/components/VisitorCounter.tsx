// src/components/VisitorCounter.tsx
'use client';

import { useEffect, useState } from 'react';
import { getVisitorStats, recordVisit, VisitorStats } from '@/lib/api';

interface VisitorCounterProps {
  variant?: 'detailed' | 'compact';
}

export default function VisitorCounter({ variant = 'detailed' }: VisitorCounterProps) {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Enregistrer la visite et récupérer les stats
        const data = await recordVisit();
        setStats(data);
      } catch (err) {
        console.error('Visitor counter error:', err);
        setError(true);
        // Fallback : récupérer les stats sans incrémenter
        try {
          const data = await getVisitorStats();
          setStats(data);
        } catch (e) {
          console.error('Fallback error:', e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-[var(--text-secondary)] font-mono text-sm opacity-60">
        <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
        <span>chargement...</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-sm text-[var(--text-secondary)] font-mono opacity-40">
        <span className="opacity-40">⏳</span> statistiques indisponibles
      </div>
    );
  }

  // ✅ Version compacte (footer)
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-[var(--text-secondary)] opacity-60">
        <span className="flex items-center gap-1.5">
          <span className="text-base">👥</span>
          <span>{stats.total.toLocaleString()}</span>
          <span className="text-xs opacity-40">visites</span>
        </span>
        <span className="opacity-30">|</span>
        <span className="flex items-center gap-1.5">
          <span className="text-xs opacity-40">auj.</span>
          <span>{stats.today}</span>
        </span>
        <span className="opacity-30">|</span>
        <span className="flex items-center gap-1.5">
          <span className="text-xs opacity-40">7j</span>
          <span>{stats.week}</span>
        </span>
        <span className="opacity-30">|</span>
        <span className="flex items-center gap-1.5">
          <span className="text-xs opacity-40">30j</span>
          <span>{stats.month}</span>
        </span>
      </div>
    );
  }

  // ✅ Version détaillée (page d'accueil)
  return (
    <div className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl p-5 shadow-sm transition-colors duration-300">
      {/* En-tête style terminal */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[var(--accent)] font-mono text-sm">$</span>
        <span className="text-sm font-mono text-[var(--foreground)] opacity-60">cat ~/stats.md</span>
        <span className="ml-auto text-[10px] font-mono text-[var(--text-secondary)] opacity-30">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Ligne de séparation */}
      <div className="w-full h-px bg-[var(--card-border)] mb-3" />

      {/* Métriques */}
      <div className="grid grid-cols-5 gap-2">
        <MetricItem label="today" value={stats.today} />
        <MetricItem label="week" value={stats.week} />
        <MetricItem label="month" value={stats.month} />
        <MetricItem label="year" value={stats.year} />
        <MetricItem label="total" value={stats.total} highlight />
      </div>

      {/* Ligne de séparation */}
      <div className="w-full h-px bg-[var(--card-border)] mt-3" />

      {/* Pied de page */}
      <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-[var(--text-secondary)] opacity-30">
        <span>visites uniques • 24h</span>
        <span>v{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

// ─── Sous-composant métrique ──────────────────────────────

interface MetricItemProps {
  label: string;
  value: number;
  highlight?: boolean;
}

function MetricItem({ label, value, highlight = false }: MetricItemProps) {
  return (
    <div className={`text-center p-2 rounded-lg transition-colors ${highlight ? 'bg-[var(--accent)]/10' : ''}`}>
      <div className={`text-xs font-mono uppercase tracking-wider ${highlight ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] opacity-50'}`}>
        {label}
      </div>
      <div className={`text-lg font-bold font-mono ${highlight ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'}`}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}