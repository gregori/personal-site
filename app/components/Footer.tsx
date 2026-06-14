import { profile } from "@/app/data/profile";

export default function Footer() {
  return (
    <footer className="relative border-t border-card-border bg-background">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Left */}
          <div className="text-center sm:text-left">
            <a href="#" className="text-lg font-semibold tracking-tight gradient-text">
              RG
            </a>
            <p className="mt-1 text-sm text-muted">
              {profile.title} at {profile.company}
            </p>
          </div>

          {/* Center - quick links */}
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs text-muted transition-colors hover:text-foreground">
              About
            </a>
            <a href="#journey" className="text-xs text-muted transition-colors hover:text-foreground">
              Journey
            </a>
            <a href="#portfolio" className="text-xs text-muted transition-colors hover:text-foreground">
              Portfolio
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.08)]"
              aria-label="LinkedIn"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-card-border pt-6 text-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Rodrigo Gregori. Crafted with purpose.</p>
        </div>
      </div>
    </footer>
  );
}
