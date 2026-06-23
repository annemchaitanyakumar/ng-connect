import { Link } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const cols = [
  {
    title: "Services",
    links: [
      ["Brand & Creative", "/services/brand-creative"],
      ["Social Media", "/services/social-media"],
      ["Performance", "/services/performance"],
      ["SEO", "/services/seo"],
      ["Web Design", "/services/web-design"],
      ["Content", "/services/content"],
    ],
  },
  {
    title: "More",
    links: [
      ["Video & Multimedia", "/services/video-multimedia"],
      ["Business Growth", "/services/business-growth"],
      ["Local Business", "/services/local-business"],
      ["Emerging Services", "/services/emerging"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Home", "/"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="container-x pt-24 pb-12 relative">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)] font-display font-bold">
                N
              </span>
              <span className="font-display text-xl text-cream">
                Networq <span className="text-[var(--gold)]">Global</span>
              </span>
            </div>
            <p className="text-cream/70 text-sm max-w-sm leading-relaxed">
              Crafting outstanding digital solutions for businesses across the globe.
              Because every click should lead somewhere.
            </p>
            <Link to="/contact" className="btn-primary mt-8 inline-flex">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="number-tag mb-5">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-cream/80 text-sm hover:text-[var(--gold)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline-light mt-16" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 text-sm text-cream/60">
          <div>© {new Date().getFullYear()} Networq Global. All rights reserved.</div>
          <div className="flex flex-wrap gap-5">
            <a href="mailto:hello@networqglobal.com" className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
              <Mail className="h-4 w-4" /> hello@networqglobal.com
            </a>
            <a href="tel:+910000000000" className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
              <Phone className="h-4 w-4" /> +91 00000 00000
            </a>
            <a href="#" className="inline-flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Giant signature */}
      <div className="pointer-events-none select-none -mb-10 md:-mb-20 -mt-10 overflow-hidden">
        <div className="font-display text-[18vw] leading-none text-center bg-gradient-to-b from-[var(--gold)]/20 to-transparent bg-clip-text text-transparent tracking-tighter">
          networq
        </div>
      </div>
    </footer>
  );
}
