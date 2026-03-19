'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';

export default function Hourglass() {
    const sandRef = useRef<THREE.Points>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    const hourglassGeometry = useMemo(() => {
        const group = new THREE.Group();
        // Weathered, ancient material
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: "#3d3d3d",
            metalness: 0.1,
            roughness: 1,
        });

        // Antique, slightly murky glass
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: "#f4e4c1",
            transparent: true,
            opacity: 0.4,
            roughness: 0.2,
            metalness: 0,
            transmission: 0.9,
            thickness: 5,
            ior: 1.4,
        });

        const topBulb = new THREE.SphereGeometry(15, 32, 20);
        topBulb.scale(1, 1.1, 1);
        const topMesh = new THREE.Mesh(topBulb, glassMaterial);
        topMesh.position.y = 18;
        group.add(topMesh);

        const bottomBulb = topBulb.clone();
        const bottomMesh = new THREE.Mesh(bottomBulb, glassMaterial);
        bottomMesh.position.y = -18;
        group.add(bottomMesh);

        // Stone Frame
        const pillarGeo = new THREE.CylinderGeometry(1, 1, 60, 8);
        for (let i = 0; i < 3; i++) {
            const pillar = new THREE.Mesh(pillarGeo, stoneMaterial);
            const angle = (i / 3) * Math.PI * 2;
            pillar.position.x = Math.cos(angle) * 18;
            pillar.position.z = Math.sin(angle) * 18;
            group.add(pillar);
        }

        const capGeo = new THREE.CylinderGeometry(22, 22, 4, 32);
        const topCap = new THREE.Mesh(capGeo, stoneMaterial);
        topCap.position.y = 30;
        group.add(topCap);

        const bottomCap = topCap.clone();
        bottomCap.position.y = -30;
        group.add(bottomCap);

        return group;
    }, []);

    const sandParticles = useMemo(() => {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 1] = Math.random() * 20 + 5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (sandRef.current) {
            const positions = sandRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < positions.length / 3; i++) {
                positions[i * 3 + 1] -= 0.12;
                if (positions[i * 3 + 1] < -20) {
                    positions[i * 3 + 1] = 20;
                    positions[i * 3] = (Math.random() - 0.5) * 5;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
                }
            }
            sandRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group>
                <primitive object={hourglassGeometry} />
                <points ref={sandRef} geometry={sandParticles}>
                    <pointsMaterial size={0.6} color="#d4af37" transparent opacity={0.6} />
                </points>
                <Sparkles count={15} scale={40} size={1} color="#d4af37" speed={0.2} opacity={0.3} />
            </group>
        </Float>
    );
}
