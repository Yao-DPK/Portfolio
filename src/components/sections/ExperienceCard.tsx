// src/components/ExperienceCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../../models/experience.model";
import { FaCircle } from "react-icons/fa";

interface Props {
  experience: Experience;
}

const ExperienceCard: React.FC<Props> = ({ experience }) => {
  return (
    <motion.div
      className="card"
      whileHover={{ y: -8, scale: 1.03, boxShadow: "var(--shadow-strong)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        borderLeft: `4px solid ${experience.color || "var(--clr-primary)"}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        {experience.logo && (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={experience.logo}
              alt={experience.company}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div>
          <h3 className="card-role" style={{ margin: 0 }}>{experience.role}</h3>
          <div className="card-institution muted">{experience.company}</div>
          <div className="card-period muted">{experience.period} • {experience.type || "CDI"}</div>
          {experience.location && <div className="muted" style={{ fontSize: 12 }}>{experience.location}</div>}
        </div>
      </div>

      {/* Description */}
      <ul className="experience-description">
        {experience.description.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      {/* Tech / skills badges */}
      {experience.tech && experience.tech.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {experience.tech.map((t) => (
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
      )}
    </motion.div>
  );
};

export default ExperienceCard;
