import React from "react";
import AdamSmithDoors from "@/components/ui/features/AdamSmithDoors";

export default function SelectionPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-y-auto overflow-x-hidden font-inter relative" suppressHydrationWarning>

            {/* --- BACKGROUND VIDEO --- */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-30 contrast-125 grayscale"
                >
                    <source src="/vid2.mp4" type="video/mp4" />
                </video>
            </div>

            {/* --- GRADIENT OVERLAY --- */}
            <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black pointer-events-none" />

            {/* --- THE 5 DOORS (PILLARS) --- */}
            <div className="relative z-20">
                <AdamSmithDoors />
            </div>

            {/* --- MINIMALIST FOOTER --- */}
            <div className="fixed bottom-6 left-6 z-30 pointer-events-none opacity-40">
                <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-[#d4af37]">Protocol: Mindscape_V3</span>
            </div>

        </main>
    );
}
