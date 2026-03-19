"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MeteorProps {
    color?: string;
}

function ShootingStar({ color = "#ffffff" }: MeteorProps) {
    const ref = useRef<THREE.Group>(null);

    // Randomize initial position and trajectory
    const data = useMemo(() => ({
        pos: new THREE.Vector3(
            (Math.random() - 0.5) * 100,
            20 + Math.random() * 30,
            (Math.random() - 0.5) * 50
        ),
        speed: 0.5 + Math.random() * 0.8,
        scale: 0.2 + Math.random() * 0.5,
        target: new THREE.Vector3(-1, -1, 0).normalize()
    }), []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Move meteor
        ref.current.position.addScaledVector(data.target, data.speed);

        // Reset if out of bounds
        if (ref.current.position.y < -30 || ref.current.position.x < -60) {
            ref.current.position.set(
                (Math.random() - 0.5) * 120 + 30, // Start slightly more to the right
                30 + Math.random() * 20,
                (Math.random() - 0.5) * 50
            );
        }
    });

    return (
        <group ref={ref} position={data.pos} scale={data.scale}>
            {/* The Head */}
            <mesh>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>
            {/* The Trail */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.02, 0.2, 8, 8]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            {/* Glow */}
            <pointLight intensity={2} color={color} distance={10} />
        </group>
    );
}

export default function MeteorShower({ count = 15, color = "#00ffff" }: { count?: number, color?: string }) {
    return (
        <group>
            {Array.from({ length: count }).map((_, i) => (
                <ShootingStar key={i} color={color} />
            ))}
        </group>
    );
}
