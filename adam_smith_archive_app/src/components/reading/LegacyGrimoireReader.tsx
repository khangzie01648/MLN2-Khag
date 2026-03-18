'use client';

import React, { useState, useRef, useMemo, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';

interface PageData {
    id: number;
    title: string;
    content: string;
}

// COMPONENT TRANG SÁCH MYTHICAL TIER
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode, type?: 'cover' | 'page', position?: 'left' | 'right' }>((props, ref) => {
    return (
        <div
            className={`relative w-full h-full select-none ${props.type === 'cover' ? 'bg-[#120512]' : 'bg-[#efe3cb]'}`}
            ref={ref}
            style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
            }}
        >
            {props.type === 'page' && (
                <>
                    {/* TEXTURE GIẤY DA CAO CẤP NHẤT */}
                    <div className="absolute inset-0 opacity-[0.25] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#d4c5b0]/30 via-transparent to-black/10 pointer-events-none" />

                    {/* KHUNG VIỀN ĐÚC ĐỒNG THAU (ORCHESTRATED BRONZE) */}
                    <div className="absolute inset-6 border-[1px] border-amber-600/10 pointer-events-none" />
                    <div className="absolute inset-10 border-[3px] border-double border-amber-900/10 pointer-events-none shadow-inner" />
                    
                    {/* ĐỐM Ố GIẤY CỔ ĐIỂN (CLASSIC SPOTS) */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-900/[0.03] rounded-full blur-[40px] pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-amber-900/[0.04] rounded-full blur-[50px] pointer-events-none" />

                    {/* HIỆU ỨNG GÁY SÁCH SIÊU SÂU (HYPER SPIN E SHADOW) */}
                    <div className={`absolute ${props.position === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/60 via-black/20 to-transparent top-0 bottom-0 w-32 z-30 pointer-events-none`} />
                    
                    {/* TRANG TRÍ MIẾNG BỌC GÓC DI SẢN (LEGACY CORNERS) */}
                    {[ 'top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0' ].map((pos, i) => (
                        <div key={i} className={`absolute ${pos} w-28 h-28 opacity-40 pointer-events-none`}>
                           <svg viewBox="0 0 100 100" className={`${pos.includes('right') ? 'scale-x-[-1]' : ''} ${pos.includes('bottom') ? 'scale-y-[-1]' : ''}`}>
                               <path d="M0 0 L100 0 L100 3 L3 3 L3 100 L0 100 Z" fill="url(#brass-grad)" />
                               <defs>
                                   <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                       <stop offset="0%" stopColor="#bf953f" />
                                       <stop offset="50%" stopColor="#fcf6ba" />
                                       <stop offset="100%" stopColor="#aa771c" />
                                   </linearGradient>
                               </defs>
                               <path d="M15 15 Q 40 15 40 40 Q 15 40 15 15" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                               <circle cx="6" cy="6" r="3" fill="#d4af37" />
                           </svg>
                        </div>
                    ))}
                </>
            )}
            <div className={`h-full w-full relative overflow-hidden ${props.type === 'page' ? 'p-20' : ''}`} style={{ backfaceVisibility: 'hidden' }}>
                {props.children}
            </div>
        </div>
    );
});

export default function LegacyGrimoireReader({ page, onExit }: { page: PageData, onExit: () => void }) {
    const bookRef = useRef<any>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 35;
            const moveY = (e.clientY - window.innerHeight / 2) / 35;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

    const contentSegments = useMemo(() => {
        const fullText = page.content.replace(/<[^>]*>?/gm, '');
        const parts = fullText.split("Phân tích nhân cách:");
        const intro = parts[0] || "";
        const rest = parts[1] || "";
        const analysis = rest.split("Bối cảnh xã hội:")[0] || "";
        const social = rest.split("Bối cảnh xã hội:")[1] || "";
        return { intro, analysis, social };
    }, [page]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#010101] flex items-center justify-center p-12 overflow-hidden"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Dancing+Script:wght@400;700&family=IM+Fell+English+SC&family=Playfair+Display:ital,wght@0,400;1,900&display=swap');

                .custom-scrollbar-hidden::-webkit-scrollbar { display: none; }
                .custom-scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
                
                .mythical-cap::first-letter {
                    float: left;
                    font-size: 7.5rem;
                    line-height: 0.65;
                    font-family: 'Cinzel Decorative', serif;
                    color: #d4af37;
                    margin-right: 30px;
                    padding: 25px;
                    background: radial-gradient(circle at center, #2a0a2a 0%, #000000 100%);
                    border: 5px double #d4af37;
                    box-shadow: 10px 10px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(212,175,55,0.4);
                    text-shadow: 0 0 15px rgba(212,175,55,0.8);
                }

                .gold-shine-active {
                    background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 45%, #b38728 50%, #fbf5b7 55%, #aa771c 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 200% auto;
                    animation: subtle-shine 6s linear infinite;
                }

                @keyframes subtle-shine {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                .marginalia-ink {
                    font-family: 'Dancing Script', cursive;
                    color: #1a1a1a;
                    opacity: 0.5;
                    filter: blur(0.3px);
                    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                }
                
                .marginalia-ink:hover {
                    opacity: 0.95;
                    filter: blur(0);
                    transform: scale(1.05) rotate(0deg);
                    color: #000080;
                }

                .wax-seal-mythical {
                    background: radial-gradient(circle at 35% 35%, #9b1c1c 0%, #600000 100%);
                    box-shadow: 4px 8px 15px rgba(0,0,0,0.7), inset -3px -3px 6px rgba(255,255,255,0.1);
                    border: 3px solid #7a0000;
                }

                .flipbook-breathe {
                    animation: breathe 8s ease-in-out infinite;
                }

                @keyframes breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.002); }
                }

                .page-divider {
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent);
                    position: relative;
                }
                .page-divider::before {
                    content: '◈';
                    position: absolute;
                    left: 50%; top: 50%; transform: translate(-50%, -50%);
                    color: rgba(212,175,55,0.4);
                    font-size: 0.8rem;
                }
             `}</style>

            {/* PHÔNG NỀN KHÔNG GIAN HUYỀN BÍ (ATMOSPHERIC DEPTH) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(60,30,60,0.3)_0%,transparent_100%)]" />
                <div className="absolute inset-0 bg-[#000]/10 mix-blend-overlay" />
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [0, -250],
                            x: [0, (Math.random() - 0.5) * 40]
                        }}
                        transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-[2px] h-[2px] bg-amber-200/40 rounded-full blur-[1px]"
                    />
                ))}
            </div>

            <motion.div
                style={{ rotateY: springX, rotateX: springY, perspective: 3500 }}
                className="relative w-full max-w-[1250px] h-[86vh] flex items-center justify-center transform-gpu flipbook-breathe"
            >
                {/* DẢI RUY-BĂNG ĐỎ ĐÔ THƯỢNG HẠNG */}
                <motion.div
                    animate={{ rotate: [0, 0.5, 0, -0.5, 0], y: [0, 2, 0] }}
                    className="absolute left-[49%] -top-40 z-50 w-12 h-96 bg-gradient-to-r from-[#600000] via-[#850000] to-[#600000] rounded-b-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] origin-top backdrop-blur-sm"
                >
                    <div className="absolute bottom-10 left-0 w-full h-px bg-amber-500/20" />
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-amber-500/30 font-cinzel text-[8px] tracking-widest">A.S</div>
                </motion.div>

                <HTMLFlipBook
                    width={580}
                    height={780}
                    size="stretch"
                    minWidth={315}
                    maxWidth={1300}
                    minHeight={420}
                    maxHeight={1600}
                    maxShadowOpacity={0.8}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="flipbook-container"
                    ref={bookRef}
                    startPage={0}
                    drawShadow={true}
                    flippingTime={1800}
                    usePortrait={false}
                    startZIndex={0}
                    autoSize={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    showPageCorners={false}
                    style={{ background: 'transparent' }}
                    swipeDistance={50}
                    disableFlipByClick={false}
                >
                    {/* BÌA TRƯỚC: KIỆT TÁC DA RỒNG (DRAGON LEATHER) */}
                    <Page type="cover">
                        <div className="h-full w-full bg-[#0d040d] relative overflow-hidden flex flex-col items-center justify-center p-12 text-center select-none shadow-[60px_0_120px_rgba(0,0,0,1)]">
                            <div className="absolute inset-0 opacity-80 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/100 via-transparent to-white/10" />

                            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-amber-950/50 to-transparent z-40 border-r border-amber-500/20" />
                            <div className="absolute left-8 top-0 bottom-0 w-px stitching opacity-50 z-40" />

                            <div className="relative mb-12 group scale-110">
                                <div className="w-64 h-64 rounded-full border-[4px] border-amber-600/20 flex items-center justify-center relative p-8 shadow-[0_0_80px_rgba(212,175,55,0.15)] bg-black/40 backdrop-blur-3xl">
                                    <div className="absolute inset-2 rounded-full border-[1.5px] border-amber-500/20 animate-[spin_45s_linear_infinite]" />
                                    <div className="absolute inset-6 rounded-full border-[1px] border-dashed border-amber-500/10 animate-[spin_70s_linear_infinite_reverse]" />
                                    <div className="w-full h-full rounded-full border border-amber-500/40 flex flex-col items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
                                         <span className="text-[16rem] font-cinzel text-amber-500/5 absolute opacity-5">AS</span>
                                         <span className="text-7xl font-cinzel-decorative font-black gold-shine-active tracking-tighter drop-shadow-2xl">ID_{page.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 w-full px-12">
                                <span className="text-sm font-cinzel tracking-[2.2rem] text-amber-500/50 uppercase mb-8 block drop-shadow-lg">Imperial Archival</span>
                                <h1 className="font-cinzel-decorative text-5xl md:text-6xl tracking-wide leading-tight gold-shine-active italic font-black uppercase drop-shadow-[0_20px_40px_rgba(0,0,0,1)]">
                                    {page.title}
                                </h1>
                                <div className="mt-12 flex items-center justify-center gap-10 opacity-30">
                                    <div className="w-16 h-px bg-amber-500" />
                                    <div className="w-4 h-4 border border-amber-500 rotate-45" />
                                    <div className="w-16 h-px bg-amber-500" />
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* TRANG CHẤT LIỆU GIẤY VELLUM (LEFT) */}
                    <Page type="page" position="left">
                        <div className="h-full w-full flex flex-col items-center justify-center text-center space-y-16 relative">
                            <div className="absolute inset-0 opacity-[0.02] grayscale bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                            
                            <div className="z-10 p-16 space-y-12">
                                <span className="text-xs font-cinzel tracking-[1.4rem] text-amber-950/40 uppercase block">The Enlightenment Record</span>
                                <div className="w-24 h-px bg-amber-950/10 mx-auto" />
                                <h2 className="text-5xl font-playfair-display font-black text-amber-950 tracking-wide uppercase leading-snug italic drop-shadow-sm">
                                    {page.title}
                                </h2>
                                <div className="pt-12 text-[10rem] font-cinzel text-amber-900/5 select-none opacity-10 absolute pointer-events-none">XVIII</div>
                            </div>

                            <div className="absolute top-20 left-20 marginalia-ink -rotate-6 max-w-[140px] text-xs leading-relaxed italic border-l border-amber-900/20 pl-4">
                                "The foundations of modern economic thought begin here."
                            </div>
                        </div>
                    </Page>

                    {/* TRANG NỘI DUNG CHÍNH (RIGHT) */}
                    <Page type="page" position="right">
                        <div className="h-full w-full relative h-[700px] flex flex-col pt-10">
                            {/* DẤU ẤN SÁP THẦN THOẠI */}
                            <div className="absolute top-0 right-10 w-28 h-28 wax-seal-mythical flex items-center justify-center rotate-12 z-30 opacity-70 pointer-events-none group">
                                <div className="w-20 h-20 rounded-full border-[1.5px] border-black/20 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-cinzel-decorative font-bold text-black/40">AS</span>
                                </div>
                            </div>

                            <div className="custom-scrollbar-hidden overflow-y-auto pr-2">
                                <p className="mythical-cap text-xl font-playfair-display text-amber-950/95 leading-[2.5] text-justify font-medium relative z-10 italic">
                                    {contentSegments.intro}
                                </p>
                                
                                <div className="my-14 page-divider" />
                                
                                <div className="p-10 border border-amber-900/10 bg-amber-900/[0.03] backdrop-blur-[1px] relative">
                                    <div className="marginalia-ink !opacity-80 text-xl text-amber-900/80 leading-relaxed text-center px-6 italic">
                                        "No society can surely be flourishing and happy, of which the far greater part of the members are poor and miserable."
                                    </div>
                                    <div className="absolute top-2 right-4 text-[10px] text-amber-900/20 font-mono tracking-tighter italic">Signature verified, 1776</div>
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* TRANG TIÊU ĐỀ PHÂN TÍCH (LEFT) */}
                    <Page type="page" position="left">
                        <div className="h-full w-full flex flex-col items-center justify-center text-center p-20">
                            <div className="p-24 border-[24px] border-double border-amber-900/5 bg-white/40 backdrop-blur-md relative shadow-2xl space-y-12">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-amber-900/20" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-amber-900/20" />
                                
                                <h2 className="text-6xl font-cinzel-decorative tracking-[0.5rem] text-amber-950 font-black leading-tight italic">DI SẢN <br /> TƯ TƯỞNG</h2>
                                <div className="text-[12px] font-mono tracking-[1rem] text-amber-950/30 uppercase italic">Archived by History</div>
                            </div>
                        </div>
                    </Page>

                    {/* TRANG NỘI DUNG KẾT THÚC (RIGHT) */}
                    <Page type="page" position="right">
                        <div className="h-full w-full overflow-hidden flex flex-col">
                            {/* KHUNG TRÍCH DẪN HI-END */}
                            <div className="mb-16 border-y border-amber-600/20 py-14 relative flex items-center justify-center group overflow-hidden">
                                <div className="absolute inset-0 bg-amber-600/[0.02]" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-px h-10 bg-amber-600/30" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-amber-600/30" />
                                <p className="text-2xl font-playfair-display font-black italic text-amber-900 text-center px-12 leading-loose drop-shadow-sm">
                                    "Man is an animal that makes bargains."
                                </p>
                            </div>

                            <div className="custom-scrollbar-hidden overflow-y-auto pr-6">
                                <div className="text-xl font-playfair-display text-amber-950/95 leading-[2.6] text-justify font-medium">
                                    {contentSegments.analysis}
                                    <br /><br />
                                    <div className="inline-flex items-center gap-4 py-2 px-6 border border-amber-900/20 bg-amber-900/5 rounded-full mb-8">
                                        <div className="w-2 h-2 rounded-full bg-amber-900 animate-pulse" />
                                        <span className="font-black text-amber-950 uppercase tracking-[0.4rem] text-[10px]">Context: Social Environment</span>
                                    </div>
                                    <br/>
                                    {contentSegments.social}
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* THE IMPERIAL HERALDIC BACK COVER */}
                    <Page type="cover">
                        <div className="h-full w-full bg-[#140814] relative overflow-hidden flex flex-col items-center justify-center p-32 shadow-[inset_60px_0_120px_rgba(0,0,0,1)]">
                            <div className="absolute inset-0 opacity-80 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/5" />

                            {/* HERALDIC CREST SYSTEM */}
                            <div className="relative flex flex-col items-center group">
                                {/* LAUREL WREATHS */}
                                <div className="absolute -inset-24 opacity-20 pointer-events-none scale-150">
                                    <svg viewBox="0 0 200 200" fill="none">
                                        <path d="M50 150 C 30 130, 30 70, 50 50 M150 150 C 170 130, 170 70, 150 50" stroke="#d4af37" strokeWidth="2" strokeDasharray="5 5" />
                                        <circle cx="100" cy="100" r="90" stroke="#d4af37" strokeWidth="0.5" opacity="0.3" />
                                    </svg>
                                </div>

                                {/* THE GOLDEN SHIELD */}
                                <div className="w-64 h-80 bg-gradient-to-b from-[#b38728] via-[#fcf6ba] to-[#aa771c] p-[2px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] [clip-path:polygon(0%_0%,100%_0%,100%_80%,50%_100%,0%_80%)]">
                                    <div className="w-full h-full bg-[#1a0a1a] flex flex-col items-center justify-center p-8 [clip-path:polygon(0%_0%,100%_0%,100%_80%,50%_100%,0%_80%)]">
                                        <div className="mb-6 opacity-80 animate-pulse">
                                            <svg width="80" height="80" viewBox="0 0 100 100" fill="#d4af37">
                                                <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
                                            </svg>
                                        </div>
                                        <div className="w-12 h-px bg-amber-500/30 mb-6" />
                                        <span className="font-cinzel-decorative text-4xl font-black text-amber-500 tracking-[0.4rem] italic drop-shadow-2xl">FINIS</span>
                                    </div>
                                </div>

                                {/* GOLDEN RIBBON */}
                                <div className="mt-12 px-12 py-3 border-y border-amber-500/20 bg-black/40 backdrop-blur-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />
                                    <span className="text-[12px] font-mono text-amber-500/60 uppercase tracking-[1rem] whitespace-nowrap italic">Archives of Enlightenment</span>
                                </div>
                            </div>

                            <div className="mt-28 text-[11px] font-mono text-amber-500/20 uppercase tracking-[2.5rem] whitespace-nowrap drop-shadow-2xl italic">Property of The Great Librarian</div>
                        </div>
                    </Page>
                </HTMLFlipBook>
            </motion.div>

            {/* HIGH-END HUD INTERFACE (SYNCHRONIZED SUBTLE) */}
            <div className="absolute inset-0 pointer-events-none z-[1100]">
                {/* PREVIOUS PAGE BUTTON */}
                <button
                    onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 border border-amber-500/20 bg-black/40 backdrop-blur-3xl rounded-full flex items-center justify-center text-amber-500/60 hover:text-amber-500 hover:border-amber-500/60 hover:bg-amber-500/10 transition-all hover:scale-110 active:scale-95 pointer-events-auto shadow-[0_0_30px_rgba(217,119,6,0.1)] group"
                >
                    <span className="text-3xl font-light transform group-hover:-translate-x-1 transition-transform">‹</span>
                </button>

                {/* NEXT PAGE BUTTON */}
                <button
                    onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 border border-amber-500/20 bg-black/40 backdrop-blur-3xl rounded-full flex items-center justify-center text-amber-500/60 hover:text-amber-500 hover:border-amber-500/60 hover:bg-amber-500/10 transition-all hover:scale-110 active:scale-95 pointer-events-auto shadow-[0_0_30px_rgba(217,119,6,0.1)] group"
                >
                    <span className="text-3xl font-light transform group-hover:translate-x-1 transition-transform">›</span>
                </button>

                {/* EXIT BUTTON SIÊU TINH TẾ */}
                <button
                    onClick={onExit}
                    className="absolute top-8 right-8 px-8 py-3 border border-amber-500/30 text-amber-500 font-cinzel font-black text-[11px] tracking-[0.5em] uppercase hover:bg-amber-500 hover:text-black transition-all rounded-full hover:scale-110 shadow-[0_0_50px_rgba(212,175,55,0.1)] backdrop-blur-3xl bg-black/60 pointer-events-auto group"
                >
                    <span className="group-hover:tracking-[0.6em] transition-all duration-500">[ CLOSE ARCHIVE ]</span>
                </button>

                {/* PAGE COUNTER CRYSTAL */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-2 bg-black/60 border border-amber-500/20 backdrop-blur-xl rounded-full">
                    <span className="font-cinzel text-amber-500/50 text-[9px] tracking-[0.3rem] uppercase italic">
                        Vault Segment 0{page.id} // Eternal Record
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
