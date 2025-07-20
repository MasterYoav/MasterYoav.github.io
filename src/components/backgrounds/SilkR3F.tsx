'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Silk shader material
 */
const SilkMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Shader code
  const vertexShader = `
    uniform float time;
    uniform float amplitude;
    varying vec2 vUv;
    varying float vZ;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Create flowing waves
      float wave1 = sin(pos.x * 3.0 + time * 1.5) * amplitude;
      float wave2 = sin(pos.x * 2.0 - time * 1.0) * amplitude * 0.5;
      float wave3 = cos(pos.y * 4.0 + time * 2.0) * amplitude * 0.3;
      
      pos.z += wave1 + wave2 + wave3;
      vZ = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    varying float vZ;
    
    void main() {
      // Create silk-like gradient
      float mixFactor1 = sin(vUv.x * 3.14159 + time * 0.5) * 0.5 + 0.5;
      float mixFactor2 = cos(vUv.y * 3.14159 * 2.0 - time * 0.3) * 0.5 + 0.5;
      
      // Height-based coloring for depth
      float heightFactor = (vZ + 0.5) * 0.5;
      
      // Mix colors for silk effect
      vec3 color = mix(color1, color2, mixFactor1);
      color = mix(color, color3, mixFactor2 * heightFactor);
      
      // Add shimmer
      float shimmer = sin(vUv.x * 50.0 + time * 10.0) * 0.1 + 0.9;
      color *= shimmer;
      
      // Add subtle specular highlight
      float highlight = pow(max(0.0, sin(vUv.x * 3.14159)), 2.0) * 0.3;
      color += vec3(highlight);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      amplitude: { value: 0.5 },
      color1: { value: new THREE.Color('#8B5CF6') }, // Purple
      color2: { value: new THREE.Color('#F97316') }, // Orange
      color3: { value: new THREE.Color('#EC4899') }, // Pink
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-0.3, 0, 0]} position={[0, 0, -2]}>
      <planeGeometry args={[20, 10, 128, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={false}
      />
    </mesh>
  );
};

/**
 * React Three Fiber Silk Background Component
 * 
 * Creates a flowing, silk-like 3D background using shaders.
 * Inspired by the React Bits Silk component.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} 3D Silk background
 */
export default function SilkR3F({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a3e)' }}
      >
        <ambientLight intensity={0.5} />
        <SilkMaterial />
      </Canvas>
    </div>
  );
}
