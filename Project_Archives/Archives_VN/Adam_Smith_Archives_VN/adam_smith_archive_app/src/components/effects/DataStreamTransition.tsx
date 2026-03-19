"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface DataStreamTransitionProps {
    isActive: boolean;
    pathId?: string;
    onComplete?: () => void;
}

export default function DataStreamTransition({ isActive, pathId, onComplete }: DataStreamTransitionProps) {
    const isPhilosophy = pathId === "triet-hoc";

    useEffect(() => {
        if (isActive) {
            // If philosophy, we go for an "unrestricted" 7-second deep dive
            const duration = isPhilosophy ? 7000 : 1500;
            const timer = setTimeout(() => {
                onComplete?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete, isPhilosophy]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-[150] bg-[#020205] flex flex-col items-center justify-center pointer-events-auto overflow-hidden">
            {/* BACKGROUND DEPTH (Persistent) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent)]" />

            <AnimatePresence>
                {/* PHILOSOPHY PATH: THE UNRESTRICTED JOURNEY */}
                {isPhilosophy && (
                    <motion.div
                        key="philosophy-transition"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Infinite Geometric Web (The Constellation feel) */}
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={`line-${i}`}
                                className="absolute border-t border-cyan-500/20"
                                initial={{ width: 0, x: "-50%", y: "-50%" }}
                                animate={{
                                    width: ["0vw", "200vw"],
                                    rotate: [i * 12, i * 12 + 360],
                                    opacity: [0, 0.4, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}

                        {/* Pulsating Logic Nodes */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`node-${i}`}
                                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{
                                    scale: [0, 2, 0],
                                    opacity: [0, 0.8, 0]
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            />
                        ))}

                        <div className="relative z-10 text-center">
                            <motion.h2
                                animate={{
                                    letterSpacing: ["0.2em", "1.5em", "0.2em"],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-white font-cinzel text-4xl uppercase mb-4"
                            >
                                The Constellation of Ideas
                            </motion.h2>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-cyan-400" />
                                <span className="text-cyan-400 text-[10px] tracking-[1em] uppercase">Calculating Infinite Connections</span>
                                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-cyan-400" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* DEFAULT PATH TRANSITION (Biography & Works) */}
                {!isPhilosophy && (
                    <motion.div
                        key="default-transition"
                        className="relative z-10 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"]
                            }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="w-24 h-24 border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center"
                        >
                            <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                        </motion.div>
                        <p className="mt-8 text-[10px] tracking-[1em] uppercase text-white/40">Initializing Node</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Persistent Scan Line */}
            <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-50"
            />
        </div>
    );
}
