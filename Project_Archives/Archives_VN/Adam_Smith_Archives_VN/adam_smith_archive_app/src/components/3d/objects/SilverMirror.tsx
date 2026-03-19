'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function SilverMirror({ isHovered = false }) {
    const groupRef = useRef<THREE.Group>(null);
    const eyeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.2;
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
        }
        if (eyeRef.current) {
            eyeRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.1 * (isHovered ? 2 : 1));
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
                {/* The Mirror Frame */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[3, 0.3, 32, 64]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} emissive="#a3a3a3" />
                </mesh>

                {/* The Mirror Glass (Impartial Spectator) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[2.9, 2.9, 0.1, 64]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={2}
                        chromaticAberration={1}
                        anisotropy={0.5}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        color="#ffffff"
                    />
                </mesh>

                {/* The All-Seeing Eye of Conscience inside */}
                <mesh ref={eyeRef} position={[0, 0, 0]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={isHovered ? 3 : 1} wireframe={isHovered} />
                </mesh>
            </Float>
            <Sparkles count={80} scale={8} size={1} speed={0.2} color="#93c5fd" />
        </group>
    );
}
