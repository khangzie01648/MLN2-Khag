import MandalaScene from '@/components/3d/scenes/MandalaScene';

export default function Test3DPage() {
    return (
        <div className="relative w-full h-screen">
            <MandalaScene />

            {/* Info overlay */}
            <div className="absolute top-8 left-8 z-10 bg-black/50 backdrop-blur-sm p-6 rounded-lg text-white max-w-md">
                <h1 className="text-2xl font-bold mb-4">3D Scene Test</h1>
                <div className="space-y-2 text-sm">
                    <p>✅ Three.js installed</p>
                    <p>✅ React Three Fiber working</p>
                    <p>✅ Basic scene rendering</p>
                    <p className="mt-4 text-gray-300">
                        You should see a rotating golden torus knot with stars in the background.
                    </p>
                    <p className="text-gray-300">
                        Use mouse to orbit, scroll to zoom.
                    </p>
                </div>
            </div>
        </div>
    );
}
