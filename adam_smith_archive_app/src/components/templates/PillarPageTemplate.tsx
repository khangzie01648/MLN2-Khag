'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Float, Sparkles, Torus, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import DataNavigation from '../3d/DataNavigation';
import ThematicEntrance from '../transitions/ThematicEntrance';
import MeteorEffect from '../ui/effects/MeteorEffect';

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

export default function PillarPageTemplate({ pillar, articles }: PillarPageProps) {
    const [isDiving, setIsDiving] = useState(false);
    const [activeCell, setActiveCell] = useState<any>(null);
    const ObjectComponent = pillar.Object;

    // Load full JSON data for DNA Helix if diving
    const [lobeData, setLobeData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const initiateDive = async () => {
        setLoading(true);
        try {
            // Mapping pillar IDs to actual JSON filenames
            const fileMap: Record<string, string> = {
                'biography': '01_Tieu_Su_Cuoc_Doi_Full.json',
                'economics': '02_Kinh_Te_Thinh_Vuong_Full.json',
                'ethics': '03_Dao_Duc_Triet_Hoc_Full.json',
                'law': '04_Phap_Luat_Chinh_Tri_Full.json',
                'rhetoric': '05_Tu_Tuong_Ngon_Ngu_Full.json'
            };

            const fileName = fileMap[pillar.id] || `${pillar.id}_Full.json`;
            const jsonPath = `/data/${fileName}`;
            const res = await fetch(jsonPath);
            const data = await res.json();
            setLobeData(data);
            setIsDiving(true);
        } catch (e) {
            console.error("Failed to load navigation data", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white selection:bg-[#ffd700] selection:text-black overflow-x-hidden" suppressHydrationWarning>
            <MeteorEffect />
            <ThematicEntrance key={pillar.id} pillarId={pillar.id} color={pillar.color} />

            {/* Cinematic Background - Subtle Alchemical Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ffd700] opacity-[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ffaa00] opacity-[0.03] blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-16">
                    <Link
                        href="/select"
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ffd700]/50 transition-all group"
                    >
                        <span className="text-[#ffd700] group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="text-sm tracking-[0.3em] font-light uppercase text-white/70 group-hover:text-white">Trở về Cửa Ải</span>
                    </Link>

                    {isDiving && (
                        <button
                            onClick={() => setIsDiving(false)}
                            className="text-[10px] tracking-[0.5em] text-[#ffd700] font-bold border border-[#ffd700]/30 px-6 py-2 hover:bg-[#ffd700] hover:text-black transition-all"
                        >
                            TERMINATE CORTEX LINK
                        </button>
                    )}
                </div>

                {/* HERO SECTION - Horizontal Layout */}
                {!isDiving && (
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-24">
                        {/* Hero 3D Artifact */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-b from-[#ffd700]/20 to-transparent rounded-2xl blur opacity-20 pointer-events-none" />
                                <div className="h-[400px] lg:h-[500px] w-full bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 relative">
                                    <Canvas gl={{
                                        antialias: true,
                                        toneMappingExposure: 2.8,
                                        powerPreference: "high-performance"
                                    }} dpr={[1, 2]}>
                                        <PerspectiveCamera makeDefault position={[0, 0, 130]} fov={45} />
                                        <ambientLight intensity={0.6} />
                                        <pointLight position={[60, 60, 60]} intensity={2.5} color="#ffffff" />
                                        <pointLight position={[-60, -60, 60]} intensity={1.5} color={pillar.color} />

                                        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
                                            <group scale={(pillar.baseScale || 1.0) * 2.2}>
                                                {ObjectComponent && <ObjectComponent isHovered={true} />}
                                            </group>
                                        </Float>

                                        <EffectComposer multisampling={8}>
                                            <Bloom luminanceThreshold={0.9} intensity={0.6} mipmapBlur radius={0.4} />
                                            <ChromaticAberration offset={new THREE.Vector2(0.0004, 0.0004)} />
                                            <Vignette eskil={false} offset={0.05} darkness={1.2} />
                                        </EffectComposer>
                                    </Canvas>
                                </div>
                            </div>
                        </div>

                        {/* Hero Text Context */}
                        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                            <div className="inline-block px-4 py-1 border border-[#ffd700]/30 rounded-full mb-4">
                                <span className="text-[10px] tracking-[0.5em] uppercase text-[#ffd700]">Lưu trữ Nguyên mẫu</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-serif italic tracking-[0.1em] text-[#ffd700] drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                                {pillar.nameVi}
                            </h1>
                            <p className="max-w-xl text-white/50 text-xl font-light leading-relaxed italic mx-auto lg:ml-0">
                                {pillar.description}
                            </p>

                            <div className="pt-10">
                                <button
                                    onClick={initiateDive}
                                    disabled={loading}
                                    className="px-12 py-5 border-2 border-[#ffd700] text-[#ffd700] font-black hover:bg-[#ffd700] hover:text-black transition-all tracking-[0.4em] text-xs flex items-center justify-center gap-4 group mx-auto lg:ml-0"
                                >
                                    {loading ? 'SYNCHRONIZING...' : 'DIVE INTO CORTEX'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3D DATA NAVIGATION (IS DIVING) */}
                <AnimatePresence>
                    {isDiving && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-[70vh] w-full bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden mb-24"
                        >
                            <Canvas camera={{ position: [0, 20, 50], fov: 45 }}>
                                <color attach="background" args={['#020202']} />
                                <fog attach="fog" args={['#020202', 30, 120]} />
                                <ambientLight intensity={0.5} />
                                <pointLight position={[20, 20, 20]} intensity={2} color="#daa520" />
                                <Sparkles count={400} size={2.5} speed={0.4} opacity={0.2} scale={30} color="#daa520" />

                                <DataNavigation
                                    data={lobeData}
                                    activeLobe={{
                                        id: pillar.id,
                                        title: pillar.nameVi,
                                        color: pillar.color,
                                        position: [0, 0, 0]
                                    }}
                                    onCellClick={(cell) => setActiveCell(cell)}
                                />
                                <OrbitControls />
                            </Canvas>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* READER INTERFACE */}
                <AnimatePresence>
                    {activeCell && (
                        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-20">
                            <div className="max-w-4xl w-full h-full flex flex-col pt-20">
                                <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
                                    <h3 className="text-4xl font-bold tracking-tight">{activeCell.name}</h3>
                                    <button onClick={() => setActiveCell(null)} className="text-[10px] tracking-[0.4em] border border-white/20 px-10 py-3 hover:bg-white hover:text-black transition-all font-bold">CLOSE</button>
                                </div>
                                <div className="flex-1 overflow-y-auto pr-8 space-y-12">
                                    {activeCell.paragraphs.map((p: string, i: number) => (
                                        <p key={i} className="text-xl normal-case text-gray-300 leading-[1.8] font-light indent-16">{p}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                {/* CONTENT SECTION - Grid Layout (HIDE IF DIVING) */}
                {!isDiving && (
                    <div className="space-y-12">
                        <header className="flex items-center gap-8">
                            <h2 className="text-xs tracking-[0.8em] font-light uppercase text-white/30 whitespace-nowrap">Danh mục Hồ sơ</h2>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {articles.map((article, index) => (
                                <Link
                                    key={article.slug}
                                    href={`/select/pillar/${pillar.id}/reading/${article.slug}`}
                                    className="group block relative"
                                >
                                    <div className="relative bg-white/[0.03] backdrop-blur-xl p-8 rounded-xl border border-white/10 group-hover:border-[#ffd700]/30 transition-all duration-500">
                                        <h3 className="text-xl font-serif tracking-widest">{article.title}</h3>
                                        <p className="mt-3 text-white/30 text-sm line-clamp-1">{article.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
