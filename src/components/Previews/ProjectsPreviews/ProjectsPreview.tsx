"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./ProjectsPreview.module.css";
import { projects } from "../../../data/project";
import Link from "next/link";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
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

export default function ProjectsPreview({ compact = true }) {
  const list = compact ? projects.slice(0, 3) : projects;

  return (
    <motion.div
      className={styles.projectsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.header}>
        <motion.div variants={cardVariants} className={styles.badge}>
          <span className={styles.badgeText}>🚀 Réalisations récentes</span>
        </motion.div>
        
        <motion.h2 variants={cardVariants} className={styles.title}>
          Projets
        </motion.h2>
        
        <motion.div variants={cardVariants} className={styles.titleUnderline} />
        
        <motion.p variants={cardVariants} className={styles.subtitle}>
          Sélection professionnelle · Fullstack
        </motion.p>
      </div>

      <div className={styles.grid}>
        {list.map((project, index) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            whileHover="hover"
            className={styles.card}
            custom={index}
          >
            {/* Image avec effet de zoom */}
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <Image
                  src={project.images![0]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.projectImage}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.viewProject}>Voir le projet</span>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className={styles.content}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.desc}>{project.short}</p>

              {/* Tags technologiques */}
              <div className={styles.techList}>
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className={styles.techTag}>
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className={styles.cta}>
                {project.status === "ready" ? (
                  <motion.a
                    href={project.link!}
                    className={styles.button}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span>Voir le projet</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </motion.a>
                ) : (
                  <div className={styles.comingSoon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Bientôt disponible</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bouton "Voir plus" optionnel */}
      {compact && projects.length > 3 && (
        <div className={styles.more}>
          <motion.a
            href="/projects"
            className={styles.moreButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir tous les projets</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      )}
    </motion.div>
  );
}