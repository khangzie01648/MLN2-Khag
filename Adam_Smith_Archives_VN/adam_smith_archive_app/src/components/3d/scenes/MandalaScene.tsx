"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function RotatingMandala() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += delta * 0.05;
            meshRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={[1.2, 1.2, 1.2]}>
                <torusKnotGeometry args={[10, 3, 100, 16]} />
                <meshStandardMaterial
                    color="#d4af37"
                    emissive="#d4af37"
                    emissiveIntensity={0.5}
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
}



export default function MandalaScene() {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 35]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
                <RotatingMandala />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <fog attach="fog" args={['#000', 30, 100]} />
            </Canvas>
        </div>
    );
}
