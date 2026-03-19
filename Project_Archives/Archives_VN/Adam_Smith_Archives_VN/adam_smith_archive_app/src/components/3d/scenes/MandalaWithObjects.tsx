'use client';
import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Text, Sparkles, Billboard, Float, Torus, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Glitch } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import GalaxyBackground from '../backgrounds/GalaxyBackground';

// --- HIGH-FIDELITY TRANSITION COMPONENTS ---

function OrbitTrail() {
    return (
        <group>
            <Torus args={[800, 1.5, 12, 120]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={5} toneMapped={false} transparent opacity={0.3} />
            </Torus>
            <Sparkles count={500} scale={[1800, 50, 1800]} size={3} speed={0.2} color="#ffd700" opacity={0.4} />
        </group>
    );
}

function AbyssalTunnel({ isActive, pillar }: { isActive: boolean, pillar: any }) {
    const groupRef = useRef<THREE.Group>(null);
    const ringCount = 50;
    const color = pillar?.color || "#ffd700";

    useFrame((state, delta) => {
        if (!isActive) return;
        groupRef.current?.children.forEach((ring: any, i) => {
            ring.position.z += delta * 7000;
            if (ring.position.z > 1000) ring.position.z = -ringCount * 200;
            ring.rotation.z += delta * 0.4 * (i % 2 === 0 ? 1 : -1);
        });
    });

    return (
        <group ref={groupRef} visible={isActive}>
            {Array.from({ length: ringCount }).map((_, i) => (
                <mesh key={i} position={[0, 0, -i * 200]}>
                    <torusGeometry args={[600 + i * 10, 1.5, 8, 48]} />
                    <meshBasicMaterial color={color} transparent opacity={Math.max(0, 0.4 - (i * 0.008))} wireframe />
                </mesh>
            ))}
        </group>
    );
}

function TeaserMontage({ isActive, pillar }: { isActive: boolean, pillar: any }) {
    const groupRef = useRef<THREE.Group>(null);
    const elements = useMemo(() => {
        if (pillar) return pillar.teaserKeywords || [];
        return ["Vô thức tập thể", "Cái Tôi", "Cổ mẫu", "Linh hồn Giả kim", "Mundus Imaginalis", "Lưu trữ"];
    }, [pillar]);

    useFrame((state, delta) => {
        if (!isActive || !groupRef.current) return;
        groupRef.current.children.forEach((child: any, i: number) => {
            child.position.z += delta * 15000;
            child.rotation.y += delta * 1.5;
            if (child.position.z > 3000) child.position.z = -8000;
        });
    });

    const wordData = useMemo(() => {
        return elements.map((word: string, i: number) => ({
            word,
            posX: (i % 2 === 0 ? 1 : -1) * 800,
            posY: (Math.random() - 0.5) * 600,
            posZ: -i * 1500 - 2000
        }));
    }, [elements]);

    return (
        <group ref={groupRef} visible={isActive}>
            {wordData.map((data: { word: string; posX: number; posY: number; posZ: number }, i: number) => (
                <group key={i} position={[data.posX, data.posY, data.posZ]}>
                    <Billboard>
                        <Text fontSize={45} color={pillar ? pillar.color : "#ffd700"} letterSpacing={0.2}>
                            {data.word.toUpperCase()}
                            <meshBasicMaterial transparent opacity={0.7} toneMapped={false} />
                        </Text>
                    </Billboard>
                </group>
            ))}
        </group>
    );
}

function LightStreaks({ isActive, color }: { isActive: boolean, color: string }) {
    const ref = useRef<THREE.Group>(null);
    const count = 200;
    const lines = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            pos: [(Math.random() - 0.5) * 5000, (Math.random() - 0.5) * 5000, -Math.random() * 12000],
            len: Math.random() * 2000 + 500,
            speed: Math.random() * 30000 + 20000
        }));
    }, []);

    useFrame((state, delta) => {
        if (!isActive || !ref.current) return;
        ref.current.children.forEach((line: any, i) => {
            line.position.z += delta * lines[i].speed;
            if (line.position.z > 4000) line.position.z = -8000;
        });
    });

    return (
        <group ref={ref} visible={isActive}>
            {lines.map((l, i) => (
                <mesh key={i} position={l.pos as any}>
                    <boxGeometry args={[4, 4, l.len]} />
                    <meshBasicMaterial color={color} transparent opacity={0.6} toneMapped={false} />
                </mesh>
            ))}
        </group>
    );
}

function JumpParticles({ isActive, color, pillar }: { isActive: boolean, color: string, pillar: any }) {
    const coreColor = "#ffffff";
    const finalColor = pillar ? color : coreColor;
    return (
        <group visible={isActive}>
            <AbyssalTunnel isActive={isActive} pillar={pillar} />
            <Sparkles count={pillar ? 4000 : 8000} scale={5000} size={pillar ? 30 : 60} speed={10} color={finalColor} />
            <LightStreaks isActive={isActive} color={finalColor} />
            <TeaserMontage isActive={isActive} pillar={pillar} />
        </group>
    );
}

// --- VISUALS: ULTRA-DETAILED ARCHETYPES (MASTERPIECE QUALITY) ---

// 0. STAR WARP FIELD: High-End Particle System
const StarWarpField = ({ active, factor }: { active: boolean, factor: number }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 5000;

    const [positions, sizes] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 4000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
            positions[i * 3 + 2] = (Math.random() - 1.0) * 8000;
            sizes[i] = Math.random() * 2;
        }
        return [positions, sizes];
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        const attr = pointsRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            // Move towards camera
            attr.array[i * 3 + 2] += delta * 2000 * (active ? factor : 1);
            // Reset if behind camera
            if (attr.array[i * 3 + 2] > 2000) {
                attr.array[i * 3 + 2] = -6000;
            }
        }
        attr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach={"attributes-position" as any}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach={"attributes-size" as any}
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial size={4} transparent opacity={0.6} color="#ffffff" sizeAttenuation />
        </points>
    );
};

// 0.5 HOLOGRAPHIC PLANE: Memory Artifact
const HolographicPlane = ({ name, isHovered }: { name: string, isHovered: boolean }) => {
    return (
        <group>
            <Billboard>
                <Text
                    fontSize={14}
                    color={isHovered ? "#ffffff" : "#ffed8b"}
                    fillOpacity={isHovered ? 1.0 : 0.9}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.4}
                    fontWeight="bold"
                >
                    {name}
                </Text>
            </Billboard>
        </group>
    );
};

// 1. SPIRIT: The Hypercube Tesseract (Dimensional Transcendence)
const SpiritGlitch = ({ isHovered }: any) => {
    const outerRef = useRef<THREE.Group>(null);
    const midRef = useRef<THREE.Group>(null);
    const innerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (outerRef.current) {
            outerRef.current.rotation.x = t * 0.3;
            outerRef.current.rotation.y = t * 0.45;
            outerRef.current.position.y = Math.sin(t * 1.5) * 1.5;
        }
        if (midRef.current) {
            midRef.current.rotation.x = -t * 0.6;
            midRef.current.rotation.z = t * 0.3;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y = t * 1.5;
            innerRef.current.rotation.x = Math.sin(t * 2) * 0.4;
        }
    });

    return (
        <group scale={1.8}>
            {/* Layer 1: Outer Reality - The Crystal Shell */}
            <group ref={outerRef}>
                <mesh>
                    <boxGeometry args={[14, 14, 14, 8, 8, 8]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0}
                        transmission={0.9}
                        thickness={2}
                        clearcoat={1}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
                <mesh>
                    <boxGeometry args={[14.2, 14.2, 14.2]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} wireframe toneMapped={false} />
                </mesh>
            </group>

            {/* Layer 2: Dimensional Shift */}
            <group ref={midRef}>
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <boxGeometry args={[10, 10, 10, 2, 2, 2]} />
                    <meshStandardMaterial color="#a0aec0" emissive="#ffffff" emissiveIntensity={2} wireframe toneMapped={false} />
                </mesh>
            </group>

            {/* Layer 3: The Singularity */}
            <group ref={innerRef}>
                <mesh>
                    <octahedronGeometry args={[5, 1]} />
                    <meshPhysicalMaterial
                        color="#ff0000"
                        emissive="#ff0000"
                        emissiveIntensity={30}
                        toneMapped={false}
                        roughness={0}
                        metalness={1}
                    />
                </mesh>
                <mesh>
                    <sphereGeometry args={[2.8, 32, 32]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                </mesh>
                <pointLight intensity={10} color="#ff0000" distance={60} />
            </group>
        </group>
    );
};

// 2. SYMBOLS: The Runic Obelisk (Ancient Language)
const Runestone = ({ isHovered }: any) => {
    const rings = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (rings.current) {
            rings.current.children.forEach((r, i) => {
                r.rotation.z = t * (0.4 * (i + 1));
                r.rotation.x = Math.sin(t * 0.8 + i) * 0.3;
            });
            rings.current.position.y = Math.cos(t * 1.2) * 2;
        }
    });

    return (
        <group scale={2.0}>
            {/* The Monolith - Polished Obsidian */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[2, 4, 30, 32, 1, false]} />
                <meshPhysicalMaterial
                    color="#050505"
                    roughness={0.1}
                    metalness={0.9}
                    reflectivity={1}
                    clearcoat={1}
                />
            </mesh>
            {/* Pyramid Cap - Radiant Gold */}
            <mesh position={[0, 17, 0]}>
                <coneGeometry args={[2, 4, 32]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={10} toneMapped={false} />
            </mesh>
            {/* Energy Lines */}
            {[0, 1, 2, 3].map(i => (
                <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 3, 0, Math.sin(i * Math.PI / 2) * 3]}>
                    <boxGeometry args={[0.3, 28, 0.3]} />
                    <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={5} toneMapped={false} />
                </mesh>
            ))}

            {/* Orbiting Runes */}
            <group ref={rings}>
                {[0, 1, 2].map(i => (
                    <group key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <mesh>
                            <torusGeometry args={[8 + i * 3, 0.2, 16, 64]} />
                            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} wireframe toneMapped={false} />
                        </mesh>
                        <mesh position={[8 + i * 3, 0, 0]}>
                            <icosahedronGeometry args={[1.2, 0]} />
                            <meshStandardMaterial color="#ffffff" emissive="#ffd700" emissiveIntensity={15} toneMapped={false} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

// 3. LEGACY: The Ancestral Tree (Fractal Growth)
const CrystalArbor = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (group.current) {
            group.current.rotation.y = t * 0.2;
            group.current.position.y = -10 + Math.sin(t * 0.8) * 3;
        }
    });

    return (
        <group ref={group} scale={2.5} position={[0, -10, 0]}>
            {/* Main Trunk */}
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[1, 4, 20, 8, 4]} />
                <meshStandardMaterial color="#aaff00" emissive="#55ff00" emissiveIntensity={0.6} wireframe />
            </mesh>
            {/* Roots */}
            {[0, 1, 2, 3].map(i => (
                <mesh key={`root-${i}`} position={[0, -5, 0]} rotation={[0, 0, (i * Math.PI / 2) + 0.5]}>
                    <coneGeometry args={[0.8, 10, 4]} />
                    <meshStandardMaterial color="#aaff00" emissive="#55ff00" emissiveIntensity={0.4} wireframe />
                </mesh>
            ))}
            {/* Branches - Layer 1 */}
            {[0, 1, 2, 3, 4].map(i => (
                <group key={`b1-${i}`} position={[0, 10, 0]} rotation={[0.5, i * (Math.PI * 2 / 5), 0]}>
                    <mesh position={[0, 6, 0]}>
                        <cylinderGeometry args={[0.5, 1, 12]} />
                        <meshStandardMaterial color="#aaff00" emissive="#55ff00" emissiveIntensity={0.8} wireframe />
                    </mesh>
                    {/* Glowing Fruits */}
                    <mesh position={[0, 12, 0]}>
                        <icosahedronGeometry args={[1.2, 0]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ccff00" emissiveIntensity={4} toneMapped={false} />
                    </mesh>
                </group>
            ))}
            {/* Branches - Layer 2 (Crown) */}
            {[0, 1, 2].map(i => (
                <mesh key={`b2-${i}`} position={[0, 18, 0]} rotation={[0.3, i * (Math.PI * 2 / 3), 0.5]}>
                    <coneGeometry args={[0.5, 10, 4]} />
                    <meshStandardMaterial color="#ccff00" emissive="#aaff00" emissiveIntensity={0.8} wireframe />
                </mesh>
            ))}
            <Sparkles count={30} scale={20} size={2} speed={0} color="#ccff00" position={[0, 15, 0]} />
        </group>
    );
};

// 4. COSMOS: The Armillary Sphere (Universal Mechanism)
const CosmosSingularity = ({ isHovered }: any) => {
    const rings = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (rings.current) {
            rings.current.children[0].rotation.x = t * 0.6;
            rings.current.children[1].rotation.y = t * 1.0;
            rings.current.children[2].rotation.z = t * 0.4;
            rings.current.children[3].rotation.x = t * 1.2;
            rings.current.children[3].rotation.y = t * 1.2;
            rings.current.position.y = Math.sin(t * 0.5) * 5;
        }
    });

    return (
        <group scale={2.2}>
            {/* Central Sun - Volumetric Bloom */}
            <mesh>
                <sphereGeometry args={[4.5, 64, 64]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={20} toneMapped={false} />
            </mesh>
            <pointLight intensity={15} color="#ffffff" distance={100} />

            {/* High-Fidelity Gyroscope */}
            <group ref={rings}>
                <mesh>
                    <torusGeometry args={[8, 0.3, 16, 128]} />
                    <meshPhysicalMaterial color="#88ccff" transmission={0.5} thickness={2} roughness={0} clearcoat={1} />
                </mesh>
                <mesh>
                    <torusGeometry args={[11, 0.3, 16, 128]} />
                    <meshPhysicalMaterial color="#88ffaa" transmission={0.5} thickness={2} roughness={0} clearcoat={1} />
                </mesh>
                <mesh>
                    <torusGeometry args={[14, 0.1, 8, 256]} />
                    <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={40} toneMapped={false} />
                </mesh>
                <mesh>
                    <torusGeometry args={[6.5, 0.5, 24, 64]} />
                    <meshStandardMaterial color="#000000" emissive="#4400ff" emissiveIntensity={5} toneMapped={false} />
                </mesh>
            </group>
            <Sparkles count={100} scale={25} size={2} speed={1} color="#ffffff" />
        </group>
    );
};

// 5. ENCOUNTERS: The Neural Connector (Web of Relations)
const SynapticGrid = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (group.current) {
            group.current.rotation.y = t * 0.4;
            group.current.rotation.z = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={group} scale={2.4}>
            {/* Central Hub */}
            <mesh>
                <dodecahedronGeometry args={[6, 0]} />
                <meshStandardMaterial color="#0044ff" emissive="#0022ff" emissiveIntensity={1.5} wireframe />
            </mesh>
            {/* Satellites */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                    <group key={i} rotation={[Math.PI / 4, angle, 0]}>
                        <mesh position={[10, 0, 0]}>
                            <icosahedronGeometry args={[2.0, 0]} />
                            <meshStandardMaterial color="#ffffff" emissive="#0088ff" emissiveIntensity={5} toneMapped={false} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 2]} position={[5, 0, 0]}>
                            <cylinderGeometry args={[0.2, 0.2, 10]} />
                            <meshBasicMaterial color="#0088ff" transparent opacity={0.8} />
                        </mesh>
                    </group>
                )
            })}
            <Sparkles count={40} scale={22} size={2} speed={0} color="#00aaff" />
        </group>
    );
};

// 6. BIOGRAPHY: The Double Helix (Life Script)
const BioFragment = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (group.current) {
            group.current.rotation.y = t * 1.2;
            group.current.position.y = Math.sin(t * 1.1) * 4;
        }
    });

    return (
        <group ref={group} scale={1.8}>
            {/* DNA Strands */}
            {[...Array(12)].map((_, i) => (
                <group key={i} position={[0, i * 2 - 11, 0]} rotation={[0, i * 0.5, 0]}>
                    <mesh position={[4, 0, 0]}>
                        <sphereGeometry args={[0.8, 16, 16]} />
                        <meshStandardMaterial color="#bb00ff" emissive="#aa00ff" emissiveIntensity={1.2} />
                    </mesh>
                    <mesh position={[-4, 0, 0]}>
                        <sphereGeometry args={[0.8, 16, 16]} />
                        <meshStandardMaterial color="#bb00ff" emissive="#aa00ff" emissiveIntensity={1.2} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.2, 0.2, 8]} />
                        <meshStandardMaterial color="#bb00ff" emissive="#aa00ff" emissiveIntensity={0.6} />
                    </mesh>
                </group>
            ))}
            {/* Central Axis */}
            <mesh>
                <cylinderGeometry args={[0.1, 0.1, 26]} />
                <meshBasicMaterial color="#bb00ff" transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

// 7. CONCEPTS: The Platonic Crystals (Structural Truth)
const LogicCore = ({ isHovered }: any) => {
    const outer = useRef<THREE.Mesh>(null);
    const mid = useRef<THREE.Mesh>(null);
    const inner = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (outer.current) { outer.current.rotation.x = t * 0.4; outer.current.rotation.y = t * 0.4; }
        if (mid.current) { mid.current.rotation.x = -t * 0.8; mid.current.rotation.z = t * 0.8; }
        if (inner.current) { inner.current.rotation.y = t * 2.0; }
    });

    return (
        <group scale={2.2}>
            {/* Outer Cube */}
            <mesh ref={outer}>
                <boxGeometry args={[14, 14, 14]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} wireframe />
            </mesh>
            {/* Star Tetrahedron (Merkaba-ish) */}
            <group ref={mid}>
                <mesh>
                    <tetrahedronGeometry args={[10, 0]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} wireframe />
                </mesh>
                <mesh rotation={[Math.PI, 0, 0]}>
                    <tetrahedronGeometry args={[10, 0]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} wireframe />
                </mesh>
            </group>
            {/* Inner Core */}
            <mesh ref={inner}>
                <octahedronGeometry args={[4, 0]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={8} toneMapped={false} />
            </mesh>
        </group>
    );
};

// 8. RED BOOK: The Unfolding Manuscript (Inner Vision)
const RedBookLegacy = ({ isHovered }: any) => {
    const pages = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (pages.current) {
            pages.current.children.forEach((p, i) => {
                p.rotation.y = (Math.PI / 12 * i) + Math.sin(t * 3.5 + i) * 0.2;
            });
            pages.current.position.y = Math.sin(t * 0.9) * 2;
        }
    });

    return (
        <group scale={1.8}>
            {/* Cover Back */}
            <mesh position={[-7, 0, 0]}>
                <boxGeometry args={[1, 32, 22]} />
                <meshStandardMaterial color="#ff0000" emissive="#770000" emissiveIntensity={0.5} />
            </mesh>
            {/* Spine */}
            <mesh position={[-6.5, 0, 11]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[1.5, 1.5, 32, 16, 1, false, 0, Math.PI]} />
                <meshStandardMaterial color="#ff0000" emissive="#770000" emissiveIntensity={0.6} />
            </mesh>
            {/* Pages */}
            <group ref={pages} position={[-6, 0, -10]}>
                {[...Array(10)].map((_, i) => (
                    <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, 0]}> {/* Pivot point correction needed in real layout, simplified here */}
                        <boxGeometry args={[12, 28, 0.1]} /> {/* Page size */}
                        <meshStandardMaterial color="#ffcccc" emissive="#ff0000" emissiveIntensity={i / 20} wireframe />
                        {/* Centering the pivot visually */}
                        <group position={[6, 0, 0]}>
                            {/* Content of page */}
                        </group>
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// 9. ALCHEMY: The Transmutation Seal (Sacred Union)
const AlchemicalCrucible = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (group.current) {
            group.current.rotation.z = t * 0.6;
            group.current.rotation.x = Math.sin(t * 0.4) * 0.2;
        }
    });

    return (
        <group scale={2.0}>
            {/* Ring 1 - Circle */}
            <mesh>
                <torusGeometry args={[12, 0.3, 16, 100]} />
                <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={1} />
            </mesh>
            <group ref={group}>
                {/* Item 2 - Triangle */}
                <mesh>
                    <circleGeometry args={[10, 3]} />
                    <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={0.5} wireframe />
                </mesh>
                {/* Item 3 - Square */}
                <mesh>
                    <circleGeometry args={[8, 4]} />
                    <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={0.8} wireframe />
                </mesh>
            </group>
            {/* Philosopher's Stone */}
            <mesh position={[0, 0, 0]}>
                <dodecahedronGeometry args={[3.5, 0]} />
                <meshStandardMaterial color="#ffffff" emissive="#00ff44" emissiveIntensity={8} toneMapped={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[4, 8, 4]} />
                <meshStandardMaterial color="#00ff44" wireframe transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

// 10. PRACTICE: The Blooming Mandala (Self-Realization)
const MandalaLotus = ({ isHovered }: any) => {
    const layer1 = useRef<THREE.Group>(null);
    const layer2 = useRef<THREE.Group>(null);
    const layer3 = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        if (layer1.current) layer1.current.rotation.z = t * 0.4;
        if (layer2.current) layer2.current.rotation.z = -t * 0.6;
        if (layer3.current) {
            layer3.current.rotation.z = t * 1.2;
            layer3.current.position.y = Math.sin(t * 1.5) * 3;
        }

        const targetX1 = isHovered ? -0.8 : 0;
        const targetX2 = isHovered ? -0.5 : 0;
        if (layer1.current) layer1.current.rotation.x = THREE.MathUtils.damp(layer1.current.rotation.x, targetX1, 4, delta);
        if (layer2.current) layer2.current.rotation.x = THREE.MathUtils.damp(layer2.current.rotation.x, targetX2, 4, delta);
    });

    return (
        <group scale={2.5} rotation={[Math.PI / 4, 0, 0]}>
            {/* Layer 1 - Translucent Outer Petals */}
            <group ref={layer1}>
                {[...Array(12)].map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]} position={[0, 6, 0]}>
                        <coneGeometry args={[2, 10, 16]} />
                        <meshPhysicalMaterial
                            color="#ff00ff"
                            emissive="#ff00ff"
                            emissiveIntensity={2}
                            transmission={0.8}
                            thickness={1}
                            transparent
                            opacity={0.6}
                            toneMapped={false}
                        />
                    </mesh>
                ))}
            </group>
            {/* Layer 2 - Glowing Inner Petals */}
            <group ref={layer2}>
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]} position={[0, 4, 0]}>
                        <coneGeometry args={[1.5, 7, 16]} />
                        <meshStandardMaterial color="#ff00ff" emissive="#ffffff" emissiveIntensity={5} toneMapped={false} />
                    </mesh>
                ))}
            </group>
            {/* Center - The Golden Seed */}
            <group ref={layer3}>
                <mesh>
                    <dodecahedronGeometry args={[3, 0]} />
                    <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={10} toneMapped={false} />
                </mesh>
                <Sparkles count={40} scale={10} size={2} color="#ffd700" />
            </group>
        </group>
    );
};

const PILLARS = [
    {
        id: 'tieu-su', name: 'TIỂU SỬ', Object: BioFragment, baseScale: 2.0, color: "#bb00ff",
        transitionMsg: "CHƯƠNG I: CUỘC ĐỜI & DI SẢN", transitionColor: "#0a0015",
        teaserKeywords: ["Zurich 1875", "Tháp Bollingen", "Ký ức", "Toni Wolff", "Emma Adam Smith"]
    },
    {
        id: 'khai-niem', name: 'KHÁI NIỆM', Object: LogicCore, baseScale: 2.2, color: "#00ffff",
        transitionMsg: "CHƯƠNG II: CẤU TRÚC TÂM LÝ", transitionColor: "#000808",
        teaserKeywords: ["Cổ mẫu", "Bóng tối", "Mặt nạ", "Anima", "Animus"]
    },
    {
        id: 'sach-do', name: 'SÁCH ĐỎ', Object: RedBookLegacy, baseScale: 1.8, color: "#ff0000",
        transitionMsg: "CHƯƠNG III: KHẢI HUYỀN NỘI TÂM", transitionColor: "#150000",
        teaserKeywords: ["Liber Novus", "Philemon", "Sa mạc", "Đối thoại", "Nghi lễ đỏ"]
    },
    {
        id: 'gia-kim', name: 'GIẢ KIM', Object: AlchemicalCrucible, baseScale: 2.0, color: "#00ff44",
        transitionMsg: "CHƯƠNG IV: GIẢ KIM THUẬT", transitionColor: "#000a03",
        teaserKeywords: ["Solutio", "Hòn đá triết gia", "Chì thành Vàng", "Hợp nhất", "Bình chứa Linh hồn"]
    },
    {
        id: 'thuc-hanh', name: 'THỰC HÀNH', Object: MandalaLotus, baseScale: 2.4, color: "#ff00ff",
        transitionMsg: "CHƯƠNG V: PHƯƠNG PHÁP LUẬN", transitionColor: "#0a000a",
        teaserKeywords: ["Tưởng tượng tích cực", "Giải mã giấc mơ", "Mandala", "Thần chú"]
    },
    {
        id: 'bieu-tuong', name: 'BIỂU TƯỢNG', Object: Runestone, baseScale: 2.0, color: "#ffd700",
        transitionMsg: "CHƯƠNG VI: BIỂU TƯỢNG HỌC", transitionColor: "#0a0800",
        teaserKeywords: ["Ouroboros", "Vòng tròn", "Thập tự", "Cổ ngữ", "Hình học thiêng"]
    },
    {
        id: 'tam-linh', name: 'TÂM LINH', Object: SpiritGlitch, baseScale: 2.3, color: "#ffffff",
        transitionMsg: "CHƯƠNG VII: CHIỀU KÍCH TÂM LINH", transitionColor: "#080808",
        teaserKeywords: ["Vô thức tập thể", "Đồng hiện", "Cái Tôi", "Sự sung túc"]
    },
    {
        id: 'di-san', name: 'DI SẢN', Object: CrystalArbor, baseScale: 1.8, color: "#aaff00",
        transitionMsg: "CHƯƠNG VIII: TIẾP NỐI THẾ HỆ", transitionColor: "#050a00",
        teaserKeywords: ["Tâm lý học Phân tích", "MBTI", "Joseph Campbell", "Cội rễ"]
    },
    {
        id: 'vu-tru', name: 'VŨ TRỤ', Object: CosmosSingularity, baseScale: 2.0, color: "#ffffff",
        transitionMsg: "CHƯƠNG IX: VŨ TRỤ QUAN", transitionColor: "#000000",
        teaserKeywords: ["Unus Mundus", "Tâm thể", "Chân trời sự kiện", "Điểm kỳ dị"]
    },
    {
        id: 'gap-go', name: 'GẶP GỠ', Object: SynapticGrid, baseScale: 2.1, color: "#0044ff",
        transitionMsg: "CHƯƠNG X: NHỮNG CUỘC GẶP GỠ", transitionColor: "#00040a",
        teaserKeywords: ["Sigmund Freud", "Wolfgang Pauli", "Tình bạn", "Định mệnh"]
    },
];

function OrbitalNucleus({ pillar, index, sharedAngleRef, isDiving, isSelected, onClick }: any) {
    const groupRef = useRef<THREE.Group>(null);
    const labelRef = useRef<THREE.Group>(null);
    const [localHover, setLocalHover] = useState(false);
    const orbitRadius = 800;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const angleOffset = (index * Math.PI * 2) / 10;
        const angle = sharedAngleRef.current + angleOffset;

        // Position update
        groupRef.current.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);

        // Simple scale - removed expensive world distance on every frame
        const targetScale = (localHover ? 2.2 : 1.4) * (pillar.baseScale || 1.0);
        groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 6, delta);
        groupRef.current.scale.y = groupRef.current.scale.x;
        groupRef.current.scale.z = groupRef.current.scale.x;

        if (labelRef.current && !isDiving) {
            // Keep labels at a fixed offset but calculate a dynamic scale to counteract the parent's scale
            labelRef.current.position.set(Math.cos(angle) * 75, 0, Math.sin(angle) * 75);

            // To "fix" the size, we want the global scale to be constant (e.g., 2.8)
            // Global Scale = groupRef.scale * labelRef.scale
            // So, labelRef.scale = constant / groupRef.scale
            const baseConstant = 3.2; // Optimized for clarity
            const targetLabelScale = (localHover ? 1.2 : 1.0) * baseConstant;

            // We divide by current group scale to normalize it across all pillars
            labelRef.current.scale.setScalar(targetLabelScale / groupRef.current.scale.x);
        }
    });

    return (
        <group
            ref={groupRef}
            visible={isDiving ? isSelected : true}
            onPointerOver={(e) => {
                if (isDiving) return;
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                setLocalHover(true);
            }}
            onPointerOut={() => {
                if (isDiving) return;
                document.body.style.cursor = 'default';
                setLocalHover(false);
            }}
            onClick={() => {
                if (!isDiving) onClick(pillar);
            }}
        >
            <pillar.Object isHovered={localHover} />
            <group ref={labelRef} visible={!isDiving}>
                <HolographicPlane name={pillar.name} isHovered={localHover} />
            </group>
        </group>
    );
}

function MandalaCamera({ isDiving, selectedPillarIndex, sharedAngleRef, transitionStage }: any) {
    const { camera } = useThree();
    const orbitRadius = 800;
    const shakeRef = useRef(new THREE.Vector3());
    const transitionStartRef = useRef(0);
    const lastDivingRef = useRef(false);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        if (isDiving && !lastDivingRef.current) {
            transitionStartRef.current = t;
        }
        lastDivingRef.current = isDiving;

        const relT = isDiving ? t - transitionStartRef.current : 0;

        if (isDiving && selectedPillarIndex !== null) {
            const angleOffset = (selectedPillarIndex * Math.PI * 2) / 10;
            const angle = sharedAngleRef.current + angleOffset;
            const targetX = Math.cos(angle) * orbitRadius;
            const targetZ = Math.sin(angle) * orbitRadius;

            // 8-SECOND PILLAR CHOREOGRAPHY
            if (relT < 2.0) {
                const progress = relT / 2.0;
                const tilt = Math.sin(progress * Math.PI) * 0.2;
                camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, tilt, 0.05);
                const pull = THREE.MathUtils.lerp(1600, 800, progress);
                camera.position.lerp(new THREE.Vector3(targetX * (1 - progress / 2), pull, targetZ * (1 - progress / 2)), 0.05);
                camera.lookAt(0, 0, 0);
            }
            else if (relT < 6.5) {
                const progress = (relT - 2.0) / 4.5;
                const zoomDist = THREE.MathUtils.lerp(800, -2000, Math.pow(progress, 2.5));
                const camX = Math.cos(angle) * (orbitRadius - zoomDist);
                const camZ = Math.sin(angle) * (orbitRadius - zoomDist);
                camera.position.set(camX, Math.sin(t * 10) * 20, camZ);
                camera.lookAt(0, 0, 0);
                (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(35, 120, progress);
            }
            else {
                const progress = Math.min(1, (relT - 6.5) / 2.0);
                const terminalRush = THREE.MathUtils.lerp(-2000, -12000, Math.pow(progress, 4));
                camera.position.z += (terminalRush * delta);
                (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(120, 175, progress);
            }
            camera.updateProjectionMatrix();

        } else if (isDiving && selectedPillarIndex === null) {
            // UNIQUE CORE DIVE: TOP-DOWN SPIRAL
            const pCam = camera as THREE.PerspectiveCamera;
            if (relT < 2.5) {
                // PHASE 1: VERTICAL ASCENT (Looking down at the throne)
                const progress = relT / 2.5;
                const height = THREE.MathUtils.lerp(1600, 3500, Math.pow(progress, 1.5));
                camera.position.lerp(new THREE.Vector3(0, height, 500), 0.05);
                camera.lookAt(0, 0, 0);
                camera.rotation.z += delta * (progress * 2); // Spinning ascent
            }
            else if (relT < 6.8) {
                // PHASE 2: SPIRAL DESCENT INTO THE UNCONSCIOUS
                const progress = (relT - 2.5) / 4.3;
                const radius = THREE.MathUtils.lerp(500, 0, progress);
                const height = THREE.MathUtils.lerp(3500, -500, Math.pow(progress, 2));
                const spin = t * (5 + progress * 15);

                camera.position.set(Math.cos(spin) * radius, height, Math.sin(spin) * radius);
                camera.lookAt(0, 0, 0);
                pCam.fov = THREE.MathUtils.lerp(35, 140, progress);
            }
            else {
                // PHASE 3: THE WHITE-OUT (Ego Dissolution)
                const progress = Math.min(1, (relT - 6.8) / 1.7);
                camera.position.y -= delta * 8000;
                pCam.fov = THREE.MathUtils.lerp(140, 5, progress); // Tunnel vision
            }
            camera.updateProjectionMatrix();
        } else {
            // IDLE
            const pCam = camera as THREE.PerspectiveCamera;
            const defaultPos = new THREE.Vector3(0, 1600, 2600);
            camera.position.lerp(defaultPos, 0.05);
            camera.lookAt(0, 0, 0);
            camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, 0, 0.05);
            pCam.fov = THREE.MathUtils.lerp(pCam.fov, 35, 0.05);
            camera.updateProjectionMatrix();
        }
    });

    return <PerspectiveCamera makeDefault fov={35} far={15000} />;
}

function SacredMandala({ isDiving, setIsDiving, selectedPillarIndex, setSelectedPillarIndex, transitionStage, setTransitionStage }: any) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();
    const selfCoreRef = useRef<THREE.Mesh>(null);
    const ringsRef = useRef<THREE.Group>(null);
    const sharedAngleRef = useRef(0);

    useFrame((state, delta) => {
        // Speed up the orbit significantly
        const speedFactor = isDiving ? 0.05 : (hoveredIndex !== null ? 0.15 : 1.2);
        sharedAngleRef.current += delta * 0.2 * speedFactor;

        if (selfCoreRef.current) {
            selfCoreRef.current.rotation.y += delta * 0.2;
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.y += delta * 0.1;
        }
    });

    const triggerDive = (idx: number) => {
        if (isDiving) return;
        setIsDiving(true);
        setSelectedPillarIndex(idx);
        setTransitionStage('ACTIVATING');

        // EPIC 8-SECOND TIMELINE
        setTimeout(() => setTransitionStage('HYPERSPACE'), 2000);
        setTimeout(() => {
            const pillar = PILLARS[idx];
            router.push(`/select/pillar/${pillar.id}`);
        }, 8500);
    };

    const triggerCoreDive = () => {
        if (isDiving) return;
        setIsDiving(true);
        setSelectedPillarIndex(null); // No pillar = Core
        setTransitionStage('ACTIVATING');

        setTimeout(() => setTransitionStage('HYPERSPACE'), 2000);
        setTimeout(() => router.push('/select/library'), 8500);
    };

    return (
        <group>
            <MandalaCamera
                isDiving={isDiving}
                selectedPillarIndex={selectedPillarIndex}
                sharedAngleRef={sharedAngleRef}
                transitionStage={transitionStage}
            />

            <group ref={ringsRef}>
                <Float speed={isDiving ? 0 : 0.4} rotationIntensity={0.02} floatIntensity={0.1}>
                    <Torus args={[800, 3.0, 16, 256]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial
                            color="#ffd700"
                            emissive="#ffd700"
                            emissiveIntensity={25}
                            toneMapped={false}
                            transparent
                            opacity={0.6}
                        />
                    </Torus>

                    <group>
                        {PILLARS.map((pillar, index) => (
                            <OrbitalNucleus
                                key={pillar.id}
                                pillar={pillar}
                                index={index}
                                sharedAngleRef={sharedAngleRef}
                                onClick={(p: any) => triggerDive(index)}
                                isDiving={isDiving}
                                isSelected={selectedPillarIndex === index}
                            />
                        ))}
                    </group>
                </Float>
            </group>

            <OrbitTrail />

            {/* THE HYPERSPACE EFFECTS */}
            <AbyssalTunnel
                isActive={transitionStage === 'HYPERSPACE'}
                pillar={selectedPillarIndex !== null ? PILLARS[selectedPillarIndex] : null}
            />

            <JumpParticles
                isActive={transitionStage === 'HYPERSPACE'}
                color={selectedPillarIndex !== null ? PILLARS[selectedPillarIndex].color : "#ffffff"}
                pillar={selectedPillarIndex !== null ? PILLARS[selectedPillarIndex] : null}
            />

            <Float speed={isDiving ? 0 : 0.4} rotationIntensity={0.02} floatIntensity={0.1}>
                {/* THE SELF - VOLUMETRIC SUPERNOVA */}
                <group
                    onClick={(e) => { e.stopPropagation(); triggerCoreDive(); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { document.body.style.cursor = 'default'; }}
                >
                    <mesh ref={selfCoreRef}>
                        <icosahedronGeometry args={[130, 8]} />
                        <meshStandardMaterial
                            color="#ffd700"
                            emissive="#ffd700"
                            emissiveIntensity={25}
                            wireframe
                            transparent
                            opacity={0.4}
                            toneMapped={false}
                        />
                    </mesh>
                    <mesh>
                        <sphereGeometry args={[90, 32, 32]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                    </mesh>
                    <pointLight intensity={35} color="#ffd700" distance={3000} />
                </group>
            </Float>
        </group>
    );
}

export default function MandalaWithObjects() {
    const [isDiving, setIsDiving] = useState(false);
    const [selectedPillarIndex, setSelectedPillarIndex] = useState<number | null>(null);
    const [transitionStage, setTransitionStage] = useState<'IDLE' | 'ACTIVATING' | 'HYPERSPACE'>('IDLE');
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const glitchDelay = useMemo(() => new THREE.Vector2(0.1, 0.2), []);
    const glitchDuration = useMemo(() => new THREE.Vector2(0.1, 0.2), []);
    const glitchStrength = useMemo(() => new THREE.Vector2(0.2, 0.4), []);

    if (!hasMounted) {
        return <div className="w-full h-screen bg-[#000508]" />;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden" suppressHydrationWarning>
            <Canvas shadows={false} dpr={[1, 1.5]} gl={{ alpha: true, toneMappingExposure: 1.5, powerPreference: 'high-performance', antialias: false }}>
                <fog attach="fog" args={['#050200', 1000, 5000]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} intensity={10} color="#ffaa00" />
                <hemisphereLight intensity={1} groundColor="#000000" color="#8a0303" />

                <Suspense fallback={null}>
                    {/* Alchemical Atmosphere - Reduced for Performance */}
                    <Sparkles count={200} scale={2000} size={4} speed={0.4} opacity={0.5} color="#d4af37" />

                    <SacredMandala
                        isDiving={isDiving} setIsDiving={setIsDiving}
                        selectedPillarIndex={selectedPillarIndex} setSelectedPillarIndex={setSelectedPillarIndex}
                        transitionStage={transitionStage} setTransitionStage={setTransitionStage}
                    />
                </Suspense>

                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={isDiving ? 0.2 : 0.9} intensity={isDiving ? 1.2 : 0.4} mipmapBlur />
                    {isDiving ? <ChromaticAberration offset={[0.005, 0.005] as any} /> : <></>}
                    <Vignette eskil={false} offset={0.3} darkness={isDiving ? 2.0 : 1.2} />
                </EffectComposer>
            </Canvas>

            <AnimatePresence>
                {isDiving && transitionStage === 'HYPERSPACE' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-md"
                    >
                        <div
                            className="text-white font-light tracking-[2em] opacity-60 text-xs uppercase px-4 text-center"
                            style={{ textShadow: `0 0 20px ${selectedPillarIndex !== null ? PILLARS[selectedPillarIndex].color : '#ffffff'}` }}
                        >
                            {selectedPillarIndex !== null ? PILLARS[selectedPillarIndex].transitionMsg : "BƯỚC VÀO VÔ THỨC"}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* UI Layer */}
            <motion.div
                animate={{
                    opacity: isDiving ? 0 : 1,
                    y: isDiving ? -50 : 0
                }}
                className="absolute inset-0 pointer-events-none flex flex-col items-center py-12 z-20"
            >
                <div className="text-center">
                    <h1 className="text-4xl md:text-7xl font-serif italic tracking-[0.25em] text-[#ffd700] drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">
                        THE ADAM SMITH ARCHIVE
                    </h1>
                    <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-60 mt-4 mx-auto" />
                    <p className="mt-6 text-sm tracking-[0.8em] text-[#ff8800] opacity-90 uppercase font-light">
                        Mundus Imaginalis • Linh Hồn Giả Kim
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
