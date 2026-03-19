import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import NestedSpheres from '@/components/3d/objects/NestedSpheres';

export default function SpheresTest() {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 80]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[50, 50, 50]} intensity={1} color="#4444FF" />

                <NestedSpheres />

                <OrbitControls />
            </Canvas>

            <div className="absolute top-8 left-8 bg-black/70 p-4 rounded text-white">
                <h2 className="text-xl font-bold mb-2">Nested Spheres Test</h2>
                <p className="text-sm">✅ Outer (Ego) - wireframe</p>
                <p className="text-sm">✅ Middle (Shadow) - wireframe</p>
                <p className="text-sm">✅ Inner (Self) - solid glow</p>
                <p className="text-sm">✅ Different rotation speeds</p>
            </div>
        </div>
    );
}
