"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/app/data/profile";

function TimelineDot({ index }: { index: number }) {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent/30 bg-background transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]">
      <span className="text-xs font-bold text-accent">{index + 1}</span>
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof profile.experiences)[0];
  index: number;
}) {
  return (
    <div className="group relative pl-14 pb-12 last:pb-0">
      <TimelineDot index={index} />

      {/* Connector line */}
      {index < profile.experiences.length - 1 && (
        <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-accent/30 via-accent-purple/20 to-transparent" />
      )}

      <div className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
        <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-accent">
            {exp.period}
          </span>
          {exp.location && (
            <span className="text-xs text-muted flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {exp.location}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-foreground sm:text-xl">
          {exp.role}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-accent-dim">
          {exp.company}
        </p>

        <ul className="mt-3 space-y-2">
          {exp.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EducationCard({
  edu,
  index,
}: {
  edu: (typeof profile.education)[0];
  index: number;
}) {
  return (
    <div className="reveal group rounded-xl border border-card-border bg-card/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/20 hover:bg-card/50 sm:p-6">
      <span className="text-xs font-medium uppercase tracking-wider text-accent">
        {edu.period}
      </span>
      <h4 className="mt-1.5 font-semibold text-foreground">{edu.degree}</h4>
      <p className="mt-1 text-sm text-muted">{edu.institution}</p>
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden bg-grid"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent/50" />
              Career Journey
              <span className="h-px w-6 bg-accent/50" />
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            From <span className="gradient-text">infrastructure</span> to impact
          </h2>
          <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-xl text-muted">
            Nearly two decades of evolution — from a Jr. Development Analyst to a Software Engineer Specialist, shaping systems and people along the way.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Timeline */}
          <div className="lg:col-span-3">
            <h3 className="reveal mb-8 text-sm font-semibold uppercase tracking-wider text-foreground">
              Experience
            </h3>
            {profile.experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>

          {/* Education sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <h3 className="reveal mb-8 text-sm font-semibold uppercase tracking-wider text-foreground">
                Education
              </h3>
              <div className="space-y-4">
                {profile.education.map((edu, i) => (
                  <EducationCard key={i} edu={edu} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
