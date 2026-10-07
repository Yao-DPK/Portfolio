// components/projects/types.ts

export interface ProjectTabs {
  objectives: string[];
  techStack: string[];
  features: string[];
  metrics: string[];
}

export interface ProjectLinks {
  live?: string | null;
  demo?: string | null;
  source?: string | null;
}

export type ProjectType = 'SaaS' | 'Mobile' | 'IA' | 'API' | 'Fullstack';


export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  visibility: 'public' | 'private';
  year: string;
  type: string;
  image?: string;                 // Image de couverture
  screenshots?: string[];         // Pour le carousel
  videos?: string[];              // Liens vidéo (Loom, YouTube, etc.)
  links?: ProjectLinks
}

export interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  descriptionLong?: string;
  tags: string[];
  frontendTags?: string[];        // Uniquement frontend (pour la carte)
  backendTags?: string[];         // Uniquement backend (pour la carte)
  status: string;
  visibility: 'public' | 'private';
  year: string;
  type: string;
  image?: string;                 // Image de couverture
  screenshots?: string[];         // Pour le carousel
  videos?: string[];              // Liens vidéo (Loom, YouTube, etc.)
  links?: ProjectLinks
  tabs?: ProjectTabs
}
export const TAB_DEFS = [
  { id: 'objectives', label: 'Objectif' },
  { id: 'techStack', label: 'Tech Stack' },
  { id: 'features', label: 'Features' },
  { id: 'metrics', label: 'Métriques' },
] as const;

export type TabId = typeof TAB_DEFS[number]['id'];