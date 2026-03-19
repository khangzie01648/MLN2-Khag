'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Float, Sparkles, Instances, Instance } from '@react-three/drei';

export default function SacredFlame() {
    const flameRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (flameRef.current) {
            (flameRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime;
        }
        if (glowRef.current) {
            glowRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
        }
    });

    const flameShader = useMemo(() => ({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
      varying vec2 vUv;
      uniform float time;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float flicker = sin(time * 10.0) * 0.05 + sin(time * 3.5) * 0.02;
        pos.x += sin(pos.y * 0.5 - time * 2.0) * (pos.y * 0.1) + flicker;
        pos.z += cos(pos.y * 0.5 - time * 2.0) * (pos.y * 0.1) + flicker;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
        fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        float h = vUv.y;
        vec3 colorA = vec3(0.8, 0.3, 0.0); // Warm Amber
        vec3 colorB = vec3(1.0, 0.7, 0.2); // Soft Torch
        vec3 colorC = vec3(1.0, 0.9, 0.6); // Inner Light
        
        vec3 finalColor = h < 0.3 ? mix(colorA, colorB, h * 3.33) : mix(colorB, colorC, (h-0.3)*1.4);
        float alpha = pow(1.0 - h, 1.5) * 0.8;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
    }), []);

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group>
                {/* Candle/Torch core */}
                <mesh ref={flameRef} position={[0, -10, 0]}>
                    <coneGeometry args={[6, 35, 32, 10, true]} />
                    <shaderMaterial args={[flameShader]} transparent side={THREE.DoubleSide} opacity={0.6} />
                </mesh>

                {/* Warm Inner Glow */}
                <mesh ref={glowRef} position={[0, -10, 0]}>
                    <sphereGeometry args={[4, 16, 16]} />
                    <meshBasicMaterial color="#ffaa44" transparent opacity={0.3} />
                </mesh>

                <pointLight intensity={3} distance={60} color="#ff9944" />
            </group>
        </Float>
    );
}
