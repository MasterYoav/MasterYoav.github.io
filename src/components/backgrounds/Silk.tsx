'use client';

import { useEffect, useRef } from 'react';

/**
 * Silk Background Component
 * 
 * Creates a smooth, silk-like animated background using canvas.
 * Features flowing gradients that create a luxurious effect.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Animated silk background
 */
export default function Silk({ className = '' }: { className?: string }) {
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

    // Animation variables
    let time = 0;
    let animationId: number;

    /**
     * Create silk-like gradient
     */
    const createSilkGradient = (x: number, y: number, radius: number, offset: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      
      const hue1 = (time * 20 + offset) % 360;
      const hue2 = (time * 20 + offset + 60) % 360;
      
      gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.6)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 50%, 0.4)`);
      gradient.addColorStop(1, 'transparent');
      
      return gradient;
    };

    /**
     * Draw silk waves
     */
    const drawSilk = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create multiple flowing silk layers
      for (let i = 0; i < 3; i++) {
        const offsetX = Math.sin(time * 0.5 + i * 2) * 200;
        const offsetY = Math.cos(time * 0.3 + i * 1.5) * 150;
        
        // Wave parameters
        const waveHeight = 100 + Math.sin(time * 0.2 + i) * 50;
        const waveFrequency = 0.01 + i * 0.002;
        
        ctx.beginPath();
        
        // Draw flowing silk wave - reduce points for better performance
        for (let x = 0; x <= canvas.width; x += 20) {
          const y = canvas.height / 2 + 
                    Math.sin(x * waveFrequency + time + i * Math.PI / 3) * waveHeight +
                    offsetY;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Apply silk gradient
        const centerX = canvas.width / 2 + offsetX;
        const centerY = canvas.height / 2 + offsetY;
        const radius = Math.max(canvas.width, canvas.height);
        
        ctx.fillStyle = createSilkGradient(centerX, centerY, radius, i * 120);
        ctx.fill();
      }
    };

    /**
     * Animation loop
     */
    const animate = () => {
      time += 0.01;
      drawSilk();
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ 
        background: 'linear-gradient(to bottom, #1a1a3e, #2d1b69)',
      }}
    />
  );
}
