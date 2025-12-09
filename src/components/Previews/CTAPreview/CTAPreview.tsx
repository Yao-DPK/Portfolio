import React from "react";
import { motion } from "framer-motion";
import styles from "./CTAPreview.module.css";

const CTAPreview: React.FC = () => (
  <section className="section">
    <div className="section-header">
      <h2 className="section-title">Contact</h2>
      <div className="muted">Discutons d’un projet ou d’une opportunité</div>
    </div>

    <motion.div
      className={styles.content}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.text}>
        <h3 className={styles.heading}>Prêt à collaborer ?</h3>
        <p className={styles.description}>
          Si tu veux échanger, tu peux m’envoyer un email ou visiter mes profils GitHub et LinkedIn.
        </p>
      </div>

      <div className={styles.buttons}>
        <a
          href="mailto:yao.konan2709@gmail.com"
          className="button"
        >
          Email
        </a>
        <a
          href="https://github.com/Yao-DPK"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          style={{ background: "linear-gradient(90deg,#333,#6e5494)" }}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/yaokonan"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          style={{ background: "linear-gradient(90deg,#0a66c2,#0072b1)" }}
        >
          LinkedIn
        </a>
      </div>
    </motion.div>
  </section>
);

export default CTAPreview;
