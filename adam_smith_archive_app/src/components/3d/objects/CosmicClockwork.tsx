"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Stars, Sparkles, useTexture, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

// --- SHADER / MATERIAL ---
// We will use standard materials tuned for GOLD styling to save token/complexity for now
const GOLD_MATERIAL = new THREE.MeshStandardMaterial({
    color: "#FFD700",
    emissive: "#B8860B",
    emissiveIntensity: 0.2,
    metalness: 0.9,
    roughness: 0.2,
});

const SILVER_MATERIAL = new THREE.MeshStandardMaterial({
    color: "#C0C0C0",
    metalness: 0.8,
    roughness: 0.3,
});

function GearRing({
    radius = 2,
    speed = 0.5,
    thickness = 0.1,
    teeth = 12,
    color = "#FFD700",
    reverse = false
}) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += (reverse ? -1 : 1) * speed * delta * 0.2;
        }
    });

    // Create geometry for gear teeth
    const teethGeo = useMemo(() => {
        const t = [];
        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;
            t.push(
                <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
                    <boxGeometry args={[0.2, 0.4, thickness]} />
                    <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                </mesh>
            );
        }
        return t;
    }, [teeth, radius, thickness, color]);

    return (
        <group ref={meshRef}>
            {/* The Ring */}
            <mesh>
                <torusGeometry args={[radius, thickness / 2, 16, 100]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* The Teeth */}
            {teethGeo}
        </group>
    );
}

function CoreCrystal() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = time * 0.2;
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[1.5, 0]} />
            <MeshDistortMaterial
                color="#00FFFF"
                emissive="#0088AA"
                emissiveIntensity={2}
                distort={0.4}
                speed={2}
                roughness={0}
                metalness={1}
            />
        </mesh>
    );
}

export default function CosmicClockwork({ isActive = true, scrollProgress = 0 }) {
    const groupRef = useRef<THREE.Group>(null);

    // Speed multiplier based on scroll
    const speedMult = 1 + scrollProgress * 5;

    useFrame((state) => {
        if (!groupRef.current) return;
        // Slight floating of the whole machine
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

        // Rotate the whole system slowly based on scroll
        groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    });

    return (
        <group ref={groupRef}>
            {/* --- LIGHTING --- */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#FFD700" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#00FFFF" />
            <spotLight position={[0, 10, 0]} intensity={3} penumbra={1} castShadow />

            {/* --- THE GEARS --- */}
            {/* Outer Ring */}
            <GearRing radius={6} speed={0.2 * speedMult} teeth={24} thickness={0.3} color="#D4AF37" />

            {/* Middle Ring */}
            <GearRing radius={4.5} speed={0.4 * speedMult} teeth={16} thickness={0.4} color="#C0C0C0" reverse />

            {/* Inner Ring */}
            <GearRing radius={3} speed={0.8 * speedMult} teeth={12} thickness={0.5} color="#CD7F32" />

            {/* --- THE CORE --- */}
            <CoreCrystal />

            {/* --- PARTICLES (SUBTLE) --- */}
            <Sparkles count={20} scale={12} size={2} speed={0.3} opacity={0.2} color="#FFD700" />
            <Stars radius={100} depth={50} count={500} factor={2} saturation={0} fade speed={0.5} />

            {/* --- TEXT LABELS (Floating in 3D) --- */}
            {isActive && (
                <>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <Text
                            position={[0, 3.5, 0]}
                            fontSize={0.3}
                            font="https://fonts.gstatic.com/s/cinzel/v11/8vIJ7ww63mVu7gt78Uk.woff"
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                            fillOpacity={0.7}
                        >
                            THE PRIMA MATERIA
                        </Text>
                    </Float>
                </>
            )}

        </group>
    );
}
