"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import NeuralSelectionScene from "./NeuralSelectionScene";

import { useRouter } from "next/navigation";

export default function GameMenuScene() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const router = useRouter();

    const handleSelect = (id: string) => {
        setSelectedId(id);
        // Emulate the delay and navigation from the old code
        setTimeout(() => {
            router.push(`/${id}`);
        }, 1000);
    };

    return (
        <div className="w-full h-screen bg-black relative">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 60, 40], fov: 50 }}
                gl={{ antialias: true, toneMappingExposure: 1.0 }}
            >
                <color attach="background" args={["#000000"]} />

                <Suspense fallback={null}>
                    <NeuralSelectionScene onSelect={handleSelect} />
                </Suspense>

                {/* DEBUG CUBE REMOVED */}

                {/* POST PROCESSING FOR "CINEMATIC LOOK" */}
                {/* Disabled temporarily to fix black screen */}
                {/* <EffectComposer>
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2.0} radius={0.5} />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer> */}

                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.5}
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 3}
                    enableDamping
                    dampingFactor={0.05}
                />
            </Canvas>
            <Loader />
        </div>
    );
}
