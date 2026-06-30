// src/components/GridBackgroundWrapper.tsx
'use client';

import { memo, useRef } from 'react';
import GridBackground from './GridBackground';

const GridBackgroundWrapper = memo(() => {
  const renderCount = useRef(0);
  renderCount.current++;
  //console.log(`GridBackground rendu ${renderCount.current} fois`);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <GridBackground
        gridSize={48}
        dotCount={5}
        trailLength={30}
        speed={1.2}
        enablePulses={false}   // active/désactive les pulses
        enableDots={false}     // active/désactive les points voyageurs
      />
    </div>
  );
});

GridBackgroundWrapper.displayName = 'GridBackgroundWrapper';

export default GridBackgroundWrapper;