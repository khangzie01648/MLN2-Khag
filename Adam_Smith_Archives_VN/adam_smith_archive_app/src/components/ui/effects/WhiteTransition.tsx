"use client";

import { motion } from "framer-motion";

export default function WhiteTransition({ isExiting, duration = 1.0 }: { isExiting: boolean; duration?: number }) {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
            initial={{ opacity: isExiting ? 0 : 1 }}
            animate={{ opacity: isExiting ? 1 : 0 }}
            transition={{ duration: duration, ease: "easeInOut" }}
        />
    );
}
