import { Project } from "@/models/project.model";

export const projects : Project[] = [
  {
    title: "Assistant IA · SaaS Web & Mobile",
    short: "Assistant IA intégré dans un produit web et mobile, avec pipeline complet, WebSockets temps réel et interface React/Flutter.",
    images: ["/assets/images/assistant-ia.png"],
    tech: ["React", "Node.js", "TypeScript", "WebSocket", "OpenAI API"],
    link: "/projects/assistant-ai",
    status: "coming-soon"
  },
  {
    title: "Feedback IA · Plateforme Angular",
    short: "Application Angular connectée à une API FastAPI, permettant d’afficher des prédictions IA et collecter le feedback utilisateur.",
    images: ["/assets/images/feedback-ia.png"],
    tech: ["Angular", "FastAPI", "PostgreSQL", "Docker"],
    link: "/projects/feedback-ia",
    status: "coming-soon"
  },
  {
    title: "Association Manager · Microservices",
    short: "Application web modulaire pour gérer associations, projets, équipes et documents, basée sur NestJS + Angular.",
    images: ["/assets/images/association.png"],
    tech: ["NestJS", "Angular", "PostgreSQL", "Docker"],
    link: "/projects/association-platform",
    status: "coming-soon"
  },
];