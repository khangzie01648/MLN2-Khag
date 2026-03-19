"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { PILLARS } from "@/lib/pillar-constants";

export default function QuaternityMenu() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 relative z-20">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-16"
            >
                <h3 className="text-xl md:text-2xl font-cinzel text-white/50 tracking-[0.5em] mb-2 uppercase">The Pillars (Tám Cột Trụ)</h3>
                <div className="w-32 h-[1px] bg-white/20 mx-auto" />
            </motion.div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PILLARS.map((pillar, index) => (
                    <Link
                        key={pillar.id}
                        href={`/select/pillar/${pillar.id}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`
                                relative p-6 rounded-xl cursor-pointer
                                bg-[#121212] border border-white/10
                                group hover:bg-white/5 hover:border-white/20
                                transition-all duration-300 h-full
                            `}
                        >
                            <div className="flex flex-col items-start gap-4">
                                {/* ICON */}
                                <div className="text-4xl md:text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                                    {pillar.icon}
                                </div>

                                {/* TEXT CONTENT */}
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">{pillar.subtitle}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-lg">➔</span>
                                    </div>
                                    <h4 className="text-xl font-cinzel font-bold text-white mb-2 group-hover:text-amber-100 transition-colors">
                                        {pillar.name}
                                    </h4>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-2">
                                        {pillar.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
