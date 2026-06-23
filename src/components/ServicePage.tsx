import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Service } from "@/data/services";
import { Reveal, RevealWords } from "./Reveal";
import { Faq } from "./Faq";
import orbImg from "@/assets/orb-glow.jpg";

export function ServicePage({ service }: { service: Service }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative surface-ink grain overflow-hidden pt-40 pb-32">
        <motion.img
          src={orbImg}
          alt=""
          aria-hidden
          style={{ y, opacity }}
          className="absolute -top-20 -right-40 w-[120%] max-w-none opacity-50 mix-blend-screen pointer-events-none"
        />
        <div className="container-x relative">
          <Reveal>
            <div className="chip-dark">
              <Sparkles className="h-3.5 w-3.5" /> {service.title}
            </div>
          </Reveal>
          <h1 className="mt-8 max-w-5xl font-display font-medium text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.02] tracking-tight">
            <RevealWords text={service.tagline} />
          </h1>
          <Reveal delay={0.3} className="mt-10 max-w-2xl text-cream/75 text-lg leading-relaxed">
            {service.intro}
          </Reveal>
          <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Start your project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href="#offerings" className="btn-ghost">
              Explore the service
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHY IMPORTANT */}
      <section className="py-28 bg-background">
        <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <div className="chip">Why it matters</div>
            <Reveal>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance leading-[1.05] text-[var(--ink)]">
                Why this matters for your business.
              </h2>
            </Reveal>
          </div>
          <ul className="space-y-1">
            {service.importance.map((it, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex gap-5 py-5 border-t border-[var(--ink)]/10">
                  <span className="number-tag pt-1 text-[var(--ink)]/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg md:text-xl text-[var(--ink)]/80 leading-snug">{it}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="offerings" className="py-28 bg-[var(--secondary)]">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="chip">What we offer</div>
              <Reveal>
                <h2 className="mt-6 font-display text-4xl md:text-6xl text-[var(--ink)] tracking-tight">
                  Capabilities crafted to compound.
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.04}>
                <div className="group h-full p-7 rounded-3xl bg-card border border-[var(--ink)]/8 hover:border-[var(--gold)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="number-tag text-[var(--ink)]/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-[var(--ink)]/30 group-hover:text-[var(--gold)] group-hover:rotate-45 transition-all" />
                  </div>
                  <h3 className="font-display text-xl text-[var(--ink)] mb-3">{o.title}</h3>
                  <p className="text-[var(--ink)]/65 text-sm leading-relaxed">{o.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS (SEO only) */}
      {service.plans && (
        <section className="py-28 surface-ink grain">
          <div className="container-x">
            <div className="max-w-3xl mb-16">
              <div className="chip-dark">Plans</div>
              <Reveal>
                <h2 className="mt-6 font-display text-4xl md:text-6xl text-cream tracking-tight">
                  Pick a plan. Outrank everyone else.
                </h2>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {service.plans.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08}>
                  <div
                    className={`relative h-full p-8 rounded-3xl border transition-all ${
                      p.featured
                        ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--ink)]"
                        : "bg-white/5 border-white/10 text-cream"
                    }`}
                  >
                    {p.featured && (
                      <span className="absolute top-6 right-6 chip-dark !bg-[var(--ink)] !text-[var(--gold)] !border-[var(--ink)]">
                        Most loved
                      </span>
                    )}
                    <div className="number-tag mb-3 opacity-70">SEO Plan</div>
                    <div className="font-display text-4xl mb-8">{p.name}</div>
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <Check
                            className={`h-4 w-4 mt-0.5 ${p.featured ? "text-[var(--ink)]" : "text-[var(--gold)]"}`}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className={`mt-10 inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm ${
                        p.featured
                          ? "bg-[var(--ink)] text-[var(--gold)]"
                          : "bg-[var(--gold)] text-[var(--ink)]"
                      }`}
                    >
                      Get started <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY US */}
      {(service.closing || service.whyPoints) && (
        <section className="py-28 bg-background">
          <div className="container-x">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
              <div className="sticky top-32">
                <div className="chip">{service.closingTitle || "Why Networq"}</div>
                <Reveal>
                  <h2 className="mt-6 font-display text-4xl md:text-6xl text-[var(--ink)] leading-[1.05] tracking-tight">
                    Partner with people who care like you do.
                  </h2>
                </Reveal>
                {service.closing && (
                  <Reveal delay={0.2} className="mt-8 text-lg text-[var(--ink)]/70 leading-relaxed">
                    {service.closing}
                  </Reveal>
                )}
              </div>
              {service.whyPoints && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.whyPoints.map((p, i) => (
                    <Reveal key={i} delay={i * 0.04}>
                      <div className="p-5 rounded-2xl bg-card border border-[var(--ink)]/8 h-full">
                        <Check className="h-4 w-4 text-[var(--gold)] mb-3" />
                        <p className="text-sm text-[var(--ink)]/80 leading-snug">{p}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] surface-ink grain p-12 md:p-20">
            <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-end">
              <h2 className="font-display text-4xl md:text-6xl text-cream tracking-tight">
                Ready to take the next step?
              </h2>
              <div className="flex md:justify-end">
                <Link to="/contact" className="btn-primary">
                  Connect now <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-[var(--secondary)]">
        <div className="container-x grid lg:grid-cols-[1fr_1.6fr] gap-16">
          <div>
            <div className="chip">FAQ</div>
            <Reveal>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--ink)] tracking-tight leading-[1.05]">
                Questions we hear, answered.
              </h2>
            </Reveal>
          </div>
          <Faq items={service.faqs} />
        </div>
      </section>
    </div>
  );
}
