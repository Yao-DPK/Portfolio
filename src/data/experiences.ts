// src/data/experiences.ts
import { Experience } from "../models/experience.model";

export const experiences: Experience[] = [
  {
    company: "Bending Spoons",
    role: "Fullstack Developer",
    period: "Jun 2024 – Present",
    description: [
      "Developed scalable web applications in React + Node.js",
      "Optimized performance and reduced bundle size by 30%",
      "Implemented CI/CD pipelines and automated testing"
    ],
    logo: "/logos/bending-spoons.png",
    color: "#4169E1"
  },
  {
    company: "Jarvi",
    role: "Fullstack Intern",
    period: "Jan 2024 – May 2024",
    description: [
      "Built dashboard modules for recruiters",
      "Integrated third-party APIs",
      "Improved frontend accessibility and UX"
    ],
    logo: "/logos/jarvi.png",
    color: "#735BFF"
  }
];
