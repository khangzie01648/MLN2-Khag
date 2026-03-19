"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

// Glitch function
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  
  // Glitch displacement
  if (uHover > 0.0) {
      float glitchAmount = sin(uTime * 20.0) * 0.05 * uHover;
      float r = rand(vec2(uTime, uv.y));
      if(r < 0.1 * uHover) {
          uv.x += glitchAmount;
      }
      
      // Chromatic aberration
      float shift = 0.02 * uHover;
      float rChannel = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
      float gChannel = texture2D(uTexture, uv).g;
      float bChannel = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
      
      gl_FragColor = vec4(rChannel, gChannel, bChannel, uHover); // Fade in based on hover
  } else {
      discard;
  }
}
`;

export default function HoverImagePlane({ textureUrl, isActive }: { textureUrl: string, isActive: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(textureUrl);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 }
    }), [texture]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // @ts-ignore
            meshRef.current.material.uniforms.uTime.value += delta;
            // Smooth transition for uHover
            const targetHover = isActive ? 0.8 : 0.0;
            // @ts-ignore
            meshRef.current.material.uniforms.uHover.value = THREE.MathUtils.lerp(
                // @ts-ignore
                meshRef.current.material.uniforms.uHover.value,
                targetHover,
                0.1
            );
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]} scale={[25, 15, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
}
