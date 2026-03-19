import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import FloatingBook from '@/components/3d/objects/FloatingBook';

export default function BookTest() {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-red-900 to-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 80]} fov={50} />
                <ambientLight intensity={0.6} />
                <pointLight position={[50, 50, 50]} intensity={1} />
                <FloatingBook />
                <OrbitControls />
            </Canvas>
            <div className="absolute top-8 left-8 bg-black/70 p-4 rounded text-white">
                <h2 className="text-xl font-bold mb-2">Red Book Test</h2>
                <p className="text-sm">✅ Front/back covers (red)</p>
                <p className="text-sm">✅ Pages (parchment)</p>
                <p className="text-sm">✅ Gold title</p>
                <p className="text-sm">✅ Floating animation</p>
            </div>
        </div>
    );
}
