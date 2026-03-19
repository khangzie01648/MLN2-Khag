"use client";

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NeuralMapOverlay({ articles, color }: { articles: any[], color: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* FLOATING ACCESS BUTTON */}
            <div className={`fixed bottom-12 right-12 z-[90] transition-opacity duration-1000 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-6 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full hover:bg-white/10 transition-all group"
                >
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase group-hover:text-white transition-colors">Neural_Map</span>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                        </div>
                    </div>
                </button>
            </div>

            {/* FULLSCREEN MAP OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(60px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-20"
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-12 right-12 text-white/30 hover:text-white transition-all font-mono text-[10px] tracking-[1em] uppercase"
                        >
                            [ Close_Map ]
                        </button>

                        <div className="w-full max-w-7xl h-full flex flex-col gap-12">
                            <div className="flex flex-col gap-4 border-l-2 pl-12" style={{ borderColor: color }}>
                                <span className="text-[11px] font-mono tracking-[1.5em] text-amber-500 uppercase">Interactive_Graph_v1.0</span>
                                <h2 className="text-6xl font-cinzel font-black text-white tracking-[0.1em] uppercase">Neural_Architecture</h2>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto custom-scrollbar p-4">
                                {articles.map((art, idx) => (
                                    <motion.div
                                        key={art.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group"
                                    >
                                        <Link href={`/select/pillar/${art.pillarId}/reading/${art.slug}`}>
                                            <div className="p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all rounded-sm relative overflow-hidden h-[300px] flex flex-col justify-between">
                                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                                    <span className="text-8xl font-black text-white">{idx + 1}</span>
                                                </div>

                                                <div className="relative z-10">
                                                    <span className="text-[8px] font-mono text-amber-500/40 tracking-[0.5em] uppercase mb-4 block">Archive.Fragment</span>
                                                    <h3 className="text-3xl font-cinzel text-white group-hover:tracking-wider transition-all duration-700">{art.title}</h3>
                                                </div>

                                                <div className="pt-8 border-t border-white/5 group-hover:border-white/20 transition-all">
                                                    <p className="text-sm font-cinzel text-white/30 italic line-clamp-2">
                                                        "Khám phá chiều sâu vô hạn của {art.title.toLowerCase()} qua lăng kính siêu thực của Carl Adam Smith..."
                                                    </p>
                                                </div>

                                                {/* METRIC FOOTER */}
                                                <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                                    <span className="text-[8px] font-mono text-white/20">REL: 0.98</span>
                                                    <span className="text-[8px] font-mono text-amber-500 tracking-widest uppercase">Select_Node_→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
