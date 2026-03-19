"use client";

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { Stars } from "@react-three/drei";
import GalaxyBackground from "../backgrounds/GalaxyBackground";

/**
 * --- THE PSYCHE CORE SHADER ---
 * A pulsating sphere of pure consciousness.
 */
const CoreShader = {
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    fragmentShader: `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      // Fresnel Rim Effect
      float viewDot = dot(vViewDir, vNormal);
      float fresnel = pow(1.0 - abs(viewDot), 2.5); // Rim boost
      
      // Pulsation Breathing
      float pulse = 1.0 + 0.1 * sin(uTime * 1.5);
      
      // Colors (HDR) - ULTRA VIBRANT
      vec3 coreWhite = vec3(25.0, 25.0, 30.0); 
      vec3 rimCyan = vec3(0.0, 12.0, 15.0); 
      
      // Mix based on fresnel
      vec3 finalColor = mix(coreWhite, rimCyan * pulse, fresnel);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function PsycheCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;
        if (meshRef.current) {
            // Micro rotation
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} scale={[3.5, 3.5, 3.5]}>
            <sphereGeometry args={[1, 32, 32]} />
            <shaderMaterial
                vertexShader={CoreShader.vertexShader}
                fragmentShader={CoreShader.fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

function CinematicRig({ isDiving }: { isDiving: boolean }) {
    const { camera, pointer } = useThree();

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (isDiving) {
            // DIVE - Fast warp
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5, 0.05);
            // Spin chaos
            camera.rotation.z += 0.02;
        } else {
            // HOVER - Micro Dolly In & Parallax

            // Mouse Parallax (Repulsion/Attraction)
            const parallaxX = pointer.x * 2.0;
            const parallaxY = pointer.y * 2.0;

            camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, 0.05);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, parallaxY + 2, 0.05); // +2 to look slightly down

            // Orbit wobble
            camera.position.z = 50 + Math.sin(t * 0.1) * 2.0;

            camera.lookAt(0, 0, 0);

            // Dutch angle tilt based on horizontal mouse movement
            camera.rotation.z = pointer.x * -0.05;
        }
    });

    return null;
}

export default function CosmicMindScene({ isDiving, paused }: { isDiving: boolean, paused?: boolean }) {
    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
            <Canvas
                frameloop={paused ? "never" : "always"}
                gl={{
                    powerPreference: "high-performance",
                    antialias: true,
                    stencil: false,
                    depth: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
                dpr={1}
                camera={{ fov: 75, position: [0, 0, 80] }}
            >
                <color attach="background" args={["#000000"]} />

                <Suspense fallback={null}>
                    <CinematicRig isDiving={isDiving} />

                    {/* STELLAR BACKGROUND */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />

                    {/* THE CORE */}
                    <PsycheCore />

                    {/* THE VOLUMETRIC VORTEX */}
                    <GalaxyBackground isWarping={isDiving} />

                    {/* POST PROCESSING STACK */}
                    <EffectComposer enableNormalPass={false}>
                        <Bloom
                            luminanceThreshold={isDiving ? 0.0 : 0.8}
                            mipmapBlur
                            intensity={isDiving ? 5.0 : 2.2}
                            radius={isDiving ? 1.0 : 0.6}
                        />

                        <ChromaticAberration
                            offset={[isDiving ? 0.02 : 0.003, isDiving ? 0.02 : 0.003] as any}
                            radialModulation={true}
                            modulationOffset={0.7}
                        />

                        <Noise opacity={isDiving ? 0.5 : 0.25} />
                    </EffectComposer>

                </Suspense>
            </Canvas>
        </div>
    );
}