'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PILLARS } from '@/lib/pillar-constants';
import { Book, Castle, Flame, Sparkles, ArrowRight, Scale } from 'lucide-react';

const ICONS: Record<string, any> = {
    castle: Castle,
    flame: Flame,
    sparkles: Sparkles,
    book: Book,
    scale: Scale
};

export default function AdamSmithDoors() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-20 relative z-20">
            {/* Header section with cinematic entrance */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mb-24"
            >
                <div className="inline-block px-3 py-1 border border-[#d4af37]/30 rounded-full mb-6">
                    <span className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">The Wealth of Ideas</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-cinzel text-white tracking-[0.2em] mb-6">
                    THE <span className="text-[#d4af37]">FIVE PILLARS</span>
                </h2>
                <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Các Khái Niệm Cốt Lõi Của Adam Smith</p>
                <div className="mt-8 flex justify-center items-center gap-4">
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/40" />
                    <div className="w-2 h-2 rotate-45 border border-[#d4af37]/60" />
                    <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/40" />
                </div>
            </motion.div>

            {/* The 5 Doors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {PILLARS.map((pillar, index) => {
                    const Icon = ICONS[pillar.icon || 'book'];
                    return (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <Link href={`/select/pillar/${pillar.id}`} className="block group group-hover:no-underline">
                                <div className="relative h-[400px] bg-[#0c0d12] border border-[#d4af37]/10 rounded-2xl overflow-hidden transition-all duration-700 hover:border-[#d4af37]/50 hover:shadow-[0_0_50px_rgba(212,175,55,0.1)]">

                                    {/* Background decorative elements */}
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#d4af37]/30 to-transparent blur-[100px]" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#d4af37]/20 to-transparent blur-[100px]" />
                                    </div>

                                    {/* Card Content */}
                                    <div className="relative h-full p-10 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1c25] to-[#0c0d12] border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] group-hover:scale-110 group-hover:border-[#d4af37]/50 transition-all duration-500 shadow-xl">
                                                <Icon size={32} strokeWidth={1.5} />
                                            </div>
                                            <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-mono">Archive Portal 0{index + 1}</span>
                                        </div>

                                        <div>
                                            <span className="text-[10px] tracking-[0.6em] text-[#d4af37] uppercase mb-4 block opacity-60 group-hover:opacity-100 transition-opacity">
                                                {pillar.subtitle}
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-cinzel text-white mb-6 group-hover:text-[#d4af37] transition-colors">
                                                {pillar.nameVi}
                                            </h3>
                                            <p className="text-gray-400 font-light leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                                                {pillar.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 text-[#d4af37] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                            <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Bước vào Cửa Ải</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]/20 group-hover:border-[#d4af37]/60 transition-colors" />
                                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#d4af37]/20 group-hover:border-[#d4af37]/60 transition-colors" />
                                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#d4af37]/20 group-hover:border-[#d4af37]/60 transition-colors" />
                                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#d4af37]/20 group-hover:border-[#d4af37]/60 transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer decoration */}
            <div className="mt-32 text-center opacity-20 hover:opacity-100 transition-opacity duration-500">
                <p className="font-mono text-[9px] tracking-[1em] uppercase">Adam Smith Archive Protocol // System Normal</p>
            </div>
        </div>
    );
}
