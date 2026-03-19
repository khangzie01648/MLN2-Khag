import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Hourglass from '@/components/3d/objects/Hourglass';

export default function HourglassTest() {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 100]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[50, 50, 50]} intensity={1} />
                <pointLight position={[-50, -50, 50]} intensity={0.5} />

                <Hourglass />

                <OrbitControls />
            </Canvas>

            <div className="absolute top-8 left-8 bg-black/70 p-4 rounded text-white">
                <h2 className="text-xl font-bold mb-2">Hourglass Test</h2>
                <p className="text-sm">✅ Glass geometry</p>
                <p className="text-sm">✅ 5000 sand particles</p>
                <p className="text-sm">✅ Falling animation</p>
                <p className="text-sm">✅ Funnel through neck</p>
            </div>
        </div>
    );
}
