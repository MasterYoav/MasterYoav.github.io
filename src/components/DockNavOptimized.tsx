'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon, 
  FolderIcon, 
  WrenchScrewdriverIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', href: '#hero', Icon: HomeIcon },
  { name: 'About', href: '#about', Icon: UserIcon },
  { name: 'Projects', href: '#projects', Icon: FolderIcon },
  { name: 'Skills', href: '#skills', Icon: WrenchScrewdriverIcon },
  { name: 'Contact', href: '#contact', Icon: EnvelopeIcon },
];

export default function DockNavOptimized() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <nav className={`fixed bottom-4 left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-24'
    }`}>
      <div className="flex justify-center px-4">
        <motion.div 
          className="relative"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Static gradient background - no animation */}
          <div
            className="absolute inset-0 rounded-2xl opacity-90 bg-gradient-to-r from-purple-600/30 to-orange-600/30"
            style={{ filter: 'blur(20px)' }}
          />
          
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

const DockItem = memo(({ item, index }: { item: typeof navItems[0], index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(Infinity);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      className="relative flex flex-col items-center justify-center group"
      style={{ width }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-purple-600 to-orange-600"
        style={{
          width,
          height: width,
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
        
        <item.Icon 
          className="relative z-10 text-white"
          style={{
            width: '60%',
            height: '60%',
          }}
        />
      </motion.div>
      
      {/* Simple tooltip without animation */}
      {isHovered && (
        <div className="absolute -top-10 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg pointer-events-none whitespace-nowrap shadow-lg">
          {item.name}
        </div>
      )}
    </motion.a>
  );
});

DockItem.displayName = 'DockItem';

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  } as T;
}
