import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Cloud, CloudOff } from "lucide-react";
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
  const [showClouds, setShowClouds] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("show-clouds");
      return saved !== "false";
    }
    return true;
  });

  const toggleClouds = () => {
    const newVal = !showClouds;
    setShowClouds(newVal);
    localStorage.setItem("show-clouds", String(newVal));
    window.dispatchEvent(new CustomEvent("toggle-clouds", { detail: newVal }));
  };

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
    <motion.header
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{
        y: scrolled ? 12 : 20,
        x: "-50%",
        opacity: 1,
        scale: scrolled ? 0.98 : 1.0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl border transition-all duration-300 backdrop-blur-xl ${
        open ? "rounded-3xl bg-[oklch(0.12_0.04_235/0.96)] border-white/10" : "rounded-full"
      } ${
        scrolled
          ? "bg-[oklch(0.12_0.04_235/0.8)] border-[oklch(0.84_0.16_85/0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_oklch(0.84_0.16_85/0.05)]"
          : "bg-[oklch(0.12_0.04_235/0.35)] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6">
        <Link to="/" className="group flex items-center">
          <img
            src="/brand-assets/company-logo-inverted.svg"
            alt="Networq Global Logo"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm text-cream/85">
          {/* Home Link */}
          <Link
            to="/"
            className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-[var(--gold)] transition-all duration-300 font-medium"
            activeProps={{ className: "text-[var(--gold)] font-semibold bg-white/5" }}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <Link
              to="/services"
              className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-[var(--gold)] transition-all duration-300 font-medium inline-block"
              activeProps={{ className: "text-[var(--gold)] font-semibold bg-white/5" }}
            >
              Services
            </Link>
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-4 w-[640px]"
                >
                  <div className="rounded-3xl border border-white/10 bg-[oklch(0.14_0.04_235/0.95)] backdrop-blur-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="group flex items-center justify-between px-5 py-3.5 rounded-2xl text-cream/80 hover:bg-white/5 hover:text-[var(--gold)] transition-all duration-300"
                      >
                        <span className="font-medium tracking-tight text-[15px]">{s.label}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-cream/60 group-hover:text-[var(--gold)]" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Careers Link */}
          <Link
            to="/careers"
            className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-[var(--gold)] transition-all duration-300 font-medium"
            activeProps={{ className: "text-[var(--gold)] font-semibold bg-white/5" }}
          >
            Careers
          </Link>

          {/* Contact Link */}
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full hover:bg-white/10 hover:text-[var(--gold)] transition-all duration-300 font-medium"
            activeProps={{ className: "text-[var(--gold)] font-semibold bg-white/5" }}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleClouds}
            className="p-2.5 rounded-full border border-white/10 hover:border-[var(--gold)] text-cream/85 hover:text-[var(--gold)] transition-colors flex items-center justify-center bg-white/5 cursor-pointer"
            title={showClouds ? "Turn off 3D clouds" : "Turn on 3D clouds"}
          >
            {showClouds ? <Cloud className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />}
          </button>
          <Link to="/contact" className="btn-primary py-2 px-5 text-sm h-10 flex items-center shadow-md hover:scale-[1.02] transition-transform duration-300">
            Let's Talk <ArrowUpRight className="h-4 w-4 ml-1" />
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-white/10"
          >
            <div className="p-6 space-y-2 max-h-[calc(100svh-120px)] overflow-y-auto">
              <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
              <div className="flex items-center justify-between pt-2 pb-1 text-xs uppercase tracking-widest text-[var(--gold)]/80">
                <span>Services</span>
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className="text-[10px] text-cream/60 underline font-sans lowercase tracking-normal hover:text-[var(--gold)] transition-colors"
                >
                  view all
                </Link>
              </div>
              {services.map((s) => (
                <MobileLink key={s.to} to={s.to} onClick={() => setOpen(false)}>
                  {s.label}
                </MobileLink>
              ))}
              <MobileLink to="/careers" onClick={() => setOpen(false)}>Careers</MobileLink>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
              
              <button
                onClick={() => {
                  toggleClouds();
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 text-lg text-cream/90 hover:text-[var(--gold)] border-t border-white/10 mt-2 bg-transparent border-0 cursor-pointer"
              >
                <span>3D Cloud Layer</span>
                {showClouds ? <Cloud className="h-5 w-5 text-[var(--gold)]" /> : <CloudOff className="h-5 w-5" />}
              </button>

              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full mt-4">
                Let's Talk <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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
