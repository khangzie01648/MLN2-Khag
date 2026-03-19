"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface PostViewerProps {
    postData: {
        title: string;
        contentHtml: string;
        date: string;
    };
    slug: string;
}

export default function PostViewer({ postData, slug }: PostViewerProps) {
    const [isFocusMode, setIsFocusMode] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const focusOpacity = isFocusMode ? 0 : 1;

    useEffect(() => {
        // Placeholder for future ambient audio
    }, []);

    return (
        <div className={`min-h-screen relative bg-[#050505] transition-colors duration-1000 ${isFocusMode ? 'bg-black' : ''}`}>

            {/* PROGRESS BAR (Sword of Light) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-50 shadow-[0_0_20px_rgba(255,191,0,0.8)]"
                style={{ scaleX }}
            />

            {/* AMBIENT PARTICLES & OVERLAYS */}
            <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isFocusMode ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-amber-900/10 to-transparent" />
            </div>

            {/* NAVIGATION HEADER */}
            <motion.nav
                animate={{ opacity: focusOpacity, y: isFocusMode ? -100 : 0 }}
                className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-40 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm"
            >
                <Link href="/select" className="group flex items-center gap-4 text-xs tracking-[0.3em] text-white/40 hover:text-amber-500 transition-colors uppercase font-mono">
                    <span className="group-hover:-translate-x-1 transition-transform text-lg">←</span>
                    Archive_Index
                </Link>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white uppercase transition-colors border border-white/10 px-3 py-1 rounded hover:border-white/30"
                    >
                        {isFocusMode ? "Exit Focus" : "Focus Mode"}
                    </button>
                    <span className="text-[10px] tracking-[0.3em] text-amber-500/50 hidden md:block font-bold">
                        REF: {slug.toUpperCase().substring(0, 10)}...
                    </span>
                </div>
            </motion.nav>

            {/* MAIN CONTENT */}
            <article className="relative z-10 max-w-3xl mx-auto px-6 pt-40 pb-40 md:pt-56">

                {/* HEADER */}
                <header className="mb-24 text-center relative">
                    <motion.div
                        initial={{ height: 0 }} animate={{ height: 100 }} transition={{ duration: 1.5 }}
                        className="w-[1px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent mx-auto mb-8 absolute -top-32 left-1/2 -translate-x-1/2"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block text-amber-500/40 text-xs tracking-[0.5em] mb-6 uppercase font-mono">Classified Document</span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 mb-8 leading-tight drop-shadow-2xl">
                            {postData.title}
                        </h1>

                        <div className="flex justify-center items-center gap-6 text-white/20 text-[10px] tracking-[0.3em] uppercase font-mono border-t border-white/5 pt-8 max-w-md mx-auto">
                            <span>Analysis_Depth: High</span>
                            <span>•</span>
                            <span>Sync_Rate: 100%</span>
                        </div>
                    </motion.div>
                </header>

                {/* CONTENT BODY */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="prose prose-invert prose-lg md:prose-xl max-w-none 
                    prose-headings:font-cinzel prose-headings:font-normal prose-headings:text-amber-100/90 prose-headings:mt-16 prose-headings:mb-8
                    prose-p:font-serif prose-p:text-gray-300 prose-p:leading-8 prose-p:tracking-wide prose-p:font-light prose-p:text-lg md:prose-p:text-xl
                    prose-strong:text-amber-500 prose-strong:font-normal
                    prose-blockquote:border-l-2 prose-blockquote:border-amber-700/50 prose-blockquote:text-gray-400 prose-blockquote:italic prose-blockquote:pl-6 prose-blockquote:my-12
                    prose-a:text-amber-400 prose-a:no-underline prose-a:border-b prose-a:border-amber-400/30 hover:prose-a:border-amber-400 hover:prose-a:text-amber-300 prose-a:transition-all
                    prose-img:rounded-sm prose-img:border prose-img:border-white/10 prose-img:shadow-[0_0_50px_rgba(0,0,0,0.5)] opacity-90 hover:opacity-100 transition-opacity duration-700
                    prose-hr:border-white/10 prose-hr:my-16
                    selection:bg-amber-900/30 selection:text-amber-100"
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />

                {/* FOOTER SIGNATURE */}
                <div className="mt-40 pt-12 border-t border-white/5 flex flex-col items-center gap-8 opacity-50 hover:opacity-100 transition-opacity duration-1000">
                    <div className="text-4xl text-amber-900/40">☤</div>
                    <p className="text-white/20 italic text-xs font-serif tracking-widest text-center max-w-md">
                        "The pendulum of the mind oscillates between sense and nonsense, not between right and wrong."
                        <br /><span className="not-italic text-[9px] font-mono mt-2 block uppercase text-white/10">— C.G. Adam Smith</span>
                    </p>

                    <div className="mt-12 flex gap-4">
                        <Link href="/select" className="group px-8 py-4 border border-white/10 hover:border-amber-500/50 hover:bg-white/[0.02] transition-all flex flex-col items-center gap-1">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-colors">Return</span>
                        </Link>
                    </div>
                </div>

            </article>

            {/* FOCUS MODE TRIGGER AREA */}
            {!isFocusMode && (
                <div className="fixed bottom-8 right-8 mix-blend-difference pointer-events-none md:pointer-events-auto">
                    <span className="text-[9px] font-mono text-white/20 tracking-widest">[ SCROLL TO DECRYPT ]</span>
                </div>
            )}
        </div>
    );
}
