"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface OuroborosProps {
    color?: string;
}

export default function OuroborosProgress({ color = "#fbbf24" }: OuroborosProps) {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setPercent(Math.round(latest * 100));
        });
    }, [scrollYProgress]);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden lg:flex flex-col items-center gap-4">
            <div className="text-[10px] font-mono text-white/20 vertical-text tracking-widest uppercase">
                Spirit Scroll
            </div>

            <div className="relative w-[2px] h-64 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 right-0 origin-top"
                    style={{
                        height: "100%",
                        scaleY,
                        background: `linear-gradient(to bottom, transparent, ${color}, white)`
                    }}
                />
            </div>

            <div className="relative w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" className="text-white/5" />
                    <motion.circle
                        cx="50" cy="50" r="45"
                        stroke={color}
                        strokeWidth="2"
                        fill="none"
                        pathLength="1"
                        style={{ pathLength: scrollYProgress }}
                        strokeDasharray="0 1"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-white drop-shadow-md">{percent}%</span>
                </div>

                {/* Mythical "Head" of the Ouroboros */}
                <motion.div
                    className="absolute w-2 h-2 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    style={{
                        backgroundColor: color,
                        top: "50%",
                        left: "50%",
                        offsetPath: "path('M 50,5 50,5 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90')",
                        offsetDistance: `${percent}%`
                    }}
                />
            </div>

            <div className="text-[10px] font-mono text-white/20 vertical-text tracking-widest uppercase">
                Individuation
            </div>
        </div>
    );
}

// Minimal CSS for vertical text if not provided by Tailwind
const style = `
.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
}
`;
