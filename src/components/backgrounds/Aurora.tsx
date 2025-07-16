'use client';

import { motion } from 'framer-motion';

/**
 * Aurora Background Component
 * 
 * Creates an animated aurora borealis effect using gradients and blur.
 * This component uses Framer Motion for smooth animations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Animated aurora background
 */
export default function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated aurora layer 1 */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(ellipse at top left, rgba(120, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(ellipse at top right, rgba(255, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(ellipse at bottom right, rgba(120, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(ellipse at bottom left, rgba(255, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(ellipse at top left, rgba(120, 119, 198, 0.3), transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      
      {/* Animated aurora layer 2 */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse at bottom left, rgba(0, 255, 255, 0.3), transparent 60%)',
            'radial-gradient(ellipse at top left, rgba(0, 255, 255, 0.3), transparent 60%)',
            'radial-gradient(ellipse at top right, rgba(0, 255, 255, 0.3), transparent 60%)',
            'radial-gradient(ellipse at bottom right, rgba(0, 255, 255, 0.3), transparent 60%)',
            'radial-gradient(ellipse at bottom left, rgba(0, 255, 255, 0.3), transparent 60%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      
      {/* Blur overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
