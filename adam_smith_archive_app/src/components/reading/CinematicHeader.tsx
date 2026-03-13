"use client";

import { motion } from "framer-motion";

interface CinematicHeaderProps {
    title: string;
    description: string;
    subtitle: string;
}

export default function CinematicHeader({ title, description, subtitle }: CinematicHeaderProps) {
    return (
        <header className="mb-24 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="inline-block px-6 py-2 border border-amber-500/20 rounded-full mb-12 bg-amber-500/5"
            >
                <span className="text-[9px] tracking-[0.6em] uppercase text-amber-500 font-bold">
                    {subtitle}
                </span>
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-8xl font-cinzel tracking-tight text-white leading-tight mb-12 drop-shadow-2xl"
            >
                {title}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg text-white/40 italic font-light max-w-2xl mx-auto leading-loose"
            >
                "{description}"
            </motion.p>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="mt-16 h-[1px] w-64 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto origin-center"
            />
        </header>
    );
}
