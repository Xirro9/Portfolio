import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { runes } from "./runes";

gsap.registerPlugin(ScrollTrigger);

/**
 * Procedural astronomical computing instrument, the heart of the Workshop
 * reactor. Loaded lazily by the Workshop hero; the SVG reactor remains
 * underneath as its fallback. The engraving is runic and the core carries
 * cyan arcane energy with violet fill light.
 */
interface Drive {
  intro: number;
  scroll: number;
  pointer: THREE.Vector2;
}
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp01(value), 3);
const BRASS = "#c4a77b";
const VIOLET = "#8a5cff";
const CYAN = "#4fe3f0";
const TILT = Math.PI / 2 - 0.42;

function engravingTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d")!;
  context.translate(size / 2, size / 2);
  context.strokeStyle = context.fillStyle = "#e3c58e";
  const ring = (radius: number, width: number) => {
    context.lineWidth = width;
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.stroke();
  };
  ring(506, 3);
  ring(486, 1.2);
  ring(422, 1.2);
  ring(372, 2);
  ring(340, 1);
  for (let degree = 0; degree < 360; degree++) {
    const angle = (degree * Math.PI) / 180;
    const inner = degree % 10 === 0 ? 462 : degree % 5 === 0 ? 474 : 480;
    context.lineWidth = degree % 10 === 0 ? 2 : 1;
    context.beginPath();
    context.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    context.lineTo(Math.cos(angle) * 486, Math.sin(angle) * 486);
    context.stroke();
  }
  // Rune glyphs replace numerals and lettering: two engraved bands.
  const glyphs = runes.map((rune) => new Path2D(rune));
  const band = (radius: number, count: number, scale: number, offset: number) => {
    for (let index = 0; index < count; index++) {
      context.save();
      context.rotate((index / count) * Math.PI * 2);
      context.translate(0, -radius);
      context.scale(scale, scale);
      context.lineWidth = 2.2 / scale;
      context.lineCap = "round";
      context.stroke(glyphs[(index * offset) % glyphs.length]);
      context.restore();
    }
  };
  band(442, 36, 1.5, 3);
  band(396, 54, 1.25, 5);
  for (let index = 0; index < 12; index++) {
    context.save();
    context.rotate((index * Math.PI) / 6 + Math.PI / 12);
    context.beginPath();
    context.moveTo(0, -352);
    context.lineTo(7, -362);
    context.lineTo(0, -366);
    context.lineTo(-7, -362);
    context.closePath();
    context.fill();
    context.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function gearGeometry(teeth: number, outer: number, root: number, hole: number) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let tooth = 0; tooth < teeth; tooth++) {
    const base = tooth * step;
    const corners: [number, number][] = [
      [root, base],
      [outer, base + step * 0.18],
      [outer, base + step * 0.48],
      [root, base + step * 0.66],
    ];
    corners.forEach(([radius, angle], index) => {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (tooth === 0 && index === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  const center = new THREE.Path();
  center.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(center);
  for (let window = 0; window < 5; window++) {
    const angle = (window / 5) * Math.PI * 2;
    const opening = new THREE.Path();
    opening.absarc(
      Math.cos(angle) * (hole + root) * 0.5,
      Math.sin(angle) * (hole + root) * 0.5,
      (root - hole) * 0.26,
      0,
      Math.PI * 2,
      true,
    );
    shape.holes.push(opening);
  }
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 1,
    curveSegments: 20,
  });
}

function orbitPoints(radius: number) {
  return new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 129 }, (_, index) => {
      const angle = (index / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    }),
  );
}

function Instrument({ drive }: { drive: Drive }) {
  const assets = useMemo(() => {
    const brass = new THREE.MeshStandardMaterial({
      color: BRASS,
      metalness: 1,
      roughness: 0.3,
    });
    const darkBrass = new THREE.MeshStandardMaterial({
      color: "#8d7049",
      metalness: 1,
      roughness: 0.42,
    });
    const steel = new THREE.MeshStandardMaterial({
      color: "#a8b0c2",
      metalness: 1,
      roughness: 0.22,
    });
    const core = new THREE.MeshStandardMaterial({
      color: "#120c2c",
      emissive: CYAN,
      emissiveIntensity: 0,
      roughness: 0.25,
      metalness: 0.2,
      flatShading: true,
    });
    const engraving = engravingTexture();
    const disc = new THREE.MeshStandardMaterial({
      map: engraving,
      emissiveMap: engraving,
      emissive: "#6a5aa8",
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.38,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const path = new THREE.LineBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0,
    });
    const shell = new THREE.LineBasicMaterial({
      color: "#bdfbff",
      transparent: true,
      opacity: 0.8,
    });
    const energy = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return {
      brass,
      darkBrass,
      steel,
      core,
      disc,
      path,
      shell,
      energy,
      engraving,
      gearLarge: gearGeometry(24, 0.62, 0.55, 0.12),
      gearSmall: gearGeometry(12, 0.33, 0.27, 0.07),
      orbits: [0.46, 0.72, 0.98].map(orbitPoints),
      shellEdges: new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.3, 1)),
    };
  }, []);
  useEffect(
    () => () => {
      Object.values(assets).forEach((value) => {
        if (Array.isArray(value)) value.forEach((item) => item.dispose());
        else value.dispose();
      });
    },
    [assets],
  );

  const instrument = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);
  const bezel = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const orrery = useRef<THREE.Group>(null);
  const arms = useRef<(THREE.Group | null)[]>([]);
  const gears = useRef<(THREE.Mesh | null)[]>([]);
  const shell = useRef<THREE.LineSegments>(null);
  const ticks = useRef<THREE.InstancedMesh>(null);
  const paths = useRef<THREE.LineLoop | null>(null);
  const core = useRef<THREE.Mesh>(null);
  const field = useRef<THREE.Group>(null);

  useEffect(() => {
    const mesh = ticks.current;
    if (!mesh) return;
    const matrix = new THREE.Object3D();
    for (let index = 0; index < 120; index++) {
      const angle = (index / 120) * Math.PI * 2;
      const long = index % 10 === 0;
      matrix.position.set(Math.cos(angle) * 2.06, Math.sin(angle) * 2.06, 0);
      matrix.rotation.set(0, 0, angle + Math.PI / 2);
      matrix.scale.set(1, long ? 2.2 : 1, 1);
      matrix.updateMatrix();
      mesh.setMatrixAt(index, matrix.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  const angles = useRef({ disc: 0, rings: [0, 0, 0, 0], arms: [0, 0, 0], gear: 0 });
  useFrame((state, frameDelta) => {
    const delta = Math.min(frameDelta, 0.05);
    const t = drive.intro;
    const settle = 1 + (1 - ease(t)) * 7;
    const p = drive.scroll;
    const a = angles.current;
    a.disc += delta * 0.03 * settle;
    a.gear += delta * 0.22 * settle;
    a.rings = a.rings.map((value, index) => value + delta * (0.05 + index * 0.025) * settle);
    a.arms = a.arms.map((value, index) => value + delta * (0.6 / (index + 1)) * settle);

    if (instrument.current) {
      const target = drive.pointer;
      instrument.current.rotation.y = THREE.MathUtils.lerp(
        instrument.current.rotation.y,
        target.x * 0.16 + p * 0.5,
        0.05,
      );
      instrument.current.rotation.x = THREE.MathUtils.lerp(
        instrument.current.rotation.x,
        -target.y * 0.1 - p * 0.75,
        0.05,
      );
      instrument.current.position.y = p * 0.6;
    }
    if (disc.current) {
      disc.current.rotation.z = -a.disc;
      disc.current.scale.setScalar(0.9 + ease(t) * 0.1 + p * 0.12);
      disc.current.position.z = -0.2 - p * 0.9;
    }
    if (disc.current)
      (disc.current.material as THREE.MeshStandardMaterial).opacity =
        ease(t * 1.6) * (1 - p * 0.5);
    if (paths.current)
      (paths.current.material as THREE.LineBasicMaterial).opacity =
        ease((t - 0.45) * 2) * 0.55;
    if (bezel.current) {
      bezel.current.scale.setScalar(0.82 + ease(t * 1.4) * 0.18);
      bezel.current.rotation.z = a.disc * 0.5;
    }
    rings.current.forEach((ring, index) => {
      if (!ring) return;
      const local = ease((t - 0.15 - index * 0.1) * 1.8);
      ring.scale.setScalar(Math.max(0.001, local));
      ring.position.z = p * (index - 1.5) * 0.7;
      if (index === 0) ring.rotation.set(TILT, 0, a.rings[0]);
      if (index === 1) ring.rotation.set(TILT, 0.41, a.rings[1]);
      if (index === 2) ring.rotation.set(0.2, Math.PI / 2 - 0.25 + a.rings[2] * 0.4, 0);
      if (index === 3) ring.rotation.set(a.rings[3], 0.6, 0);
    });
    if (orrery.current) {
      orrery.current.scale.setScalar(Math.max(0.001, ease((t - 0.35) * 2)));
      orrery.current.position.z = p * 0.5;
    }
    arms.current.forEach((arm, index) => {
      if (arm) arm.rotation.z = a.arms[index] + index * 2.1;
    });
    gears.current.forEach((gear, index) => {
      if (gear) gear.rotation.z = index ? -a.gear * 2 + 0.13 : a.gear;
    });
    if (core.current)
      (core.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        ease((t - 0.5) * 2) * (1.3 + Math.sin(state.clock.elapsedTime * 1.4) * 0.15);
    if (shell.current) {
      shell.current.rotation.set(a.disc * 3, a.disc * 2, 0);
    }
    if (field.current) {
      field.current.rotation.set(a.disc * 5, -a.disc * 4, a.disc * 2);
      // The rings share one material; updating it through the mesh pulses both.
      const ring = field.current.children[0] as THREE.Mesh;
      (ring.material as THREE.MeshBasicMaterial).opacity =
        ease((t - 0.55) * 2) * (0.55 + Math.sin(state.clock.elapsedTime * 2.1) * 0.15);
    }
    state.scene.environmentRotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={instrument}>
      <mesh ref={disc} material={assets.disc}>
        <ringGeometry args={[1.28, 1.98, 160]} />
      </mesh>
      <group ref={bezel}>
        <mesh material={assets.brass}>
          <torusGeometry args={[2.0, 0.035, 20, 220]} />
        </mesh>
        <mesh material={assets.darkBrass}>
          <torusGeometry args={[2.13, 0.016, 12, 220]} />
        </mesh>
        <instancedMesh ref={ticks} args={[undefined, undefined, 120]} material={assets.brass}>
          <boxGeometry args={[0.012, 0.07, 0.02]} />
        </instancedMesh>
      </group>
      {[1.12, 1.18, 1.24, 0.86].map((radius, index) => (
        <mesh
          key={radius}
          ref={(node) => {
            rings.current[index] = node;
          }}
          material={index === 3 ? assets.steel : assets.brass}
        >
          <torusGeometry args={[radius, index === 3 ? 0.014 : 0.024, 14, 180]} />
        </mesh>
      ))}
      <group ref={orrery} rotation={[TILT, 0, 0]}>
        {assets.orbits.map((geometry, index) => (
          <lineLoop
            key={index}
            ref={index === 0 ? paths : undefined}
            geometry={geometry}
            material={assets.path}
          />
        ))}
        {[0.46, 0.72, 0.98].map((radius, index) => (
          <group
            key={radius}
            ref={(node) => {
              arms.current[index] = node;
            }}
          >
            <mesh position={[radius / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={assets.darkBrass}>
              <cylinderGeometry args={[0.007, 0.007, radius, 6]} />
            </mesh>
            <mesh position={[radius, 0, 0]} material={index === 1 ? assets.core : assets.steel}>
              <sphereGeometry args={[0.055 + index * 0.012, 24, 16]} />
            </mesh>
          </group>
        ))}
        <mesh ref={core} material={assets.core}>
          <icosahedronGeometry args={[0.18, 0]} />
        </mesh>
        <lineSegments ref={shell} geometry={assets.shellEdges} material={assets.shell} />
        <group ref={field}>
          {[0, 1].map((index) => (
            <mesh key={index} rotation={[index * 1.2, index * 0.7, 0]} material={assets.energy}>
              <torusGeometry args={[0.34 + index * 0.05, 0.005, 8, 120]} />
            </mesh>
          ))}
        </group>
      </group>
      <group position={[1.42, -1.08, -0.7]}>
        <mesh
          ref={(node) => {
            gears.current[0] = node;
          }}
          geometry={assets.gearLarge}
          material={assets.darkBrass}
        />
        <mesh
          position={[-0.62, -0.63, 0.02]}
          ref={(node) => {
            gears.current[1] = node;
          }}
          geometry={assets.gearSmall}
          material={assets.brass}
        />
      </group>
      <pointLight position={[0, 0, 0.4]} color={CYAN} intensity={7} distance={3.5} />
      <pointLight position={[0, -0.6, 1.2]} color={VIOLET} intensity={4} distance={4} />
    </group>
  );
}

export default function CelestialEngine({
  active,
  onReady,
}: {
  active: boolean;
  onReady: () => void;
}) {
  const [dpr, setDpr] = useState(1.75);
  const drive = useMemo<Drive>(
    () => ({ intro: 0, scroll: 0, pointer: new THREE.Vector2() }),
    [],
  );
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const intro = gsap.to(drive, { intro: 1, duration: 3.2, ease: "power2.out", delay: 0.2 });
    const hero = host.current?.closest("[data-hero]");
    const trigger = hero
      ? ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            drive.scroll = self.progress;
          },
        })
      : null;
    const pointer = (event: PointerEvent) => {
      drive.pointer.set(
        (event.clientX / innerWidth) * 2 - 1,
        (event.clientY / innerHeight) * 2 - 1,
      );
    };
    addEventListener("pointermove", pointer, { passive: true });
    return () => {
      intro.kill();
      trigger?.kill();
      removeEventListener("pointermove", pointer);
    };
  }, [drive]);
  return (
    <div ref={host} className="celestial-canvas">
      <Canvas
        dpr={[1, dpr]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 7.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady()}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffe2b8" />
        <directionalLight position={[-4, -2, 2]} intensity={1.1} color={VIOLET} />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2.4} color="#fff2d8" position={[0, 4, -2]} scale={[8, 1.4, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#9d7bff" position={[-5, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[6, 2, 1]} />
          <Lightformer form="ring" intensity={1.6} color="#7fe9f2" position={[4, -1, 3]} scale={2} />
        </Environment>
        <Instrument drive={drive} />
      </Canvas>
    </div>
  );
}
