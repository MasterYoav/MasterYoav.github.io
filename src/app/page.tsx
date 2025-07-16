'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import DockNav from '@/components/DockNav';
import LoadingScreen from '@/components/LoadingScreen';

/**
 * Home Page Component
 * 
 * The main landing page of the portfolio.
 * Features:
 * - Loading screen animation
 * - Dock-style navigation with magnification effect
 * - Multiple sections (Hero, About, Projects, Skills, Contact)
 * - Smooth page transitions
 * 
 * @component
 * @returns {JSX.Element} The home page
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effect to handle initial loading state
   * Simulates asset loading time with a 2-second delay
   */
  useEffect(() => {
    // In a real app, this would wait for actual assets to load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DockNav />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
