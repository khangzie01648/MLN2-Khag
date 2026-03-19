"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function CameraRig() {
    const vec = new THREE.Vector3();

    useFrame((state) => {
        // Smoother lerp for camera movement based on mouse
        // Mouse x is between -1 and 1
        const x = state.pointer.x * 2;
        const y = state.pointer.y * 2;

        state.camera.position.lerp(
            vec.set(x, y, 10), // Target position
            0.05 // Smoothing factor
        );
        state.camera.lookAt(0, 0, 0);
    });

    return null;
}
