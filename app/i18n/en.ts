import type { Translation } from "./types";

export const en: Translation = {
  nav: { about: "About", journey: "Journey", portfolio: "Portfolio" },
  hero: {
    exploreJourney: "Explore My Journey",
    viewPortfolio: "View Portfolio",
    stats: { years: "Years Experience", companies: "Companies", languages: "Languages" },
    scroll: "Scroll",
  },
  about: {
    badge: "About",
    heading: "Engineering leader with",
    headingGradient: "two decades",
    paragraph1:
      "From wiring network closets at city hall to architecting enterprise solutions at Zup Innovation, my career spans the full spectrum of technology. I thrive at the intersection of infrastructure and software — building systems that are not only elegant but operationally sound.",
    paragraph2:
      "Beyond code, I spent nine years shaping the next generation of engineers as a university professor, teaching everything from Artificial Intelligence to Operating Systems. I believe the best engineers understand the entire stack — and I've lived that philosophy every day for nearly 20 years.",
    coreSkills: "Core Skills",
    languages: "Languages",
  },
  journey: {
    badge: "Career Journey",
    heading: "From",
    headingGradient: "infrastructure",
    subheading:
      "Nearly two decades of evolution — from a Jr. Development Analyst to a Software Engineer Specialist, shaping systems and people along the way.",
    experience: "Experience",
    education: "Education",
  },
  portfolio: {
    badge: "Portfolio",
    heading: "What I've",
    headingGradient: "built",
    subheading:
      "A curated selection of projects I've led and contributed to across enterprise, automation, and education.",
    projects: [
      {
        title: "Enterprise Platform",
        tag: "Coming Soon",
        desc: "Scalable microservices architecture for high-throughput systems",
      },
      {
        title: "Automation Toolchain",
        tag: "Coming Soon",
        desc: "CI/CD pipelines and infrastructure automation at scale",
      },
      {
        title: "Research & Teaching",
        tag: "Coming Soon",
        desc: "Academic work in AI, systems security, and software engineering",
      },
    ],
    moreComing: "More projects are being added — check back soon",
    detailsSoon: "Details coming soon",
  },
  footer: {
    at: "at",
    crafted: "Crafted with purpose.",
  },
  chat: {
    greeting:
      "Hi! I'm Rodrigo's Digital Twin. Ask me anything about his career, skills, or experience.",
    placeholder: "Ask about my career...",
    error: "Sorry, I couldn't reach my brain. Please try again.",
    online: "Online",
    thinking: "Thinking...",
    title: "Digital Twin",
  },
  profile: {
    summary:
      "I have almost 20 years of experience in IT, ranging from development, both web and desktop, to systems and network administration. At work I like solving problems and I am enthusiastic with new languages, technologies and best practices. Most of my work experience is related with systems management and automatization of tasks.",
    highlights: {
      "zup-specialist": [
        "Leading technical initiatives and driving engineering excellence",
        "Architecting scalable solutions for enterprise clients",
        "Mentoring junior engineers and fostering best practices",
      ],
      "zup-senior": [
        "Delivered high-quality software solutions across multiple domains",
        "Collaborated in cross-functional teams to design robust systems",
        "Championed code quality, testing, and continuous improvement",
      ],
      professor: [
        "Part of the structuring team of the Software Engineering major",
        "Taught Artificial Intelligence, Mobile Programming, Systems Security",
        "Taught Object Oriented Programming, Computer Networks, Operating Systems, Databases",
        "Member of the robotics team, mentoring students",
      ],
      "network-specialist": [
        "Reorganized and documented the physical network of the city hall",
        "Implemented CI/CD environment for faster and reliable publishing",
        "Built automation tools with shell scripts, Perl, Python, PHP, C#, C++",
        "Integrated city departments via VPN for remote access and shared infrastructure",
        "Planned, installed, and managed Windows and Linux servers, Citrix XenServer virtualization",
        "Managed services: WSUS, Nagios, MySQL, PostgreSQL, MS SQL Server, Openfire, and more",
      ],
      teacher: ["Teaching Computer Networks"],
      "dev-analyst": [
        "Managed IT infrastructure for a department of 100–200 employees",
        "Migrated build systems from Green-Hills C to GNU C/C++ compilers",
        "Managed storage and backup services using open-source tools like Bacula",
        "Planned and implemented incident management system",
        "Built web-based solutions in Perl, PHP, and bash (training management, document management)",
        "Administered OpenLDAP and Samba as primary domain controller",
      ],
      "jr-dev-analyst": [
        "Supported development and infrastructure initiatives",
        "Contributed to internal tooling and automation efforts",
      ],
    },
  },
};
