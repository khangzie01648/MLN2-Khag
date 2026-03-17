'use client';

import React, { useMemo, useRef, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Float, ContactShadows, Center, Stage, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

// Component rendering actual 5-pointed stars in fixed patterns
function DragonStars({ count }: { count: number }) {
    const starColor = "#ff0000";

    const starShape = useMemo(() => {
        const shape = new THREE.Shape();
        const outerRadius = 55; // Larger stars
        const innerRadius = 22;
        const points = 5;
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        }
        shape.closePath();
        return shape;
    }, []);

    const extrudeSettings = { depth: 25, bevelEnabled: false };

    // Precise Canon star patterns mapped 100% to the reference image
    const getStarPositions = (n: number): [number, number, number][] => {
        const gap = 130;
        switch (n) {
            case 1: return [[0, 0, 0]];
            case 2: return [[-gap, 0, 0], [gap, 0, 0]]; // Horizontal Pair
            case 3: return [[0, gap * 1.1, 0], [-gap * 1.1, -gap / 2, 0], [gap * 1.1, -gap / 2, 0]]; // Triangle
            case 4: return [[-gap, gap, 0], [gap, gap, 0], [-gap, -gap, 0], [gap, -gap, 0]]; // Square
            case 5: return [[0, 0, 0], [-gap, gap, 0], [gap, gap, 0], [-gap, -gap, 0], [gap, -gap, 0]]; // Dice-5
            case 6: {
                // 1 Center Star + 5 stars in a pentagonal ring (per user request)
                const result: [number, number, number][] = [[0, 0, 0]];
                for (let i = 0; i < 5; i++) {
                    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                    result.push([Math.cos(angle) * gap * 1.4, Math.sin(angle) * gap * 1.4, 0]);
                }
                return result;
            }
            case 7: {
                // 1 center + 6 ring (100% Identical to reference image)
                const result: [number, number, number][] = [[0, 0, 0]];
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                    result.push([Math.cos(angle) * gap * 1.5, Math.sin(angle) * gap * 1.5, 0]);
                }
                return result;
            }
            default: return [[0, 0, 0]];
        }
    };

    const positions = getStarPositions(count);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // FORCE BILLBOARDING: Ensuring the grid pattern always faces the camera
            groupRef.current.quaternion.copy(state.camera.quaternion);
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 130]}>
            {positions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <extrudeGeometry args={[starShape, extrudeSettings]} />
                    <meshStandardMaterial
                        color="#ff0000"
                        emissive="#ff0000"
                        emissiveIntensity={25}
                        toneMapped={false}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Dragon Ball Component
function DragonBall({ position, index, article, pillarId }: {
    position: [number, number, number],
    index: number,
    article?: any,
    pillarId: string
}) {
    const ballRef = useRef<THREE.Group>(null);
    const starCount = (index % 7) + 1;

    useFrame((state) => {
        if (ballRef.current) {
            const time = state.clock.getElapsedTime();
            ballRef.current.rotation.y = Math.sin(time * 0.2) * 0.2; // Subtle sway
        }
    });

    const [hovered, setHover] = React.useState(false);

    // Navigate to the dedicated article page (URL transition)
    const handleClick = () => {
        if (article) {
            window.location.href = `/select/door/${pillarId}/reading/${article.slug}`;
        }
    };

    return (
        <group
            position={position}
            ref={ballRef}
            onClick={handleClick}
            onPointerOver={() => {
                setHover(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHover(false);
                document.body.style.cursor = 'auto';
            }}
        >
            <mesh>
                <sphereGeometry args={[400, 64, 64]} />
                <meshPhysicalMaterial
                    color="#ffa500"
                    transmission={1.1}
                    thickness={50}
                    roughness={0}
                    ior={1.3}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    attenuationColor="#ffaa00"
                    attenuationDistance={2000}
                />
            </mesh>
            <DragonStars count={starCount} />
            <pointLight intensity={hovered ? 60000 : 15000} distance={800} color="#ffaa00" />

            {/* MODERN GLASSMORPISM LABEL */}
            {hovered && article && (
                <Html position={[0, 700, 0]} center distanceFactor={2500}>
                    <div className="bg-black/40 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-orange-500/30 flex items-center gap-4 animate-in fade-in zoom-in duration-300 pointer-events-none">
                        <div className="flex gap-1">
                            {[...Array(starCount)].map((_, i) => (
                                <span key={i} className="text-orange-500 text-xs shadow-[0_0_10px_rgba(255,165,0,0.8)]">★</span>
                            ))}
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <span className="text-white text-[11px] font-bold tracking-[0.3em] uppercase truncate max-w-[300px]">
                            {article.title}
                        </span>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Dragon Ball System (Mapping directly to articles)
function DragonBallSystem({ articles, pillarId }: { articles: any[], pillarId: string }) {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 3000;

    const balls = useMemo(() => {
        return [...Array(7)].map((_, i) => {
            const angle = (i / 7) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = 1500;
            return { x, y, z };
        });
    }, [radius]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {balls.map((pos, i) => (
                <DragonBall
                    key={i}
                    index={i}
                    position={[pos.x, pos.y, pos.z]}
                    article={articles[i]}
                    pillarId={pillarId}
                />
            ))}
        </group>
    );
}

interface PillarPageProps {
    pillar: {
        id: string;
        name: string;
        nameVi: string;
        color: string;
        description: string;
        Object: any;
        baseScale?: number;
    };
    articles: Array<{
        slug: string;
        title: string;
        description: string;
        order?: number;
    }>;
}

// 3D Model Component (Central Diorama)
function DioramaModel({ ObjectComponent, scale }: { ObjectComponent: any, scale: number }) {
    const { scene } = useGLTF('/dangerous_beauty.glb');

    return (
        <group>
            {/* THE TREE: Always present as requested */}
            <primitive object={scene} scale={4} position={[0, -500, 0]} />

            {/* THEMATIC OBJECT: Positioned at the base of the tree if it exists */}
            {ObjectComponent && (
                <group position={[0, 100, 800]} scale={[scale * 0.8, scale * 0.8, scale * 0.8]}>
                    <ObjectComponent isHovered={false} />
                </group>
            )}
        </group>
    );
}

export default function PillarPageTemplate({ pillar, articles }: PillarPageProps) {
    const [mounted, setMounted] = React.useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const videoSrc = useMemo(() => {
        const videoMap: Record<string, string> = {
            'biography': '/videos/bg01.mp4',
            'economics': '/videos/bg02.mp4',
            'ethics': '/videos/bg03.mp4',
            'politics': '/videos/bg04.mp4',
            'literature': '/videos/bg05.mp4',
            'systems': '/videos/bg06.mp4',
            'legacy': '/videos/bg07.mp4'
        };
        return videoMap[pillar.id] || '/videos/bg01.mp4';
    }, [pillar.id]);

    return (
        <div 
            ref={containerRef} 
            className="relative min-h-[200vh] bg-black text-white overflow-x-hidden"
            suppressHydrationWarning
        >
            {/* STABLE INITIALIZING SCREEN - Fixed Forever hydration logic */}
            <div 
                className={`fixed inset-0 z-[999] bg-black flex items-center justify-center transition-opacity duration-1000 ${
                    mounted ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <div className="text-white/10 uppercase tracking-[2em] text-xs">
                    Mindscape Initializing
                </div>
            </div>

            {/* CONTENT LAYER - Only active when client-side logic is ready */}
            {mounted && (
                <>
                    {/* STICKY BACKGROUND VIDEO */}
                    <motion.div style={{ opacity: videoOpacity }} className="fixed inset-0 z-0 bg-black">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <video key={videoSrc} autoPlay muted loop playsInline className="w-full h-full object-cover">
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    </motion.div>

                    {/* SECTION 1: HERO TITLE */}
                    <section className="relative z-10 h-screen flex flex-col items-center justify-center p-8 text-center max-w-7xl mx-auto">
                        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="flex flex-col items-center gap-8">
                            <div className="px-8 py-2 border border-white/30 rounded-full backdrop-blur-xl bg-black/20">
                                <span className="text-[12px] tracking-[1em] uppercase text-white/80 font-bold">Pillar / {pillar.id}</span>
                            </div>
                            <h1 className="text-7xl md:text-[10rem] font-serif font-black tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_80px_rgba(0,0,0,0.9)]">{pillar.name}</h1>
                            <h2 className="text-4xl md:text-6xl font-light tracking-[0.5em] uppercase mt-4" style={{ color: pillar.color }}>{pillar.nameVi}</h2>
                            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-4" />
                            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl italic">{pillar.description}</p>
                        </motion.div>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-12 flex flex-col items-center gap-2 opacity-40">
                            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
                            <div className="w-[1px] h-12 bg-white/40" />
                        </motion.div>
                    </section>

                    {/* SECTION 2: THE DIORAMA & DRAGON BALLS */}
                    <section className="relative z-20 h-screen bg-transparent flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0">
                            <Canvas camera={{ position: [0, 1500, 8000], fov: 45, far: 10000000 }}>
                                <ambientLight intensity={0.5} />
                                <Environment preset="night" />
                                <Suspense fallback={null}>
                                    <Stage environment="city" intensity={1} adjustCamera={true}>
                                        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                                            <DioramaModel ObjectComponent={pillar.Object} scale={pillar.baseScale || 1.6} />
                                            {/* 7 DRAGON BALLS NOW PERFECTLY CENTERED WITH THE TREE */}
                                            <DragonBallSystem articles={articles} pillarId={pillar.id} />
                                        </Float>
                                    </Stage>
                                    <EffectComposer>
                                        <Bloom intensity={0.02} luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur />
                                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                                    </EffectComposer>
                                    <Sparkles count={200} scale={30} size={2} speed={0.4} opacity={0.3} color={pillar.color} />
                                </Suspense>
                                <OrbitControls enableZoom={false} makeDefault />
                            </Canvas>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
