import { motion } from "motion/react";

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12 font-display text-5xl md:text-7xl tracking-tighter">
            {t}
            <span className="text-[var(--gold)]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
