// src/utils/i18n/index.ts

// Exporter la configuration
export * from './config';

// Importer tous les fichiers de traduction
import frCommon from './locales/fr/common.json';
import frHero from './locales/fr/hero.json';
import frTechnologies from './locales/fr/technologies.json';
import frExperience from './locales/fr/experience.json';
import frEducation from './locales/fr/education.json';
import frProjects from './locales/fr/projects.json';
import frProjectsDetails from './locales/fr/project-details.json';
import frFooter from './locales/fr/footer.json';
import frContact from './locales/fr/contact.json';


import enCommon from './locales/en/common.json';
import enHero from './locales/en/hero.json';
import enTechnologies from './locales/en/technologies.json';
import enExperience from './locales/en/experience.json';
import enEducation from './locales/en/education.json';
import enProjects from './locales/en/projects.json';
import enProjectsDetails from './locales/fr/project-details.json';
import enFooter from './locales/en/footer.json';
import enContact from './locales/en/contact.json';


// Exporter les ressources
export const resources = {
  fr: {
    common: frCommon,
    hero: frHero,
    technologies: frTechnologies,
    experience: frExperience,
    education: frEducation,
    projects: frProjects,
    'project-details': frProjectsDetails,
    footer: frFooter,
    contact: frContact,
  },
  en: {
    common: enCommon,
    hero: enHero,
    technologies: enTechnologies,
    experience: enExperience,
    education: enEducation,
    projects: enProjects,
    'project-details': enProjectsDetails,
    footer: enFooter,
    contact: enContact,

  },
};

// Exporter la liste des namespaces
export const namespaces = [
  'common',
  'hero',
  'technologies',
  'experience',
  'education',
  'projects',
  'footer',
  'contact'
] as const;

export type Namespace = (typeof namespaces)[number];