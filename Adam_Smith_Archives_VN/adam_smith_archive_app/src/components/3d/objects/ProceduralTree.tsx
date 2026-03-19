'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';

export default function ProceduralTree() {
    const groupRef = useRef<THREE.Group>(null);

    const treeMesh = useMemo(() => {
        const group = new THREE.Group();

        function createBranch(length: number, width: number, depth: number): THREE.Group {
            const branchGroup = new THREE.Group();

            // Branch geometry - Cylinder for "solid" look
            const geometry = new THREE.CylinderGeometry(width * 0.7, width, length, 8);
            geometry.translate(0, length / 2, 0); // Origin at base

            const material = new THREE.MeshStandardMaterial({
                color: "#ff4081",
                emissive: "#ff4081",
                emissiveIntensity: 2,
                roughness: 0.1,
                metalness: 0.8
            });

            const mesh = new THREE.Mesh(geometry, material);
            branchGroup.add(mesh);

            if (depth > 0) {
                // Left branch
                const left = createBranch(length * 0.75, width * 0.65, depth - 1);
                left.position.y = length;
                left.rotation.x = 0.5;
                left.rotation.z = 0.6;
                branchGroup.add(left);

                // Right branch
                const right = createBranch(length * 0.75, width * 0.65, depth - 1);
                right.position.y = length;
                right.rotation.x = -0.4;
                right.rotation.z = -0.7;
                branchGroup.add(right);

                // Back branch
                const back = createBranch(length * 0.7, width * 0.6, depth - 1);
                back.position.y = length;
                back.rotation.z = 1.2;
                branchGroup.add(back);
            }

            return branchGroup;
        }

        const tree = createBranch(12, 1.2, 5);
        tree.position.y = -25;
        group.add(tree);
        return group;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.008;
        }
    });

    return (
        <group ref={groupRef}>
            {/* The 'Self' Hub at base */}
            <mesh position={[0, -26, 0]}>
                <sphereGeometry args={[9, 32, 32]} />
                <MeshDistortMaterial
                    color="#ff0088"
                    emissive="#ff0088"
                    emissiveIntensity={4}
                    distort={0.5}
                    speed={2}
                    toneMapped={false}
                />
            </mesh>

            <primitive object={treeMesh} />

            <Sparkles count={50} scale={60} size={2.5} color="#ffd700" speed={0.4} opacity={0.4} />
        </group>
    );
}
