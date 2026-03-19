"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AdditiveBlending } from "three";

/**
 * --- THE VOLUMETRIC VORTEX SHADER (FINAL STABLE) ---
 * Re-written completely to ensure syntax correctness.
 */

const InstanceFragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    varying vec2 vUv;

    void main() {
        // Soft circle shape
        vec2 center = vUv - 0.5;
        float dist = length(center);
        
        // Discard corners (DISABLED FOR DEBUG)
        // if (dist > 0.5) discard;
        
        // Glow falloff
        float glow = 1.0 - (dist * 2.0);
        glow = pow(glow, 1.5);
        
        gl_FragColor = vec4(vColor, vAlpha * glow);
    }
`;

const InstanceVertexShaderAdjusted = `
    uniform float uTime;
    uniform float uWarp; // 0.0 to 1.0
    attribute vec4 aRandom; 
    
    varying vec3 vColor;
    varying float vAlpha;
    varying vec2 vUv;

    void main() {
        vUv = uv; 
        
        float radius = aRandom.x;
        // SAFETY FALLBACK: If data is missing (radius=0), force it to be visible
        if (radius < 1.0) radius = 30.0 + sin(float(gl_InstanceID)) * 20.0;

        float angleInit = aRandom.y;
        float speed = aRandom.z;
        if (speed < 0.1) speed = 0.5; // Safety speed
        float size = aRandom.w;
        if (size < 0.1) size = 1.0; // Safety size

        // POSITION & MOVEMENT
        float time = uTime * (1.0 + uWarp * 1.5);
        float currentAngle = angleInit + time * speed * (20.0 / (radius + 5.0));
        
        float turbulence = (1.0 - uWarp) * 0.15;
        float waveY = sin(currentAngle * 2.0 + time) * radius * turbulence;
        float waveZ = cos(currentAngle * 3.0 + time * 0.8) * radius * turbulence;

        vec3 offsetPos = vec3(
            cos(currentAngle) * radius,
            sin(currentAngle) * radius + waveY,
            waveZ 
        );

        // STRETCHING & UI
        vec3 viewDir = normalize(cameraPosition - offsetPos);
        vec3 right = normalize(cross(viewDir, vec3(0.0, 1.0, 0.0)));
        vec3 up = normalize(cross(right, viewDir));
        
        float stretch = 1.0 + (uWarp * 150.0 * speed); 
        vec3 localPos = right * position.x * stretch * size 
                      + up * position.y * size * (1.0 - uWarp * 0.9);
        
        vec4 mvPosition = modelViewMatrix * vec4(offsetPos + localPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // MUNDUS IMAGINALIS COLORS - VIBRANT ALCHEMICAL PALETTE
        vec3 colorDeep    = vec3(0.01, 0.0, 0.05);   // The Void
        vec3 colorIndigo  = vec3(0.1, 0.1, 0.8);     // Unconscious
        vec3 colorViolet  = vec3(0.8, 0.2, 1.0);     // Insight
        vec3 colorCyan    = vec3(0.0, 1.0, 1.0);     // Consciousness
        vec3 colorGold    = vec3(1.0, 0.9, 0.3);     // Alchemical Gold
        
        float distFactor = radius / 80.0;
        
        // Multi-layered Color Mixing - Smoother & Brighter
        vec3 finalColor = mix(colorDeep, colorIndigo, smoothstep(0.0, 0.4, distFactor));
        finalColor = mix(finalColor, colorViolet, smoothstep(0.3, 0.7, distFactor));
        finalColor = mix(finalColor, colorCyan, smoothstep(0.6, 0.9, distFactor) * (1.0 - uWarp));
        
        float centerGlow = 1.0 - smoothstep(0.0, 30.0, radius);
        finalColor = mix(finalColor, colorGold, centerGlow * 0.8);
        
        // Organic Breathing Effect
        float breath = sin(uTime * 0.5 + radius * 0.1) * 0.2 + 1.0;
        vColor = finalColor * breath;
        vColor = mix(vColor, vec3(1.0), uWarp * 0.7); 

        vAlpha = (1.0 - smoothstep(70.0, 100.0, radius)) * 0.8;
        vAlpha *= smoothstep(0.0, 15.0, radius);
        
        vColor *= (4.0 + uWarp * 3.0); 
        vAlpha += uWarp * 0.3;
    }
`;


export default function GalaxyBackground({ isWarping }: { isWarping?: boolean }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 5000;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uWarp: { value: 0 }
    }), []);

    // ... (Data gen code remains same) ...
    // Re-use current attributeData logic, just need to update useFrame

    // Generate Data (Keep this block if necessary, or just rely on existing code context if tools support patch)
    const attributeData = useMemo(() => {
        const data = new Float32Array(count * 4);
        for (let i = 0; i < count; i++) {
            const i4 = i * 4;
            const r = Math.random();
            const radius = 10 + r * r * 70;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 0.5;
            const size = 0.5 + Math.random() * 2.0;

            data[i4] = radius;
            data[i4 + 1] = angle;
            data[i4 + 2] = speed;
            data[i4 + 3] = size;
        }
        return data;
    }, [count]);

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;
        // Smoothly interpolate Warp factor
        const targetWarp = isWarping ? 1.0 : 0.0;
        uniforms.uWarp.value = THREE.MathUtils.lerp(uniforms.uWarp.value, targetWarp, 0.02);
    });


    return (
        // Tilt the disk slightly to see the spiral structure
        <group rotation={[Math.PI / 2.5, 0, 0]}>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
                <planeGeometry args={[0.5, 0.5]}>
                    <instancedBufferAttribute
                        attach="attributes-aRandom"
                        args={[attributeData, 4]}
                    />
                </planeGeometry>
                <shaderMaterial
                    vertexShader={InstanceVertexShaderAdjusted}
                    fragmentShader={InstanceFragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={AdditiveBlending}
                />
            </instancedMesh>
        </group>
    );
}
