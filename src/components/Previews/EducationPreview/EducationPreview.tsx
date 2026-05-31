import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./EducationPreview.module.css";
import { educations } from "@/data/education";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const EducationPreview: React.FC = () => {
  return (
    <motion.div
      className={styles.educationContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.header}>
        <motion.div variants={cardVariants} className={styles.badge}>
          <span className={styles.badgeText}>🎓 Parcours académique</span>
        </motion.div>
        
        <motion.h2 variants={cardVariants} className={styles.title}>
          Formation
        </motion.h2>
        
        <motion.div variants={cardVariants} className={styles.titleUnderline} />
      </div>

      <div className={styles.content}>
        {educations.map((education, index) => (
          <motion.div
            key={education.school}
            className={styles.card}
            variants={cardVariants}
            whileHover="hover"
            custom={index}
          >
            <div className={styles.cardHeader}>
              <div className={styles.degreeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className={styles.degree}>{education.degree}</div>
            </div>
            
            <div className={styles.schoolInfo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span className={styles.school}>{education.school}</span>
            </div>
            
            <div className={styles.period}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{education.period}</span>
            </div>
            
            <p className={styles.description}>{education.short}</p>
            
            {/* <div className={styles.cta}>
              <motion.a
                href="/education"
                className={styles.button}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>En savoir plus</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </div> */}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationPreview;