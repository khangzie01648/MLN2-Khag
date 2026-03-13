"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* TOP LINE PROGRESS */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* CIRCULAR OUROBOROS INDICATOR (Bottom Right) */}
            <motion.div
                className="fixed bottom-8 right-8 z-50 pointer-events-none mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <svg width="60" height="60" viewBox="0 0 100 100" className="rotate-[-90deg]">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                    <motion.circle
                        cx="50" cy="50" r="40"
                        stroke="#d4af37"
                        strokeWidth="4"
                        fill="none"
                        pathLength="1"
                        style={{ pathLength: scaleX }}
                    />
                    {/* The Ouroboros Head/Tail could be added here as an image or complex path */}
                </svg>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-amber-500 font-mono">
                    %
                </span>
            </motion.div>
        </>
    );
}
