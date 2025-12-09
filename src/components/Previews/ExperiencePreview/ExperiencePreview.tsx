// src/components/ExperiencePreview.tsx
import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Influx Link",
    role: "Fullstack Developer",
    period: "Jun 2024 – Present",
    short: "Developed dashboard features, integrations and improved UX."
  },
  {
    company: "Jarvi",
    role: "Fullstack Intern",
    period: "Jan 2024 – May 2024",
    short: "Built recruitment dashboards and API integrations."
  }
];

const ExperiencePreview: React.FC = () => (
  <div className="section ">
    <div className="section-header theme-transition">
      <h2 className="section-title">Expérience</h2>
      <div className="muted">Parcours rapide</div>
    </div>

    <div className="section-content" style={{ marginTop: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
        {experiences.map((e) => (
          <motion.div key={e.company} className="card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{e.role}</div>
                <div className="muted" style={{ fontSize: 14 }}>{e.company} • {e.period}</div>
              </div>
            </div>
            <p className="muted" style={{ marginTop: 8 }}>{e.short}</p>
            <div style={{ marginTop: 12 }}>
              <a className="button" href="/experience">Voir</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default ExperiencePreview;
