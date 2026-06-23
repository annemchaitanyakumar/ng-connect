import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, Phone, MessageCircle, MapPin, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Reveal, RevealWords } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Networq Global" },
      { name: "description", content: "Talk to Networq Global. Let's build something impactful together." },
      { property: "og:title", content: "Contact Networq Global" },
      { property: "og:description", content: "Don't wait, connect with our team now." },
    ],
  }),
  component: ContactPage,
});

const serviceOpts = [
  "Brand & Creative",
  "Social Media Marketing",
  "Performance Marketing",
  "SEO Services",
  "Website Design",
  "Content Marketing",
  "Video & Multimedia",
  "Business Growth",
  "Local Business",
  "Emerging / AI Services",
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="surface-ink grain pt-40 pb-24">
        <div className="container-x">
          <Reveal>
            <div className="chip-dark"><Sparkles className="h-3.5 w-3.5" /> Contact Us</div>
          </Reveal>
          <h1 className="mt-8 font-display text-5xl md:text-8xl text-cream leading-[1.02] tracking-tight max-w-5xl">
            <RevealWords text="Let's build something" />
            <span className="block italic text-[var(--gold)]">impactful, together.</span>
          </h1>
          <Reveal delay={0.3} className="mt-10 max-w-2xl text-cream/75 text-lg leading-relaxed">
            Want to talk to us or explore how we can help your business grow? Don't wait,
            connect with our team now.
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-[1fr_1.6fr] gap-16">
          <div className="space-y-10">
            <div>
              <div className="chip">Reach us directly</div>
              <h2 className="mt-6 font-display text-3xl md:text-4xl text-[var(--ink)] tracking-tight">
                Prefer talking the old-fashioned way?
              </h2>
            </div>
            <ul className="space-y-5">
              {[
                { Icon: Mail, label: "Email", value: "hello@networqglobal.com", href: "mailto:hello@networqglobal.com" },
                { Icon: Phone, label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
                { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "#" },
                { Icon: MapPin, label: "Working", value: "Globally, with care", href: "#" },
              ].map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-5 p-5 rounded-2xl border border-[var(--ink)]/10 hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--ink)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="number-tag text-[var(--ink)]/50">{label}</div>
                      <div className="text-[var(--ink)] font-medium">{value}</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[var(--ink)]/30 group-hover:text-[var(--gold)] group-hover:rotate-45 transition-all" />
                  </a>
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
              <Field label="Company Name (optional)" name="company" />
            </Row>

            <div>
              <div className="number-tag text-[var(--ink)]/50 mb-3">Services you're interested in</div>
              <div className="flex flex-wrap gap-2">
                {serviceOpts.map((s) => (
                  <ServiceChip key={s} label={s} />
                ))}
              </div>
            </div>

            <Row>
              <SelectField label="Budget Range (optional)" name="budget" options={["Under $1k", "$1k – $5k", "$5k – $15k", "$15k+"]} />
              <SelectField label="Preferred Contact" name="contact_mode" options={["Call", "Email", "WhatsApp"]} />
            </Row>

            <Field label="Short message about you / your requirement" name="message" textarea required />

            <button type="submit" className="btn-primary w-full">
              {sent ? "Message sent ✓" : "Send message"} <ArrowUpRight className="h-4 w-4" />
            </button>
            {sent && (
              <p className="text-sm text-[var(--ink)]/60 text-center">
                Thanks! We'll get back to you within one business day.
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
  label, name, type = "text", textarea, required,
}: { label: string; name: string; type?: string; textarea?: boolean; required?: boolean }) {
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

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="number-tag text-[var(--ink)]/50 mb-2 block">{label}</span>
      <select
        name={name}
        className="w-full bg-transparent border-b border-[var(--ink)]/15 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
        defaultValue=""
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function ServiceChip({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className={`px-4 py-2 rounded-full text-sm border transition-all ${
        on
          ? "bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]"
          : "bg-transparent text-[var(--ink)]/70 border-[var(--ink)]/15 hover:border-[var(--gold)]"
      }`}
    >
      {label}
    </button>
  );
}
