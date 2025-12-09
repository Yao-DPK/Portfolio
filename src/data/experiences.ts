// src/data/experiences.ts
import { Experience } from "../models/experience.model";

export const experiences: Experience[] = [
  {
    company: "ID Protect",
    role: "Ingénieur Logiciel",
    period: "03/2025 – 09/2025",
    short: "Développement de fonctionnalités SaaS en Node.js & React (auth, interfaces, API).",
    description: [
      "Développement de fonctionnalités SaaS en Node.js & React (auth, interfaces, API).",
      "Implémentation d’un pipeline CI/CD (–15% temps de déploiement)",
      "Contribution à un POC IA et à l’intégration d’API externes(OpenAI, RevenueCat)"
    ],
    logo: "/logos/bending-spoons.png",
    color: "#4169E1"
  },
  {
    company: "Linking Industri et Developpement",
    role: "Développeur Fullstack",
    period: "06/2024 – 09/2024",
    short: "Développement Web & mobile .",
    description: [
      "Refonte d’un site client (HTML/CSS/JS)",
      "Développement Web & mobile ",
      "Déploiement et maintenance sur OVHCloud."
    ],
    logo: "/logos/jarvi.png",
    color: "#735BFF"
  }
];
