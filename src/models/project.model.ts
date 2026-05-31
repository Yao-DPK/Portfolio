export interface Project {
    // ---- Informations de base ----
    title: string;                   // Titre du projet
    short: string;                   // Résumé en 1 phrase
    desc?: string;                   // Description complète (page projet)
    tech: string[];                  // Technologies utilisées
    company?: string;                // Organisation / école / projet perso
    section?: "IA" | "Web" | "Mobile" | "Data" | "Jeux" | "DevOps" | "SaaS";  
                                     // Catégorie pour organiser ton portfolio
    status: "ready" | "coming-soon"; // Pour bloquer ou afficher la page complète
  
    // ---- Visuels ----
    images?: string[];               // Images de la page projet
    thumbnail?: string;              // Image de preview (si différente)
  
    // ---- Structure de la page projet ----
    caseStudy?: {
      problem?: string;              // Contexte / problème à résoudre
      objective?: string;            // Objectif concret du projet
      constraints?: string[];        // Contraintes réelles (temps, technique…)
      audience?: string;             // Pour qui le projet a été fait (académique, client, perso)
    };
  
    // ---- Détails techniques (facultatif mais puissant) ----
    architecture?: {
      frontend?: string;
      backend?: string;
      database?: string;
      infrastructure?: string;
      patterns?: string[];           // MVC, microservices, event-driven, etc.
    };
  
    // ---- Résultats du projet ----
    results?: {
      metrics?: string[];            // KPIs réels si disponibles (optionnel)
      technicalGains?: string[];     // Améliorations techniques mesurables
      functionalCoverage?: string[]; // Fonctionnalités réalisées
      achievements?: string[];       // Réussites clés
      impact?: string;               // Impact business ou potentiel
    };
  
    // ---- Liens externes ----
    repo?: string;                   // Lien GitHub
    link?: string;                   // Lien vers la page de ton portfolio
    demo?: string;                   // Lien vers une démo ou une vidéo
  }
  