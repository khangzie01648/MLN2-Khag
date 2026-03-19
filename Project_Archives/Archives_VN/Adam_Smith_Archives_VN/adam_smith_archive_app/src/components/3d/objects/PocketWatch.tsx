'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function PocketWatch({ isHovered = false }) {
    const groupRef = useRef<THREE.Group>(null);
    const hand1 = useRef<THREE.Mesh>(null);
    const hand2 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.3;
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
        }
        if (hand1.current) hand1.current.rotation.z = -t * 2;
        if (hand2.current) hand2.current.rotation.z = -t * 0.2;
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
                {/* Watch Case */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[3, 3, 0.5, 32]} />
                    <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Watch Crown */}
                <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
                    <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, 3.6, 0]}>
                    <torusGeometry args={[0.4, 0.05, 8, 16]} />
                    <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Clock Face */}
                <mesh position={[0, 0, 0.26]}>
                    <cylinderGeometry args={[2.8, 2.8, 0.05, 32]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.9} />
                </mesh>

                {/* Center Pin */}
                <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>

                {/* Hands */}
                <group position={[0, 0, 0.3]}>
                    <mesh ref={hand1} position={[0, 0, 0]}>
                        <boxGeometry args={[0.05, 2, 0.02]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                    <mesh ref={hand2} position={[0, 0, 0.05]}>
                        <boxGeometry args={[0.08, 1.2, 0.02]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                </group>

                {/* Abstract life-thread inside the watch */}
                <mesh position={[0, 0, 0.5]} scale={isHovered ? 1.2 : 1}>
                    <sphereGeometry args={[0.8, 16, 16]} />
                    <MeshDistortMaterial color="#ffffff" emissive="#9ca3af" emissiveIntensity={isHovered ? 2 : 0.5} distort={0.5} speed={2} wireframe={isHovered} />
                </mesh>
            </Float>
            <Sparkles count={50} scale={6} size={1} speed={0.4} color="#d4af37" opacity={0.5} />
        </group>
    );
}
