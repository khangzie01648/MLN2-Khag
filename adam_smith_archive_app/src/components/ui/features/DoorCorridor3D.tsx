"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PILLARS } from '@/lib/pillar-constants';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const DoorCorridor3D = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState("Initializing Sanctum...");
    const [hoveredPillar, setHoveredPillar] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitioningRef = useRef(false);
    const [targetUrl, setTargetUrl] = useState<string>("");
    const router = useRouter();
    const initializedRef = useRef(false);
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const [mounted, setMounted] = useState(false);

    // 1. FIRST PASS: Handle the hydration/mounting state
    useEffect(() => {
        setMounted(true);
    }, []);

    // 2. SECOND PASS: Initialize Three.js ONLY after mountRef is guaranteed to exist
    useEffect(() => {
        if (!mounted || !mountRef.current || initializedRef.current) return;
        initializedRef.current = true;

        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let animationFrameId: number;
        let doorsGroup: THREE.Group;

        const init = async () => {
            try {
                const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

                scene = new THREE.Scene();
                scene.background = new THREE.Color(0x020202);
                scene.fog = new THREE.FogExp2(0x020202, 0.08);

                camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.set(0, 1.5, 10);

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                renderer.toneMapping = THREE.ReinhardToneMapping;
                renderer.toneMappingExposure = 1.2;

                if (mountRef.current) {
                    mountRef.current.appendChild(renderer.domElement);
                }

                doorsGroup = new THREE.Group();
                scene.add(doorsGroup);

                // LIGHTING
                scene.add(new THREE.AmbientLight(0xffffff, 0.4));
                const sun = new THREE.DirectionalLight(0xffd700, 0.8);
                sun.position.set(5, 10, 5);
                scene.add(sun);

                // Floor
                const floorGeom = new THREE.PlaneGeometry(100, 100);
                const floorMat = new THREE.MeshStandardMaterial({
                    color: 0x050505,
                    roughness: 0.1,
                    metalness: 0.5
                });
                const floor = new THREE.Mesh(floorGeom, floorMat);
                floor.rotation.x = -Math.PI / 2;
                scene.add(floor);

                // LOAD DOORS PACK
                const loader = new GLTFLoader();
                loader.load('/doors_pack.glb', (gltf: any) => {
                    const model = gltf.scene;

                    setTimeout(() => {
                        let root: any = model;
                        while (root.children.length === 1 && root.children[0].children.length > 0) {
                            root = root.children[0];
                        }

                        const entities = root.children.filter((child: any) => {
                            let hasMesh = false;
                            child.traverse((n: any) => { if (n.isMesh) hasMesh = true; });
                            return hasMesh;
                        }).map((node: any) => {
                            const box = new THREE.Box3().setFromObject(node);
                            const center = new THREE.Vector3();
                            box.getCenter(center);
                            return { node, x: center.x };
                        });

                        entities.sort((a: any, b: any) => a.x - b.x);

                        let groups: any[][] = entities.map((e: any) => [e]);
                        while (groups.length > 7) {
                            let minDistance = Infinity;
                            let mergeIdx = -1;
                            for (let i = 0; i < groups.length - 1; i++) {
                                const dist = groups[i + 1][0].x - groups[i][groups[i].length - 1].x;
                                if (dist < minDistance) {
                                    minDistance = dist;
                                    mergeIdx = i;
                                }
                            }
                            if (mergeIdx !== -1) {
                                groups[mergeIdx] = [...groups[mergeIdx], ...groups[mergeIdx + 1]];
                                groups.splice(mergeIdx + 1, 1);
                            } else break;
                        }

                        groups.forEach((group, idx) => {
                            if (PILLARS[idx]) {
                                group.forEach((item: any) => {
                                    item.node.traverse((n: any) => {
                                        if (n.isMesh) {
                                            n.userData.pillarId = PILLARS[idx].id;
                                            n.frustumCulled = true;
                                        }
                                    });
                                });
                            }
                        });

                        const box = new THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new THREE.Vector3());
                        model.position.sub(center);
                        model.position.y = 0;

                        doorsGroup.add(model);
                        model.traverse((child: any) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        setStatus("Sanctum Ready.");
                    }, 0);
                }, undefined, (err) => {
                    console.error("GLTF Load Error:", err);
                    setStatus("Sanctum Failure.");
                });

                const onMouseMove = (event: MouseEvent) => {
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                };

                const onClick = (e: MouseEvent) => {
                    if (transitioningRef.current) return;
                    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);

                    const intersects = raycaster.intersectObjects(doorsGroup.children, true);
                    if (intersects.length > 0) {
                        let obj = intersects[0].object;
                        while (obj.parent && !obj.userData.pillarId) {
                            obj = obj.parent;
                        }

                        if (obj.userData.pillarId) {
                            const pillar = PILLARS.find(p => p.id === obj.userData.pillarId);
                            if (pillar) {
                                const url = `/select/door/${pillar.id}`;
                                setTargetUrl(url);
                                router.prefetch(url);
                                setIsTransitioning(true);
                                transitioningRef.current = true;
                                setStatus(`Descending into ${pillar.name}...`);
                            }
                        }
                    }
                };
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('click', onClick);

                const animate = () => {
                    if (transitioningRef.current) return;
                    animationFrameId = requestAnimationFrame(animate);

                    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
                    camera.lookAt(0, 1.2, -5);

                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(doorsGroup.children, true);
                    const pId = intersects.length > 0 ? intersects[0].object.userData.pillarId : null;
                    const p = pId ? PILLARS.find(pillar => pillar.id === pId) : null;
                    setHoveredPillar(p);
                    document.body.style.cursor = p ? 'pointer' : 'crosshair';

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
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('click', onClick);
                    cancelAnimationFrame(animationFrameId);
                    if (renderer) {
                        renderer.dispose();
                        if (mountRef.current && renderer.domElement) {
                            mountRef.current.removeChild(renderer.domElement);
                        }
                    }
                };
            } catch (err) {
                console.error("3D Error:", err);
            }
        };

        init();
    }, [mounted]); // RE-RUN WHEN MOUNTED BECOMES TRUE

    // --- PRELOAD AND TRANSITION OPTIMIZATION ---
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/chuyencanhsau_final.mp4';
        link.as = 'video';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        return () => {
            if (document.head.contains(link)) document.head.removeChild(link);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-screen bg-[#020202] text-white overflow-hidden">
            <div ref={mountRef} className="absolute inset-0 z-0" />

            <AnimatePresence>
                {isTransitioning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0.15 }} // ULTRA FAST FLASH ON CLICK
                        className="fixed inset-0 z-[99999] bg-white"
                    />
                )}
            </AnimatePresence>

            {/* CONSOLIDATED HUD HEADER (SYNCHRONIZED & DECORATED) */}
            <div className="fixed top-8 left-8 z-[1000] flex items-center gap-10 pointer-events-none">
                <button
                    onClick={() => router.push('/select')}
                    className="pointer-events-auto px-8 py-3 border border-amber-500/30 bg-black/60 backdrop-blur-3xl rounded-full text-[11px] font-cinzel tracking-[0.5em] uppercase text-amber-500/80 font-black hover:bg-amber-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(217,119,6,0.1)] group"
                >
                    <span className="group-hover:tracking-[0.6em] transition-all duration-500">[ Return to Mandala ]</span>
                </button>

                {/* VERTICAL DIVIDER */}
                <div className="w-[1px] h-8 bg-amber-500/20" />

                {/* DECORATED TITLE */}
                <div className="flex flex-col">
                    <h2 className="text-[11px] font-cinzel tracking-[0.8em] uppercase text-amber-400/80 leading-none">Internal Monologue</h2>
                    <div className="flex items-center gap-4 mt-1">
                        <span className="text-[8px] font-mono tracking-[0.3em] text-white/20 uppercase whitespace-nowrap">SANCTUM_PROTOCOL_0x9FAC</span>
                        <div className="w-12 h-[0.5px] bg-amber-500/10" />
                    </div>
                </div>
            </div>
            {/* UI Overlay */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* PEAK CREATIVITY: THE NEURAL MANIFESTO UI */}
                <AnimatePresence>
                    {hoveredPillar && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                        >
                            {/* 1. LAYER: DYNAMIC BACKGROUND GLOW */}
                            <div
                                className="absolute w-[60vw] h-[60vw] rounded-full opacity-10 blur-[120px] transition-colors duration-1000"
                                style={{ backgroundColor: hoveredPillar.color }}
                            />

                            {/* 2. LAYER: MONOLITHIC INDEX */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                                <span className="text-[25vw] font-black text-white/[0.03] font-cinzel italic tracking-widest uppercase">
                                    {PILLARS.indexOf(hoveredPillar) + 1}
                                </span>
                            </div>

                            {/* 3. LAYER: MAIN ARCHITECTURE */}
                            <div className="relative flex flex-col items-start max-w-7xl px-12">

                                {/* Main Titles */}
                                <div className="relative">
                                    <motion.h1
                                        initial={{ x: -50 }}
                                        animate={{ x: 0 }}
                                        className="text-6xl md:text-[8rem] font-cinzel font-black text-white leading-none tracking-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                    >
                                        {hoveredPillar.name.split(' ')[0]}
                                        <span className="block text-4xl md:text-[5rem] font-light italic text-white/50 -mt-4">
                                            {hoveredPillar.name.split(' ').slice(1).join(' ')}
                                        </span>
                                    </motion.h1>

                                    {/* Decorator Line */}
                                    <div className="absolute -left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                </div>

                                {/* Vietnamese Subtitle with Sidebox */}
                                <div className="mt-8 flex items-center gap-8 pl-4">
                                    <div className="px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-md">
                                        <h2 className="text-xl md:text-3xl font-light tracking-[0.5em] text-white uppercase m-0">
                                            {hoveredPillar.nameVi}
                                        </h2>
                                    </div>
                                    <div className="hidden md:flex flex-col gap-1">
                                        <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]">Neural_Path: Stored</span>
                                        <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]">Encryption: SHA-256</span>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Transition Video Portal */}
            {isTransitioning && (
                <div
                    className="fixed inset-0 z-[99999] overflow-hidden bg-black flex items-center justify-center pointer-events-auto"
                    style={{ isolation: 'isolate' }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .ultimate-force-video {
                            position: fixed !important;
                            top: 50% !important;
                            left: 50% !important;
                            width: 100vw !important;
                            height: 100vh !important;
                            object-fit: fill !important;
                            transform: translate(-50%, -50%) !important;
                            z-index: 999999 !important;
                            aspect-ratio: auto !important;
                            background: black !important;
                        }
                        video::-webkit-media-controls { display: none !important; }
                        body { overflow: hidden !important; margin: 0 !important; }
                    ` }} />

                    <button
                        onClick={() => router.push(targetUrl)}
                        className="fixed top-8 right-8 z-[1000000] px-8 py-3 border border-amber-500/30 bg-black/60 backdrop-blur-3xl rounded-full text-[11px] font-cinzel tracking-[0.5em] uppercase text-amber-500/80 font-black hover:bg-amber-500 hover:text-black hover:scale-110 active:scale-95 transition-all pointer-events-auto shadow-[0_0_30px_rgba(217,119,6,0.1)] group"
                    >
                        <span className="group-hover:tracking-[0.6em] transition-all duration-500">[ Skip Sequence ]</span>
                    </button>

                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <span className="text-amber-500/40 font-mono text-[9px] tracking-[1em] animate-pulse">CONNECTING TO ARCHIVE...</span>
                    </div>

                    <video
                        autoPlay
                        playsInline
                        preload="auto"
                        className="ultimate-force-video"
                        onEnded={() => router.push(targetUrl)}
                    >
                        <source src="/chuyencanhsau_final.mp4" type="video/mp4" />
                    </video>
                </div>
            )}

            <style jsx>{`
                .font-cinzel { font-family: 'Cinzel', serif; }
            `}</style>
        </div>
    );
};

export default DoorCorridor3D;
