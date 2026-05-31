// src/components/ThemeToggle.tsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ToggleIcon: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => {
  // simple sun/moon shapes via SVG path variations
  return theme === "dark" ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </g>
    </svg>
  );
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, ready } = useTheme();

  // Do not render toggle until theme resolved — avoids mismatch
  if (!ready) return <div style={{ width: 44, height: 44 }} aria-hidden />;

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      style={{
        background: "transparent",
        border: "none",
        padding: 6,
        borderRadius: 10,
        cursor: "pointer",
      }}
    >
      <motion.div
        initial={{ rotate: 0, scale: 0.98 }}
        animate={{ rotate: theme === "dark" ? 0 : 40, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--clr-primary)",
        }}
      >
        <ToggleIcon theme={theme} />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
