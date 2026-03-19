"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShadowMirror() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isReflectionActive, setIsReflectionActive] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: "user"
                    }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setHasPermission(true);
                }
            } catch (err) {
                console.error("Camera error:", err);
                setError("Camera access denied. The Shadow cannot be seen without eyes.");
            }
        };

        startCamera();

        return () => {
            // Cleanup stream
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (!hasPermission) return;

        let animationFrameId: number;
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const render = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                // Set canvas size to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Draw video frame
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Get image data for pixel manipulation
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Time based fluctuation
                const time = Date.now() / 1000;

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // Convert to grayscale (luminance)
                    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

                    // --- SHADOW TREATMENT ---

                    // 1. High Contrast / Threshold
                    // If dark, make it darker (Shadow). If light, keep it ghostly.
                    let v = gray;
                    if (v < 80) v = v * 0.5; // Deepen shadows
                    if (v > 150) v = v * 1.2; // Blow out highlights

                    // 2. Noise / Grain
                    const noise = (Math.random() - 0.5) * 30;
                    v += noise;

                    // 3. Subtle Inversion (Negative Spirit) occasionally
                    // const ghostFactor = Math.sin(time + (i/1000)) > 0.9 ? -1 : 1; 
                    // if (ghostFactor < 0) v = 255 - v;

                    // 4. Color Tint (Sepia/Cyan dead look)
                    data[i] = v;     // R
                    data[i + 1] = v; // G
                    data[i + 2] = v; // B
                }

                ctx.putImageData(imageData, 0, 0);

                // Overlay specific effects (Scanlines, vignetting) could be done via CSS, 
                // but let's add a "Glitch" shift here randomly
                if (Math.random() > 0.95) {
                    const sliceHeight = Math.random() * 50;
                    const sliceY = Math.random() * canvas.height;
                    const sliceX = (Math.random() - 0.5) * 20;
                    try {
                        const slice = ctx.getImageData(0, sliceY, canvas.width, sliceHeight);
                        ctx.putImageData(slice, sliceX, sliceY);
                    } catch (e) { }
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [hasPermission]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
            {/* HIDDEN VIDEO SOURCE */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="hidden"
            />

            {/* THE MIRROR FRAME UI */}
            <div className="relative z-10 w-[80vw] h-[70vh] md:w-[600px] md:h-[800px] border-[20px] border-[#1a1a1a] shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-[#050505] overflow-hidden rounded-t-[200px] rounded-b-[20px]">

                {/* ORNATE BORDER DETAIL */}
                <div className="absolute inset-0 border-[2px] border-amber-900/30 rounded-t-[180px] rounded-b-[10px] pointer-events-none z-50"></div>
                <div className="absolute inset-4 border-[1px] border-amber-600/20 rounded-t-[170px] rounded-b-[5px] pointer-events-none z-50"></div>

                {/* ERROR STATE */}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center text-red-900/50 font-cinzel text-center p-10">
                        {error}
                    </div>
                )}

                {!hasPermission && !error && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-cinzel animate-pulse">
                        Summoning Reflection...
                    </div>
                )}

                {/* PROCESSED CANVAS */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover filter contrast-125 brightness-75 sepia-[0.3]"
                    style={{ transform: 'scaleX(-1)' }} // Mirror effect
                />

                {/* OVERLAY EFFECTS */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 pointer-events-none"></div>

                {/* TEXT REVEAL */}
                <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none p-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 6, repeat: Infinity, repeatDelay: 2 }}
                        className="text-amber-100/40 font-cinzel text-sm md:text-lg tracking-[0.3em] uppercase drop-shadow-lg"
                    >
                        "What you see is the Persona."
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 0] }}
                        transition={{ duration: 6, repeat: Infinity, repeatDelay: 2 }}
                        className="text-red-900/60 font-cinzel text-sm md:text-lg tracking-[0.3em] uppercase mt-2 font-bold drop-shadow-lg"
                    >
                        "What looks back is the Shadow."
                    </motion.p>
                </div>
            </div>

            {/* ATMOSPHERE DUST */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
