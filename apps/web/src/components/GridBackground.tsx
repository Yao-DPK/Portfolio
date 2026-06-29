// src/components/GridBackground.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

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
  // ✅ État d'attraction
  attracted: boolean;
  // ✅ Orbite
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  // ✅ Position orbitale calculée
  orbitX: number;
  orbitY: number;
}

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  dotCount?: number;
  trailLength?: number;
  speed?: number;
  attractRadius?: number;      // Rayon d'attraction
  orbitRadiusMin?: number;      // Rayon d'orbite min
  orbitRadiusMax?: number;      // Rayon d'orbite max
  orbitSpeed?: number;          // Vitesse orbitale (rad/frame)
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
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const mouseTargetRef = useRef<{ x: number; y: number } | null>(null);
  const pulseRef = useRef(0);

  const DOT_COLORS = [
    '#2563EB', // bleu roi
    '#7C3AED', // violet
    '#059669', // émeraude
    '#DC2626', // rouge
    '#D97706', // orange
    '#0891B2', // cyan
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseTargetRef.current = { x, y };
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

  // ─── Initialisation ─────────────────────────────────────
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

  // ─── Animation ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chooseNewDirection = (
      dot: Dot,
      cols: number,
      rows: number,
      targetX?: number,
      targetY?: number
    ) => {
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

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      frameRef.current++;

      // Pulsation
      pulseRef.current += 0.02;
      const pulse = Math.sin(pulseRef.current) * 0.5 + 0.5;

      // ── Effacer ──
      ctx.clearRect(0, 0, width, height);

      // ── Fond (amélioré dark mode) ──
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      if (isDark) {
        // ✅ Dark mode : fond plus lumineux
        bgGradient.addColorStop(0, '#0f1a2e');
        bgGradient.addColorStop(0.5, '#0a1525');
        bgGradient.addColorStop(1, '#050a14');
      } else {
        bgGradient.addColorStop(0, '#f0f4ff');
        bgGradient.addColorStop(1, '#e8ecf5');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // ── Effet pulsation sur le fond (en dark mode) ──
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

      // ── Grille (effet écran d'ordinateur) ──
      // Lignes principales plus épaisses et lumineuses en dark mode
      const gridColor = isDark
        ? `rgba(80, 160, 255, ${0.12 + pulse * 0.05})`
        : 'rgba(37, 99, 235, 0.10)';
      const gridColorStrong = isDark
        ? `rgba(100, 190, 255, ${0.35 + pulse * 0.1})`
        : 'rgba(37, 99, 235, 0.20)';

      // Sous-grille (effet écran)
      const subGridColor = isDark
        ? `rgba(60, 140, 255, ${0.06 + pulse * 0.03})`
        : 'rgba(37, 99, 235, 0.05)';

      // Lignes verticales principales
      ctx.lineWidth = isDark ? 1.2 : 1;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = x % (gridSize * 2) === 0 ? gridColorStrong : gridColor;
        ctx.stroke();
      }

      // Lignes horizontales principales
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = y % (gridSize * 2) === 0 ? gridColorStrong : gridColor;
        ctx.stroke();
      }

      // Sous-grille (lignes fines)
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

      // ── Effet de lueur sur la grille (dark mode) ──
      if (isDark) {
        const glowAlpha = 0.03 + pulse * 0.03;
        const glowGradient = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, Math.max(width, height) * 0.6
        );
        glowGradient.addColorStop(0, `rgba(100, 180, 255, ${glowAlpha})`);
        glowGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // ── Gestion des points ──
      const mouse = mouseTargetRef.current;

      for (const dot of dotsRef.current) {
        if (mouse) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Rayon d'orbite = distance fixe autour du curseur
          const ORBIT_RADIUS = 150;
          const ATTRACTION_RADIUS = attractRadius;

          if (dist < ATTRACTION_RADIUS) {
            dot.attracted = true;

            if (dist > ORBIT_RADIUS) {
              // ✅ PHASE ATTRACTION : se diriger vers le curseur
              chooseNewDirection(dot, cols, rows, mouse.x, mouse.y);
            } else {
              // ✅ PHASE ORBITE : tourner autour du curseur
              // Mettre à jour l'angle orbital
              dot.orbitAngle += dot.orbitSpeed;

              // Calculer la position orbitale (cercle parfait)
              dot.orbitX = mouse.x + Math.cos(dot.orbitAngle) * ORBIT_RADIUS;
              dot.orbitY = mouse.y + Math.sin(dot.orbitAngle) * ORBIT_RADIUS;

              // Se diriger vers la position orbitale
              chooseNewDirection(dot, cols, rows, dot.orbitX, dot.orbitY);
            }
          } else {
            if (dot.attracted) {
              dot.attracted = false;
              chooseNewDirection(dot, cols, rows);
            }
          }
        }


        // ── Déplacement ──
        const dx = dot.nextIntersectionX - dot.x;
        const dy = dot.nextIntersectionY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
          dot.x = dot.nextIntersectionX;
          dot.y = dot.nextIntersectionY;
          if (dot.attracted && mouse) {
            // Recalculer la direction après avoir atteint l'intersection
            const distToMouse = Math.sqrt(
              (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
            );
            if (distToMouse < 180) {
              // En orbite, continuer vers la position orbitale
              chooseNewDirection(dot, cols, rows, dot.orbitX, dot.orbitY);
            } else {
              chooseNewDirection(dot, cols, rows, mouse.x, mouse.y);
            }
          } else {
            chooseNewDirection(dot, cols, rows);
          }
        } else {
          const step = dot.speed;
          dot.x += (dx / distance) * Math.min(step, distance);
          dot.y += (dy / distance) * Math.min(step, distance);
        }

        // ── Trace ──
        dot.trail.push({ x: dot.x, y: dot.y });
        if (dot.trail.length > trailLength) dot.trail.shift();

        const color = dot.color;

        // ── Dessiner la trace ──
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

        // ── Glow ──
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

        // ── Point ──
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

      // ── Cercle d'attraction ──
      if (mouse) {
        // Cercle principal
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, attractRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(100, 180, 255, ${0.06 + pulse * 0.03})`
          : 'rgba(37, 99, 235, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cercle orbital (seuil)
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(100, 180, 255, ${0.04 + pulse * 0.02})`
          : 'rgba(37, 99, 235, 0.03)';
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Point central
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
  }, [isDark, gridSize, trailLength, attractRadius, speed, orbitRadiusMin, orbitRadiusMax, orbitSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}