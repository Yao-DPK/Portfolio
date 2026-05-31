import React, { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";

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
  scrolled?: boolean;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "about", label: "À Propos" },
  { key: "skills", label: "Compétences" },
  { key: "projects", label: "Projets" },
  { key: "experience", label: "Expérience" },
  { key: "education", label: "Formation" },
  { key: "contact", label: "Contact" },
];

const handleScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80; // Hauteur de la navbar
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// MenuIcon avec meilleure animation
const MenuIcon: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
  return (
    <button
      className={styles.burger}
      aria-label="Menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      <motion.div
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={styles.burgerIcon}
      >
        {!open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        )}
      </motion.div>
    </button>
  );
};

// Composant pour l'indicateur de section active
const ActiveIndicator: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={styles.activeIndicator}
          layoutId="activeTab"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC<NavbarProps> = ({ current, onChange = handleScroll, scrolled = false }) => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(scrolled);

  // Détecter le scroll pour l'effet glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <motion.header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.navbarContainer}>
        {/* Brand avec animation */}
        <motion.div
          className={styles.brand}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.brandText}>Pyke</span>
          <span className={styles.brandDot}>.</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className={styles.tablistDesktop}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`${styles.tabbutton} ${current === t.key ? styles.active : ""}`}
              aria-selected={current === t.key}
              onClick={() => {
                onChange(t.key);
                setOpen(false);
              }}
            >
              <span className={styles.tabLabel}>{t.label}</span>
              {current === t.key && <ActiveIndicator active={true} />}
            </button>
          ))}
        </div>

        {/* Actions (ThemeToggle + Menu) */}
        <div className={styles.actions}>
          <ThemeToggle />
          <MenuIcon open={open} setOpen={setOpen} />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className={styles.mobileMenuContent}>
                {tabs.map((t) => (
                  <motion.button
                    key={t.key}
                    className={`${styles.mobileTabbutton} ${current === t.key ? styles.active : ""}`}
                    onClick={() => {
                      onChange(t.key);
                      setOpen(false);
                    }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.mobileTabLabel}>{t.label}</span>
                    {current === t.key && (
                      <motion.div
                        className={styles.mobileActiveIndicator}
                        layoutId="mobileActiveTab"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;