import React, { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";


export type Tab =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

interface NavbarProps {
  current: Tab;
  onChange?: (t: Tab) => void;
}

const tabs : { key: Tab; label: string }[]= [
  { key: "about", label: "A Propos" },
  { key: "skills", label: "Compétences" },
  { key: "projects", label: "Projets" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Formation" },
  { key: "contact", label: "Contact" },
];

const handleScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const MenuIcon: React.FC<{ open: boolean, setOpen: any }> = ({ open, setOpen }) => {
  // simple sun/moon shapes via SVG path variations
  return <button
  className={styles.burger}
  aria-label="Menu"
  aria-expanded={open}
  onClick={() => setOpen(!open)}
>
  <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.25 }}
  className="burger-div"
>
  {!open ? (
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20"
    viewBox="0 -960 960 960" 
    fill="var(--clr-primary">
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>

  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 -960 960 960" 
    fill="var(--clr-primary">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
  )
  }
  </motion.div>
  </button>
};


const Navbar: React.FC<NavbarProps> = ({ current, onChange = handleScroll }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>Pyke</div>

      {/* MENU BUTTON */}

      <MenuIcon open={open} setOpen={setOpen}/>

      {/* MENU (desktop + mobile) */}
      <div className={`${styles.tablist} ${open ? styles.open : ""}`}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={styles.tabbutton}
            aria-selected={current === t.key}
            onClick={() => {
              onChange(t.key);
              setOpen(false);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      
      <ThemeToggle />
    </header>
  );
};

export default Navbar;
