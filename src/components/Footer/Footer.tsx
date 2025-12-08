// src/components/Footer.tsx
import React from "react";
import styles from "./Footer.module.css"

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className="muted">© {new Date().getFullYear()} Pyke — Built with Next.js</div>
  </footer>
);

export default Footer;