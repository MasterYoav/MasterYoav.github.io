'use client';

import { useEffect, useRef } from 'react';

/**
 * RippleGrid Background Component
 * 
 * Creates an animated grid background with ripple effects.
 * Uses Canvas API for smooth animations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Animated ripple grid background
 */
export default function RippleGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid configuration
    const gridSize = 50;
    const lineWidth = 0.5;
    const ripples: Ripple[] = [];
    let animationId: number;

    /**
     * Ripple class for creating ripple effects
     */
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
        this.maxRadius = 200;
        this.speed = 2;
        this.opacity = 0.5;
      }

      /**
       * Update ripple animation
       */
      update() {
        this.radius += this.speed;
        this.opacity = (1 - this.radius / this.maxRadius) * 0.5;
        return this.radius < this.maxRadius;
      }

      /**
       * Draw ripple effect
       */
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`; // Purple color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    /**
     * Draw grid lines
     */
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = lineWidth;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    /**
     * Animation loop
     */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      drawGrid();

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        if (!ripple.update()) {
          ripples.splice(i, 1);
        } else {
          ripple.draw(ctx);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    /**
     * Create ripples periodically
     */
    const createRipple = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ripples.push(new Ripple(x, y));
    };

    // Start creating ripples
    const rippleInterval = setInterval(createRipple, 2000);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(rippleInterval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ background: 'linear-gradient(to bottom right, #0f0f23, #1a1a2e)' }}
    />
  );
}
