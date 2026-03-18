import React from "react";
import Link from "next/link";
import SynchronicityOracle from "@/components/ui/features/SynchronicityOracle";
import CustomCursor from "@/components/ui/CustomCursor";

export default function OraclePage() {
    return (
        <main className="min-h-screen bg-[#05000a] text-white font-inter relative overflow-hidden">
            <CustomCursor />

            {/* NAVIGATION HEADER (SYNCHRONIZED) */}
            <nav className="fixed top-8 left-8 right-8 z-50 flex justify-between items-start pointer-events-none font-cinzel">
                <Link 
                    href="/select" 
                    className="pointer-events-auto px-8 py-3 border border-amber-500/30 bg-black/60 backdrop-blur-3xl rounded-full text-[11px] tracking-[0.5em] uppercase text-amber-500/80 font-black hover:bg-amber-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(217,119,6,0.1)]"
                >
                    <span className="hover:tracking-[0.6em] transition-all duration-500">[ Return to Lab ]</span>
                </Link>
                <div className="text-right">
                    <div className="text-[10px] tracking-[0.5em] uppercase text-purple-500/30 font-bold mb-1">
                        Experiment No. 9
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative min-h-screen flex items-center justify-center">
                <SynchronicityOracle />
            </div>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 p-8 text-center pointer-events-none">
                <div className="text-[9px] tracking-[0.6em] uppercase text-white/10">
                    Adam Smith Archive Protocol © 2026
                </div>
            </footer>
        </main>
    );
}
