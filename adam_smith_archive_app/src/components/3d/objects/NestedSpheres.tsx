'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Float, ContactShadows, Text } from '@react-three/drei';

export default function NestedSpheres() {
    const outerRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (outerRef.current) {
            outerRef.current.rotation.x += delta * 0.2;
            outerRef.current.rotation.y += delta * 0.3;
        }
        if (coreRef.current) {
            coreRef.current.rotation.z -= delta * 0.5;
        }
        if (ringRef.current) {
            ringRef.current.rotation.y += delta * 1.5;
        }
    });

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <group>
                {/* Outer Energy Shell */}
                <mesh ref={outerRef}>
                    <sphereGeometry args={[25, 32, 32]} />
                    <meshStandardMaterial
                        color="#4488ff"
                        wireframe
                        transparent
                        opacity={0.2}
                        emissive="#4488ff"
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Distorted Core */}
                <mesh ref={coreRef}>
                    <octahedronGeometry args={[12, 0]} />
                    <MeshDistortMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                        distort={0.5}
                        speed={2}
                        roughness={0}
                        metalness={1}
                    />
                </mesh>

                {/* Glowing Orbit Ring */}
                <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[18, 0.5, 16, 100]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                    />
                </mesh>

                <pointLight intensity={2} distance={50} color="#00ffff" />
            </group>
        </Float>
    );
}
