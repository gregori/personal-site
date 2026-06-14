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

export const pt: Translation = {
  nav: { about: "Sobre", journey: "Trajetória", portfolio: "Portfólio" },
  hero: {
    exploreJourney: "Conheça Minha Trajetória",
    viewPortfolio: "Ver Portfólio",
    stats: { years: "Anos de Experiência", companies: "Empresas", languages: "Idiomas" },
    scroll: "Rolar",
  },
  about: {
    badge: "Sobre",
    heading: "Líder de engenharia com",
    headingGradient: "duas décadas",
    paragraph1:
      "Da organização de redes na prefeitura à arquitetura de soluções enterprise na Zup Innovation, minha carreira percorre todo o espectro da tecnologia. Prospero na interseção entre infraestrutura e software — construindo sistemas que são não apenas elegantes, mas operacionalmente sólidos.",
    paragraph2:
      "Além do código, passei nove anos formando a próxima geração de engenheiros como professor universitário, ensinando desde Inteligência Artificial até Sistemas Operacionais. Acredito que os melhores engenheiros entendem o stack completo — e vivo essa filosofia todos os dias há quase 20 anos.",
    coreSkills: "Competências",
    languages: "Idiomas",
  },
  journey: {
    badge: "Carreira",
    heading: "Da",
    headingGradient: "infraestrutura",
    subheading:
      "Quase duas décadas de evolução — de Analista de Desenvolvimento Júnior a Software Engineer Specialist, transformando sistemas e pessoas ao longo do caminho.",
    experience: "Experiência",
    education: "Formação",
  },
  portfolio: {
    badge: "Portfólio",
    heading: "O que",
    headingGradient: "construí",
    subheading:
      "Uma seleção de projetos que liderei e para os quais contribuí nas áreas de enterprise, automação e educação.",
    projects: [
      {
        title: "Plataforma Enterprise",
        tag: "Em Breve",
        desc: "Arquitetura de microsserviços escalável para sistemas de alta demanda",
      },
      {
        title: "Automação de Infraestrutura",
        tag: "Em Breve",
        desc: "Pipelines CI/CD e automação de infraestrutura em escala",
      },
      {
        title: "Pesquisa & Ensino",
        tag: "Em Breve",
        desc: "Trabalhos acadêmicos em IA, segurança de sistemas e engenharia de software",
      },
    ],
    moreComing: "Mais projetos estão sendo adicionados — volte em breve",
    detailsSoon: "Detalhes em breve",
  },
  footer: {
    at: "na",
    crafted: "Feito com propósito.",
  },
  chat: {
    greeting:
      "Olá! Sou o Gêmeo Digital do Rodrigo. Pergunte qualquer coisa sobre a carreira, habilidades ou experiência dele.",
    placeholder: "Pergunte sobre a carreira...",
    error: "Desculpe, não consegui acessar meus dados. Tente novamente.",
    online: "Online",
    thinking: "Pensando...",
    title: "Gêmeo Digital",
  },
  profile: {
    summary:
      "Tenho quase 20 anos de experiência em TI, abrangendo desde desenvolvimento web e desktop até administração de sistemas e redes. No trabalho, gosto de resolver problemas e sou entusiasta de novas linguagens, tecnologias e boas práticas. A maior parte da minha experiência está relacionada à gestão de sistemas e automação de tarefas.",
    highlights: {
      "zup-specialist": [
        "Liderando iniciativas técnicas e promovendo excelência em engenharia",
        "Arquitetando soluções escaláveis para clientes enterprise",
        "Orientando engenheiros juniores e fomentando boas práticas",
      ],
      "zup-senior": [
        "Entreguei soluções de software de alta qualidade em múltiplos domínios",
        "Colaborei com equipes multifuncionais no design de sistemas robustos",
        "Defendi qualidade de código, testes e melhoria contínua",
      ],
      professor: [
        "Participei da equipe de estruturação do curso de Engenharia de Software",
        "Lecionei Inteligência Artificial, Programação Mobile, Segurança de Sistemas",
        "Lecionei Programação Orientada a Objetos, Redes, Sistemas Operacionais, Bancos de Dados",
        "Membro da equipe de robótica, orientando estudantes",
      ],
      "network-specialist": [
        "Reorganizei e documentei a rede física da prefeitura municipal",
        "Implementei ambiente de CI/CD para publicações mais rápidas e confiáveis",
        "Construí ferramentas de automação com shell scripts, Perl, Python, PHP, C#, C++",
        "Integrei departamentos municipais via VPN para acesso remoto e compartilhamento de infraestrutura",
        "Planejei, instalei e gerenciei servidores Windows e Linux, virtualização Citrix XenServer",
        "Gerenciei serviços: WSUS, Nagios, MySQL, PostgreSQL, MS SQL Server, Openfire e outros",
      ],
      teacher: ["Lecionei Redes de Computadores"],
      "dev-analyst": [
        "Gerenciei infraestrutura de TI para um departamento de 100–200 funcionários",
        "Migrei sistemas de build de Green-Hills C para compiladores GNU C/C++",
        "Gerenciei serviços de armazenamento e backup com ferramentas open source como Bacula",
        "Planejei e implementei sistema de gestão de incidentes",
        "Construí soluções web em Perl, PHP e bash (gestão de treinamentos, documentos)",
        "Administrei OpenLDAP e Samba como controlador de domínio primário",
      ],
      "jr-dev-analyst": [
        "Apoiei iniciativas de desenvolvimento e infraestrutura",
        "Contribuí para ferramentas internas e esforços de automação",
      ],
    },
  },
};

export type Lang = "en" | "pt";
export const translations = { en, pt };
