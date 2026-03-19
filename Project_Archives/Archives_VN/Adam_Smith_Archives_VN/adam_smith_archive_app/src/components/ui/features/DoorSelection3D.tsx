"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

/**
 * NEURAL HOLOGRAPH - V4.8 ERROR SHIELD
 * Fix: Red Overlay (NotReadableError) & Variable Scoping Errors
 */

const NeuralController = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const redirectingRef = useRef(false);
    const [gestureStatus, setGestureStatus] = useState("Đang khởi tạo linh hồn số...");
    const [particleColor, setParticleColor] = useState("#00f2fe");
    const [cameraAvailable, setCameraAvailable] = useState<boolean | null>(null);

    const brainGroupRef = useRef<THREE.Group | null>(null);
    const mainModelRef = useRef<THREE.Object3D | null>(null);
    const targetExpansionRef = useRef(1.0);
    const currentExpansionRef = useRef(1.0);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (initializedRef.current) return;
        initializedRef.current = true;

        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let brainGroup: THREE.Group;
        let animationFrameId: number;
        let hands: any = null;
        let cameraPipe: any = null;

        const init = async () => {
            try {
                // 1. Tải thư viện 3D trước
                const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

                if (!mountRef.current) return;

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.set(0, 0, 8);

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                mountRef.current.appendChild(renderer.domElement);

                brainGroup = new THREE.Group();
                scene.add(brainGroup);
                brainGroupRef.current = brainGroup;

                const loader = new GLTFLoader();

                // LOAD BRAIN MODEL (Sử dụng đúng tệp brain_hologram.glb)
                loader.load('/brain_hologram.glb', (gltf) => {
                    const mainModel = gltf.scene;
                    const box = new THREE.Box3().setFromObject(mainModel);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 4.5 / maxDim;

                    mainModel.position.sub(center);
                    mainModel.scale.set(scale, scale, scale);

                    // Hologram Material
                    const holoColor = new THREE.Color(particleColor);
                    mainModel.traverse((obj) => {
                        if ((obj as THREE.Mesh).isMesh) {
                            const mesh = obj as THREE.Mesh;
                            mesh.material = new THREE.MeshPhongMaterial({
                                color: holoColor,
                                transparent: true,
                                opacity: 0.25, // Tăng nhẹ độ đậm để rõ cấu trúc
                                wireframe: false, // Tắt wireframe để giữ khối gốc
                                blending: THREE.AdditiveBlending,
                                side: THREE.DoubleSide,
                                shininess: 100
                            });

                            const pointsGeom = mesh.geometry.clone();
                            const pointsMat = new THREE.PointsMaterial({
                                size: 0.015,
                                color: holoColor,
                                transparent: true,
                                opacity: 0.4, // Giảm độ đậm của hạt để không đè lên khối gốc
                                blending: THREE.AdditiveBlending
                            });
                            const points = new THREE.Points(pointsGeom, pointsMat);
                            mesh.add(points);
                        }
                    });

                    brainGroup.add(mainModel);
                    mainModelRef.current = mainModel;
                    setGestureStatus("Hệ thống sẵn sàng");
                }, undefined, (err) => {
                    console.warn("3D Load Bypass:", err);
                    setGestureStatus("Sử dụng Matrix ảo");
                });

                scene.add(new THREE.AmbientLight(0xffffff, 0.6));
                const p1 = new THREE.PointLight(0x00f2fe, 5);
                p1.position.set(10, 10, 10);
                scene.add(p1);

                // --- CAMERA PROBE (Bản vá lỗi đỏ NotReadableError) ---
                probeCamera();

                const animate = () => {
                    animationFrameId = requestAnimationFrame(animate);
                    
                    // ACCELERATED DAMPING: Speed up as we get closer to the limit
                    const factor = currentExpansionRef.current > 7 ? 0.2 : 0.1;
                    currentExpansionRef.current += (targetExpansionRef.current - currentExpansionRef.current) * factor;

                    if (brainGroup) {
                        brainGroup.scale.set(currentExpansionRef.current, currentExpansionRef.current, currentExpansionRef.current);
                        brainGroup.rotation.y += 0.005;
                        brainGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15;
                    }

                    // Pulse Effect
                    const time = Date.now() * 0.001;
                    if (mainModelRef.current) {
                        mainModelRef.current.traverse((obj) => {
                            if ((obj as THREE.Mesh).isMesh) {
                                ((obj as THREE.Mesh).material as THREE.MeshPhongMaterial).opacity = 0.1 + Math.abs(Math.sin(time * 1.5)) * 0.15;
                            }
                        });
                    }

                    // White Out Transition logic - SMARTER & FASTER
                    if (flashRef.current) {
                        const expansion = currentExpansionRef.current;
                        
                        // Start fading earlier
                        if (expansion > 7.0) {
                            const flashOpacity = Math.min(1, (expansion - 7.0) / 2.2);
                            flashRef.current.style.opacity = flashOpacity.toString();
                            flashRef.current.style.pointerEvents = flashOpacity > 0.8 ? 'auto' : 'none';
                        }

                        // EARLY REDIRECT: Don't wait for 9.95
                        if (expansion > 9.2 && !redirectingRef.current) {
                            redirectingRef.current = true;
                            
                            // 1. FORCE FINAL STATE
                            flashRef.current.style.opacity = "1";
                            
                            // 2. KILL ALL HEAVY PROCESSES TO FREE CPU
                            if (cameraPipe) {
                                try { cameraPipe.stop(); } catch(e){}
                            }
                            if (hands) {
                                try { hands.close(); } catch(e){}
                            }
                            
                            // 3. EXECUTE PUSH
                            router.push('/select/door');

                            // 4. STOP RENDERING
                            cancelAnimationFrame(animationFrameId);
                        }
                    }

                    renderer.render(scene, camera);
                };
                animate();

                const handleResize = () => {
                    if (camera && renderer) {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    }
                };
                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('resize', handleResize);
                    cancelAnimationFrame(animationFrameId);
                    if (hands) try { hands.close(); } catch (e) { }
                    if (cameraPipe) try { cameraPipe.stop(); } catch (e) { }
                    if (mountRef.current && renderer?.domElement) mountRef.current.removeChild(renderer.domElement);
                };
            } catch (err) {
                console.error("Critical suite fail:", err);
            }
        };

        const probeCamera = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setCameraAvailable(false);
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                stream.getTracks().forEach(track => track.stop());
                initMediaPipe();
            } catch (e) {
                setCameraAvailable(false);
                setGestureStatus("Manual Mode (Camera Busy)");
            }
        };

        const initMediaPipe = async () => {
            try {
                const { Hands } = await import('@mediapipe/hands');
                const { Camera } = await import('@mediapipe/camera_utils');

                hands = new Hands({
                    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
                });
                hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.7 });

                hands.onResults((results: any) => {
                    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                        setGestureStatus("Neural Link Active");
                        
                        // PREFETCH DOOR CORRIDOR AS SOON AS HAND IS DETECTED
                        router.prefetch('/select/door');
                        
                        const landmarks = results.multiHandLandmarks[0];
                        const dist = Math.hypot(landmarks[4].x - landmarks[8].x, landmarks[4].y - landmarks[8].y);
                        targetExpansionRef.current = Math.max(0.5, Math.min(10.0, THREE.MathUtils.mapLinear(dist, 0.05, 0.4, 1.0, 10.0)));
                    } else {
                        targetExpansionRef.current = 1.0;
                        setGestureStatus("Waiting for Gesture...");
                    }
                });

                if (videoRef.current) {
                    cameraPipe = new Camera(videoRef.current, {
                        onFrame: async () => { if (hands) await hands.send({ image: videoRef.current! }).catch(() => { }); },
                        width: 640, height: 480
                    });
                    cameraPipe.start().then(() => setCameraAvailable(true)).catch(() => setCameraAvailable(false));
                }
            } catch (e) {
                setCameraAvailable(false);
            }
        };

        const cleanupFunction = init();
        return () => { cleanupFunction.then(cf => cf && cf()); };
    }, []);

    // --- DEEP ASSET PRELOADING ---
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/doors_pack.glb';
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        return () => {
            if (document.head.contains(link)) document.head.removeChild(link);
        };
    }, []);

    // Sync Color
    useEffect(() => {
        if (brainGroupRef.current) {
            const newColor = new THREE.Color(particleColor);
            brainGroupRef.current.traverse((obj) => {
                if ((obj as any).isMesh) {
                    const mesh = obj as THREE.Mesh;
                    (mesh.material as THREE.MeshPhongMaterial).color = newColor;
                    mesh.children.forEach(c => {
                        if ((c as any).isPoints) {
                            ((c as THREE.Points).material as THREE.PointsMaterial).color = newColor;
                        }
                    });
                }
            });
        }
    }, [particleColor]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#000008] text-white font-sans">
            <div ref={mountRef} className="absolute inset-0" />

            <div className="absolute top-[40px] left-[40px] z-[100] bg-black/50 backdrop-blur-3xl p-10 rounded-[30px] border border-cyan-500/30 shadow-[0_0_60px_rgba(0,242,254,0.15)] group transition-all hover:border-cyan-400">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    <h1 className="m-0 text-[1.5rem] text-cyan-400 tracking-[8px] font-black uppercase drop-shadow-[0_0_10px_rgba(0,242,254,0.5)]">NEURAL HOLOGRAM</h1>
                </div>
                <p className="text-[10px] opacity-40 mb-10 tracking-[5px] uppercase font-bold">Protocol: Gateway_Protocol_v5.4</p>

                <div className="space-y-8">
                    <div className="group/item">
                        <label className="block text-[9px] uppercase mb-4 opacity-50 tracking-[3px] font-black group-hover/item:opacity-100 transition-opacity">Holo-Core Color</label>
                        <div className="flex items-center gap-6">
                            <input
                                type="color"
                                value={particleColor}
                                onChange={(e) => setParticleColor(e.target.value)}
                                className="w-16 h-16 cursor-pointer bg-transparent border-0 rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-110 active:scale-95"
                            />
                            <div className="font-mono">
                                <span className="text-sm text-cyan-400 font-black tracking-widest uppercase">{particleColor}</span>
                                <div className="text-[8px] text-cyan-400/50 mt-1 uppercase font-bold">MODE: {cameraAvailable === false ? 'SILENT FALLBACK' : 'STABLE'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-[9px] uppercase opacity-40 font-black tracking-[2px]">Neural State</div>
                            <div className={`text-[11px] font-black uppercase tracking-tight ${gestureStatus.includes('Active') ? 'text-cyan-300' : 'text-gray-500'}`}>{currentExpansionRef.current > 5 ? `MACRO SCAN: ${currentExpansionRef.current.toFixed(1)}x` : gestureStatus}</div>
                        </div>
                        <div className="flex gap-1.5 items-end h-6">
                            {[1, 0.6, 0.8, 0.4, 1, 0.7].map((h, i) => (
                                <div key={i} className="w-1 bg-cyan-400/50 animate-bounce" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                    </div>
                </div>

                {cameraAvailable === false && (
                    <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                        <p className="text-[8px] text-rose-400 font-bold tracking-widest uppercase mb-1">Hardware Conflict Detected</p>
                        <p className="text-[7px] text-rose-400/60 uppercase">Camera bypass activated to prevent system crash.</p>
                    </div>
                )}
            </div>

            <div className={`absolute bottom-[40px] right-[40px] w-64 h-48 rounded-[35px] border transition-all duration-700 ${cameraAvailable === false ? 'border-white/5 opacity-5' : 'border-cyan-500/20'} overflow-hidden shadow-2xl group`}>
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1] opacity-70 brightness-110 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-5 text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-[3px] opacity-20">Live_Feed</div>
                {cameraAvailable === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <span className="text-[8px] font-black text-rose-400 tracking-[3px] uppercase">SIGNAL_BUSY</span>
                    </div>
                )}
            </div>

            <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 opacity-25 text-[9px] tracking-[1.4em] uppercase whitespace-nowrap font-black text-cyan-100 cursor-default hover:opacity-50 transition-opacity">
                Absolute Maximum Data Edition | Safe Start
            </div>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #00f2fe 1px, transparent 1px), linear-gradient(to bottom, #00f2fe 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            {/* WHITE OUT TRANSITION LAYER */}
            <div
                ref={flashRef}
                className="fixed inset-0 z-[1000] bg-white opacity-0 pointer-events-none transition-opacity duration-150"
                style={{ backdropFilter: 'blur(10px)' }}
            />

            <style jsx>{``}</style>
        </div>
    );
};

export default NeuralController;