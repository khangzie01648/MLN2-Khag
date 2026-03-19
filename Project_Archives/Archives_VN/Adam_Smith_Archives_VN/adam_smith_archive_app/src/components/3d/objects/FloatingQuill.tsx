'use client';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Text3D } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingQuill({ isHovered = false }) {
    const groupRef = useRef<THREE.Group>(null);
    const quillRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.2;
        }
        if (quillRef.current) {
            quillRef.current.rotation.z = Math.sin(t * 2) * 0.2 + 0.5;
            quillRef.current.rotation.x = Math.cos(t * 1.5) * 0.1;
            quillRef.current.position.y = Math.sin(t * 3) * 0.2 * (isHovered ? 2 : 1);
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
                {/* Inkwell */}
                <mesh position={[0, -1.5, 0]}>
                    <cylinderGeometry args={[1, 1.2, 1.5, 6]} />
                    <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.7, 0]}>
                    <cylinderGeometry args={[0.5, 1, 0.2, 6]} />
                    <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Abstract Quill Feather */}
                <mesh ref={quillRef} position={[0, 0.5, 0]}>
                    <coneGeometry args={[0.3, 4, 3]} />
                    <meshStandardMaterial color="#e5e7eb" emissive="#9ca3af" emissiveIntensity={isHovered ? 0.3 : 0} wireframe={isHovered} />
                </mesh>

                {/* Floating Letters */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <mesh key={i} position={[
                        Math.sin(i * Math.PI * 2 / 5) * 2.5,
                        Math.cos(i * Math.PI * 2 / 5) * 2 + 1,
                        Math.sin(i * 1.5) * 1.5
                    ]} rotation={[0, i, 0]}>
                        <planeGeometry args={[0.8, 1.2]} />
                        <meshStandardMaterial color="#fef3c7" side={THREE.DoubleSide} transparent opacity={0.6 + (isHovered ? 0.3 : 0)} />
                    </mesh>
                ))}
            </Float>
            <Sparkles count={120} scale={6} size={0.5} speed={0.8} color="#e5e7eb" opacity={0.6} />
        </group>
    );
}
