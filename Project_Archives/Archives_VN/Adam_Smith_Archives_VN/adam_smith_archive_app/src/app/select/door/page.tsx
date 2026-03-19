"use client";
import React from "react";
import dynamic from "next/dynamic";

const DoorCorridor3D = dynamic(() => import("@/components/ui/features/DoorCorridor3D"), {
    ssr: false,
});

export default function DoorSelectionPage() {
    return (
        <main className="min-h-screen bg-[#020202] text-white overflow-hidden relative">
            <DoorCorridor3D />
        </main>
    );
}
