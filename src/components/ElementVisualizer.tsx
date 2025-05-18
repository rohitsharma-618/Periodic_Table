import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Points, PointMaterial } from '@react-three/drei';
import { Element } from '../types/Element';
import { categoryColorText } from '../types/Element';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface ElementVisualizerProps {
  element: Element;
}

const ParticleField = () => {
  const count = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      pointsRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        transparent
        color="#4fc3f7"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const Electron = ({ position, speed = 0.01 }: { position: [number, number, number], speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed;
      const radius = Math.sqrt(position[0]**2 + position[2]**2);
      meshRef.current.position.x = Math.sin(t) * radius;
      meshRef.current.position.z = Math.cos(t) * radius;
      meshRef.current.position.y = position[1];
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color="#4fc3f7" 
        emissive="#4fc3f7" 
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
};

const ElectronOrbit = ({ radius, rotationY = 0 }: { radius: number, rotationY?: number }) => {
  const curve = new THREE.EllipseCurve(
    0, 0,
    radius, radius,
    0, 2 * Math.PI,
    false,
    0
  );
  
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map(point => new THREE.Vector3(point.x, 0, point.y))
  );
  
  return (
    <group rotation={[Math.PI/2, rotationY, 0]}>
      <line geometry={geometry}>
        <lineBasicMaterial color="#1976d2" transparent opacity={0.5} />
      </line>
    </group>
  );
};

const Nucleus = ({ element }: { element: Element }) => {
  const nucleusRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  
  const getColorFromText = (textColor: string): string => {
    const colorMap: Record<string, string> = {
      'text-purple-300': '#d8b4fe',
      'text-red-300': '#fca5a5',
      'text-orange-300': '#fdba74',
      'text-yellow-300': '#fde047',
      'text-emerald-300': '#6ee7b7',
      'text-teal-300': '#5eead4',
      'text-green-300': '#86efac',
      'text-cyan-300': '#67e8f9',
      'text-blue-300': '#93c5fd',
      'text-violet-300': '#c4b5fd',
    };
    
    return colorMap[textColor] || '#ffffff';
  };
  
  const color = getColorFromText(categoryColorText[element.category]);
  
  return (
    <group ref={nucleusRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>
      <Text
        position={[0, 0.7, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {element.symbol}
      </Text>
    </group>
  );
};

const AtomModel = ({ element }: { element: Element }) => {
  const electronCount = element.atomicNumber;
  const shells = Math.min(Math.ceil(electronCount / 8), 4);
  
  const orbits = [];
  const electrons = [];
  
  for (let i = 0; i < shells; i++) {
    const radius = 1 + i * 0.8;
    const maxElectronsInShell = Math.min(8, electronCount - i * 8);
    const rotationY = i * Math.PI / shells;
    
    orbits.push(
      <ElectronOrbit key={`orbit-${i}`} radius={radius} rotationY={rotationY} />
    );
    
    for (let j = 0; j < maxElectronsInShell && j < 8; j++) {
      const angle = (j / 8) * Math.PI * 2;
      const posX = Math.cos(angle) * radius;
      const posZ = Math.sin(angle) * radius;
      const posY = 0;
      
      electrons.push(
        <Electron 
          key={`electron-${i}-${j}`} 
          position={[posX, posY, posZ]} 
          speed={0.5 + (i * 0.5)}
        />
      );
    }
  }
  
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Nucleus element={element} />
      {orbits}
      {electrons}
    </group>
  );
};

const ElementVisualizer: React.FC<ElementVisualizerProps> = ({ element }) => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
      <color attach="background" args={['#070c27']} />
      <ParticleField />
      <AtomModel element={element} />
      <OrbitControls enableZoom={true} />
      <Environment preset="sunset" />
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default ElementVisualizer;