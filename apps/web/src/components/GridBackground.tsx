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
  // Nouveaux attributs pour l'interaction souris
  attracted: boolean;
  attractTargetX: number;
  attractTargetY: number;
}

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  dotCount?: number;
  trailLength?: number;
  speed?: number;
  attractRadius?: number; // Rayon dans lequel les points se regroupent
}

export default function GridBackground({
  className = '',
  gridSize = 50,
  dotCount = 4,
  trailLength = 25,
  speed = 1.5,
  attractRadius = 300, // Zone d'attraction autour du curseur
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const mouseTargetRef = useRef<{ x: number; y: number } | null>(null);

  // Palette de couleurs FIXE
  const DOT_COLORS = [
    '#2563EB', // bleu roi
    '#7C3AED', // violet
    '#059669', // émeraude
    '#DC2626', // rouge
    '#D97706', // orange
    '#0891B2', // cyan
  ];

  // Détecter le thème (SANS réinitialiser les points)
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

  // Suivre la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      mouseTargetRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      setMousePos(null);
      mouseTargetRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Initialisation des points (une seule fois)
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
        
        let nextX = x;
        let nextY = y;
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
          attractTargetX: x,
          attractTargetY: y,
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

  }, [dotCount, gridSize, speed]);

  // Setup du canvas (taille)
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

  // Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fonction pour choisir une nouvelle direction
    const chooseNewDirection = (dot: Dot, cols: number, rows: number, targetX?: number, targetY?: number) => {
      const currentCol = Math.round((dot.x - gridSize / 2) / gridSize);
      const currentRow = Math.round((dot.y - gridSize / 2) / gridSize);
      
      // Si on a une cible (attraction), on oriente le point vers la cible
      if (targetX !== undefined && targetY !== undefined) {
        const dx = targetX - dot.x;
        const dy = targetY - dot.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        
        // Choisir la direction qui rapproche le plus de la cible
        if (absDx > absDy) {
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
        // Mouvement aléatoire normal
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

      // --- EFFACER LE CANVAS ---
      ctx.clearRect(0, 0, width, height);
      
      // Fond
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      if (isDark) {
        bgGradient.addColorStop(0, '#0a0e1a');
        bgGradient.addColorStop(1, '#050810');
      } else {
        bgGradient.addColorStop(0, '#f0f4ff');
        bgGradient.addColorStop(1, '#e8ecf5');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // --- 1. DESSINER LA GRILLE ---
      const gridColor = isDark ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.12)';
      const gridColorStrong = isDark ? 'rgba(37, 99, 235, 0.35)' : 'rgba(37, 99, 235, 0.2)';
      ctx.lineWidth = 1;

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

      // --- 2. GESTION DE L'ATTRACTION SOURIS ---
      const mouse = mouseTargetRef.current;
      
      for (const dot of dotsRef.current) {
        // Vérifier si le point est dans la zone d'attraction
        if (mouse) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < attractRadius) {
            // Le point est dans la zone → il est attiré
            dot.attracted = true;
            dot.attractTargetX = mouse.x;
            dot.attractTargetY = mouse.y;
          } else if (dot.attracted) {
            // Le point a quitté la zone, on le libère
            dot.attracted = false;
            // Choisir une nouvelle direction aléatoire
            chooseNewDirection(dot, cols, rows);
          }
        } else {
          // Pas de souris → mouvement normal
          if (dot.attracted) {
            dot.attracted = false;
            chooseNewDirection(dot, cols, rows);
          }
        }

        // Si le point est attiré, on le redirige vers la souris
        if (dot.attracted && mouse) {
          // Vérifier si on est arrivé à la cible d'attraction
          const dx = dot.attractTargetX - dot.x;
          const dy = dot.attractTargetY - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 20) {
            // Proche de la souris → mouvement aléatoire mais dans la zone
            chooseNewDirection(dot, cols, rows);
          } else {
            // Se diriger vers la souris
            chooseNewDirection(dot, cols, rows, mouse.x, mouse.y);
          }
        }

        // --- DÉPLACEMENT VERS LA PROCHAINE INTERSECTION ---
        const dx = dot.nextIntersectionX - dot.x;
        const dy = dot.nextIntersectionY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
          dot.x = dot.nextIntersectionX;
          dot.y = dot.nextIntersectionY;
          
          // Si attiré, on recalcule la direction vers la souris
          if (dot.attracted && mouse) {
            chooseNewDirection(dot, cols, rows, mouse.x, mouse.y);
          } else {
            chooseNewDirection(dot, cols, rows);
          }
        } else {
          const step = dot.speed;
          dot.x += (dx / distance) * Math.min(step, distance);
          dot.y += (dy / distance) * Math.min(step, distance);
        }

        // --- TRACE ---
        dot.trail.push({ x: dot.x, y: dot.y });
        if (dot.trail.length > trailLength) {
          dot.trail.shift();
        }

        const color = dot.color;

        // --- DESSINER LA TRACE ---
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

        // --- GLOW ---
        const glowGradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, 70
        );
        glowGradient.addColorStop(0, color + 'cc');
        glowGradient.addColorStop(0.3, color + '66');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 70, 0, Math.PI * 2);
        ctx.fill();

        // --- POINT ---
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

      // --- 3. EFFET VISUEL DE LA ZONE D'ATTRACTION (optionnel) ---
      if (mouse) {
        // Cercle discret autour de la souris
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, attractRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(37, 99, 235, 0.08)' : 'rgba(37, 99, 235, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Petit point à la position de la souris
        ctx.fillStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 4. SCANLINE ---
      const scanlineOffset = (frameRef.current * 0.3) % 4;
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.025)' : 'rgba(0, 0, 0, 0.015)';
      for (let y = scanlineOffset; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      // --- 5. VIGNETTE ---
      const vignetteGradient = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.25,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      vignetteGradient.addColorStop(0, 'transparent');
      vignetteGradient.addColorStop(1, isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.04)');
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
  }, [isDark, gridSize, trailLength, attractRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}