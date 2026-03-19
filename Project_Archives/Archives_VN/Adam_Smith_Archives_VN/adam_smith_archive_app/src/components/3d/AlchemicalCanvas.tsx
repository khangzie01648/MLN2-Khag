'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// --- SHADER DEFINITION ---
const InkRevealShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1),
        uColorInk: new THREE.Color('#1a1a1a'),
        uColorPaper: new THREE.Color('#f0e6d2'),
        uColorGold: new THREE.Color('#d4af37'),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColorInk;
    uniform vec3 uColorPaper;
    uniform vec3 uColorGold;
    varying vec2 vUv;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Noise layers for organic paper texture
      float noise1 = snoise(vUv * 3.0 + uTime * 0.05);
      float noise2 = snoise(vUv * 10.0 - uTime * 0.02);
      float organicNoise = noise1 * 0.6 + noise2 * 0.4;

      // Mouse interaction (The "Reveal")
      float dist = distance(vUv, uMouse);
      float revealRadius = 0.3 + sin(uTime) * 0.02;
      float revealMask = smoothstep(revealRadius, revealRadius - 0.15, dist);
      
      // Add turbulent edge to the reveal
      revealMask += organicNoise * 0.1;
      revealMask = clamp(revealMask, 0.0, 1.0);

      // Colors
      vec3 finalColor = mix(uColorPaper, uColorInk, organicNoise * 0.05); // Base paper texture
      
      // Gold underlayer revealed by mouse
      vec3 goldShimmer = uColorGold * (1.0 + snoise(vUv * 20.0 + uTime) * 0.3);
      finalColor = mix(finalColor, goldShimmer, revealMask * 0.8);

      gl_FragColor = vec4(finalColor, 1.0);
    }
    `
);

// Registering via extend is removed to avoid TS conflicts
// extend({ InkRevealShaderMaterial });

// Global type augmentation removed in favor of <primitive />

function ShaderPlane() {
    const materialRef = useRef<any>(null);

    // Create static instance to pass to primitive
    const shaderInstance = useMemo(() => new InkRevealShaderMaterial(), []);

    useFrame(({ clock, pointer, viewport }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.getElapsedTime();
            // Map pointer (-1 to 1) to UV coordinates (0 to 1)
            materialRef.current.uMouse = new THREE.Vector2(
                (pointer.x + 1) / 2,
                (pointer.y + 1) / 2
            );
        }
    });

    return (
        <mesh scale={[20, 10, 1]}> {/* Large plane to cover screen */}
            <planeGeometry args={[1, 1, 128, 128]} />
            <primitive
                object={shaderInstance}
                ref={materialRef}
                attach="material"
                transparent
            />
        </mesh>
    );
}

export default function AlchemicalCanvas() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ShaderPlane />
            </Canvas>
        </div>
    );
}
