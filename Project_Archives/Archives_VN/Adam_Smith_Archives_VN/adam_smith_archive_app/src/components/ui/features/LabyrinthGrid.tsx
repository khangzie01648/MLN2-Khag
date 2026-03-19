"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";

interface LabyrinthGridProps {
    initialArticles: any[];
}

export default function LabyrinthGrid({ initialArticles }: LabyrinthGridProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPillar, setSelectedPillar] = useState<string | 'all'>('all');

    const filtered = useMemo(() => {
        return initialArticles.filter(art => {
            const matchesSearch =
                art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (art.description && art.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesPillar = selectedPillar === 'all' || art.pillarId === selectedPillar;
            return matchesSearch && matchesPillar;
        });
    }, [searchTerm, selectedPillar, initialArticles]);

    const pillars = useMemo(() => {
        const uniqueIds = Array.from(new Set(initialArticles.map(a => a.pillarId)));
        return uniqueIds.map(id => {
            const art = initialArticles.find(a => a.pillarId === id);
            return { id, name: art?.pillarName, color: art?.pillarColor };
        });
    }, [initialArticles]);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
            <header className="mb-16 flex flex-col lg:flex-row justify-between items-end gap-12">
                <div className="max-w-xl text-left">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs tracking-[0.8em] font-light uppercase text-amber-500/60 mb-6"
                    >
                        Mê cung Lưu trữ (The Labyrinth)
                    </motion.h2>
                    <p className="text-3xl font-cinzel text-white/90 leading-tight">
                        Kiến trúc của Vô thức Tập thể gồm <span className="text-amber-500">{initialArticles.length}</span> hồ sơ đã được giải mã.
                    </p>
                </div>

                <div className="w-full lg:w-auto flex flex-col gap-6">
                    {/* Cinematic Search Bar */}
                    <div className="relative group self-end w-full lg:w-80">
                        <div className="absolute -inset-0.5 bg-amber-500/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm từ khóa (ví dụ: Shadow, Freud...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-all font-light placeholder:text-white/20 relative z-10"
                        />
                    </div>

                    {/* Pillar Quick Filter */}
                    <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                        <button
                            onClick={() => setSelectedPillar('all')}
                            className={`px-3 py-1 rounded-full text-[9px] tracking-widest uppercase transition-all border ${selectedPillar === 'all' ? 'bg-amber-500 text-black font-bold border-amber-500' : 'border-white/10 text-white/40 hover:text-white'}`}
                        >
                            TẤT CẢ
                        </button>
                        {pillars.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedPillar(p.id!)}
                                style={{
                                    borderColor: selectedPillar === p.id ? p.color : 'rgba(255,255,255,0.1)',
                                    color: selectedPillar === p.id ? '#000' : p.color,
                                    backgroundColor: selectedPillar === p.id ? p.color : 'transparent'
                                }}
                                className={`px-3 py-1 rounded-full text-[9px] tracking-widest uppercase transition-all border ${selectedPillar === p.id ? 'font-bold' : ''}`}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filtered.map((article, idx) => (
                        <motion.div
                            key={`${article.pillarId}-${article.slug}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href={`/select/pillar/${article.pillarId}/reading/${article.slug}`}
                                style={{
                                    borderColor: `${article.pillarColor}40`,
                                    color: article.pillarColor || '#fff'
                                }}
                                className={`
                                    holo-card block h-full p-8 rounded-xl 
                                    bg-gradient-to-br from-white/5 to-transparent
                                    border hover:border-white/40
                                    transition-all duration-500
                                    flex flex-col justify-between
                                    group overflow-hidden relative
                                    min-h-[240px]
                                `}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <span className="text-[10px] uppercase tracking-widest opacity-50 mb-3 block">
                                        {article.pillarName}
                                    </span>
                                    <h3 className="text-xl font-cinzel leading-tight group-hover:text-white transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="mt-3 text-[11px] text-white/20 group-hover:text-white/40 line-clamp-3 font-light leading-relaxed italic transition-colors">
                                        {article.description}
                                    </p>
                                </div>
                                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 opacity-30 group-hover:opacity-100 transition-opacity text-[10px] tracking-[0.2em] uppercase flex justify-between items-center">
                                    <span>Truy cập Hồ sơ</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
