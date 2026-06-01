import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import styles from "./SkillsPreview.module.css";

const topSkills = [
  { name: "TypeScript", hint: "Langage Principal", icon: "⚡" },
  { name: "React / Next.js", hint: "UI & SSR", icon: "⚛️" },
  { name: "Node.js", hint: "APIs & backend", icon: "🚀" },
  { name: "PostgreSQL", hint: "Schema design", icon: "🗄️" },
];

const categories = [
  {
    label: "Frontend",
    icon: "🎨",
    items: ["React", "Next.js", "Angular", "Tailwind", "Framer Motion"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    label: "Backend",
    icon: "⚙️",
    items: ["Node.js", "Nest.js", "Express", "FastAPI"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    label: "Databases",
    icon: "💾",
    items: ["PostgreSQL", "MySQL"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    label: "DevOps & Tools",
    icon: "🔧",
    items: ["Docker", "GitHub Actions", "CI/CD", "Linux"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    label: "Mobile",
    icon: "📱",
    items: ["Flutter", "React Native"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
];

const transversalSkills = [
  "Clean Architecture",
  "API Design",
  "Testing (unit, integration, e2e)",
  "Secure Auth (JWT, OAuth2, sessions)",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const SkillsPreview: React.FC = () => {
  return (
    <motion.div
      className={styles.skillsContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.header}>
        <motion.div variants={itemVariants} className={styles.badge}>
          <span className={styles.badgeText}>💻 Stack technique</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className={styles.title}>
          Compétences
        </motion.h2>
        
        <motion.div variants={itemVariants} className={styles.titleUnderline} />
        
        <motion.p variants={itemVariants} className={styles.subtitle}>
          Aperçu de mon expertise technique
        </motion.p>
      </div>

      <div className={styles.content}>
        {/* TOP SKILLS */}
        <motion.div variants={itemVariants} className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>⭐</span>
            <h3 className={styles.sectionTitle}>Compétences principales</h3>
          </div>
          
          <div className={styles.topSkillsGrid}>
            {topSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={styles.topSkillCard}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                custom={index}
              >
                <div className={styles.topSkillIcon}>{skill.icon}</div>
                <div className={styles.topSkillName}>{skill.name}</div>
                <div className={styles.topSkillHint}>{skill.hint}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CATEGORIES */}
        <motion.div variants={itemVariants} className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📦</span>
            <h3 className={styles.sectionTitle}>Stack technique</h3>
          </div>
          
          <div className={styles.categoriesGrid}>
            {categories.map((cat, index) => (
              <motion.div
                key={cat.label}
                className={styles.categoryCard}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                custom={index}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon}>{cat.icon}</span>
                  <h4 className={styles.categoryTitle}>{cat.label}</h4>
                </div>
                <div className={styles.categoryItems}>
                  {cat.items.map((item) => (
                    <span key={item} className={styles.categoryItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TRANSVERSAL SKILLS */}
        <motion.div variants={itemVariants} className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🧠</span>
            <h3 className={styles.sectionTitle}>Compétences transversales</h3>
          </div>
          
          <motion.div
            className={styles.transversalCard}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.transversalList}>
              {transversalSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className={styles.transversalItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsPreview;