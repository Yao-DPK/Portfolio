// src/components/GridBackground.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────
interface Dot {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  trail: { x: number; y: number }[];
  speed: number;
  color: string;
  direction: 'horizontal' | 'vertical';
  nextIntersectionX: number;
  nextIntersectionY: number;
  attracted: boolean;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitX: number;
  orbitY: number;
}

interface Pulse {
  id: number;
  startX: number;
  startY: number;
  direction: 'up' | 'down' | 'left' | 'right';
  step: number;
  maxSteps: number;
  progress: number; // 0..1
  active: boolean;
}

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  dotCount?: number;
  trailLength?: number;
  speed?: number;
  attractRadius?: number;
  orbitRadiusMin?: number;
  orbitRadiusMax?: number;
  orbitSpeed?: number;
  // ✅ Nouveaux toggles
  enablePulses?: boolean;
  enableDots?: boolean;
}

export default function GridBackground({
  className = '',
  gridSize = 48,
  dotCount = 5,
  trailLength = 30,
  speed = 1.2,
  attractRadius = 350,
  orbitRadiusMin = 120,
  orbitRadiusMax = 220,
  orbitSpeed = 0.015,
  enablePulses = true,
  enableDots = true,
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const frameRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const mouseTargetRef = useRef<{ x: number; y: number } | null>(null);
  const pulseCooldownRef = useRef(0);
  const randomPulseTimerRef = useRef(0);
  const nextPulseIdRef = useRef(0);

  const DOT_COLORS = [
    '#2563EB', '#7C3AED', '#059669', '#DC2626', '#D97706', '#0891B2',
  ];

  // ─── Détection du thème ────────────────────────────────
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // ─── Suivi de la souris ────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseTargetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseTargetRef.current = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ─── Initialisation des points ─────────────────────────
  useEffect(() => {
    const initDots = (width: number, height: number) => {
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      dotsRef.current = [];

      for (let i = 0; i < dotCount; i++) {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        const x = col * gridSize + gridSize / 2;
        const y = row * gridSize + gridSize / 2;
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        let nextX = x,
          nextY = y;
        if (direction === 'horizontal') {
          const targetCol = (col + (Math.random() > 0.5 ? 1 : -1) + cols) % cols;
          nextX = targetCol * gridSize + gridSize / 2;
          nextY = y;
        } else {
          const targetRow = (row + (Math.random() > 0.5 ? 1 : -1) + rows) % rows;
          nextX = x;
          nextY = targetRow * gridSize + gridSize / 2;
        }

        dotsRef.current.push({
          x,
          y,
          targetX: nextX,
          targetY: nextY,
          trail: [{ x, y }],
          speed: speed * (0.7 + Math.random() * 0.6),
          color: DOT_COLORS[i % DOT_COLORS.length],
          direction,
          nextIntersectionX: nextX,
          nextIntersectionY: nextY,
          attracted: false,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitRadius: orbitRadiusMin + Math.random() * (orbitRadiusMax - orbitRadiusMin),
          orbitSpeed: orbitSpeed * (0.8 + Math.random() * 0.4),
          orbitX: x,
          orbitY: y,
        });
      }
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    dimensionsRef.current = { width, height };
    initDots(width, height);
  }, [dotCount, gridSize, speed, orbitRadiusMin, orbitRadiusMax, orbitSpeed]);

  // ─── Redimensionnement ─────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      dimensionsRef.current = { width, height };
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ─── Fonctions de déclenchement des pulses ─────────────
  const triggerPulse = (x: number, y: number) => {
    if (!enablePulses) return;
    // Arrondir à l'intersection la plus proche
    const col = Math.round((x - gridSize / 2) / gridSize);
    const row = Math.round((y - gridSize / 2) / gridSize);
    const startX = col * gridSize + gridSize / 2;
    const startY = row * gridSize + gridSize / 2;

    // Vérifier que l'intersection est dans le canvas
    const { width, height } = dimensionsRef.current;
    if (startX < 0 || startX > width || startY < 0 || startY > height) return;

    const maxSteps = 8;
    const directions = ['up', 'down', 'left', 'right'] as const;
    const id = nextPulseIdRef.current++;

    for (const dir of directions) {
      pulsesRef.current.push({
        id,
        startX,
        startY,
        direction: dir,
        step: 0,
        maxSteps,
        progress: 0,
        active: true,
      });
    }
  };

  // ─── Animation ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ─── Helpers pour les directions ──────────────────────
    const getDirectionDelta = (dir: string) => {
      switch (dir) {
        case 'up': return { dx: 0, dy: -1 };
        case 'down': return { dx: 0, dy: 1 };
        case 'left': return { dx: -1, dy: 0 };
        case 'right': return { dx: 1, dy: 0 };
        default: return { dx: 0, dy: 0 };
      }
    };

    const chooseNewDirection = (dot: Dot, cols: number, rows: number, targetX?: number, targetY?: number) => {
      const currentCol = Math.round((dot.x - gridSize / 2) / gridSize);
      const currentRow = Math.round((dot.y - gridSize / 2) / gridSize);

      if (targetX !== undefined && targetY !== undefined) {
        const dx = targetX - dot.x;
        const dy = targetY - dot.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          dot.direction = 'horizontal';
          const delta = dx > 0 ? 1 : -1;
          const targetCol = (currentCol + delta + cols) % cols;
          dot.nextIntersectionX = targetCol * gridSize + gridSize / 2;
          dot.nextIntersectionY = dot.y;
        } else {
          dot.direction = 'vertical';
          const delta = dy > 0 ? 1 : -1;
          const targetRow = (currentRow + delta + rows) % rows;
          dot.nextIntersectionX = dot.x;
          dot.nextIntersectionY = targetRow * gridSize + gridSize / 2;
        }
      } else {
        const newDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        dot.direction = newDirection;
        if (newDirection === 'horizontal') {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const targetCol = (currentCol + delta + cols) % cols;
          dot.nextIntersectionX = targetCol * gridSize + gridSize / 2;
          dot.nextIntersectionY = dot.y;
        } else {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const targetRow = (currentRow + delta + rows) % rows;
          dot.nextIntersectionX = dot.x;
          dot.nextIntersectionY = targetRow * gridSize + gridSize / 2;
        }
      }
    };

    // ─── Boucle principale ────────────────────────────────
    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      frameRef.current++;

      // Pulsation globale pour le fond
      const pulse = Math.sin(frameRef.current * 0.02) * 0.5 + 0.5;

      // ── Gestion des pulses ──
      if (enablePulses) {
        // Déclenchement aléatoire (toutes les 2-4 secondes)
        randomPulseTimerRef.current += 1 / 60;
        if (randomPulseTimerRef.current > 2 + Math.random() * 2) {
          randomPulseTimerRef.current = 0;
          const randCol = Math.floor(Math.random() * cols);
          const randRow = Math.floor(Math.random() * rows);
          const x = randCol * gridSize + gridSize / 2;
          const y = randRow * gridSize + gridSize / 2;
          triggerPulse(x, y);
        }

        // Déclenchement souris (si souris sur une intersection)
        const mouse = mouseTargetRef.current;
        if (mouse) {
          pulseCooldownRef.current -= 1 / 60;
          const nearestCol = Math.round((mouse.x - gridSize / 2) / gridSize);
          const nearestRow = Math.round((mouse.y - gridSize / 2) / gridSize);
          const ix = nearestCol * gridSize + gridSize / 2;
          const iy = nearestRow * gridSize + gridSize / 2;
          const distToIntersection = Math.hypot(mouse.x - ix, mouse.y - iy);
          if (distToIntersection < gridSize * 0.6 && pulseCooldownRef.current <= 0) {
            pulseCooldownRef.current = 1; // cooldown 1 seconde
            triggerPulse(ix, iy);
          }
        }

        // Mise à jour des pulses
        for (const pulse of pulsesRef.current) {
          if (!pulse.active) continue;
          // Avancer d'un pas par frame (on peut ajuster la vitesse)
          pulse.step += 0.3; // vitesse de propagation
          pulse.progress = Math.min(pulse.step / pulse.maxSteps, 1);
          if (pulse.step >= pulse.maxSteps) {
            pulse.active = false;
          }
        }

        // Nettoyer les pulses inactifs
        pulsesRef.current = pulsesRef.current.filter(p => p.active);
      }

      // ── Effacer ──
      ctx.clearRect(0, 0, width, height);

      // ── Fond ──
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      if (isDark) {
        bgGradient.addColorStop(0, '#0f1a2e');
        bgGradient.addColorStop(0.5, '#0a1525');
        bgGradient.addColorStop(1, '#050a14');
      } else {
        bgGradient.addColorStop(0, '#f0f4ff');
        bgGradient.addColorStop(1, '#e8ecf5');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // ── Effet pulsation du fond ──
      if (isDark) {
        const pulseGlow = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, Math.max(width, height) * 0.5
        );
        const alpha = 0.03 + pulse * 0.04;
        pulseGlow.addColorStop(0, `rgba(60, 130, 255, ${alpha})`);
        pulseGlow.addColorStop(1, 'rgba(60, 130, 255, 0)');
        ctx.fillStyle = pulseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // ── Grille ──
      const gridColor = isDark
        ? `rgba(80, 160, 255, ${0.12 + pulse * 0.05})`
        : 'rgba(37, 99, 235, 0.10)';
      const gridColorStrong = isDark
        ? `rgba(100, 190, 255, ${0.35 + pulse * 0.1})`
        : 'rgba(37, 99, 235, 0.20)';
      const subGridColor = isDark
        ? `rgba(60, 140, 255, ${0.06 + pulse * 0.03})`
        : 'rgba(37, 99, 235, 0.05)';

      ctx.lineWidth = isDark ? 1.2 : 1;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = x % (gridSize * 2) === 0 ? gridColorStrong : gridColor;
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = y % (gridSize * 2) === 0 ? gridColorStrong : gridColor;
        ctx.stroke();
      }

      // Sous-grille
      if (isDark) {
        ctx.lineWidth = 0.5;
        const subGridSize = gridSize / 4;
        for (let x = 0; x <= width; x += subGridSize) {
          if (x % gridSize === 0) continue;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.strokeStyle = subGridColor;
          ctx.stroke();
        }
        for (let y = 0; y <= height; y += subGridSize) {
          if (y % gridSize === 0) continue;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.strokeStyle = subGridColor;
          ctx.stroke();
        }
      }

      // ── Dessiner les pulses ──
      if (enablePulses) {
        const pulseColor = isDark ? '#60A5FA' : '#2563EB';
        for (const pulse of pulsesRef.current) {
          const { startX, startY, direction, step, maxSteps, progress } = pulse;
          if (step <= 0) continue;

          const { dx, dy } = getDirectionDelta(direction);
          const currentStep = Math.min(step, maxSteps);
          const endX = startX + dx * currentStep * gridSize;
          const endY = startY + dy * currentStep * gridSize;

          // Opacité décroissante
          const alpha = 0.8 * (1 - progress);

          // Ligne principale
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 2 + 2 * (1 - progress);
          ctx.shadowColor = pulseColor;
          ctx.shadowBlur = 20 * (1 - progress);
          ctx.stroke();

          // Glow autour de la ligne
          const glowGradient = ctx.createLinearGradient(startX, startY, endX, endY);
          glowGradient.addColorStop(0, `rgba(37, 99, 235, ${alpha * 0.4})`);
          glowGradient.addColorStop(1, `rgba(37, 99, 235, 0)`);
          ctx.shadowBlur = 0;
          ctx.lineWidth = 8 * (1 - progress);
          ctx.strokeStyle = glowGradient;
          ctx.stroke();

          // Point lumineux en tête
          if (progress < 0.95) {
            const headX = startX + dx * currentStep * gridSize;
            const headY = startY + dy * currentStep * gridSize;
            ctx.shadowColor = pulseColor;
            ctx.shadowBlur = 30;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(headX, headY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // ── Points voyageurs ──
      if (enableDots) {
        const mouse = mouseTargetRef.current;
        for (const dot of dotsRef.current) {
          // Logique d'attraction/orbite inchangée
          if (mouse) {
            const dx = mouse.x - dot.x;
            const dy = mouse.y - dot.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ORBIT_RADIUS = 150;
            if (dist < attractRadius) {
              dot.attracted = true;
              if (dist > ORBIT_RADIUS) {
                chooseNewDirection(dot, cols, rows, mouse.x, mouse.y);
              } else {
                dot.orbitAngle += dot.orbitSpeed;
                dot.orbitX = mouse.x + Math.cos(dot.orbitAngle) * ORBIT_RADIUS;
                dot.orbitY = mouse.y + Math.sin(dot.orbitAngle) * ORBIT_RADIUS;
                chooseNewDirection(dot, cols, rows, dot.orbitX, dot.orbitY);
              }
            } else {
              if (dot.attracted) {
                dot.attracted = false;
                chooseNewDirection(dot, cols, rows);
              }
            }
          }

          // Déplacement
          const dx2 = dot.nextIntersectionX - dot.x;
          const dy2 = dot.nextIntersectionY - dot.y;
          const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (distance < 1) {
            dot.x = dot.nextIntersectionX;
            dot.y = dot.nextIntersectionY;
            if (dot.attracted && mouse) {
              const distToMouse = Math.sqrt(
                (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
              );
              if (distToMouse < 180) {
                chooseNewDirection(dot, cols, rows, dot.orbitX, dot.orbitY);
              } else {
                chooseNewDirection(dot, cols, rows, mouse.x, mouse.y);
              }
            } else {
              chooseNewDirection(dot, cols, rows);
            }
          } else {
            const step = dot.speed;
            dot.x += (dx2 / distance) * Math.min(step, distance);
            dot.y += (dy2 / distance) * Math.min(step, distance);
          }

          // Trace
          dot.trail.push({ x: dot.x, y: dot.y });
          if (dot.trail.length > trailLength) dot.trail.shift();

          const color = dot.color;

          // Dessin trace
          if (dot.trail.length > 1) {
            for (let i = 1; i < dot.trail.length; i++) {
              const alpha = (i / dot.trail.length) * 0.85;
              const width = (i / dot.trail.length) * 5 + 1;
              ctx.beginPath();
              ctx.moveTo(dot.trail[i - 1].x, dot.trail[i - 1].y);
              ctx.lineTo(dot.trail[i].x, dot.trail[i].y);
              const opacity = Math.floor(alpha * 180).toString(16).padStart(2, '0');
              ctx.strokeStyle = color + opacity;
              ctx.lineWidth = width;
              ctx.lineCap = 'round';
              ctx.stroke();
            }
          }

          // Glow
          const glowRadius = dot.attracted ? 90 : 70;
          const glowGradient = ctx.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, glowRadius
          );
          glowGradient.addColorStop(0, color + 'cc');
          glowGradient.addColorStop(0.3, color + '66');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Point
          ctx.shadowColor = color;
          ctx.shadowBlur = 35;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 20;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.beginPath();
          ctx.arc(dot.x - 1.5, dot.y - 1.5, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Cercle d'attraction ──
      const mouse = mouseTargetRef.current;
      if (mouse) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, attractRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(100, 180, 255, ${0.06 + pulse * 0.03})`
          : 'rgba(37, 99, 235, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(100, 180, 255, ${0.04 + pulse * 0.02})`
          : 'rgba(37, 99, 235, 0.03)';
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = isDark
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(0,0,0,0.03)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Scanline ──
      const scanlineOffset = (frameRef.current * 0.3) % 4;
      ctx.fillStyle = isDark
        ? 'rgba(0, 0, 0, 0.025)'
        : 'rgba(0, 0, 0, 0.015)';
      for (let y = scanlineOffset; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      // ── Vignette ──
      const vignetteGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      vignetteGradient.addColorStop(0, 'transparent');
      vignetteGradient.addColorStop(1, isDark
        ? 'rgba(0, 0, 0, 0.3)'
        : 'rgba(0, 0, 0, 0.04)'
      );
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark, gridSize, trailLength, attractRadius, speed, orbitRadiusMin, orbitRadiusMax, orbitSpeed, enablePulses, enableDots]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}