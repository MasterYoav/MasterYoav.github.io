'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation items configuration
 * Each item represents a section of the portfolio
 */
const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

/**
 * GooeyNav Component
 * 
 * A creative navigation component with a gooey/liquid effect.
 * Features:
 * - Toggle button in top-left that reveals navigation items
 * - Logo centered at the top
 * - Horizontal expansion of nav items with smooth animations
 * - Scroll-based background blur effect
 * 
 * @component
 * @returns {JSX.Element} The navigation component
 */
export default function GooeyNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /**
   * Effect to handle scroll events and update navigation background
   * Adds a backdrop blur when user scrolls past 50px
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SVG Filters for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Navigation Container */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/20 backdrop-blur-md' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Menu Button and Items */}
            <div className="relative" style={{ filter: 'url(#gooey)' }}>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-16 flex items-center space-x-0.5"
                  >
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ scale: 0, x: -50 }}
                        animate={{ 
                          scale: 1, 
                          x: 0,
                          transition: {
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 400,
                            damping: 15
                          }
                        }}
                        exit={{ 
                          scale: 0, 
                          x: -50,
                          transition: {
                            delay: (navItems.length - index - 1) * 0.05
                          }
                        }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3 font-medium shadow-lg transition-colors duration-200 backdrop-blur-md bg-opacity-90 whitespace-nowrap"
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300 z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </div>
              </motion.button>
            </div>

            {/* Logo */}
            <motion.a 
              href="#" 
              className="absolute left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="YP Logo" className="w-14 h-14" />
            </motion.a>

            {/* Placeholder for right side balance */}
            <div className="w-14 h-14" />
          </div>
        </div>

        {/* Background Blur */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
