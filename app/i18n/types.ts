export type Translation = {
  nav: { about: string; journey: string; portfolio: string };
  hero: {
    exploreJourney: string;
    viewPortfolio: string;
    stats: { years: string; companies: string; languages: string };
    scroll: string;
  };
  about: {
    badge: string;
    heading: string;
    headingGradient: string;
    paragraph1: string;
    paragraph2: string;
    coreSkills: string;
    languages: string;
  };
  journey: {
    badge: string;
    heading: string;
    headingGradient: string;
    subheading: string;
    experience: string;
    education: string;
  };
  portfolio: {
    badge: string;
    heading: string;
    headingGradient: string;
    subheading: string;
    projects: Array<{ title: string; tag: string; desc: string }>;
    moreComing: string;
    detailsSoon: string;
  };
  footer: {
    at: string;
    crafted: string;
  };
  chat: {
    greeting: string;
    placeholder: string;
    error: string;
    online: string;
    thinking: string;
    title: string;
  };
  profile: {
    summary: string;
    highlights: Record<string, string[]>;
  };
};
