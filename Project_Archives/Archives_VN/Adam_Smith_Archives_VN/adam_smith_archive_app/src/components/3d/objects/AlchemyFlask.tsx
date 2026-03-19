'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';

export default function AlchemyFlask() {
  const liquidRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Points>(null);

  const flaskPoints = useMemo(() => {
    return [
      new THREE.Vector2(0, -15),
      new THREE.Vector2(14, -15),
      new THREE.Vector2(16, -10),
      new THREE.Vector2(16, 5),
      new THREE.Vector2(8, 20),
      new THREE.Vector2(8, 40),
      new THREE.Vector2(10, 42),
      new THREE.Vector2(0, 42)
    ];
  }, []);

  const liquidShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      colorA: { value: new THREE.Color("#4b0082") }, // Dark indigo
      colorB: { value: new THREE.Color("#8b4513") }  // Murky brown
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 colorA;
      uniform vec3 colorB;
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        float swirl = sin(vPosition.x * 0.2 + time) * cos(vPosition.y * 0.2 + time);
        vec3 color = mix(colorA, colorB, vUv.y + swirl * 0.3);
        gl_FragColor = vec4(color, 0.85);
      }
    `
  }), []);

  const bubbleParticles = useMemo(() => {
    const count = 30;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (liquidRef.current) {
      (liquidRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Hand-blown Glass Flask */}
        <mesh>
          <latheGeometry args={[flaskPoints, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.9}
            thickness={4}
            ior={1.3}
          />
        </mesh>

        {/* Murky Liquid Content */}
        <mesh ref={liquidRef} position={[0, -2, 0]} scale={0.92}>
          <latheGeometry args={[flaskPoints.slice(0, 5), 32]} />
          <shaderMaterial args={[liquidShader]} transparent side={THREE.DoubleSide} />
        </mesh>

        <Sparkles count={10} scale={30} size={1} color="#f4e4c1" speed={0.2} opacity={0.2} />
      </group>
    </Float>
  );
}
