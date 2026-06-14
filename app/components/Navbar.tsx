"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

const sections = ["about", "journey", "portfolio"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      for (const id of [...sections].reverse()) {
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
          className="group text-lg font-semibold tracking-tight shrink-0"
        >
          <span className="gradient-text">RG</span>
          <span className="ml-2 text-sm text-muted transition-opacity group-hover:opacity-100 opacity-0 hidden sm:inline">
            Rodrigo Gregori
          </span>
        </a>

        <div className="flex items-center gap-0 sm:gap-1 overflow-x-auto">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative px-2 sm:px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                activeSection === id
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.nav[id as keyof typeof t.nav]}
              {activeSection === id && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </a>
          ))}

          <div className="ml-2 sm:ml-4 flex items-center gap-1 border-l border-card-border pl-2 sm:pl-4 shrink-0">
            <button
              onClick={() => setLang("en")}
              type="button"
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                lang === "en" ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </button>
            <span className="text-muted/40 text-xs">|</span>
            <button
              onClick={() => setLang("pt")}
              type="button"
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                lang === "pt" ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              PT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
