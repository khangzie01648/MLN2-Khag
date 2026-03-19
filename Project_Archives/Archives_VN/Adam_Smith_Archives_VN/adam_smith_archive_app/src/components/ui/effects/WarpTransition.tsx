"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WarpTransitionProps {
    isActive: boolean;
    onComplete: () => void;
    videoSrc?: string;
}

export default function WarpTransition({ isActive, onComplete, videoSrc = "/vid1.mp4" }: WarpTransitionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(e => console.error("Video play failed:", e));

            // Set a long safety fallback (e.g., 30s) in case onEnded fails
            const fallbackTimer = setTimeout(() => {
                if (!isFinished) {
                    setIsFinished(true);
                    onComplete();
                }
            }, 30000);

            return () => clearTimeout(fallbackTimer);
        }
    }, [isActive, onComplete, isFinished]);

    const handleVideoEnd = () => {
        setIsFinished(true);
        onComplete();
    };

    return (
        <AnimatePresence>
            {isActive && !isFinished && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src={videoSrc}
                        onEnded={handleVideoEnd}
                        muted={false}
                        playsInline
                    />

                    {/* SKIP BUTTON */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        onClick={() => {
                            setIsFinished(true);
                            onComplete();
                        }}
                        className="absolute bottom-12 right-12 z-[10000] group flex items-center gap-4 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[#ffd700]/50 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300"
                    >
                        <span className="font-cinzel text-xs tracking-[0.3em] text-white/60 group-hover:text-[#ffd700] uppercase transition-colors">
                            Bỏ qua
                        </span>
                        <div className="w-8 h-[1px] bg-white/20 group-hover:bg-[#ffd700]/50 transition-colors" />
                        <span className="font-mono text-[10px] text-white/30 group-hover:text-[#ffd700]/50">[SKIP]</span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
