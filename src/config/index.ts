export const siteConfig = {
  name: 'Yoav Peretz',
  title: 'Full Stack Developer & Creative Coder',
  description: 'Interactive and modern developer portfolio showcasing projects and skills',
  url: 'https://your-domain.com',
  ogImage: 'https://your-domain.com/og.jpg',
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
};

export const navigationConfig = {
  items: [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ],
};

export const projectsConfig = {
  items: [
    {
      title: 'Project One',
      description: 'A modern web application built with Next.js and Three.js',
      tech: ['Next.js', 'Three.js', 'TailwindCSS'],
      link: '#',
      github: '#',
    },
    {
      title: 'Project Two',
      description: 'Full-stack application with real-time features',
      tech: ['React', 'Node.js', 'Socket.io'],
      link: '#',
      github: '#',
    },
    {
      title: 'Project Three',
      description: 'AI-powered data visualization platform',
      tech: ['Python', 'TensorFlow', 'D3.js'],
      link: '#',
      github: '#',
    },
  ],
};

export const skillsConfig = {
  categories: [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 85 },
        { name: 'Three.js', level: 75 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'GraphQL', level: 70 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'CI/CD', level: 75 },
      ],
    },
  ],
};

export const performanceConfig = {
  // FPS thresholds for quality adjustments
  fps: {
    low: 30,
    medium: 45,
    high: 60,
  },
  // Quality presets for different performance levels
  quality: {
    low: {
      particleCount: 2000,
      particleSize: 0.003,
      enableBloom: false,
      enablePostProcessing: false,
    },
    medium: {
      particleCount: 3500,
      particleSize: 0.0025,
      enableBloom: true,
      enablePostProcessing: false,
    },
    high: {
      particleCount: 5000,
      particleSize: 0.002,
      enableBloom: true,
      enablePostProcessing: true,
    },
  },
  // Device capability thresholds
  device: {
    minCores: 4,
    minMemory: 4,
  },
};

export const responsiveConfig = {
  breakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
    ultrawide: 2560,
  },
  typography: {
    // Fluid typography scales
    sm: 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
    base: 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
    lg: 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
    xl: 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
    '2xl': 'clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)',
    '3xl': 'clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)',
  },
  spacing: {
    // Fluid spacing scales
    1: 'clamp(0.25rem, 0.5vw, 0.5rem)',
    2: 'clamp(0.5rem, 1vw, 1rem)',
    3: 'clamp(1rem, 1.5vw, 1.5rem)',
    4: 'clamp(1.5rem, 2vw, 2rem)',
    5: 'clamp(2rem, 3vw, 3rem)',
  },
}; 