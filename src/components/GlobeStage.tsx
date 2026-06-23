import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import createGlobe from "cobe";

/**
 * Cinematic globe that persists across every page.
 *
 * - Globe canvas is rendered once at the top of the layout (fixed).
 * - Scroll progress + route both drive its size, position and tilt.
 * - On the home hero it dominates the right side; on inner pages it
 *   shrinks to a quiet companion in the corner.
 */
export function GlobeStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(0);
  const targetSpeedRef = useRef(0.003);
  const reduce = useReducedMotion();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  // Scroll-driven motion
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.6 });

  // Home only: globe sits anchored on the right of the hero and fades out as
  // the user scrolls past it. On other routes it does not render at all.
  const sizeVw = useTransform(smoothY, [0, 0.4], [85, 85]);
  const xVw = useTransform(smoothY, [0, 0.4], [78, 78]);
  const yVh = useTransform(smoothY, [0, 0.4], [55, 55]);
  const opacity = useTransform(smoothY, [0, 0.35, 0.55], [1, 0.8, 0]);
  const filter = useTransform(smoothY, [0, 0.5], ["blur(0px)", "blur(4px)"]);

  // Pointer-driven tilt — held in a ref so the rAF loop doesn't re-create.
  const tiltRef = useRef({ x: 0, y: 0.25 });

  useEffect(() => {
    let phi = phiRef.current;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current || width === 0) {
      // Defer until layout settles
      requestAnimationFrame(onResize);
    }

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 18000,
      mapBrightness: 7,
      baseColor: [0.16, 0.32, 0.46],
      markerColor: [1, 0.78, 0.3],
      glowColor: [0.42, 0.6, 0.78],
      markers: [
        { location: [19.076, 72.8777], size: 0.08 },
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.07 },
        { location: [35.6762, 139.6503], size: 0.07 },
        { location: [-33.8688, 151.2093], size: 0.06 },
        { location: [25.276, 55.2962], size: 0.06 },
        { location: [1.3521, 103.8198], size: 0.05 },
        { location: [-23.5505, -46.6333], size: 0.06 },
        { location: [48.8566, 2.3522], size: 0.06 },
      ],
    });

    let raf = 0;
    const tick = () => {
      if (!reduce) phi += targetSpeedRef.current;
      globe.update({
        phi: phi + tiltRef.current.x,
        theta: 0.28 + tiltRef.current.y * 0.15,
        width: width * 2,
        height: width * 2,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => onResize());
    if (canvasRef.current) ro.observe(canvasRef.current);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
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
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
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
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      >
        {/* radial glow halo */}
        <div
          className="absolute inset-[-25%] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.84 0.16 85 / 0.18), oklch(0.84 0.16 85 / 0.06) 35%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="relative w-full h-full"
          style={{ contain: "layout paint size" }}
        />
      </motion.div>
    </motion.div>
  );
}
