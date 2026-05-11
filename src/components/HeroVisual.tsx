import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = wrapRef.current;
    if (!canvas || !container) return;

    // 1. ESCENA, CÁMARA Y RENDERER
    const scene = new THREE.Scene();
    // Posición inicial hacia la derecha para que no tape el texto
    scene.position.x = 2.5; 

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. LUCES (Cruciales para el efecto cristal)
    // Subimos la intensidad ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Luz principal blanca para los destellos
    const mainLight = new THREE.DirectionalLight(0xffffff, 4);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // Luz trasera cian para dar el resplandor tecnológico profundo
    const backLight = new THREE.PointLight(0x06b6d4, 10, 20);
    backLight.position.set(-3, -2, -4);
    scene.add(backLight);

    // NUEVA LUZ: Tono violeta/azul desde el frente para replicar el video
    const frontFillLight = new THREE.PointLight(0x6366f1, 8, 20);
    frontFillLight.position.set(3, 2, 4);
    scene.add(frontFillLight);

    // 3. MATERIAL DE CRISTAL (Glassmorphism 3D Mejorado)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,          // Base blanca (las luces le darán el color azul)
      metalness: 0.2,           // Un toque metálico para que capte la luz
      roughness: 0.05,          // Súper liso
      transmission: 1.0,        // Transmisión de luz al máximo
      ior: 1.52,                // Índice de refracción exacto del vidrio
      thickness: 2.0,           // Simula un cristal más grueso
      transparent: true,
      opacity: 0.35,            // Dejamos ver tu fondo de Tailwind a través del candado
      clearcoat: 1.0,           // Capa de brillo ultra reflectante (efecto cristal)
      clearcoatRoughness: 0.1,  // Bordes definidos
      attenuationColor: new THREE.Color(0x3b82f6), // Tinte azul interno
      attenuationDistance: 1.5, // Distancia del tinte
      side: THREE.DoubleSide
    });

    // 4. CREACIÓN DEL CANDADO
    const lockGroup = new THREE.Group();

    // Cuerpo del candado
    const bodyGeo = new THREE.BoxGeometry(1.4, 1.2, 0.5);
    const bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
    lockGroup.add(bodyMesh);

    // Arco superior (Shackle)
    const arcGeo = new THREE.TorusGeometry(0.45, 0.12, 16, 32, Math.PI);
    const arcMesh = new THREE.Mesh(arcGeo, glassMaterial);
    arcMesh.position.y = 0.6; // Lo subimos al borde de la caja
    lockGroup.add(arcMesh);

    // Patas del arco
    const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3);
    const leftLeg = new THREE.Mesh(legGeo, glassMaterial);
    leftLeg.position.set(-0.45, 0.45, 0);
    lockGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, glassMaterial);
    rightLeg.position.set(0.45, 0.45, 0);
    lockGroup.add(rightLeg);

    scene.add(lockGroup);

    // 5. CREACIÓN DE LA LLAVE
    const keyGroup = new THREE.Group();
    
    // Cabeza de la llave (Aro)
    const bowGeo = new THREE.TorusGeometry(0.25, 0.08, 16, 32);
    const bowMesh = new THREE.Mesh(bowGeo, glassMaterial);
    bowMesh.position.x = -1.0;
    keyGroup.add(bowMesh);

    // Tallo
    const shaftGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4);
    const shaftMesh = new THREE.Mesh(shaftGeo, glassMaterial);
    shaftMesh.rotation.z = Math.PI / 2;
    shaftMesh.position.x = -0.15;
    keyGroup.add(shaftMesh);

    // Dientes de la llave
    const toothGeo = new THREE.BoxGeometry(0.12, 0.25, 0.06);
    const tooth1 = new THREE.Mesh(toothGeo, glassMaterial);
    tooth1.position.set(0.2, -0.15, 0);
    keyGroup.add(tooth1);

    const tooth2 = new THREE.Mesh(toothGeo, glassMaterial);
    tooth2.position.set(0.4, -0.15, 0);
    keyGroup.add(tooth2);

    // Posicionamos la llave insertándose en el candado
    keyGroup.position.set(-0.3, -0.2, 0.6);
    keyGroup.rotation.y = Math.PI / 6;
    scene.add(keyGroup);

    // 6. LÓGICA DE PARALLAX Y SCROLL
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = {
      progress: 0,
      sceneX: 2.5,
      sceneY: 0,
      scale: 1,
      rotX: 0,
      rotY: -0.3, // Rotación inicial para ver volumen
      cameraZ: 5,
    };

    const updateScroll = () => {
      const partners = document.querySelector(".partners-section");
      const partnersTop = partners?.getBoundingClientRect().top ?? document.body.scrollHeight;
      const scrollLimit = Math.max(1, window.scrollY + partnersTop - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollLimit));

      scroll.progress = progress;
      
      // Al hacer scroll, el candado se centra, se aleja y gira
      scroll.sceneX = 2.5 - progress * 2.5; 
      scroll.sceneY = -progress * 1.5;
      scroll.scale = 1 - progress * 0.3;
      scroll.rotX = progress * Math.PI; 
      scroll.rotY = -0.3 + progress * Math.PI;

      container.style.opacity = partnersTop < window.innerHeight * 0.9 ? "0" : "1";
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX - window.innerWidth / 2;
      mouse.y = event.clientY - window.innerHeight / 2;
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      updateScroll();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", resize);

    resize();

    // 7. LOOP DE ANIMACIÓN
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Suavizado del scroll (Lerp)
      scene.position.x += (scroll.sceneX - scene.position.x) * 0.05;
      scene.position.y += (scroll.sceneY - scene.position.y) * 0.05;
      
      const currentScale = lockGroup.scale.x + (scroll.scale - lockGroup.scale.x) * 0.05;
      lockGroup.scale.set(currentScale, currentScale, currentScale);
      keyGroup.scale.set(currentScale, currentScale, currentScale);

      // Rotación base por scroll
      lockGroup.rotation.x += (scroll.rotX - lockGroup.rotation.x) * 0.05;
      lockGroup.rotation.y += (scroll.rotY - lockGroup.rotation.y) * 0.05;
      
      // Movimiento flotante orgánico continuo
      lockGroup.position.y = Math.sin(time * 1.5) * 0.15;
      keyGroup.position.y = Math.sin(time * 1.5 + 0.5) * 0.15; // Desfasado

      // Movimiento suave de la llave (como si intentara abrirse)
      keyGroup.rotation.z = Math.sin(time * 2) * 0.1;

      // Parallax con el mouse (aplica a toda la escena)
      mouse.targetX = mouse.x * 0.0005;
      mouse.targetY = mouse.y * 0.0005;
      scene.rotation.y += 0.05 * (mouse.targetX - scene.rotation.y);
      scene.rotation.x += 0.05 * (mouse.targetY - scene.rotation.x);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", resize);

      bodyGeo.dispose();
      arcGeo.dispose();
      legGeo.dispose();
      bowGeo.dispose();
      shaftGeo.dispose();
      toothGeo.dispose();
      glassMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="network-wrap" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="three-canvas" />
    </div>
  );
}