import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

export type FaqItem = { q: string; a: string };

export function Faq({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-current/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={i * 0.05}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className={`w-full text-left py-6 flex items-start gap-6 group ${
                dark ? "text-cream" : "text-[var(--ink)]"
              }`}
            >
              <span className="number-tag pt-2 min-w-12">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-display font-medium">{it.q}</h3>
                  <span
                    className={`shrink-0 grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                      isOpen
                        ? "bg-[var(--gold)] text-[var(--ink)] border-[var(--gold)]"
                        : dark
                          ? "border-white/20 text-cream"
                          : "border-[var(--ink)]/20 text-[var(--ink)]"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className={`pt-3 pr-12 leading-relaxed ${dark ? "text-cream/75" : "text-[var(--ink)]/70"}`}>
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
