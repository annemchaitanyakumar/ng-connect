import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import * as THREE from "three";

/**
 * Realistic photoreal globe that persists across every page.
 *
 * - Three.js sphere with NASA Blue Marble diffuse + topology bump + water
 *   roughness + clouds layer + atmospheric fresnel glow.
 * - Mounted once at the SiteLayout level (fixed) so the same globe rides
 *   along when the user navigates between routes.
 * - Scroll progress and pathname drive its size, position, blur and tilt.
 */

const EARTH_DAY =
  "https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg";
const EARTH_TOPOLOGY =
  "https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png";
const EARTH_WATER =
  "https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png";
const EARTH_CLOUDS =
  "https://unpkg.com/three-globe@2.31.1/example/img/clouds.png";

export function GlobeStage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  // Scroll-driven motion
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.6,
  });

  // Trajectory across the page. Home hero parks the globe on the right at
  // full scale; as the user scrolls it drifts left and shrinks to a
  // companion mark. Inner pages park the globe smaller in the corner and
  // drift it gently on scroll.
  const sizeVw = useTransform(
    smoothY,
    [0, 0.2, 0.6, 1],
    isHome ? [85, 70, 38, 30] : [42, 38, 32, 28],
  );
  const xVw = useTransform(
    smoothY,
    [0, 0.2, 0.6, 1],
    isHome ? [78, 70, 22, 78] : [82, 75, 22, 82],
  );
  const yVh = useTransform(
    smoothY,
    [0, 0.2, 0.6, 1],
    isHome ? [55, 50, 55, 65] : [22, 35, 60, 70],
  );
  const opacity = useTransform(smoothY, [0, 0.95], [1, 0.7]);
  const blur = useTransform(smoothY, [0, 1], [0, 1.5]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

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

    // ------ Clouds — fluffier, with a custom shader so they shade with the sun
    //  and fade out on the night side instead of looking like a flat decal.
    const cloudsGeo = new THREE.SphereGeometry(1.015, 96, 96);
    const cloudsUniforms = {
      cloudMap: { value: null as THREE.Texture | null },
      sunDir: { value: new THREE.Vector3(5, 1.5, 3.5).normalize() },
      opacity: { value: 0.85 },
    };
    const cloudsMat = new THREE.ShaderMaterial({
      uniforms: cloudsUniforms,
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
          float a = c.r; // alpha encoded in luminance
          if (a < 0.02) discard;
          float ndl = clamp(dot(normalize(vWorldNormal), normalize(sunDir)), 0.0, 1.0);
          // soft day/night falloff so cloud tops glow warm in sun, fade dark at night
          float light = mix(0.08, 1.0, smoothstep(0.0, 0.45, ndl));
          vec3 sunTint = mix(vec3(0.78, 0.86, 1.0), vec3(1.0, 0.96, 0.88), ndl);
          gl_FragColor = vec4(sunTint * light, a * opacity);
        }
      `,
    });
    const clouds = new THREE.Mesh(cloudsGeo, cloudsMat);
    scene.add(clouds);
    cloudsRef.current = clouds;

    loader.load(EARTH_CLOUDS, (t) => {
      t.anisotropy = maxAniso;
      cloudsUniforms.cloudMap.value = t;
      cloudsMat.needsUpdate = true;
    });

    // ------ Atmosphere (fresnel glow) ------
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x6fb6ff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vViewDir), 3.2);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.18, 64, 64), atmoMat);
    scene.add(atmo);

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
          clouds.rotation.y += dt * 0.075;
        }
        earth.rotation.x += (tiltRef.current.y * 0.4 - earth.rotation.x) * 0.05;
        clouds.rotation.x = earth.rotation.x;
        atmo.rotation.copy(earth.rotation);
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
      cloudsGeo.dispose();
      cloudsMat.dispose();
      atmoMat.dispose();
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
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity, filter }}
    >
      <motion.div
        className="absolute"
        style={{
          left: useTransform(xVw, (v) => `${v}vw`),
          top: useTransform(yVh, (v) => `${v}vh`),
          width: useTransform(sizeVw, (v) => `${v}vw`),
          height: useTransform(sizeVw, (v) => `${v}vw`),
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* warm halo behind the globe */}
        <div
          className="absolute inset-[-22%] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.84 0.16 85 / 0.18), oklch(0.84 0.16 85 / 0.05) 38%, transparent 68%)",
            filter: "blur(24px)",
          }}
        />
        <div
          ref={mountRef}
          className="relative w-full h-full"
          style={{ contain: "layout paint size" }}
        />
      </motion.div>
    </motion.div>
  );
}
