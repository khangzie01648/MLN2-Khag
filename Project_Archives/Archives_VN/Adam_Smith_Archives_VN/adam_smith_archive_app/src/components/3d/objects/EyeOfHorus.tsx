'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export default function EyeOfHorus() {
  const irisRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (irisRef.current) {
      (irisRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime;
    }
    if (groupRef.current) {
      // Look at mouse/cursor effect (simulated with sine for floating look)
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const irisShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      pupilSize: { value: 0.25 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float pupilSize;
      varying vec2 vUv;
      
      void main() {
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        
        if (dist < pupilSize + sin(time * 5.0) * 0.02) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        } else if (dist < 0.5) {
          float pattern = sin(atan(vUv.y - 0.5, vUv.x - 0.5) * 30.0 + time * 2.0) * 0.3 + 0.7;
          vec3 purple = vec3(0.5, 0.0, 1.0) * pattern;
          vec3 gold = vec3(1.0, 0.84, 0.0) * (1.0 - pattern);
          gl_FragColor = vec4(mix(purple, gold, 0.5), 1.0);
        } else {
          discard;
        }
      }
    `
  }), []);

  return (
    <Float speed={6} rotationIntensity={1} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Eyeball - Metallic Gold Shell */}
        <mesh>
          <sphereGeometry args={[14, 32, 32]} />
          <meshStandardMaterial
            color="#222222"
            roughness={0}
            metalness={1}
            emissive="#aa00ff"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Glowing Iris */}
        <mesh ref={irisRef} position={[0, 0, 12]}>
          <circleGeometry args={[8, 64]} />
          <shaderMaterial args={[irisShader]} />
        </mesh>

        {/* Eyelid Energy Ring */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[16, 0.5, 16, 100]} />
          <meshStandardMaterial color="#aa00ff" emissive="#aa00ff" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}
