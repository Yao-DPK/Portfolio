// src/components/sections/Projects.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Portfolio",
    desc: "Portfolio single-page with tabs, Next.js, TS and Framer Motion",
    link: "#",
    github: "#",
    tech: ["React", "Next.js", "TypeScript", "Framer Motion"],
    image: "/images/portfolio.png", // mockup image
  },
  {
    title: "SkillTrackr",
    desc: "App to track and visualize skills",
    link: "#",
    github: "#",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: "/images/skilltrackr.png",
  },
  {
    title: "Music Sync",
    desc: "Personal music app with device sync",
    link: "#",
    github: "#",
    tech: ["Flutter", "Firebase", "WebSocket"],
    image: "/images/musicsync.png",
  },
];

const Projects: React.FC = () => {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Projets</h2>
        <div className="muted">Sélection de projets récents</div>
      </div>

      <div className="section-content">
        <div className="cards" style={{ marginTop: 8 }}>
          {projects.map((p) => (
            <motion.div
              className="card"
              key={p.title}
              whileHover={{ y: -8, scale: 1.03, rotate: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    borderRadius: "var(--radius)",
                    marginBottom: 12,
                    objectFit: "cover",
                  }}
                />
              )}
              <h3 style={{ marginTop: 0 }}>{p.title}</h3>
              <p className="muted">{p.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {p.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(var(--clr-primary-rgb),0.1)",
                      color: "var(--clr-primary)",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    style={{ flex: 1 }}
                  >
                    <FaGithub style={{ marginRight: 6 }} /> Code
                  </a>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    style={{ flex: 1 }}
                  >
                    <FaExternalLinkAlt style={{ marginRight: 6 }} /> Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
