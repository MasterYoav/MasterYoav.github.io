import { useEffect, useRef, useState } from 'react';
import { useWindowUtils } from '@/hooks/useWindowUtils';
import { performanceConfig } from '@/config';

// FPS monitoring
export const useFPSMonitor = (callback: (fps: number) => void) => {
  const { isClient, performance } = useWindowUtils();
  const frame = useRef(0);
  const [lastTime, setLastTime] = useState(0);
  const lastFPS = useRef(0);

  useEffect(() => {
    if (!isClient || !performance) return;
    setLastTime(performance.now());

    const updateFPS = () => {
      const time = performance.now();
      frame.current++;

      if (time >= lastTime + 1000) {
        const fps = Math.round(
          (frame.current * 1000) / (time - lastTime)
        );
        lastFPS.current = fps;
        frame.current = 0;
        setLastTime(time);
        callback(fps);
      }

      requestAnimationFrame(updateFPS);
    };

    const animationFrame = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(animationFrame);
  }, [callback, isClient, performance, lastTime]);

  return lastFPS.current;
};

// Device capability detection
export const useDeviceCapabilities = () => {
  const { isClient, navigator } = useWindowUtils();
  const [capabilities, setCapabilities] = useState({
    highPerformance: false,
    cores: performanceConfig.device.minCores,
    memory: performanceConfig.device.minMemory,
    hasGPU: false,
  });

  useEffect(() => {
    if (!isClient || !navigator) return;

    const gpu = (navigator as any).gpu;
    const hardwareConcurrency = navigator.hardwareConcurrency || performanceConfig.device.minCores;
    const memory = (navigator as any).deviceMemory || performanceConfig.device.minMemory;

    setCapabilities({
      highPerformance:
        hardwareConcurrency >= performanceConfig.device.minCores &&
        memory >= performanceConfig.device.minMemory &&
        gpu !== undefined,
      cores: hardwareConcurrency,
      memory,
      hasGPU: gpu !== undefined,
    });
  }, [isClient, navigator]);

  return capabilities;
};

// Adaptive quality settings based on device capabilities and performance
export const useQualitySettings = (fps: number) => {
  const capabilities = useDeviceCapabilities();
  const [settings, setSettings] = useState(performanceConfig.quality.high);

  useEffect(() => {
    if (!capabilities.highPerformance || fps < performanceConfig.fps.low) {
      setSettings(performanceConfig.quality.low);
      return;
    }

    if (fps < performanceConfig.fps.medium) {
      setSettings(performanceConfig.quality.medium);
      return;
    }

    setSettings(performanceConfig.quality.high);
  }, [fps, capabilities.highPerformance]);

  return settings;
};

// Web Vitals reporting
export const reportWebVitals = (metric: any) => {
  // You can send the metric to your analytics service here
  console.log(metric);
};

// Performance marks and measures
export const usePerformanceMetrics = () => {
  const { isClient, performance } = useWindowUtils();

  return {
    mark: (name: string) => {
      if (isClient && performance) {
        performance.mark(name);
      }
    },
    measure: (name: string, startMark: string, endMark: string) => {
      if (isClient && performance) {
        try {
          performance.measure(name, startMark, endMark);
        } catch (err) {
          console.error('Error measuring performance:', err);
        }
      }
    },
    clearMarks: () => {
      if (isClient && performance) {
        performance.clearMarks();
      }
    },
    clearMeasures: () => {
      if (isClient && performance) {
        performance.clearMeasures();
      }
    },
  };
}; 