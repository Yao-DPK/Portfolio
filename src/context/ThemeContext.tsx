// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  ready: boolean; // indicates theme has been resolved (useful to avoid hydration flicker)
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "pyke:theme";

function getInitialTheme(): Theme | null {
  // Return null if undetermined (we'll resolve on client)
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  // Fallback to system preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // initial null -> prevent mismatch server/client
    return (typeof window === "undefined" ? "dark" : getInitialTheme() ?? "dark");
  });
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    // Resolve initial theme on client and keep in sync with system changes
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (systemPrefersDark ? "dark" : "light");
    setThemeState(initial);
    setReady(true);

    // Listen for system changes and update only if user hasn't explicitly set a value
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const storedInner = localStorage.getItem(STORAGE_KEY);
      if (!storedInner) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Apply theme to document element (so CSS can react with [data-theme="..."])
    document.documentElement.setAttribute("data-theme", theme);
    // Persist user preference
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, ready]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
