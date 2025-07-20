'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useWindowUtils } from '@/hooks/useWindowUtils';

interface RippleGridProps {
  className?: string;
  quality?: 'low' | 'medium' | 'high';
}

export default function RippleGridOptimized({ 
  className = '',
  quality = 'medium' 
}: RippleGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const { isClient } = useWindowUtils();

  // Quality settings
  const qualitySettings = {
    low: { gridSize: 80, maxRipples: 3, fps: 30 },
    medium: { gridSize: 50, maxRipples: 5, fps: 45 },
    high: { gridSize: 30, maxRipples: 8, fps: 60 }
  };

  const settings = qualitySettings[quality];
  const frameInterval = 1000 / settings.fps;

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', handleResize);

    // Ripple management
    const ripples: Ripple[] = [];
    let isPaused = false;

    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 150; // Smaller for better performance
        this.speed = 2;
        this.opacity = 0.3; // Lower opacity
      }

      update(deltaTime: number) {
        this.radius += this.speed * deltaTime * 60; // Normalize to 60fps
        this.opacity = (1 - this.radius / this.maxRadius) * 0.3;
        return this.radius < this.maxRadius;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Optimized grid drawing
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      // Draw all vertical lines in one path
      for (let x = 0; x <= canvas.width; x += settings.gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Draw all horizontal lines in one path
      for (let y = 0; y <= canvas.height; y += settings.gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
    };

    // Animation loop with frame limiting
    const animate = (currentTime: number) => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastFrameTime.current;

      // Only render if enough time has passed
      if (deltaTime >= frameInterval) {
        // Clear canvas
        ctx.fillStyle = 'rgba(15, 15, 35, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        drawGrid();

        // Update and draw ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];
          if (!ripple.update(deltaTime / 1000)) {
            ripples.splice(i, 1);
          } else {
            ripple.draw(ctx);
          }
        }

        lastFrameTime.current = currentTime - (deltaTime % frameInterval);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Create ripples less frequently
    const createRipple = () => {
      if (ripples.length < settings.maxRipples && !isPaused) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ripples.push(new Ripple(x, y));
      }
    };

    // Start creating ripples
    const rippleInterval = setInterval(createRipple, 3000);

    // Visibility handling
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Performance monitoring
    let performanceCheckInterval: NodeJS.Timeout;
    if (quality === 'high') {
      performanceCheckInterval = setInterval(() => {
        if (ripples.length > settings.maxRipples * 0.7) {
          // Reduce quality if struggling
          ripples.splice(0, Math.floor(ripples.length / 2));
        }
      }, 5000);
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(rippleInterval);
      clearInterval(performanceCheckInterval);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, settings, frameInterval, quality]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ 
        background: 'linear-gradient(to bottom right, #0f0f23, #1a1a2e)',
        willChange: 'transform'
      }}
    />
  );
}
