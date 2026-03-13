"use client";

import { motion } from "framer-motion";

// Simple overlay that handles fading to/from black
export default function BlackFadeTransition({ isExiting, duration = 1.0 }: { isExiting: boolean; duration?: number }) {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            initial={{ opacity: 1 }} // Start black (if mounting fresh) or transparent? 
            // We want: 
            // Mount -> Fade Out Black (Reveal Scene)
            // Exit -> Fade In Black (Hide Scene)
            // But usually we mount with opacity 1 then animate to 0.
            animate={{ opacity: isExiting ? 1 : 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: duration, ease: "easeInOut" }}
        />
    );
}
