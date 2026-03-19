"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * PLANET BACKGROUND - The single "Hành Tinh" visual for the Home Page.
 * Replaces the Galaxy with a singular, majestic planetary entity.
 */
export default function PlanetBackground({ color = "#00bbff" }: { color?: string }) {
    const planetRef = useRef<THREE.Group>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (planetRef.current) {
            planetRef.current.rotation.y = t * 0.05;
        }
        if (atmosphereRef.current) {
            // Pulsing atmosphere
            const scale = 1.2 + Math.sin(t * 0.5) * 0.05;
            atmosphereRef.current.scale.set(scale, scale, scale);
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.02;
        }
    });

    return (
        <group ref={planetRef} scale={1.5} rotation={[0.2, 0, 0]}>
            {/* MAIN PLANET CORE */}
            <mesh>
                <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.1}
                    metalness={0.9}
                    roughness={0.3}
                    envMapIntensity={1}
                />
            </mesh>

            {/* ATMOSPHERE SHELL (Outer Glow) */}
            <mesh ref={atmosphereRef} scale={1.2}>
                <sphereGeometry args={[5, 64, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* INNER PARTICLE CLOUD */}
            <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.2} color="white" />

            {/* ORBITAL RINGS */}
            <group rotation={[Math.PI / 3, 0, 0]} ref={ringRef}>
                {/* Main Ring */}
                <mesh>
                    <torusGeometry args={[9, 0.05, 64, 200]} />
                    <meshBasicMaterial color={color} transparent opacity={0.6} />
                </mesh>
                {/* Secondary Ring */}
                <mesh scale={1.1} rotation={[0.1, 0, 0]}>
                    <torusGeometry args={[9, 0.02, 64, 200]} />
                    <meshBasicMaterial color="pink" transparent opacity={0.3} />
                </mesh>
                {/* Faint Wide Ring */}
                <mesh scale={1.4} rotation={[-0.1, 0, 0]}>
                    <torusGeometry args={[9, 0.1, 64, 200]} />
                    <meshBasicMaterial color={color} transparent opacity={0.05} />
                </mesh>
            </group>

            {/* LIGHTING */}
            <pointLight position={[10, 10, 10]} intensity={1.5} color="white" />
            <ambientLight intensity={0.2} />
        </group>
    );
}
