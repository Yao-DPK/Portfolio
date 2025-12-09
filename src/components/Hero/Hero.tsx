import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SimpleAvatar from "../Previews/SimpleAvatar";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={styles.title}
        >
          Yao Konan  
          <span className={styles.subtitle}> • Ingénieur Logiciel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className={styles.tagline}
        >
          Je conçois des applications réactives, scalables et robustes grâce à <strong>TypeScript</strong>, <strong>React / Angular</strong>, <strong>Node.js</strong> et des architectures propres et maintenables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className={styles.cta}
        >
          <Link href="/projects" className="button">Voir mes projets</Link>
          <Link href="/contact" className="button contact">Me contacter</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className={styles.status}
        >
          Actuellement : <strong>Ingénieur Logiciel</strong> — Ouvert aux opportunités
        </motion.div>
      </div>

      <aside className={styles.avatar}>
        <SimpleAvatar />
      </aside>
    </section>
  );
};

export default Hero;
