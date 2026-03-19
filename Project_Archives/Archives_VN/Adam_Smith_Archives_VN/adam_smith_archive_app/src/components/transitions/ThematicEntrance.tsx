'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// ============================================================================
// V4: HYPER-SURREALISM - "THE ALCHEMICAL GLITCH"
// Core Tech: Gooey Filters (Liquid Physics) & CSS 3D Transforms
// ============================================================================

// --- SHARED: TEXT DECODER (Hacker Style) ---
const DecodedText = ({ text, color, delay = 0 }: { text: string, color: string, delay?: number }) => {
    const [display, setDisplay] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Speed
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.h1
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay }}
            className="text-5xl md:text-8xl font-black uppercase tracking-widest mix-blend-difference z-50"
            style={{ color: '#fff', textShadow: `0 0 30px ${color}` }}
        >
            {display}
        </motion.h1>
    );
};

// --- SHARED: GOOEY FILTER DEFINITION ---
// This enables the liquid physics effect
const GooeyFilter = () => (
    <svg className="absolute w-0 h-0 hidden">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
        </defs>
    </svg>
);

// --- 1. ALCHEMY: "LIQUID GOLD FUSION" (Vàng Nóng Chảy) ---
const AlchemyV4 = () => (
    <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
        <GooeyFilter />

        {/* The Gooey Container */}
        <div className="absolute inset-0 filter url('#goo') bg-black">
            {/* Blobs merging */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: (Math.random() - 0.5) * 1000, y: (Math.random() - 0.5) * 1000, scale: 0 }}
                    animate={{ x: 0, y: 0, scale: [0, 5, 20] }}
                    transition={{ duration: 3.0, ease: "easeInOut", delay: i * 0.1 }}
                    className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#ffd700] rounded-full mix-blend-screen"
                />
            ))}
        </div>

        {/* Flash Overlay */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="absolute inset-0 bg-[#ffd700]"
        />

        <DecodedText text="ALCHEMY" color="#ffd700" delay={1.5} />
    </div>
);

// --- 2. RED BOOK: "PSYCHIC INK" (Mực Tâm Linh) ---
const RedBookV4 = () => (
    <div className="absolute inset-0 bg-[#e3dcd1] overflow-hidden flex items-center justify-center">
        <GooeyFilter />

        {/* Ink spreading organically */}
        <div className="absolute inset-0 filter url('#goo')">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 30 }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 w-20 h-20 bg-[#6a0404] rounded-full blur-md"
            />
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ scale: Math.random() * 5 + 2, x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 800 }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                    className="absolute top-1/2 left-1/2 w-16 h-16 bg-[#3d0000] rounded-full"
                />
            ))}
        </div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply pointer-events-none" />

        <DecodedText text="RED_BOOK" color="#ff0000" delay={1.0} />
    </div>
);

// --- 3. CONCEPTS: "HYPER-CUBE" (Tesseract 3D) ---
const ConceptsV4 = () => (
    <div className="absolute inset-0 bg-[#000510] flex items-center justify-center overflow-hidden perspective-1000">
        <motion.div
            initial={{ rotateX: 0, rotateY: 0, scale: 0 }}
            animate={{ rotateX: 360, rotateY: 360, scale: 50, opacity: [1, 1, 0] }}
            transition={{ duration: 3.0, ease: "anticipate" }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-64 h-64 relative border-2 border-[#00ffff] rounded-xl flex items-center justify-center"
        >
            {/* Inner Cube */}
            <div className="absolute w-32 h-32 border border-[#00ffff]/50 rounded-lg animate-spin-slow" />
            <div className="absolute w-full h-full border border-[#00ffff]/30 rounded-xl rotate-45" />
        </motion.div>

        {/* Glitch Grid Background */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))]"
        >
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, delay: Math.random() * 2, repeat: Infinity }}
                    className="border border-[#00ffff]/10"
                />
            ))}
        </motion.div>

        <DecodedText text="CONCEPTS" color="#00ffff" delay={0.5} />
    </div>
);

// --- 4. COSMOS: "WORMHOLE WARP" (Lỗ Sâu) ---
const CosmosV4 = () => (
    <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
        {/* Warp Tunnel */}
        <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 20, rotate: 180 }}
            transition={{ duration: 3.0, ease: [0.7, 0, 0.84, 0] }}
            className="w-[100vw] h-[100vw] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#ffffff_10deg,transparent_20deg,#ffffff_50deg,transparent_60deg)] opacity-50 blur-sm mix-blend-screen"
        />

        {/* Inverted Core */}
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 100 }}
            transition={{ duration: 2.0, delay: 1.0, ease: "circIn" }}
            className="absolute w-10 h-10 bg-white rounded-full mix-blend-difference"
        />

        <DecodedText text="COSMOS" color="#ffffff" delay={1.0} />
    </div>
);

// --- 5. BIOGRAPHY: "MEMORY REWIND" (Cuộn Băng Ký Ức) ---
const BioV4 = () => (
    <div className="absolute inset-0 bg-[#1a120b] overflow-hidden flex items-center justify-center">
        {/* Film Strip Effect */}
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 2.0, ease: "linear", repeat: Infinity }}
            className="absolute left-10 w-20 h-full border-l-4 border-r-4 border-dashed border-[#ffffff]/20"
        />
        <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 2.0, ease: "linear", repeat: Infinity }}
            className="absolute right-10 w-20 h-full border-l-4 border-r-4 border-dashed border-[#ffffff]/20"
        />

        {/* Sepia Flash */}
        <motion.div
            initial={{ opacity: 1, filter: "sepia(100%) blur(5px)" }}
            animate={{ opacity: 0, filter: "sepia(0%) blur(0px)" }}
            transition={{ duration: 3.0 }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
        />

        <DecodedText text="BIOGRAPHY" color="#ef4444" delay={0.5} />
    </div>
);

// --- 6. PRACTICE: "THE INNER LOTUS" (Hoa Sen Nở) ---
const PracticeV4 = () => (
    <div className="absolute inset-0 bg-[#1a051a] overflow-hidden flex items-center justify-center">
        <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.5, 3], rotate: 180 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="absolute w-[800px] h-[800px] rounded-full opacity-60 mix-blend-screen"
            style={{
                background: "conic-gradient(from 0deg, #ff00ff, #000000, #ff00ff, #000000, #ff00ff)"
            }}
        />
        <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: [0, 1.2, 2.5], rotate: -180 }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute w-[600px] h-[600px] rounded-full opacity-80 mix-blend-screen"
            style={{
                background: "conic-gradient(from 0deg, #50c878, #000000, #50c878, #000000, #50c878)"
            }}
        />
        <DecodedText text="PRACTICE" color="#ff00ff" delay={1.0} />
    </div>
);

// --- 7. SYMBOLS: "THE CIPHER STREAM" (Dòng Chảy Ký Tự) ---
const SymbolsV4 = () => (
    <div className="absolute inset-0 bg-[#0a0510] overflow-hidden flex items-center justify-center">
        {/* Runic Rain */}
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: "120vh", opacity: [0, 1, 0] }}
                transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                }}
                className="absolute text-[#ffd700] font-mono text-2xl writing-vertical-rl"
                style={{ left: `${Math.random() * 100}%` }}
            >
                {String.fromCharCode(0x16A0 + Math.random() * 80)}
            </motion.div>
        ))}
        <DecodedText text="SYMBOLS" color="#6a0dad" delay={0.5} />
    </div>
);

// --- 8. SPIRIT: "THE ETHEREAL AURA" (Hào Quang) ---
const SpiritV4 = () => (
    <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
        <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 20, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[#FF8C00]"
        />
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-white rounded-full blur-3xl z-10"
        />
        <div className="z-20 mix-blend-difference">
            <DecodedText text="SPIRIT" color="#ffffff" delay={0.2} />
        </div>
    </div>
);

// --- 9. LEGACY: "THE TIMELINE" (Dòng Thời Gian) ---
const LegacyV4 = () => (
    <div className="absolute inset-0 bg-[#051005] overflow-hidden flex items-center justify-center">
        {/* Expanding Lines */}
        {[...Array(10)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: "100vw" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className="absolute h-[2px] bg-[#ec4899] left-0 shadow-[0_0_10px_#ec4899]"
                style={{ top: `${10 + i * 8}%` }}
            />
        ))}
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="absolute w-[2px] bg-white left-1/2 top-0"
        />
        <DecodedText text="LEGACY" color="#ec4899" delay={1.0} />
    </div>
);

// --- 10. ENCOUNTERS: "THE NEURAL WEB" (Mạng Lưới Kết Nối) ---
const EncountersV4 = () => (
    <div className="absolute inset-0 bg-[#000510] overflow-hidden flex items-center justify-center">
        {/* Connection Nodes */}
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5, delay: Math.random() * 1.5 }}
                className="absolute w-4 h-4 bg-[#40e0d0] rounded-full shadow-[0_0_15px_#40e0d0]"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                }}
            />
        ))}
        {/* Connecting Lines (Simulated Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(64,224,208,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <DecodedText text="ENCOUNTERS" color="#40e0d0" delay={0.8} />
    </div>
);

// --- GENERIC FALLBACK FOR OTHERS (With Scanlines) ---
const GenericV4 = ({ id, color }: { id: string, color: string }) => (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* Scanlines */}
        <div className="absolute inset-0 crt-lines z-20" />

        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "circInOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: color }}
        />

        <div className="absolute inset-0 mix-blend-difference z-30 flex items-center justify-center">
            <DecodedText text={id.replace("_", " ")} color={color} delay={0.5} />
        </div>
    </div>
);

// --- MASTER COMPONENT (V4) ---
export default function ThematicEntrance({ pillarId, color }: { pillarId: string, color: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => setIsVisible(false), 3200); // 3.2s duration
        return () => clearTimeout(timer);
    }, [pillarId]);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="thematic-overlay-v4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }} // Fast exit
                    className="fixed inset-0 z-[9999] bg-transparent"
                >
                    {/* GLOBAL CRT OVERLAY */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 crt-lines z-[10000]" />

                    {(pillarId === 'tieu-su' || pillarId === 'biography') ? <BioV4 /> :
                        (pillarId === 'khai-niem' || pillarId === 'concepts') ? <ConceptsV4 /> :
                            (pillarId === 'sach-do' || pillarId === 'red_book' || pillarId === 'redbook') ? <RedBookV4 /> :
                                (pillarId === 'gia-kim' || pillarId === 'alchemy') ? <AlchemyV4 /> :
                                    (pillarId === 'vu-tru' || pillarId === 'cosmos') ? <CosmosV4 /> :
                                        (pillarId === 'thuc-hanh' || pillarId === 'practice') ? <PracticeV4 /> :
                                            (pillarId === 'bieu-tuong' || pillarId === 'symbols') ? <SymbolsV4 /> :
                                                (pillarId === 'tam-linh' || pillarId === 'spirit') ? <SpiritV4 /> :
                                                    (pillarId === 'di-san' || pillarId === 'legacy') ? <LegacyV4 /> :
                                                        (pillarId === 'gap-go' || pillarId === 'encounters') ? <EncountersV4 /> :
                                                            <GenericV4 id={pillarId} color={color} />}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
