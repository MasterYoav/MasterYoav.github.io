'use client';

import { motion } from 'framer-motion';

/**
 * Iridescence Background Component
 * 
 * Creates an animated iridescent effect with shifting colors.
 * Perfect for adding a premium, holographic feel to sections.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Animated iridescent background
 */
export default function Iridescence({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Base gradient - more visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30" />
      
      {/* Animated iridescent layers */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 0% 0%, rgba(120, 119, 198, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 100% 0%, rgba(255, 119, 198, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 100% 100%, rgba(120, 119, 198, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 0% 100%, rgba(255, 119, 198, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 0% 0%, rgba(120, 119, 198, 0.5), transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          filter: 'blur(40px)',
        }}
      />
      
      {/* Second layer with different timing */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 100% 100%, rgba(255, 182, 193, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 0% 100%, rgba(173, 216, 230, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 0% 0%, rgba(255, 218, 185, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 100% 0%, rgba(221, 160, 221, 0.5), transparent 50%)',
            'radial-gradient(ellipse at 100% 100%, rgba(255, 182, 193, 0.5), transparent 50%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          filter: 'blur(60px)',
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
