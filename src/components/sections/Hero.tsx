'use client';

import { motion } from 'framer-motion';
import OrbButton from '@/components/ui/OrbButton';
import SilkCard from '@/components/SilkCard';

/**
 * Hero Section Component
 * 
 * This component displays the main hero section with:
 * - Animated hero section
 * - Animated text elements
 * - OrbButton for call-to-action
 * 
 * @component
 * @returns {JSX.Element} The Hero section
 */
export default function Hero() {
  return (
    <section id="hero" className="h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SilkCard className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center py-12"
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hi, I'm <span className="text-purple-400">Yoav Peretz</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-700 dark:text-white/80 mb-8"
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
          >
            <OrbButton href="#about">
              Explore My Work
            </OrbButton>
          </motion.div>
        </motion.div>
      </SilkCard>

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
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
} 