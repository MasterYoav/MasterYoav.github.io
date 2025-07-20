'use client';

import { useEffect, useRef } from 'react';
import { useWindowUtils } from '@/hooks/useWindowUtils';

interface SilkProps {
  className?: string;
  quality?: 'low' | 'medium' | 'high';
}

export default function SilkOptimized({ 
  className = '',
  quality = 'medium' 
}: SilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { isClient } = useWindowUtils();

  // Quality settings
  const qualitySettings = {
    low: { layers: 2, pointsPerLayer: 25, fps: 30 },
    medium: { layers: 3, pointsPerLayer: 40, fps: 45 },
    high: { layers: 4, pointsPerLayer: 60, fps: 60 }
  };

  const settings = qualitySettings[quality];
  const frameInterval = 1000 / settings.fps;
  const lastFrameTime = useRef<number>(0);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    });
    if (!ctx) return;

    // Canvas setup
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Debounced resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    let isPaused = false;

    // Pre-calculate wave points for better performance
    const waveData = Array(settings.layers).fill(null).map(() => ({
      points: new Float32Array(settings.pointsPerLayer * 2),
      offset: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      amplitude: 50 + Math.random() * 50
    }));

    const drawSilk = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(26, 26, 62, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each layer
      waveData.forEach((wave, layerIndex) => {
        const { points, offset, speed, amplitude } = wave;
        const hue = (time * 20 + layerIndex * 60) % 360;
        
        ctx.beginPath();
        
        // Calculate wave points
        const pointSpacing = canvas.width / (settings.pointsPerLayer - 1);
        for (let i = 0; i < settings.pointsPerLayer; i++) {
          const x = i * pointSpacing;
          const y = canvas.height / 2 + 
                    Math.sin(x * 0.01 + time * speed + offset) * amplitude +
                    Math.sin(x * 0.02 + time * speed * 0.5) * amplitude * 0.5;
          
          points[i * 2] = x;
          points[i * 2 + 1] = y;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Simple gradient fill
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsla(${hue}, 60%, 50%, 0.3)`);
        gradient.addColorStop(1, `hsla(${(hue + 60) % 360}, 60%, 50%, 0.1)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    const animate = (currentTime: number) => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastFrameTime.current;

      if (deltaTime >= frameInterval) {
        time += 0.01;
        drawSilk();
        lastFrameTime.current = currentTime - (deltaTime % frameInterval);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Visibility handling
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, settings, frameInterval]);

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
