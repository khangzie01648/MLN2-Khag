'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingBook() {
    const bookRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (bookRef.current) {
            bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            bookRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
            bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.0) * 1.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={bookRef}>
                {/* Cover - Ancient Weathered Leather */}
                <mesh position={[0, 0, 3]}>
                    <boxGeometry args={[26, 36, 2]} />
                    <meshStandardMaterial
                        color="#5a0000" // Blood Red/Dark Leather
                        roughness={1}
                        metalness={0.1}
                        emissive="#2a0000"
                    />
                </mesh>

                {/* Weathered Pages */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[24, 34, 6]} />
                    <meshStandardMaterial
                        color="#e3d4b6" // Antique Parchment
                        roughness={1}
                    />
                </mesh>

                <mesh position={[0, 0, -3]}>
                    <boxGeometry args={[26, 36, 2]} />
                    <meshStandardMaterial color="#5a0000" roughness={0.9} />
                </mesh>

                <Sparkles count={8} scale={40} size={1} color="#f4e4c1" speed={0.15} opacity={0.2} />
            </group>
        </Float>
    );
}
