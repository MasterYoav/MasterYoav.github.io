'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="h-16 w-16 border-4 border-t-white border-r-white/50 border-b-white/25 border-l-white/10 rounded-full animate-spin" />
        <p className="mt-4 text-white/80 font-light">Loading experience...</p>
      </motion.div>
    </motion.div>
  );
} 