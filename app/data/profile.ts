export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export const profile = {
  name: "Rodrigo Gregori",
  title: "Software Engineer Specialist",
  company: "Zup Innovation",
  location: "Joinville, Santa Catarina, Brazil",
  email: "rodrigo.gregori@gmail.com",
  linkedin: "https://www.linkedin.com/in/rodrigo-gregori",
  summary: "I have almost 20 years of experience in IT, ranging from development, both web and desktop, to systems and network administration. At work I like solving problems and I am enthusiastic with new languages, technologies and best practices. Most of my work experience is related with systems management and automatization of tasks.",
  skills: ["University Lecturing", "Arduino", "Android Development", "Artificial Intelligence", "Systems Security", "Cloud Architecture", "Automation", "Problem Solving"],
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Full Professional" },
    { name: "Spanish", level: "Limited Working" },
    { name: "German", level: "Limited Working" },
    { name: "Japanese", level: "Limited Working" },
    { name: "French", level: "Limited Working" },
  ],
  experiences: [
    {
      role: "Software Engineer Specialist",
      company: "Zup Innovation",
      period: "October 2022 — Present",
      location: "Joinville, Brazil",
      highlights: [
        "Leading technical initiatives and driving engineering excellence",
        "Architecting scalable solutions for enterprise clients",
        "Mentoring junior engineers and fostering best practices",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Zup Innovation",
      period: "June 2020 — October 2022",
      location: "Joinville, Brazil",
      highlights: [
        "Delivered high-quality software solutions across multiple domains",
        "Collaborated in cross-functional teams to design robust systems",
        "Championed code quality, testing, and continuous improvement",
      ],
    },
    {
      role: "Professor",
      company: "Universidade Católica de Santa Catarina",
      period: "August 2015 — July 2024",
      location: "Joinville Area, Brazil",
      highlights: [
        "Part of the structuring team of the Software Engineering major",
        "Taught Artificial Intelligence, Mobile Programming, Systems Security",
        "Taught Object Oriented Programming, Computer Networks, Operating Systems, Databases",
        "Member of the robotics team, mentoring students",
      ],
    },
    {
      role: "Network Specialist",
      company: "Prefeitura Municipal de Joinville",
      period: "September 2007 — May 2017",
      location: "Secretaria de Administração e Planejamento - Unidade de TI",
      highlights: [
        "Reorganized and documented the physical network of the city hall",
        "Implemented CI/CD environment for faster and reliable publishing",
        "Built automation tools with shell scripts, Perl, Python, PHP, C#, C++",
        "Integrated city departments via VPN for remote access and shared infrastructure",
        "Planned, installed, and managed Windows and Linux servers, Citrix XenServer virtualization",
        "Managed services: WSUS, Nagios, MySQL, PostgreSQL, MS SQL Server, Openfire, and more",
      ],
    },
    {
      role: "Teacher",
      company: "Colégio Santo Antônio",
      period: "February 2010 — January 2012",
      highlights: [
        "Teaching Computer Networks",
      ],
    },
    {
      role: "Development Analyst",
      company: "Siemens Ltda",
      period: "February 2005 — September 2007",
      location: "Curitiba Area, Brazil",
      highlights: [
        "Managed IT infrastructure for a department of 100–200 employees",
        "Migrated build systems from Green-Hills C to GNU C/C++ compilers",
        "Managed storage and backup services using open-source tools like Bacula",
        "Planned and implemented incident management system",
        "Built web-based solutions in Perl, PHP, and bash (training management, document management)",
        "Administered OpenLDAP and Samba as primary domain controller",
      ],
    },
    {
      role: "Jr. Development Analyst",
      company: "CITS — Siemens",
      period: "2003 — 2005",
      location: "Curitiba Area, Brazil",
      highlights: [
        "Supported development and infrastructure initiatives",
        "Contributed to internal tooling and automation efforts",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science (M.Sc.), Computer Science",
      institution: "Universidade Tecnológica Federal do Paraná",
      period: "2012 — 2013",
    },
    {
      degree: "Bachelor, Computer Science",
      institution: "Universidade Federal do Paraná",
      period: "1999 — 2003",
    },
    {
      degree: "Technician, Electronics",
      institution: "Federal University of Technology — Paraná",
      period: "1994 — 1998",
    },
  ],
};
