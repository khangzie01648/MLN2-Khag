"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const expand: Variants = {
    initial: {
        top: 0,
    },
    enter: (i: number) => ({
        top: "100%",
        transition: {
            duration: 0.4,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1] as const,
        },
        transitionEnd: { height: "0" },
    }),
    exit: (i: number) => ({
        height: "100%",
        top: 0,
        transition: {
            duration: 0.4,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1] as const,
        },
    }),
};

export default function Template({ children }: { children: React.ReactNode }) {
    const nbOfColumns = 5;

    return (
        <>
            <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col sm:flex-row h-screen w-full">
                {/* Render columns for the shutter effect */}
                {[...Array(nbOfColumns)].map((_, i) => {
                    return (
                        <motion.div
                            key={i}
                            className="relative h-full w-full bg-[#1a1a1a] border-r border-white/5 last:border-r-0"
                            variants={expand}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            custom={nbOfColumns - i}
                        />
                    );
                })}
            </div>
            {children}
        </>
    );
}
