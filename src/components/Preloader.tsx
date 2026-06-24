import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [logoDrawn, setLogoDrawn] = useState(false);
  const [dividerDrawn, setDividerDrawn] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  const brandText = "NETWORQ";
  const subText = "GLOBAL";
  const totalLetters = brandText.length + subText.length;

  // Haptic feedback function
  const triggerHaptic = () => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  // Phase 1: Wait for logo SVG paths drawing animation to finish
  useEffect(() => {
    const t = setTimeout(() => {
      setLogoDrawn(true);
    }, 1400); // SVG draw takes ~1.4s
    return () => clearTimeout(t);
  }, []);

  // Phase 2: Draw the divider line after logo is done
  useEffect(() => {
    if (logoDrawn) {
      const t = setTimeout(() => {
        setDividerDrawn(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [logoDrawn]);

  // Phase 3: Reveal letters one-by-one with haptics after divider is done
  useEffect(() => {
    if (dividerDrawn) {
      const interval = setInterval(() => {
        setRevealedLetters((prev) => {
          if (prev < totalLetters) {
            triggerHaptic();
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 100); // 100ms per letter

      return () => clearInterval(interval);
    }
  }, [dividerDrawn, totalLetters]);

  // Phase 4: Wait for letter reveal completion, zoom & expand glow, then exit
  useEffect(() => {
    if (revealedLetters === totalLetters) {
      const t = setTimeout(() => {
        setIsExiting(true);
        // Let exit transition finish before calling onComplete
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 800);
        return () => clearTimeout(exitTimer);
      }, 1000); // Pause for impact, camera zoom-in

      return () => clearTimeout(t);
    }
  }, [revealedLetters, totalLetters, onComplete]);

  // Disable page scroll when preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  // Inline SVG logo icon paths
  const leftWingPath = "M0,19.4v119.63s20.57-27.95,48.57-27.95,49.42,24.07,49.42,24.07l84.88,86.16c12.62,10.5,25.25,25.25,63.13,25.25h37.88l-.44-58.9L136.58,44s-19.43-25.16-66.29-24.6S0,19.4,0,19.4Z";
  const trianglePoints = "174.29 19.22 283.44 126.56 283.44 19.22 174.29 19.22";
  const goldDropletPath = "M51.83,147.96c-20.87,0-37.79,15.09-37.79,33.71,0,3.2.51,6.29,1.44,9.22.57,1.81,1.2,3.6,2.2,5.22,7.75,12.66,34.15,48.98,34.15,48.98,0,0,26.4-36.33,34.15-48.98.99-1.62,1.62-3.41,2.2-5.22.93-2.93,1.44-6.02,1.44-9.22,0-18.62-16.92-33.71-37.79-33.71Z";

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center select-none"
        >
          {/* Film scanlines & vignette for cinematic texture */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.95) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255, 255, 255, 0.6) 2px 3px)",
            }}
          />

          {/* Golden radial background glow expanding dynamically */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{
              scale: logoDrawn ? 1.15 : 0.8,
              opacity: logoDrawn ? [0.15, 0.25, 0.2] : 0.1,
            }}
            transition={{
              duration: 4,
              ease: "easeOut",
              opacity: { repeat: Infinity, duration: 3, repeatType: "mirror" },
            }}
            className="absolute w-[45vw] h-[45vw] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(255,199,80,0.3)_0%,transparent_70%)] pointer-events-none"
          />

          {/* Main Logo and Branding Container with camera-zoom entry */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: revealedLetters === totalLetters ? 1.02 : 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6"
          >
            {/* 1. Left Side: SVG Icon (responsive size) */}
            <div className="w-[120px] h-[100px] md:w-[190px] md:h-[160px] flex items-center justify-center">
              <svg
                viewBox="0 0 290 250"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized Left Wing */}
                <motion.path
                  d={leftWingPath}
                  initial={{ pathLength: 0, opacity: 0, fill: "rgba(255,255,255,0)" }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    fill: logoDrawn ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
                  }}
                  transition={{
                    pathLength: { duration: 1.2, ease: "easeInOut" },
                    fill: { duration: 0.6, delay: 0.9 },
                    opacity: { duration: 0.3 },
                  }}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />

                {/* Right Triangle */}
                <motion.polygon
                  points={trianglePoints}
                  initial={{ pathLength: 0, opacity: 0, fill: "rgba(255,255,255,0)" }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    fill: logoDrawn ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
                  }}
                  transition={{
                    pathLength: { duration: 1.0, ease: "easeInOut", delay: 0.2 },
                    fill: { duration: 0.5, delay: 0.9 },
                    opacity: { duration: 0.3, delay: 0.2 },
                  }}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />

                {/* Teardrop / Gold Droplet */}
                <motion.path
                  d={goldDropletPath}
                  initial={{ pathLength: 0, opacity: 0, fill: "rgba(255,199,80,0)" }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    fill: logoDrawn ? "rgba(255,199,80,1)" : "rgba(255,199,80,0)",
                  }}
                  transition={{
                    pathLength: { duration: 1.1, ease: "easeInOut", delay: 0.3 },
                    fill: { duration: 0.6, delay: 1.0 },
                    opacity: { duration: 0.3, delay: 0.3 },
                  }}
                  stroke="#ffc750"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>

            {/* 2. Middle: Divider line (Vertical on desktop, Horizontal on mobile) */}
            <div className="relative flex items-center justify-center w-full md:w-auto">
              {/* Desktop Vertical Divider */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: logoDrawn ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="hidden md:block w-px bg-white/20"
              />

              {/* Mobile Horizontal Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: logoDrawn ? 120 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="block md:hidden h-px bg-white/20"
              />
            </div>

            {/* 3. Right Side: Branding Typography */}
            <div className="flex flex-col items-center md:items-start select-none">
              {/* BRAND NAME: NETWORQ */}
              <div className="h-[48px] md:h-[72px] overflow-hidden flex items-baseline">
                <span className="font-display text-[3.2rem] md:text-[5rem] font-bold leading-none text-cream tracking-[0.15em] flex">
                  {brandText.split("").map((char, index) => {
                    const isRevealed = dividerDrawn && revealedLetters > index;
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                          opacity: isRevealed ? 1 : 0,
                          y: isRevealed ? 0 : 15,
                          textShadow: isRevealed
                            ? ["0 0 10px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.6)", "0 0 8px rgba(255,255,255,0.2)"]
                            : "0 0 0px rgba(255,255,255,0)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                          textShadow: { duration: 0.6 },
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              </div>

              {/* Glowing sub-divider line under NETWORQ */}
              <div className="w-full relative py-1 flex justify-center md:justify-start">
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: dividerDrawn ? "100%" : 0,
                    opacity: dividerDrawn ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent md:to-transparent md:from-[var(--gold)]"
                />
              </div>

              {/* SUBTITLE: GLOBAL */}
              <div className="h-[28px] md:h-[40px] overflow-hidden flex items-baseline mt-1 md:mt-2">
                <span className="font-display text-[1.4rem] md:text-[2.2rem] font-medium leading-none text-[var(--gold)] tracking-[0.3em] flex">
                  {subText.split("").map((char, index) => {
                    // Offset index for global list
                    const globalIndex = brandText.length + index;
                    const isRevealed = dividerDrawn && revealedLetters > globalIndex;
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: isRevealed ? 1 : 0,
                          y: isRevealed ? 0 : 10,
                          textShadow: isRevealed
                            ? ["0 0 10px rgba(255,199,80,0)", "0 0 25px rgba(255,199,80,0.8)", "0 0 10px rgba(255,199,80,0.3)"]
                            : "0 0 0px rgba(255,199,80,0)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 12,
                          textShadow: { duration: 0.6 },
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cinematic Cinematic loading quote / tag in bottom center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: dividerDrawn ? 0.35 : 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-cream text-center"
          >
            BECAUSE EVERY CLICK SHOULD LEAD SOMEWHERE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
