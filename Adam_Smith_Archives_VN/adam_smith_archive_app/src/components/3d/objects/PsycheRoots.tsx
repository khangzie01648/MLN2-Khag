
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, QuadraticBezierLine, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- THE CARD COMPONENT (INSIDE 3D) ---
// Simplified and sharpened for better 3D visibility
const RootNodeCard = ({ title, index, link }: { title: string; index: number; link: string }) => {
    return (
        <Link href={link}>
            <div
                className="
          w-[300px]
          bg-black border border-amber-600/50
          p-6 flex flex-col gap-2
          hover:bg-amber-950 hover:border-amber-400
          transition-colors duration-200
          cursor-pointer
          shadow-[0_0_15px_rgba(0,0,0,0.8)]
        "
                style={{ transform: 'scale(1)', backfaceVisibility: 'hidden' }} // Force GPU rendering fix
            >
                <div className="flex justify-between items-center border-b border-amber-800/50 pb-2 mb-2">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                        NODE_{String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_orange]" />
                </div>

                <h3 className="text-xl font-cinzel font-bold text-white leading-tight drop-shadow-md">
                    {title}
                </h3>

                <div className="mt-2 text-[9px] text-amber-200/60 uppercase tracking-widest text-right">
                    [ ACCESS ]
                </div>
            </div>
        </Link>
    );
};

// --- SINGLE ROOT BRANCH ---
const RootBranch = ({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) => {
    const lineRef = useRef<any>(null);
    const mid = useMemo(() => {
        const v = new THREE.Vector3().lerpVectors(start, end, 0.5);
        // Add random curve to make it look like a root
        v.x += (Math.random() - 0.5) * 1.5;
        v.z += (Math.random() - 0.5) * 1.5;
        return v;
    }, [start, end]);

    return (
        <QuadraticBezierLine
            ref={lineRef}
            start={start}
            end={end}
            mid={mid}
            color="#f59e0b" // Amber-500 (Brighter)
            lineWidth={1.5}
            transparent
            opacity={0.6}
        />
    );
};

// --- MAIN PSYCHE ROOTS SYSTEM ---
export default function PsycheRoots({ articles, pillarId }: { articles: any[], pillarId: string }) {
    // Generate positions for nodes in a TALLER, MORE SPREAD OUT spiral
    const nodes = useMemo(() => {
        return articles.map((article, i) => {
            const angle = (i / articles.length) * Math.PI * 3 + Math.PI; // Spiral rotation
            const radius = 2.5 + (i % 2) * 1.5; // Alternating width (2.5 to 4)
            // SPREAD THEM OUT VERTICALLY MORE: -i * 4 instead of -i * 3
            const y = -i * 5 - 3;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return {
                ...article,
                pos: new THREE.Vector3(x, y, z),
                index: i
            };
        });
    }, [articles]);

    return (
        <group position={[0, 0, 0]}>
            {/* CENTRAL TRUNK ILLUSION (Made of many lines going down) */}
            {Array.from({ length: 8 }).map((_, i) => (
                <QuadraticBezierLine
                    key={i}
                    start={[Math.sin(i) * 0.5, 5, Math.cos(i) * 0.5]}
                    end={[Math.sin(i + 1) * 2, -40, Math.cos(i + 1) * 2]}
                    mid={[Math.sin(i) * 1, -10, Math.cos(i) * 1]}
                    color="#451a03"
                    lineWidth={1}
                    transparent
                    opacity={0.3}
                />
            ))}

            {nodes.map((node, i) => {
                // Connect to a point roughly above it on the "trunk" axis
                const attachPoint = new THREE.Vector3(0, node.pos.y + 4, 0);

                return (
                    <group key={node.slug}>
                        {/* THE CONNECTION ROOT */}
                        <RootBranch start={attachPoint} end={node.pos} />

                        {/* THE NODE CONTENT */}
                        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                            <group position={node.pos}>
                                {/* Glowing Anchor Point */}
                                <mesh>
                                    <sphereGeometry args={[0.08, 16, 16]} />
                                    <meshBasicMaterial color="#fbbf24" />
                                </mesh>

                                {/* HTML Content - FIXED BLUR & SCALING */}
                                <Html
                                    transform
                                    distanceFactor={10} // Reduced scaling factor to minimize blur
                                    position={[0.3, 0, 0]}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <RootNodeCard
                                        title={node.title}
                                        index={i}
                                        link={`/${pillarId}/${node.slug}`}
                                    />
                                </Html>
                            </group>
                        </Float>
                    </group>
                );
            })}
        </group>
    );
}
