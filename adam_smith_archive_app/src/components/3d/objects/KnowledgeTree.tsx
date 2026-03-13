"use client";

import { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    MeshTransmissionMaterial,
    Sparkles,
    QuadraticBezierLine,
    Environment,
    MeshDistortMaterial,
    Text,
    ScreenSpace,
    Float as FloatDrei
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

/**
 * --- THE HALLUCINOGENIC SEED ---
 * A morphing, semi-liquid artifact with high refractive index.
 */
const PsychedelicArtifact = ({ article, index, color, position }: any) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2 + index;
            // Melting effect
            meshRef.current.scale.lerp(new THREE.Vector3(hovered ? 2.5 : 1, hovered ? 2.5 : 1, hovered ? 2.5 : 1), 0.1);
        }
        if (innerRef.current) {
            innerRef.current.rotation.x = -t * 0.4;
            innerRef.current.scale.setScalar(0.5 + Math.sin(t * 3 + index) * 0.1);
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.1;
        }
    });

    return (
        <group position={position}>
            <FloatDrei speed={5} rotationIntensity={2} floatIntensity={2}>
                {/* THE CRYSTAL SHELL */}
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <icosahedronGeometry args={[1.5, 3]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={1024}
                        transmission={1}
                        roughness={0.1}
                        thickness={5}
                        ior={1.8}
                        chromaticAberration={2.0} // HEAVY RAINBOW BLUR
                        anisotropy={1}
                        distortion={0.8}
                        distortionScale={1}
                        color={color}
                        attenuationDistance={1}
                        attenuationColor="#ffffff"
                    />
                </mesh>

                {/* THE PULSING CORE (LIQUID) */}
                <mesh ref={innerRef}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <MeshDistortMaterial
                        color="#ffffff"
                        speed={5}
                        distort={0.6}
                        radius={1}
                        emissive={color}
                        emissiveIntensity={2}
                    />
                    <pointLight color={color} intensity={hovered ? 3000 : 100} distance={30} decay={2} />
                </mesh>

                {/* SACRED GEOMETRY RINGS */}
                <group ref={ringRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[3.2, 0.02, 16, 200]} />
                        <meshBasicMaterial color={color} transparent opacity={0.15} />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0]}>
                        <torusGeometry args={[3.5, 0.01, 16, 200]} />
                        <meshBasicMaterial color={color} transparent opacity={0.1} />
                    </mesh>
                </group>

                {/* THE "ẢO ẢO" UI TAG */}
                <Html position={[0, -5, 0]} distanceFactor={12}>
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, filter: 'blur(30px)', y: 20 }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                                exit={{ opacity: 0, scale: 1.5, filter: 'blur(50px)' }}
                                transition={{ type: 'spring', damping: 20 }}
                                className="pointer-events-none select-none"
                            >
                                <div className="p-8 border-[0.5px] border-white/10 bg-white/[0.02] backdrop-blur-[120px] shadow-[0_0_150px_rgba(255,255,255,0.05)]">
                                    <span className="text-[7px] font-mono text-white/20 tracking-[2em] uppercase block mb-4">Neural_Archive_0x{index}</span>
                                    <h4 className="text-4xl font-cinzel font-black text-white tracking-[0.2em] leading-none uppercase italic">
                                        {article.title}
                                    </h4>
                                    <motion.div
                                        className="h-[1px] bg-white/20 mt-6 overflow-hidden"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                    >
                                        <motion.div
                                            className="h-full bg-white"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Html>
            </FloatDrei>

            {/* NEURAL THREADS */}
            <QuadraticBezierLine
                start={[0, 0, 0]}
                end={[-position.x * 0.9, -position.y * 0.9, -position.z * 0.9]}
                mid={[Math.sin(index) * 20, 30, Math.cos(index) * 20]}
                color={color}
                lineWidth={hovered ? 4 : 0.5}
                transparent
                opacity={hovered ? 0.8 : 0.1}
            />
        </group>
    );
};

export default function KnowledgeTree({ articles, pillarId, color }: { articles: any[], pillarId: string, color: string }) {
    const groupRef = useRef<THREE.Group>(null);
    const vortexRef = useRef<THREE.Mesh>(null);

    // SPIRAL NEBULA LAYOUT (FIBONACCI SPHERE)
    const nodes = useMemo(() => {
        const count = articles.length;
        return articles.map((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            const radius = 35 + Math.sin(i * 10) * 5;
            return new THREE.Vector3(
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi)
            );
        });
    }, [articles]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.05;
        }
        if (vortexRef.current) {
            vortexRef.current.rotation.y = -t * 0.1;
            vortexRef.current.scale.setScalar(1 + Math.sin(t) * 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            <Environment preset="night" />

            {/* THE CENTRAL PSYCHIC CORE */}
            <group>
                <mesh ref={vortexRef}>
                    <icosahedronGeometry args={[15, 1]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.03} />
                </mesh>
                <pointLight intensity={8000} color={color} distance={200} decay={2} />

                {/* INFINITY FIELD */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <torusGeometry args={[100 + i * 30, 0.02, 16, 256]} />
                        <meshBasicMaterial color={color} transparent opacity={0.02} />
                    </mesh>
                ))}
            </group>

            {/* ARCHETYPE ARTIFACTS */}
            {articles.map((art, i) => (
                <PsychedelicArtifact key={art.slug} article={art} index={i} color={color} position={nodes[i]} />
            ))}

            {/* HALLUCINOGENIC DUST */}
            <Sparkles count={5000} scale={150} size={2} speed={1.2} color={color} opacity={0.6} />

            {/* THE VOID SHELL */}
            <mesh scale={300}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#000000" side={THREE.BackSide} />
            </mesh>
        </group>
    );
}

/**
 * --- STABLE HTML OVERLAY ---
 */
function Html({ children, position, distanceFactor }: any) {
    const { camera } = useThree();
    const ref = useRef<THREE.Group>(null);
    const [hidden, setHidden] = useState(false);

    useFrame(() => {
        if (!ref.current) return;
        const dist = ref.current.position.distanceTo(camera.position);
        setHidden(dist > 220);
    });

    return (
        <group position={position} ref={ref} visible={!hidden}>
            <HtmlImpl center distanceFactor={distanceFactor}>
                {children}
            </HtmlImpl>
        </group>
    );
}

import { Html as HtmlImpl } from '@react-three/drei';
