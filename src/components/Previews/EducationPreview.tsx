// src/components/EducationPreview.tsx
import React from "react";
import { motion } from "framer-motion";

const educ = [
  {
    school: "IPI (École d'ingénierie)",
    degree: "Ingénieur Informatique",
    period: "2019 – 2024",
    short: "Systèmes d'information & développement logiciel"
  }
];

const EducationPreview: React.FC = () => (
  <div className="section theme-transition">
    <div className="section-header">
      <h2 className="section-title">Formation</h2>
      <div className="muted">Parcours académique</div>
    </div>

    <div className="section-content" style={{ marginTop: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
        {educ.map((e) => (
          <motion.div key={e.school} className="card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{e.degree}</div>
            <div className="muted">{e.school} • {e.period}</div>
            <p className="muted" style={{ marginTop: 8 }}>{e.short}</p>
            <div style={{ marginTop: 12 }}>
              <a className="button" href="/education">Voir</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default EducationPreview;
