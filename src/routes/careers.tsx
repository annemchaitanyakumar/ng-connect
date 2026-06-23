import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Reveal, RevealWords } from "@/components/Reveal";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Networq Global" },
      { name: "description", content: "Join Networq Global. Build ideas that shape brands across the globe." },
      { property: "og:title", content: "Careers — Networq Global" },
      { property: "og:description", content: "Are you driven by creativity and fueled by the passion to excel?" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="surface-ink grain pt-40 pb-24">
        <div className="container-x">
          <Reveal>
            <div className="chip-dark"><Sparkles className="h-3.5 w-3.5" /> Work With Us</div>
          </Reveal>
          <h1 className="mt-8 font-display text-5xl md:text-8xl text-cream leading-[1.02] tracking-tight max-w-5xl">
            <RevealWords text="Build ideas that shape brands across the globe." />
          </h1>
          <Reveal delay={0.3} className="mt-10 max-w-2xl text-cream/75 text-lg leading-relaxed">
            Are you driven by creativity and fueled by the passion to excel in the fast-paced world
            of global marketing? If you love building ideas that make an impact, you'll fit right in.
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <div className="chip">Apply Now</div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--ink)] tracking-tight leading-[1.05]">
              Tell us about you.
            </h2>
            <p className="mt-6 text-[var(--ink)]/70 leading-relaxed">
              Share your details and take the first step toward building your career with us. We
              review every application personally.
            </p>
            <ul className="mt-10 space-y-3 text-[var(--ink)]/75">
              {["Remote-friendly culture", "Global brands and projects", "Modern tools and craft"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="p-8 md:p-10 rounded-3xl bg-card border border-[var(--ink)]/8 shadow-[var(--shadow-soft)] space-y-5"
          >
            <Row>
              <Field label="Full Name" name="name" required />
              <Field label="Email Address" name="email" type="email" required />
            </Row>
            <Row>
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Position Applying For" name="position" required />
            </Row>
            <Field label="Portfolio / LinkedIn (optional)" name="portfolio" />
            <Field label="Why should we hire you?" name="why" textarea required />

            <button type="submit" className="btn-primary w-full">
              {sent ? "Application received ✓" : "Submit application"} <ArrowUpRight className="h-4 w-4" />
            </button>
            {sent && (
              <p className="text-sm text-[var(--ink)]/60 text-center">
                Thank you! We'll be in touch soon. In the meantime,&nbsp;
                <Link to="/" className="underline text-[var(--ink)]">explore our work</Link>.
              </p>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-5">{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full bg-transparent border-b border-[var(--ink)]/15 pt-6 pb-3 text-[var(--ink)] placeholder-transparent focus:outline-none focus:border-[var(--gold)] transition-colors peer";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} required={required} placeholder={label} rows={4} className={base} />
      ) : (
        <input name={name} type={type} required={required} placeholder={label} className={base} />
      )}
      <span className="pointer-events-none absolute left-0 top-6 text-[var(--ink)]/50 text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--ink)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>
    </label>
  );
}
