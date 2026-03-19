"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";

// --- SHADER: HYPERSPACE TUNNEL ---
const TunnelShader = {
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float iTime;
    varying vec2 vUv;
    
    // Star Nest by Pablo Roman Andrioli
    // This content is under the MIT License.
    
    #define iterations 17
    #define formuparam 0.53
    #define volsteps 20
    #define stepsize 0.1
    #define zoom   0.800
    #define tile   0.850
    #define speed  0.010 
    
    #define brightness 0.0015
    #define darkmatter 0.300
    #define distfading 0.730
    #define saturation 0.850
    
    void main() {
        //get coords and direction
        vec2 uv=vUv-.5;
        uv.y*=1.0;
        vec3 dir=vec3(uv*zoom,1.);
        float time=iTime*speed+.25;
    
        //mouse rotation mechanism would go here
        
        float a1=.5+0.5/2.; //resolution
        float a2=.8+0.5/2.;
        mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
        mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
        dir.xz*=rot1;
        dir.xy*=rot2;
        vec3 from=vec3(1.,.5,0.5);
        from+=vec3(time*2.,time,-2.);
        from.xz*=rot1;
        from.xy*=rot2;
        
        //volumetric rendering
        float s=0.1,fade=1.;
        vec3 v=vec3(0.);
        for (int r=0; r<volsteps; r++) {
            vec3 p=from+s*dir*.5;
            p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
            float pa,a=pa=0.;
            for (int i=0; i<iterations; i++) { 
                p=abs(p)/dot(p,p)-formuparam; // the magic formula
                a+=abs(length(p)-pa); // absolute sum of average change
                pa=length(p);
            }
            float dm=max(0.,darkmatter-a*a*.001); //dark matter
            a*=a*a; // add contrast
            if (r>6) fade*=1.-dm; // dark matter, don't render near
            //v+=vec3(dm,dm*.5,0.);
            v+=fade;
            v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
            fade*=distfading; // distance fading
            s+=stepsize;
        }
        v=mix(vec3(length(v)),v,saturation); //color adjust
        gl_FragColor = vec4(v * 0.01, 1.0);	
    }
  `
};

const HyperspaceTunnel = ({ isActive }: { isActive: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            // Accelerate time when active
            // Base speed + Burst
            const t = state.clock.elapsedTime;
            materialRef.current.uniforms.iTime.value = t * 10.0;
        }
    });

    return (
        <mesh ref={meshRef} scale={[1, 1, 1]} position={[0, 0, -1]}>
            <planeGeometry args={[20, 20]} />
            <shaderMaterial
                ref={materialRef}
                args={[TunnelShader]}
                uniforms={{ iTime: { value: 0 } }}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
};

export default function WormholeTransition({ isActive, duration = 2.0, onComplete }: { isActive: boolean, duration?: number, onComplete?: () => void }) {
    // Timeout handler
    React.useEffect(() => {
        if (isActive && onComplete) {
            const timer = setTimeout(onComplete, duration * 1000);
            return () => clearTimeout(timer);
        }
    }, [isActive, duration, onComplete]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} // Fade in quickly
                    className="fixed inset-0 z-[9000] pointer-events-none"
                    style={{ background: 'black' }}
                >
                    <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
                        <HyperspaceTunnel isActive={isActive} />
                        <EffectComposer>
                            <Bloom intensity={2.0} luminanceThreshold={0.2} radius={0.5} />
                            <ChromaticAberration offset={[0.02, 0.002]} />
                        </EffectComposer>
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
