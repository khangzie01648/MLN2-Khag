"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { PillarConfig } from "@/lib/types";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { PerspectiveCamera, Stars, Text, Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import KnowledgeTree from "../3d/objects/KnowledgeTree";
import GalaxyBackground from "../3d/backgrounds/GalaxyBackground";
import PillarVisualizer from "../3d/PillarVisualizer";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, Glitch, Scanline, Bloom as BloomEffect } from "@react-three/postprocessing";
import * as THREE from 'three';
import * as Tone from 'tone';

interface NexusLayoutProps {
    pillar: PillarConfig;
    allPillars?: PillarConfig[];
}

/**
 * --- SUPREME NEXUS: THE PSYCHEDELIC MONOLITH ---
 * Concept: "Hallucinating Reality".
 * Features: Liquid UI, Parallax Distortion, Generative Dreamscapes, Holographic Cards.
 */
export default function NexusLayout({ pillar }: NexusLayoutProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [time, setTime] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setIsMounted(true);
        const updater = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        updater();
        const itv = setInterval(updater, 1000);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearInterval(itv);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // DREAM LOGIC AUDIO
    const initDreamSync = async () => {
        await Tone.start();
        const reverb = new Tone.Reverb(5).toDestination();
        const synth = new Tone.PolySynth(Tone.Synth).connect(reverb);
        synth.set({ envelope: { attack: 4, release: 8 }, oscillator: { type: "sine" } });
        synth.triggerAttackRelease(["E2", "B2", "E3"], "4n");
        setIsAuthorized(true);
    };

    if (!isMounted) return <div className="h-screen w-full bg-black" />;

    return (
        <main className="h-screen w-full bg-[#1a0500] text-[#e0e0e0] relative font-sans overflow-hidden select-none" suppressHydrationWarning>

            {/* AMBIENT LAYERS: FILM GRAIN & LIQUID DISTORTION */}
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <motion.div
                className="fixed inset-0 z-[101] pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.05)_0%,transparent_100%)]"
                style={{
                    '--x': '50%',
                    '--y': '50%'
                } as any}
                animate={{
                    '--x': `${50 + mouse.current.x * 20}%`,
                    '--y': `${50 - mouse.current.y * 20}%`,
                } as any}
            />

            {/* --- PHASE 1: THE RADIANT AWAKENING (HALLUCINOGENIC ENTRY) --- */}
            <AnimatePresence>
                {!isAuthorized && (
                    <motion.div
                        key="entry"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 8,
                            rotate: 45,
                            filter: "brightness(5) contrast(2) blur(200px)",
                            transition: { duration: 3, ease: [0.76, 0, 0.24, 1] }
                        }}
                        className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-crosshair"
                    >
                        {/* 3D GALAXY CORE */}
                        <div className="absolute inset-0 z-0">
                            <Canvas dpr={1} camera={{ position: [0, 60, 100], fov: 45 }}>
                                <color attach="background" args={['#1a0500']} />
                                <fog attach="fog" args={['#1a0500', 50, 300]} />
                                <ambientLight intensity={0.5} />
                                <pointLight position={[100, 100, 100]} color="#ffaa00" intensity={2} />
                                <Sparkles count={200} scale={100} size={4} speed={0.4} opacity={0.5} color="#d4af37" />
                                <EffectComposer>
                                    <Bloom intensity={1.5} mipmapBlur luminanceThreshold={0.5} />
                                    <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
                                </EffectComposer>
                                <Rig />
                            </Canvas>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-24">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="flex flex-col items-center text-center w-full px-4"
                            >
                                <motion.span
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-[10px] md:text-sm font-mono text-white/30 tracking-[1em] uppercase mb-12 md:mb-24"
                                >
                                    Accessing _ Collective _ Unconscious
                                </motion.span>

                                <h1
                                    className="text-[12vw] md:text-[8vw] font-cinzel font-black tracking-[-0.02em] leading-none uppercase select-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center"
                                >
                                    {pillar.name}
                                </h1>

                                <div className="mt-8 md:mt-12 flex gap-4 opacity-100">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-16 h-[2px] bg-white/40"
                                            animate={{ scaleX: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            <motion.button
                                onClick={initDreamSync}
                                className="group relative w-full max-w-lg py-6 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 hover:border-[#d4af37] backdrop-blur-md transition-all duration-300 mt-24 flex items-center justify-center gap-4 rounded-sm"
                            >
                                <span className="text-[12px] md:text-[14px] font-mono tracking-[0.5em] text-white group-hover:text-amber-300 uppercase font-bold">
                                    [ CLICK TO ENTER ]
                                </span>
                            </motion.button>
                        </div>

                        {/* HUD STRINGS */}
                        <div className="absolute left-20 bottom-20 flex flex-col gap-4 font-mono text-[9px] text-white/10 uppercase tracking-[2em]">
                            <span>Registry_Protocol_X4</span>
                            <span>Neural_Density_Syncing...</span>
                            <div className="w-80 h-[1px] bg-white/5 relative overflow-hidden">
                                <motion.div className="h-full bg-white/40" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- PHASE 2: THE IMMERSED ARCHIVE (ULTRA 3D) --- */}
            <div className={`absolute inset-0 z-0 transition-all duration-[4000ms] ${isAuthorized ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <Canvas gl={{ antialias: false, alpha: false, stencil: false, depth: true }} dpr={1}>
                    <PerspectiveCamera makeDefault position={[0, 70, 130]} fov={30} />
                    <Suspense fallback={null}>
                        {/* THE CENTERAL GENERATIVE ARTIFACT */}
                        <group scale={1.2}>
                            <PillarVisualizer pillarId={pillar.id} color={pillar.color} />
                        </group>

                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffaa00" />
                        <color attach="background" args={['#1a0500']} />
                        <fog attach="fog" args={['#1a0500', 100, 400]} />
                        <EffectComposer>
                            <BloomEffect intensity={1.5} mipmapBlur luminanceThreshold={0.2} radius={0.6} />
                            <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
                            <Vignette eskil={false} offset={0.1} darkness={1.1} />
                            <Scanline opacity={0.05} />
                            <Noise opacity={0.05} />
                        </EffectComposer>
                        <Environment preset="city" />
                    </Suspense>
                    <HallucinatingRig isAuthorized={isAuthorized} />
                </Canvas>
            </div>

            {/* --- SUPREME LIQUID UI OVERLAY --- */}
            <div className={`absolute inset-0 z-50 pointer-events-none flex flex-col justify-between transition-all duration-[3000ms] ${isAuthorized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-60 blur-3xl'}`}>

                {/* HUD: THE MEGA TITLES (LEFT PANEL) */}
                <div className="absolute left-0 top-0 h-full w-full md:w-[45%] flex flex-col justify-center px-12 md:pl-24 z-10 pointer-events-none">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={isAuthorized ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="relative"
                    >
                        <span className="text-[12px] font-mono text-amber-500 tracking-[0.5em] uppercase block mb-4 font-bold border-l-2 border-amber-500 pl-4">Archive_Alpha_Singularity</span>

                        <h2 className="text-[5rem] md:text-[7rem] font-cinzel font-black tracking-tighter text-white uppercase leading-[0.9] drop-shadow-2xl max-w-2xl">
                            {pillar.nameVi}
                        </h2>

                        <div className="mt-12 border-t border-white/10 pt-8 max-w-md">
                            <div className="flex gap-12 mb-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Locus_Count</span>
                                    <span className="text-3xl font-mono text-white/80">{pillar.articles.length}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Protocol</span>
                                    <span className="text-3xl font-mono text-amber-500">ACTIVE</span>
                                </div>
                            </div>
                            <p className="text-sm md:text-base font-cinzel text-white/60 italic tracking-widest leading-relaxed border-l border-white/20 pl-6">
                                "{pillar.description}"
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* THE DATA GRID ARCHIVE (RIGHT PANEL - CINEMATIC) */}
                <div className="absolute right-0 top-0 h-full w-full md:w-[60%] bg-gradient-to-l from-[#020202] via-[#050505]/95 to-transparent flex flex-col justify-center items-end pr-8 md:pr-16 pointer-events-auto overflow-y-auto overflow-x-hidden pt-32 pb-32 pl-12 backdrop-blur-[2px]">

                    <div className="w-full max-w-4xl flex flex-col items-end mb-12 border-b border-white/5 pb-6 mr-2 relative">
                        <div className="absolute top-0 right-0 w-32 h-1 bg-amber-500 shadow-[0_0_20px_rgba(255,191,0,0.5)]" />
                        <span className="text-[10px] font-mono text-amber-500/80 uppercase tracking-[0.5em] mb-3 text-right block font-bold">Sector_Analysis // {pillar.id.toUpperCase()}</span>
                        <h3 className="text-2xl md:text-4xl font-cinzel text-white/90 text-right drop-shadow-md">
                            Dữ Liệu Tổng Hợp: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{pillar.nameVi}</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4 perspective-1000">
                        {pillar.articles.map((art, idx) => (
                            <motion.div
                                key={art.slug}
                                initial={{ x: 50, opacity: 0 }}
                                animate={isAuthorized ? { x: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + idx * 0.05, ease: "easeOut" }}
                                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 10 }}
                                className="group"
                            >
                                <Link
                                    href={`/reading/${art.slug}`}
                                    className="relative block h-full bg-black/40 hover:bg-white/[0.03] border border-white/5 hover:border-amber-500/40 p-8 transition-all duration-500 rounded-sm overflow-hidden backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] ring-1 ring-white/5"
                                    onMouseEnter={() => {
                                        if (isAuthorized) {
                                            const synth = new Tone.MembraneSynth().toDestination();
                                            synth.volume.value = -30;
                                            synth.triggerAttackRelease("G1", "32n");
                                        }
                                    }}
                                >
                                    {/* Holographic Sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    {/* Tech Corners */}
                                    <div className="absolute top-0 right-0 w-[10px] h-[10px] border-t-2 border-r-2 border-amber-500/30 group-hover:border-amber-500 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-[10px] h-[10px] border-b-2 border-l-2 border-white/10 group-hover:border-white/50 transition-colors" />

                                    {/* Content */}
                                    <div className="flex flex-col h-full justify-between gap-6 relative z-10 transition-transform duration-500 group-hover:translate-z-10">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="font-mono text-[9px] text-amber-500/60 tracking-[0.2em] border border-amber-500/10 bg-amber-900/10 px-2 py-1 rounded inline-block">
                                                    REF-{String(idx).padStart(2, '0')}
                                                </span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-amber-400 group-hover:shadow-[0_0_15px_orange] transition-all" />
                                            </div>

                                            <h4 className="font-cinzel text-xl md:text-2xl text-white/80 group-hover:text-white leading-tight transition-colors duration-300">
                                                {art.title}
                                            </h4>
                                        </div>

                                        <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                            <span className="text-[10px] font-mono text-white/30 group-hover:text-amber-500 uppercase tracking-widest transition-colors flex items-center gap-2">
                                                <span className="w-1 h-1 bg-current rounded-full" />
                                                DECRYPT_FILE
                                            </span>
                                            <span className="font-cinzel text-xl text-white/10 group-hover:text-white transition-all group-hover:translate-x-2 group-hover:scale-125">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* THE VOID FOOTER */}
                <div className="absolute bottom-0 left-0 w-full p-12 flex justify-between items-end pointer-events-auto z-20">
                    <Link href="/select" className="group flex flex-col gap-8">
                        <div className="w-24 h-24 border-[1px] border-white/10 rounded-full flex items-center justify-center group-hover:border-amber-500 group-hover:scale-110 transition-all duration-[1s] group-hover:shadow-[0_0_50px_rgba(255,191,0,0.3)] relative bg-black/50 backdrop-blur-sm">
                            <span className="text-white/40 group-hover:text-white text-3xl relative z-10 transition-all font-light">←</span>
                        </div>
                        <span className="text-[12px] font-mono tracking-[0.3em] text-white/20 group-hover:text-amber-500 transition-all uppercase">Return_To_Nexus</span>
                    </Link>

                    <div className="flex flex-col items-end gap-2 opacity-30 hover:opacity-100 transition-opacity duration-[1s]">
                        <span className="text-[18rem] font-mono text-white/5 tracking-tighter leading-none select-none italic font-black absolute bottom-[-5rem] right-0 pointer-events-none">{time}</span>
                        <div className="flex gap-2 h-12 items-end mb-4">
                            {[...Array(40)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [4, Math.random() * 30 + 4, 4] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                    className="w-[2px] bg-amber-500/40"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Rig() {
    useFrame((state) => {
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

function HallucinatingRig({ isAuthorized }: { isAuthorized: boolean }) {
    useFrame((state) => {
        if (!isAuthorized) return;
        const time = state.clock.elapsedTime;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(time * 0.1) * 100 + state.pointer.x * 80, 0.03);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(time * 0.1) * 60 + state.pointer.y * 60, 0.03);
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 140 + Math.sin(time * 0.2) * 50, 0.02);
        state.camera.lookAt(0, 0, 0);
        state.camera.rotation.z = Math.sin(time * 0.1) * 0.05;
    });
    return null;
}
