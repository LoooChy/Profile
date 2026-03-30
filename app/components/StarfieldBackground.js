"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";

function StarfieldPoints() {
  const pointsRef = useRef(null);
  const data = useMemo(() => {
    const count = 3200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const id = i * 3;
      positions[id] = (Math.random() - 0.5) * 3200;
      positions[id + 1] = (Math.random() - 0.5) * 2200;
      positions[id + 2] = (Math.random() - 0.5) * 2400;

      const tint = Math.random();
      colors[id] = 0.72 + tint * 0.28;
      colors[id + 1] = 0.76 + tint * 0.2;
      colors[id + 2] = 0.88 + tint * 0.12;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.08;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={2.2} sizeAttenuation transparent opacity={0.92} vertexColors depthWrite={false} />
    </points>
  );
}

export default function StarfieldBackground() {
  return (
    <div className="three-background" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 900], fov: 50, near: 1, far: 5000 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
        <color attach="background" args={["#020711"]} />
        <StarfieldPoints />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
