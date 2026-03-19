'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';

const NODES = [
    { pos: [0, 0, 0], size: 6 },
    { pos: [-25, 20, 10], size: 4 },
    { pos: [25, -15, 15], size: 4 },
    { pos: [-15, -25, -10], size: 3 },
    { pos: [20, 25, -15], size: 3 },
    { pos: [0, 30, 20], size: 3.5 },
];

const EDGES = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 4]
];

export default function ConstellationNetwork() {
    const lineGeometry = useMemo(() => {
        const points: THREE.Vector3[] = [];
        EDGES.forEach(([a, b]) => {
            points.push(new THREE.Vector3(...(NODES[a].pos as [number, number, number])));
            points.push(new THREE.Vector3(...(NODES[b].pos as [number, number, number])));
        });
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef}>
                {/* Nodes - Glowing Orbs */}
                {NODES.map((node, i) => (
                    <mesh key={i} position={node.pos as [number, number, number]}>
                        <sphereGeometry args={[node.size, 32, 32]} />
                        <meshStandardMaterial
                            color="#40E0D0"
                            emissive="#40E0D0"
                            emissiveIntensity={2}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                ))}

                {/* Pulsing connections */}
                <lineSegments geometry={lineGeometry}>
                    <lineBasicMaterial color="#40E0D0" opacity={0.6} transparent linewidth={3} />
                </lineSegments>

                <Sparkles count={50} scale={50} size={2} color="#1DE9B6" speed={0.5} />
            </group>
        </Float>
    );
}
