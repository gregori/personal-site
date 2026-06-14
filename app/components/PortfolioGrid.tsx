"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

function ProjectCard({
  project,
  index,
}: {
  project: { title: string; tag: string; desc: string };
  index: number;
}) {
  const { t } = useLanguage();
  const colors = ["from-accent/20 to-accent-purple/10", "from-accent-purple/20 to-accent/10", "from-accent/10 to-accent-purple/20"];

  return (
    <div
      className="reveal group relative overflow-hidden rounded-2xl border border-card-border bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:bg-card/50"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-30 transition-opacity duration-500 group-hover:opacity-50`} />

      <div className="relative p-6 sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent/70">
          <span className="h-1 w-1 rounded-full bg-accent/40" />
          {project.tag}
        </span>

        <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.desc}
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border border-card-border bg-card"
              />
            ))}
          </div>
          <span>{t.portfolio.detailsSoon}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              (el as HTMLElement).classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden bg-dot"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent/50" />
              {t.portfolio.badge}
              <span className="h-px w-6 bg-accent/50" />
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.portfolio.heading} <span className="gradient-text">{t.portfolio.headingGradient}</span>
          </h2>
          <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-lg text-muted">
            {t.portfolio.subheading}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.portfolio.projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <div className="reveal reveal-delay-4 mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-card-border px-5 py-2.5 text-sm text-muted">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t.portfolio.moreComing}
          </div>
        </div>
      </div>
    </section>
  );
}
