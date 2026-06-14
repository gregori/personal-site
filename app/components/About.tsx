"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/app/data/profile";

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
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
      {/* Side accent line */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Left: Intro */}
          <div className="lg:col-span-3">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent/50" />
                About
              </span>
            </div>

            <h2 className="reveal reveal-delay-1 mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Engineering leader with{" "}
              <span className="gradient-text">two decades</span> of impact
            </h2>

            <p className="reveal reveal-delay-2 mt-6 leading-relaxed text-muted">
              From wiring network closets at city hall to architecting enterprise solutions at Zup Innovation, my career spans the full spectrum of technology. I thrive at the intersection of infrastructure and software — building systems that are not only elegant but operationally sound.
            </p>

            <p className="reveal reveal-delay-3 mt-4 leading-relaxed text-muted">
              Beyond code, I spent nine years shaping the next generation of engineers as a university professor, teaching everything from Artificial Intelligence to Operating Systems. I believe the best engineers understand the entire stack — and I&apos;ve lived that philosophy every day for nearly 20 years.
            </p>
          </div>

          {/* Right: Skills & Languages */}
          <div className="lg:col-span-2">
            <div className="reveal reveal-delay-2 rounded-2xl border border-card-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>

              <div className="mt-8 border-t border-card-border pt-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                  Languages
                </h3>
                <div className="space-y-3">
                  {profile.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{lang.name}</span>
                      <span className="text-xs text-muted">{lang.level}</span>
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
