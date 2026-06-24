import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import * as THREE from "three";

import earthDayImg from "../assets/earth-blue-marble.jpg";
import earthTopologyImg from "../assets/earth-topology.png";
import earthWaterImg from "../assets/earth-water.png";
import earthCloudsImg from "../assets/earth-clouds.png";

/**
 * Realistic photoreal globe that persists across every page.
 *
 * - Three.js sphere with NASA Blue Marble diffuse + topology bump + water
 *   roughness + clouds layer + atmospheric fresnel glow.
 * - Mounted once at the SiteLayout level (fixed) so the same globe rides
 *   along when the user navigates between routes.
 * - Scroll progress and pathname drive its size, position, blur and tilt.
 */

const EARTH_DAY = earthDayImg;
const EARTH_TOPOLOGY = earthTopologyImg;
const EARTH_WATER = earthWaterImg;
const EARTH_CLOUDS = earthCloudsImg;

export function GlobeStage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const clouds1Ref = useRef<THREE.Mesh | null>(null);
  const clouds2Ref = useRef<THREE.Mesh | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const [showClouds, setShowClouds] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("show-clouds");
      return saved !== "false";
    }
    return true;
  });

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setShowClouds(customEvent.detail);
    };
    window.addEventListener("toggle-clouds", handleToggle);
    return () => window.removeEventListener("toggle-clouds", handleToggle);
  }, []);

  useEffect(() => {
    if (clouds1Ref.current) clouds1Ref.current.visible = showClouds;
    if (clouds2Ref.current) clouds2Ref.current.visible = showClouds;
  }, [showClouds]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  // Scroll-driven motion
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.6,
  });

  // Keep size and position fixed
  const sizeVw = 56;
  const xVw = 86;
  const yVh = 50;

  // Fade out smoothly on scroll from the main hero page (opacity 1 -> 0 by scroll = 0.25)
  // Hide completely on other pages (opacity 0)
  const opacity = useTransform(
    smoothY,
    [0, 0.25],
    isHome ? [1, 0] : [0, 0]
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    // Cap pixel ratio harder on mobile for perf; desktop gets 2.
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // ------ Lights ------
    // Soft hemisphere bounce — sky tinted brand-blue, ground warm.
    const hemi = new THREE.HemisphereLight(0x5e8fb8, 0x2a1d12, 0.55);
    scene.add(hemi);

    // Key "sun" light — warm, strong, casts the day/night terminator.
    const sun = new THREE.DirectionalLight(0xfff1d4, 3.0);
    sun.position.set(5, 1.5, 3.5);
    scene.add(sun);

    // Cool brand rim from behind for cinematic separation
    const rim = new THREE.DirectionalLight(0x6fb6ff, 0.9);
    rim.position.set(-4, -1, -3);
    scene.add(rim);

    // ------ Earth ------
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const earthGeo = new THREE.SphereGeometry(1, 128, 128);
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: new THREE.Color(0x4a7da8),
      shininess: 26,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.rotation.y = -Math.PI / 2; // Africa/Europe facing camera
    scene.add(earth);
    earthRef.current = earth;

    loader.load(EARTH_DAY, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
      earthMat.map = t;
      earthMat.needsUpdate = true;
    });
    loader.load(EARTH_TOPOLOGY, (t) => {
      t.anisotropy = maxAniso;
      earthMat.bumpMap = t;
      earthMat.bumpScale = 0.06;
      earthMat.needsUpdate = true;
    });
    loader.load(EARTH_WATER, (t) => {
      t.anisotropy = maxAniso;
      earthMat.specularMap = t;
      earthMat.needsUpdate = true;
    });

    // ------ Clouds Layer 1 (Lower) ------
    const cloudsGeo1 = new THREE.SphereGeometry(1.012, 96, 96);
    const cloudsUniforms1 = {
      cloudMap: { value: null as THREE.Texture | null },
      sunDir: { value: new THREE.Vector3(5, 1.5, 3.5).normalize() },
      opacity: { value: 0.80 },
    };
    const cloudsMat1 = new THREE.ShaderMaterial({
      uniforms: cloudsUniforms1,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        void main() {
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        uniform sampler2D cloudMap;
        uniform vec3 sunDir;
        uniform float opacity;
        void main() {
          vec4 c = texture2D(cloudMap, vUv);
          float a = c.a;
          if (a < 0.02) discard;
          float ndl = clamp(dot(normalize(vWorldNormal), normalize(sunDir)), 0.0, 1.0);
          float light = mix(0.08, 1.0, smoothstep(0.0, 0.45, ndl));
          vec3 sunTint = mix(vec3(0.78, 0.86, 1.0), vec3(1.0, 0.96, 0.88), ndl);
          gl_FragColor = vec4(sunTint * light, a * opacity);
        }
      `,
    });
    const clouds1 = new THREE.Mesh(cloudsGeo1, cloudsMat1);
    clouds1.visible = showClouds;
    scene.add(clouds1);
    clouds1Ref.current = clouds1;

    // ------ Clouds Layer 2 (Upper Volumetric) ------
    const cloudsGeo2 = new THREE.SphereGeometry(1.018, 96, 96);
    const cloudsUniforms2 = {
      cloudMap: { value: null as THREE.Texture | null },
      sunDir: { value: new THREE.Vector3(5, 1.5, 3.5).normalize() },
      opacity: { value: 0.50 },
    };
    const cloudsMat2 = new THREE.ShaderMaterial({
      uniforms: cloudsUniforms2,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        void main() {
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        uniform sampler2D cloudMap;
        uniform vec3 sunDir;
        uniform float opacity;
        void main() {
          vec4 c = texture2D(cloudMap, vUv);
          float a = c.a;
          if (a < 0.02) discard;
          float ndl = clamp(dot(normalize(vWorldNormal), normalize(sunDir)), 0.0, 1.0);
          float light = mix(0.08, 1.0, smoothstep(0.0, 0.45, ndl));
          vec3 sunTint = mix(vec3(0.78, 0.86, 1.0), vec3(1.0, 0.96, 0.88), ndl);
          gl_FragColor = vec4(sunTint * light, a * opacity);
        }
      `,
    });
    const clouds2 = new THREE.Mesh(cloudsGeo2, cloudsMat2);
    clouds2.rotation.y = Math.PI / 4;
    clouds2.visible = showClouds;
    scene.add(clouds2);
    clouds2Ref.current = clouds2;

    loader.load(EARTH_CLOUDS, (t) => {
      t.anisotropy = maxAniso;
      cloudsUniforms1.cloudMap.value = t;
      cloudsUniforms2.cloudMap.value = t;
      cloudsMat1.needsUpdate = true;
      cloudsMat2.needsUpdate = true;
    });

    // ------ Atmosphere (fresnel glow) ------
    // Disabled atmo glow to make the globe cleaner

    // ------ Resize ------
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ------ Animation ------
    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      if (visible) {
        if (!reduce) {
          earth.rotation.y += dt * 0.06;
          clouds1.rotation.y += dt * 0.075;
          clouds2.rotation.y += dt * 0.055;
        }
        earth.rotation.x += (tiltRef.current.y * 0.4 - earth.rotation.x) * 0.05;
        clouds1.rotation.x = earth.rotation.x;
        clouds2.rotation.x = earth.rotation.x;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      cloudsGeo1.dispose();
      cloudsMat1.dispose();
      cloudsGeo2.dispose();
      cloudsMat2.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduce]);

  // Pointer parallax
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      const y = (e.clientY / window.innerHeight - 0.5) * -0.6;
      tiltRef.current = { x, y };
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20"
      style={{ opacity }}
    >
      <motion.div
        className="absolute"
        style={{
          left: `${xVw}vw`,
          top: `${yVh}vh`,
          width: `${sizeVw}vw`,
          height: `${sizeVw}vw`,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >

        <div
          ref={mountRef}
          className="relative w-full h-full"
          style={{ contain: "layout paint size" }}
        />
      </motion.div>
    </motion.div>
  );
}
