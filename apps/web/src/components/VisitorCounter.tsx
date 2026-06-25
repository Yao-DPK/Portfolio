'use client';

import { useEffect, useState } from 'react';
import { getVisitorStats, recordVisit, VisitorStats } from '@/lib/api';

interface VisitorCounterProps {
  variant?: 'detailed' | 'compact';
}

export default function VisitorCounter({ variant = 'detailed' }: VisitorCounterProps) {
  const [stats, setStats] = useState<VisitorStats | null>({
  today: 0,
  week: 0,
  month: 0,
  year: 0,
  total: 0,
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Enregistrer la visite (POST)
        const postRes = await recordVisit();
        if (!postRes) throw new Error('Failed to record visit');
        const data = await postRes;
        
        // Les stats sont déjà retournées par le POST
        setStats(data);
      } catch (err) {
        console.error('Visitor counter error:', err);
        setError(true);
        
        // Fallback : essayer de récupérer les stats sans incrémenter
        try {
          const getRes = await getVisitorStats();
          const data = await getRes;
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
      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Chargement...</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-sm text-slate-400 dark:text-slate-500">
        👀 Statistiques indisponibles
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>👥 {stats.total.toLocaleString()} visites</span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span>Aujourd'hui : {stats.today}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
        👁️ Statistiques du site
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard 
          label="Aujourd'hui" 
          value={stats.today} 
          icon="📊"
          color="royal"
        />
        <StatCard 
          label="7 jours" 
          value={stats.week} 
          icon="📈"
          color="emerald"
        />
        <StatCard 
          label="30 jours" 
          value={stats.month} 
          icon="📅"
          color="blue"
        />
        <StatCard 
          label="Cette année" 
          value={stats.year} 
          icon="🌟"
          color="purple"
        />
        <StatCard 
          label="Total" 
          value={stats.total} 
          icon="🏆"
          color="royal"
          highlight
        />
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
        {new Date().toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color?: 'royal' | 'emerald' | 'blue' | 'purple';
  highlight?: boolean;
}

function StatCard({ label, value, icon, color = 'royal', highlight = false }: StatCardProps) {
  const colorMap = {
    royal: {
      bg: 'bg-royal-50 dark:bg-royal-900/20',
      text: 'text-royal-600 dark:text-royal-400',
      highlight: 'bg-royal-600 dark:bg-royal-500 text-white',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      highlight: 'bg-emerald-600 dark:bg-emerald-500 text-white',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      highlight: 'bg-blue-600 dark:bg-blue-500 text-white',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      highlight: 'bg-purple-600 dark:bg-purple-500 text-white',
    },
  };

  const style = highlight ? colorMap[color].highlight : colorMap[color].bg;
  const textStyle = highlight ? 'text-white' : colorMap[color].text;

  return (
    <div className={`rounded-xl p-3 text-center transition-colors ${style}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-2xl font-bold ${textStyle}`}>
        {value.toLocaleString()}
      </div>
      <div className={`text-xs font-medium ${highlight ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
        {label}
      </div>
    </div>
  );
}