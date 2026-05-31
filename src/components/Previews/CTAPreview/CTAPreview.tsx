import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./CTAPreview.module.css";

const CTAPreview: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const contactMethods = [
    {
      name: "Email",
      href: "mailto:yao.konan2709@gmail.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      gradient: "linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark))",
      color: "primary"
    },
    {
      name: "GitHub",
      href: "https://github.com/Yao-DPK",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      gradient: "linear-gradient(135deg, #333, #6e5494)",
      color: "github"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yaokonan",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      gradient: "linear-gradient(135deg, #0a66c2, #0072b1)",
      color: "linkedin"
    }
  ];

  return (
    <motion.div
      className={styles.ctaContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.header}>
        <motion.div variants={containerVariants} className={styles.badge}>
          <span className={styles.badgeText}>📬 Restons en contact</span>
        </motion.div>
        
        <motion.h2 variants={containerVariants} className={styles.title}>
          Prêt à collaborer ?
        </motion.h2>
        
        <motion.p variants={containerVariants} className={styles.description}>
          Que ce soit pour un projet passionnant, une opportunité professionnelle ou simplement pour échanger,
          je serais ravi de discuter avec vous.
        </motion.p>
      </div>

      <div className={styles.buttonsContainer}>
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.name}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles[method.color]}`}
            custom={index}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{ background: method.gradient }}
          >
            {method.icon}
            <span>{method.name}</span>
          </motion.a>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        className={styles.quote}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M10 11h-4v-4h4v4zM18 11h-4v-4h4v4z" />
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
        </svg>
        <p>Réponse sous 24h — Je suis impatient d'échanger avec vous !</p>
      </motion.div>
    </motion.div>
  );
};

export default CTAPreview;