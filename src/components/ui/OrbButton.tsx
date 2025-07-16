'use client';

import { motion } from 'framer-motion';

/**
 * OrbButton Component Props
 */
interface OrbButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * OrbButton Component
 * 
 * A button with an animated orb/glow effect.
 * Features:
 * - Animated gradient background
 * - Glow effect on hover
 * - Smooth transitions
 * - Can be used as a link or button
 * 
 * @component
 * @param {OrbButtonProps} props - Component props
 * @returns {JSX.Element} Animated orb button
 */
export default function OrbButton({ children, href, onClick, className = '' }: OrbButtonProps) {
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative inline-block group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated orb background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-orange-600 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-purple-600"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: 'blur(40px)',
            opacity: 0.5,
          }}
        />
      </div>
      
      {/* Button content */}
      <div className="relative px-8 py-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-300">
        <span className="relative z-10 text-white font-semibold">
          {children}
        </span>
        
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-orange-600/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Component>
  );
}
