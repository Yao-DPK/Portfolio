import React from "react";
import { motion } from "framer-motion";
import styles from "./EducationPreview.module.css";
import { educations } from "@/data/education";



const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const EducationPreview: React.FC = () => (
  <section className="section">
    <div className="section-header">
      <h2 className="section-title">Formation</h2>
      <div className="muted">Parcours académique</div>
    </div>

    <div className={styles.content}>
      {educations.map((e) => (
        <motion.div
          key={e.school}
          className={styles.card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <div className={styles.degree}>{e.degree}</div>
          <div className={styles.school}>
            {e.school} • {e.period}
          </div>
          <p className={styles.description}>{e.short}</p>
          <div className={styles.cta}>
            <a className="button" href="/education">
              Voir
            </a>
          </div>
        </motion.div>
      ))}

      {/* <div style={{ marginTop: 12, textAlign: "right" }}>
              <Link href="/education" className="button">
                Détails formation
              </Link>
            </div> */}
    </div>
  </section>
);

export default EducationPreview;
