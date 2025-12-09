// src/components/Previews/SkillsPreview.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./SkillsPreview.module.css"

const topSkills = [
  { name: "TypeScript", hint: "Primary language" },
  { name: "React / Next.js", hint: "UI & SSR" },
  { name: "Node.js", hint: "APIs & backend" },
  { name: "PostgreSQL", hint: "Schema design" },
];

const categories = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "Angular", "Tailwind", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST", "WebSockets"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    label: "DevOps & Tools",
    items: ["Docker", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    label: "Mobile",
    items: ["Flutter (BLoC)"],
  },
];

const transversalSkills = [
  "Clean Architecture",
  "API Design",
  "Testing (unit, integration, e2e)",
  "Performance Optimization",
  "Secure Auth (JWT, OAuth2, sessions)",
];

const SkillsPreview: React.FC = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Compétences</h2>
        <div className="muted">Aperçu de mon expertise technique</div>
      </div>

      <div className="section-content" style={{ marginTop: 16 }}>
        {/* TOP SKILLS */}
        <div className="muted" style={{ fontWeight: 600, marginBottom: 8 }}>
          ⭐ Compétences principales
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(10rem,1fr))",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {topSkills.map((s) => (
            <motion.div
              key={s.name}
              className="card"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              style={{ padding: "12px 14px" }}
            >
              <div style={{ fontWeight: 700 }}>{s.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>
                {s.hint}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CATEGORIES */}
        <div className="muted" style={{ fontWeight: 600, marginBottom: 8 }}>
          📦 Stack technique
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              className="card"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ padding: "14px 16px" }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {cat.label}
              </div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.4 }}>
                {cat.items.join(" • ")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* TRANSVERSAL */}
        <div className="muted" style={{ fontWeight: 600, marginBottom: 8 }}>
          🧠 Compétences transversales
        </div>
        <motion.div
          className="card"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ padding: "14px 16px" }}
        >
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.5 }}>
            {transversalSkills.map((t) => (
              <li key={t} className="muted" style={{ fontSize: 13 }}>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* More */}
      <div className={styles.more}>
        <Link href="/skills" className="button">
          Voir toutes mes compétences
        </Link>
      </div>
    </div>
  );
};

export default SkillsPreview;
