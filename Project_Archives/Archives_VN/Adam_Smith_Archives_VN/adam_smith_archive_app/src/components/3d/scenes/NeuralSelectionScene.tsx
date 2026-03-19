"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { PILLARS } from "@/lib/pillar-constants";

/**
 * TOURNAMENT STANDARD TABLE (Matchroom Style)
 */
function PoolTable() {
    const tableWidth = 40;
    const tableLength = 70;

    // TOURNAMENT MATERIALS
    const clothMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#0055a5", // "Tournament Blue"
        roughness: 0.9,
        metalness: 0,
    }), []);

    const railMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#1a1a1a", // Matte Black Finish
        roughness: 0.4,
        metalness: 0.2,
    }), []);

    const apronMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#000000", // Glossy Black Aprons
        roughness: 0.2,
        metalness: 0.5,
    }), []);

    const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#e0e0e0", // Chrome Corners
        roughness: 0.1,
        metalness: 0.9,
    }), []);

    const leatherMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#111111", roughness: 0.9, metalness: 0,
    }), []);

    const pearlMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#ffffff", emissive: "#444444", roughness: 0.2, metalness: 0.5,
    }), []);

    // Rail Sights
    const sights = useMemo(() => {
        const s: number[][] = [];
        [-17, 0, 17].forEach(z => s.push([-22, z], [22, z]));
        [-10, 0, 10].forEach(x => s.push([x, -37], [x, 37]));
        return s;
    }, []);

    return (
        <group position={[0, -5, 0]}>
            {/* CLOTH SURFACE */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow material={clothMaterial}>
                <planeGeometry args={[tableWidth, tableLength]} />
            </mesh>

            {/* SLATE LINER */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[tableWidth + 0.5, 1, tableLength + 0.5]} />
                <meshBasicMaterial color="#003366" />
            </mesh>

            {/* WIDE RAILS (Tournament style) */}
            {/* Top */}
            <RoundedBox args={[tableWidth + 8, 2, 5]} radius={0.1} position={[0, 1, -tableLength / 2 - 2.5]} material={railMaterial} />
            {/* Bottom */}
            <RoundedBox args={[tableWidth + 8, 2, 5]} radius={0.1} position={[0, 1, tableLength / 2 + 2.5]} material={railMaterial} />
            {/* Left */}
            <RoundedBox args={[5, 2, tableLength]} radius={0.1} position={[-tableWidth / 2 - 2.5, 1, 0]} material={railMaterial} />
            {/* Right */}
            <RoundedBox args={[5, 2, tableLength]} radius={0.1} position={[tableWidth / 2 + 2.5, 1, 0]} material={railMaterial} />

            {/* APRONS (Side panels) */}
            <mesh position={[0, -2, 0]}>
                <boxGeometry args={[tableWidth + 8, 4, tableLength + 8]} />
                <primitive object={apronMaterial} />
            </mesh>

            {/* CHROME CORNERS (Sleek, Modern) */}
            {[
                [-tableWidth / 2 - 2.5, -tableLength / 2 - 2.5], [tableWidth / 2 + 2.5, -tableLength / 2 - 2.5],
                [-tableWidth / 2 - 2.5, tableLength / 2 + 2.5], [tableWidth / 2 + 2.5, tableLength / 2 + 2.5]
            ].map((pos, idx) => (
                <RoundedBox key={idx} args={[5.2, 2.1, 5.2]} radius={0.5} position={[pos[0], 1, pos[1]]} material={chromeMaterial} />
            ))}

            {/* DIAMOND SIGHTS */}
            {sights.map((pos, idx) => (
                <mesh key={`sight-${idx}`} position={[pos[0], 2.01, pos[1]]} rotation={[-Math.PI / 2, Math.PI / 4, 0]}>
                    <circleGeometry args={[0.3, 16]} />
                    {/* Diamond shape usually, but circle is fine for now, or rotate a square */}
                    <primitive object={pearlMaterial} />
                </mesh>
            ))}

            {/* POCKETS */}
            {[
                [-19, -34], [19, -34], [-19, 34], [19, 34], [-21, 0], [21, 0]
            ].map((pos, idx) => (
                <group key={`pocket-${idx}`} position={[pos[0], 0.06, pos[1]]}>
                    <mesh>
                        <cylinderGeometry args={[2.3, 2.3, 0.1, 32]} />
                        <meshBasicMaterial color="#000000" />
                    </mesh>
                    <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[2.4, 0.2, 8, 32]} />
                        <primitive object={leatherMaterial} />
                    </mesh>
                </group>
            ))}

            {/* MODERN SLANTED LEGS (Black) */}
            {/* Usually 2 large pedestals or 4 slanted block legs */}
            {/* Let's make 4 clean slanted block legs */}
            {[
                [-18, -25], [18, -25],
                [-18, 25], [18, 25]
            ].map((pos, idx) => (
                <mesh key={`leg-${idx}`} position={[pos[0], -8, pos[1]]}>
                    <boxGeometry args={[6, 12, 6]} />
                    <primitive object={apronMaterial} />
                </mesh>
            ))}
            {/* FEET (Chrome levelers) */}
            {[
                [-18, -25], [18, -25],
                [-18, 25], [18, 25]
            ].map((pos, idx) => (
                <mesh key={`foot-${idx}`} position={[pos[0], -14.5, pos[1]]}>
                    <cylinderGeometry args={[3.2, 3.2, 1, 32]} />
                    <primitive object={chromeMaterial} />
                </mesh>
            ))}
        </group>
    );
}

/**
 * CUE STICK - The Striker
 */
function CueStick({ active, targetPos, ballPos }: { active: boolean, targetPos: THREE.Vector3, ballPos: THREE.Vector3 }) {
    const cueRef = useRef<THREE.Group>(null);

    // Calculate rotation to point at ball from opposite side of target
    const direction = useMemo(() => {
        return ballPos.clone().sub(targetPos).normalize();
    }, [ballPos, targetPos]);

    const initialOffset = 10;

    useFrame((state) => {
        if (!cueRef.current) return;

        if (active) {
            const t = state.clock.elapsedTime * 10;
            // Pull back and strike sequence
            // Phase 1: Pull back (0-0.3s)
            // Phase 2: Strike (0.3-0.5s)
            const phase = state.clock.elapsedTime % 1; // Simplified for logic
            // We use state.clock or a local timer. Let's use a simpler lerp-based approach in BilliardBall instead for precision.
        }
    });

    return (
        <group ref={cueRef} position={[direction.x * initialOffset, 0, direction.z * initialOffset]}>
            <mesh rotation={[Math.PI / 2, 0, Math.atan2(direction.x, direction.z)]}>
                <cylinderGeometry args={[0.2, 0.4, 35, 12]} />
                <meshStandardMaterial color="#f0d9b5" roughness={0.3} /> {/* Maple wood */}
                <mesh position={[0, 17, 0]}>
                    <cylinderGeometry args={[0.42, 0.42, 1, 12]} />
                    <meshStandardMaterial color="#111" /> {/* Rubber butt */}
                </mesh>
                <mesh position={[0, -17.2, 0]}>
                    <cylinderGeometry args={[0.22, 0.22, 0.5, 12]} />
                    <meshStandardMaterial color="#fff" /> {/* Tip ferrule */}
                </mesh>
            </mesh>
        </group>
    );
}

/**
 * OVERHEAD LAMP
 */
function OverheadLamp() {
    return (
        <group position={[0, 45, 0]}>
            <mesh>
                <boxGeometry args={[30, 1, 10]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[28, 0.2, 8]} />
                <meshBasicMaterial color="#fff" />
            </mesh>
            <pointLight position={[0, -2, 0]} intensity={200} distance={100} color="#fff1d0" />
        </group>
    );
}

/**
 * ROOM FLOOR
 */
function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -15.1, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#1a120b" roughness={0.3} metalness={0.1} />
        </mesh>
    );
}

/**
 * REALISTIC BILLIARD BALL with Cue Logic
 */
function BilliardBall({ pillar, index, total, onSelect }: any) {
    const [hovered, setHovered] = useState(false);
    const [gameState, setGameState] = useState<'idle' | 'aiming' | 'shooting' | 'sinking'>('idle');
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const cueRef = useRef<THREE.Group>(null);

    const initialPos = useMemo(() => {
        const radius = 14;
        // Avoid division by zero or NaN if total is 0
        const safeTotal = total || 1;
        const angle = (index / safeTotal) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // Final safety check
        if (isNaN(x) || isNaN(z)) return new THREE.Vector3(0, -3.4, 0);

        return new THREE.Vector3(x, -3.4, z);
    }, [index, total]);

    const POCKETS = useMemo(() => [
        new THREE.Vector3(-20, -3.5, -35), new THREE.Vector3(20, -3.5, -35),
        new THREE.Vector3(-20, -3.5, 35), new THREE.Vector3(20, -3.5, 35),
        new THREE.Vector3(-21, -3.5, 0), new THREE.Vector3(21, -3.5, 0)
    ], []);

    const targetPocket = useMemo(() => {
        let nearest = POCKETS[0];
        let minDesc = Infinity;
        for (const p of POCKETS) {
            const d = initialPos.distanceTo(p);
            if (d < minDesc) { minDesc = d; nearest = p; }
        }
        return nearest;
    }, [initialPos, POCKETS]);

    const cueDirection = useMemo(() => {
        const dir = initialPos.clone().sub(targetPocket);
        if (dir.lengthSq() < 0.0001) return new THREE.Vector3(0, 0, 1); // Safety for identical points
        return dir.normalize();
    }, [initialPos, targetPocket]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (gameState === 'aiming') {
            // Animate cue pulling back
            if (cueRef.current) {
                const pullBack = Math.sin(state.clock.elapsedTime * 15) * 2 - 2;
                const baseOffset = 4;
                cueRef.current.position.set(
                    cueDirection.x * (baseOffset - pullBack),
                    -3.4,
                    cueDirection.z * (baseOffset - pullBack)
                );
            }
        } else if (gameState === 'shooting') {
            const speed = 80;
            const step = speed * delta;
            const current = groupRef.current.position;
            const distXZ = Math.hypot(current.x - targetPocket.x, current.z - targetPocket.z);

            if (distXZ > 0.8) {
                const dir = targetPocket.clone().sub(current).normalize();
                dir.y = 0;
                groupRef.current.position.add(dir.multiplyScalar(step));
                if (meshRef.current) {
                    const axis = new THREE.Vector3(0, 1, 0).cross(dir).normalize();
                    meshRef.current.rotateOnAxis(axis, step * 0.4);
                }
            } else {
                setGameState('sinking');
            }
        } else if (gameState === 'sinking') {
            groupRef.current.position.y -= delta * 30;
            groupRef.current.scale.multiplyScalar(0.95);
            if (groupRef.current.position.y < -15) {
                // Game over/Navigate
            }
        }
    });

    const handleClick = () => {
        if (gameState !== 'idle') return;
        setGameState('aiming');

        // Strike after 1s of aiming
        setTimeout(() => {
            setGameState('shooting');
            // Flash/Navigate
            setTimeout(() => onSelect(pillar.id), 800);
        }, 1000);
    };

    return (
        <group ref={groupRef} position={initialPos}>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                onPointerOver={() => { if (gameState === 'idle') { setHovered(true); document.body.style.cursor = 'pointer'; } }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
                onClick={handleClick}
            >
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    color={pillar.color}
                    emissive={pillar.color}
                    emissiveIntensity={hovered ? 0.6 : 0.1}
                    roughness={0.05}
                    metalness={0.2}
                />
            </mesh>

            <mesh position={[0, 0.8, 1.2]} rotation={[-Math.PI / 3, 0, 0]}>
                <circleGeometry args={[0.7, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {gameState === 'idle' && (
                <Text
                    position={[0, 3, 0]}
                    fontSize={1.2}
                    color="white"
                    anchorX="center" anchorY="middle"
                    fillOpacity={hovered ? 1 : 0.6}
                    rotation={[-Math.PI / 3, 0, 0]}
                >
                    {pillar.nameVi.toUpperCase()}
                </Text>
            )}

            {/* CUE STICK - Only visible when aiming */}
            {gameState === 'aiming' && (
                <group ref={cueRef}>
                    <mesh rotation={[Math.PI / 2, 0, Math.atan2(cueDirection.x, cueDirection.z)]}>
                        <cylinderGeometry args={[0.2, 0.4, 40, 12]} />
                        <meshStandardMaterial color="#f0d9b5" roughness={0.4} />
                        <mesh position={[0, -20.2, 0]}>
                            <cylinderGeometry args={[0.22, 0.22, 0.6, 12]} />
                            <meshStandardMaterial color="#fff" />
                        </mesh>
                    </mesh>
                </group>
            )}
        </group>
    );
}

export default function NeuralSelectionScene({ onSelect }: { onSelect: (id: string) => void }) {
    return (
        <group>
            <PoolTable />
            <Floor />
            <OverheadLamp />

            {/* BALLS */}
            {PILLARS.map((p, i) => (
                <BilliardBall
                    key={p.id}
                    pillar={p}
                    index={i}
                    total={PILLARS.length}
                    onSelect={onSelect}
                />
            ))}

            {/* LIGHTING */}
            <ambientLight intensity={0.4} />
            <spotLight
                position={[0, 50, 0]}
                angle={0.6} penumbra={0.6}
                intensity={800}
                castShadow
                shadow-bias={-0.0001}
                color="#fff6e5"
            />
            <Environment preset="night" />
        </group>
    );
}
