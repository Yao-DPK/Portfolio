import React from "react";
import { motion, Variants } from "framer-motion";
import { experiences } from "@/data/experiences";
import styles from "./ExperiencePreview.module.css";

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

const ExperiencePreview: React.FC = () => {
  return (
    <motion.div
      className={styles.experienceContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.header}>
        <motion.div variants={cardVariants} className={styles.badge}>
          <span className={styles.badgeText}>💼 Parcours professionnel</span>
        </motion.div>
        
        <motion.h2 variants={cardVariants} className={styles.title}>
          Expérience
        </motion.h2>
        
        <motion.div variants={cardVariants} className={styles.titleUnderline} />
      </div>

      <div className={styles.content}>
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            className={styles.card}
            variants={cardVariants}
            whileHover="hover"
            custom={index}
          >
            <div className={styles.cardHeader}>
              <div className={styles.companyIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                  <line x1="8" y1="9" x2="16" y2="9"/>
                  <line x1="8" y1="13" x2="12" y2="13"/>
                </svg>
              </div>
              <div>
                <div className={styles.role}>{experience.role}</div>
                <div className={styles.company}>{experience.company}</div>
              </div>
            </div>
            
            <div className={styles.period}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{experience.period}</span>
            </div>
            
            <p className={styles.description}>{experience.short}</p>
            
            {/* {experience.technologies && (
              <div className={styles.technologies}>
                {experience.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            )} */}
            
            {/* <div className={styles.cta}>
              <motion.a
                href="/experience"
                className={styles.button}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>Détails</span>
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

export default ExperiencePreview;