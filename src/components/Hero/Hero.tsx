import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SimpleAvatar from "../Previews/SimpleAvatar";

const Hero: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: 32,
        alignItems: "center",
      }}
    >
      <div>
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            fontSize: "2.4rem",
            margin: 0,
            lineHeight: 1.2,
            color: "var(--clr-primary)",
            fontWeight: 700,
          }}
        >
          Yao Konan  
          <span style={{ color: "var(--clr-text-muted)", fontWeight: 400 }}>
            {" "}• Ingénieur Logiciel
          </span>
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="muted"
          style={{
            marginTop: 12,
            fontSize: "1.05rem",
            lineHeight: 1.55,
            maxWidth: 600,
          }}
        >
          Je conçois des applications réactives, scalables et robustes grâce à{" "}
          <strong>TypeScript</strong>, <strong>React / Angular</strong>,
          <strong> Node.js</strong> et des architectures propres et maintenables.
        </motion.p>

        {/* OPTIONAL PERSONAL ANGLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="muted"
          style={{
            marginTop: 10,
            fontSize: "0.95rem",
            lineHeight: 1.55,
            maxWidth: 560,
          }}
        >
          {/* ➤ Placeholder personnalisable */}
          <em>(Placeholder) Passionné par les interfaces fluides,
          le realtime et la création de systèmes qui durent dans le temps.</em>
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ marginTop: 24, display: "flex", gap: 12 }}
        >
          <Link href="/projects" className="button">
            Voir mes projets
          </Link>

          <Link
            href="/contact"
            className="button"
            style={{
              background: "linear-gradient(90deg,#735BFF,#4169E1)",
            }}
          >
            Me contacter
          </Link>
        </motion.div>

        {/* STATUS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{ marginTop: 22 }}
        >
          <div className="muted" style={{ fontSize: "0.95rem" }}>
            Actuellement : <strong>Ingénieur Logiciel</strong> — Ouvert aux opportunités
          </div>
        </motion.div>
      </div>

      {/* AVATAR */}
      <aside style={{ justifySelf: "center" }}>
        <SimpleAvatar />
      </aside>
    </div>
  );
};

export default Hero;
