"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Props {
    image: string;
    title: string;
    subtitle: string;
    text: string;
    align?: "left" | "right";
}

export default function ParallaxSection({ image, title, subtitle, text, align = "left" }: Props) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden py-20">
            {/* Parallax Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y }} className="w-full h-[140%] relative -top-[20%]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover object-center opacity-60 filter saturate-0 contrast-125"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
                </motion.div>
            </div>

            {/* Content */}
            <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 ${align === "right" ? "md:direction-rtl" : ""}`}>
                <motion.div
                    style={{ opacity }}
                    className={`flex flex-col justify-center ${align === "right" ? "md:order-last md:text-right items-end" : "md:text-left items-start"}`}
                >
                    <h3 className="text-gold tracking-[0.5em] text-sm md:text-base mb-4 uppercase">{subtitle}</h3>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-cinzel leading-tight">
                        {title}
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                        {text}
                    </p>
                </motion.div>

                {/* Spacer for the other side */}
                <div className="hidden md:block"></div>
            </div>
        </section>
    );
}
