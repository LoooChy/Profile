"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";

const SCATTER_SEC = 0.62;
const GATHER_SEC = 0.82;
const GATHER_LERP_SPEED = 0.14;
const SCATTER_LERP_SPEED = 0.08;
const PLANE_JITTER = 0.24;
const AMBIENT_COLOR = [0.8, 0.84, 0.92];

function getResponsiveLayout(width, height) {
  if (width < 640) {
    return {
      targetHeight: 120,
      targetWidth: 400,
      offsetX: 0,
      offsetY: height < 760 ? 34 : 48,
      scatterRange: { x: 300, y: 220, z: 80 },
      titlePointSize: 1.7,
      backgroundPointSize: 2.2,
      backgroundCount: 2200
    };
  }

  if (width < 1024) {
    return {
      targetHeight: 180,
      targetWidth: 620,
      offsetX: -52,
      offsetY: 54,
      scatterRange: { x: 460, y: 320, z: 100 },
      titlePointSize: 2.15,
      backgroundPointSize: 2.45,
      backgroundCount: 2600
    };
  }

  if (width < 1440) {
    return {
      targetHeight: 230,
      targetWidth: 860,
      offsetX: -185,
      offsetY: 66,
      scatterRange: { x: 620, y: 430, z: 110 },
      titlePointSize: 2.5,
      backgroundPointSize: 2.75,
      backgroundCount: 3000
    };
  }

  return {
    targetHeight: 260,
    targetWidth: 980,
    offsetX: -235,
    offsetY: 72,
    scatterRange: { x: 760, y: 520, z: 120 },
    titlePointSize: 2.7,
    backgroundPointSize: 2.9,
    backgroundCount: 3300
  };
}

function normalizeShapeInPlace(points, layout, scale = 1) {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (let i = 0; i < points.length; i += 1) {
    minX = Math.min(minX, points[i][0]);
    minY = Math.min(minY, points[i][1]);
    minZ = Math.min(minZ, points[i][2]);
    maxX = Math.max(maxX, points[i][0]);
    maxY = Math.max(maxY, points[i][1]);
    maxZ = Math.max(maxZ, points[i][2]);
  }

  const width = Math.max(maxX - minX, 1);
  const height = Math.max(maxY - minY, 1);
  const cx = (minX + maxX) * 0.5;
  const cy = (minY + maxY) * 0.5;
  const cz = (minZ + maxZ) * 0.5;
  const targetHeight = layout.targetHeight * scale;
  const targetWidth = layout.targetWidth * scale;
  const fitScale = Math.min(targetHeight / height, targetWidth / width);

  return points.map(([x, y, z]) => [
    (x - cx) * fitScale + layout.offsetX,
    (y - cy) * fitScale + layout.offsetY,
    z - cz
  ]);
}

function createTextCloud(definition, layout) {
  const lines = Array.isArray(definition) ? definition : definition.lines;
  const scale = Array.isArray(definition) ? 1 : definition.scale ?? 1;
  const canvas = document.createElement("canvas");
  canvas.width = 2000;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    return { pos: new Float32Array([0, 0, 0]), col: new Float32Array([1, 1, 1]), count: 1 };
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let y = 210;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    ctx.fillStyle = line.color ?? "#ffffff";
    ctx.font = `700 ${line.size}px "Helvetica Neue", "Arial", sans-serif`;
    ctx.fillText(line.text, canvas.width * 0.5, y);
    y += i === 0 ? 156 : 124;
  }

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const step = 2;
  const rawPoints = [];
  const rawColors = [];

  for (let py = 0; py < canvas.height; py += step) {
    for (let px = 0; px < canvas.width; px += step) {
      const idx = (py * canvas.width + px) * 4;
      if (image[idx + 3] > 90) {
        rawPoints.push([
          ((px - canvas.width * 0.5) + (Math.random() - 0.5) * PLANE_JITTER) * 0.78,
          ((canvas.height * 0.5 - py) + (Math.random() - 0.5) * PLANE_JITTER) * 0.78,
          0
        ]);
        rawColors.push([image[idx] / 255, image[idx + 1] / 255, image[idx + 2] / 255]);
      }
    }
  }

  if (rawPoints.length === 0) {
    return { pos: new Float32Array([0, 0, 0]), col: new Float32Array([1, 1, 1]), count: 1 };
  }

  const normalizedPoints = normalizeShapeInPlace(rawPoints, layout, scale);
  const count = normalizedPoints.length;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const id = i * 3;
    pos[id] = normalizedPoints[i][0];
    pos[id + 1] = normalizedPoints[i][1];
    pos[id + 2] = normalizedPoints[i][2];
    col[id] = rawColors[i][0];
    col[id + 1] = rawColors[i][1];
    col[id + 2] = rawColors[i][2];
  }

  return { pos, col, count };
}

function createRandomPositions(count, layout) {
  const random = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const id = i * 3;
    random[id] = (Math.random() - 0.5) * layout.scatterRange.x * 2 + layout.offsetX;
    random[id + 1] = (Math.random() - 0.5) * layout.scatterRange.y * 2 + layout.offsetY;
    random[id + 2] = (Math.random() - 0.5) * layout.scatterRange.z * 2;
  }
  return random;
}

function createAmbientColors(count, alpha = 0.12) {
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const id = i * 3;
    colors[id] = AMBIENT_COLOR[0] * alpha;
    colors[id + 1] = AMBIENT_COLOR[1] * alpha;
    colors[id + 2] = AMBIENT_COLOR[2] * alpha;
  }
  return colors;
}

function useCircleSpriteTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const gradient = ctx.createRadialGradient(32, 32, 4, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.65, "rgba(255,255,255,0.96)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function Starfield({ layout }) {
  const pointsRef = useRef(null);
  const sprite = useCircleSpriteTexture();
  const data = useMemo(() => {
    const count = layout.backgroundCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const id = i * 3;
      positions[id] = (Math.random() - 0.5) * 3600;
      positions[id + 1] = (Math.random() - 0.5) * 2600;
      positions[id + 2] = (Math.random() - 0.5) * 2800;
      const tint = Math.random();
      colors[id] = 0.7 + tint * 0.3;
      colors[id + 1] = 0.76 + tint * 0.18;
      colors[id + 2] = 0.88 + tint * 0.12;
    }

    return { colors, positions };
  }, [layout.backgroundCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }
    pointsRef.current.rotation.y += delta * 0.01;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial map={sprite ?? undefined} alphaTest={0.08} size={layout.backgroundPointSize} sizeAttenuation transparent opacity={0.92} vertexColors depthWrite={false} />
    </points>
  );
}

function ParticleTitleMorph({ activeKey, headings, layout }) {
  const pointsRef = useRef(null);
  const sprite = useCircleSpriteTexture();
  const [ready, setReady] = useState(false);
  const [geometryVersion, setGeometryVersion] = useState(0);
  const targetsRef = useRef({});
  const currentPosRef = useRef(null);
  const currentColRef = useRef(null);
  const scatterPosRef = useRef(null);
  const scatterColRef = useRef(null);
  const targetPosRef = useRef(null);
  const targetColRef = useRef(null);
  const initialKeyRef = useRef(activeKey ?? null);
  const lastActiveKeyRef = useRef(activeKey ?? null);
  const currentKeyRef = useRef(activeKey ?? null);
  const pendingKeyRef = useRef(activeKey ?? null);
  const phaseRef = useRef(activeKey ? "gather" : "idle");
  const phaseTimerRef = useRef(0);
  const pendingSwapKeyRef = useRef(null);

  useEffect(() => {
    const keys = Object.keys(headings);
    const targets = {};

    for (let i = 0; i < keys.length; i += 1) {
      targets[keys[i]] = createTextCloud(headings[keys[i]], layout);
    }

    const initialKey = currentKeyRef.current ?? initialKeyRef.current ?? null;
    const initialCount = initialKey && targets[initialKey] ? targets[initialKey].count : Math.max(1, ...keys.map((key) => targets[key].count));
    const initialPos = initialKey && targets[initialKey] ? targets[initialKey].pos.slice() : createRandomPositions(initialCount, layout);
    const initialCol = initialKey && targets[initialKey] ? targets[initialKey].col.slice() : createAmbientColors(initialCount);

    targetsRef.current = targets;
    currentPosRef.current = initialPos;
    currentColRef.current = initialCol;
    scatterPosRef.current = createRandomPositions(initialCount, layout);
    scatterColRef.current = createAmbientColors(initialCount);
    targetPosRef.current = initialKey && targets[initialKey] ? targets[initialKey].pos : scatterPosRef.current;
    targetColRef.current = initialKey && targets[initialKey] ? targets[initialKey].col : scatterColRef.current;
    currentKeyRef.current = initialKey;
    pendingKeyRef.current = initialKey;
    lastActiveKeyRef.current = currentKeyRef.current ?? activeKey ?? null;
    pendingSwapKeyRef.current = null;
    phaseRef.current = initialKey ? "gather" : "idle";
    phaseTimerRef.current = 0;
    setGeometryVersion((value) => value + 1);
    setReady(true);
  }, [headings, layout]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const nextKey = activeKey ?? null;
    if (lastActiveKeyRef.current === nextKey) {
      return;
    }
    lastActiveKeyRef.current = nextKey;

    const targets = targetsRef.current;
    const currentCount = currentPosRef.current ? currentPosRef.current.length / 3 : 0;
    const nextCount = nextKey && targets[nextKey] ? targets[nextKey].count : currentCount;

    scatterPosRef.current = createRandomPositions(currentCount, layout);
    scatterColRef.current = createAmbientColors(currentCount);
    pendingKeyRef.current = nextKey;
    pendingSwapKeyRef.current = nextCount === currentCount ? null : nextKey ?? "__ambient__";
    phaseRef.current = "scatter";
    phaseTimerRef.current = 0;
  }, [activeKey, layout, ready]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    const currentPos = currentPosRef.current;
    const currentCol = currentColRef.current;
    const scatterPos = scatterPosRef.current;
    const scatterCol = scatterColRef.current;
    const targetPos = targetPosRef.current;
    const targetCol = targetColRef.current;

    if (!points || !currentPos || !currentCol || !scatterPos || !scatterCol || !targetPos || !targetCol) {
      return;
    }

    phaseTimerRef.current += delta;

    if (phaseRef.current === "scatter") {
      for (let i = 0; i < currentPos.length; i += 3) {
        currentPos[i] += (scatterPos[i] - currentPos[i]) * SCATTER_LERP_SPEED;
        currentPos[i + 1] += (scatterPos[i + 1] - currentPos[i + 1]) * SCATTER_LERP_SPEED;
        currentPos[i + 2] += (scatterPos[i + 2] - currentPos[i + 2]) * SCATTER_LERP_SPEED;
        currentCol[i] += (scatterCol[i] - currentCol[i]) * 0.08;
        currentCol[i + 1] += (scatterCol[i + 1] - currentCol[i + 1]) * 0.08;
        currentCol[i + 2] += (scatterCol[i + 2] - currentCol[i + 2]) * 0.08;
      }

      if (phaseTimerRef.current >= SCATTER_SEC) {
        const swapKey = pendingSwapKeyRef.current;
        if (swapKey) {
          const nextTarget = swapKey === "__ambient__" ? null : targetsRef.current[swapKey];
          const nextCount = nextTarget ? nextTarget.count : currentPos.length / 3;
          currentPosRef.current = createRandomPositions(nextCount, layout);
          currentColRef.current = createAmbientColors(nextCount);
          scatterPosRef.current = currentPosRef.current;
          scatterColRef.current = currentColRef.current;
          targetPosRef.current = nextTarget ? nextTarget.pos : currentPosRef.current;
          targetColRef.current = nextTarget ? nextTarget.col : currentColRef.current;
          currentKeyRef.current = nextTarget ? swapKey : null;
          pendingSwapKeyRef.current = null;
          phaseRef.current = nextTarget ? "gather" : "idle";
          phaseTimerRef.current = 0;
          setGeometryVersion((value) => value + 1);
          return;
        }

        if (pendingKeyRef.current && targetsRef.current[pendingKeyRef.current]) {
          currentKeyRef.current = pendingKeyRef.current;
          targetPosRef.current = targetsRef.current[pendingKeyRef.current].pos;
          targetColRef.current = targetsRef.current[pendingKeyRef.current].col;
          phaseRef.current = "gather";
        } else {
          currentKeyRef.current = null;
          targetPosRef.current = scatterPosRef.current;
          targetColRef.current = scatterColRef.current;
          phaseRef.current = "idle";
        }
        phaseTimerRef.current = 0;
      }
    } else if (phaseRef.current === "gather") {
      for (let i = 0; i < currentPos.length; i += 3) {
        currentPos[i] += (targetPos[i] - currentPos[i]) * GATHER_LERP_SPEED;
        currentPos[i + 1] += (targetPos[i + 1] - currentPos[i + 1]) * GATHER_LERP_SPEED;
        currentPos[i + 2] += (targetPos[i + 2] - currentPos[i + 2]) * GATHER_LERP_SPEED;
        currentCol[i] += (targetCol[i] - currentCol[i]) * 0.11;
        currentCol[i + 1] += (targetCol[i + 1] - currentCol[i + 1]) * 0.11;
        currentCol[i + 2] += (targetCol[i + 2] - currentCol[i + 2]) * 0.11;
      }

      if (phaseTimerRef.current >= GATHER_SEC) {
        phaseRef.current = "idle";
        phaseTimerRef.current = 0;
      }
    } else {
      for (let i = 0; i < currentPos.length; i += 3) {
        currentPos[i] += (targetPos[i] - currentPos[i]) * 0.03;
        currentPos[i + 1] += (targetPos[i + 1] - currentPos[i + 1]) * 0.03;
        currentPos[i + 2] += (targetPos[i + 2] - currentPos[i + 2]) * 0.03;
        currentCol[i] += (targetCol[i] - currentCol[i]) * 0.05;
        currentCol[i + 1] += (targetCol[i + 1] - currentCol[i + 1]) * 0.05;
        currentCol[i + 2] += (targetCol[i + 2] - currentCol[i + 2]) * 0.05;
      }
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.geometry.attributes.color.needsUpdate = true;
  });

  if (!ready || !currentPosRef.current || !currentColRef.current) {
    return null;
  }

  return (
    <points key={geometryVersion} ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPosRef.current, 3]} />
        <bufferAttribute attach="attributes-color" args={[currentColRef.current, 3]} />
      </bufferGeometry>
      <pointsMaterial map={sprite ?? undefined} alphaTest={0.08} size={layout.titlePointSize} sizeAttenuation transparent opacity={0.96} vertexColors depthWrite={false} />
    </points>
  );
}

function Scene({ activeKey, headings }) {
  const { size } = useThree();
  const layout = useMemo(() => getResponsiveLayout(size.width, size.height), [size.height, size.width]);

  return (
    <>
      <Starfield layout={layout} />
      <ParticleTitleMorph activeKey={activeKey} headings={headings} layout={layout} />
      <AdaptiveDpr />
    </>
  );
}

export default function ParticleHeadingCanvas({ activeKey, headings }) {
  return (
    <div className="three-background" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 720], fov: 45, near: 1, far: 5000 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#020711"]} />
        <Scene activeKey={activeKey} headings={headings} />
      </Canvas>
    </div>
  );
}


