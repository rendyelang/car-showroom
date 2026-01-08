import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, MeshDistortMaterial } from '@react-three/drei';

const SpinningBox = () => {
  const mesh = useRef(null);
  // Animasi putar
  useFrame(() => (mesh.current.rotation.y += 0.01));

  return (
    <mesh ref={mesh} visible position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Material modern yang agak 'liquid' */}
      <MeshDistortMaterial color="#8b5cf6" speed={2} distort={0.3} radius={1} />
    </mesh>
  );
};

const Showcase3D = () => {
  return (
    <div className="h-[400px] w-full bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700 shadow-2xl">
        <div className="absolute top-4 left-4 z-10 text-white font-bold bg-black/50 p-2 rounded">
            Interactive 3D View
        </div>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Stage environment="city" intensity={0.6}>
          <SpinningBox />
        </Stage>
        <OrbitControls autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default Showcase3D;