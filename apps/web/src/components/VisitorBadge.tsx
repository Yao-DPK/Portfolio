'use client';

import { useEffect, useState } from 'react';
import { VisitorStats } from '@/lib/api';

export default function VisitorBadge() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch('/api/visitor');
        const data = await res.json();
        setTotal(data.total);
      } catch (e) {
        console.error('Failed to fetch total visits:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  if (loading) {
    return <span className="text-slate-400 dark:text-slate-500 text-sm">⏳</span>;
  }

  return (
    <span className="text-slate-400 dark:text-slate-500 text-sm flex items-center gap-1">
      <span>👥</span>
      <span>{total?.toLocaleString() || 0}</span>
      <span className="hidden sm:inline">visites</span>
    </span>
  );
}