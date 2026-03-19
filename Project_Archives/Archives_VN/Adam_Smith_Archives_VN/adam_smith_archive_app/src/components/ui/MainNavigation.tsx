"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PILLARS, PillarConfig } from "@/lib/pillar-constants";

interface MainNavigationProps {
    onNavigate?: (path: string) => void;
}

// Map pillar IDs to specific visual styles
const pillarStyles: Record<string, { gradient: string; accent: string; delay: number }> = {
    "biography": {
        gradient: "from-blue-600 via-cyan-500 to-teal-400",
        accent: "#0ea5e9",
        delay: 0
    },
    "concepts": {
        gradient: "from-amber-600 via-orange-500 to-rose-400",
        accent: "#f59e0b",
        delay: 0.05
    },
    "practice": {
        gradient: "from-emerald-600 via-green-500 to-lime-400",
        accent: "#10b981",
        delay: 0.1
    },
    "red-book": {
        gradient: "from-rose-600 via-red-500 to-orange-400",
        accent: "#f43f5e",
        delay: 0.15
    },
    "alchemy": {
        gradient: "from-yellow-600 via-amber-500 to-orange-400",
        accent: "#fbbf24",
        delay: 0.2
    },
    "spirit": {
        gradient: "from-purple-600 via-violet-500 to-fuchsia-400",
        accent: "#a855f7",
        delay: 0.25
    },
    "synchronicity": {
        gradient: "from-indigo-600 via-blue-500 to-cyan-400",
        accent: "#6366f1",
        delay: 0.3
    },
    "works": {
        gradient: "from-slate-600 via-gray-500 to-zinc-400",
        accent: "#64748b",
        delay: 0.35
    }
};

export default function MainNavigation({ onNavigate }: MainNavigationProps) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    // --- 3D TILT LOGIC ---
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        setMousePos({
            x: (clientX / window.innerWidth - 0.5) * 20,
            y: (clientY / window.innerHeight - 0.5) * 20
        });
    };

    return (
        <div
            className="min-h-screen w-full bg-transparent relative overflow-hidden font-sans"
            onMouseMove={handleMouseMove}
        >
            {/* NOISE OVERLAY (Persistent Cinematic Grain) */}
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* ETHEREAL FLOATING ORBS (Synced with Mouse for Parallax) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`orb-${i}`}
                        className="absolute rounded-full blur-[140px] opacity-20"
                        animate={{
                            x: [0, (i % 2 === 0 ? 1 : -1) * 100, 0],
                            y: [0, (i % 3 === 0 ? -1 : 1) * 100, 0],
                            scale: [1, 1.2, 0.9, 1]
                        }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        style={{
                            width: `${600 + i * 200}px`,
                            height: `${600 + i * 200}px`,
                            background: i % 2 === 0 ? "#0ea5e9" : "#a855f7",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `translate(${mousePos.x * (i + 1)}px, ${mousePos.y * (i + 1)}px)`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-screen">
                {/* Header with Holographic Glitch */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="text-center mb-12"
                >
                    <div className="relative inline-block">
                        <motion.h1
                            className="text-6xl md:text-8xl font-cinzel font-bold text-white tracking-widest relative z-10 mix-blend-difference"
                            animate={{ opacity: [0.8, 1, 0.9, 1], skewX: [0, 1, -1, 0] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            THE ADAM SMITH ARCHIVE
                        </motion.h1>
                        {/* Glitch Shadows */}
                        <motion.h1
                            className="absolute inset-0 text-6xl md:text-8xl font-cinzel font-bold text-cyan-500 opacity-30 -z-10 translate-x-1"
                            animate={{ x: [-2, 2, -2] }}
                            transition={{ duration: 0.1, repeat: Infinity }}
                        >
                            THE ADAM SMITH ARCHIVE
                        </motion.h1>
                        <motion.h1
                            className="absolute inset-0 text-6xl md:text-8xl font-cinzel font-bold text-rose-500 opacity-30 -z-10 -translate-x-1"
                            animate={{ x: [2, -2, 2] }}
                            transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
                        >
                            THE ADAM SMITH ARCHIVE
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Path Cards - 4 Columns for 4 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-[1600px] perspective-[2000px]">
                    {PILLARS.map((pillar, index) => {
                        const style = pillarStyles[pillar.id] || pillarStyles["tieu-su"];
                        return (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5 + style.delay }}
                                onHoverStart={() => setHoveredCard(pillar.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                onClick={() => onNavigate?.(pillar.id)}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: hoveredCard === pillar.id
                                        ? `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) scale(1.05)`
                                        : `rotateY(0deg) rotateX(0deg) scale(1)`
                                }}
                                className="group relative cursor-pointer transition-transform duration-300 ease-out h-[550px]"
                            >
                                <div className="relative h-full bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] overflow-hidden group-hover:bg-white/[0.05] group-hover:border-white/20 transition-all duration-700 shadow-2xl flex flex-col justify-between p-8">

                                    {/* Deep Glow for Card */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-[0.15] transition-opacity duration-1000`}
                                    />

                                    {/* Floating Archetype Grid (Inside Card) */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                                    </div>

                                    <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(60px)" }}>
                                        <div>
                                            {/* Floating Icon Sphere */}
                                            <motion.div
                                                className="w-24 h-24 rounded-[2rem] bg-white/[0.03] border border-white/[0.1] flex items-center justify-center text-5xl mb-8 relative shadow-[0_0_50px_rgba(255,255,255,0.05)] mx-auto"
                                                animate={{
                                                    y: [0, -10, 0],
                                                    rotate: [0, 5, -5, 0]
                                                }}
                                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 1 }}
                                            >
                                                {pillar.icon}
                                                <motion.div
                                                    className="absolute inset-0 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-40"
                                                    style={{ background: style.accent }}
                                                />
                                            </motion.div>

                                            <h2 className="text-3xl font-cinzel font-bold text-white mb-4 uppercase tracking-tighter group-hover:tracking-normal transition-all duration-700 text-center">
                                                {pillar.name}
                                            </h2>

                                            <div className="flex items-center justify-center gap-2 mb-6">
                                                <div className="h-[1px] w-8 bg-current" style={{ color: style.accent }} />
                                                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/60 text-center">
                                                    {pillar.subtitle}
                                                </span>
                                                <div className="h-[1px] w-8 bg-current" style={{ color: style.accent }} />
                                            </div>

                                            <p className="text-slate-400 text-sm leading-relaxed font-light text-center group-hover:text-slate-200 transition-colors line-clamp-4">
                                                {pillar.description}
                                            </p>
                                        </div>

                                        {/* Advanced CTA */}
                                        <div className="relative overflow-hidden group/btn pt-6 mt-4 border-t border-white/5">
                                            <div className="flex items-center justify-between gap-4 group-hover:gap-6 transition-all duration-700">
                                                <span className="text-white/40 text-[10px] tracking-[0.5em] group-hover:text-white font-medium uppercase">Access</span>
                                                <span className="text-xl text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all duration-700">➔</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Global Footer Elements */}
                <div className="mt-16 flex justify-center gap-20 opacity-20 hover:opacity-100 transition-opacity duration-1000">
                    {["ARCHETYPE", "COLLECTIVE", "INDIVIDUATION", "ALCHEMY"].map(text => (
                        <span key={text} className="text-[10px] tracking-[1.5em] text-white uppercase font-light cursor-default hidden md:inline-block">
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
