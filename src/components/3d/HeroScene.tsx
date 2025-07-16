'use client';

import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useFPSMonitor, useQualitySettings, usePerformanceMetrics } from '@/utils/performance';
import { performanceConfig } from '@/config';
import {
  ANIMATION_DELTA_MULTIPLIER,
  PERFORMANCE_MARKS,
  PERFORMANCE_MEASURES,
  QUALITY_THRESHOLDS,
  PARTICLE_SETTINGS,
} from '@/constants/performance';
import type { Points as PointsType } from '@react-three/drei';
import { Euler, Object3D } from 'three';

export default function HeroScene() {
  const ref = useRef<PointsType>(null);
  const [fps, setFps] = useState(QUALITY_THRESHOLDS.HIGH_FPS);
  const qualitySettings = useQualitySettings(fps);
  const performanceMetrics = usePerformanceMetrics();

  // Monitor FPS
  const handleFPSUpdate = useCallback((newFps: number) => {
    setFps(newFps);
  }, []);

  useFPSMonitor(handleFPSUpdate);

  // Generate particles with current quality settings
  const sphere = useMemo(() => {
    performanceMetrics.mark(PERFORMANCE_MARKS.PARTICLES_START);
    const particles = random.inSphere(
      new Float32Array(qualitySettings.particleCount * 3),
      { radius: PARTICLE_SETTINGS.HIGH.RADIUS }
    ) as Float32Array;
    performanceMetrics.mark(PERFORMANCE_MARKS.PARTICLES_END);
    performanceMetrics.measure(
      PERFORMANCE_MEASURES.PARTICLE_GENERATION,
      PERFORMANCE_MARKS.PARTICLES_START,
      PERFORMANCE_MARKS.PARTICLES_END
    );
    return particles;
  }, [qualitySettings.particleCount, performanceMetrics]);

  // Optimized animation with performance tracking
  useFrame((state, delta) => {
    if (ref.current) {
      performanceMetrics.mark(PERFORMANCE_MARKS.FRAME_START);
      // Use delta time for smooth animation at any refresh rate
      const currentRotation = ref.current.rotation;
      currentRotation.x -= delta * ANIMATION_DELTA_MULTIPLIER.MEDIUM;
      currentRotation.y -= delta * ANIMATION_DELTA_MULTIPLIER.FAST;
      performanceMetrics.mark(PERFORMANCE_MARKS.FRAME_END);
      performanceMetrics.measure(
        PERFORMANCE_MEASURES.FRAME_TIME,
        PERFORMANCE_MARKS.FRAME_START,
        PERFORMANCE_MARKS.FRAME_END
      );
    }
  });

  // Cleanup performance metrics on unmount
  useEffect(() => {
    return () => {
      performanceMetrics.clearMarks();
      performanceMetrics.clearMeasures();
    };
  }, [performanceMetrics]);

  const groupRotation = useMemo(() => new Euler(0, 0, Math.PI / 4), []);

  return (
    <group rotation={groupRotation} {...({} as any)}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={qualitySettings.particleSize}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
} 