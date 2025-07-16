'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon, 
  FolderIcon, 
  WrenchScrewdriverIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

/**
 * Navigation items configuration with proper icons
 */
const navItems = [
  { name: 'Home', href: '#hero', Icon: HomeIcon },
  { name: 'About', href: '#about', Icon: UserIcon },
  { name: 'Projects', href: '#projects', Icon: FolderIcon },
  { name: 'Skills', href: '#skills', Icon: WrenchScrewdriverIcon },
  { name: 'Contact', href: '#contact', Icon: EnvelopeIcon },
];

/**
 * DockNav Component
 * 
 * A macOS-style dock navigation positioned at the bottom with:
 * - Smooth spring animations
 * - Magnification effect on hover
 * - Animated glass-morphism background
 * - Classy icon design
 * 
 * @component
 * @returns {JSX.Element} Dock navigation
 */
export default function DockNav() {
  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50">
      <div className="flex justify-center px-4">
        {/* Dock container with animated background */}
        <motion.div 
          className="relative"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-90"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
                'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
                'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
              ],
            }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
            style={{
              filter: 'blur(20px)',
            }}
          />
          
          {/* Glass morphism layer */}
          <div className="relative flex items-end gap-2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            {navItems.map((item, index) => (
              <DockItem key={item.name} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

/**
 * Individual dock item with magnification effect
 * @param {Object} props - Component props
 * @param {typeof navItems[0]} props.item - Navigation item
 * @param {number} props.index - Item index
 */
function DockItem({ item, index }: { item: typeof navItems[0], index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(Infinity);

  /**
   * Calculate distance-based scale for magnification effect
   */
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 65, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      className="relative flex flex-col items-center justify-center group"
      style={{ width }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Icon container with animated background */}
      <motion.div
        className="relative flex items-center justify-center rounded-xl shadow-lg overflow-hidden"
        style={{
          width,
          height: width,
        }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, #9333ea, #ec4899)',
              'linear-gradient(45deg, #ec4899, #3b82f6)',
              'linear-gradient(45deg, #3b82f6, #9333ea)',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
        
        {/* Icon */}
        <item.Icon 
          className="relative z-10 text-white"
          style={{
            width: '60%',
            height: '60%',
          }}
        />
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-lg"
        initial={{ scale: 0, y: 10 }}
        whileHover={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {item.name}
      </motion.div>
    </motion.a>
  );
}
