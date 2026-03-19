'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function ScalesOfJustice({ isHovered = false }) {
    const groupRef = useRef<THREE.Group>(null);
    const balanceRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.15;
        }
        if (balanceRef.current) {
            // Swaying motion for the scales
            balanceRef.current.rotation.z = Math.sin(t * 1.5) * 0.1 * (isHovered ? 2 : 1);
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
                {/* Central Pillar */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.4, 5, 16]} />
                    <meshStandardMaterial color="#b87333" metalness={0.6} roughness={0.3} emissive="#451a03" />
                </mesh>
                <mesh position={[0, -2.5, 0]}>
                    <cylinderGeometry args={[1, 1.2, 0.5, 16]} />
                    <meshStandardMaterial color="#b87333" metalness={0.6} roughness={0.3} />
                </mesh>

                {/* The Balance Beam */}
                <group ref={balanceRef} position={[0, 2, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.1, 0.1, 6, 16]} />
                        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
                    </mesh>

                    {/* Left Plate */}
                    <group position={[-2.8, -1.5, 0]}>
                        <mesh position={[0, 1, 0]}>
                            <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
                            <meshStandardMaterial color="#d4af37" />
                        </mesh>
                        <mesh rotation={[Math.PI, 0, 0]}>
                            <coneGeometry args={[1, 0.5, 32]} />
                            <meshStandardMaterial color="#b87333" metalness={0.9} roughness={0.1} emissive="#d4af37" emissiveIntensity={isHovered ? 0.5 : 0} />
                        </mesh>
                    </group>

                    {/* Right Plate */}
                    <group position={[2.8, -1.5, 0]}>
                        <mesh position={[0, 1, 0]}>
                            <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
                            <meshStandardMaterial color="#d4af37" />
                        </mesh>
                        <mesh rotation={[Math.PI, 0, 0]}>
                            <coneGeometry args={[1, 0.5, 32]} />
                            <meshStandardMaterial color="#b87333" metalness={0.9} roughness={0.1} emissive="#d4af37" emissiveIntensity={isHovered ? 0.5 : 0} />
                        </mesh>
                    </group>
                </group>
            </Float>
            <Sparkles count={50} scale={8} size={1} speed={0.3} color="#fcd34d" />
        </group>
    );
}
