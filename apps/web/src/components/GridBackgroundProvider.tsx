// src/components/GridBackgroundProvider.tsx
'use client';

import { createContext, useContext, useRef, ReactNode, useState } from 'react';
import GridBackground from './GridBackground';

// Contexte pour partager l'état du background
interface GridBackgroundContextType {
  resetBackground: () => void;
}

const GridBackgroundContext = createContext<GridBackgroundContextType | null>(null);

export const useGridBackground = () => {
  const context = useContext(GridBackgroundContext);
  if (!context) {
    throw new Error('useGridBackground must be used within GridBackgroundProvider');
  }
  return context;
};

export default function GridBackgroundProvider({ children }: { children: ReactNode }) {
  const backgroundRef = useRef<{ reset: () => void } | null>(null);
  const [key, setKey] = useState(0);

  // Fonction pour réinitialiser le background (si besoin)
  const resetBackground = () => {
    setKey(prev => prev + 1);
  };

  return (
    <GridBackgroundContext.Provider value={{ resetBackground }}>
      {/* ✅ Le background est en dehors du contenu, jamais remonté */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GridBackground
          key={`bg-${key}`}
          gridSize={48}
          dotCount={5}
          trailLength={30}
          speed={1}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </GridBackgroundContext.Provider>
  );
}