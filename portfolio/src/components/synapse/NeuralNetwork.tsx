"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";

const NODE_COUNT = 38;
const PURPLE = new THREE.Color("#7C3AED");
const BLUE = new THREE.Color("#3B82F6");
const CYAN = new THREE.Color("#22D3EE");

function lerp3(a: THREE.Color, b: THREE.Color, t: number) {
  return new THREE.Color().lerpColors(a, b, t);
}

function getNodeColor(i: number): THREE.Color {
  const t = i / NODE_COUNT;
  if (t < 0.5) return lerp3(PURPLE, BLUE, t * 2);
  return lerp3(BLUE, CYAN, (t - 0.5) * 2);
}

interface Pulse {
  edgeIdx: number;
  t: number;
  speed: number;
}

function NeuralScene({ reduced }: { reduced: boolean }) {
  const { size, camera } = useThree();
  const mousePos = useMousePosition();

  // Node positions
  const positions = useMemo(() => {
    const rng = (s: number) => { let x = Math.sin(s) * 10000; return x - Math.floor(x); };
    return Array.from({ length: NODE_COUNT }, (_, i) => new THREE.Vector3(
      (rng(i * 3.1) - 0.5) * 3.2,
      (rng(i * 7.3) - 0.5) * 3.2,
      (rng(i * 13.7) - 0.5) * 1.2,
    ));
  }, []);

  // Edges: connect nearby nodes
  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (positions[i].distanceTo(positions[j]) < 1.4) result.push([i, j]);
      }
    }
    return result;
  }, [positions]);

  // Instanced mesh for nodes
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pulses state
  const pulses = useRef<Pulse[]>([]);
  useEffect(() => {
    pulses.current = edges.slice(0, 20).map((_, i) => ({
      edgeIdx: i % edges.length,
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));
  }, [edges]);

  // Line geometry for edges
  const lineGeo = useMemo(() => {
    const pts: number[] = [];
    edges.forEach(([a, b]) => {
      pts.push(positions[a].x, positions[a].y, positions[a].z);
      pts.push(positions[b].x, positions[b].y, positions[b].z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [edges, positions]);

  // Pulse dot
  const pulseDotRef = useRef<THREE.InstancedMesh>(null);
  const pulseDummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Mouse in world space
    const mx = (mousePos.current.x / size.width) * 2 - 1;
    const my = -(mousePos.current.y / size.height) * 2 + 1;
    const mouseWorld = new THREE.Vector3(mx * 2.5, my * 2.5, 0);

    // Update node instances
    positions.forEach((pos, i) => {
      const dist = pos.distanceTo(mouseWorld);
      const bend = Math.max(0, 1 - dist / 1.8);
      const dir = new THREE.Vector3().subVectors(mouseWorld, pos).normalize();
      const displaced = pos.clone().addScaledVector(dir, bend * 0.18);

      if (!reduced) {
        displaced.x += Math.sin(t * 0.4 + i * 0.7) * 0.02;
        displaced.y += Math.cos(t * 0.3 + i * 1.1) * 0.02;
      }

      dummy.position.copy(displaced);
      const scale = 0.04 + (i % 5) * 0.012;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      const color = getNodeColor(i);
      if (!reduced) {
        const pulse = 0.7 + Math.sin(t * 1.5 + i * 0.9) * 0.3;
        color.multiplyScalar(pulse);
      }
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    // Advance pulses
    if (!reduced && pulseDotRef.current) {
      pulses.current.forEach((pulse, pi) => {
        pulse.t += pulse.speed;
        if (pulse.t > 1) { pulse.t = 0; pulse.edgeIdx = Math.floor(Math.random() * edges.length); }
        const [a, b] = edges[pulse.edgeIdx];
        const p = positions[a].clone().lerp(positions[b], pulse.t);
        pulseDummy.position.copy(p);
        pulseDummy.scale.setScalar(0.035);
        pulseDummy.updateMatrix();
        pulseDotRef.current!.setMatrixAt(pi, pulseDummy.matrix);
        pulseDotRef.current!.setColorAt(pi, CYAN);
      });
      pulseDotRef.current.instanceMatrix.needsUpdate = true;
      if (pulseDotRef.current.instanceColor) pulseDotRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.18} />
      </lineSegments>

      {/* Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>

      {/* Pulse dots */}
      {!reduced && (
        <instancedMesh ref={pulseDotRef} args={[undefined, undefined, pulses.current.length || 20]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#22D3EE" toneMapped={false} />
        </instancedMesh>
      )}
    </group>
  );
}

export default function NeuralNetwork() {
  const reduced = useReducedMotion();

  return (
    <div
      style={{ width: 380, height: 380 }}
      className="relative"
      aria-hidden="true"
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <NeuralScene reduced={reduced} />
      </Canvas>
    </div>
  );
}
