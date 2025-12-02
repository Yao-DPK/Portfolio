// src/models/experience.model.ts
export interface Experience {
  company: string;                 // Nom de l’entreprise
  role: string;                    // Poste / rôle occupé
  period: string;                  // Période, ex: "Jan 2023 – Present"
  type?: "CDI" | "Freelance" | "Stage" | "Contract"; // Type de mission
  location?: string;               // Lieu (ex: "Remote", "Paris, France")
  description: string[];           // Points clés / réalisations
  tech?: string[];                 // Technologies ou compétences utilisées
  logo?: string;                   // URL du logo de l’entreprise
  color?: string;                  // Couleur accent pour la carte / border
  link?: string;                   // Lien vers projet ou entreprise (optionnel)
}