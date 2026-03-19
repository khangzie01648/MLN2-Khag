import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating orbs component
export function FloatingOrbs() {
    const orbs = [
        { radius: 2, speed: 0.5, phase: 0, color: '#8b5cf6', size: 0.08 },
        { radius: 2.2, speed: 0.6, phase: Math.PI / 3, color: '#a78bfa', size: 0.09 },
        { radius: 2.4, speed: 0.4, phase: 2 * Math.PI / 3, color: '#c4b5fd', size: 0.07 },
        { radius: 2.1, speed: 0.55, phase: Math.PI, color: '#ddd6fe', size: 0.08 },
    ];

    return (
        <>
            {orbs.map((orb, i) => (
                <FloatingOrb
                    key={i}
                    radius={orb.radius}
                    speed={orb.speed}
                    phase={orb.phase}
                    color={orb.color}
                    size={orb.size}
                />
            ))}
        </>
    );
}

// Individual floating orb
export function FloatingOrb({ radius, speed, phase, color, size }: { radius: number; speed: number; phase: number; color: string; size: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime * speed + phase;
        meshRef.current.position.x = Math.cos(time) * radius;
        meshRef.current.position.y = Math.sin(time * 0.7) * 0.8;
        meshRef.current.position.z = Math.sin(time) * radius;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
}
