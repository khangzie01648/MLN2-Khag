"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { type PillarConfig } from "@/lib/content-config";
import { useEffect, useState, useRef } from "react";

interface ArticleLayoutProps {
    pillar: PillarConfig;
    article: any;
    contentHtml: string | null;
    currentIndex: number;
    totalArticles: number;
    prevArticle: any | null;
    nextArticle: any | null;
}

/**
 * --- MILLION DOLLAR ARTICLE: THE ETHEREAL SCROLL ---
 * Concept: "THE ARCHIVE OF THE VOID"
 * Aesthetic: Deep Noir / High-fidelity Glassmorphism.
 */
export default function ArticleLayout({
    pillar,
    article,
    contentHtml,
    currentIndex,
    totalArticles,
    prevArticle,
    nextArticle
}: ArticleLayoutProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Parallax logic for Hero
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 800], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    if (!isMounted) return null;

    return (
        <main className="min-h-screen bg-[#020204] text-[#e0e0e0] font-sans selection:bg-amber-500/30 overflow-x-hidden">

            {/* AMBIENT LAYERS */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="fixed inset-0 pointer-events-none z-[110] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#000000_150%)]" />

            {/* OUROBOROS SCROLL PROGRESS */}
            <motion.div className="fixed top-0 left-0 right-0 h-[1.5px] bg-amber-500 z-[200] origin-left shadow-[0_0_15px_rgba(255,191,0,0.5)]" style={{ scaleX }} />

            {/* --- MINIMALIST HUD HEADER --- */}
            <header className="fixed top-0 left-0 w-full z-[150] backdrop-blur-md border-b-[0.5px] border-white/5 bg-black/20">
                <div className="max-w-7xl mx-auto px-12 py-8 flex items-center justify-between">
                    <Link href={`/${pillar.id}`} className="group flex items-center gap-8">
                        <div className="w-12 h-12 border-[0.5px] border-white/10 rounded-full flex items-center justify-center group-hover:border-amber-500 group-hover:scale-110 transition-all duration-700">
                            <span className="text-white/40 group-hover:text-amber-500 transition-colors">←</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase">Back_To_Nexus</span>
                            <span className="text-[14px] font-cinzel text-white/60 tracking-widest">{pillar.nameVi.toUpperCase()}</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-12">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-mono tracking-[0.5em] text-amber-500/60 uppercase">Pillar_Status</span>
                            <span className="text-[12px] font-mono text-white/40 uppercase tracking-tighter">Authorized_Session</span>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-3xl filter grayscale brightness-125 opacity-20">{pillar.icon}</div>
                    </div>
                </div>
            </header>

            {/* --- HERO: THE DIVINE SHARD --- */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: y1, opacity: opacityHero }}
                    className="relative z-10 text-center px-10 max-w-6xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] font-mono tracking-[2.5em] text-amber-500/40 uppercase mb-12 block ml-[2.5em]">Identity_Fragment</span>
                        <h1 className="text-7xl md:text-[10rem] font-cinzel font-black text-white tracking-tighter leading-none uppercase drop-shadow-[0_45px_100px_rgba(0,0,0,0.8)]">
                            {article.title}
                        </h1>
                        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-20" />
                        <p className="mt-16 text-xl md:text-2xl font-cinzel text-white/40 italic tracking-[0.3em] font-light max-w-2xl mx-auto uppercase">
                            {pillar.subtitle}
                        </p>
                    </motion.div>
                </motion.div>

                {/* BACKGROUND ELEMENT: THE VOID HALO */}
                <div
                    className="absolute inset-0 opacity-[0.15] blur-[100px]"
                    style={{ background: `radial-gradient(circle at center, ${pillar.color}, transparent 80%)` }}
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[1200px] h-[1200px] border-[1px] border-white/[0.03] rounded-full opacity-30"
                />
            </section>

            {/* --- CONTENT LAYOUT: THE BRUTALIST GRIMOIRE --- */}
            <div className="max-w-7xl mx-auto px-12 grid grid-cols-12 gap-16 pb-40 relative">

                {/* HUD SIDEBAR (LEFT) */}
                <aside className="col-span-2 relative hidden lg:block">
                    <div className="sticky top-48 flex flex-col gap-16">
                        <div className="flex flex-col gap-4 border-l-[1px] border-white/5 pl-8">
                            <span className="text-[9px] font-mono tracking-[0.6em] text-white/20 uppercase">Sequence</span>
                            <span className="text-xl font-mono text-white/50 tracking-tighter">0x{currentIndex.toString(16).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col gap-4 border-l-[1px] border-white/5 pl-8">
                            <span className="text-[9px] font-mono tracking-[0.6em] text-white/20 uppercase">Hierarchy</span>
                            <span className="text-sm font-mono text-amber-500/60">PRIME_LEVEL</span>
                        </div>
                        <motion.div
                            animate={{ opacity: [0.1, 0.4, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-12 h-12 border-[0.5px] border-white/20 rounded-full flex items-center justify-center p-2"
                        >
                            <div className="w-full h-full rounded-full" style={{ background: pillar.color }} />
                        </motion.div>
                    </div>
                </aside>

                {/* BODY CONTENT */}
                <div className="col-span-12 lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="markdown-content prose prose-invert prose-stone max-w-none"
                    >
                        {contentHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                        ) : (
                            <div className="flex flex-col items-center py-40 gap-8 opacity-20">
                                <div className="w-16 h-16 border-t-[1px] border-amber-500 rounded-full animate-spin" />
                                <span className="text-[10px] font-mono tracking-[2em] uppercase">Decrypting_Shards...</span>
                            </div>
                        )}
                    </motion.div>

                    {/* END OF FRAGMENT DECOR */}
                    <div className="mt-40 pt-20 border-t-[0.5px] border-white/5 flex flex-col items-center">
                        <div className="w-20 h-px bg-amber-500/40 mb-10" />
                        <span className="text-[9px] font-mono tracking-[2.5em] text-white/10 uppercase ml-[2.5em]">End_Of_Transmission</span>
                    </div>
                </div>

                {/* HUD SIDEBAR (RIGHT) */}
                <aside className="col-span-2 relative hidden lg:block">
                    {/* Metadata Fragments can go here */}
                </aside>
            </div>

            {/* --- NEXUS FOOTER NAV --- */}
            <footer className="bg-black/80 border-t-[0.5px] border-white/10 py-40 px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                    {prevArticle && (
                        <Link href={`/${pillar.id}/${prevArticle.slug}`} className="flex-1 group transition-all duration-700">
                            <div className="p-16 border-[0.5px] border-white/5 bg-white/[0.01] group-hover:bg-white/[0.03] group-hover:border-white/20 transition-all duration-700 flex flex-col gap-8">
                                <span className="text-[9px] font-mono tracking-[1.5em] text-white/20 uppercase group-hover:text-amber-500 transition-colors">Previous_Locus</span>
                                <span className="text-4xl font-cinzel text-white/30 group-hover:text-white transition-all uppercase leading-tight tracking-tighter">{prevArticle.title}</span>
                            </div>
                        </Link>
                    )}

                    {nextArticle ? (
                        <Link href={`/${pillar.id}/${nextArticle.slug}`} className="flex-1 group transition-all duration-700">
                            <div className="p-16 border-[0.5px] border-white/5 bg-white/[0.01] group-hover:bg-amber-500/10 group-hover:border-amber-500/40 transition-all duration-700 flex flex-col gap-8 text-right">
                                <span className="text-[9px] font-mono tracking-[1.5em] text-white/20 uppercase group-hover:text-amber-500 transition-colors">Next_Locus</span>
                                <span className="text-4xl font-cinzel text-white/30 group-hover:text-white transition-all uppercase leading-tight tracking-tighter">{nextArticle.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <Link href={`/${pillar.id}`} className="flex-1 group transition-all duration-700">
                            <div className="p-16 border-[0.5px] border-amber-500/20 bg-amber-500/[0.02] group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-700 flex flex-col gap-8 text-center items-center">
                                <span className="text-[10px] font-mono tracking-[1.5em] text-white uppercase group-hover:text-black transition-colors">Return_To_Nexus</span>
                                <span className="text-4xl font-cinzel text-white group-hover:text-black transition-all uppercase leading-tight tracking-widest leading-none">Complete_Sequence</span>
                            </div>
                        </Link>
                    )}
                </div>
            </footer>
        </main>
    );
}
