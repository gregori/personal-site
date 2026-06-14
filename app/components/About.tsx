"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/app/data/profile";
import { useLanguage } from "@/app/contexts/LanguageContext";

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/10 bg-accent/5 px-3.5 py-1.5 text-xs font-medium text-accent transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.08)]">
      <span className="h-1 w-1 rounded-full bg-accent/60" />
      {name}
    </span>
  );
}

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden bg-dot"
    >
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent/50" />
                {t.about.badge}
              </span>
            </div>

            <h2 className="reveal reveal-delay-1 mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {t.about.heading}{" "}
              <span className="gradient-text">{t.about.headingGradient}</span>
            </h2>

            <p className="reveal reveal-delay-2 mt-6 leading-relaxed text-muted">
              {t.about.paragraph1}
            </p>

            <p className="reveal reveal-delay-3 mt-4 leading-relaxed text-muted">
              {t.about.paragraph2}
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="reveal reveal-delay-2 rounded-2xl border border-card-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                {t.about.coreSkills}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>

              <div className="mt-8 border-t border-card-border pt-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t.about.languages}
                </h3>
                <div className="space-y-3">
                  {profile.languages.map((langItem) => (
                    <div key={langItem.name} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{langItem.name}</span>
                      <span className="text-xs text-muted">{langItem.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
