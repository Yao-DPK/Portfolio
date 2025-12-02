// src/components/SkillsPreview.tsx
import React from "react";
import { motion } from "framer-motion";

const previewSkills = [
  { name: "TypeScript", hint: "React, Next.js" },
  { name: "Node.js", hint: "API, Nest/Express" },
  { name: "PostgreSQL", hint: "Queries & Schema design" },
  { name: "React / Angular", hint: "SPAs, SSR" },
  { name: "CI/CD", hint: "GitHub Actions" },
  { name: "Docker", hint: "Containers" },
];

const SkillsPreview: React.FC = () => {
  return (
    <div className="section theme-transition">
      <div className="section-header">
        <h2 className="section-title">Compétences</h2>
        <div className="muted">Tech stack & domaines d’expertise</div>
      </div>

      <div className="section-content" style={{ marginTop: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
          {previewSkills.map((s) => (
            <motion.div key={s.name} className="card" whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 800 }}>{s.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{s.hint}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPreview;
