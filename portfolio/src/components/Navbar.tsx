"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Journey" },
  { href: "#skills", label: "Synapses" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      document.querySelectorAll("section[id]").forEach((s) => {
        const el = s as HTMLElement;
        if (window.scrollY + 120 >= el.offsetTop && window.scrollY + 120 < el.offsetTop + el.offsetHeight)
          setActive(el.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass-card border-b" : "bg-transparent border-transparent"
      )}
      style={{ borderColor: scrolled ? "rgba(124,58,237,0.15)" : "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="font-mono font-bold text-lg tracking-widest"
          style={{ background: "linear-gradient(135deg, #7C3AED, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          SYNAPSE
        </span>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                data-cursor={label}
                className={cn(
                  "font-mono text-xs tracking-wider transition-all duration-200 relative",
                  active === href.slice(1)
                    ? "text-cyan-300"
                    : "hover:text-cyan-300"
                )}
                style={{ color: active === href.slice(1) ? "#22D3EE" : "rgba(226,232,240,0.45)" }}
              >
                {active === href.slice(1) && (
                  <span
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full node-glow"
                    style={{ background: "#22D3EE" }}
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: "rgba(226,232,240,0.7)" }}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden glass-card border-t px-6 pb-5 flex flex-col gap-4"
          style={{ borderColor: "rgba(124,58,237,0.15)" }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs tracking-wider transition-colors"
              style={{ color: "rgba(226,232,240,0.55)" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
