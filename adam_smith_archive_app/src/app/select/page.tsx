"use client";
import React from "react";
import dynamic from "next/dynamic";

const DoorSelection3D = dynamic(() => import("@/components/ui/features/DoorSelection3D"), {
    ssr: false,
});

export default function SelectionPage() {
    return (
        <main className="min-h-screen bg-[#020202] text-white overflow-hidden font-inter relative" suppressHydrationWarning>
            <div className="relative z-20 w-full h-screen">
                <DoorSelection3D />
            </div>
        </main>
    );
}
