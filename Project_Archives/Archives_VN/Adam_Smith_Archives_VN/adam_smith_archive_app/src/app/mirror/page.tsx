"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomCursor from "@/components/ui/CustomCursor";

export default function MirrorPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const startCamera = async () => {
        setLoading(true);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setStream(mediaStream);
            setHasPermission(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Camera access denied or unavailble. The Shadow remains hidden.");
        } finally {
            setLoading(false);
        }
    };

    // Glitch Effect Loop
    useEffect(() => {
        if (!hasPermission) return;

        let animationFrameId: number;
        const glitchInterval = 150; // ms
        let lastGlitch = 0;

        const draw = (time: number) => {
            if (!canvasRef.current || !videoRef.current) return;
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            const w = canvasRef.current.width;
            const h = canvasRef.current.height;

            // Draw original video frame
            ctx.drawImage(videoRef.current, 0, 0, w, h);

            // Apply shadow filter (High contrast B&W)
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // Convert to grayscale
                let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                // High contrast curve
                v = v < 100 ? v * 0.8 : v * 1.2;

                data[i] = v; // r
                data[i + 1] = v; // g
                data[i + 2] = v; // b
            }
            ctx.putImageData(imageData, 0, 0);

            // Occasional Glitch - The Shadow breaking through
            if (time - lastGlitch > glitchInterval) {
                if (Math.random() > 0.8) {
                    const sliceHeight = Math.random() * 50;
                    const spliceY = Math.random() * h;
                    const offset = (Math.random() - 0.5) * 40;

                    ctx.drawImage(canvasRef.current, 0, spliceY, w, sliceHeight, offset, spliceY, w, sliceHeight);

                    // Color channel shift
                    ctx.globalCompositeOperation = 'multiply';
                    ctx.fillStyle = Math.random() > 0.5 ? '#ff0000' : '#0000ff';
                    ctx.fillRect(0, spliceY, w, sliceHeight);
                    ctx.globalCompositeOperation = 'source-over';
                }
                lastGlitch = time;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [hasPermission]);

    // Cleanup stream on unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return (
        <main className="min-h-screen bg-black text-white font-inter relative overflow-hidden flex flex-col items-center justify-center">
            <CustomCursor />

            <nav className="fixed top-0 left-0 right-0 p-8 z-50 flex justify-between items-start">
                <Link href="/select" className="text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors flex items-center gap-2">
                    <span>←</span> Return to Lab
                </Link>
                <div className="text-right">
                    <div className="text-[10px] tracking-[0.5em] uppercase text-white/20 font-bold mb-1">
                        Shadow Work Protocol
                    </div>
                </div>
            </nav>

            <div className="relative z-10 text-center w-full max-w-4xl px-4">
                {!hasPermission ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-cinzel tracking-tight text-white mb-4">
                            The Shadow Mirror
                        </h1>
                        <p className="text-stone-400 font-light italic max-w-lg leading-relaxed text-sm">
                            "Những gì bạn không muốn nhìn thấy ở bản thân sẽ gặp bạn ở bên ngoài như số phận."
                            <br /><br />
                            Công cụ này sử dụng camera để tạo ra hình ảnh tương phản cao của bạn, mô phỏng việc đối diện với 'Bóng Âm'.
                        </p>
                        <button
                            onClick={startCamera}
                            disabled={loading}
                            className="mt-8 px-10 py-4 border border-white/20 hover:bg-white hover:text-black transition-all rounded-sm uppercase tracking-[0.3em] text-xs font-bold"
                        >
                            {loading ? "Initializing..." : "Face Your Shadow"}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]"
                    >
                        {/* Hidden Source Video */}
                        <video ref={videoRef} autoPlay playsInline muted className="hidden" />

                        {/* Processed Canvas */}
                        <canvas
                            ref={canvasRef}
                            width={640}
                            height={480}
                            className="w-full max-w-[800px] h-auto grayscale contrast-125 brightness-90 block"
                        />

                        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <p className="text-xs uppercase tracking-[0.5em] text-red-500/50 animate-pulse font-mono">
                                Anomalies Detected
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 via-transparent to-black pointer-events-none" />
        </main>
    );
}
