"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierLine, Float, Sparkles, Stars, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import GalaxyBackground from './GalaxyBackground';

/**
 * --- THE COSMIC TREE OF CONSCIOUSNESS (RECONSTRUCTED) ---
 * A grand, mystical structure where neural fibers form the trunk and branches,
 * merging into a vast particle galaxy.
 */
export default function CosmicTreeBackground({ color = "#00ffff" }: { color?: string }) {
    const trunkRef = useRef<THREE.Group>(null);
    const pulseRef = useRef<THREE.PointLight>(null);

    // 1. BRAIDED TRUNK LOGIC
    const trunkPaths = useMemo(() => {
        const count = 12; // Number of "Neural Fibers" for the trunk
        return Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const radius = 2.5;
            const height = 40;
            return {
                start: new THREE.Vector3(Math.cos(angle) * radius, -height, Math.sin(angle) * radius),
                end: new THREE.Vector3(Math.cos(angle) * radius * 0.5, 5, Math.sin(angle) * radius * 0.5),
                mid: new THREE.Vector3(Math.cos(angle + 1) * radius * 1.5, -height * 0.5, Math.sin(angle + 1) * radius * 1.5),
                color: color
            };
        });
    }, [color]);

    // 2. REACHING BRANCHES (Merging into Galaxy)
    const branches = useMemo(() => {
        const count = 32;
        return Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const spread = 60 + Math.random() * 40;
            const height = 5 + Math.random() * 15;
            return {
                start: new THREE.Vector3(0, 5, 0),
                end: new THREE.Vector3(Math.cos(angle) * spread, height, Math.sin(angle) * spread),
                mid: new THREE.Vector3(Math.cos(angle) * spread * 0.5, height + 10, Math.sin(angle) * spread * 0.5),
                color: color,
                delay: Math.random() * 2
            };
        });
    }, [color]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (trunkRef.current) {
            trunkRef.current.rotation.y = t * 0.05;
        }
        if (pulseRef.current) {
            pulseRef.current.intensity = 2000 + Math.sin(t * 2) * 1000;
        }
    });

    return (
        <group>
            {/* THE GALAXY "LEAVES" */}
            <group position={[0, 10, 0]}>
                <GalaxyBackground isWarping={false} />
            </group>

            {/* THE NEURAL TRUNK */}
            <group ref={trunkRef}>
                {trunkPaths.map((p, i) => (
                    <QuadraticBezierLine
                        key={`trunk-${i}`}
                        start={p.start}
                        end={p.end}
                        mid={p.mid}
                        color={p.color}
                        lineWidth={2}
                        transparent
                        opacity={0.4}
                        blending={THREE.AdditiveBlending}
                    />
                ))}

                {/* THE BRAIDED CORE (Physical Presence) */}
                <mesh position={[0, -20, 0]}>
                    <cylinderGeometry args={[1.5, 2.5, 40, 16, 1, true]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={8}
                        resolution={256}
                        transmission={1}
                        roughness={0.2}
                        thickness={2}
                        ior={1.2}
                        chromaticAberration={1.0}
                        color={color}
                        opacity={0.1}
                        transparent
                    />
                </mesh>
            </group>

            {/* THE EXPANDING BRANCHES */}
            <group>
                {branches.map((b, i) => (
                    <QuadraticBezierLine
                        key={`branch-${i}`}
                        start={b.start}
                        end={b.end}
                        mid={b.mid}
                        color={b.color}
                        lineWidth={1}
                        transparent
                        opacity={0.3}
                        blending={THREE.AdditiveBlending}
                    />
                ))}
            </group>

            {/* ATMOSPHERICS */}
            <Sparkles count={2000} scale={[150, 100, 150]} size={3} speed={0.8} color={color} opacity={0.4} />
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />

            {/* THE HEART OF THE TREE */}
            <pointLight ref={pulseRef} position={[0, 5, 0]} intensity={2000} color={color} distance={150} decay={2} />
        </group>
    );
}
