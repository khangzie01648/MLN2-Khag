"use client";

import dynamic from "next/dynamic";

const MandalaScene = dynamic(() => import("@/components/3d/scenes/MandalaWithObjects"), {
    ssr: false,
    loading: () => <div className="h-screen w-full flex items-center justify-center bg-black text-white/20 font-cinzel text-xl tracking-widest animate-pulse">Summoning the Mandala...</div>,
});

export default function MandalaClient() {
    return <MandalaScene />;
}
