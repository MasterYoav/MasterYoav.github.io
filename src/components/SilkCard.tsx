'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/**
 * Silk shader material for the card background
 */
const SilkMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Subtle wave effect
      pos.z += sin(pos.x * 4.0 + time * 2.0) * 0.02;
      pos.z += sin(pos.y * 3.0 + time * 1.5) * 0.02;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    
    void main() {
      // Flowing gradient
      float flow1 = sin(vUv.x * 3.14159 + time * 0.5) * 0.5 + 0.5;
      float flow2 = cos(vUv.y * 3.14159 * 2.0 - time * 0.3) * 0.5 + 0.5;
      
      vec3 color = mix(color1, color2, flow1);
      color = mix(color, color3, flow2);
      
      // Silk sheen effect
      float sheen = pow(sin(vUv.x * 3.14159), 2.0) * 0.3;
      color += vec3(sheen);
      
      // Subtle shimmer
      float shimmer = sin((vUv.x + vUv.y) * 30.0 + time * 5.0) * 0.05 + 0.95;
      color *= shimmer;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      color1: { value: new THREE.Color('#1e293b') }, // Dark slate
      color2: { value: new THREE.Color('#312e81') }, // Dark purple
      color3: { value: new THREE.Color('#1e1b4b') }, // Dark indigo
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.5, 2.5, 1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

/**
 * Silk Card Component
 * 
 * A card with a silk-like animated background using React Three Fiber.
 * Perfect for highlighting important content with a luxurious effect.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in the card
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Silk card with content
 */
export default function SilkCard({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
    >
      {/* Silk background */}
      <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden">
        <Canvas 
          camera={{ position: [0, 0, 1], fov: 50, near: 0.1, far: 1000 }}
          style={{ width: '100%', height: '100%' }}
        >
          <SilkMaterial />
        </Canvas>
      </div>
      
      {/* Glass overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm -z-5" />
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        {children}
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
    </motion.div>
  );
}
