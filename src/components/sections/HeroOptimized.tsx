'use client';

import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import OrbButton from '@/components/ui/OrbButton';
import { useDeviceCapabilities } from '@/utils/performance';

// Lazy load the background based on device capabilities
const RippleGridOptimized = lazy(() => import('@/components/backgrounds/RippleGridOptimized'));

export default function HeroOptimized() {
  const capabilities = useDeviceCapabilities();
  
  // Determine quality based on device capabilities
  const backgroundQuality = capabilities.highPerformance ? 'high' : 
                          capabilities.cores >= 4 ? 'medium' : 'low';

  return (
    <section id="hero" className="h-screen relative overflow-hidden">
      {/* Lazy loaded background */}
      <Suspense fallback={
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e]" />
      }>
        <RippleGridOptimized quality={backgroundQuality} />
      </Suspense>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-orange-300">Yoav Peretz</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 mb-8">
              Full Stack Developer & Creative Coder
            </p>
            <div className="pointer-events-auto">
              <OrbButton href="#about">
                Explore My Work
              </OrbButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simple scroll indicator without infinite animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: 3, // Limited repeats instead of infinite
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>
    </section>
  );
}
