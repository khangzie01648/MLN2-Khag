"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MindscapeScene from '@/components/3d/scenes/MindscapeScene';
import CustomCursor from '@/components/ui/CustomCursor';
import ProjectCredits from '@/components/ui/features/ProjectCredits';

// --- PEAK CREATIVITY: NEURAL CONVERGENCE SYSTEM ---
const ConvergenceLetter = ({ char, index, isHovered }: any) => {
   // Stabilized scatter: Wide horizontal layout instead of random chaos
   const scatteredX = (index - 4.5) * 60;
   const scatteredY = (index % 2 === 0 ? 3 : -3); // Tiny rhythmic offset

   const springConfig = { stiffness: 120, damping: 20 };
   const x = useSpring(useMotionValue(scatteredX), springConfig);
   const y = useSpring(useMotionValue(scatteredY), springConfig);
   const rotate = useSpring(useMotionValue(0), springConfig);

   useEffect(() => {
      if (isHovered) {
         x.set(0);
         y.set(0);
         rotate.set(0);
      } else {
         x.set(scatteredX);
         y.set(scatteredY);
         rotate.set(0);
      }
   }, [isHovered, scatteredX, scatteredY]);

   return (
      <motion.span
         style={{ x, y, rotate, display: 'inline-block' }}
         className={`text-2xl md:text-5xl font-black font-cinzel transition-colors duration-700 ${isHovered ? 'text-white' : 'text-white/10'}`}
      >
         {char}
      </motion.span>
   );
};

export default function Home() {
   const [mounted, setMounted] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);
   const router = useRouter();
   const [isTransitioning, setIsTransitioning] = useState(false);
   const [showVideo, setShowVideo] = useState(false);

   // --- FIXED HYPER-LOGIC: MAGNETIC TARGETING SYSTEM ---
   const targetX = useMotionValue(0);
   const targetY = useMotionValue(0);

   const coreX = useSpring(targetX, { stiffness: 150, damping: 25 });
   const coreY = useSpring(targetY, { stiffness: 150, damping: 25 });

   useEffect(() => {
      setMounted(true);
   }, []);

   const handleInitialize = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsTransitioning(true);
      
      // PREFETCH NEXT PAGE TO KILL LAG
      router.prefetch('/select');
      
      // Give the browser 100ms to fade out the 3D/UI before launching the video
      setTimeout(() => {
         setShowVideo(true);
      }, 150);
   };

   const handleVideoEnd = () => {
      router.push('/select');
   };

   const handleMouseMove = (e: React.MouseEvent) => {
      if (!isHovered || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to center
      const valX = e.clientX - (rect.left + rect.width / 2);
      const valY = e.clientY - (rect.top + rect.height / 2);

      targetX.set(valX * 0.4); // Subtle attraction
      targetY.set(valY * 0.4);
   };

   const handleMouseLeave = () => {
      setIsHovered(false);
      targetX.set(0); // Snap back to center
      targetY.set(0);
   };

   const letters = "INITIALIZE".split("");

   if (!mounted) return null;

   return (
      <div 
         suppressHydrationWarning 
         className="relative w-screen h-screen bg-[#020202] text-white overflow-hidden font-montserrat select-none antialiased selection:bg-[#daa520] selection:text-[#020202]"
      >

         {/* 1. HIDDEN PRELOADER - MOVED & STYLED TO AVOID EXTENSIONS */}
         <video preload="auto" style={{ display: 'none', visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}>
            <source src="/transition.mp4" type="video/mp4" />
         </video>

         <CustomCursor />

         {/* 2. OPTIMIZED 3D ABYSS BACKGROUND */}
         {!isTransitioning && (
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-[#020202]/20 z-10" />
               <MindscapeScene />
            </div>
         )}

         {/* MAIN BRANDING - THE MONOLITH */}
         <main className={`relative h-full w-full z-20 flex flex-col items-center justify-center p-12 mt-[-10vh] transition-opacity duration-1000 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <motion.div
               animate={{ opacity: isHovered ? 0.05 : 1, scale: isHovered ? 0.95 : 1 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="relative flex flex-col items-center group cursor-default"
            >
               <div className="relative mb-[-1.5rem] md:mb-[-4.5rem]">
                  <h1 className="text-7xl md:text-[15rem] font-bold font-cinzel leading-none tracking-tighter text-white z-20 transition-all duration-1000 group-hover:tracking-normal drop-shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                     ADAM
                  </h1>
               </div>

               <div className="relative flex items-center justify-center font-cinzel select-none">
                  <div className="flex items-center gap-[0.2em] md:gap-[0.4em] transform translate-y-[-15%]">
                     <span className="text-4xl md:text-[10rem] font-light italic text-[#daa520]/20 tracking-[0.1em] uppercase text-right w-[1.4em] md:w-[2.1em] transition-all duration-1000 group-hover:text-[#daa520]/70">
                        SM
                     </span>
                     <div className="w-[1.6em] md:w-[2.6em] h-[5rem] md:h-[14rem] flex items-center justify-center relative">
                        <div className="text-white/0 select-none">I</div>
                     </div>
                     <span className="text-4xl md:text-[10rem] font-light italic text-[#daa520]/20 tracking-[0.1em] uppercase text-left w-[1.4em] md:w-[2.1em] transition-all duration-1000 group-hover:text-[#daa520]/70">
                        TH
                     </span>
                  </div>
               </div>
            </motion.div>
         </main>

         {/* PEAK CREATIVITY: THE SINGULARITY CONVERGENCE GATEWAY */}
         <div
            ref={containerRef}
            className={`absolute inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
         >
            <div
               onClick={handleInitialize}
               onMouseMove={handleMouseMove}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={handleMouseLeave}
               className="relative w-full h-[40vh] mt-[50vh] flex items-center justify-center pointer-events-auto cursor-none outline-none"
            >
               {/* THE CORE - DARK MATTER BLOB */}
               <motion.div
                  style={{ x: coreX, y: coreY }}
                  className="relative flex items-center justify-center w-32 h-32 md:w-64 md:h-64"
               >
                  {/* Outer Prismatic Aura */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#daa520]/40 via-purple-500/20 to-blue-500/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse`} />

                  {/* The Liquid Core */}
                  <motion.div
                     animate={{
                        scale: isHovered ? 1.1 : 0.8,
                        rotate: [0, 90, 180, 270, 360],
                        borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "50% 50% 20% 80% / 30% 80% 20% 70%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                     }}
                     transition={{ scale: { duration: 1 }, rotate: { duration: 10, repeat: Infinity, ease: "linear" }, borderRadius: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                     className="w-20 h-20 md:w-32 md:h-32 bg-white/10 group-hover:bg-[#daa520] transition-colors duration-1000 shadow-[0_0_50px_rgba(218,165,32,0.4)] relative z-10 overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] opacity-30 group-hover:opacity-100" />
                  </motion.div>

                  {/* Convergence Letters Layer - Perfect Centering */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="relative flex items-center justify-center gap-2 md:gap-4">
                        {letters.map((char, i) => (
                           <ConvergenceLetter
                              key={i}
                              char={char}
                              index={i}
                              isHovered={isHovered}
                           />
                        ))}
                     </div>
                  </div>

                  {/* HUD Diagnostic Brackets (Appearing on hover) */}
                  <AnimatePresence>
                     {isHovered && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1.2 }}
                           exit={{ opacity: 0, scale: 1.5 }}
                           className="absolute inset-[-40px] pointer-events-none"
                        >
                           <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#daa520]/60" />
                           <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#daa520]/60" />
                           <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#daa520]/60" />
                           <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#daa520]/60" />

                           {/* Data Stream */}
                           <div className="absolute -top-12 left-1/2 -translate-x-1/2 overflow-hidden w-64 h-4 flex justify-center">
                              <motion.span
                                 animate={{ x: [-100, 100] }}
                                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                 className="text-[6px] tracking-[1em] font-mono text-[#daa520] whitespace-nowrap"
                              >
                                 DECRYPTING_NEURAL_PATHWAY_STABLE_0x9FAC
                              </motion.span>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </div>
         </div>

         {/* TRANSITION OVERLAY VIDEO */}
         <AnimatePresence>
            {showVideo && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="fixed inset-0 z-[100] bg-black overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
               >
                  <video
                     autoPlay
                     muted
                     playsInline
                     onEnded={handleVideoEnd}
                     className="w-full h-full object-cover"
                     style={{ willChange: 'transform, opacity' }}
                  >
                     <source src="/transition.mp4" type="video/mp4" />
                  </video>
                  
               </motion.div>
            )}
         </AnimatePresence>

         {/* CINEMATIC FINISHES */}
         <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
         <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_90%)]" />

         <ProjectCredits />

         <style jsx global>{`
            body { background: #020202; }
            .font-cinzel { font-family: 'Cinzel', serif; }
            @keyframes spin-slow {
               from { transform: rotate(0deg); }
               to { transform: rotate(360deg); }
            }
         `}</style>
      </div>
   );
}
