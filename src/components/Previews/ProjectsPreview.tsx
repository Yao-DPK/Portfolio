// src/components/ProjectsPreview.tsx
import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "SkillTrackr",
    desc: "Platform to create/manage projects, teams and realtime chat.",
    image: "/images/skilltrackr.png",
    tech: ["React", "Node", "Postgres"],
    link: "/projects/skilltrackr"
  },
  {
    title: "JobInsight",
    desc: "Analyze job postings and visualize required skills.",
    image: "/images/jobinsight.png",
    tech: ["Spring Boot", "React"],
    link: "/projects/jobinsight"
  },
  {
    title: "MusicSync",
    desc: "Realtime multi-device music sync app.",
    image: "/images/musicsync.png",
    tech: ["Node", "WebSocket", "Flutter"],
    link: "/projects/musicsync"
  }
];

const ProjectsPreview: React.FC<{ compact?: boolean }> = ({ compact = true }) => {
  const list = compact ? projects.slice(0, 3) : projects;
  return (
    <div className="section theme-transition">
      <div className="section-header">
        <h2 className="section-title">Projets</h2>
        <div className="muted">Sélection de projets récents</div>
      </div>

      <div className="section-content" style={{ marginTop: 12 }}>
        <div className="cards">
          {list.map((p) => (
            <motion.div key={p.title} className="card" whileHover={{ y: -8, scale: 1.02 }} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 8, objectFit: "cover" }} />}
              <h3 style={{ marginTop: 8 }}>{p.title}</h3>
              <p className="muted">{p.desc}</p>
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.tech.map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
              <div style={{ marginTop: 12 }}>
                <a className="button" href={p.link}>Voir</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPreview;
