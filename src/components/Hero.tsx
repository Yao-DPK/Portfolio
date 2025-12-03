// src/components/Hero.tsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SimpleAvatar from "./Previews/SimpleAvatar";

const Hero: React.FC = () => {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", gap: 32 }}>
      <div>
        <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ fontSize: "2.1rem", margin: 0, color: "var(--clr-primary)" }}>
          Yao Konan — Ingénieur Logiciel
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="muted" style={{ marginTop: 12 }}>
          Je construis des applications rapides, fiables et centrées utilisateur. Spécialisé TypeScript, React/Angular et backend scalable.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <Link href="/projects" className="button">Voir mes projets</Link>
          <Link href="/contact" className="button" style={{ background: "linear-gradient(90deg,#735BFF,#4169E1)" }}>Me contacter</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginTop: 22 }}>
          <div className="muted" style={{ fontSize: "0.95rem" }}>
            Actuellement : Ingénieur Logiciel — open to opportunities
          </div>
        </motion.div>
      </div>

      <aside style={{ alignSelf: "center" }}>
        <SimpleAvatar />
      </aside>
    </div>
  );
};

export default Hero;
