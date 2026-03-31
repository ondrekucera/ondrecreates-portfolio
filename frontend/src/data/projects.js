// Datová struktura projektů – přidávej nové projekty sem

export const projects = [
  {
    id: 'okvion',
    slug: 'okvion',
    title: 'Okvion',
    description: {
      cs: 'Webová aplikace zaměřená na moderní správu a vizualizaci dat. Postavená na Reactu s Spring Boot backendem.',
      en: 'A web application focused on modern data management and visualization. Built with React and a Spring Boot backend.',
    },
    stack: ['React', 'Spring Boot', 'Java', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/ondrecreates/okvion', // uprav
    demoUrl: null, // doplň až bude live
    featured: true,
    status: 'in-progress', // 'live' | 'in-progress' | 'archived'
    year: 2025,
  },
  {
    id: 'placeholder-1',
    slug: 'projekt-v-priprave-1',
    title: 'Projekt v přípravě',
    description: {
      cs: 'Nový projekt je aktuálně ve fázi plánování a vývoje. Brzy zde bude více informací.',
      en: 'A new project currently in the planning and development phase. More details coming soon.',
    },
    stack: ['React', 'Node.js'],
    githubUrl: null,
    demoUrl: null,
    featured: false,
    status: 'coming-soon',
    year: 2025,
  },
  {
    id: 'placeholder-2',
    slug: 'projekt-v-priprave-2',
    title: 'Projekt v přípravě',
    description: {
      cs: 'Další projekt, který se právě rodí. Zaměřuje se na čistý UX design a výkon.',
      en: 'Another project in the works. Focused on clean UX design and performance.',
    },
    stack: ['TypeScript', 'Spring Boot'],
    githubUrl: null,
    demoUrl: null,
    featured: false,
    status: 'coming-soon',
    year: 2025,
  },
]
