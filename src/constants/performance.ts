// Animation constants
export const ANIMATION_FRAME_RATE = 1000 / 60; // Target 60 FPS
export const ANIMATION_DELTA_MULTIPLIER = {
  SLOW: 0.1,
  MEDIUM: 0.15,
  FAST: 0.2,
};

// Performance measurement names
export const PERFORMANCE_MARKS = {
  FRAME_START: 'frameStart',
  FRAME_END: 'frameEnd',
  PARTICLES_START: 'generateParticles',
  PARTICLES_END: 'particlesGenerated',
};

export const PERFORMANCE_MEASURES = {
  FRAME_TIME: 'frameTime',
  PARTICLE_GENERATION: 'particleGeneration',
};

// Quality thresholds
export const QUALITY_THRESHOLDS = {
  LOW_FPS: 30,
  MEDIUM_FPS: 45,
  HIGH_FPS: 60,
  ULTRA_FPS: 144,
};

// Device capability thresholds
export const DEVICE_THRESHOLDS = {
  MIN_CORES: 4,
  MIN_MEMORY: 4,
  RECOMMENDED_CORES: 8,
  RECOMMENDED_MEMORY: 8,
};

// Particle system settings
export const PARTICLE_SETTINGS = {
  LOW: {
    COUNT: 2000,
    SIZE: 0.003,
    RADIUS: 1.2,
  },
  MEDIUM: {
    COUNT: 3500,
    SIZE: 0.0025,
    RADIUS: 1.2,
  },
  HIGH: {
    COUNT: 5000,
    SIZE: 0.002,
    RADIUS: 1.2,
  },
  ULTRA: {
    COUNT: 7500,
    SIZE: 0.0015,
    RADIUS: 1.2,
  },
};

// Animation timing constants
export const ANIMATION_TIMING = {
  FADE_IN: 0.8,
  FADE_OUT: 0.5,
  STAGGER: 0.2,
  BOUNCE: 3,
};

// Responsive breakpoints (in pixels)
export const BREAKPOINTS = {
  XS: 375,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
  XXXL: 1920,
  ULTRAWIDE: 2560,
}; 