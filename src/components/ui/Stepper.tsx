'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

/**
 * Step interface for stepper configuration
 */
interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/**
 * Stepper Component Props
 */
interface StepperProps {
  steps: Step[];
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (index: number) => void;
}

/**
 * Stepper Component
 * 
 * A process flow stepper component for showing progress through steps.
 * Features:
 * - Animated step transitions
 * - Completed, current, and upcoming step states
 * - Horizontal or vertical orientation
 * - Interactive step navigation
 * 
 * @component
 * @param {StepperProps} props - Component props
 * @returns {JSX.Element} Stepper component
 */
export default function Stepper({ 
  steps, 
  currentStep = 0, 
  orientation = 'vertical',
  onStepClick 
}: StepperProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  /**
   * Get step status (completed, current, upcoming)
   */
  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  /**
   * Get step colors based on status
   */
  const getStepColors = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-gradient-to-r from-purple-600 to-purple-700',
          text: 'text-white',
          line: 'bg-purple-600',
        };
      case 'current':
        return {
          bg: 'bg-gradient-to-r from-orange-500 to-pink-500',
          text: 'text-white',
          line: 'bg-gradient-to-r from-purple-600 to-orange-500',
        };
      default:
        return {
          bg: 'bg-gray-700',
          text: 'text-gray-400',
          line: 'bg-gray-700',
        };
    }
  };

  const containerClass = orientation === 'horizontal' 
    ? 'flex items-center justify-between w-full' 
    : 'flex flex-col space-y-8';

  return (
    <div className={containerClass}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const colors = getStepColors(status);
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={`${
              orientation === 'horizontal' 
                ? 'flex items-center flex-1' 
                : 'flex items-start'
            } ${isLast ? '' : orientation === 'horizontal' ? 'pr-4' : ''}`}
          >
            {/* Step indicator and content */}
            <div 
              className={`flex ${
                orientation === 'horizontal' ? 'flex-col items-center' : 'items-start'
              }`}
            >
              {/* Step circle */}
              <motion.button
                onClick={() => onStepClick?.(index)}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} shadow-lg transition-all duration-300 ${
                  onStepClick ? 'cursor-pointer' : 'cursor-default'
                }`}
                whileHover={onStepClick ? { scale: 1.1 } : {}}
                whileTap={onStepClick ? { scale: 0.95 } : {}}
              >
                {status === 'completed' ? (
                  <CheckIcon className="w-6 h-6 text-white" />
                ) : (
                  <span className={`text-lg font-bold ${colors.text}`}>
                    {index + 1}
                  </span>
                )}

                {/* Pulse animation for current step */}
                {status === 'current' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-orange-500/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>

              {/* Step content */}
              <div className={`${
                orientation === 'horizontal' 
                  ? 'mt-4 text-center' 
                  : 'ml-6 flex-1'
              }`}>
                <h3 className={`font-semibold text-lg ${
                  status === 'upcoming' ? 'text-gray-400' : 'text-white'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  status === 'upcoming' ? 'text-gray-500' : 'text-gray-300'
                } ${orientation === 'horizontal' ? 'max-w-[150px]' : ''}`}>
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className={`${
                orientation === 'horizontal' 
                  ? 'flex-1 h-0.5 mx-4 self-center' 
                  : 'w-0.5 h-16 ml-6 mt-4'
              } ${colors.line} transition-all duration-300`}>
                {status === 'current' && orientation === 'horizontal' && (
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-transparent"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
