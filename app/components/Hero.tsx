"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/app/data/profile";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    container.addEventListener("mousemove", onMouseMove);
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px] animate-float" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-purple/5 blur-[120px] animate-float" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl md:text-8xl animate-slide-up">
          {profile.name}
        </h1>

        <div className="mb-6 h-12 sm:h-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text animate-slide-up">
            {profile.title}
          </h2>
        </div>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg animate-slide-up">
          {lang === "pt" ? t.profile.summary : profile.summary}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in">
          <a
            href="#journey"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
          >
            <span className="relative z-10">{t.hero.exploreJourney}</span>
            <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </a>

          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-card-border bg-card/50 px-8 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.06)]"
          >
            {t.hero.viewPortfolio}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-card-border pt-8 animate-fade-in">
          {[
            { value: "20+", label: t.hero.stats.years },
            { value: "3", label: t.hero.stats.companies },
            { value: "6", label: t.hero.stats.languages },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold gradient-text-blue sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted">{t.hero.scroll}</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
