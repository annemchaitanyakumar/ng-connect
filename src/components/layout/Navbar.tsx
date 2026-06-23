import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const services = [
  { label: "Brand & Creative", to: "/services/brand-creative" },
  { label: "Social Media Marketing", to: "/services/social-media" },
  { label: "Performance Marketing", to: "/services/performance" },
  { label: "SEO Services", to: "/services/seo" },
  { label: "Website Design", to: "/services/web-design" },
  { label: "Content Marketing", to: "/services/content" },
  { label: "Video & Multimedia", to: "/services/video-multimedia" },
  { label: "Business Growth", to: "/services/business-growth" },
  { label: "Local Business", to: "/services/local-business" },
  { label: "Emerging Services", to: "/services/emerging" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[oklch(0.12_0.04_235/0.7)] border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)] font-display font-bold">
            N
          </span>
          <span className="font-display text-lg tracking-tight text-cream">
            Networq <span className="text-[var(--gold)]">Global</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm text-cream/85">
          <NavItem to="/">Home</NavItem>
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <button className="px-4 py-2 rounded-full hover:text-[var(--gold)] transition-colors">
              Services
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-[640px]"
                >
                  <div className="rounded-3xl border border-white/10 bg-[oklch(0.14_0.04_235/0.95)] backdrop-blur-xl p-4 shadow-2xl grid grid-cols-2 gap-1">
                    {services.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="group flex items-center justify-between px-4 py-3 rounded-2xl text-cream/85 hover:bg-white/5 hover:text-[var(--gold)] transition-colors"
                      >
                        <span>{s.label}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavItem to="/careers">Careers</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>

        <div className="hidden lg:flex">
          <Link to="/contact" className="btn-primary">
            Let's Talk <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-cream p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-[oklch(0.12_0.04_235)] border-t border-white/10"
          >
            <div className="container-x py-6 space-y-2">
              <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
              <div className="pt-2 pb-1 text-xs uppercase tracking-widest text-[var(--gold)]/80">Services</div>
              {services.map((s) => (
                <MobileLink key={s.to} to={s.to} onClick={() => setOpen(false)}>
                  {s.label}
                </MobileLink>
              ))}
              <MobileLink to="/careers" onClick={() => setOpen(false)}>Careers</MobileLink>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full mt-4">
                Let's Talk <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-full hover:text-[var(--gold)] transition-colors"
      activeProps={{ className: "text-[var(--gold)]" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2 text-lg text-cream/90 hover:text-[var(--gold)] transition-colors"
    >
      {children}
    </Link>
  );
}
