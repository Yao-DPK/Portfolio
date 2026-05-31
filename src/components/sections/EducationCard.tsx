// src/components/EducationCard.tsx
import { Education } from "@/models/education.model";
import { motion } from "framer-motion";

interface Props {
  edu: Education;
}

export const EducationCard: React.FC<Props> = ({ edu }) => (
  <motion.div
    className="card"
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    style={{
      borderLeft: `4px solid ${"var(--clr-primary)"}`
    }}
  >
    {/* Header avec logo + infos principales */}
    <div className="card-title" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {edu.logo && (
        <img src={edu.logo} alt={edu.school} className="card-logo" />
      )}
      <div>
        <h3 className="card-role">{edu.degree}</h3>
        <p className="card-institution">
          {edu.school} {edu.field && `— ${edu.field}`}
        </p>
        <p className="card-period">
          {edu.period}
        </p>
        {edu.location && <p className="muted" style={{ fontSize: "0.85rem" }}>{edu.location}</p>}
      </div>
    </div>

    {/* Description / Réalisations */}
    {edu.description && (
      <ul className="education-description" style={{ marginTop: 12, paddingLeft: 16 }}>
        {edu.description.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    )}

    {/* Lien optionnel */}
    {edu.link && (
      <a
        href={edu.link}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
        style={{ marginTop: 12, display: "inline-block" }}
      >
        Voir le programme
      </a>
    )}
  </motion.div>
);
