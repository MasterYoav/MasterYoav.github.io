'use client';

import { motion } from 'framer-motion';
import RippleGrid from '@/components/backgrounds/RippleGrid';
import OrbButton from '@/components/ui/OrbButton';

/**
 * Hero Section Component
 * 
 * This component displays the main hero section with:
 * - RippleGrid animated background
 * - Animated text elements
 * - OrbButton for call-to-action
 * 
 * @component
 * @returns {JSX.Element} The Hero section
 */
export default function Hero() {
  return (
    <section id="hero" className="h-screen relative overflow-hidden">
      {/* Ripple Grid Background */}
      <RippleGrid />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.h1
              className="text-4xl sm:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm <span className="text-orange-300">Yoav Peretz</span>
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Full Stack Developer & Creative Coder
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pointer-events-auto"
            >
              <OrbButton href="#about">
                Explore My Work
              </OrbButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
} 