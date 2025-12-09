// src/models/education.model.ts
export interface Education {
  school: string;                  // Nom de l'établissement
  degree: string;                  // Diplôme / formation
  field?: string;                  // Domaine d'étude, ex: "Informatique"
  period: string;                  // Période, ex: "Sep 2020 – Jun 2023"
  logo?: string;                    // URL du logo de l'école
  short: string;
  description?: string[];           // Points clés / réalisations / projets
  location?: string;                // Ville ou campus
  link?: string;                    // Lien vers l'école ou programme (optionnel)
}