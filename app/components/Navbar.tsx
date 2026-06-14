"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-card-border/50 shadow-[0_0_30px_rgba(0,212,255,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="group text-lg font-semibold tracking-tight"
        >
          <span className="gradient-text">RG</span>
          <span className="ml-2 text-sm text-muted transition-opacity group-hover:opacity-100 opacity-0">
            Rodrigo Gregori
          </span>
        </a>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeSection === item.href.slice(1)
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
