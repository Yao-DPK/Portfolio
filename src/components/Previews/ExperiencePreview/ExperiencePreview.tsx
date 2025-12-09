// src/components/ExperiencePreview.tsx
import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";


const ExperiencePreview: React.FC = () => (
  <div className="section">
    <div className="section-header theme-transition">
      <h2 className="section-title">Expérience</h2>
      <div className="muted">Parcours rapide</div>
    </div>

    <div className="section-content" style={{ marginTop: 16 }}>
      <div className="experience-grid">
        {experiences.map((e) => (
          <motion.div
            key={e.company}
            className="card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            style={{
              padding: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--clr-primary)" }}>
                {e.role}
              </div>
              <div className="muted" style={{ fontSize: ".9rem", marginTop: 2 }}>
                {e.company} • {e.period}
              </div>

              <p className="muted" style={{ marginTop: 10, lineHeight: 1.45 }}>
                {e.short}
              </p>
            </div>

            <div style={{ marginTop: 16, textAlign: "right" }}>
              <a className="button" href="/experience">
                Voir
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      {/* <div style={{ marginTop: 12, textAlign: "right" }}>
              <Link href="/experience" className="button">
                Voir l'expérience complète
              </Link>
            </div> */}
    </div>
  </div>
);

export default ExperiencePreview;
