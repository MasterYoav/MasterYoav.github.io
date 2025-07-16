'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Interface for PixelCard component props
 */
interface PixelCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  onClick?: () => void;
}

/**
 * PixelCard Component
 * 
 * A card component with a pixelated hover effect for displaying projects.
 * Features:
 * - Pixelated transition on hover
 * - Smooth scale animations
 * - Tag display
 * - Links to demo and GitHub
 * 
 * @component
 * @param {PixelCardProps} props - Component props
 * @returns {JSX.Element} Animated project card
 */
export default function PixelCard({ 
  title, 
  description, 
  image, 
  tags, 
  demoUrl, 
  githubUrl,
  onClick 
}: PixelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Pixel effect styles
   * Creates a pixelated effect using CSS filters
   */
  const pixelStyle = {
    filter: isHovered ? 'contrast(1.1) saturate(1.2)' : 'none',
    imageRendering: isHovered ? 'pixelated' : 'auto',
    transition: 'all 0.3s ease',
  } as React.CSSProperties;

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-900 shadow-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image with pixel effect */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={pixelStyle}
        />
        
        {/* Pixelated overlay effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Pixel grid overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)
              `,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/30 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-4">
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
