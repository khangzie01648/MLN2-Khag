import React from "react";
import Link from "next/link";
import SynchronicityOracle from "@/components/ui/features/SynchronicityOracle";
import CustomCursor from "@/components/ui/CustomCursor";

export default function OraclePage() {
    return (
        <main className="min-h-screen bg-[#05000a] text-white font-inter relative overflow-hidden">
            <CustomCursor />

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 p-8 z-50 flex justify-between items-start pointer-events-none">
                <Link href="/select" className="pointer-events-auto text-[10px] tracking-[0.4em] uppercase text-purple-300/50 hover:text-purple-300 transition-colors flex items-center gap-2">
                    <span>←</span> Return to Lab
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
