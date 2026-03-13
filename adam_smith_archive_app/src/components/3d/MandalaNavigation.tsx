'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

// 10 Pillar configurations
const PILLARS = [
    { id: 'biography', name: 'BIOGRAPHY', color: '#8B0000', angle: 0 },
    { id: 'concepts', name: 'CONCEPTS', color: '#00008B', angle: 36 },
    { id: 'red_book', name: 'RED BOOK', color: '#DC143C', angle: 72 },
    { id: 'alchemy', name: 'ALCHEMY', color: '#FFD700', angle: 108 },
    { id: 'practice', name: 'PRACTICE', color: '#50C878', angle: 144 },
    { id: 'symbols', name: 'SYMBOLS', color: '#6A0DAD', angle: 180 },
    { id: 'spirit', name: 'SPIRIT', color: '#FF8C00', angle: 216 },
    { id: 'legacy', name: 'LEGACY', color: '#EC4899', angle: 252 },
    { id: 'cosmos', name: 'COSMOS', color: '#6366F1', angle: 288 },
    { id: 'encounters', name: 'ENCOUNTERS', color: '#40E0D0', angle: 324 },
];

function MandalaSection({ pillar, index, onHover, onLeave, onClick, isHovered }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Convert angle to radians
    const angleRad = (pillar.angle * Math.PI) / 180;
    const nextAngleRad = ((pillar.angle + 36) * Math.PI) / 180;

    // Create section geometry (pizza slice)
    const shape = new THREE.Shape();
    const radius = 150;
    const innerRadius = 50;

    // Start at inner radius
    shape.moveTo(
        Math.cos(angleRad) * innerRadius,
        Math.sin(angleRad) * innerRadius
    );

    // Arc to outer radius
    shape.lineTo(
        Math.cos(angleRad) * radius,
        Math.sin(angleRad) * radius
    );

    // Arc along outer edge
    shape.absarc(0, 0, radius, angleRad, nextAngleRad, false);

    // Line back to inner radius
    shape.lineTo(
        Math.cos(nextAngleRad) * innerRadius,
        Math.sin(nextAngleRad) * innerRadius
    );

    // Arc along inner edge (reverse)
    shape.absarc(0, 0, innerRadius, nextAngleRad, angleRad, true);

    const geometry = new THREE.ShapeGeometry(shape);

    // Calculate center position for text
    const midAngle = angleRad + (36 * Math.PI / 180) / 2;
    const textRadius = (radius + innerRadius) / 2;
    const textX = Math.cos(midAngle) * textRadius;
    const textY = Math.sin(midAngle) * textRadius;

    return (
        <group>
            {/* Section mesh */}
            <mesh
                ref={meshRef}
                geometry={geometry}
                onPointerOver={() => onHover(index)}
                onPointerOut={onLeave}
                onClick={() => onClick(pillar)}
            >
                <meshStandardMaterial
                    color={pillar.color}
                    opacity={isHovered ? 1 : 0.85}
                    transparent
                    emissive={pillar.color}
                    emissiveIntensity={isHovered ? 0.5 : 0.2}
                />
            </mesh>

            {/* Text label */}
            <Text
                position={[textX, textY, 1]}
                fontSize={8}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, midAngle + Math.PI / 2]}
            >
                {pillar.name}
            </Text>
        </group>
    );
}

function CenterCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.005;
        }
    });

    return (
        <mesh ref={meshRef}>
            <circleGeometry args={[45, 64]} />
            <meshStandardMaterial
                color="#8B0000"
                emissive="#FFD700"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

function MandalaGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.001;
        }
    });

    const handleClick = (pillar: any) => {
        console.log('Clicked pillar:', pillar.name);
        // TODO: Navigate to pillar page
    };

    return (
        <group ref={groupRef}>
            {/* Center core */}
            <CenterCore />

            {/* 10 sections */}
            {PILLARS.map((pillar, index) => (
                <MandalaSection
                    key={pillar.id}
                    pillar={pillar}
                    index={index}
                    onHover={setHoveredIndex}
                    onLeave={() => setHoveredIndex(null)}
                    onClick={handleClick}
                    isHovered={hoveredIndex === index}
                />
            ))}

            {/* Outer ring */}
            <mesh>
                <ringGeometry args={[150, 160, 64]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

export default function MandalaNavigationScene() {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-[#F4E4C1] to-[#DCC6A8]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 400]} fov={50} />

                {/* Lights */}
                <ambientLight intensity={0.6} />
                <pointLight position={[100, 100, 100]} intensity={1} color="#FFD700" />
                <pointLight position={[-100, -100, 100]} intensity={0.5} color="#8B0000" />

                {/* Mandala */}
                <MandalaGroup />
            </Canvas>

            {/* Title overlay */}
            <div className="absolute top-12 left-0 right-0 text-center pointer-events-none">
                <h1 className="text-6xl font-serif text-[#8B0000] tracking-widest drop-shadow-lg">
                    ADAM SMITH ARCHIVE
                </h1>
                <p className="text-xl text-[#666] mt-4 italic">
                    Khám phá tư tưởng Carl Adam Smith
                </p>
            </div>
        </div>
    );
}
