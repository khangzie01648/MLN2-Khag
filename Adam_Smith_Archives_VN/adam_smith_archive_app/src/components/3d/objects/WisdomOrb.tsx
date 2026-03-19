
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Float, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface WisdomOrbProps {
    title: string;
    index: number;
    link: string;
    position: [number, number, number];
}

export function WisdomOrb({ title, index, link, position }: WisdomOrbProps) {
    const router = useRouter();
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
                {/* LABELS */}
                <Html transform distanceFactor={35} position={[0, -4.5, 0]} occlude={false}>
                    <div
                        className={`group pointer-events-auto cursor-pointer flex flex-col items-center justify-center w-[220px] transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
                        onPointerEnter={() => setHovered(true)}
                        onPointerLeave={() => setHovered(false)}
                    >
                        <div onClick={() => router.push(link)} className="flex flex-col items-center">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-black/90 backdrop-blur-3xl px-6 py-3 rounded-xl border-2 border-purple-500/50 text-center shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                            >
                                <span className="block text-[9px] font-mono text-purple-400/60 tracking-[0.3em] mb-1 uppercase">ARCHIVE_{index + 1}</span>
                                <h3 className="text-sm font-bold font-cinzel text-white tracking-widest leading-tight">{title}</h3>
                            </motion.div>
                        </div>
                    </div>
                </Html>

                {/* THE ORB */}
                <mesh
                    onClick={() => router.push(link)}
                    onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
                >
                    <sphereGeometry args={[2.2, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#8b5cf6"
                        emissive="#6d28d9"
                        emissiveIntensity={hovered ? 5 : 2}
                        roughness={0}
                        metalness={1}
                        transmission={0.9}
                        thickness={2}
                        ior={1.5}
                    />
                </mesh>
            </Float>
        </group>
    );
}
