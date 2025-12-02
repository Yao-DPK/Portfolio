// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => (
  <footer style={{ padding: "20px 28px", textAlign: "center", color: "var(--clr-text)" }}>
    <div className="muted">© {new Date().getFullYear()} Pyke — Built with Next.js</div>
  </footer>
);

export default Footer;