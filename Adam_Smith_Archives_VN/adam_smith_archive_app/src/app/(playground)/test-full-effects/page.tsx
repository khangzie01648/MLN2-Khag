import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Hourglass from '@/components/3d/objects/Hourglass';
import NestedSpheres from '@/components/3d/objects/NestedSpheres';
import FloatingBook from '@/components/3d/objects/FloatingBook';
import AlchemyFlask from '@/components/3d/objects/AlchemyFlask';
import LotusFlower from '@/components/3d/objects/LotusFlower';
import EyeOfHorus from '@/components/3d/objects/EyeOfHorus';
import SacredFlame from '@/components/3d/objects/SacredFlame';
import ProceduralTree from '@/components/3d/objects/ProceduralTree';
import QuantumParticles from '@/components/3d/objects/QuantumParticles';
import ConstellationNetwork from '@/components/3d/objects/ConstellationNetwork';

export default function FullEffectsTest() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 200]} fov={60} />
                <ambientLight intensity={0.4} />
                <pointLight position={[100, 100, 100]} intensity={1} />
                <pointLight position={[-100, -100, 100]} intensity={0.5} />

                {/* Objects */}
                <group position={[-80, 60, 0]}><Hourglass /></group>
                <group position={[0, 60, 0]}><NestedSpheres /></group>
                <group position={[80, 60, 0]}><FloatingBook /></group>
                <group position={[-120, 0, 0]}><AlchemyFlask /></group>
                <group position={[-40, 0, 0]}><LotusFlower /></group>
                <group position={[40, 0, 0]}><EyeOfHorus /></group>
                <group position={[120, 0, 0]}><SacredFlame /></group>
                <group position={[-80, -60, 0]}><ProceduralTree /></group>
                <group position={[0, -60, 0]} scale={0.5}><QuantumParticles /></group>
                <group position={[80, -60, 0]}><ConstellationNetwork /></group>

                <OrbitControls />

                {/* Full post-processing pipeline */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        height={300}
                        intensity={1.5}
                    />
                    <ChromaticAberration
                        offset={[0.002, 0.002]}
                        blendFunction={BlendFunction.NORMAL}
                    />
                    <Noise
                        opacity={0.15}
                        blendFunction={BlendFunction.OVERLAY}
                    />
                    <Vignette
                        offset={0.5}
                        darkness={0.5}
                    />
                </EffectComposer>
            </Canvas>

            <div className="absolute top-4 left-4 bg-black/90 p-4 rounded text-white text-sm">
                <h2 className="text-xl font-bold mb-3">Full Pipeline ✅</h2>
                <div className="space-y-1">
                    <p className="text-green-400">✅ Bloom (glow)</p>
                    <p className="text-green-400">✅ Chromatic Aberration</p>
                    <p className="text-green-400">✅ Film Grain (Noise)</p>
                    <p className="text-green-400">✅ Vignette</p>
                </div>
            </div>
        </div>
    );
}
