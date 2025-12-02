// src/components/sections/Skills.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaDocker } from "react-icons/fa"; // Exemples d'icônes
import { SiTypescript, SiNextdotjs } from "react-icons/si";
import { Tooltip } from "react-tooltip"; // Optionnel, installer react-tooltip

type Skill = {
  name: string;
  level: number;
  icon?: React.ReactNode;
  tooltip?: string;
};

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 5, icon: <FaReact color="#61dafb" />, tooltip: "Projet: Portfolio, SkillTrackr" },
      { name: "Next.js", level: 4, icon: <SiNextdotjs />, tooltip: "Projet: Portfolio Next.js" },
      { name: "TypeScript", level: 4, icon: <SiTypescript color="#3178c6" /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 4, icon: <FaNodeJs color="#3c873a" /> },
      { name: "Express.js", level: 4, tooltip: "APIs REST pour projets personnels" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", level: 3, icon: <FaDatabase color="#336791" /> },
      { name: "MongoDB", level: 3 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 3, icon: <FaDocker color="#0db7ed" /> },
      { name: "Git", level: 5 },
      { name: "CI/CD", level: 3 },
    ],
  },
];

const getWidth = (level: number) => `${(level / 5) * 100}%`;
const levelText = ["Débutant","Intermédiaire","Avancé","Expert","Maître"];

const Skills: React.FC = () => {
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Compétences</h2>
        <div className="muted">Tech stack & domaines d’expertise</div>
      </div>

      <div className="section-content" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <h3 style={{ marginBottom: 20, color: "var(--clr-primary)" }}>{cat.title}</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {cat.skills.map((s) => (
                <motion.div
                  key={s.name}
                  className="card"
                  whileHover={{ y: -8, rotate: 1.5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    position: "relative",
                    padding: 20,
                    cursor: s.tooltip ? "pointer" : "default",
                  }}
                  data-tooltip-id={s.name}
                  data-tooltip-content={s.tooltip}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {s.icon && <span style={{ fontSize: 28 }}>{s.icon}</span>}
                    <span style={{ fontWeight: 600, color: "var(--clr-text)" }}>{s.name}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.8rem",
                        color: "rgba(var(--clr-text-rgb,0,0,0),0.6)",
                        fontWeight: 500,
                      }}
                    >
                      {levelText[s.level - 1]}
                    </span>
                  </div>

                  <div
                    style={{
                      height: 6,
                      borderRadius: 6,
                      background: "rgba(var(--clr-primary-rgb),0.12)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: getWidth(s.level) }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      style={{
                        height: "100%",
                        borderRadius: 6,
                        background: "var(--clr-primary)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tooltips */}
      <Tooltip id="react-tooltip" place="top" />
    </>
  );
};

export default Skills;
