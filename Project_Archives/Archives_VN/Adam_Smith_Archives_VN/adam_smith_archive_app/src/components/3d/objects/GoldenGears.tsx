'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function GoldenGears({ isHovered = false }) {
    const groupRef = useRef<THREE.Group>(null);
    const gear1 = useRef<THREE.Mesh>(null);
    const gear2 = useRef<THREE.Mesh>(null);
    const hand = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
        }
        if (gear1.current) gear1.current.rotation.z = t * (isHovered ? 1.5 : 0.5);
        if (gear2.current) gear2.current.rotation.z = -t * (isHovered ? 1.5 : 0.5);
        if (hand.current) {
            hand.current.position.y = Math.sin(t * 2) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Gear 1 */}
                <mesh ref={gear1} position={[-2, 0, 0]}>
                    <torusGeometry args={[2, 0.5, 16, 12]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} emissive="#ffaa00" emissiveIntensity={isHovered ? 0.5 : 0.1} />
                </mesh>

                {/* Gear 2 */}
                <mesh ref={gear2} position={[2.5, 1.5, -1]}>
                    <torusGeometry args={[1.5, 0.4, 16, 10]} />
                    <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} emissive="#ffffff" emissiveIntensity={isHovered ? 0.4 : 0.1} />
                </mesh>

                {/* The "Invisible Hand" Abstract Core */}
                <mesh ref={hand} position={[0, -1, 1]} scale={isHovered ? 1.2 : 1}>
                    <octahedronGeometry args={[1.5, 1]} />
                    <MeshDistortMaterial color="#ffffff" emissive="#d4af37" emissiveIntensity={isHovered ? 2 : 1} distort={0.4} speed={3} />
                </mesh>
            </Float>
            <Sparkles count={100} scale={10} size={isHovered ? 2 : 1} speed={0.4} color="#ffd700" />
        </group>
    );
}
