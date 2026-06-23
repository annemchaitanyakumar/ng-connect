import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowRight, Sparkles, Globe2, Zap, Radio } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Reveal, RevealWords } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Marquee } from "@/components/Marquee";
import orbImg from "@/assets/orb-glow.jpg";
import { services } from "@/data/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Networq Global — Crafting outstanding digital solutions" },
      {
        name: "description",
        content:
          "Because every click should lead somewhere. Networq Global is a global digital marketing agency building brand, performance, content and growth systems.",
      },
      { property: "og:title", content: "Networq Global" },
      { property: "og:description", content: "Crafting outstanding digital solutions for your business, across the globe." },
    ],
  }),
  component: Home,
});

const workflow = [
  { tag: "01", title: "Understand", desc: "We start by understanding what exactly your business requires, covering every metric and listing every business need." },
  { tag: "02", title: "Research", desc: "Powered by advanced tooling and existing intelligence, we analyse the market and the competition your brand will face." },
  { tag: "03", title: "Ideate", desc: "Once research is thorough, we build a plan that caters to your business needs, our goals and your vision, together." },
  { tag: "04", title: "Design", desc: "We design content, websites and campaign plans, meeting market standards and your brand expression." },
  { tag: "05", title: "Results", desc: "We track, optimise and improve every surface, websites, social, content, and deliver only the best for your business." },
];

const homeFaqs = [
  { q: "Why should I choose Networq?", a: "Our key motto is not only to build empowering digital solutions for all kinds of businesses, but also to ensure that your vision is kept alive throughout the process. Choose us to see your vision flourish the right way." },
  { q: "Will there be fixed plans or will it change with brand/business?", a: "No business or brand will have the same plan of action. The entire process is tailored to specific requirements. We conduct thorough research for every business, regardless of its sector, to deliver the best possible results." },
  { q: "What will be my role in your process?", a: "Your role is to share your vision, goals, and requirements clearly with us. We handle the research, planning, and execution while keeping you updated at key stages for feedback. It is a collaborative process." },
  { q: "Will your team monitor the campaigns every day?", a: "Yes, we monitor campaigns daily to track performance and optimize every lead generated, helping us maintain consistency and continuously improve results." },
  { q: "Is Networq open to work with any kind of brand or business?", a: "Yes, we are open to working with all business sectors globally." },
];

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee
        items={["Brand", "Performance", "SEO", "Web", "Social", "Content", "Video", "Growth", "AI"]}
        className="surface-ink py-10 text-cream"
      />
      <Intro />
      <ServicesSection />
      <Workflow />
      <Stats />
      <CtaBand />
      <FaqSection />
    </SiteLayout>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Letterbox bars retract as you scroll in
  const barH = useTransform(scrollYProgress, [0, 0.3], ["7vh", "0vh"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toUTCString().slice(17, 25) + " UTC"
      );
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative surface-ink grain min-h-[100svh] overflow-hidden pt-24"
    >
      {/* Letterbox bars */}
      <motion.div style={{ height: barH }} className="absolute top-0 inset-x-0 bg-black z-30 pointer-events-none" />
      <motion.div style={{ height: barH }} className="absolute bottom-0 inset-x-0 bg-black z-30 pointer-events-none" />

      {/* Vignette + scanlines for filmic feel */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 40%, oklch(0.08 0.04 235 / 0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, oklch(1 0 0 / 0.6) 2px 3px)",
        }}
      />

      {/* HUD frame */}
      <div className="absolute inset-x-0 top-24 z-20 pointer-events-none">
        <div className="container-x flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-cream/55 font-display">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span>Rec · Live signal · {now || "—"}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Lat 19.07° N</span>
            <span>Lon 72.87° E</span>
            <span className="text-[var(--gold)]/80">NQ-001</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="container-x relative z-20 flex flex-col justify-between min-h-[100svh] pt-44 pb-24"
      >
        {/* Top eyebrow */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="chip-dark">
              <Radio className="h-3.5 w-3.5" />
              Now broadcasting · Worldwide
            </div>
          </Reveal>
        </div>

        {/* Headline block — anchored to bottom for cinematic widescreen feel */}
        <motion.div style={{ scale: headlineScale }} className="mt-auto max-w-[18ch] origin-bottom-left">
          <h1 className="font-display font-medium text-[clamp(3rem,11vw,12rem)] leading-[0.88] tracking-[-0.04em] text-cream">
            <span className="block overflow-hidden">
              <RevealWords text="Every" />
            </span>
            <span className="block overflow-hidden">
              <RevealWords text="click" delay={0.1} />
            </span>
            <span className="block overflow-hidden">
              <span className="italic font-light text-[var(--gold)]">
                <RevealWords text="leads somewhere." delay={0.2} />
              </span>
            </span>
          </h1>

          <div className="mt-12 grid lg:grid-cols-[1.4fr_auto] gap-8 items-end">
            <Reveal delay={0.5} className="text-cream/75 text-base md:text-lg max-w-md leading-relaxed">
              A global digital agency engineering brand, growth and intelligence
              for businesses that refuse to be forgotten.
            </Reveal>
            <Reveal delay={0.65} className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Let's get started <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/services/brand-creative" className="btn-ghost">
                Our services
              </Link>
            </Reveal>
          </div>
        </motion.div>

        {/* Bottom HUD ticker */}
        <Reveal delay={0.9} className="mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.3em] text-cream/55 font-display">
          <span className="flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--gold)]" />
            Scroll
          </span>
          <span className="hidden sm:inline">Mumbai · New York · London · Tokyo · Sydney · Dubai · Singapore</span>
          <span className="text-[var(--gold)]/80">001 / 011</span>
        </Reveal>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="py-32 bg-background relative">
      <div className="container-x">
        <Reveal>
          <p className="number-tag text-[var(--ink)]/50">— A note from us</p>
        </Reveal>
        <h2 className="mt-6 font-display text-4xl md:text-7xl text-[var(--ink)] leading-[1.02] tracking-tight max-w-[18ch]">
          <RevealWords text="If it matters to your business, it matters to us." />
        </h2>
        <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-5xl">
          <Reveal delay={0.1} className="text-xl text-[var(--ink)]/75 leading-relaxed">
            Everything that has something to do with your business, brand or you, matters to us.
          </Reveal>
          <Reveal delay={0.2} className="text-xl text-[var(--ink)]/75 leading-relaxed">
            Blending advanced technology and never-ending creativity, we build the things that make
            your brand the talk of the town, or the world.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="surface-ink grain py-32 relative overflow-hidden">
      <img
        src={orbImg}
        alt=""
        aria-hidden
        className="absolute top-0 right-0 w-[70%] opacity-40 mix-blend-screen pointer-events-none"
        loading="lazy"
      />
      <div className="container-x relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="chip-dark"><Zap className="h-3.5 w-3.5" /> Our Services</div>
            <h2 className="mt-6 font-display text-5xl md:text-7xl text-cream tracking-tight leading-[1.02]">
              Eleven ways we make your brand <span className="text-[var(--gold)] italic">unmissable.</span>
            </h2>
          </div>
          <Link to="/contact" className="btn-primary self-start md:self-end">
            Build with us <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <ServiceRow key={s.slug} index={i} slug={s.slug} title={s.title} desc={s.tagline} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ index, slug, title, desc }: { index: number; slug: string; title: string; desc: string }) {
  return (
    <Reveal>
      <Link
        to={`/services/${slug}`}
        className="group block border-b border-white/10 py-7 md:py-10"
      >
        <div className="flex items-center gap-6 md:gap-12">
          <span className="number-tag text-[var(--gold)]/70 w-12">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
            <h3 className="font-display text-3xl md:text-5xl text-cream tracking-tight transition-all duration-500 group-hover:text-[var(--gold)] group-hover:translate-x-2">
              {title}
            </h3>
            <p className="text-cream/55 text-sm md:text-base max-w-md">{desc}</p>
          </div>
          <span className="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full border border-white/20 text-cream group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)] group-hover:border-[var(--gold)] transition-all duration-500">
            <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-transform" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-32 bg-background">
      <div className="container-x">
        <div className="max-w-3xl mb-24">
          <div className="chip">How we work</div>
          <h2 className="mt-6 font-display text-5xl md:text-7xl text-[var(--ink)] tracking-tight leading-[1.02]">
            How Networq <span className="italic text-[var(--ink)]/60">moves forward.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--ink)]/10 -translate-x-px md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineY }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-[var(--gold)] -translate-x-px md:-translate-x-1/2 origin-top"
          />

          <div className="space-y-20 md:space-y-32">
            {workflow.map((w, i) => (
              <Reveal key={w.tag} direction={i % 2 ? "left" : "right"}>
                <div className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className={`pl-16 md:pl-0 md:pr-12 ${i % 2 ? "md:pl-12 md:pr-0" : ""} relative md:text-right`} style={{ direction: "ltr" }}>
                    <div className={`absolute left-0 top-2 md:left-auto ${i % 2 ? "md:left-[-1.25rem]" : "md:right-[-1.25rem]"}`}>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)] font-display font-semibold">
                        {w.tag}
                      </span>
                    </div>
                  </div>
                  <div className="pl-16 md:pl-12" style={{ direction: "ltr" }}>
                    <h3 className="font-display text-3xl md:text-5xl text-[var(--ink)] tracking-tight mb-4">{w.title}</h3>
                    <p className="text-[var(--ink)]/70 text-lg leading-relaxed max-w-md">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "100%", l: "Tailored strategies" },
    { v: "24/7", l: "Campaign monitoring" },
    { v: "11+", l: "Service capabilities" },
    { v: "Global", l: "All sectors welcome" },
  ];
  return (
    <section className="py-24 bg-[var(--secondary)]">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08}>
            <div className="border-t border-[var(--ink)]/15 pt-6">
              <div className="font-display text-5xl md:text-6xl text-[var(--ink)] tracking-tight">{s.v}</div>
              <div className="mt-3 text-sm uppercase tracking-widest text-[var(--ink)]/60">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] surface-ink grain p-12 md:p-20">
          <img src={orbImg} alt="" aria-hidden loading="lazy" className="absolute -bottom-32 -right-20 w-[80%] opacity-30 mix-blend-screen pointer-events-none" />
          <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-end">
            <div>
              <div className="chip-dark"><Globe2 className="h-3.5 w-3.5" /> Worldwide</div>
              <h2 className="mt-6 font-display text-4xl md:text-7xl text-cream tracking-tight leading-[1.02]">
                Let's make your brand the <span className="italic text-[var(--gold)]">talk of the world.</span>
              </h2>
            </div>
            <div className="flex md:justify-end">
              <Link to="/contact" className="btn-primary">
                Let's get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-28 bg-background">
      <div className="container-x grid lg:grid-cols-[1fr_1.6fr] gap-16">
        <div>
          <div className="chip">FAQ</div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.02]">
            The things people ask before they say yes.
          </h2>
        </div>
        <Faq items={homeFaqs} />
      </div>
    </section>
  );
}
