import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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

export default function AllObjectsTest() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 200]} fov={60} />
                <ambientLight intensity={0.4} />
                <pointLight position={[100, 100, 100]} intensity={1} />
                <pointLight position={[-100, -100, 100]} intensity={0.5} />

                {/* Arrange objects in grid */}
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

                {/* Post-processing */}
                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
                </EffectComposer>
            </Canvas>

            <div className="absolute top-4 left-4 bg-black/80 p-4 rounded text-white text-sm">
                <h2 className="text-xl font-bold mb-2">All 10 Objects ✅</h2>
                <div className="grid grid-cols-2 gap-2">
                    <p>✅ Hourglass</p>
                    <p>✅ Spheres</p>
                    <p>✅ Book</p>
                    <p>✅ Flask</p>
                    <p>✅ Lotus</p>
                    <p>✅ Eye</p>
                    <p>✅ Flame</p>
                    <p>✅ Tree</p>
                    <p>✅ Particles</p>
                    <p>✅ Network</p>
                </div>
                <p className="mt-2 text-green-400">+ Bloom effect</p>
            </div>
        </div>
    );
}
