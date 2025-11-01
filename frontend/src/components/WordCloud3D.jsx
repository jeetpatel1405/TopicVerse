import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, OrbitControls, Stars } from "@react-three/drei";

// Helper: evenly distribute text on sphere
function getSpherePosition(i, total, radius = 6) {
  const phi = Math.acos(-1 + (2 * i) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);
  return [x, y, z];
}

// Floating + glowing word component
function FloatingWord({ word, weight, color, position }) {
  const ref = useRef();
  useFrame(({ clock, camera }) => {
    ref.current.lookAt(camera.position);
    ref.current.position.y += Math.sin(clock.getElapsedTime() + position[0]) * 0.002;
    ref.current.rotation.y += 0.002;
  });

  return (
    <group ref={ref} position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5 + weight * 0.8}
        height={0.08}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelSegments={3}
      >
        {word}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.4}
        />
      </Text3D>
    </group>
  );
}

export default function WordCloud3D({ topics }) {
  if (!Array.isArray(topics) || topics.length === 0) return null;
  const total = Math.min(topics.length, 40);

  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 55 }}
      style={{ height: "600px", width: "100%" }}
    >
      {/* Background */}
      <color attach="background" args={["#0b132b"]} />
      <Stars radius={120} depth={80} count={3000} factor={4} fade />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 15, 10]} angle={0.4} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#88f" />

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
      />

      {/* Words */}
      <Suspense fallback={null}>
        {topics.slice(0, total).map((t, i) => (
          <FloatingWord
            key={i}
            word={t.word}
            weight={Math.min(t.weight * 2, 1)}
            color={`hsl(${(i * 35) % 360}, 80%, 65%)`}
            position={getSpherePosition(i, total, 6)}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}
