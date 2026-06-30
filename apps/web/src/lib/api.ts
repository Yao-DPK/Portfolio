// lib/api.ts
export interface VisitorStats {
  today: number;
  week: number;
  month: number;
  year: number;
  total: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//console.log(API_URL);
export async function getVisitorStats(): Promise<VisitorStats> {
  const res = await fetch(`${API_URL}/visitor`, {
    cache: 'no-store', // Évite la mise en cache
  });
  if (!res.ok) {
    throw new Error('Failed to fetch visitor stats');
  }
  return res.json();
}

export async function recordVisit(): Promise<VisitorStats> {
  const res = await fetch(`${API_URL}/visitor`, {
    method: 'POST',
    credentials: 'include', // Important pour les cookies
  });
  if (!res.ok) {
    throw new Error('Failed to record visit');
  }
  return res.json();
}