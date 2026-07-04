"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const NAV_LINKS = [
  { href: "#home",         label: "Home"         },
  { href: "#about",        label: "About"        },
  { href: "#education",    label: "Education"    },
  { href: "#experience",   label: "Journey"      },
  { href: "#skills",       label: "Synapses"     },
  { href: "#projects",     label: "Projects"     },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact",      label: "Contact"      },
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
      aria-label="Main navigation"
      className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "border-b" : "border-transparent")}
      style={{
        background: scrolled ? "var(--navbar-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span
          className="font-mono font-bold text-lg tracking-widest"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          SYNAPSE
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                data-cursor={label}
                aria-current={active === href.slice(1) ? "page" : undefined}
                className="font-mono text-xs tracking-wider transition-all duration-200 relative"
                style={{ color: active === href.slice(1) ? "var(--accent)" : "var(--text-secondary)" }}
              >
                {active === href.slice(1) && (
                  <span
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full node-glow"
                    style={{ background: "var(--accent)" }}
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: theme switcher + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ color: "var(--text-secondary)" }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t px-6 pb-5 flex flex-col gap-4"
          style={{
            background: "var(--navbar-bg)",
            backdropFilter: "blur(16px)",
            borderColor: "var(--border)",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs tracking-wider transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          {/* Theme switcher in mobile menu */}
          <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
