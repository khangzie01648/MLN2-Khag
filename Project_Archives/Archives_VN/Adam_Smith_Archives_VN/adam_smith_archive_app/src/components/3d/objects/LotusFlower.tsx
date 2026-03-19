'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';

export default function LotusFlower() {
    const petalsRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (petalsRef.current) {
            const breath = Math.sin(state.clock.elapsedTime * 1.5) * 0.5 + 0.5;
            petalsRef.current.children.forEach((petal, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const openness = breath * 12;
                petal.position.x = Math.cos(angle) * (18 + openness);
                petal.position.z = Math.sin(angle) * (18 + openness);
                petal.rotation.x = -breath * 0.4;
                petal.rotation.z = Math.sin(state.clock.elapsedTime + i) * 0.1;
            });
        }
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
        }
    });

    const petals = [];
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        petals.push(
            <mesh
                key={i}
                position={[Math.cos(angle) * 18, 0, Math.sin(angle) * 18]}
                rotation={[0, angle, 0]}
            >
                <coneGeometry args={[4, 15, 4]} />
                <MeshDistortMaterial
                    color="#00ff88"
                    emissive="#00ff88"
                    emissiveIntensity={1.5}
                    distort={0.2}
                    speed={3}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        );
    }

    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
            <group>
                <group ref={petalsRef}>
                    {petals}
                </group>
                {/* Energy Core */}
                <mesh ref={coreRef}>
                    <sphereGeometry args={[6, 32, 32]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={2}
                    />
                </mesh>
                <Sparkles count={40} scale={40} size={2} color="#00ff88" speed={0.5} />
                <pointLight intensity={3} color="#00ff88" distance={60} />
            </group>
        </Float>
    );
}
