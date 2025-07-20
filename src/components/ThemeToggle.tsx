'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Theme Toggle Component
 * 
 * An animated sun/moon toggle button for switching between light and dark modes.
 * Features smooth transitions between sun and moon icons.
 * 
 * @component
 * @returns {JSX.Element} Theme toggle button
 */
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:scale-110 transition-transform"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="w-6 h-6 relative"
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Sun rays */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            scale: isDarkMode ? 0 : 1,
            opacity: isDarkMode ? 0 : 1 
          }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-0.5 h-2 bg-yellow-500 left-1/2 top-1/2 -translate-x-1/2 origin-bottom"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-14px)`
              }}
              animate={{
                height: isDarkMode ? 0 : 8,
              }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </motion.div>

        {/* Sun/Moon circle */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: isDarkMode ? '#94a3b8' : '#fbbf24',
            scale: isDarkMode ? 0.9 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Moon craters */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-slate-600 top-1 right-1"
            animate={{
              opacity: isDarkMode ? 1 : 0,
              scale: isDarkMode ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-slate-600 bottom-1 left-1.5"
            animate={{
              opacity: isDarkMode ? 1 : 0,
              scale: isDarkMode ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-slate-600 top-2 left-1"
            animate={{
              opacity: isDarkMode ? 1 : 0,
              scale: isDarkMode ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </motion.div>
      </motion.div>
    </button>
  );
}
