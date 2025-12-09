"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ProjectsPreview.module.css";
import { projects } from "../../../data/project"
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

export default function ProjectsPreview({ compact = true }) {
  const list = compact ? projects.slice(0, 3) : projects;

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Projets</h2>
        <div className="muted">Sélection professionnelle · Fullstack</div>
      </div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {list.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariants}
            className={styles.card}
            whileHover={{
              scale: 1.01,
              transition: { type: "spring", stiffness: 80 },
            }}
          >
            {/* Image */}
            <div className={styles.imageWrapper}>
              <img src={p.images![0]} alt={p.title} />
              <div className={styles.overlay} />
            </div>

            {/* Title */}
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.desc}>{p.short}</p>

            {/* Tech badges */}
            <div className={styles.techList}>
              {p.tech.map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </div>


            {/* CTA */}
            <div className={styles.cta}>
              {p.status === "ready" ? 
               (
                <Link href={p.link!} className="button">
                Voir le projet
                </Link> 
               ): 
               (
                <Link href="#" className={`button ${styles.disabled}`}>
                Bientôt
                </Link>  
               )
              }
              
            </div>
            
          </motion.div>
        ))}
      </motion.div>

      {/* More */}
      {/* <div className={styles.more}>
        <Link href="/projects" className="button">
          Voir tous les projets
        </Link>
      </div> */}
    </div>
  );
}
