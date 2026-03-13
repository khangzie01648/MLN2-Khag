'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';

export default function QuantumParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const nebulaRef = useRef<THREE.Mesh>(null);

    const particleGeometry = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            const radius = 30 + Math.random() * 10;

            positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            colors[i * 3] = 0.3; // R
            colors[i * 3 + 1] = 0.4; // G
            colors[i * 3 + 2] = 1.0; // B
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.005;
            pointsRef.current.rotation.x += 0.003;
        }
        if (nebulaRef.current) {
            nebulaRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
        }
    });

    return (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
                {/* Core Nebula Glow */}
                <mesh ref={nebulaRef}>
                    <sphereGeometry args={[20, 32, 32]} />
                    <MeshDistortMaterial
                        color="#4466ff"
                        emissive="#4466ff"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.3}
                        distort={0.8}
                        speed={2}
                    />
                </mesh>

                <points ref={pointsRef} geometry={particleGeometry}>
                    <pointsMaterial
                        size={0.8}
                        vertexColors
                        transparent
                        opacity={0.8}
                        blending={THREE.AdditiveBlending}
                    />
                </points>

                <Sparkles count={50} scale={60} size={2} color="#ffffff" speed={0.4} />
            </group>
        </Float>
    );
}
