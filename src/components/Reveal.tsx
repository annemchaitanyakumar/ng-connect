import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const dirOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as: As = "div",
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: keyof typeof motion;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const { x, y } = reduce ? { x: 0, y: 0 } : dirOffset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x, y, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const Comp = motion[As] as typeof motion.div;

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pr-[0.25em]"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
