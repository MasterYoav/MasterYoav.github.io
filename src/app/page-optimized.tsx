'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Static imports for critical components
import LoadingScreen from '@/components/LoadingScreen';

// Lazy load non-critical components
const DockNavOptimized = dynamic(() => import('@/components/DockNavOptimized'), {
  ssr: false,
  loading: () => null
});

const HeroOptimized = dynamic(() => import('@/components/sections/HeroOptimized'), {
  ssr: false,
  loading: () => <div className="h-screen bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e]" />
});

// Lazy load sections with intersection observer
const About = lazy(() => import('@/components/sections/About'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Contact = lazy(() => import('@/components/sections/Contact'));

// Loading placeholder for sections
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-white/50">Loading...</div>
  </div>
);

/**
 * Optimized Home Page Component
 */
export default function HomeOptimized() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false
  });

  useEffect(() => {
    // Faster initial load
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Set up intersection observer for lazy loading sections
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.id;
          setVisibleSections(prev => ({ ...prev, [section]: true }));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe section containers
    const sections = ['about', 'projects', 'skills', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <main className="relative min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DockNavOptimized />
            <HeroOptimized />
            
            {/* Lazy loaded sections */}
            <div id="about">
              {visibleSections.about ? (
                <Suspense fallback={<SectionLoader />}>
                  <About />
                </Suspense>
              ) : (
                <SectionLoader />
              )}
            </div>

            <div id="projects">
              {visibleSections.projects ? (
                <Suspense fallback={<SectionLoader />}>
                  <Projects />
                </Suspense>
              ) : (
                <SectionLoader />
              )}
            </div>

            <div id="skills">
              {visibleSections.skills ? (
                <Suspense fallback={<SectionLoader />}>
                  <Skills />
                </Suspense>
              ) : (
                <SectionLoader />
              )}
            </div>

            <div id="contact">
              {visibleSections.contact ? (
                <Suspense fallback={<SectionLoader />}>
                  <Contact />
                </Suspense>
              ) : (
                <SectionLoader />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
