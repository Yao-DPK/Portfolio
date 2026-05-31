import React from "react";
import { motion, Variants } from "framer-motion";
import SimpleAvatar from "../Previews/SimpleAvatar/SimpleAvatar";
import styles from "./Hero.module.css";

const handleScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const avatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.3
    }
  }
};

const Hero: React.FC = () => {
  return (
    <motion.section
      className={styles.hero}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className={styles.content} variants={itemVariants}>
        <motion.div className={styles.badge} variants={itemVariants}>
          <span className={styles.badgeText}>✨ Bienvenue sur mon portfolio</span>
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Yao Konan
          <span className={styles.titleAccent}>.</span>
        </motion.h1>

        <motion.div className={styles.role} variants={itemVariants}>
          <span className={styles.roleText}>Ingénieur Logiciel Fullstack</span>
          <div className={styles.roleIndicator} />
        </motion.div>

        <motion.p className={styles.tagline} variants={itemVariants}>
          Je conçois des applications réactives, scalables et robustes grâce à{" "}
          <strong className={styles.highlight}>TypeScript</strong>,{" "}
          <strong className={styles.highlight}>React / Angular</strong>,{" "}
          <strong className={styles.highlight}>Node.js</strong>{" "}
          et des architectures propres et maintenables.
        </motion.p>

        <motion.div className={styles.cta} variants={itemVariants}>
          <motion.button
            onClick={() => handleScroll("projects")}
            className={`${styles.button} ${styles.buttonPrimary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM10 14H3v7h7v-7zM21 14h-7v7h7v-7z"/>
            </svg>
            Voir mes projets
          </motion.button>
          
          <motion.button
            onClick={() => handleScroll("contact")}
            className={`${styles.button} ${styles.buttonSecondary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
            Me contacter
          </motion.button>
        </motion.div>

        <motion.div className={styles.status} variants={itemVariants}>
          <div className={styles.statusDot} />
          <span>Actuellement : </span>
          <strong>Ingénieur Logiciel</strong>
          <span> — Ouvert aux opportunités</span>
        </motion.div>

        <motion.div className={styles.techStack} variants={itemVariants}>
          {["React", "TypeScript", "Node.js", "Next.js", "Angular"].map((tech, i) => (
            <motion.span
              key={tech}
              className={styles.techTag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.aside
        className={styles.avatar}
        variants={avatarVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={styles.avatarGlow}>
          <SimpleAvatar />
        </div>
      </motion.aside>
    </motion.section>
  );
};

export default Hero;