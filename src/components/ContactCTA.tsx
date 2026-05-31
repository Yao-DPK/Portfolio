// src/components/ContactCTA.tsx
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ContactCTA: React.FC = () => (
  <div className="section theme-transition">
    <div className="section-header">
      <h2 className="section-title">Contact</h2>
      <div className="muted">Discutons d’un projet ou d’une opportunité</div>
    </div>

    <div className="section-content" style={{ marginTop: 12, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h3 style={{ margin: 0 }}>Prêt à collaborer ?</h3>
        <p className="muted" style={{ marginTop: 8 }}>
          Si tu as un projet ou une mission — envoie un message ou réserve un créneau. Je réponds rapidement.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/contact" className="button">Me contacter</Link>
        <a className="button" href="/cv.pdf" target="_blank" rel="noopener noreferrer" style={{ background: "linear-gradient(90deg,#735BFF,#4169E1)" }}>
          Télécharger CV
        </a>
      </div>
    </div>
  </div>
);

export default ContactCTA;
