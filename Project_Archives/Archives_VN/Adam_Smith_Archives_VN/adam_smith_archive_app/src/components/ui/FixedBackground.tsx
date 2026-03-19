'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface FixedBackgroundProps {
    src: string;
    opacity?: number;
    mixBlendMode?: string;
}

export default function FixedBackground({ src, opacity = 0.5 }: FixedBackgroundProps) {
    const [mounted, setMounted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (mounted && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.defaultMuted = true;
            videoRef.current.volume = 0;
        }
    }, [mounted]);

    // Prevent hydration mismatch by rendering only on client
    if (!mounted) return null;

    // We render into document.body to break out of any transform/scale contexts from Framer Motion
    return createPortal(
        <div className="fixed inset-0 w-screen h-screen pointer-events-none select-none overflow-hidden" style={{ zIndex: -1 }}>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted={true}

                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity }}
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#000508]/50" />
        </div>,
        document.body
    );
}
