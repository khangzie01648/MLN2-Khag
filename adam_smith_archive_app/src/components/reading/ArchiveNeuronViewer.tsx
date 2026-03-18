'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, useGLTF, Html, PerspectiveCamera, OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import LegacyGrimoireReader from './LegacyGrimoireReader';

interface PageData {
    id: number;
    title: string;
    content: string;
}

function CursorLight() {
    const lightRef = useRef<THREE.PointLight>(null);
    const { viewport, mouse } = useThree();

    useFrame(() => {
        if (lightRef.current) {
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            lightRef.current.position.set(x, y, 10);
        }
    });

    return <pointLight ref={lightRef} intensity={2} color="#fbbf24" distance={50} />;
}

function NeuronIcon({ position, page, isSelected, onSelect, index, modelPath }: {
    position: [number, number, number],
    page: PageData,
    isSelected: boolean,
    onSelect: (page: PageData) => void,
    index: number,
    modelPath: string
}) {
    const { scene } = useGLTF(modelPath);
    const model = useMemo(() => {
        const cloned = scene.clone();
        const box = new THREE.Box3().setFromObject(cloned);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 7.0 / maxDim; // Balanced size as requested
        cloned.scale.setScalar(scale);

        // Scale normalization only
        return cloned;
    }, [scene]);

    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const textRef = useRef<THREE.Group>(null);
    const containerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (containerRef.current) {
            const time = state.clock.elapsedTime * 0.2;

            // Subtle, unified floating for the entire icon group
            const hoverY = Math.sin(time + index * 0.5) * 0.4;
            const hoverX = Math.cos(time * 0.3 + index) * 0.2;

            // Set base grid position + dynamic wave
            containerRef.current.position.set(
                position[0] + hoverX,
                position[1] + hoverY,
                position[2]
            );

            // Rotate only the icon, keep text billboarded
            if (meshRef.current) {
                meshRef.current.rotation.y += 0.005;
            }

            // Smooth scaling on hover
            const targetScale = hovered || isSelected ? 1.5 : 1.0;
            containerRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }

        // Billboard: Text always faces camera
        if (textRef.current) {
            textRef.current.quaternion.copy(state.camera.quaternion);
        }
    });

    return (
        <group ref={containerRef}>
            {/* The Icon Mesh */}
            <group ref={meshRef}>
                <primitive
                    object={model}
                    onPointerOver={() => {
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                    }}
                    onPointerOut={() => {
                        setHovered(false);
                        document.body.style.cursor = 'auto';
                    }}
                    onClick={(e: any) => {
                        e.stopPropagation();
                        onSelect(page);
                    }}
                />
            </group>

            {/* Page Number "LOCKED" to the belly of the icon - High Visibility */}
            <React.Suspense fallback={null}>
                <group ref={textRef} position={[0, -0.4, 2.2]}>
                    <Text
                        fontSize={1.3}
                        color="#ffcc00"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.12}
                        outlineColor="#000000"
                        fontWeight="900"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </Text>
                </group>
            </React.Suspense>

            <AnimatePresence>
                {hovered && (
                    <Html distanceFactor={15} position={[0, 2.5, 0]} center>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="pointer-events-none select-none"
                        >
                            <div className="px-3 py-1.5 rounded-lg border bg-black/90 text-amber-500 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] text-[10px] font-cinzel whitespace-nowrap backdrop-blur-md">
                                {page.title}
                            </div>
                        </motion.div>
                    </Html>
                )}
            </AnimatePresence>
        </group>
    );
}

export default function ArchiveNeuronViewer({ pages, modelPath = '/01.glb', pillarId = 'biography' }: { pages: PageData[], modelPath?: string, pillarId?: string }) {
    const [selectedPage, setSelectedPage] = useState<PageData | null>(null);

    const neurons = useMemo(() => {
        const temp = [];
        const columns = 10;
        const rows = 5;
        const spacingX = 22; // Adjusted for 7.0 scale
        const spacingY = 18; // Adjusted for 7.0 scale

        // Force exactly 50 icons in a 10x5 grid
        const totalIcons = 50;

        for (let i = 0; i < totalIcons; i++) {
            const col = i % columns;
            const row = Math.floor(i / columns);

            // Flat, stable grid layout
            const x = (col - (columns - 1) / 2) * spacingX;
            const y = ((rows - 1) / 2 - row) * spacingY;
            const z = 0;

            // Use real page data if available, otherwise use a placeholder
            const pageData = pages[i] || {
                id: i + 1,
                title: `Trang ${i + 1} (Đang cập nhật)`,
                content: "Nội dung của trang này đang được đồng bộ hóa từ kho lưu trữ trung tâm..."
            };

            temp.push({
                page: pageData,
                position: [x, y, z] as [number, number, number]
            });
        }
        return temp;
    }, [pages]);

    return (
        <div className="fixed inset-0 w-full h-screen bg-black overflow-hidden font-cinzel">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;700;900&display=swap');
            `}</style>
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 110]} fov={50} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 20, 10]} intensity={3.0} color="#ffffff" />
                <pointLight position={[-30, -30, -30]} intensity={1.5} color="#3b82f6" />
                <CursorLight />

                <Stars radius={200} depth={50} count={1000} factor={4} saturation={0} fade speed={0.2} />

                <React.Suspense fallback={null}>
                    <group>
                        {neurons.map((n, idx) => (
                            <NeuronIcon
                                key={idx}
                                index={idx}
                                position={n.position}
                                page={n.page}
                                isSelected={selectedPage?.id === n.page.id}
                                onSelect={setSelectedPage}
                                modelPath={modelPath}
                            />
                        ))}
                    </group>
                </React.Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    minDistance={30}
                    maxDistance={120}
                    autoRotate={true}
                    autoRotateSpeed={0.05}
                    makeDefault
                />

                <EffectComposer multisampling={4}>
                    <Bloom intensity={1.5} luminanceThreshold={0.1} radius={0.4} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>


            <AnimatePresence>
                {selectedPage && (
                    <LegacyGrimoireReader
                        page={selectedPage}
                        onExit={() => setSelectedPage(null)}
                    />
                )}
            </AnimatePresence>


            {/* BACK BUTTON (SUBTLE & ALIGNED) */}
            <button
                onClick={() => window.location.href = `/select/door/${pillarId}`}
                className="fixed top-8 left-8 z-[1000] px-8 py-3 border border-amber-500/30 bg-black/60 backdrop-blur-3xl rounded-full text-[11px] tracking-[0.5em] font-cinzel uppercase text-amber-500/80 font-black hover:bg-amber-500 hover:text-black hover:scale-110 active:scale-95 transition-all pointer-events-auto shadow-[0_0_30px_rgba(217,119,6,0.1)] group"
            >
                <span className="group-hover:tracking-[0.6em] transition-all duration-500">[ RETURN TO PILLAR ]</span>
            </button>

            {/* Vignette Layer */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)] z-10" />
        </div>
    );
}
