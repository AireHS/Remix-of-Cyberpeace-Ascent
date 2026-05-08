import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const BLUE = '#00aaff';
const BLUE_DEEP = '#0066cc';

/* ---------- PADLOCK ---------- */
const Padlock = ({
  hovered,
  opened,
}: {
  hovered: boolean;
  opened: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shackleRef = useRef<THREE.Group>(null);
  const keyholeLightRef = useRef<THREE.PointLight>(null);
  const keyholeMatRef = useRef<THREE.MeshPhongMaterial>(null);
  const shackleY = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const speed = hovered ? 1.4 : 0.4;
    groupRef.current.rotation.y += delta * speed;

    // pulsing keyhole glow
    const t = state.clock.elapsedTime;
    const pulse = 0.6 + Math.sin(t * 2.2) * 0.4 + (hovered ? 0.4 : 0);
    if (keyholeLightRef.current) keyholeLightRef.current.intensity = 1.5 + pulse;
    if (keyholeMatRef.current)
      keyholeMatRef.current.emissiveIntensity = 0.8 + pulse;

    // open animation (shackle lift)
    const target = opened ? 1.2 : 0;
    shackleY.current += (target - shackleY.current) * 0.08;
    if (shackleRef.current) shackleRef.current.position.y = shackleY.current;
  });

  // Body geometry (rounded box approximation via BoxGeometry + bevel feel via scale)
  const bodyGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(2.4, 2.6, 1.2, 4, 4, 2);
    return g;
  }, []);
  const bodyEdges = useMemo(() => new THREE.EdgesGeometry(bodyGeo, 1), [bodyGeo]);

  // Shackle: half torus + two cylinders
  const torusGeo = useMemo(
    () => new THREE.TorusGeometry(0.85, 0.18, 16, 32, Math.PI),
    []
  );
  const torusEdges = useMemo(() => new THREE.EdgesGeometry(torusGeo, 1), [torusGeo]);
  const shaftGeo = useMemo(
    () => new THREE.CylinderGeometry(0.18, 0.18, 1.0, 16),
    []
  );
  const shaftEdges = useMemo(() => new THREE.EdgesGeometry(shaftGeo, 1), [shaftGeo]);

  return (
    <group ref={groupRef}>
      {/* BODY */}
      <mesh geometry={bodyGeo}>
        <meshPhongMaterial
          color={BLUE}
          emissive={BLUE_DEEP}
          emissiveIntensity={0.35}
          transparent
          opacity={0.35}
          shininess={120}
        />
      </mesh>
      <lineSegments geometry={bodyEdges}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.9} />
      </lineSegments>

      {/* KEYHOLE on front face */}
      <group position={[0, 0, 0.61]}>
        <mesh>
          <circleGeometry args={[0.28, 32]} />
          <meshPhongMaterial
            ref={keyholeMatRef}
            color="#001428"
            emissive={BLUE}
            emissiveIntensity={1}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh position={[0, -0.32, 0.001]}>
          <planeGeometry args={[0.16, 0.45]} />
          <meshPhongMaterial
            color="#001428"
            emissive={BLUE}
            emissiveIntensity={1}
          />
        </mesh>
        <pointLight
          ref={keyholeLightRef}
          color={BLUE}
          intensity={2}
          distance={5}
          position={[0, 0, 0.4]}
        />
      </group>

      {/* SHACKLE */}
      <group ref={shackleRef} position={[0, 1.3, 0]}>
        <group rotation={[0, 0, 0]}>
          <mesh geometry={torusGeo}>
            <meshPhongMaterial
              color={BLUE}
              emissive={BLUE_DEEP}
              emissiveIntensity={0.4}
              transparent
              opacity={0.4}
              shininess={120}
            />
          </mesh>
          <lineSegments geometry={torusEdges}>
            <lineBasicMaterial color={BLUE} transparent opacity={0.9} />
          </lineSegments>
        </group>
        <mesh geometry={shaftGeo} position={[-0.85, -0.5, 0]}>
          <meshPhongMaterial
            color={BLUE}
            emissive={BLUE_DEEP}
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
          />
        </mesh>
        <lineSegments geometry={shaftEdges} position={[-0.85, -0.5, 0]}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.9} />
        </lineSegments>
        <mesh geometry={shaftGeo} position={[0.85, -0.5, 0]}>
          <meshPhongMaterial
            color={BLUE}
            emissive={BLUE_DEEP}
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
          />
        </mesh>
        <lineSegments geometry={shaftEdges} position={[0.85, -0.5, 0]}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.9} />
        </lineSegments>
      </group>
    </group>
  );
};

/* ---------- HAND (low-poly cupped palm) ---------- */
const Hand = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -2.6 + Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });

  // Build a very low-poly cupped palm using a custom BufferGeometry
  const { palmGeo, palmEdges } = useMemo(() => {
    const vertices = new Float32Array([
      // palm cup (concave) — 9 vertices arranged in 3x3 grid bowed downward
      -1.2, 0.0, -0.8,
       0.0, -0.25, -0.8,
       1.2, 0.0, -0.8,
      -1.4, 0.1, 0.0,
       0.0, -0.45, 0.0,
       1.4, 0.1, 0.0,
      -1.2, 0.0, 0.8,
       0.0, -0.25, 0.8,
       1.2, 0.0, 0.8,
    ]);
    const indices = [
      0,1,3,  1,4,3,  1,2,4,  2,5,4,
      3,4,6,  4,7,6,  4,5,7,  5,8,7,
    ];
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return { palmGeo: geo, palmEdges: new THREE.EdgesGeometry(geo, 1) };
  }, []);

  // Simple finger stubs
  const finger = useMemo(() => new THREE.CylinderGeometry(0.12, 0.1, 0.7, 6), []);
  const fingerEdges = useMemo(() => new THREE.EdgesGeometry(finger, 1), [finger]);

  const fingerPositions: [number, number, number][] = [
    [-0.9, 0.25, -0.6],
    [-0.3, 0.35, -0.7],
    [0.3, 0.35, -0.7],
    [0.9, 0.25, -0.6],
  ];

  return (
    <group ref={ref} position={[0, -2.6, 0]}>
      <mesh geometry={palmGeo}>
        <meshPhongMaterial
          color={BLUE}
          emissive={BLUE_DEEP}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          shininess={80}
        />
      </mesh>
      <lineSegments geometry={palmEdges}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.85} />
      </lineSegments>

      {fingerPositions.map((pos, i) => (
        <group key={i} position={pos} rotation={[Math.PI * 0.15, 0, 0]}>
          <mesh geometry={finger}>
            <meshPhongMaterial
              color={BLUE}
              emissive={BLUE_DEEP}
              emissiveIntensity={0.3}
              transparent
              opacity={0.3}
            />
          </mesh>
          <lineSegments geometry={fingerEdges}>
            <lineBasicMaterial color={BLUE} transparent opacity={0.85} />
          </lineSegments>
        </group>
      ))}

      {/* Thumb */}
      <group position={[1.25, 0.15, 0.2]} rotation={[0, 0, -Math.PI * 0.35]}>
        <mesh geometry={finger}>
          <meshPhongMaterial
            color={BLUE}
            emissive={BLUE_DEEP}
            emissiveIntensity={0.3}
            transparent
            opacity={0.3}
          />
        </mesh>
        <lineSegments geometry={fingerEdges}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.85} />
        </lineSegments>
      </group>
    </group>
  );
};

/* ---------- PARTICLE NETWORK ---------- */
const PARTICLE_COUNT = 200;
const CONNECT_DIST = 1.2;

const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), 3)
    );
    return g;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      // soft bound
      for (let k = 0; k < 3; k++) {
        if (Math.abs(arr[i * 3 + k]) > 6) velocities[i * 3 + k] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    // build line connections
    const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute;
    const lineArr = linePosAttr.array as Float32Array;
    let ptr = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < CONNECT_DIST * CONNECT_DIST && ptr < lineArr.length - 6) {
          lineArr[ptr++] = arr[i * 3];
          lineArr[ptr++] = arr[i * 3 + 1];
          lineArr[ptr++] = arr[i * 3 + 2];
          lineArr[ptr++] = arr[j * 3];
          lineArr[ptr++] = arr[j * 3 + 1];
          lineArr[ptr++] = arr[j * 3 + 2];
        }
      }
    }
    // zero remaining
    for (let k = ptr; k < lineArr.length; k++) lineArr[k] = 0;
    linePosAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, ptr / 3);
  });

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial
          color={BLUE}
          size={0.06}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
};

/* ---------- STAR FIELD ---------- */
const Starfield = () => {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#a0c8ff" size={0.05} transparent opacity={0.7} />
    </points>
  );
};

/* ---------- SCENE ---------- */
const Scene = () => {
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);
  const { gl } = useThree();
  gl.setClearColor('#050a1a', 1);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setOpened((v) => !v)}
    >
      <ambientLight color="#0a1a3a" intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={0.9} color="#ffffff" />
      <Starfield />
      <ParticleNetwork />
      <Padlock hovered={hovered} opened={opened} />
      <Hand />
    </group>
  );
};

/* ---------- SECTION ---------- */
const pillars = [
  { code: '01', title: 'Threat Intelligence Engine', desc: 'Modelos propios de correlación de IOCs entrenados con telemetría regional LATAM.' },
  { code: '02', title: 'Detección Adaptativa', desc: 'Algoritmos que afinan reglas en función del comportamiento de cada cliente.' },
  { code: '03', title: 'Automatización SOAR', desc: 'Playbooks generativos que reducen el MTTR de incidentes críticos.' },
  { code: '04', title: 'Investigación Aplicada', desc: 'Publicaciones técnicas y colaboración con CSIRTs y academia.' },
];

const RDSection = () => {
  return (
    <section className="relative bg-foreground text-background py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(215 90% 60% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(215 90% 60% / 0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            R&amp;D · Neuma Labs
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light leading-[1.05] tracking-tight mb-8">
              Investigación que se
              <span className="block font-semibold gradient-text">
                convierte en defensa.
              </span>
            </h2>
            <p className="text-lg text-background/70 leading-relaxed max-w-xl mb-12 font-light">
              Nuestro equipo de R&amp;D desarrolla el motor Neuma y las capacidades
              propietarias que sostienen SOC360. Combinamos ingeniería de detección,
              ciencia de datos aplicada y telemetría real para anticipar adversarios.
            </p>

            <div className="grid sm:grid-cols-2 gap-px bg-background/10">
              {pillars.map((p) => (
                <div
                  key={p.code}
                  className="bg-foreground p-6 hover:bg-background/[0.03] transition-colors"
                >
                  <div className="text-xs font-mono text-primary mb-3">{p.code}</div>
                  <h3 className="text-base font-semibold mb-2 text-background">{p.title}</h3>
                  <p className="text-sm text-background/60 font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[560px] w-full">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-background/10" style={{ background: '#050a1a' }}>
              <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] uppercase text-background/50 font-mono pointer-events-none">
              Neuma Core · click to unlock
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RDSection;
