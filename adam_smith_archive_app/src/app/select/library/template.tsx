'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for "Cinematic" feel
            }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
