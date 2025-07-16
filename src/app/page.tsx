'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sections will be imported here
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import GooeyNav from '@/components/GooeyNav';
import LoadingScreen from '@/components/LoadingScreen';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <GooeyNav />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
