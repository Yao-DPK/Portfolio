// src/components/sections/About.tsx
import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "➡️" },
  { name: "Node.js", icon: "🟢" },
  { name: "TypeScript", icon: "TS" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "UX/UI", icon: "🎨" },
];

const timeline = [
  { year: "2019", label: "Classes Préparatoires" },
  { year: "2021", label: "Entrée à L'ESI de L'INPHB" },
  { year: "2023", label: "Admis en Mobilité à L'ESIR de Rennes" },
  { year: "2025", label: "Diplomé ESIR de Rennes" },
];

const About: React.FC = () => {
  return (
    <>
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">À propos</h2>
          <div className="muted">Développeur Fullstack — React / TypeScript / Next.js</div>
        </div>

        {/* Content Grid */}
        <div className="section-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, alignItems: "center" }}>
          
          {/* Colonne 1 : Texte + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <p className="muted" style={{ lineHeight: 1.6 }}>
              Bonjour — je suis <strong>Yao Konan</strong>, ingénieur logiciel spécialisé dans les interfaces réactives,
              les architectures robustes et les expériences utilisateur polies. J’ai une préférence pour un code propre,
              des transitions fluides et une indépendance technique.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="button">
                Me contacter
              </motion.button>
              <motion.a href="https://github.com/Yao-DPK" target="_blank" className="button" whileHover={{ scale: 1.05 }}>
                <FaGithub style={{ marginRight: 6 }} /> GitHub
              </motion.a>
              <motion.a href="https://linkedin.com/in/yaokonan" target="_blank" className="button" whileHover={{ scale: 1.05 }}>
                <FaLinkedin style={{ marginRight: 6 }} /> LinkedIn
              </motion.a>
            </div>
          </motion.div>

          {/* Colonne 2 : Avatar / Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/David .jpg"
              alt="Pyke avatar"
              className="avatar"
            />
          </motion.div>

          {/* Colonne 3 : Résumé + badges compétences + timeline */}
          <motion.div
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h3>Résumé rapide</h3>
            <p className="muted">Fullstack (React, Next.js, Node), BDD (Postgres, Mongo), DevOps basique, design axé UX.</p>

            {/* Badges compétences */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skills.map((s) => (
                <motion.span key={s.name} whileHover={{ scale: 1.1 }} className="badge" style={{
                  padding: "4px 10px", borderRadius: 8, fontWeight: 600,
                  background: "rgba(65,105,225,0.1)", color: "var(--clr-primary)"
                }}>
                  {s.icon} {s.name}
                </motion.span>
              ))}
            </div>

            {/* Timeline verticale */}
            <div style={{ marginTop: 12, borderLeft: "2px solid var(--clr-primary)", paddingLeft: 12 }}>
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  style={{ marginBottom: 12 }}
                >
                  <strong>{t.year}</strong> — {t.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          
        </div>
    </>
  );
};

export default About;
