// src/components/sections/Contact.tsx
import { motion } from "framer-motion";
import React, { useState } from "react";

const Contact: React.FC = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ici, tu peux implémenter un envoi réel via API ou service tiers
    setStatus("Merci ! Votre message a été simulé avec succès ✅");
  };

  return (
    <>
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">Contact</h2>
        <div className="muted">Discutons d’un projet ou d’une opportunité</div>
      </div>

      {/* Content */}
      <div
        className="section-content"
        style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}
      >
        {/* Formulaire */}
        <motion.form
          style={{
            flex: 1,
            minWidth: 280,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <input
            name="name"
            placeholder="Nom"
            required
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid var(--clr-border)",
              background: "transparent",
              color: "var(--clr-text)",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--clr-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--clr-border)")}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid var(--clr-border)",
              background: "transparent",
              color: "var(--clr-text)",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--clr-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--clr-border)")}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={6}
            required
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid var(--clr-border)",
              background: "transparent",
              color: "var(--clr-text)",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--clr-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--clr-border)")}
          />
          <button className="button" type="submit">
            Envoyer
          </button>
          {status && <p className="muted">{status}</p>}
        </motion.form>

        {/* Carte contact rapide */}
        <motion.div
          className="card"
          style={{ width: 320 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h3 className="card-title">Contact rapide</h3>
          <p className="muted"><b>Email:</b> yao.konan2709@gmail.com</p>
          <p className="muted"><b>Localisation:</b> Rennes, France</p>
          <p className="muted"><b>Téléphone:</b> +33 07 75 95 11 04</p>

          {/* Boutons réseaux / liens */}
          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a className="button" href="https://github.com/Yao-DPK" target="_blank">GitHub</a>
            <a className="button" href="https://www.linkedin.com/in/yaokonan" target="_blank">LinkedIn</a>
            <a className="button" href="https://twitter.com/" target="_blank">Twitter</a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
