"use client";
import React from "react";
import dynamic from "next/dynamic";

const DoorSelection3D = dynamic(() => import("@/components/ui/features/DoorSelection3D"), {
    ssr: false,
});
import ProjectCredits from '@/components/ui/features/ProjectCredits';

export default function SelectionPage() {
    return (
        <main className="min-h-screen bg-[#020202] text-white overflow-hidden font-inter relative" suppressHydrationWarning>
            <div className="relative z-20 w-full h-screen">
                <DoorSelection3D />
            </div>

            {/* --- MINIMALIST FOOTER --- */}
            <div className="fixed bottom-6 left-6 z-30 pointer-events-none opacity-40">
                <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-[#d4af37]">Protocol: Absolute_Data_V4</span>
            </div>

            <ProjectCredits />

        </main>
    );
}
