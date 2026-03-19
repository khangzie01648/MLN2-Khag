"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import { EffectComposer, Noise, Vignette, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface Props { isDiving?: boolean; paused?: boolean; }

const C = (v: number) => `rgb(${Math.floor(v)},${Math.floor(v)},${Math.floor(v)})`;

// Generate a creepy, sketchy wood texture procedurally
const woodTexture = (() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base gray
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 512, 512);

    // Draw jagged wood grain lines
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 300; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.4})`;
        ctx.beginPath();
        const x = Math.random() * 512;
        ctx.moveTo(x, 0);
        // Wavy line down
        for (let y = 0; y <= 512; y += 20) {
            ctx.lineTo(x + (Math.random() - 0.5) * 15, y);
        }
        ctx.stroke();
    }

    // Add heavy sketchy scratches across
    ctx.lineWidth = 2.0;
    for (let i = 0; i < 150; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.7})`;
        ctx.beginPath();
        const startX = Math.random() * 512;
        const startY = Math.random() * 512;
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + (Math.random() - 0.5) * 60, startY + (Math.random() - 0.5) * 120);
        ctx.stroke();
    }

    // Draw dark plank edges (imperfection)
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(0,0,0,0.8)`;
        ctx.fillRect(i * 128 + (Math.random() * 10 - 5), 0, 4 + Math.random() * 3, 512);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    return tex;
})();

// A function for a wonky, distorted wooden board
function Plank({ p, s, r, c = 120, float = 0 }: { p: [number, number, number]; s: [number, number, number]; r: [number, number, number]; c?: number; float?: number }) {
    const ref = useRef<THREE.Mesh>(null!);

    // Add slow, creepy floating animation for floating elements
    useFrame(({ clock }) => {
        if (float > 0 && ref.current) {
            const t = clock.getElapsedTime();
            ref.current.position.y = p[1] + Math.sin(t * 0.5 + float) * 0.3;
            ref.current.rotation.x = r[0] + Math.sin(t * 0.2 + float) * 0.05;
            ref.current.rotation.z = r[2] + Math.cos(t * 0.3 + float) * 0.05;
        }
    });

    return (
        <mesh ref={ref} position={p} rotation={r} castShadow receiveShadow>
            {/* Tapered geometry to make it look manually cut/broken */}
            <boxGeometry args={s} />
            <meshStandardMaterial
                color={C(c)}
                map={woodTexture || undefined}
                bumpMap={woodTexture || undefined}
                bumpScale={0.1}
                roughness={0.9}
            />
            <Outlines thickness={0.035} color="black" opacity={0.88} transparent />
        </mesh>
    );
}

function Door({ p, r, c = 60 }: { p: [number, number, number]; r: [number, number, number]; c?: number }) {
    return (
        <group position={p} rotation={r}>
            <mesh castShadow receiveShadow position={[0, 0, -0.05]}>
                <boxGeometry args={[2.0, 4.4, 0.1]} />
                <meshStandardMaterial color={C(25)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.06} roughness={0.9} />
                <Outlines thickness={0.03} color="black" />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.7, 0, 0]} rotation={[0, -Math.PI * 0.35, 0]}>
                <boxGeometry args={[1.8, 4.2, 0.1]} />
                <meshStandardMaterial color={C(c)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.06} roughness={0.9} />
                <Outlines thickness={0.02} color="black" />
                <mesh position={[0, 1.0, 0.06]}>
                    <boxGeometry args={[1.0, 1.2, 0.02]} />
                    <meshStandardMaterial color={C(Math.max(0, c - 20))} map={woodTexture || undefined} />
                </mesh>
                <mesh position={[0, -1.0, 0.06]}>
                    <boxGeometry args={[1.0, 1.2, 0.02]} />
                    <meshStandardMaterial color={C(Math.max(0, c - 20))} map={woodTexture || undefined} />
                </mesh>
                <mesh position={[0.6, 0, 0.1]}><sphereGeometry args={[0.08, 8, 8]} /><meshLambertMaterial color={C(20)} /></mesh>
            </mesh>
        </group>
    );
}

// Drawers protruding from walls at terrifying angles
function Drawer({ p, r, s }: { p: [number, number, number]; r: [number, number, number]; s: [number, number] }) {
    return (
        <group position={p} rotation={r}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[s[0], s[1], 0.3]} />
                <meshStandardMaterial color={C(35)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.06} roughness={0.8} />
                <Outlines thickness={0.03} color="black" />
            </mesh>
            <mesh position={[0, 0, 0.15]} castShadow>
                <boxGeometry args={[s[0] * 0.4, 0.1, 0.15]} />
                <meshStandardMaterial color={C(15)} map={woodTexture || undefined} />
            </mesh>
        </group>
    );
}


function Scene({ isDiving = false }: { isDiving?: boolean }) {
    return (
        <group position={[0, -3, 0]}>
            {/* ── ATMOSPHERE ── */}
            <ambientLight intensity={0.4} color="#ffffff" />
            {/* The main blinding light from the mysterious door */}
            <spotLight position={[0, 6, -8]} angle={Math.PI / 2} penumbra={0.6} color="#ffffff" intensity={250} distance={55} castShadow shadow-bias={-0.002} shadow-mapSize={[1024, 1024]} />
            {/* The bottomless void light */}
            <pointLight position={[3, -15, 6]} color="#f0f2f5" intensity={200} distance={60} decay={1.3} />
            <directionalLight position={[0, 5, 25]} intensity={0.2} color="#ffffff" />

            {/* ── THE DOOR OF LIGHT (Center focal point) ── */}
            <group position={[0, 5.5, -6]} rotation={[0.05, -0.05, 0]}>
                {/* Pitch black frame */}
                <mesh receiveShadow>
                    <boxGeometry args={[2.8, 5.2, 0.5]} />
                    <meshStandardMaterial color={C(10)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.1} />
                </mesh>
                {/* Glowing portal */}
                <mesh position={[0, 0, 0.26]}><planeGeometry args={[2.3, 4.8]} /><meshBasicMaterial color="#ffffff" /></mesh>
                {/* Door thrown open */}
                <mesh position={[1.3, 0, -1]} rotation={[0, -Math.PI * 0.75, 0.05]} castShadow>
                    <boxGeometry args={[2.5, 4.9, 0.1]} />
                    <meshStandardMaterial color={C(45)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.08} roughness={0.9} />
                    <Outlines thickness={0.02} color="black" />
                    {/* Diamond window slot */}
                    <mesh position={[0, 0.8, 0.06]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.5, 0.5, 0.02]} /><meshBasicMaterial color="#ffffff" /></mesh>
                </mesh>
                <pointLight position={[0, 0, 3]} color="#ffffff" intensity={120} distance={25} decay={1.4} castShadow />
            </group>

            {/* ── SECONDARY GLOWING DOOR (FAR RIGHT) ── */}
            <group position={[15, 0, -8]} rotation={[0, -0.6, 0.1]}>
                <mesh receiveShadow>
                    <boxGeometry args={[1.5, 3, 0.2]} />
                    <meshStandardMaterial color={C(15)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.1} />
                </mesh>
                <mesh position={[0.7, 0, -0.5]} rotation={[0, -Math.PI * 0.6, 0.05]} castShadow>
                    <boxGeometry args={[1.4, 2.8, 0.08]} />
                    <meshStandardMaterial color={C(50)} map={woodTexture || undefined} bumpMap={woodTexture || undefined} bumpScale={0.05} roughness={0.9} />
                    <Outlines thickness={0.02} color="black" />
                </mesh>
                <mesh position={[0, 0, 0.15]}><planeGeometry args={[1.3, 2.7]} /><meshBasicMaterial color="#ffffff" /></mesh>
                <pointLight position={[0, 0, 2]} color="#ffffff" intensity={50} distance={15} decay={1.5} castShadow />
            </group>

            {/* ── WALL DRAWERS (Chaotic & Crooked) ── */}
            <group position={[0, 10, -5]}>
                <Drawer p={[-3.5, 2, 0]} s={[2.2, 0.8]} r={[-0.1, 0.2, 0.15]} />
                <Drawer p={[-1.5, 3.5, 1]} s={[1.2, 0.5]} r={[0.2, -0.1, -0.2]} />
                <Drawer p={[2, 2.5, -0.5]} s={[2.8, 0.9]} r={[-0.05, -0.3, 0.05]} />
                <Drawer p={[4, 1, 0.5]} s={[1.5, 0.6]} r={[0.3, 0.1, -0.15]} />
                <Drawer p={[1, 4.5, 0]} s={[1.8, 0.7]} r={[0, 0.2, 0.1]} />
                <Drawer p={[-2, 0.5, 1.5]} s={[1.5, 0.6]} r={[-0.2, -0.1, 0]} />
                <Drawer p={[-2, 6, -1]} s={[1.0, 0.5]} r={[0.1, 0.1, -0.25]} />
            </group>

            {/* ── BACKGROUND FLOATING DOORS ── */}
            <Door p={[-7, 8, -3]} r={[0.1, 0.3, -0.05]} c={50} />
            <Door p={[8, 10, -4]} r={[-0.2, -0.5, 0.1]} c={40} />
            <Door p={[10, 5, -1]} r={[0.05, -0.7, -0.15]} c={65} />
            <Door p={[-9, 2, 0]} r={[-0.1, 0.6, 0.05]} c={30} />
            <Door p={[-4, -3, 3]} r={[0.1, 0.1, -0.1]} c={25} />
            <Door p={[6, 3, 0]} r={[-0.1, -0.3, 0.05]} c={55} />

            {/* ── THE FRACTURED MAIN PLATFORM ── */}
            {/* Not a clean bridge, but jagged, unsymmetrical wooden teeth sticking out */}
            {Array.from({ length: 15 }).map((_, i) => {
                const x = -4.5 + i * 0.55 + (Math.random() * 0.3);
                const y = 3.0 + (Math.random() * 0.2 - 0.1);
                const z = -0.5 + Math.sin(i * 0.5) * 1.2 + (Math.random() * 0.5);
                const length = 7 + (Math.random() * 2);
                const rotZ = (Math.random() - 0.5) * 0.15;
                const color = 110 - i * 4 + (Math.random() * 15);
                return <Plank key={`mp${i}`} p={[x, y, z]} s={[0.5, 0.18, length]} r={[0, (Math.random() - 0.5) * 0.1, rotZ]} c={color} />;
            })}

            {/* Spindly, creepy support legs pointing toward the abyss (skewed!) */}
            <Plank p={[-3, -5, 2]} s={[0.15, 16, 0.15]} r={[0.1, 0, -0.05]} c={20} />
            <Plank p={[2, -6, 1]} s={[0.2, 18, 0.2]} r={[-0.05, 0, 0.1]} c={15} />
            <Plank p={[-1, -4, -3]} s={[0.12, 14, 0.12]} r={[0.15, 0.2, -0.1]} c={10} />

            {/* The Dodo Bird Statue Silhouette (crooked!) */}
            <group position={[3.5, 4.0, -2]} rotation={[0, -0.5, 0.1]}>
                <mesh castShadow><cylinderGeometry args={[0.04, 0.06, 1.8]} /><meshLambertMaterial color={C(50)} /></mesh>
                <mesh position={[0, 0.9, 0]} castShadow><sphereGeometry args={[0.4]} /><meshLambertMaterial color={C(90)} /></mesh>
                <mesh position={[0.35, 1.25, 0]} castShadow><sphereGeometry args={[0.22]} /><meshLambertMaterial color={C(110)} /></mesh>
            </group>

            {/* ── TWISTED SPINE STARECASE (Going down right) ── */}
            {Array.from({ length: 14 }).map((_, i) => {
                const f = i / 14;
                const x = 4.5 + Math.sin(f * Math.PI) * 5; // Bow outwards
                const y = 2.0 - i * 0.9 + (Math.random() * 0.2); // Uneven step height
                const z = 2.0 + f * 9; // Curving towards us
                // Rotate significantly to make them look barely balanced
                const rY = -f * 1.2 + (Math.random() * 0.2 - 0.1);
                const rZ = (Math.random() - 0.5) * 0.2;
                const rX = (Math.random() - 0.5) * 0.15;
                return <Plank key={`sr${i}`} p={[x, y, z]} s={[2.8 + Math.random(), 0.15, 0.7 + Math.random() * 0.3]} r={[rX, rY, rZ]} c={85 - i * 5} />;
            })}

            {/* Sketchy, broken handrail */}
            {Array.from({ length: 10 }).map((_, i) => {
                const f = i / 10;
                const tilt = (Math.random() - 0.5) * 0.3;
                return <Plank key={`hr${i}`} p={[4.5 + Math.sin(f * Math.PI) * 5 - 1.2, 2.0 - i * 1.2 + 1.2, 2.0 + f * 9]} s={[0.06, 2.0, 0.06]} r={[0, 0, tilt]} c={25} />;
            })}

            {/* ── FLOATING STAIRCASE (Going UP RIGHT) ── */}
            {Array.from({ length: 8 }).map((_, i) => {
                const x = 9 + i * 1.2;
                const y = 3 + i * 1.0;
                const z = -2 + i * 0.8;
                return <Plank key={`supr${i}`} p={[x, y, z]} s={[2.2, 0.15, 0.8]} r={[(Math.random() - 0.5) * 0.1, -0.6, Math.random() * 0.1 - 0.05]} c={80 - i * 4} />;
            })}

            {/* ── ASCENDING STAIRCASE OFF A CLIFF (Left) ── */}
            {Array.from({ length: 12 }).map((_, i) => {
                const x = -5.0 - i * 1.0;
                const y = 2.5 + i * 0.7;
                const z = 0.5 + i * 0.8 + Math.sin(i * 0.5) * 0.5;
                const rX = 0.1 + Math.random() * 0.1;
                return <Plank key={`scl${i}`} p={[x, y, z]} s={[2.4, 0.15, 0.9]} r={[rX, 0.5, (Math.random() - 0.5) * 0.1]} c={80 - i * 3} />;
            })}

            {/* ── ESCHER/INCEPTION STAIRCASE (Left Background, entirely floating, crooked) ── */}
            {Array.from({ length: 12 }).map((_, i) => {
                const x = -10 + Math.sin(i * 0.4) * 3;
                const y = 8 - i * 0.6;
                const z = -6 + i * 0.2;
                return <Plank key={`sbl${i}`} p={[x, y, z]} s={[3.2, 0.18, 0.9]} r={[0.3, -Math.PI * 0.35 + i * 0.05, 0.1]} c={45 - i * 2} float={i * 0.5} />;
            })}

            {/* Another chunk of floating stairs mid-left */}
            {Array.from({ length: 6 }).map((_, i) => {
                const x = -14 + i * 0.8;
                const y = 4 + i * 0.4;
                const z = 2 + i * 0.2;
                return <Plank key={`sbl2${i}`} p={[x, y, z]} s={[2.2, 0.15, 0.8]} r={[0.1, Math.PI * 0.2, -0.1]} c={35 - i * 2} float={i * 0.3} />;
            })}

            {/* ── MASSIVE DISORIENTING FOREGROUND PLANKS ── */}
            {/* Massive Left Foregound blocks - intersecting wildly */}
            <Plank p={[-13, -8, 16]} s={[5.5, 0.4, 2.0]} r={[0.2, 0.4, -0.3]} c={30} />
            <Plank p={[-15, -4, 18]} s={[6.0, 0.5, 1.8]} r={[-0.1, 0.6, -0.1]} c={20} />
            <Plank p={[-10, -12, 14]} s={[4.0, 0.3, 1.5]} r={[0.3, 0.2, -0.4]} c={15} />

            {/* Massive Right Foregound blocks */}
            <Plank p={[14, -10, 20]} s={[6.5, 0.5, 2.5]} r={[-0.2, -0.3, 0.2]} c={25} />
            <Plank p={[11, -14, 17]} s={[5.0, 0.4, 2.0]} r={[-0.4, -0.5, 0.1]} c={15} />

            {/* ── CHAOTIC FLOATING DOORS IN THE VOID ── */}
            {/* Tilting, falling, defying gravity */}
            <Door p={[-10, 1, 6]} r={[1.2, 0.5, -0.2]} c={35} />
            <Door p={[8, 0, 8]} r={[-0.4, -0.8, -0.6]} c={50} />
            <Door p={[-5, -6, 5]} r={[0.2, 0.2, -0.9]} c={25} />
            <Door p={[-2, -8, 8]} r={[-0.6, 0.1, 0.5]} c={20} />
            <Door p={[5, -5, 10]} r={[1.4, -0.3, 0.4]} c={65} />
            <Door p={[-12, -4, 12]} r={[0.1, 0.8, -0.3]} c={18} />

            {/* Random small debris/splinters floating */}
            {Array.from({ length: 25 }).map((_, i) => (
                <Plank
                    key={`deb${i}`}
                    p={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15 + 5]}
                    s={[Math.random() * 2 + 1, 0.05, Math.random() * 0.5 + 0.2]}
                    r={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                    c={10 + Math.random() * 60}
                    float={i * 3.14}
                />
            ))}

            {/* ── SILHOUETTES CAPTURING THE CLAUSTROPHOBIA ── */}
            <mesh position={[-25, 5, -5]} rotation={[0, 0.2, -0.1]}><boxGeometry args={[10, 60, 5]} /><meshLambertMaterial color={C(5)} /></mesh>
            <mesh position={[25, 5, -5]} rotation={[0, -0.2, 0.1]}><boxGeometry args={[10, 60, 5]} /><meshLambertMaterial color={C(5)} /></mesh>

        </group>
    );
}

export default function MindscapeScene({ isDiving = false, paused = false }: Props) {
    return (
        <Canvas
            className="fixed inset-0 w-full h-full"
            camera={{ position: [0, 8, 26], up: [0.12, 1, -0.05], fov: 42, near: 0.1, far: 200 }}
            onCreated={({ camera, gl, scene }) => {
                (camera as THREE.PerspectiveCamera).lookAt(0, 3, 0);
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;
                scene.background = new THREE.Color(0x060606);
                // Pushed fog further back for clarity
                scene.fog = new THREE.Fog(0x060606, 50, 120);
            }}
            shadows
        >
            <Scene isDiving={isDiving} />
            <EffectComposer>
                <Noise premultiply blendFunction={BlendFunction.COLOR_BURN} opacity={0.15} />
                <Vignette eskil={false} offset={0.15} darkness={0.8} />
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.4} intensity={1.5} mipmapBlur />
            </EffectComposer>
        </Canvas>
    );
}