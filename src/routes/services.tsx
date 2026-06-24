import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, Zap, Award, Compass, HeartHandshake, Eye } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Reveal, RevealWords } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { services } from "@/data/services";
import orbImg from "@/assets/orb-glow.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Capabilities — Networq Global" },
      {
        name: "description",
        content:
          "Explore the service capabilities of Networq Global, spanning Brand & Creative, Marketing & Growth, SEO & Web Design, and intelligent Emerging systems.",
      },
      { property: "og:title", content: "Services & Capabilities — Networq Global" },
      {
        property: "og:description",
        content: "Eleven ways we make your brand unmissable.",
      },
    ],
  }),
  component: ServicesPage,
});

const CATEGORIES = [
  "All",
  "Brand & Creative",
  "Marketing & Growth",
  "SEO & Web",
  "Future Tech",
];

const getCategoryForService = (slug: string): string => {
  switch (slug) {
    case "brand-creative":
    case "content":
    case "video-multimedia":
      return "Brand & Creative";
    case "social-media":
    case "performance":
    case "business-growth":
    case "local-business":
      return "Marketing & Growth";
    case "seo":
    case "web-design":
      return "SEO & Web";
    case "emerging":
      return "Future Tech";
    default:
      return "Brand & Creative";
  }
};

const generalFaqs = [
  {
    q: "How do you tailor your services to my specific industry?",
    a: "We don't believe in generic templates. Our process starts with extensive research and competitor analysis tailored specifically to your sector, ensuring your campaign aligns perfectly with target demographics and market realities.",
  },
  {
    q: "Can I combine multiple services for a complete digital overhaul?",
    a: "Absolutely. In fact, our services compound. Combining Web Design with SEO and Performance Marketing creates a unified funnel where every channel supports and amplifies the others for maximum ROI.",
  },
  {
    q: "What is the typical timeline for starting a brand engagement?",
    a: "Once we outline requirements and finalize the scope of work, we typically kick off within 5 to 7 business days, setting up tracking dashboards and alignment parameters right away.",
  },
  {
    q: "How do you measure and report campaign success?",
    a: "We provide comprehensive weekly updates and real-time dashboards tracking key performance metrics—clicks, organic growth, conversion ratios, and lead quality. Transparency is central to our method.",
  },
];

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = services.filter((s) => {
    if (activeCategory === "All") return true;
    return getCategoryForService(s.slug) === activeCategory;
  });

  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section className="relative surface-ink grain min-h-[50svh] overflow-hidden flex flex-col justify-end pt-40 pb-20">
        {/* Vignette + Scanlines */}
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
        <img
          src={orbImg}
          alt=""
          aria-hidden
          className="absolute top-0 right-0 w-[80%] opacity-40 mix-blend-screen pointer-events-none"
          loading="lazy"
        />

        <div className="container-x relative z-20">
          <Reveal>
            <div className="chip-dark">
              <Sparkles className="h-3.5 w-3.5" /> Core Capabilities
            </div>
          </Reveal>

          <div className="mt-8 max-w-5xl">
            <h1 className="font-display font-medium text-[clamp(2.5rem,6vw,6.5rem)] leading-[1.02] tracking-tight text-cream">
              <span className="block overflow-hidden">
                <RevealWords text="Services designed to" />
              </span>
              <span className="block overflow-hidden">
                <span className="italic font-light text-[var(--gold)]">
                  <RevealWords text="compound growth." delay={0.15} />
                </span>
              </span>
            </h1>

            <Reveal delay={0.4} className="mt-8 max-w-2xl text-cream/75 text-base md:text-lg leading-relaxed">
              We blend authentic values, modern technology, and never-ending creativity to build highly effective digital solutions. Browse our capabilities below to find how we make your brand unmissable.
            </Reveal>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES CATALOG */}
      <section className="py-24 bg-background relative z-20">
        <div className="container-x">
          {/* Filtering bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-[var(--ink)]/10 pb-8 mb-16">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <Reveal key={cat} delay={idx * 0.04}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-6 py-2.5 text-[10px] font-display uppercase tracking-[0.2em] font-semibold rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--ink)] text-[var(--gold)] border-[var(--ink)] shadow-[var(--shadow-soft)]"
                        : "text-[var(--ink)]/70 border-[var(--ink)]/12 hover:border-[var(--ink)]/40 hover:text-[var(--ink)]"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />}
                      {cat}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => {
                const absoluteIndex = services.findIndex((s) => s.slug === service.slug) + 1;
                return (
                  <motion.div
                    key={service.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="group"
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="flex flex-col justify-between h-full p-8 rounded-[2rem] bg-card border border-[var(--ink)]/8 transition-all duration-500 hover:border-[var(--gold)]/70 hover:shadow-[var(--shadow-soft)] group-hover:-translate-y-1 relative overflow-hidden"
                    >
                      {/* Subtle hover card glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[oklch(0.84_0.16_85_/_0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      <div>
                        {/* Eyebrow index + visual anchor */}
                        <div className="flex items-center justify-between mb-8">
                          <span className="font-display text-xs tracking-widest text-[var(--gold)] font-bold">
                            SERVICE // {String(absoluteIndex).padStart(2, "0")}
                          </span>
                          <span className="w-8 h-8 rounded-full border border-[var(--ink)]/10 flex items-center justify-center text-[var(--ink)]/40 group-hover:border-[var(--gold)]/50 group-hover:text-[var(--gold)] transition-colors duration-500">
                            <Eye className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] tracking-tight font-medium mb-3 group-hover:text-[var(--ink)] transition-colors">
                          {service.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-[var(--ink)]/65 text-sm leading-relaxed mb-6 font-sans">
                          {service.tagline}
                        </p>

                        {/* Key Capabilities Bullet Points preview */}
                        <ul className="space-y-2 mb-8 pt-4 border-t border-[var(--ink)]/6">
                          {service.offerings.slice(0, 3).map((off) => (
                            <li key={off.title} className="flex items-start gap-2 text-xs text-[var(--ink)]/75">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-1.5 shrink-0" />
                              <span className="font-semibold">{off.title}</span>
                            </li>
                          ))}
                          {service.offerings.length > 3 && (
                            <li className="text-[10px] uppercase tracking-wider text-[var(--ink)]/45 pl-3.5">
                              + {service.offerings.length - 3} more capabilities
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Explore link row */}
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--ink)]/6 mt-auto">
                        <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ink)]/60 group-hover:text-[var(--ink)] transition-colors">
                          Explore Service
                        </span>
                        <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)] group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)] group-hover:border-[var(--gold)] transition-all duration-500">
                          <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROP SECTION */}
      <section className="py-24 bg-[var(--secondary)] relative z-20">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center">
            <div>
              <div className="chip">The Networq Core</div>
              <h2 className="mt-6 font-display text-4xl md:text-6xl text-[var(--ink)] leading-[1.05] tracking-tight">
                Crafted to fit your vision, <span className="italic text-[var(--ink)]/60">perfectly.</span>
              </h2>
              <p className="mt-8 text-base md:text-lg text-[var(--ink)]/75 leading-relaxed">
                We believe that modern marketing isn't about running standard, cookie-cutter operations. Every single business requires strategic execution that respects their unique market context.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ValuePropCard
                icon={<Award className="h-6 w-6 text-[var(--gold)]" />}
                title="Brilliance by default"
                desc="We don't settle for baseline results. Every visual assets and copy draft is engineered to grab attention."
              />
              <ValuePropCard
                icon={<Zap className="h-6 w-6 text-[var(--gold)]" />}
                title="Continuous optimization"
                desc="Daily tracking and algorithmic pivots to ensure your budget is spent where it brings maximum leads."
              />
              <ValuePropCard
                icon={<Compass className="h-6 w-6 text-[var(--gold)]" />}
                title="Absolute navigation"
                desc="Transparent dashboards mapping every click back to actual pipeline and revenue value."
              />
              <ValuePropCard
                icon={<HeartHandshake className="h-6 w-6 text-[var(--gold)]" />}
                title="Human partnership"
                desc="We operate as an extension of your board room, aligning tightly with your long-term success."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-12 relative z-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] surface-ink grain p-12 md:p-20">
            <img
              src={orbImg}
              alt=""
              aria-hidden
              className="absolute -bottom-32 -right-20 w-[80%] opacity-35 mix-blend-screen pointer-events-none"
              loading="lazy"
            />
            <div className="relative grid md:grid-cols-[1.6fr_1fr] gap-12 items-center">
              <div>
                <div className="chip-dark">Ready to build?</div>
                <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl text-cream tracking-tight leading-[1.02]">
                  Let's make your brand <span className="italic text-[var(--gold)]">unmissable.</span>
                </h2>
              </div>
              <div className="flex md:justify-end">
                <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                  Connect now <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-background relative z-20">
        <div className="container-x grid lg:grid-cols-[1fr_1.6fr] gap-16">
          <div>
            <div className="chip">FAQ</div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--ink)] tracking-tight leading-[1.05]">
              Capabilities and collaborations.
            </h2>
            <p className="mt-6 text-sm text-[var(--ink)]/60 max-w-sm">
              Have specific questions about working with Networq? Explore the answers to our most popular inquiries.
            </p>
          </div>
          <Faq items={generalFaqs} />
        </div>
      </section>
    </SiteLayout>
  );
}

function ValuePropCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-[var(--ink)]/8 h-full shadow-[0_10px_30px_rgba(5,75,110,0.02)]">
      <div className="mb-4">{icon}</div>
      <h3 className="font-display text-lg text-[var(--ink)] mb-2 font-medium">{title}</h3>
      <p className="text-[var(--ink)]/70 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}
