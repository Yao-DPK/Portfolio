// src/components/Navbar.tsx
import React from "react";
import ThemeToggle from "../ThemeToggle";
import styles from "./Navbar.module.css"

export type Tab = "about" | "skills" | "projects" | "experience" | "education" | "contact";

interface NavbarProps {
  current: Tab;
  onChange?: (t: Tab) => void;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "about", label: "A Propos" },
  { key: "skills", label: "Compétences" },
  { key: "projects", label: "Projets" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Formation" },
  { key: "contact", label: "Contact" },
];

const handleScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


const Navbar: React.FC<NavbarProps> = ({ current, onChange=handleScroll }) => {
  return (
    <header className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.brand}>Pyke</div>
      <div className={styles.tablist} role="tablist" aria-label="Sections">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={styles.tabbutton}
            role="tab"
            aria-selected={current === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => onChange(t.key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(t.key);
              }
            }}
          >
            {t.label}
          </button>
        ))}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
