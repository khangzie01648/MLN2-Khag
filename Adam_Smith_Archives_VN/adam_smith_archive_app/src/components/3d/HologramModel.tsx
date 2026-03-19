"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface HologramModelProps {
    url: string;
    color?: string;
    scale?: number;
    rotationSpeed?: number;
    pulseSpeed?: number;
    pointSize?: number;
    opacity?: number;
    position?: [number, number, number];
}

/**
 * Standard Hologram Component
 * Applies the "Neural Hologram" aesthetic consistently across the app.
 */
export default function HologramModel({
    url,
    color = "#00f2fe",
    scale = 1,
    rotationSpeed = 1,
    pulseSpeed = 1.5,
    pointSize = 0.015,
    opacity = 0.2,
    position = [0, 0, 0],
    ...props
}: HologramModelProps) {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);

    const holographicScene = useMemo(() => {
        const clone = scene.clone();
        const holoColor = new THREE.Color(color);

        clone.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) {
                const mesh = obj as THREE.Mesh;

                // 1. Hologram Material (Ghostly Glow)
                mesh.material = new THREE.MeshPhongMaterial({
                    color: holoColor,
                    transparent: true,
                    opacity: opacity,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide,
                    shininess: 100
                });

                // 2. Points Overlay (Crystalline/Neural effect)
                const pointsGeom = mesh.geometry.clone();
                const pointsMat = new THREE.PointsMaterial({
                    size: pointSize,
                    color: holoColor,
                    transparent: true,
                    opacity: opacity * 2,
                    blending: THREE.AdditiveBlending
                });
                const points = new THREE.Points(pointsGeom, pointsMat);
                mesh.add(points);
            }
        });
        return clone;
    }, [scene, color, opacity, pointSize]);

    useFrame((state) => {
        if (modelRef.current) {
            const time = state.clock.getElapsedTime();

            // Rotation
            modelRef.current.rotation.y += 0.005 * rotationSpeed;

            // Pulse Effect
            modelRef.current.traverse((obj) => {
                if ((obj as THREE.Mesh).isMesh) {
                    const mesh = obj as THREE.Mesh;
                    if (mesh.material instanceof THREE.MeshPhongMaterial) {
                        mesh.material.opacity = (opacity / 2) + Math.abs(Math.sin(time * pulseSpeed)) * (opacity / 1.5);
                    }
                }
            });
        }
    });

    return (
        <group position={position} ref={modelRef} {...props}>
            <primitive object={holographicScene} scale={scale} />
        </group>
    );
}
