'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PILLARS } from '@/lib/pillar-constants';
import { Book, Castle, Flame, Sparkles, Scale } from 'lucide-react';

const ICONS: Record<string, any> = {
    castle: Castle,
    flame: Flame,
    sparkles: Sparkles,
    book: Book,
    scale: Scale
};

export default function AdamSmithDoors() {
    return (
        <div className="w-full min-h-screen bg-[#020202] flex flex-col items-center justify-start py-32 px-4 overflow-hidden relative">
            
            {/* --- CINEMATIC AMBIANCE --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                {/* Floor reflection */}
                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#daa520]/5 to-transparent blur-3xl" />
            </div>

            {/* Header Area */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-center mb-40 z-10"
            >
                <div className="inline-block px-4 py-1 border border-white/5 rounded-full mb-8 bg-black/40 backdrop-blur-md">
                    <span className="text-[10px] tracking-[1.5em] uppercase text-[#daa520]/60 font-light">The Grand Corridor</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-cinzel text-white tracking-[0.2em] font-black italic">
                    ARCHIVE <span className="text-[#daa520]">SANCTUM</span>
                </h2>
                <p className="text-[#daa520]/40 text-[10px] tracking-[0.8em] uppercase mt-4">Select a portal to activate deep memory</p>
            </motion.div>

            {/* THE HALLWAY OF REALISTIC DOORS */}
            <div className="flex flex-wrap justify-center items-end gap-12 lg:gap-24 max-w-screen-2xl relative z-10 mb-60">
                
                {PILLARS.map((pillar, index) => {
                    const Icon = ICONS[pillar.icon || 'book'];
                    
                    return (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ 
                                duration: 1.8, 
                                delay: index * 0.2, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className="perspective-2000"
                        >
                            <Link href={`/select/pillar/${pillar.id}`} className="block group no-underline relative">
                                
                                {/* OUTER DOOR FRAME (Thick, Dark Wood/Steel) */}
                                <div className="relative w-[340px] h-[600px] bg-[#08080a] border-x-[16px] border-t-[16px] border-[#0a0a0c] shadow-[40px_60px_120px_rgba(0,0,0,0.95)] flex flex-col p-1.5 transition-all duration-[1s] group-hover:shadow-[0_0_100px_rgba(218,165,32,0.15)] group-hover:-translate-y-6">
                                    
                                    {/* REALISTIC DOOR SURFACE (Deeply Panelled) */}
                                    <div className="relative flex-grow bg-[#121418] border border-white/5 flex flex-col p-5 overflow-hidden shadow-inner">
                                        
                                        {/* TOP RECESSED PANEL */}
                                        <div className="w-full h-1/3 border-[8px] border-[#050505] bg-[#0a0a0c] shadow-[inset_4px_8px_30px_rgba(0,0,0,0.9)] mb-6 flex items-center justify-center relative">
                                            {/* Glowing Strip (Mail Slot Style) */}
                                            <div className="absolute top-[65%] w-24 h-2 bg-[#daa520]/5 blur-lg" />
                                            <div className="absolute top-[65%] w-20 h-[1.5px] bg-[#daa520] shadow-[0_0_25px_#daa520,0_0_50px_rgba(218,165,32,0.6)]" />
                                            
                                            <div className="opacity-5 group-hover:opacity-20 transition-opacity duration-1000">
                                                <Icon size={72} strokeWidth={0.5} className="text-white" />
                                            </div>
                                        </div>

                                        {/* MIDDLE SECTION (Handle Area) */}
                                        <div className="w-full flex justify-between items-center px-4 mb-6 relative">
                                            {/* Glowing High-Intensity Doorknob */}
                                            <div className="w-12 h-12 rounded-full bg-black border-[4px] border-white/10 shadow-[8px_15px_30px_rgba(0,0,0,0.8)] flex items-center justify-center group-hover:border-[#daa520]/40 transition-all duration-700">
                                                <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_20px_#fff,0_0_40px_#fff]" />
                                            </div>
                                            
                                            {/* Decorative Hinge markers on right */}
                                            <div className="flex flex-col gap-1 opacity-20">
                                                <div className="w-4 h-1 bg-white/20" />
                                                <div className="w-4 h-1 bg-white/20" />
                                            </div>
                                        </div>

                                        {/* BOTTOM RECESSED PANELS (Double split for realism) */}
                                        <div className="w-full flex-grow flex gap-4">
                                            <div className="flex-grow h-full border-[8px] border-[#050505] bg-[#0a0a0c] shadow-[inset_4px_8px_30px_rgba(0,0,0,0.9)]" />
                                            <div className="flex-grow h-full border-[8px] border-[#050505] bg-[#0a0a0c] shadow-[inset_4px_8px_30px_rgba(0,0,0,0.9)]" />
                                        </div>

                                        {/* FLOATING HUD OVERLAY (Title) */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
                                            <div className="text-center px-8 py-6 bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:scale-110 group-hover:border-[#daa520]/40 transition-all duration-700">
                                                <span className="text-[10px] tracking-[1em] text-[#daa520] uppercase mb-3 block font-bold">Portal 0{index + 1}</span>
                                                <h3 className="text-3xl font-cinzel text-white tracking-[0.1em] font-black italic whitespace-pre-line">
                                                    {pillar.nameVi.replace(' & ', '\n&\n')}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Atmospheric Shading & Texture */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/20 pointer-events-none" />
                                        <div className="absolute inset-4 border border-white/5 opacity-10 pointer-events-none" />
                                    </div>

                                    {/* --- THE SIGNATURE GLOWING LAMP (From reference image) --- */}
                                    <div className="absolute -right-12 top-[55%] w-16 h-20 flex items-center justify-center z-[100]">
                                        {/* Bracket */}
                                        <div className="w-2 h-16 bg-black border-r border-white/10 shadow-2xl" />
                                        {/* High Intensity Bulb */}
                                        <div className="absolute w-6 h-6 rounded-full bg-white shadow-[0_0_60px_#fff,0_0_120px_#daa520,0_0_180px_rgba(218,165,32,0.8)] animate-pulse" />
                                        {/* Flare Projection on wall/floor */}
                                        <div className="absolute -right-60 w-96 h-[600px] bg-[radial-gradient(circle_at_left,#daa520_0%,transparent_70%)] opacity-0 group-hover:opacity-30 transition-opacity duration-[1.5s] pointer-events-none" />
                                    </div>

                                    {/* OUTER HINGES */}
                                    <div className="absolute left-[-26px] top-[15%] w-2.5 h-16 bg-[#050505] shadow-2xl" />
                                    <div className="absolute left-[-26px] top-[75%] w-2.5 h-16 bg-[#050505] shadow-2xl" />

                                    {/* 3D BEVELS (The "Open" feeling) */}
                                    <div className="absolute left-[-16px] top-0 w-[16px] h-full bg-[#020202] skew-y-[45deg] origin-top-right transform scale-y-[1.01]" />
                                    <div className="absolute top-[-16px] left-0 h-[16px] w-full bg-[#0a0a0c]" />
                                </div>

                                {/* Cinematic Tooltip */}
                                <motion.div 
                                    className="absolute -bottom-24 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0"
                                >
                                    <p className="text-[10px] tracking-[0.4em] font-light text-gray-500 uppercase px-8 mb-4 max-w-[300px] mx-auto">
                                        {pillar.description}
                                    </p>
                                    <div className="w-1 h-1 bg-[#daa520] rotate-45 mx-auto animate-ping" />
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* GRAND FOOTER */}
            <div className="mt-80 flex flex-col items-center gap-10 opacity-30 select-none pointer-events-none z-10">
                <div className="w-px h-40 bg-gradient-to-b from-[#daa520] to-transparent" />
                <span className="font-mono text-[10px] tracking-[3em] text-white ml-[3em] uppercase">Adam Smith Sanctum // Protocol Final</span>
                <div className="text-[8px] font-mono text-gray-700">SECURE_TRANSMISSION_0x9FAC8E // ABSOLUTE_MAXIMUM_DATA</div>
            </div>

            <style jsx global>{`
                .perspective-2000 { perspective: 3500px; }
                .font-cinzel { font-family: 'Cinzel', serif; }
                body { background: #020202; cursor: crosshair; }
                ::-webkit-scrollbar { width: 0px; }
            `}</style>
        </div>
    );
}
