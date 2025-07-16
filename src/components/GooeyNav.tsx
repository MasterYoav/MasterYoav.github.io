'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function GooeyNav() {
  const [isOpen, setIsOpen] = useState(false);

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
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative">
          {/* Menu Items */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                style={{ filter: 'url(#gooey)' }}
              >
                <div className="flex flex-col items-center space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ scale: 0, y: 20 }}
                      animate={{ 
                        scale: 1, 
                        y: 0,
                        transition: {
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 400,
                          damping: 15
                        }
                      }}
                      exit={{ 
                        scale: 0, 
                        y: 20,
                        transition: {
                          delay: (navItems.length - index - 1) * 0.05
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3 font-medium shadow-lg transition-colors duration-200 backdrop-blur-md bg-opacity-90"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-purple-500/50 transition-shadow duration-300"
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
        </div>
      </nav>
    </>
  );
}
