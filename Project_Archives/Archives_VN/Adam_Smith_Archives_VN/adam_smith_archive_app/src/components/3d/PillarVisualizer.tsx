"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Points, PointMaterial, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

interface PillarVisualizerProps {
    pillarId: string;
    color: string;
}

export default function PillarVisualizer({ pillarId, color }: PillarVisualizerProps) {
    switch (pillarId) {
        case 'alchemy': // VÀNG LỎNG (LIQUID GOLD)
            return <AlchemyVisual color={color} />;

        case 'red_book': // BÓNG TỐI MA QUÁI (DARK ENTITY)
            return <RedBookVisual color={color} />;

        case 'cosmos': // VŨ TRỤ (BLACK HOLE)
        case 'synchronicity':
            return <CosmosVisual color={color} />;

        case 'concepts': // MẠNG LƯỚI NEURAL
        case 'practice':
            return <NeuralVisual color={color} />;

        case 'biography': // DÒNG THỜI GIAN
        case 'legacy':
            return <TimeVisual color={color} />;

        case 'spirit': // NĂNG LƯỢNG TÂM LINH
            return <SpiritVisual color={color} />;

        default:
            return <AlchemyVisual color={color} />;
    }
}

// --- 1. ALCHEMY: LIQUID TRANSMISSION METAL ---
function AlchemyVisual({ color }: { color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.5;
        meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[10, 3]} /> {/* Reduced detail geometry */}
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={5}
                    thickness={20}
                    chromaticAberration={1}
                    anisotropy={1}
                    distortion={2} // Méo mó mạnh
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    color={color}
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>
            <Sparkles count={50} scale={25} size={6} speed={0.4} opacity={0.5} color={color} />
        </Float>
    );
}

// --- 2. RED BOOK: DISTORTED DARK MATTER ---
function RedBookVisual({ color }: { color: string }) {
    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={1}>
            <mesh scale={1.8}>
                <sphereGeometry args={[10, 64, 64]} />
                <MeshDistortMaterial
                    color="black"
                    emissive="#ff0000"
                    emissiveIntensity={0.5}
                    distort={0.6} // Rất méo
                    speed={2} // Chuyển động nhanh
                    roughness={0}
                    metalness={1}
                />
            </mesh>
            <Sparkles count={100} scale={30} size={10} speed={0.4} opacity={0.6} color="#ff0000" noise={1} />
        </Float>
    );
}

// --- 3. COSMOS: PARTICLE VORTEX ---
function CosmosVisual({ color }: { color: string }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 25 }) as Float32Array, []);

    useFrame((state, delta) => {
        pointsRef.current.rotation.x -= delta / 10;
        pointsRef.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            {/* Core Glow */}
            <mesh>
                <sphereGeometry args={[5, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
}

// --- 4. NEURAL: CONNECTED NODES ---
function NeuralVisual({ color }: { color: string }) {
    const pointsRef = useRef<THREE.Points>(null!);
    // Create random connections
    const sphere = useMemo(() => random.inSphere(new Float32Array(1000), { radius: 15 }) as Float32Array, []);

    useFrame((state, delta) => {
        pointsRef.current.rotation.y += delta / 10;
    });

    return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.2}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
            {/* Abstract Wireframe Shell */}
            <mesh scale={1.2}>
                <icosahedronGeometry args={[12, 1]} />
                <meshStandardMaterial color={color} wireframe transparent opacity={0.1} />
            </mesh>
        </Float>
    );
}

// --- 5. TIME: GLASS SAND ---
function TimeVisual({ color }: { color: string }) {
    return (
        <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
            <mesh>
                <torusKnotGeometry args={[8, 2, 64, 16]} />
                <MeshTransmissionMaterial
                    backside
                    thickness={10}
                    chromaticAberration={0.5}
                    anisotropy={0.5}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={2} // Biến đổi theo thời gian mạnh
                    color={color}
                    roughness={0.2}
                />
            </mesh>
            <Sparkles count={30} scale={20} size={4} speed={2} opacity={0.8} color="white" />
        </Float>
    );
}

// --- 6. SPIRIT: RADIANT ENERGY ---
function SpiritVisual({ color }: { color: string }) {
    return (
        <Float speed={1} rotationIntensity={2} floatIntensity={1}>
            <mesh>
                <dodecahedronGeometry args={[10, 0]} />
                <MeshDistortMaterial
                    color="white"
                    emissive={color}
                    emissiveIntensity={2} // Rực sáng
                    distort={0.4}
                    speed={1}
                    roughness={0}
                />
            </mesh>
            {/* Outer Halo */}
            <mesh scale={1.5}>
                <sphereGeometry args={[10, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
            </mesh>
        </Float>
    );
}
