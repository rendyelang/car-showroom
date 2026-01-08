import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sparkles, useGLTF, Environment, Html, useProgress } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';

const RealCarModel = ({ modelPath, carName }) => {
  const gltf = useGLTF(modelPath);
  const scene = gltf.scene.clone();

  // 1. LOGIKA SKALA KHUSUS (TESLA vs LAMBO)
  const isTesla = carName ? carName.toLowerCase().includes('tesla') : false;
  // Tesla biasanya kegedean, jadi kita kecilin. Lambo biasanya pas.
  const targetScale = isTesla ? 0.55 : 0.6;
  const targetPositionY = isTesla ? -0.8 : -0.5;

  // 2. ANIMASI MASUK (SPRING)
  const { scaleSpring, positionYSpring } = useSpring({
    from: { scaleSpring: 0, positionYSpring: -3 }, // Mulai dari kecil & bawah
    to: { scaleSpring: targetScale, positionYSpring: targetPositionY }, // Ke ukuran & posisi asli
    config: { mass: 1, tension: 200, friction: 50 }, // Config fisika biar "mahal" (gak membal berlebihan)
    delay: 300,
    reset: true, // Reset animasi pas ganti mobil
  });

  return (
    // Float dibuat santai biar ga ganggu dragging
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1} floatingRange={[-0.05, 0.05]}>
      <animated.group scale={scaleSpring} position-y={positionYSpring}>
        <primitive 
          object={scene} 
          // POSISI PRIMITIVE DI-RESET KE 0,0,0 KARENA SUDAH DIATUR GROUP
          position={[0, 0, 0]} 
          rotation={[0, -Math.PI / 5, 0]} 
        />
      </animated.group>
    </Float>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white/80 font-mono text-xs bg-black/80 px-4 py-2 rounded border border-white/10 backdrop-blur-md">
        LOADING ASSET... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const HeroCanvas = ({ currentCar }) => {
  // Helper Warna
  const getAccentColor = (colorName) => {
     const c = colorName ? colorName.toLowerCase() : 'white';
     if (c.includes('red')) return '#ef4444';
     if (c.includes('blue')) return '#3b82f6';
     if (c.includes('green')) return '#22c55e';
     if (c.includes('yellow')) return '#eab308';
     return '#ffffff'; // Default putih buat neutral
  };
  
  const accentColor = getAccentColor(currentCar?.color);

  return (
    // --- CONTAINER ULTRAWIDE (150%) ---
    // Ini teknik biar mobil visualnya di Kanan, tapi kordinat aslinya di Tengah (0,0,0)
    // Jadi dragging-nya enak banget karena pivotnya simetris.
    <div className="absolute top-0 left-0 h-screen w-[130%] z-0 bg-slate-950 overflow-hidden cursor-move active:cursor-grabbing">
      
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        
        {/* Lighting setup biar mobil keliatan volume-nya */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <Environment preset="city" blur={0.8} />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color={accentColor} />

        <Suspense fallback={<Loader />}>
           {currentCar && currentCar.modelPath ? (
              <RealCarModel 
                  modelPath={currentCar.modelPath} 
                  carName={currentCar.name}
                  key={currentCar.id} 
              />
           ) : (
              <Html center className="text-white/30 text-xs tracking-widest">
                NO 3D MODEL
              </Html>
           )}
        </Suspense>
        
        {/* --- ORBIT CONTROLS ALA SKETCHFAB --- */}
        <OrbitControls 
            makeDefault
            
            // TARGET: WAJIB DI TENGAH (0, -0.5, 0) BIAR GAK GOYANG
            target={[0, -0.5, 0]} 
            
            // DAMPING: Ini rahasia rasa "mahal". 
            // Angka makin kecil = makin berat/licin (kayak mobil asli).
            enableDamping={true}
            dampingFactor={0.025} 
            
            // SENSITIVITAS
            rotateSpeed={0.5} // Puter santai
            zoomSpeed={0.5}   // Zoom halus
            
            // BATASAN ZOOM
            minDistance={3} 
            maxDistance={12} 
            
            // AUTO ROTATE (Pelan & Elegan)
            autoRotate={true}
            autoRotateSpeed={0.3} // Jangan terlalu ngebut
            
            // BATASAN SUDUT PANDANG (Biar ga liat kolong mobil)
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.95} 
            
            enablePan={false} // Matikan geser kanan-kiri biar fokus puter aja
        />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;