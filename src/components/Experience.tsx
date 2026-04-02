import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, MeshDistortMaterial, Environment, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

const Train = ({ speed, zPos, xPos, color }: { speed: number, zPos: number, xPos: number, color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.z -= speed * delta * 60;
    if (ref.current.position.z < -100) ref.current.position.z = 100;
  });

  return (
    <mesh ref={ref} position={[xPos, -4.8, zPos]}>
      <boxGeometry args={[0.4, 0.2, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
};

const Building = ({ x, z, h, w, scrollProgress }: { x: number, z: number, h: number, w: number, scrollProgress: number }) => {
  // Base opacity for the "solid but transparent" look
  const baseOpacity = 0.4;
  const fadeOut = scrollProgress < 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) * 3);
  const currentOpacity = baseOpacity * fadeOut;
  
  return (
    <group position={[x, h / 2 - 5, z]}>
      {/* Main Structure */}
      <mesh>
        <boxGeometry args={[w, h, w]} />
        <meshStandardMaterial 
          color="#2F2F2F" 
          wireframe={false} 
          transparent 
          opacity={currentOpacity}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Windows (Recognizable details) */}
      {scrollProgress < 0.5 && (
        <group>
          {[...Array(Math.floor(h / 2))].map((_, i) => (
            <mesh key={i} position={[0, (i - h / 4) * 2, w / 2 + 0.01]}>
              <planeGeometry args={[w * 0.8, 0.5]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                emissive="#FFFFFF" 
                emissiveIntensity={1} 
                transparent 
                opacity={fadeOut * 0.6} 
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export const Experience = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Phase 1: 0 to 0.25 (Gridlock)
    // Phase 2: 0.25 to 0.5 (The System)
    // Phase 3: 0.5 to 0.75 (The Architects / Blueprints)
    // Phase 4: 0.75 to 1.0 (Clarity)
    
    const targetZ = 20 - scrollProgress * 70;
    const targetY = 5 - scrollProgress * 12;
    const targetX = Math.sin(scrollProgress * Math.PI) * 6;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    state.camera.lookAt(0, 0, -20);

    if (gridRef.current) {
      gridRef.current.rotation.y += 0.0005;
      const gridOpacity = scrollProgress < 0.4 ? 0.5 : Math.max(0, 0.5 - (scrollProgress - 0.4) * 2);
      (gridRef.current.material as THREE.Material).opacity = gridOpacity;
      (gridRef.current.material as THREE.Material).transparent = true;
    }

    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.1;
  });

  const buildings = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 100 - 20;
      const h = Math.random() * 15 + 5;
      const w = Math.random() * 2 + 1;
      temp.push({ x, z, h, w, id: i });
    }
    return temp;
  }, []);

  const trains = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 12; i++) {
      temp.push({
        speed: Math.random() * 0.5 + 0.5,
        zPos: (Math.random() - 0.5) * 200,
        xPos: (Math.random() - 0.5) * 60,
        color: i % 2 === 0 ? "#1B263B" : "#FFFFFF",
        id: i
      });
    }
    return temp;
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={45} />
      <color attach="background" args={['#F9F9F9']} />
      <fog attach="fog" args={['#F9F9F9', 5, 60]} />
      
      <ambientLight intensity={0.4} />
      <spotLight position={[20, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} color="#1B263B" intensity={1} />

      <group ref={groupRef}>
        {/* Phase 1: Gridlock Buildings & Trains */}
        {scrollProgress < 0.5 && (
          <>
            {buildings.map((b) => (
              <Building key={b.id} {...b} scrollProgress={scrollProgress} />
            ))}
            
            {trains.map((t) => (
              <Train key={t.id} {...t} />
            ))}
          </>
        )}

        {/* Phase 2 & 3: Blueprints */}
        {scrollProgress > 0.25 && scrollProgress < 0.8 && (
          <group position={[0, 0, -30]}>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <octahedronGeometry args={[8, 0]} />
                <meshStandardMaterial 
                  color="#1B263B" 
                  wireframe 
                  transparent 
                  opacity={Math.min(0.6, (scrollProgress - 0.25) * 2)} 
                />
              </mesh>
            </Float>
            
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[0, 0, i * -5]} rotation={[0, 0, i * 0.5]}>
                <torusGeometry args={[10 + i * 2, 0.02, 16, 100]} />
                <meshBasicMaterial color="#1B263B" transparent opacity={0.1} />
              </mesh>
            ))}
          </group>
        )}

        {/* Phase 4: Rolling Countryside */}
        {scrollProgress > 0.7 && (
          <group position={[0, -5, -60]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[200, 200, 64, 64]} />
              <MeshDistortMaterial 
                color="#FFFFFF" 
                speed={2} 
                distort={0.3} 
                radius={1}
                transparent
                opacity={Math.min(1, (scrollProgress - 0.7) * 4)}
              />
            </mesh>
            
            {[...Array(10)].map((_, i) => (
              <mesh key={i} position={[(i - 5) * 15, 10, -40]} scale={[0.5, 20, 0.5]}>
                <cylinderGeometry />
                <meshStandardMaterial color="#1B263B" transparent opacity={0.05} />
              </mesh>
            ))}
          </group>
        )}

        <gridHelper 
          ref={gridRef} 
          args={[200, 40, '#2F2F2F', '#CCCCCC']} 
          position={[0, -5, 0]} 
        />
      </group>

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <Environment preset="city" />
    </>
  );
};
