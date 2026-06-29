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

export interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  descriptionLong?: string;
  image?: string;
  screenshots?: string[];
  tags: string[];
  status: string;
  visibility: 'public' | 'private' | 'internal';
  year: string;
  type: string;
  tabs: ProjectTabs;
  links?: ProjectLinks;
}

export const TAB_DEFS = [
  { id: 'objectives', label: 'Objectif' },
  { id: 'techStack', label: 'Tech Stack' },
  { id: 'features', label: 'Features' },
  { id: 'metrics', label: 'Métriques' },
] as const;

export type TabId = typeof TAB_DEFS[number]['id'];