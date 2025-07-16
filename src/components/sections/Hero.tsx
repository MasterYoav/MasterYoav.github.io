'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroScene from '../3d/HeroScene';

export default function Hero() {
  return (
    <section id="hero" className="h-screen relative">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <HeroScene />
          <OrbitControls enableZoom={false} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src="/logo.png"
                alt="YP Logo"
                width={120}
                height={120}
                className="mx-auto"
              />
            </motion.div>
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
            >
              <a
                href="#about"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 pointer-events-auto shadow-lg"
              >
                Explore My Work
              </a>
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